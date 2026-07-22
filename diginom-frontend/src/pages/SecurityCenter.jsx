import {
    Box,
    Container,
    Grid,
    Paper
} from "@mui/material";

import SecurityHeader from "../components/security/SecurityHeader";
import SecurityOverview from "../components/security/SecurityOverview";
import PrimaryDeviceCard from "../components/security/PrimaryDeviceCard";
import SecurityTimeline from "../components/security/SecurityTimeline";
import DeviceGrid from "../components/security/DeviceGrid";
import QuickActions from "../components/security/QuickActions";

export default function SecurityCenter() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#0F172A",
                py: 4
            }}
        >
            <Container maxWidth="xl">

                <SecurityHeader />

                <Box mt={4}>
                    <SecurityOverview />
                </Box>

                <Grid container spacing={3} mt={1}>

                    <Grid size={{ xs: 12, lg: 8 }}>
                        <PrimaryDeviceCard />
                    </Grid>

                    <Grid size={{ xs: 12, lg: 4 }}>
                        <SecurityTimeline />
                    </Grid>

                </Grid>

                <Box mt={4}>
                    <DeviceGrid />
                </Box>

                <Box mt={4}>
                    <QuickActions />
                </Box>

            </Container>
        </Box>
    );
}