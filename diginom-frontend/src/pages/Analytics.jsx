import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import api from "../api/api";

function Analytics() {

    const [analytics, setAnalytics] =
        useState({});

    useEffect(() => {

        const fetchAnalytics =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

                    const response =
                        await api.get(
                            "/analytics",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );

                    setAnalytics(
                        response.data
                    );

                } catch (error) {

                    console.log(error);
                }
            };

        fetchAnalytics();

    }, []);

    const cards = [

        {
            title: "Employees",
            value: analytics.employees
        },

        {
            title: "Skills",
            value: analytics.skills
        },

        {
            title: "Certifications",
            value: analytics.certifications
        },

        {
            title: "Documents",
            value: analytics.documents
        },

        {
            title: "Companies",
            value: analytics.companies
        },

        {
            title: "Jobs",
            value: analytics.jobs
        },

        {
            title: "Interviews",
            value: analytics.interviews
        },

        {
            title: "Offers",
            value: analytics.offers
        }
    ];

    return (

        <Box sx={{ display: "flex" }}>

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

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                >
                    Analytics Dashboard
                </Typography>

                <Grid
                    container
                    spacing={3}
                >

                    {cards.map(
                        (card) => (

                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                key={
                                    card.title
                                }
                            >

                                <Card>

                                    <CardContent>

                                        <Typography
                                            variant="h6"
                                        >
                                            {
                                                card.title
                                            }
                                        </Typography>

                                        <Typography
                                            variant="h3"
                                            fontWeight="bold"
                                        >
                                            {
                                                card.value || 0
                                            }
                                        </Typography>

                                    </CardContent>

                                </Card>

                            </Grid>

                        )
                    )}

                </Grid>

            </Box>

        </Box>
    );
}

export default Analytics;