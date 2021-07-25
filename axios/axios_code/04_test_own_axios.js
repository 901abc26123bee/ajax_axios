// 1. GET請求：從服務器端獲取數據
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

// 2. POST請求：向服務器端添加數據
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
// 3. PUT請求：服務器更新數據
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

// 3. DELETE請求：服務器刪除數據
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