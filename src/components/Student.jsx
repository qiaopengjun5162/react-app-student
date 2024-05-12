import React from 'react'

const Student = ({ student: { name, age, gender, address } }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{gender}</td>
            <td>{age}</td>
            <td>{address}</td>
        </tr>
    )
}

export default Student
