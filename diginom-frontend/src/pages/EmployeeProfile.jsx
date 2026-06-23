import { useEffect, useState } from "react";

import {
    Box,
    Grid,
    Paper,
    Typography,
    Divider,
    CircularProgress
} from "@mui/material";

import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import api from "../api/api";

function EmployeeProfile() {

    const { employeeId } =
        useParams();

    const [employee,
        setEmployee] =
        useState(null);

    const [trustScore,
        setTrustScore] =
        useState(0);

    const [timeline,
        setTimeline] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const employeeResponse =
                    await api.get(

                        `/employees/${employeeId}`,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setEmployee(
                    employeeResponse.data
                );

                const scoreResponse =
                    await api.get(

                        `/employees/${employeeId}/trust-score`,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setTrustScore(
                    scoreResponse.data.trust_score
                );

                const timelineResponse =
                    await api.get(

                        `/employees/${employeeId}/timeline`,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setTimeline(
                    timelineResponse.data
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 10
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

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
                    Employee Profile
                </Typography>

                <Grid
                    container
                    spacing={3}
                >

                    <Grid
                        item
                        xs={12}
                        md={8}
                    >

                        <Paper
                            sx={{
                                p: 3
                            }}
                        >

                            <Typography
                                variant="h5"
                                fontWeight="bold"
                            >
                                {
                                    employee?.first_name
                                }
                            </Typography>

                            <Divider
                                sx={{
                                    my: 2
                                }}
                            />

                            <Typography>
                                <strong>
                                    Email:
                                </strong>{" "}
                                {
                                    employee?.email
                                }
                            </Typography>

                            <Typography>
                                <strong>
                                    DIGINOM ID:
                                </strong>{" "}
                                {
                                    employee?.diginom_id
                                }
                            </Typography>

                            <Typography>
                                <strong>
                                    Role:
                                </strong>{" "}
                                {
                                    employee?.role
                                }
                            </Typography>

                        </Paper>

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={4}
                    >

                        <Paper
                            sx={{
                                p: 3,
                                textAlign:
                                    "center"
                            }}
                        >

                            <Typography
                                variant="h6"
                            >
                                Trust Score
                            </Typography>

                            <Typography
                                variant="h2"
                                fontWeight="bold"
                                sx={{
                                    color:
                                        trustScore >= 80
                                            ? "#16a34a"
                                            : trustScore >= 50
                                                ? "#f59e0b"
                                                : "#dc2626"
                                }}
                            >
                                {trustScore}
                            </Typography>

                            <Typography>
                                /100
                            </Typography>

                        </Paper>

                    </Grid>

                    <Grid
                        item
                        xs={12}
                    >

                        <Paper
                            sx={{
                                p: 3
                            }}
                        >

                            <Typography
                                variant="h6"
                                gutterBottom
                            >
                                Timeline
                            </Typography>

                            <Divider
                                sx={{
                                    mb: 2
                                }}
                            />

                            {timeline.length === 0 ? (

                                <Typography>
                                    No timeline found
                                </Typography>

                            ) : (

                                timeline.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <Paper
                                            key={index}
                                            sx={{
                                                p: 2,
                                                mb: 2,
                                                borderLeft:
                                                    "5px solid #2563eb"
                                            }}
                                        >

                                            <Typography
                                                fontWeight="bold"
                                            >
                                                {
                                                    item.event_type
                                                }
                                            </Typography>

                                            <Typography>
                                                {
                                                    item.event_description
                                                }
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {
                                                    item.created_at
                                                }
                                            </Typography>

                                        </Paper>

                                    )
                                )

                            )}

                        </Paper>

                    </Grid>

                </Grid>

            </Box>

        </Box>
    );
}

export default EmployeeProfile;