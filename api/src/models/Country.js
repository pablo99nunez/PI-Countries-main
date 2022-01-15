const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isUrl:true
      }
    },
    region:{
      type:DataTypes.STRING,
      allowNull:false
    },
    capital:{
      type:DataTypes.STRING,
      allowNull:false
    },
    subregion:{
      type:DataTypes.STRING
    },
    area:{
      type:DataTypes.REAL
    },
    population:{
      type:DataTypes.INTEGER
    },
    landscape:{
      type:DataTypes.STRING
    }
  });
};
