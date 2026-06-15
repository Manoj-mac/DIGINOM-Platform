import { useState } from "react";

import {
    Box,
    TextField,
    Button,
    Typography,
    Paper
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import api from "../api/api";

function AddOffer() {

    const navigate =
        useNavigate();

    const [formData, setFormData] =
        useState({

            employee_id: "",

            job_id: "",

            offered_salary: "",

            joining_date: ""
        });

    const handleChange =
        (e) => {

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
                    "/offers",
                    formData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                navigate(
                    "/offers"
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
                        Add Offer
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
                            onChange={
                                handleChange
                            }
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Job ID"
                            name="job_id"
                            onChange={
                                handleChange
                            }
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Salary"
                            name="offered_salary"
                            onChange={
                                handleChange
                            }
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            type="date"
                            name="joining_date"
                            InputLabelProps={{
                                shrink: true
                            }}
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

export default AddOffer;