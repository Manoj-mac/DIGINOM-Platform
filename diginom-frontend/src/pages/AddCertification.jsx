import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    MenuItem
} from "@mui/material";

import api from "../api/api";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function AddCertification() {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);

    const [formData, setFormData] = useState({
        employee_id: "",
        certification_name: "",
        issuer: "",
        issue_date: "",
        expiry_date: ""
    });

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

                setEmployees(response.data);

            } catch (error) {

                console.log(error);
            }
        };

        fetchEmployees();

    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await api.post(
                "/certifications",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            navigate("/certifications");

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                >
                    Add Certification
                </Typography>

                <Card>

                    <CardContent>

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <TextField
                                select
                                fullWidth
                                label="Employee"
                                margin="normal"
                                value={
                                    formData.employee_id
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        employee_id:
                                            e.target.value
                                    })
                                }
                            >

                                {employees.map(
                                    (employee) => (

                                        <MenuItem
                                            key={
                                                employee.employee_id
                                            }
                                            value={
                                                employee.employee_id
                                            }
                                        >
                                            {
                                                employee.first_name
                                            }
                                        </MenuItem>

                                    )
                                )}

                            </TextField>

                            <TextField
                                fullWidth
                                label="Certification Name"
                                margin="normal"
                                value={
                                    formData.certification_name
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        certification_name:
                                            e.target.value
                                    })
                                }
                            />

                            <TextField
                                fullWidth
                                label="Issuer"
                                margin="normal"
                                value={
                                    formData.issuer
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        issuer:
                                            e.target.value
                                    })
                                }
                            />

                            <Box sx={{ mt: 2 }}>
                                <Typography
                                    variant="body2"
                                    sx={{ mb: 1 }}
                                >
                                    Issue Date
                                </Typography>

                                <TextField
                                    fullWidth
                                    type="date"
                                    value={formData.issue_date}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            issue_date: e.target.value
                                        })
                                    }
                                />
                            </Box>

                            <Box sx={{ mt: 2 }}>
                                <Typography
                                    variant="body2"
                                    sx={{ mb: 1 }}
                                >
                                    Expiry Date
                                </Typography>

                                <TextField
                                    fullWidth
                                    type="date"
                                    value={formData.expiry_date}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            expiry_date: e.target.value
                                        })
                                    }
                                />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 2 }}
                            >
                                Save Certification
                            </Button>

                        </form>

                    </CardContent>

                </Card>

            </Box>

        </Box>
    );
}

export default AddCertification;