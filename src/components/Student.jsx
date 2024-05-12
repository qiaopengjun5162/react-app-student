import React, { useCallback, useContext, useState } from 'react';
import StuContext from '../store/StuContext';


const Student = ({ student: { id, attributes: { name, age, gender, address } } }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const ctx = useContext(StuContext)

    const deleteStudent = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            // delete student
            const response = await fetch(`http://localhost:1337/api/students/${id}`, {
                method: 'DELETE'
            })
            console.log(response)
            if (!response.ok) {
                throw new Error(`删除数据失败...: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data)
            // 删除成功后需要触发父组件的重新获取数据 列表刷新
            ctx.fetchData()

        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [id, ctx])
    // delete student
    const deleteHandler = () => {
        // delete student
        deleteStudent()
    }

    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{gender}</td>
                <td>{age}</td>
                <td>{address}</td>
                <td>
                    <button className='btn btn-danger' onClick={deleteHandler}>Delete</button>
                </td>
            </tr>
            {loading && <tr><td colSpan={5}>正在删除数据...</td></tr>}
            {error && <tr><td colSpan={5}>删除数据失败...{error.message}</td></tr>}
        </>
    )
}

export default Student
