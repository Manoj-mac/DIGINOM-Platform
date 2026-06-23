import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from "@mui/material";

import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import api from "../api/api";

function Recommendations() {

    const { jobId } = useParams();

    const [recommendations,
        setRecommendations] =
        useState([]);

    useEffect(() => {

        const fetchRecommendations =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

                    const response =
                        await api.get(
                            `/jobs/${jobId}/recommendations`,
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );

                    setRecommendations(
                        response.data
                    );

                } catch (error) {

                    console.log(error);
                }
            };

        fetchRecommendations();

    }, [jobId]);

    console.log(recommendations);

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
                    minHeight: "100vh"
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                >
                    Candidate Recommendations
                </Typography>

                <TableContainer
                    component={Paper}
                >

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Rank
                                </TableCell>

                                <TableCell>
                                    Candidate Name
                                </TableCell>

                                <TableCell>
                                    Email
                                </TableCell>

                                <TableCell>
                                    Score
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {recommendations.map(
                                (
                                    candidate,
                                    index
                                ) => (

                                    <TableRow
                                        key={
                                            candidate.employee_id
                                        }
                                    >

                                        <TableCell>
                                            {
                                                index + 1
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                <TableCell>
                                                    {candidate.employee_name}
                                                </TableCell>
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                candidate.email
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                <TableCell>
                                                    {candidate.score}%
                                                </TableCell>
                                            }

                                        </TableCell>

                                    </TableRow>

                                )
                            )}

                        </TableBody>

                    </Table>

                </TableContainer>

            </Box>

        </Box>
    );
}

export default Recommendations;