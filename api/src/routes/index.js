const { Router } = require('express');
const {conn,Country,Activity,User} =require("../db")
const {Op} = require("sequelize")
const axios=require("axios").default;
const path = require('path')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/",(req,res)=>{
    
    res.sendFile(path.resolve(__dirname+"/../../../client/build/index.html"))
    
  })
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
                        image:c.flags[1],
                        region:c.region,
                        capital:c.capital?c.capital[0]:"No tiene capital",
                        subregion:c.subregion,
                        area:c.area,
                        population:c.population
                    }
                }))
            }
            
            res.json(await Country.findAll({
                include:Activity
            }))
            
            
        
        } catch (error) {
            console.error(error);
        }    
    }
})

async function postPost(options){
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
    
    if(!await Country.findByPk("ARG")){
        await axios.get(`https://${window.location.hostname}:${process.env.PORT || 3001}/countries`)
    }
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
          
          let landscape = await postPost(options)
          console.log(landscape)
          if(!landscape){
              options.params.query=country.region
              landscape=await postPost(options)
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
        var options = {
            method: 'GET',
            url: 'https://api.unsplash.com/search/photos',
            params: {
                query: `${name}`,
                page:1,
                per_page:1,
                orientation:"landscape"
            },
            headers: {
                Authorization: `Client-ID miuUGQ2wK6EKnbR7lk6A98jHf2r-TOyH0WgAwMwD5b0`
            }
          };
        let image=await postPost(options).catch(err=>console.error(err))
        console.log(image)
        const act=await Activity.create({name,difficulty,duration,season,image})
        
        act.setCountries(IDs)
        console.log(IDs)
        res.status(201).json({name,difficulty,duration,season,image})
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }


})
router.get("/deleteAll",async (req,res)=>{
    try{

        await Country.destroy({
        where:{}
        });
        await Activity.destroy({
            where:{}
        });
        res.send("Borrado exitosamente")
    }catch(err){
        res.status(401).send("No se pudo eliminar,"+err)
    }
})
router.get("/activity",async(req,res)=>{ 
    const actividades=await Activity.findAll({})
    res.json(actividades.map(e=>e.name))
    
})




module.exports = router;
