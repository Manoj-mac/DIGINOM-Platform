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

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const fetchJobs = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const response =
                    await api.get(
                        "/jobs",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setJobs(response.data);

            } catch (error) {

                console.log(error);
            }
        };

        fetchJobs();

    }, []);

    const deleteJob = async (jobId) => {

        if (!window.confirm(
            "Delete this job?"
        )) return;

        try {

            const token =
                localStorage.getItem("token");

            await api.delete(
                `/jobs/${jobId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setJobs(
                jobs.filter(
                    (job) =>
                        job.job_id !== jobId
                )
            );

        } catch (error) {

            console.log(error);
        }
    };

    const filteredJobs =
        jobs.filter(
            (job) =>
                job.job_title
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
                    Jobs Management
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
                                label="Search Job"
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
                                        "/jobs/add"
                                    )
                                }
                            >
                                Add Job
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
                                    Job Title
                                </TableCell>

                                <TableCell>
                                    Skill
                                </TableCell>

                                <TableCell>
                                    Experience
                                </TableCell>

                                <TableCell>
                                    Openings
                                </TableCell>

                                <TableCell>
                                    Status
                                </TableCell>

                                <TableCell>
                                    Actions
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {filteredJobs.map(
                                (job) => (

                                    <TableRow
                                        key={
                                            job.job_id
                                        }
                                    >

                                        <TableCell>
                                            {
                                                job.job_title
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                job.required_skill
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                job.minimum_experience
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                job.openings
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                job.status
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
                                                        `/jobs/edit/${job.job_id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                size="small"
                                                color="success"
                                                variant="contained"
                                                sx={{
                                                    mr: 1
                                                }}
                                                onClick={() =>
                                                    navigate(
                                                        `/jobs/matches/${job.job_id}`
                                                    )
                                                }
                                            >
                                                Matches
                                            </Button>

                                            <Button
                                                size="small"
                                                color="error"
                                                variant="contained"
                                                onClick={() =>
                                                    deleteJob(
                                                        job.job_id
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

export default Jobs;