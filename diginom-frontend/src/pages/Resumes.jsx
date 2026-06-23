import {
    useEffect,
    useState
} from "react";

import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import api from "../api/api";

function Resumes() {

    const [resumes, setResumes] =
        useState([]);

    useEffect(() => {

        const fetchResumes =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

                    const response =
                        await api.get(
                            "/resumes",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );

                    setResumes(
                        response.data
                    );

                } catch (error) {

                    console.log(error);
                }
            };

        fetchResumes();

    }, []);

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                sx={{
                    p: 4,
                    flexGrow: 1
                }}
            >

                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Resumes
                </Typography>

                <Paper>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Name
                                </TableCell>

                                <TableCell>
                                    Email
                                </TableCell>

                                <TableCell>
                                    Phone
                                </TableCell>

                                <TableCell>
                                    Skills
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {resumes.map(
                                (resume) => (

                                    <TableRow
                                        key={
                                            resume.resume_id
                                        }
                                    >

                                        <TableCell>
                                            {
                                                resume.candidate_name
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                resume.email
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                resume.phone
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                resume.skills
                                            }
                                        </TableCell>

                                    </TableRow>

                                )
                            )}

                        </TableBody>

                    </Table>

                </Paper>

            </Box>

        </Box>
    );
}

export default Resumes;