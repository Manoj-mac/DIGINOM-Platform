import { useEffect, useState } from "react";

import {
    Box,
    Paper,
    Typography,
    CircularProgress,
    Chip
} from "@mui/material";

import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import api from "../api/api";

function Timeline() {

    const { employeeId } = useParams();

    const [timeline, setTimeline] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (employeeId) {

            fetchTimeline();
        }

    }, [employeeId]);

    const fetchTimeline = async () => {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const response =
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
                response.data
            );

        } catch (error) {

            console.error(
                "Timeline Error:",
                error
            );

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return (

            <Layout>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 5
                    }}
                >
                    <CircularProgress />
                </Box>

            </Layout>
        );
    }

    return (

        <Layout>

            <PageHeader
                title="Employee Timeline"
                subtitle="Employee activity history"
            />

            <Box sx={{ mt: 3 }}>

                {timeline.length === 0 ? (

                    <Paper
                        sx={{
                            p: 4,
                            textAlign: "center"
                        }}
                    >

                        <Typography
                            variant="h6"
                        >
                            No timeline events found
                        </Typography>

                    </Paper>

                ) : (

                    timeline.map(

                        (
                            item,
                            index
                        ) => (

                            <Paper
                                key={index}
                                sx={{
                                    p: 3,
                                    mb: 2,
                                    borderLeft:
                                        "5px solid #2563eb"
                                }}
                            >

                                <Chip
                                    label={
                                        item.event_type
                                    }
                                    color="primary"
                                    sx={{
                                        mb: 1
                                    }}
                                />

                                <Typography
                                    variant="body1"
                                >
                                    {
                                        item.event_description
                                    }
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mt: 1
                                    }}
                                >
                                    {
                                        item.created_at
                                    }
                                </Typography>

                            </Paper>

                        )

                    )

                )}

            </Box>

        </Layout>
    );
}

export default Timeline;