import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    LinearProgress,
    Paper,
    Stack,
    Typography,
    Grid
} from "@mui/material";

import {
    Laptop,
    ShieldCheck,
    Shield,
    MapPin,
    Clock3,
    CalendarDays,
    Globe,
    Monitor,
    Network
} from "lucide-react";

export default function PrimaryDeviceCard() {
    const trustScore = 98;

    return (
        <Paper
            elevation={0}
            sx={{
                bgcolor: "#111827",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 5,
                overflow: "hidden",
                position: "relative"
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(37,99,235,.18), transparent 70%)",
                    top: -120,
                    right: -120
                }}
            />

            <Box p={4}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    flexWrap="wrap"
                    spacing={3}
                >
                    <Stack direction="row" spacing={3}>
                        <Avatar
                            sx={{
                                width: 72,
                                height: 72,
                                bgcolor: "#1E40AF"
                            }}
                        >
                            <Laptop size={34} />
                        </Avatar>

                        <Box>
                            <Chip
                                label="PRIMARY TRUSTED DEVICE"
                                icon={<ShieldCheck size={16} />}
                                sx={{
                                    bgcolor: "rgba(34,197,94,.15)",
                                    color: "#4ADE80",
                                    border: "1px solid rgba(34,197,94,.30)",
                                    fontWeight: 700,
                                    mb: 2
                                }}
                            />

                            <Typography
                                variant="h5"
                                color="white"
                                fontWeight={700}
                            >
                                HP Pavilion Gaming 15
                            </Typography>

                            <Typography
                                color="#94A3B8"
                                mt={1}
                            >
                                Windows 11 Pro • Chrome 138
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={3}
                                mt={2}
                                flexWrap="wrap"
                            >
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <MapPin
                                        size={16}
                                        color="#60A5FA"
                                    />

                                    <Typography
                                        color="#CBD5E1"
                                        fontSize={14}
                                    >
                                        Hyderabad
                                    </Typography>
                                </Stack>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <Clock3
                                        size={16}
                                        color="#60A5FA"
                                    />

                                    <Typography
                                        color="#CBD5E1"
                                        fontSize={14}
                                    >
                                        Active 2 mins ago
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>

                    <Box
                        sx={{
                            minWidth: 220
                        }}
                    >
                        <Stack
                            spacing={1}
                            alignItems="flex-end"
                        >
                            <Shield
                                size={44}
                                color="#22C55E"
                            />

                            <Typography
                                fontSize={42}
                                color="white"
                                fontWeight={800}
                            >
                                {trustScore}%
                            </Typography>

                            <Typography
                                color="#22C55E"
                                fontWeight={700}
                            >
                                Device Trust Score
                            </Typography>

                            <LinearProgress
                                variant="determinate"
                                value={trustScore}
                                sx={{
                                    width: "100%",
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
                        </Stack>
                    </Box>
                </Stack>

                <Divider
                    sx={{
                        my: 4,
                        borderColor: "rgba(255,255,255,.08)"
                    }}
                />

                <Typography
                    color="white"
                    variant="h6"
                    fontWeight={700}
                    mb={3}
                >
                    Device Overview
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    flexWrap="wrap"
                >
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#2563EB",
                            borderRadius: 3,
                            px: 3
                        }}
                    >
                        Current Device
                    </Button>

                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: 3,
                            color: "#CBD5E1",
                            borderColor: "rgba(255,255,255,.20)"
                        }}
                    >
                        View Details
                    </Button>
                </Stack>
            </Box>
        </Paper>
    );
}