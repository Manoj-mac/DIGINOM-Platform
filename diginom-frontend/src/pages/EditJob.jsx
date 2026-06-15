import { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    MenuItem,
    TextField
} from "@mui/material";

import api from "../api/api";
import Sidebar from "../components/Sidebar";
import {
    useNavigate,
    useParams
} from "react-router-dom";

function EditJob() {

    const { jobId } = useParams();

    const navigate =
        useNavigate();

    const [status, setStatus] =
        useState("OPEN");

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                await api.put(
                    `/jobs/${jobId}`,
                    {
                        status
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
                    Edit Job Status
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
                                label="Status"
                                margin="normal"
                                value={status}
                                onChange={(e) =>
                                    setStatus(
                                        e.target.value
                                    )
                                }
                            >

                                <MenuItem value="OPEN">
                                    OPEN
                                </MenuItem>

                                <MenuItem value="CLOSED">
                                    CLOSED
                                </MenuItem>

                                <MenuItem value="ON_HOLD">
                                    ON HOLD
                                </MenuItem>

                            </TextField>

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 2 }}
                            >
                                Update Status
                            </Button>

                        </form>

                    </CardContent>

                </Card>

            </Box>

        </Box>
    );
}

export default EditJob;