import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";

import api from "../api/api";
import Sidebar from "../components/Sidebar";

function JobMatches() {

    const { jobId } = useParams();

    const [matches, setMatches] =
        useState([]);

    useEffect(() => {

        const fetchMatches =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

                    const response =
                        await api.get(
                            `/jobs/${jobId}/matches`,
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );

                    setMatches(
                        response.data
                    );

                } catch (error) {

                    console.log(error);
                }
            };

        fetchMatches();

    }, [jobId]);

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
                    Candidate Matches
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
                                    Candidate
                                </TableCell>

                                <TableCell>
                                    Email
                                </TableCell>

                                <TableCell>
                                    Match Score
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {matches.map(
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
                                            {index + 1}
                                        </TableCell>

                                        <TableCell>
                                            {
                                                candidate.name
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                candidate.email
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                candidate.match_score
                                            }
                                            %
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

export default JobMatches;