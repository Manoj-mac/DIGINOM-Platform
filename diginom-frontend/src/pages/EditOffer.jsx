import { useState } from "react";

import {
    Box,
    TextField,
    Button,
    Typography,
    Paper
} from "@mui/material";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import api from "../api/api";

function EditOffer() {

    const navigate =
        useNavigate();

    const { id } =
        useParams();

    const [status, setStatus] =
        useState("");

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                await api.put(
                    `/offers/${id}`,
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
                        Update Offer
                    </Typography>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <TextField
                            fullWidth
                            label="Status"
                            value={status}
                            onChange={(e) =>
                                setStatus(
                                    e.target.value
                                )
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

export default EditOffer;