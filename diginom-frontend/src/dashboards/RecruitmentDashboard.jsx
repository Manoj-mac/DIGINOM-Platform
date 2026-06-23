import {

    Grid,
    Box,
    Paper,
    Typography

} from "@mui/material";

import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import PageHeader from "../components/PageHeader";

function RecruitmentDashboard() {

    return (

        <Layout>

            <PageHeader

                title="Recruitment Dashboard"

                subtitle="Manage hiring pipeline, interviews and offers"

            />

            <Grid
                container
                spacing={3}
            >

                <Grid item xs={12} md={3}>
                    <DashboardCard
                        title="Open Jobs"
                        value="12"
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <DashboardCard
                        title="Interviews"
                        value="28"
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <DashboardCard
                        title="Offers"
                        value="7"
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <DashboardCard
                        title="Candidates"
                        value="142"
                    />
                </Grid>

            </Grid>

            <Box mt={4}>

                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                    >
                        Recruitment Pipeline
                    </Typography>

                    <Box mt={2}>

                        <Typography>
                            Applied : 50
                        </Typography>

                        <Typography>
                            Screening : 25
                        </Typography>

                        <Typography>
                            Technical : 12
                        </Typography>

                        <Typography>
                            HR Round : 5
                        </Typography>

                        <Typography>
                            Selected : 3
                        </Typography>

                    </Box>

                </Paper>

            </Box>

            <Box mt={4}>

                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                    >
                        Recent Recruitment Activity
                    </Typography>

                    <Box mt={2}>

                        <Typography>
                            Interview scheduled for Manoj
                        </Typography>

                        <Typography>
                            Offer generated for Monika
                        </Typography>

                        <Typography>
                            New AWS job posted
                        </Typography>

                    </Box>

                </Paper>

            </Box>

        </Layout>

    );
}

export default RecruitmentDashboard;