import { useEffect, useState } from "react";

import {
    Box,
    Grid,
    Typography
} from "@mui/material";

import api from "../api/api";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";

function RecruiterDashboard() {

    const [stats, setStats] =
        useState({});

    useEffect(() => {

        const fetchStats =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

                    const response =
                        await api.get(
                            "/recruiter-dashboard",
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

                    console.log(error);
                }
            };

        fetchStats();

    }, []);

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    backgroundColor: "#f5f7fa",
                    minHeight: "100vh"
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                >
                    Recruiter Dashboard
                </Typography>

                <Grid
                    container
                    spacing={3}
                >

                    <Grid item xs={12} sm={6} md={3}>
                        <DashboardCard
                            title="Total Jobs"
                            value={
                                stats.total_jobs || 0
                            }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <DashboardCard
                            title="Open Jobs"
                            value={
                                stats.open_jobs || 0
                            }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <DashboardCard
                            title="Employees"
                            value={
                                stats.total_employees || 0
                            }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <DashboardCard
                            title="Verified Skills"
                            value={
                                stats.verified_skills || 0
                            }
                        />
                    </Grid>

                </Grid>

            </Box>

        </Box>
    );
}

export default RecruiterDashboard;