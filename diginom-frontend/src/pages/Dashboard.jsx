import { useEffect, useState } from "react";

import {
    Box,
    Typography
} from "@mui/material";

import api from "../api/api";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import NotificationBell from "../components/NotificationBell";

function Dashboard() {

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

                            "/dashboard/stats",

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

        <Box
            sx={{
                display: "flex"
            }}
        >

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    backgroundColor:
                        "#f5f7fa",
                    minHeight:
                        "100vh"
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems:
                            "center",
                        mb: 4
                    }}
                >

                    <Box>

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                        >
                            DIGINOM Dashboard 🚀
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                        >
                            Talent Intelligence & Verification Platform
                        </Typography>

                    </Box>

                    <NotificationBell />

                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: 3
                    }}
                >

                    <DashboardCard
                        title="Employees"
                        value={
                            stats.employees || 0
                        }
                    />

                    <DashboardCard
                        title="Skills"
                        value={
                            stats.skills || 0
                        }
                    />

                    <DashboardCard
                        title="Certifications"
                        value={
                            stats.certifications || 0
                        }
                    />

                    <DashboardCard
                        title="Documents"
                        value={
                            stats.documents || 0
                        }
                    />

                    <DashboardCard
                        title="Jobs"
                        value={
                            stats.jobs || 0
                        }
                    />

                    <DashboardCard
                        title="Verifications"
                        value={
                            stats.verifications || 0
                        }
                    />

                </Box>

            </Box>

        </Box>
    );
}

export default Dashboard;