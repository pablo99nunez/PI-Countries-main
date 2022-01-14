const { Router } = require('express');
const {conn,Country,Activity} =require("../db")
const {Op} = require("sequelize")
const axios=require("axios")
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
            const countries = await axios.get('https://restcountries.com/v3/all');
            await Country.bulkCreate(countries.data.map(c=>{
            return{
                id:c.cca3,
                name:c.name.common,
                image:c.flags[0],
                region:c.region,
                capital:c.capital?c.capital[0]:"No tiene capital",
                subregion:c.subregion,
                area:c.area,
                population:c.population
            }
        }))
            res.json(await Country.findAll())
        } catch (error) {
            console.error(error);
        }    
    }
})

router.get("/countries/:idPais",async (req,res)=>{
    try {
        const country=await Country.findByPk(req.params.idPais,{include:Activity})
        res.json(country)
    } catch (error) {
        res.status(404).send(error)
    }
        
})
router.post("/activity",async (req,res)=>{
    try {
        
        const {name,difficulty,duration,season} = req.body;
        let IDs=req.body.IDs.split(" ")
        
        const act=await Activity.create({name,difficulty,duration,season})
        act.setCountries(IDs).catch(err=>console.log(err))
        console.log(IDs)
        res.status(201).send("Created")
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
