import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import StudentList from './components/StudentList';
import StudentContext from './store/StuContext';

// 学生数据
// const STU_DATA = [
//   { "id": "1", "attributes": { "name": "张三", "age": 18, "gender": "男", "address": "北京" } },
//   { "id": "2", "attributes": { "name": "李四", "age": 20, "gender": "女", "address": "上海" } },
//   { "id": "3", "attributes": { "name": "王五", "age": 22, "gender": "男", "address": "广州" } },
//   { "id": "4", "attributes": { "name": "赵六", "age": 24, "gender": "女", "address": "深圳" } },
// ]

const App = () => {
  const [studData, setStudData] = useState([]);
  // 添加一个 state 来记录数据是否正在加载中
  const [isLoading, setIsLoading] = useState(false);
  // 添加一个 state 来记录错误信息
  const [error, setError] = useState(null);

  /*
    组件一渲染需要向服务器发送请求加载数据
    http://localhost:1337/api/students
  */

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:1337/api/students');
      if (res.ok) {
        const data = await res.json();
        setStudData(data.data);
      } else {
        throw new Error('数据加载失败');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [])

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
    // 设置 loading 为 true
    // setIsLoading(true);

    // fetch('http://localhost:1337/api/students')
    //   .then(res => {
    //     // 判断状态码
    //     if (res.ok) {
    //       // 返回的 res 是一个 Response 对象，需要使用 json() 方法来获取数据
    //       return res.json();
    //     }
    //     setIsLoading(false)
    //     // 抛出错误
    //     throw new Error('数据加载失败');

    //   })
    //   // 获取到数据
    //   .then(data => {
    //     console.log(data);
    //     setStudData(data.data);

    //     // 设置 loading 为 false
    //     setIsLoading(false);
    //   })
    //   .catch(err => {
    //     // 设置 loading 为 false
    //     setIsLoading(false);

    //     // 打印错误信息
    //     console.log(err);

    //     // 设置错误信息
    //     setError(err.message);
    //   })

    // return fetchData
    fetchData();
  }, [fetchData]);

  // 加载数据按钮的点击事件
  const handleClick = () => {
    // 调用 fetchData 函数加载数据
    fetchData();
  }

  return (
    // 添加一个 StudentContext.Provider 组件，用来传递数据
    <StudentContext.Provider value={{ fetchData }}>
      <div className="App">
        <button onClick={handleClick} className="btn">加载数据</button>
        {(!isLoading && !error) && <StudentList students={studData} />}
        {isLoading && <p>数据正在加载中...</p>}
        {error && <p>数据加载失败...</p>}
      </div>
    </StudentContext.Provider>
  )
}

export default App
