const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => {
      
      Country.sync({ force: true })}
      );
      
    describe('input', () => {
      beforeEach(()=>{
        let country={
          name="Argentina",
          ID="ARG",
          region="America",
          image="Bandera.png",
          capital="Buenos Aires"
        }
      })
      it('should throw an error if no data is given', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name, ID, Continent, Flag and Capital.')))
          .catch(() => done());
      });
      it('should throw an error if ID is null',(done)=>{
        country.ID=null
        Country.create(country).then(

        )
      })
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    });
  });
});
