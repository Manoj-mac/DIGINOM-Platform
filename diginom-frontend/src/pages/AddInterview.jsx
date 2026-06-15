import { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

function AddInterview() {

    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            employee_id: "",
            job_id: "",
            interview_date: "",
            interview_type: ""
        });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                await api.post(
                    "/interviews",
                    formData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                navigate(
                    "/interviews"
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

                <Paper sx={{ p: 4 }}>

                    <Typography
                        variant="h4"
                        gutterBottom
                    >
                        Add Interview
                    </Typography>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Employee ID"
                            name="employee_id"
                            value={
                                formData.employee_id
                            }
                            onChange={
                                handleChange
                            }
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Job ID"
                            name="job_id"
                            value={
                                formData.job_id
                            }
                            onChange={
                                handleChange
                            }
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            type="date"
                            name="interview_date"
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={
                                formData.interview_date
                            }
                            onChange={
                                handleChange
                            }
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Interview Type"
                            name="interview_type"
                            value={
                                formData.interview_type
                            }
                            onChange={
                                handleChange
                            }
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 2 }}
                        >
                            Save
                        </Button>

                    </form>

                </Paper>

            </Box>

        </Box>
    );
}

export default AddInterview;