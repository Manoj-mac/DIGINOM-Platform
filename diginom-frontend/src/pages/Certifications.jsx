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

function Certifications() {

    const [certifications, setCertifications] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const fetchCertifications = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const response =
                    await api.get(
                        "/certifications",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setCertifications(
                    response.data
                );

            } catch (error) {

                console.log(error);
            }
        };

        fetchCertifications();

    }, []);

    const filteredCertifications =
        certifications.filter(
            (certification) =>
                certification.certification_name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );
    const deleteCertification = async (
        certificationId
    ) => {

        if (
            !window.confirm(
                "Delete this certification?"
            )
        ) {
            return;
        }

        try {

            const token =
                localStorage.getItem("token");

            await api.delete(
                `/certifications/${certificationId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setCertifications(
                certifications.filter(
                    (certification) =>
                        certification.certification_id !== certificationId
                )
            );

        } catch (error) {

            console.log(error);
        }
    };

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
                    Certifications Management
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
                                label="Search Certification"
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
                                        "/certifications/add"
                                    )
                                }
                            >
                                Add Certification
                            </Button>

                        </Box>

                    </CardContent>

                </Card>

                <TableContainer component={Paper}>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Certification
                                </TableCell>

                                <TableCell>
                                    Issuer
                                </TableCell>

                                <TableCell>
                                    Issue Date
                                </TableCell>

                                <TableCell>
                                    Expiry Date
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

                            {filteredCertifications.map(
                                (certification) => (

                                    <TableRow
                                        key={
                                            certification.certification_id
                                        }
                                    >

                                        <TableCell>
                                            {
                                                certification.certification_name
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                certification.issuer
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                certification.issue_date
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                certification.expiry_date
                                            }
                                        </TableCell>

                                        <TableCell>

                                            <span
                                                style={{
                                                    backgroundColor:
                                                        certification.verified
                                                            ? "#4caf50"
                                                            : "#f44336",
                                                    color: "white",
                                                    padding: "4px 10px",
                                                    borderRadius: "12px",
                                                    fontSize: "12px"
                                                }}
                                            >
                                                {
                                                    certification.verified
                                                        ? "Verified"
                                                        : "Pending"
                                                }
                                            </span>

                                        </TableCell>

                                        <TableCell>

                                            <Button
                                                variant="outlined"
                                                size="small"
                                                sx={{ mr: 1 }}
                                                onClick={() =>
                                                    navigate(
                                                        `/certifications/edit/${certification.certification_id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                onClick={() =>
                                                    deleteCertification(
                                                        certification.certification_id
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

export default Certifications;