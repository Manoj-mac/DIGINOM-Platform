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

function AddDocument() {

    const navigate = useNavigate();

    const [employees, setEmployees] =
        useState([]);

    const [formData, setFormData] =
        useState({
            employee_id: "",
            document_name: "",
            document_type: "",
            file_path: "",
            document_url: ""
        });

    useEffect(() => {

        const fetchEmployees =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

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

                    setEmployees(
                        response.data
                    );

                } catch (error) {

                    console.log(error);
                }
            };

        fetchEmployees();

    }, []);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                await api.post(
                    "/documents",
                    formData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                navigate(
                    "/documents"
                );

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
                    Add Document
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
                                    (
                                        employee
                                    ) => (

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
                                label="Document Name"
                                margin="normal"
                                value={
                                    formData.document_name
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        document_name:
                                            e.target.value
                                    })
                                }
                            />

                            <TextField
                                select
                                fullWidth
                                label="Document Type"
                                margin="normal"
                                value={
                                    formData.document_type
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        document_type:
                                            e.target.value
                                    })
                                }
                            >

                                <MenuItem value="Resume">
                                    Resume
                                </MenuItem>

                                <MenuItem value="Degree">
                                    Degree
                                </MenuItem>

                                <MenuItem value="Certification">
                                    Certification
                                </MenuItem>

                                <MenuItem value="ID Proof">
                                    ID Proof
                                </MenuItem>

                            </TextField>

                            <TextField
                                fullWidth
                                label="File Path"
                                margin="normal"
                                value={
                                    formData.file_path
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        file_path:
                                            e.target.value
                                    })
                                }
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 2
                                }}
                            >
                                Save Document
                            </Button>

                        </form>

                    </CardContent>

                </Card>

            </Box>

        </Box>
    );
}

export default AddDocument;