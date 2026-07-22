import { Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import IdentityCard from "../components/identity/IdentityCard";
import VerificationCard from "../components/identity/VerificationCard";
import QRCodeCard from "../components/identity/QRCodeCard";
import SecurityScoreCard from "../components/identity/SecurityScoreCard";
import LoginHistoryCard from "../components/identity/LoginHistoryCard";
import PrimaryDeviceCard from "../components/security/PrimaryDeviceCard";

import { getIdentity } from "../services/identityService";
import { downloadIdentityCard } from "../utils/pdfGenerator";

import DownloadIcon from "@mui/icons-material/Download";

import QRCode from "qrcode";

function IdentityCenter() {

    const [identity, setIdentity] = useState(null);

    const [qrImage, setQrImage] = useState("");

    const employeeId = localStorage.getItem("employee_id");

    useEffect(() => {

        const fetchIdentity = async () => {

            try {

                const response = await getIdentity(employeeId);

                setIdentity(response.data);

                const qr = await QRCode.toDataURL(

                    `http://localhost:5173/verify/${response.data.employee.diginom_id}`,

                    {

                        width: 220,

                        margin: 2

                    }

                );

                setQrImage(qr);

            }

            catch (error) {

                console.error(error);

            }

        };

        if (employeeId) {

            fetchIdentity();

        }

    }, [employeeId]);

    if (!identity) {

        return null;

    }

    return (

        <DashboardLayout>

            <Button

                variant="contained"

                startIcon={<DownloadIcon />}

                onClick={() =>
                    downloadIdentityCard("identity-card")
                }

                sx={{
                    mb: 3,
                    borderRadius: 3,
                    px: 3,
                    py: 1.2,
                    fontWeight: 600
                }}

            >

                Download Identity Card

            </Button>

            <Grid container spacing={3}>

                <Grid item xs={12} lg={6}>

                    <IdentityCard

                        employee={identity.employee}

                        qrImage={qrImage}

                    />

                </Grid>

                <Grid item xs={12} lg={6}>

                    <VerificationCard

                        verification={identity.verification}

                    />

                </Grid>

                <Grid item xs={12} md={6}>

                    <QRCodeCard

                        employee={identity.employee}

                        qrImage={qrImage}

                    />

                </Grid>

                <Grid item xs={12} md={6}>

                    <PrimaryDeviceCard

                        security={identity.security}

                    />

                </Grid>

                <Grid item xs={12} md={6}>

                    <SecurityScoreCard

                        score={identity.trust_score}

                    />

                </Grid>

                <Grid item xs={12} md={6}>

                    <LoginHistoryCard

                        security={identity.security}

                    />

                </Grid>

            </Grid>

        </DashboardLayout>

    );

}

export default IdentityCenter;