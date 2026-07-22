import {
    Avatar,
    Box,
    Chip,
    Grid,
    LinearProgress,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import {
    ShieldCheck,
    ShieldAlert,
    LockKeyhole,
    Fingerprint
} from "lucide-react";

export default function SecurityHeader() {
    const trustScore = 98;

    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                borderRadius: 5,
                bgcolor: "#111827",
                border: "1px solid rgba(255,255,255,.08)",
                overflow: "hidden",
                position: "relative"
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: 350,
                    height: 350,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(37,99,235,.18) 0%, transparent 70%)",
                    top: -120,
                    right: -120
                }}
            />

            <Grid container spacing={4} alignItems="center">

                <Grid size={{ xs: 12, md: 8 }}>

                    <Stack spacing={2}>

                        <Chip
                            icon={<ShieldCheck size={16} />}
                            label="SECURITY CENTER"
                            sx={{
                                alignSelf: "flex-start",
                                bgcolor: "rgba(37,99,235,.15)",
                                color: "#60A5FA",
                                border: "1px solid rgba(37,99,235,.30)",
                                fontWeight: 700
                            }}
                        />

                        <Typography
                            variant="h3"
                            fontWeight={800}
                            color="white"
                        >
                            Protect Your Digital Identity
                        </Typography>

                        <Typography
                            color="#94A3B8"
                            sx={{
                                maxWidth: 650,
                                lineHeight: 1.8
                            }}
                        >
                            Monitor trusted devices, manage account security,
                            review authentication activity and protect every
                            login associated with your DIGINOM identity.
                        </Typography>

                        <Box mt={2}>

                            <Typography
                                color="#CBD5E1"
                                fontWeight={600}
                                mb={1}
                            >
                                Security Trust Score
                            </Typography>

                            <LinearProgress
                                variant="determinate"
                                value={trustScore}
                                sx={{
                                    height: 10,
                                    borderRadius: 5,
                                    bgcolor: "rgba(255,255,255,.08)",
                                    "& .MuiLinearProgress-bar": {
                                        borderRadius: 5,
                                        background:
                                            "linear-gradient(90deg,#22C55E,#2563EB)"
                                    }
                                }}
                            />

                            <Typography
                                mt={1}
                                color="#22C55E"
                                fontWeight={700}
                            >
                                {trustScore}/100 • Excellent Security
                            </Typography>

                        </Box>

                    </Stack>

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            bgcolor: "rgba(255,255,255,.03)",
                            border: "1px solid rgba(255,255,255,.08)"
                        }}
                    >

                        <Stack spacing={3}>

                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: "#2563EB",
                                        width: 58,
                                        height: 58
                                    }}
                                >
                                    A
                                </Avatar>

                                <Box>

                                    <Typography
                                        color="white"
                                        fontWeight={700}
                                    >
                                        Employee Name
                                    </Typography>

                                    <Typography color="#94A3B8">
                                        DIGI-000145
                                    </Typography>

                                </Box>

                            </Stack>

                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                <ShieldCheck color="#22C55E" />

                                <Box>

                                    <Typography color="white">
                                        Security Status
                                    </Typography>

                                    <Typography color="#22C55E">
                                        Protected
                                    </Typography>

                                </Box>

                            </Stack>

                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                <LockKeyhole color="#60A5FA" />

                                <Box>

                                    <Typography color="white">
                                        MFA
                                    </Typography>

                                    <Typography color="#94A3B8">
                                        Enabled
                                    </Typography>

                                </Box>

                            </Stack>

                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                <Fingerprint color="#FACC15" />

                                <Box>

                                    <Typography color="white">
                                        Device Trust
                                    </Typography>

                                    <Typography color="#94A3B8">
                                        Verified
                                    </Typography>

                                </Box>

                            </Stack>

                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                <ShieldAlert color="#22C55E" />

                                <Box>

                                    <Typography color="white">
                                        Risk Level
                                    </Typography>

                                    <Typography color="#22C55E">
                                        Low
                                    </Typography>

                                </Box>

                            </Stack>

                        </Stack>

                    </Paper>

                </Grid>

            </Grid>

        </Paper>
    );
}