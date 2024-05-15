/*
    React 中的钩子函数只能在函数组件或自定义钩子中调用
        当我们需要将React中钩子函数提取到一个公共区域时，就可以使用自定义钩子函数
    自定义钩子其实就是一个普通函数，只是它的名字以use开头
        自定义钩子函数的返回值就是React组件中使用的数据
        自定义钩子函数的参数就是React组件中传递的参数

    自定义钩子函数的调用位置：
        1. 组件中
        2. 类中
        3. 函数中
        4. 渲染函数中
        5. 条件判断中
        6. 循环中

    在类中定义的箭头函数，this永远都指向实例对象
*/
import { useCallback, useState } from 'react';

export default function useFetch() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:1337/api/students');
            if (res.ok) {
                const data = await res.json();
                setData(data.data);
            } else {
                throw new Error('数据加载失败');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        data,
        loading,
        error,
        fetchData
    }
}
