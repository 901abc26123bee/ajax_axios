## 1. 自己創建一個API

## restful

[API 是什麼? RESTful API 又是什麼?](https://medium.com/itsems-frontend/api-%E6%98%AF%E4%BB%80%E9%BA%BC-restful-api-%E5%8F%88%E6%98%AF%E4%BB%80%E9%BA%BC-a001a85ab638)

REST，全名 Representational State Transfer( 表現層狀態轉移)，他是一種設計風格，RESTful 只是轉為形容詞，像是 peace 和平這名詞，轉成形容詞是 peaceful，RESTful 則形容以此規範設計的 API，稱為 RESTful API。

RESTful API 主要由三種元件組成：

1. Nouns 名詞：定義資源位置的 URL，每個資源在網路上都會有唯一的位置，就如每戶人家都有唯一的地址一樣。
2. Verbs 動詞：對資源要做的動作。
3. Content Types 資源呈現方式：API 資源可以以多種方式表現，最常用的是 JSON，較輕，也較好處理。

 一般的 API，可能會是這樣：

```
獲得資料GET    /getData
新增資料POST   /createData
刪除資料DELETE /deleteData/1
```

不同公司，不一樣的工程師，設計的名稱都會不一樣，沒有統一的命名方式，造成在引用各家 API 時，都需要詳讀 API 文件，理解所有設計命名規則後，才可使用。

若以 RESTful API 風格開發的話：

```
獲得資料GET     /data
新增資料POST    /data
刪除資料DELETE  /data/1
```

就是用一個唯一的 URL 定位資源，將動作藏在 HTTP 的 method 裡面。

所以使用 RESTful 風格設計的 API，就有了以下幾種優點及限制：

1. 有唯一的URL表示資源位置，統一的 API 接口。(Uniform Interface)

2. 無狀態。(Stateless)

RESTful 的狀態，意即 HTTP 的請求狀態，一般 Web 服務中，Server 端和 Client 端交互的資訊，會存在 Server 端的 Session (例如：已登入狀態)，在 Client 端再次發送請求的時候，Server 端透過保存在 Server 端的 Session，去執行 request。無狀態的意思，即 **Client 端自行保存狀態**，在請求 Server 的時候，一併附上給 Server 端，Server 端無保存 Client 端的狀態資訊。



API 的分類

1. REST API: restful （Representational State Transfer (資源)表現層狀態轉化）

   (1)發送request進行CRUD哪個操作由request方式來決定
   (2)同一個request路徑可以進行多個操作
   (3)request方式會用到GET/POST/PUT/DELETE

2. 非REST API: restless

   (1)request方式不決定request的CRUD操作
   (2)一個request路徑只對應一個操作
   (3)一般只有GET/POST

使用json-server 搭建REST API

json-server 是什麼?

- 用來快速搭建REST API 的工具包

###  使用json-server

1. 在線文檔: https://github.com/typicode/json-server

2. 下載: `npm install -g json-server`

3. 目標根目錄下創建數據庫json 文件: db.json

```json
{
	"posts": [
		{ "id": 1, "title": "json-server", "author": "typicode" },
		{ "id": 2, "title": "json-server2", "author": "typicode" }
	],
	"comments": [
		{ "id": 1, "body": "some comment", "postId": 1 }
	],
	"profile": { "name": "typicode" }
}
```

4. 啟動服務器執行命令(under folder which contain db.json): `json-server --watch db.json`

#### 使用瀏覽器訪問測試

http://localhost:3000/posts
http://localhost:3000/posts/1

#### 使用axios 訪問測試



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div>
    <button onclick="testGet()">GET請求</button>
    <button onclick="testPost()">POST請求</button>
    <button onclick="testPut()">PUT請求</button>
    <button onclick="testDelete()">DELETE請求</button>
  </div>

  <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.js"></script>
  <script>
    function testGet() {
      axios.get('http://localhost:3000/posts') // 返回一個數組，數組裡有兩個對象
      // axios.get('http://localhost:3000/posts/1') // 返回一個對象
      // axios.get('http://localhost:3000/posts?id=1') // 返回一個數組，數組裡有一個對象
      .then(response => {
        console.log('/posts get', response.data)
      })
    }

    function testPost() { // 添加數據
      axios.post('http://localhost:3000/posts', {"title": "json-server3", "author": "typicode" })
      .then(response => {
        console.log('/posts put', response.data)
      })
    }

    function testPut() { // 更新數據
      axios.put('http://localhost:3000/posts/3', {"title": "json-server_put", "author": "typicode" })
      .then(response => {
        console.log('/posts post', response.data)
      })
    }

    function testDelete() { // 刪除數據
      axios.delete('http://localhost:3000/posts/3')
      .then(response => {
        console.log('/posts delete', response.data)
      })
    }
  </script>
</body>
</html>
```

Response

```js
{data: Array(3), status: 200, statusText: "OK", headers: {…}, config: {…}, …}
    config: {url: "http://localhost:3000/comments", method: "get", headers: {…}, transformRequest: Array(1), transformResponse: Array(1), …}
    data: (3) [{…}, {…}, {…}]
    headers:
        cache-control: "no-cache"
        content-length: "202"
        content-type: "application/json; charset=utf-8"
        expires: "-1"
        pragma: "no-cache"
        __proto__: Object
    request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
        status: 200
        statusText: "OK"
    __proto__: Object
```



## 2. XHR 的ajax 封裝(簡單版axios)

特點

1. 函數的返回值為promise,成功的結果為response,失敗的結果為error

2. 能處理多種類型的request: GET/POST/PUT/DELETE

3. 函數的參數為一個配置物件

   ```json
   {
     url: '', // request地址
     method: '', // request方式GET/POST/PUT/DELETE
     params: {}, // GET/DELETE request的 query 參數
     data: {}, // POST/PUT request的request體參數
   }
   ```

   

4. responsejson數據自動解析為js的物件/數組

### 編碼實現

```js
function axios({
  url,
  method='GET',
  params={},
  data={}
}){
  // 返回一個promise對象
  return new Promise((resolve, reject) => {

    // 處理method 轉大寫
    method = method.toUpperCase();

    // 處理 query參數（拼接到url上）id=1&xxx=abc
    let queryString = '';
    Object.keys(params).forEach(key => {
      queryString += `${key}=${params[key]}&`
    });
    if(queryString){
      // 去除最後的'&'
      queryString = queryString.substring(0, queryString.length-1)
      // 接到url
      url += '?' + queryString
    }

    // 1. 執行異步Ajax請求
    // 創建xhr對象
    const request = new XMLHttpRequest();
    // 打開連接（初始化請求，沒有請求）
    request.open(method, url, true);
    // 發送請求
    if(method === 'GET' || method === 'DELETE'){
      request.send()// undefined
    } else if (method === 'POST' || method === 'PUT'){
      // 設置請求頭，告訴服務器請求體的格式是json
      request.setRequestHeader('Content-Type', 'appliaction/json;charset=utf-8');
      // 發送json格式請求參數
      request.send(JSON.stringify(data)); // 異步執行
    }
    
    // 綁定狀態改變的監聽
    request.onreadystatechange = function() { // 同步執行
      // 如果請求沒有完成，直接結束
      if (request.readyState !== 4) {
        return;
      }
      // 如果響應狀態碼在[200, 300)之間代表成功，否則失敗
      const {status, statusText} = request
      if( status>= 200 && status<=299) {// 2.1 如果請求成功，調用resolve()
        // 準備結果數據對象response
        const response = {
          data: JSON.parse(request.response),
          status,
          statusText
        };
        resolve(response);
      } else {// 2.2 如果請求失敗，調用reject()
        reject(new Error('request error status is ' + status));
      }
    }
  })
}
```

### 使用測試

```js
// 1. GETrequest：從服務器端獲取數據
function testGet() {
  axios({
    url: 'http://localhost:3000/posts',
    method: 'GET',
    params:{
      id: 1,
      xxx: 'abc'
    }
  }).then(
    response => {
      console.log(response)
    },
    error => {
      alert(error.message)
    }
  )
}

// 2. POSTrequest：向服務器端添加數據
function testPost() {
  axios({
    url: 'http://localhost:3000/posts',
    method: 'POST',
    data: {
      "title": "json-server_post",
      "author": "typicode_post"
    }
  }).then(
    response => {
      console.log(response)
    },
    error => {
      alert(error.message)
    }
  )
}
// 3. PUTrequest：服務器更新數據
function testPut() {
  axios({
    url: 'http://localhost:3000/posts/1',
    method: 'PUT',
    data: {
      "title": "json-server_put",
      "author": "typicode_put"
    }
  }).then(
    response => {
      console.log(response)
    },
    error => {
      alert(error.message)
    }
  )
}

// 3. DELETErequest：服務器刪除數據
function testDelete() {
  axios({
    url: 'http://localhost:3000/posts/2',
    method: 'delete'
  }).then(
    response => {
      console.log(response)
    },
    error => {
      alert(error.message)
    }
  )
}
```

## 3. axios 的理解和使用

axios 是什麼?

- 前端最流行的ajaxrequest庫
- react/vue 官方都推薦使用axios 發ajax request
- 文檔: https://github.com/axios/axios

axios 特點

- 基於xhr + promise 的異步ajaxrequest庫
- 瀏覽器端/node 端都可以使用
- 支持request／response攔截器
- 支持request取消
- request/response數據轉換
- 批量發送多個request

axios 常用語法

```js
axios(config):通用/最本質的發任意類型請求的方式
axios(url[, config]):可以只指定url發get請求
axios.request(config):等同於axios(config)
axios.get(url[, config]):發get請求
axios.delete(url[, config]):發delete請求
axios.post(url[, data, config]):發post請求
axios.put(url[, data, config]):發put請求

axios.defaults.xxx:請求的默認全局配置（method\baseURL\params\timeout…）
axios.interceptors.request.use():添加請求攔截器
axios.interceptors.response.use():添加響應攔截器

axios.create([config]): 創建一個新的axios(它沒有下面的功能)

axios.Cancel():用於創建取消請求的錯誤對象
axios.CancelToken():用於創建取消請求的token對象
axios.isCancel():是否是一個取消請求的錯誤
axios.all(promises):用於批量執行多個異步請求
axios.spread():用來指定接收所有成功數據的回調函數的方法
```

![1](./1.png)

### 難點語法的理解和使用

#### axios.create(config)

根據指定配置創建一個新的axios, 也就是每個新axios 都有自己的配置

新axios只是沒有取消request和批量發request的方法,其它所有語法都是一致的

為什麼要設計這個語法?

1. 需求:項目中有部分接口需要的配置與另一部分接口需要的配置不太一樣,如何處理（比如有多個baseURL需要指定）

2. 解決:創建2個新axios,每個都有自己特有的配置,分別應用到不同要求的接口request中

```js
const instance = axios.create({ // instance是函數類型
  baseURL: 'http://localhost:3000'
})
// 使用instance發Ajaxrequest
instance({
  url: '/posts'
})
instance.get('/posts')
```

## Interceptors函數/ajax request/request的回調函數的調用順序

1. 說明:調用axios()並不是立即發送ajax request,而是需要經歷一個較長的流程
2. 流程: request攔截器2 => request攔截器1 => 發ajax request=> response攔截器1 => response攔截器2 => request的回調
3. 注意:此流程是通過promise串連起來的,request攔截器傳遞的是config,response攔截器傳遞的是response
   

```js
// 添加兩個request攔截器(回調函數)
axios.interceptors.request.use(
  config => {
    console.log('request interceptor1 onResolved()') // -----------2
    return config
  },
  error => {
    console.log('request interceptor1 onRejected()')
    return Promise.reject(error)
  }
)

axios.interceptors.request.use(
  config => {
    console.log('request interceptor2 onResolved()') // -----------1
    return config
  },
  error => {
    console.log('request interceptor2 onRejected()')
    return Promise.reject(error)
  }
)

// 添加兩個response攔截器
axios.interceptors.response.use(
  resopnse => {
    console.log('response interceptor1 onResolved()') // -----------3
    return resopnse
  },
  error => {
    console.log('response interceptor1 onRejected()')
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  resopnse => {
    console.log('response interceptor2 onResolved()') // -----------4
    return resopnse
  },
  error => {
    console.log('response interceptor2 onRejected()')
    return Promise.reject(error)
  }
)

axios.get('http://localhost:3000/posts')
  .then(response => {
    console.log('data', response.data) //data Array(4) -------------5
  })
  .catch(error => {
    cosole.log('error', error.message)
  })

// request interceptor2 onResolved()
// request interceptor1 onResolved()
// response interceptor1 onResolved()
// response interceptor2 onResolved()
// data Array(4)
```

#### 取消request

> 1. 基本流程

1. 配置`cancelToken`物件
2. 緩存用於取消request的`cancel`函數
3. 在後面特定時機調用`cancel`函數取消request
4. 在錯誤回調中判斷如果`error`是`cancel`,做相應處理

> 2. 實現功能

用express先搭建一個有延遲的服務器

```js
const express = require('express')
const cors = require('cors')

const app = express()

// 使用cors, 允許跨域
app.use(cors())
// 能解析urlencode格式的postrequest體參數
app.use(express.urlencoded())
// 能解析json格式的request體參數
app.use(express.json())

app.get('/products1', (req, res) => {
  
  setTimeout(() => {
    res.send([
      {id: 1, name: 'product1.1'},
      {id: 2, name: 'product1.2'},
      {id: 3, name: 'product1.3'}
    ])
  }, 1000 + Math.random()*2000);
  
})

app.get('/products2', (req, res) => {

  setTimeout(() => {
    res.send([{
        id: 1,
        name: 'product2.1'
      },
      {
        id: 2,
        name: 'product2.2'
      },
      {
        id: 3,
        name: 'product2.3'
      }
    ])
  }, 1000 + Math.random() * 2000);

})

app.listen(4000, () => {
  console.log('server app start on port 4000')
})
```

1. 點擊按鈕, 取消某個正在request中的request

```js
let cancel // 用於保存取消request的函數
function getProducts1() {
  axios({
    url: 'http://localhost:4000/products1',
    cancelToken: new axios.CancelToken(function executor(c){ // c是用於取消當前request的函數
      // 保存取消函數，用於之後可能需要取消當前request
      cancel = c;
    })
  }).then(
    response => {
      cancel = null
      console.log('request1成功了', response.data)
    },
    error => {
      cancel = null
      console.log('request1失敗了', error.message, error) // request1失敗了 強制取消request Cancel {message: "強制取消request"}
    }
  )

}

function getProducts2() {
  axios({
      url: 'http://localhost:4000/products2'
  }).then(
    response => {
      console.log('request2成功了', response.data)
    }
  )
}

function cancelReq() {
  // alert('取消request')
  // 執行取消request的函數
  if (typeof cancel === 'function'){
    cancel('強制取消request')
  } else {
    console.log('沒有可取消的request')
  }
}
```

2. 在request一個接口前, 取消前面一個未完成的request

```js
let cancel // 用於保存取消request的函數
function getProducts1() {
  // 在準備發request前，取消未完成的request
  if (typeof cancel === 'function'){
    cancel('取消request')
  }
  axios({
    url: 'http://localhost:4000/products1',
    cancelToken: new axios.CancelToken(function executor(c){ // c是用於取消當前request的函數
      // 保存取消函數，用於之後可能需要取消當前request
      cancel = c;
    })
  }).then(
    response => {

      cancel = null
      console.log('request1成功了', response.data)
    },
    error => {
      if (axios.isCancel(error)){
        console.log('request1取消的錯誤', error.message)
      }else{ // request出錯了
        cancel = null
        console.log('request1失敗了', error.message, error) // request1失敗了 強制取消request Cancel {message: "強制取消request"}
      }
    }
  )

}

function getProducts2() {
// 在準備發request前，取消未完成的request
  if (typeof cancel === 'function'){
    cancel('取消request')
  }
  axios({
      url: 'http://localhost:4000/products2',
      cancelToken: new axios.CancelToken(function executor(c){
      cancel = c;
    })
  }).then(
    response => {
      cancel = null
      console.log('request2成功了', response.data)
    },
    error => {
      if (axios.isCancel(error)){
        console.log('request2取消的錯誤', error.message)
      }else{
        cancel = null
        console.log('request2失敗了', error.message, error)
      }
    }
  )
}
function cancelReq() {
  // alert('取消request')
  // 執行取消request的函數
  if (typeof cancel === 'function'){
    cancel('強制取消request')
  } else {
    console.log('沒有可取消的request')
  }
}
```

### 使用攔截器改進代碼，減少重複代碼

```js
// 添加request攔截器
axios.interceptors.request.use((config) => { // 只寫一個成功的回調
  // 在準備發request前，取消未完成的request
  if (typeof cancel === 'function'){
    cancel('取消request')
  }
  // 添加一個cancelToken的配置
  config.cancelToken = new axios.CancelToken(function executor(c){ // c是用於取消當前request的函數
      // 保存取消函數，用於之後可能需要取消當前request
      cancel = c;
    })
    return config
})

// 添加response攔截器
axios.interceptors.response.use(
  response => { // 成功的回調
    cancel = null
    return response
  },
  error => { // 失敗的回調
    if (axios.isCancel(error)){ // request取消的錯誤
        console.log('request取消的錯誤', error.message)
        // 中斷promise鏈
        return new Promise(() => {})
    }else{ // request出錯了
      cancel = null
      // 將錯誤向下傳遞
      // throw error
      return Promise.reject(error)
    }
  }
)

let cancel // 用於保存取消request的函數
function getProducts1() {
  axios({
    url: 'http://localhost:4000/products1'
  }).then(
    response => {
      console.log('request1成功了', response.data)
    },
    error => { // 只用處理request失敗的情況，取消request的錯誤不用處理
      console.log('request1失敗了', error.message, error)
    }
  )
}

function getProducts2() {
  axios({
      url: 'http://localhost:4000/products2'
  }).then(
    response => {
      console.log('request2成功了', response.data)
    },
    error => {
      console.log('request2失敗了', error.message, error)
    }
  )
}
function cancelReq() {
  if (typeof cancel === 'function'){
    cancel('強制取消request')
  } else {
    console.log('沒有可取消的request')
  }
}
```

