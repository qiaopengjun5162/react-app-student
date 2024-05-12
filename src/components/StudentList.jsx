import React from 'react'
import Student from './Student'

const StudentList = (props) => {
    return (
        <table>
            <caption>学生列表</caption>
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>地址</th>
                </tr>
            </thead>
            <tbody>
                {props.students.map((student) => <Student key={student.id} student={student.attributes} />)}
            </tbody>
        </table>
    )
}

export default StudentList
