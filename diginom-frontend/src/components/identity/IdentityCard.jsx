import {
    Avatar,
    Box,
    Chip,
    Divider,
    LinearProgress,
    Stack,
    Typography
} from "@mui/material";

import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

import GlassCard from "../ui/GlassCard";

function IdentityCard({

    employee,

    qrImage

}) {

    return (

        <div id="identity-card">

            <GlassCard
                sx={{
                    p: 4,
                    height: "100%"
                }}
            >

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        color="white"
                    >
                        Digital Identity
                    </Typography>

                    <Chip
                        icon={<VerifiedRoundedIcon />}
                        label="Verified"
                        color="success"
                    />

                </Stack>

                <Divider sx={{ my: 3 }} />

                <Stack
                    direction="row"
                    spacing={3}
                    alignItems="center"
                >

                    <Avatar
                        src={employee.photo_url}
                        sx={{
                            width: 95,
                            height: 95,
                            bgcolor: "primary.main",
                            fontSize: 34
                        }}
                    >

                        {employee.name?.charAt(0)}

                    </Avatar>

                    <Box>

                        <Typography
                            variant="h5"
                            color="white"
                            fontWeight={700}
                        >

                            {employee.name}

                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            mt={1}
                            alignItems="center"
                        >

                            <BadgeIcon color="primary" />

                            <Typography color="text.secondary">

                                {employee.diginom_id}

                            </Typography>

                        </Stack>

                    </Box>

                </Stack>

                <Divider sx={{ my: 3 }} />

                <Stack spacing={2}>

                    <Stack direction="row" spacing={1}>

                        <EmailIcon color="primary" />

                        <Typography color="white">

                            {employee.email}

                        </Typography>

                    </Stack>

                    <Stack direction="row" spacing={1}>

                        <PhoneIcon color="primary" />

                        <Typography color="white">

                            {employee.mobile || "Not Available"}

                        </Typography>

                    </Stack>

                    <Stack direction="row" spacing={1}>

                        <LocationOnIcon color="primary" />

                        <Typography color="white">

                            {employee.location.city},{" "}
                            {employee.location.state}

                        </Typography>

                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Typography color="text.secondary">

                            Status

                        </Typography>

                        <Chip
                            label={employee.status}
                            color="success"
                            size="small"
                        />

                    </Stack>

                </Stack>

                <Divider sx={{ my: 3 }} />

                <Typography
                    color="white"
                    fontWeight={600}
                >
                    Trust Score
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={94}
                    sx={{
                        mt: 1,
                        mb: 2,
                        height: 10,
                        borderRadius: 5
                    }}
                />

                <Typography
                    color="primary.main"
                    fontWeight={700}
                >
                    94 / 100
                </Typography>

                <Typography
                    mt={3}
                    color="white"
                    fontWeight={600}
                >
                    Profile Completion
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={92}
                    sx={{
                        mt: 1,
                        height: 10,
                        borderRadius: 5
                    }}
                />

                <Typography
                    color="primary.main"
                    fontWeight={700}
                    mt={1}
                >
                    92 %
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography
                    color="white"
                    fontWeight={700}
                    mb={2}
                >
                    Digital Verification QR
                </Typography>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >

                    {qrImage && (

                        <Box
                            sx={{
                                bgcolor: "#ffffff",
                                p: 2,
                                borderRadius: 3
                            }}
                        >

                            <img
                                src={qrImage}
                                alt="QR Code"
                                width={180}
                                height={180}
                            />

                        </Box>

                    )}

                </Box>

            </GlassCard>

        </div>

    );

}

export default IdentityCard;