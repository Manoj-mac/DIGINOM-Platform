import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

function Offers() {

    const [offers, setOffers] =
        useState([]);

    const navigate =
        useNavigate();

    useEffect(() => {

        const fetchOffers =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

                    const response =
                        await api.get(
                            "/offers",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );

                    setOffers(
                        response.data
                    );

                } catch (error) {

                    console.log(error);
                }
            };

        fetchOffers();

    }, []);

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4
                }}
            >

                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Offers
                </Typography>

                <Button
                    variant="contained"
                    sx={{ mb: 2 }}
                    onClick={() =>
                        navigate("/offers/add")
                    }
                >
                    Add Offer
                </Button>

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
                                    Salary
                                </TableCell>

                                <TableCell>
                                    Joining Date
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

                            {offers.map(
                                (offer) => (

                                    <TableRow
                                        key={
                                            offer.offer_id
                                        }
                                    >

                                        <TableCell>
                                            {
                                                offer.employee_id
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                offer.job_id
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                offer.offered_salary
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                offer.joining_date
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                offer.status
                                            }
                                        </TableCell>

                                        <TableCell>

                                            <Button
                                                onClick={() =>
                                                    navigate(
                                                        `/offers/edit/${offer.offer_id}`
                                                    )
                                                }
                                            >
                                                <Button
                                                    color="success"
                                                    variant="contained"
                                                    onClick={() =>
                                                        window.open(
                                                            `${api.defaults.baseURL}/offers/${offer.offer_id}/pdf`
                                                        )
                                                    }
                                                >
                                                    PDF
                                                </Button>
                                                Edit
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

export default Offers;