import {
    Box,
    LinearProgress,
    Typography
} from "@mui/material";

import GlassCard from "../ui/GlassCard";

function SecurityScoreCard() {

    return (

        <GlassCard sx={{ p: 3 }}>

            <Typography
                variant="h5"
                color="white"
            >
                Security Score
            </Typography>

            <Box mt={4}>

                <LinearProgress
                    variant="determinate"
                    value={90}
                    sx={{
                        height: 10,
                        borderRadius: 5
                    }}
                />

                <Typography
                    mt={2}
                    color="primary.main"
                    fontWeight={700}
                >
                    90 / 100
                </Typography>

            </Box>

        </GlassCard>

    );

}

export default SecurityScoreCard;