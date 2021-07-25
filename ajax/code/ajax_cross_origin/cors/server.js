const { response } = require('express');
const express = require('express');

const app = express();

// visit http://127.0.0.1:9000/homes
app.get('/home', (request, response)=>{
  // response一個頁面
  response.sendFile(__dirname + '/cors.html');

});

app.get('/data', (request, response)=>{
  // response一個頁面
  response.send('user data');

});

app.listen(9000,()=>{
  console.log("server is listening to port 9000...");
})