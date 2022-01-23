//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const express = require('express')
const path = require('path')
const { conn,Country } = require('./src/db.js');

const port=process.env.PORT || 3001

if(process.env.NODE_ENV=="production"){
  server.use(express.static('../client/build'))
  server.get("*",(req,res)=>{
    res.sendFile(path.resolve("../client","build","index.html"))
  })
}

// Syncing all the models at once.
conn.sync().then(() => {
  server.listen(port, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    
  });
})
.catch((err)=>{
  console.error(err)
})
