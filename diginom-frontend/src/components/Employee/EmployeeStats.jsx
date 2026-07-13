import { Grid } from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import DescriptionIcon from "@mui/icons-material/Description";
import BadgeIcon from "@mui/icons-material/Badge";

import MetricCard from "../ui/MetricCard";

function EmployeeStats({

    verifiedSkills,

    verifiedCertifications,

    verifiedDocuments,

    employmentStatus

}) {

    return (

        <Grid
            container
            spacing={3}
            sx={{ mt: 2 }}
        >

            <Grid
                item
                xs={12}
                sm={6}
                lg={3}
            >

                <MetricCard

                    title="Verified Skills"

                    value={verifiedSkills}

                    subtitle="Approved Skills"

                    trend="+8%"

                    color="#00E5FF"

                    icon={
                        <PsychologyIcon
                            fontSize="large"
                        />
                    }

                />

            </Grid>

            <Grid
                item
                xs={12}
                sm={6}
                lg={3}
            >

                <MetricCard

                    title="Certifications"

                    value={verifiedCertifications}

                    subtitle="Verified Certificates"

                    trend="+5%"

                    color="#8B5CF6"

                    icon={
                        <WorkspacePremiumIcon
                            fontSize="large"
                        />
                    }

                />

            </Grid>

            <Grid
                item
                xs={12}
                sm={6}
                lg={3}
            >

                <MetricCard

                    title="Documents"

                    value={verifiedDocuments}

                    subtitle="Verified Documents"

                    trend="+12%"

                    color="#22C55E"

                    icon={
                        <DescriptionIcon
                            fontSize="large"
                        />
                    }

                />

            </Grid>

            <Grid
                item
                xs={12}
                sm={6}
                lg={3}
            >

                <MetricCard

                    title="Employment"

                    value={employmentStatus}

                    subtitle="Current Status"

                    trend="Active"

                    color="#F59E0B"

                    icon={
                        <BadgeIcon
                            fontSize="large"
                        />
                    }

                />

            </Grid>

        </Grid>

    );

}

export default EmployeeStats;