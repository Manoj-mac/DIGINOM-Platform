import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Checkbox,
    FormControlLabel
} from "@mui/material";

import api from "../api/api";
import Sidebar from "../components/Sidebar";
import {
    useNavigate,
    useParams
} from "react-router-dom";

function EditCertification() {

    const { certificationId } =
        useParams();

    const navigate =
        useNavigate();

    const [formData, setFormData] =
        useState({
            certification_name: "",
            issuer: "",
            issue_date: "",
            expiry_date: "",
            verified: false
        });

    useEffect(() => {

        const fetchCertification =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

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

                    const certification =
                        response.data.find(
                            (c) =>
                                c.certification_id ===
                                certificationId
                        );

                    if (
                        certification
                    ) {

                        setFormData({
                            certification_name:
                                certification.certification_name,
                            issuer:
                                certification.issuer,
                            issue_date:
                                certification.issue_date,
                            expiry_date:
                                certification.expiry_date || "",
                            verified:
                                certification.verified
                        });
                    }

                } catch (error) {

                    console.log(
                        error
                    );
                }
            };

        fetchCertification();

    }, [certificationId]);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                await api.put(
                    `/certifications/${certificationId}`,
                    formData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                navigate(
                    "/certifications"
                );

            } catch (error) {

                console.log(
                    error
                );
            }
        };

    return (

        <Box
            sx={{
                display: "flex"
            }}
        >

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
                    fontWeight="bold"
                    gutterBottom
                >
                    Edit Certification
                </Typography>

                <Card>

                    <CardContent>

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <TextField
                                fullWidth
                                label="Certification Name"
                                margin="normal"
                                value={
                                    formData.certification_name
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        certification_name:
                                            e.target.value
                                    })
                                }
                            />

                            <TextField
                                fullWidth
                                label="Issuer"
                                margin="normal"
                                value={
                                    formData.issuer
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        issuer:
                                            e.target.value
                                    })
                                }
                            />

                            <Typography
                                sx={{
                                    mt: 2,
                                    mb: 1
                                }}
                            >
                                Issue Date
                            </Typography>

                            <TextField
                                fullWidth
                                type="date"
                                value={
                                    formData.issue_date
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        issue_date:
                                            e.target.value
                                    })
                                }
                            />

                            <Typography
                                sx={{
                                    mt: 2,
                                    mb: 1
                                }}
                            >
                                Expiry Date
                            </Typography>

                            <TextField
                                fullWidth
                                type="date"
                                value={
                                    formData.expiry_date
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        expiry_date:
                                            e.target.value
                                    })
                                }
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            formData.verified
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                verified:
                                                    e.target.checked
                                            })
                                        }
                                    />
                                }
                                label="Verified"
                            />

                            <br />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 2
                                }}
                            >
                                Save Changes
                            </Button>

                        </form>

                    </CardContent>

                </Card>

            </Box>

        </Box>
    );
}

export default EditCertification;