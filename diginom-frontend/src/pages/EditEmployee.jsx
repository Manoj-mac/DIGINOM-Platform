import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import Sidebar from "../components/Sidebar";

function EditEmployee() {

    const { employeeId } = useParams();

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        first_name: "",
        email: ""
    });

    const handleChange = (e) => {

        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await api.put(
                `/employees/${employeeId}`,
                employee,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                "Employee Updated"
            );

            navigate("/employees");

        } catch (error) {

            console.log(error);

            alert(
                "Update Failed"
            );
        }
    };

    return (

        <div style={{ display: "flex" }}>

            <Sidebar />

            <div style={{ padding: "20px" }}>

                <h1>Edit Employee</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={employee.first_name}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={employee.email}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <button type="submit">
                        Update Employee
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditEmployee;