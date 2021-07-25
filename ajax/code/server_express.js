// 1. 引入express
const { response } = require('express');
const express = require('express');

//2. 創建應用Object
const app = express();

// 3. 創建路由規則
// request 是對請求報文的封裝
// response 是對響應報文的封裝
app.get('/server', (request, response) => {
    //設置response header 設置允許跨域
    response.setHeader('Access-Control-Allow-Origin', '*');

    //設置response body
    response.send("HELLO AJAX GET");

});

// app.post('/server',(request, response)=>{
//all可以接收任意類型的請求，（包括自定義）
app.all('/server', (request, response) => {
    //設置response header 設置允許跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //遇到自定義response header時可以設置
    response.setHeader('Access-Control-Allow-Headers', '*');
    //設置response body
    response.send("HELLO AJAX POST");
});

app.all('/json-server', (request, response) => {
    //設置response header 設置允許跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //遇到自定義response header時可以設置
    response.setHeader('Access-Control-Allow-Headers', '*');
    //響應一個數據
    const data = {
        name: 'snoppy'
    };
    //對Object進行字符串轉化
    let str = JSON.stringify(data);
    //設置response body
    // response.send("HELLO AJAX JSON");
    response.send(str);
});


//針對 IE(only) cache
app.get('/ie', (request, response) => {
    //設置response header 設置允許跨域
    response.setHeader('Access-Control-Allow-Origin', '*');

    //設置response body
    response.send("HELLO browser cache");
});

//針對 請求超時：作延時響應：2s
app.get('/delay', (request, response) => {
    //設置response header 設置允許跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        //設置response body
        response.send("delay response");
    }, 3000)
});

//針對 jQuery
app.all('/jquery-server', (request, response) => {
    //設置response header 設置允許跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    const data = {name: 'jQuery'};

    // response.send("Hello jQuery AJAX");
    response.send(JSON.stringify(data));
});


//針對 axios
app.all('/axios-server', (request, response) => {
    //設置response header 設置允許跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    const data = {name: 'axios'};

    // response.send("Hello jQuery AJAX");
    response.send(JSON.stringify(data));
});


//針對 fetch
app.all('/fetch-server', (request, response) => {
    //設置response header 設置允許跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    const data = {name: 'fetch'};
    // response.send("Hello jQuery AJAX");
    response.send(JSON.stringify(data));
});

//針對 jsonp
app.all('/jsonp-server', (request, response) =>{
    // response.send('HELLO JSONP-server');
    // script標籤最好還是返回js代碼，要的是一段函數的調用
    // response.send('console.log("hello jsonp")');
    const data = {
        name: 'jsonp'
    };
    //將數據轉化為字符串
    let str = JSON.stringify(data);
    //返回結果形式 是一個函數調用，而函數的實參就是我們想給 Client端返回的結果數據
    response.end(`handle(${str})`);
});

// create JSONP practice
app.all('/check-username', (request, response) =>{
    response.send('console.log("hello jsonp")');
    const data = {
        exist: 1,
        msg: 'username already exit'
    };
    //將數據轉化為字符串
    let str = JSON.stringify(data);
    //返回結果形式 是一個函數調用，而函數的實參就是我們想給 Client端返回的結果數據
    response.end(`handle(${str})`);
});

//jQuery中的jsonp
app.all('/jquery-jsonp-server', (request, response) =>{
    // response.send('console.log("hello jsonp")');
    const data = {
        name: 'snoppy',
        city: ['Tokeyo', 'NewYork', 'MitLan']
    };
    //將數據轉化為字符串
    let str = JSON.stringify(data);
    //接收 callback 參數
    let cb = request.query.callback;

    //返回結果
    response.end(`${cb}(${str})`);
});

app.all('/cors-server', (request, response)=>{
    //設置response header
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", '*');
    response.setHeader("Access-Control-Allow-Method", '*');
    // response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");

    response.send('hello CORS');
})
//4. 監聽端口啟動服務
app.listen(8000, () => {
    console.log("server is lisstening to port 8000....");
})