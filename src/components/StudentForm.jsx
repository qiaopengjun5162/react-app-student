import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import StuContext from "../store/StuContext";
import classes from "./StudentForm.module.css";

const StudentForm = (props) => {
    const [inputData, setInputData] = useState({
        name: props.student ? props.student.name : "",
        gender: props.student ? props.student.gender : "男",
        age: props.student ? props.student.age : "",
        address: props.student ? props.student.address : "",
    });

    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const ctx = useContext(StuContext);

    const { loading, error, fetchData: addOrUpdateStudent } = useFetch({
        url: props.student ? `students/${props.student.id}` : "students",
        method: props.student ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }, ctx.fetchData
    );


    // 创建一个添加学生的函数
    // const addStudent = useCallback(async (inputData) => {
    //     setLoading(true);
    //     try {
    //         setError(null);
    //         // 发送POST请求到服务器
    //         const response = await fetch("http://localhost:1337/api/students", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ "data": inputData }),
    //         });
    //         console.log(response);
    //         if (!response.ok) {
    //             throw new Error("添加学生失败");
    //         }
    //         const data = await response.json();
    //         console.log(data);
    //         ctx.fetchData();
    //     } catch (error) {
    //         setError(error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [ctx]);

    // 创建一个更新学生的函数
    // const updateStudent = useCallback(async (id, newStudents) => {
    //     setLoading(true);
    //     try {
    //         setError(null);
    //         // 发送PUT请求到服务器
    //         const response = await fetch(`http://localhost:1337/api/students/${id}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ "data": newStudents }),

    //         })
    //         if (!response.ok) {
    //             throw new Error("更新学生失败");
    //         }
    //         const data = await response.json();
    //         console.log(data);
    //         ctx.fetchData();
    //     }
    //     catch (error) {
    //         setError(error.message);
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // }, [ctx])

    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        inputData.age = parseInt(inputData.age);
        // 调用addStudent函数
        addOrUpdateStudent(inputData);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        // 调用updateStudent函数
        // updateStudent(props.student.id, inputData);
        addOrUpdateStudent(inputData);
    }



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
                        <button onClick={handleUpdate}>Confirm</button>
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
