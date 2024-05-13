import React, { useState } from 'react'
import classes from './StudentForm.module.css'

const StudentForm = () => {
    const [inputData, setInputData] = useState({
        name: '',
        gender: "男",
        age: '',
        address: ''
    })

    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputData)
    }

    return (
        <tr className={classes.StudentForm}>
            <td><input onChange={handleChange}
                value={inputData.name}
                name="name" type="text" /></td>
            <td>
                <select onChange={handleChange}
                    value={inputData.gender}
                    name="gender">
                    <option value="">请选择</option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                </select>
            </td>
            <td><input onChange={handleChange}
                value={inputData.age}
                name="age" type="text" /></td>
            <td><input onChange={handleChange}
                value={inputData.address}
                name="address" type="text" /></td>
            <td><button onClick={handleSubmit} className={classes.btn}>添加</button></td>
        </tr>
    )
}

export default StudentForm
