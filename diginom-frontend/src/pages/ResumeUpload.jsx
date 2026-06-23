import { useState } from "react";

import {
    Box,
    Button,
    Typography,
    Paper
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import api from "../api/api";

function ResumeUpload() {

    const [file, setFile] =
        useState(null);

    const [result, setResult] =
        useState(null);

    const handleUpload =
        async () => {

            if (!file) return;

            const formData =
                new FormData();

            formData.append(
                "file",
                file
            );

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await api.post(
                        "/resume/upload",
                        formData,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                                "Content-Type":
                                    "multipart/form-data"
                            }
                        }
                    );

                setResult(
                    response.data
                );

            } catch (error) {

                console.log(error);
            }
        };

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                sx={{
                    p: 4,
                    flexGrow: 1
                }}
            >

                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Resume Upload
                </Typography>

                <Paper
                    sx={{
                        p: 3
                    }}
                >

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                            setFile(
                                e.target.files[0]
                            )
                        }
                    />

                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={
                            handleUpload
                        }
                    >
                        Upload Resume
                    </Button>

                    {result && (

                        <Box
                            sx={{
                                mt: 3
                            }}
                        >

                            <Typography>
                                Name:
                                {
                                    result.resume
                                        .candidate_name
                                }
                            </Typography>

                            <Typography>
                                Email:
                                {
                                    result.resume
                                        .email
                                }
                            </Typography>

                            <Typography>
                                Phone:
                                {
                                    result.resume
                                        .phone
                                }
                            </Typography>

                            <Typography>
                                Skills:
                                {
                                    result.resume
                                        .skills
                                }
                            </Typography>

                        </Box>
                    )}

                </Paper>

            </Box>

        </Box>
    );
}

export default ResumeUpload;