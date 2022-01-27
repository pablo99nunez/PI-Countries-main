const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name:DataTypes.STRING,
    difficulty:DataTypes.ENUM("1","2","3","4","5"),
    duration:DataTypes.INTEGER, 
    season:DataTypes.ENUM("Verano","Otoño","Invierno","Primavera"),
    image:DataTypes.TEXT
  })
  
}