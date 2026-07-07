import { useEffect, useState } from "react";

import {
    Box,
    Grid,
    Typography
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import api from "../api/api";

function HRDashboard() {

    const [stats,
        setStats] =
        useState({});

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await api.get(
                        "/hr-dashboard",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setStats(
                    response.data
                );

            } catch (error) {

                console.log(
                    error
                );
            }
        };

    return (

        <Box
            sx={{
                display: "flex"
            }}
        >

            <Sidebar />

            <Box
                sx={{
                    flexGrow: 1,
                    p: 4,
                    background:
                        "#f5f7fa",
                    minHeight:
                        "100vh"
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                >
                    HR Dashboard
                </Typography>

                <Grid
                    container
                    spacing={3}
                >

                    <Grid item xs={12} md={3}>
                        <DashboardCard
                            title="Employees"
                            value={
                                stats.total_employees || 0
                            }
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <DashboardCard
                            title="Pending Documents"
                            value={
                                stats.pending_documents || 0
                            }
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <DashboardCard
                            title="Pending Certifications"
                            value={
                                stats.pending_certifications || 0
                            }
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <DashboardCard
                            title="Verified Employees"
                            value={
                                stats.verified_employees || 0
                            }
                        />
                    </Grid>

                </Grid>

            </Box>

        </Box>
    );
}

export default HRDashboard;