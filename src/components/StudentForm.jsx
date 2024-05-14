import React, { useCallback, useContext, useState } from "react";
import StuContext from "../store/StuContext";
import classes from "./StudentForm.module.css";

const StudentForm = (props) => {
    console.log(props);
    const [inputData, setInputData] = useState({
        name: props.student ? props.student.name : "",
        gender: props.student ? props.student.gender : "男",
        age: props.student ? props.student.age : "",
        address: props.student ? props.student.address : "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const ctx = useContext(StuContext);

    // 创建一个添加学生的函数
    const addStudent = useCallback(async (inputData) => {
        setLoading(true);
        try {
            setError(null);
            // 发送POST请求到服务器
            const response = await fetch("http://localhost:1337/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "data": inputData }),
            });
            console.log(response);
            if (!response.ok) {
                throw new Error("添加学生失败");
            }
            const data = await response.json();
            console.log(data);
            ctx.fetchData();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [ctx]);

    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        inputData.age = parseInt(inputData.age);
        console.log(inputData);
        // 调用addStudent函数
        addStudent(inputData);
    };

    return (
        <>
            <tr className={classes.StudentForm}>
                <td>
                    <input
                        onChange={handleChange}
                        value={inputData.name}
                        name="name"
                        type="text"
                    />
                </td>
                <td>
                    <select
                        onChange={handleChange}
                        value={inputData.gender}
                        className={classes.select}
                        name="gender"
                    >
                        <option value="">请选择</option>
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                </td>
                <td>
                    <input
                        onChange={handleChange}
                        value={inputData.age}
                        name="age"
                        type="number"
                    />
                </td>
                <td>
                    <input
                        onChange={handleChange}
                        value={inputData.address}
                        name="address"
                        type="text"
                    />
                </td>
                <td>
                    {props.student && <>
                        <button onClick={() => props.onCancel()}>Cancel</button>
                        <button>Confirm</button>
                    </>}
                    {!props.student &&
                        <button onClick={handleSubmit} className={classes.btn}>
                            Add
                        </button>
                    }
                </td>
            </tr>
            {loading && <tr><td colSpan={5}>加载中...</td></tr >}
            {error && <tr><td colSpan={5}>{error}</td></tr>}
        </>
    );
};

export default StudentForm;
