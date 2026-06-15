import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    TextField,
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
import { useNavigate } from "react-router-dom";

function Interviews() {

    const [interviews, setInterviews] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const navigate =
        useNavigate();

    useEffect(() => {

        const fetchInterviews =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

                    const response =
                        await api.get(
                            "/interviews",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );

                    setInterviews(
                        response.data
                    );

                } catch (error) {

                    console.log(error);
                }
            };

        fetchInterviews();

    }, []);

    const deleteInterview =
        async (interviewId) => {

            if (
                !window.confirm(
                    "Delete interview?"
                )
            )
                return;

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                await api.delete(
                    `/interviews/${interviewId}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setInterviews(
                    interviews.filter(
                        (interview) =>
                            interview.interview_id !== interviewId
                    )
                );

            } catch (error) {

                console.log(error);
            }
        };

    const filteredInterviews =
        interviews.filter(
            (interview) =>
                interview.interview_type
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

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
                    Interview Management
                </Typography>

                <Card sx={{ mb: 3 }}>

                    <CardContent>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 2
                            }}
                        >

                            <TextField
                                label="Search Interview"
                                fullWidth
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                            <Button
                                variant="contained"
                                onClick={() =>
                                    navigate(
                                        "/interviews/add"
                                    )
                                }
                            >
                                Add Interview
                            </Button>

                        </Box>

                    </CardContent>

                </Card>

                <TableContainer
                    component={Paper}
                >

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Employee ID
                                </TableCell>

                                <TableCell>
                                    Job ID
                                </TableCell>

                                <TableCell>
                                    Date
                                </TableCell>

                                <TableCell>
                                    Type
                                </TableCell>

                                <TableCell>
                                    Status
                                </TableCell>

                                <TableCell>
                                    Feedback
                                </TableCell>

                                <TableCell>
                                    Actions
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {filteredInterviews.map(
                                (
                                    interview
                                ) => (

                                    <TableRow
                                        key={
                                            interview.interview_id
                                        }
                                    >

                                        <TableCell>
                                            {
                                                interview.employee_id
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                interview.job_id
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                interview.interview_date
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                interview.interview_type
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                interview.status
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                interview.feedback
                                            }
                                        </TableCell>

                                        <TableCell>

                                            <Button
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    mr: 1
                                                }}
                                                onClick={() =>
                                                    navigate(
                                                        `/interviews/edit/${interview.interview_id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                size="small"
                                                color="error"
                                                variant="contained"
                                                onClick={() =>
                                                    deleteInterview(
                                                        interview.interview_id
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>

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

export default Interviews;