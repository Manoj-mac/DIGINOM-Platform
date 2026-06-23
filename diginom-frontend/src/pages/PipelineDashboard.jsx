import { useEffect, useState } from "react";

import {
    Grid,
    Paper,
    Typography,
    Box
} from "@mui/material";

import api from "../api/api";

import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import DashboardCard from "../components/DashboardCard";

function PipelineDashboard() {

    const [stats, setStats] =
        useState({});

    useEffect(() => {

        fetchPipeline();

    }, []);

    const fetchPipeline =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await api.get(
                        "/pipeline/dashboard",
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

        <Layout>

            <PageHeader

                title="Hiring Pipeline"

                subtitle="Recruitment funnel overview"

            />

            <Grid
                container
                spacing={3}
            >

                <Grid item xs={12} md={2}>
                    <DashboardCard
                        title="Applied"
                        value={
                            stats.Applied || 0
                        }
                    />
                </Grid>

                <Grid item xs={12} md={2}>
                    <DashboardCard
                        title="Screening"
                        value={
                            stats.Screening || 0
                        }
                    />
                </Grid>

                <Grid item xs={12} md={2}>
                    <DashboardCard
                        title="Technical"
                        value={
                            stats.Technical || 0
                        }
                    />
                </Grid>

                <Grid item xs={12} md={2}>
                    <DashboardCard
                        title="HR"
                        value={
                            stats.HR || 0
                        }
                    />
                </Grid>

                <Grid item xs={12} md={2}>
                    <DashboardCard
                        title="Selected"
                        value={
                            stats.Selected || 0
                        }
                    />
                </Grid>

                <Grid item xs={12} md={2}>
                    <DashboardCard
                        title="Rejected"
                        value={
                            stats.Rejected || 0
                        }
                    />
                </Grid>

            </Grid>

            <Box mt={4}>

                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                    >
                        Pipeline Summary
                    </Typography>

                    <Box mt={2}>

                        <Typography>
                            Applied →
                            Screening →
                            Technical →
                            HR →
                            Selected
                        </Typography>

                    </Box>

                </Paper>

            </Box>

        </Layout>
    );
}

export default PipelineDashboard;