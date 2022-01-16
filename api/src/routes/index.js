const { Router } = require('express');
const {conn,Country,Activity} =require("../db")
const {Op} = require("sequelize")
const axios=require("axios").default
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/countries",async (req,res)=>{
    if(req.query.name){
        try {
            const country = await Country.findOne({
                where:{
                    name:{
                        [Op.iLike]:`%${req.query.name}%`
                    }
                }
            })

            console.log(country)
            if(!country)return res.status(404).send("Not found")
            res.json(country)
        } catch (error) {
            res.status(404).send(error)
        }
    }else{

        try {
            const countries = await axios.get('https://restcountries.com/v3/all').catch(e=>console.log(e));
            if(!await Country.findOne({})){
                
                await Country.bulkCreate(countries.data.map(c=>{
                    
                    return{
                        id:c.cca3,
                        key:c.cca3,
                        name:c.translations.spa.common,
                        image:c.flags[0],
                        region:c.region,
                        capital:c.capital?c.capital[0]:"No tiene capital",
                        subregion:c.subregion,
                        area:c.area,
                        population:c.population
                    }
                }))
            }
            
            res.json(await Country.findAll())
            
            
        
        } catch (error) {
            console.error(error);
        }    
    }
})

async function getLandscape(options){
    return axios.request(options).then(async function (response) {
        if(response.data.results[0]){
            let data=response.data.results[0].urls.regular 
            if(data) return data;

        }
        else return undefined
      }).catch(function (error) {
        return error
    });
}

router.get("/countries/:idPais",async (req,res)=>{
    try {
        const country=await Country.findByPk(req.params.idPais,{include:Activity})
      
        var options = {
            method: 'GET',
            url: 'https://api.unsplash.com/search/photos',
            params: {
                query: `${country.name}`,
                page:1,
                per_page:1,
                orientation:"landscape"
            },
            headers: {
                Authorization: `Client-ID miuUGQ2wK6EKnbR7lk6A98jHf2r-TOyH0WgAwMwD5b0`
            }
          };
          
          let landscape = await getLandscape(options)
          console.log(landscape)
          if(!landscape){
              options.params.query=country.region
              landscape=await getLandscape(options)
              console.log(landscape)
          }
          country.update({landscape})
          res.json(country)

        
    } catch (error) {
        res.status(404).send(error)
    }
        
})
router.post("/activity",async (req,res)=>{
    try {
        
        const {name,difficulty,duration,season} = req.body;
        let {IDs}=req.body
        if(typeof IDs =="string"){
            let IDs=IDs.split(" ")
        }
        const act=await Activity.create({name,difficulty,duration,season}).catch(err=>{throw new Error(err)})

        
        act.setCountries(IDs).catch(err=>{throw new Error(err)})
        console.log(IDs)
        res.status(201).send("Created")
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }
})

module.exports = router;
