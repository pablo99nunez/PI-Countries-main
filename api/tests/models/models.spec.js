const { Country, Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');


describe("MODELS",()=>{
  before(async ()=>{
    await conn.sync({force:true})
  })
  
  describe("Country model",()=>{
    let country
    beforeEach(()=>{
      country={
        id:"ARG",
        name:"Argentina",
        image:"http://www.imagen.com/bandera.jpg",
        region:"americas",
        capital:"BS AS" 
      }
    })
    it("Should have a model of Country",()=>{
      expect(conn.models).to.haveOwnProperty("Country") 
    })
    it("should throw an error if name is null",(done)=>{
      country.name=null
      Country.create(country)
      .then(()=>done("No deberia haberse creado"))
      .catch(()=>done())
    })
    it("should throw an error if region is null",(done)=>{
      country.region=null
      Country.create(country)
      .then(()=>done("No deberia haberse creado"))
      .catch(()=>done())
    })
    it("should throw an error if capital is null",(done)=>{
      country.capital=null
      Country.create(country)
      .then(()=>done("No deberia haberse creado"))
      .catch(()=>done())
    })
    it("should throw an error if ID is null",(done)=>{
      country.id=null
      Country.create(country)
      .then(()=>done("No deberia haberse creado"))
      .catch(()=>done())
    })
    it("should create succesfully",(done)=>{
      Country.create(country)
      .then(()=>done())
      .catch((err)=>done("No se ha creado "+err))
    })
  })
  describe("Activity model",()=>{
    let activity
    beforeEach(()=>{
      activity={
        name:"Surf",
        difficulty:3,
        duration:3600,
        season:"Verano"
      }
    })
    it("difficulty it have to be between 1 and 5",(done)=>{
      activity.difficulty=6,
      Activity.create(activity)
      .then(()=>done("No deberia haberse creado"))
      .catch(()=>done())
    })
    it("season it have to be Verano or Invierno or Otoño or Primavera",(done)=>{
      activity.season="Verano azul",
      Activity.create(activity)
      .then(()=>done("No deberia haberse creado"))
      .catch(()=>done())
    })
    it("should create succesfully",(done)=>{
      Activity.create(activity)
      .then(()=>done())
      .catch(()=>done("No se ha creado"))
    })
  })
})