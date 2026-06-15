import { useEffect, useState } from "react";
import {
    Box,
    Typography,
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

function AuditLogs() {

    const [logs, setLogs] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        const fetchLogs =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

                    const response =
                        await api.get(
                            "/audit-logs",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );

                    setLogs(
                        response.data
                    );

                } catch (error) {

                    console.log(error);
                }
            };

        fetchLogs();

    }, []);

    const filteredLogs =
        logs.filter(
            (log) =>
                log.user_email
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                log.entity_type
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
                    Audit Logs
                </Typography>

                <Card sx={{ mb: 3 }}>

                    <CardContent>

                        <TextField
                            label="Search Logs"
                            fullWidth
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </CardContent>

                </Card>

                <TableContainer
                    component={Paper}
                >

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    User
                                </TableCell>

                                <TableCell>
                                    Action
                                </TableCell>

                                <TableCell>
                                    Entity
                                </TableCell>

                                <TableCell>
                                    Entity ID
                                </TableCell>

                                <TableCell>
                                    Created At
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {filteredLogs.map(
                                (log) => (

                                    <TableRow
                                        key={
                                            log.audit_id
                                        }
                                    >

                                        <TableCell>
                                            {
                                                log.user_email
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                log.action
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                log.entity_type
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                log.entity_id
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                log.created_at ||
                                                "N/A"
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

export default AuditLogs;