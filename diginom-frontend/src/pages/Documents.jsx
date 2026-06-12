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

function Documents() {

    const [documents, setDocuments] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const navigate =
        useNavigate();

    useEffect(() => {

        const fetchDocuments =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

                    const response =
                        await api.get(
                            "/documents",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );

                    setDocuments(
                        response.data
                    );

                } catch (error) {

                    console.log(
                        error
                    );
                }
            };

        fetchDocuments();

    }, []);

    const deleteDocument =
        async (documentId) => {

            if (
                !window.confirm(
                    "Delete this document?"
                )
            )
                return;

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                await api.delete(
                    `/documents/${documentId}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setDocuments(
                    documents.filter(
                        (document) =>
                            document.document_id !== documentId
                    )
                );

            } catch (error) {

                console.log(
                    error
                );
            }
        };

    const filteredDocuments =
        documents.filter(
            (document) =>
                document.document_name
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
                    Documents Management
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
                                label="Search Document"
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
                                        "/documents/add"
                                    )
                                }
                            >
                                Add Document
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
                                    Employee
                                </TableCell>

                                <TableCell>
                                    Document Name
                                </TableCell>

                                <TableCell>
                                    Type
                                </TableCell>

                                <TableCell>
                                    File
                                </TableCell>

                                <TableCell>
                                    Verified
                                </TableCell>

                                <TableCell>
                                    Actions
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {filteredDocuments.map(
                                (document) => (

                                    <TableRow
                                        key={document.document_id}
                                    >

                                        <TableCell>
                                            {
                                                document.employee_name ||
                                                document.employee_id
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                document.document_name
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                document.document_type
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                document.file_path
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                document.verified
                                                    ? "Verified"
                                                    : "Pending"
                                            }
                                        </TableCell>

                                        <TableCell>

                                            <Button
                                                size="small"
                                                color="error"
                                                variant="contained"
                                                onClick={() =>
                                                    deleteDocument(
                                                        document.document_id
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

export default Documents;