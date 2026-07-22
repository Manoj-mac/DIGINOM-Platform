import {
    Chip,
    Stack,
    Typography
} from "@mui/material";

import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

import GlassCard from "../ui/GlassCard";

function VerificationCard() {

    return (

        <GlassCard sx={{ p: 3, height: "100%" }}>

            <Typography
                variant="h5"
                color="white"
                gutterBottom
            >
                Verification Status
            </Typography>

            <Stack spacing={2} mt={2}>

                <Chip
                    icon={<VerifiedRoundedIcon />}
                    label="Identity Verified"
                    color="success"
                />

                <Chip
                    icon={<VerifiedRoundedIcon />}
                    label="Documents Verified"
                    color="success"
                />

                <Chip
                    icon={<VerifiedRoundedIcon />}
                    label="Skills Verified"
                    color="success"
                />

                <Chip
                    icon={<VerifiedRoundedIcon />}
                    label="Certificates Verified"
                    color="success"
                />

            </Stack>

        </GlassCard>

    );

}

export default VerificationCard;