import { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button
} from "@mui/material";

import api from "../api/api";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function AddJob() {

    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            job_title: "",
            required_skill: "",
            minimum_experience: "",
            openings: ""
        });

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await api.post(
                "/jobs",
                {
                    ...formData,
                    minimum_experience:
                        Number(
                            formData.minimum_experience
                        ),
                    openings:
                        Number(
                            formData.openings
                        )
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            navigate("/jobs");

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
                    Add Job
                </Typography>

                <Card>

                    <CardContent>

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <TextField
                                fullWidth
                                label="Job Title"
                                margin="normal"
                                value={
                                    formData.job_title
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        job_title:
                                            e.target.value
                                    })
                                }
                            />

                            <TextField
                                fullWidth
                                label="Required Skill"
                                margin="normal"
                                value={
                                    formData.required_skill
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        required_skill:
                                            e.target.value
                                    })
                                }
                            />

                            <TextField
                                fullWidth
                                type="number"
                                label="Minimum Experience"
                                margin="normal"
                                value={
                                    formData.minimum_experience
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        minimum_experience:
                                            e.target.value
                                    })
                                }
                            />

                            <TextField
                                fullWidth
                                type="number"
                                label="Openings"
                                margin="normal"
                                value={
                                    formData.openings
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        openings:
                                            e.target.value
                                    })
                                }
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 2 }}
                            >
                                Save Job
                            </Button>

                        </form>

                    </CardContent>

                </Card>

            </Box>

        </Box>
    );
}

export default AddJob;