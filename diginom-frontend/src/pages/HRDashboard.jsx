import { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Typography,
    CircularProgress,
    Alert
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import api from "../api/api";

function HRDashboard() {

    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/hr-dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setStats(response.data);

        } catch (err) {

            console.error(err);
            setError("Failed to load dashboard data.");

        } finally {

            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
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
                    mb={4}
                >
                    HR Dashboard
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3}>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <DashboardCard
                            title="Total Employees"
                            value={stats.total_employees ?? 0}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <DashboardCard
                            title="Active Employees"
                            value={stats.active_employees ?? 0}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <DashboardCard
                            title="Pending Documents"
                            value={stats.pending_documents ?? 0}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <DashboardCard
                            title="Pending Certifications"
                            value={stats.pending_certifications ?? 0}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <DashboardCard
                            title="Skills"
                            value={stats.total_skills ?? 0}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <DashboardCard
                            title="Jobs"
                            value={stats.total_jobs ?? 0}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <DashboardCard
                            title="Interviews"
                            value={stats.total_interviews ?? 0}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <DashboardCard
                            title="Offers"
                            value={stats.total_offers ?? 0}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <DashboardCard
                            title="Average Trust Score"
                            value={Number(stats.average_trust_score ?? 0).toFixed(2)}
                        />
                    </Grid>

                </Grid>

            </Box>

        </Box>
    );
}

export default HRDashboard;