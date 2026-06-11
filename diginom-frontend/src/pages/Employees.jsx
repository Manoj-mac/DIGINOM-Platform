import { useEffect, useState } from "react";
import api from "../api/api";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";


function Employees() {

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {

        const fetchEmployees = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const response =
                    await api.get(
                        "/employees",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );
                console.log(response.data);

                setEmployees(
                    response.data
                );

            } catch (error) {

                console.log(error);
            }
        };

        fetchEmployees();

    }, []);

    const deleteEmployee = async (employeeId) => {

        try {

            const token =
                localStorage.getItem("token");

            await api.delete(
                `/employees/${employeeId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setEmployees(
                employees.filter(
                    (employee) =>
                        employee.employee_id !== employeeId
                )
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div style={{ display: "flex" }}>

            <Sidebar />

            <div style={{ padding: "20px" }}>

                <h1>Employees</h1>

                <button
                    onClick={() =>
                        navigate("/employees/add")
                    }
                >
                    Add Employee
                </button>

                <br />
                <br />

                <table border="1">

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {employees.map(
                            (employee) => (

                                <tr
                                    key={
                                        employee.employee_id
                                    }
                                >

                                    <td>
                                        {
                                            employee.first_name
                                        }
                                    </td>

                                    <td>
                                        {
                                            employee.email
                                        }
                                    </td>

                                    <td>
                                        {
                                            employee.role
                                        }
                                    </td>

                                    <td>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/employees/edit/${employee.employee_id}`
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        {" "}

                                        <button
                                            onClick={() =>
                                                deleteEmployee(
                                                    employee.employee_id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default Employees;