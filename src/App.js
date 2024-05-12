import React, { useEffect, useState } from 'react';
import './App.css';
import StudentList from './components/StudentList';

// 学生数据
const STU_DATA = [
  { "id": "1", "attributes": { "name": "张三", "age": 18, "gender": "男", "address": "北京" } },
  { "id": "2", "attributes": { "name": "李四", "age": 20, "gender": "女", "address": "上海" } },
  { "id": "3", "attributes": { "name": "王五", "age": 22, "gender": "男", "address": "广州" } },
  { "id": "4", "attributes": { "name": "赵六", "age": 24, "gender": "女", "address": "深圳" } },
]

const App = () => {
  const [studData, setStudData] = useState(STU_DATA);
  /*
    组件一渲染需要向服务器发送请求加载数据
    http://localhost:1337/api/students
  */

  useEffect(() => {
    /*
      fetch() 是一个异步请求
      fetch() 用来向服务器发送请求加载数据，是Ajax的封装
      fetch() 返回一个Promise对象，可以使用then()方法来获取请求的数据

      fetch() 请求的参数：
        fetch(url, options)
        url: 请求的地址
        options: 请求的配置项
          method: 请求的类型，GET/POST/PUT/DELETE
          headers: 请求的头部信息
          body: 请求的请求体信息

    */

    fetch('http://localhost:1337/api/students')
      .then(res => res.json())
      // 获取到数据
      .then(data => {
        console.log(data);
        setStudData(data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <div className="App">
      <StudentList students={studData} />
    </div>
  )
}

export default App
