import { useEffect, useState } from "react";

import {
    Grid,
    Typography
} from "@mui/material";

import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import DescriptionRoundedIcon from "@mui/icons-material/Description";
import WorkRoundedIcon from "@mui/icons-material/Work";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";

import api from "../api/api";


import DashboardLayout from "../components/dashboard/DashboardLayout";
import PageHeader from "../components/Layout/PageHeader";


import MetricCard from "../components/ui/MetricCard";
import AppCard from "../components/ui/AppCard";

function Dashboard() {

    const [stats, setStats] = useState({});

    useEffect(() => {

        const fetchStats = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get(
                    "/dashboard/stats",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setStats(response.data);

            } catch (error) {

                console.error(error);

            }

        };

        fetchStats();

    }, []);

    return (

        <DashboardLayout>

            <PageHeader
                title="Dashboard"
                subtitle="Welcome to the DIGINOM Workforce Identity Platform"
            />

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}>
                    <MetricCard
                        title="Employees"
                        value={stats.employees || 0}
                        icon={<PeopleAltRoundedIcon />}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}>
                    <MetricCard
                        title="Skills"
                        value={stats.skills || 0}
                        icon={<SchoolRoundedIcon />}
                        color="#8B5CF6"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}>
                    <MetricCard
                        title="Certifications"
                        value={stats.certifications || 0}
                        icon={<VerifiedRoundedIcon />}
                        color="#22C55E"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}>
                    <MetricCard
                        title="Documents"
                        value={stats.documents || 0}
                        icon={<DescriptionRoundedIcon />}
                        color="#F59E0B"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}>
                    <MetricCard
                        title="Jobs"
                        value={stats.jobs || 0}
                        icon={<WorkRoundedIcon />}
                        color="#2563EB"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}>
                    <MetricCard
                        title="Verifications"
                        value={stats.verifications || 0}
                        icon={<BadgeRoundedIcon />}
                        color="#06B6D4"
                    />
                </Grid>

                <Grid size={{ xs: 12, lg: 8 }}>
                    <AppCard sx={{ minHeight: 380 }}>
                        <Typography variant="h6" fontWeight={700}>
                            Recruitment Analytics
                        </Typography>

                        <Typography
                            mt={2}
                            color="text.secondary"
                        >
                            Charts will be integrated here using Recharts.
                        </Typography>
                    </AppCard>
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>
                    <AppCard sx={{ minHeight: 380 }}>
                        <Typography variant="h6" fontWeight={700}>
                            Quick Actions
                        </Typography>

                        <Typography
                            mt={2}
                            color="text.secondary"
                        >
                            Add Employee
                        </Typography>

                        <Typography
                            mt={1}
                            color="text.secondary"
                        >
                            Create Job
                        </Typography>

                        <Typography
                            mt={1}
                            color="text.secondary"
                        >
                            Upload Resume
                        </Typography>

                        <Typography
                            mt={1}
                            color="text.secondary"
                        >
                            Identity Verification
                        </Typography>
                    </AppCard>
                </Grid>

            </Grid>

        </DashboardLayout>

    );

}

export default Dashboard;