import { Grid } from "@mui/material";

import {
    ShieldCheck,
    Laptop,
    Activity,
    ShieldAlert
} from "lucide-react";

import SecurityMetricCard from "./SecurityMetricCard";

export default function SecurityOverview() {
    return (
        <Grid container spacing={3}>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <SecurityMetricCard
                    title="Trust Score"
                    value="98/100"
                    subtitle="Excellent"
                    trend="+2 this week"
                    color="#22C55E"
                    icon={<ShieldCheck size={24} />}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <SecurityMetricCard
                    title="Trusted Devices"
                    value="3"
                    subtitle="Verified devices"
                    trend="No recent changes"
                    color="#2563EB"
                    icon={<Laptop size={24} />}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <SecurityMetricCard
                    title="Active Sessions"
                    value="1"
                    subtitle="Current login"
                    trend="Session healthy"
                    color="#F59E0B"
                    icon={<Activity size={24} />}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <SecurityMetricCard
                    title="Risk Level"
                    value="LOW"
                    subtitle="No threats detected"
                    trend="System Protected"
                    color="#10B981"
                    icon={<ShieldAlert size={24} />}
                />
            </Grid>

        </Grid>
    );
}