/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  id:"ARG",
  name:"Argentina",
  image:"http://www.imagen.com/bandera.jpg",
  region:"americas",
  capital:"BS AS" 
};

describe('Country routes', () => {
  before(() => conn.sync({force:true})
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
    it("should bring 250 rows",async ()=>{
      await agent.get("/countries")
      let total = (await Country.findAll({})).length
      expect(total).to.be.equal(250)
    })
  });
  describe('GET /countries/:idPais',()=>{
    before(async ()=>{
      await agent.get("/countries")
    })

    it("should bring all the info of a country",async ()=>{
      const pais=(await agent.get("/countries/ARG"))._body
      expect(pais.name).to.be.equal("Argentina")
    })

  })
  describe('POST /activity',()=>{
    let activity
    before(async ()=>{
      await agent.get("/countries")
    })
    beforeEach(()=>{
      activity={name:"Surf",difficulty:4,season:"Verano",IDs:["ARG"],duration:7230}
    })
    it("should create an activity",async()=>{
      await agent.post("/activity").send(activity).expect(201)
    })
    it("the country should have the activity given",async()=>{
      await agent.post("/activity").send(activity)
      const pais=(await agent.get("/countries/ARG"))._body
      expect(pais.activities[0].name).to.be.equal("Surf")
    })

  })
});
