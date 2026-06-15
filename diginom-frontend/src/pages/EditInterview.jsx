import { useState } from "react";

import {
    Box,
    Typography,
    TextField,
    Button,
    Paper
} from "@mui/material";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import api from "../api/api";

function EditInterview() {

    const navigate =
        useNavigate();

    const { id } =
        useParams();

    const [formData, setFormData] =
        useState({
            status: "",
            feedback: ""
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

                await api.put(
                    `/interviews/${id}`,
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
                        Update Interview
                    </Typography>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Status"
                            name="status"
                            value={
                                formData.status
                            }
                            onChange={
                                handleChange
                            }
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            label="Feedback"
                            name="feedback"
                            value={
                                formData.feedback
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
                            Update
                        </Button>

                    </form>

                </Paper>

            </Box>

        </Box>
    );
}

export default EditInterview;