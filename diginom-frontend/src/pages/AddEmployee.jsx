import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Sidebar from "../components/Sidebar";

function AddEmployee() {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        
        first_name: "",
        last_name: "",
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

            await api.post(
                "/employees",
                employee,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                "Employee Added Successfully"
            );

            navigate("/employees");

        } catch (error) {

            console.log(error);

            alert(
                "Failed to Add Employee"
            );
        }
    };

    return (

        <div style={{ display: "flex" }}>

            <Sidebar />

            <div style={{ padding: "20px" }}>

                <h1>Add Employee</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={employee.first_name}
                        onChange={handleChange}
                    />

                    <br />
                    <br />

                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={employee.last_name}
                        onChange={handleChange}
                    />

                    <br />
                    <br />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={employee.email}
                        onChange={handleChange}
                    />

                    <br />
                    <br />

                    <button type="submit">
                        Add Employee
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddEmployee;