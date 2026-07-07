import {
    Box,
    Avatar,
    Typography,
    Chip,
    Divider
} from "@mui/material";

import BadgeIcon from "@mui/icons-material/Badge";
import VerifiedIcon from "@mui/icons-material/Verified";
import PersonIcon from "@mui/icons-material/Person";

function DigitalEmployeeCard({

    employee = {

        first_name: "Manoj",
        last_name: "Kumar",

        diginom_id: "DIG-000001",

        city: "Hyderabad",

        state: "Telangana",

        country: "India",

        status: "ACTIVE",

        trust_score: 92,

        photo_url: null
    }

}) {

    const trustColor =

        employee.trust_score >= 90
            ? "#22c55e"
            : employee.trust_score >= 70
                ? "#00E5FF"
                : employee.trust_score >= 50
                    ? "#f59e0b"
                    : "#ef4444";

    return (

        <Box

            sx={{

                width: 460,

                minHeight: 320,

                borderRadius: 5,

                p: 3,

                position: "relative",

                overflow: "hidden",

                background:
                    "linear-gradient(135deg,#020617 0%,#0f172a 50%,#1e1b4b 100%)",

                border:
                    "1px solid rgba(255,255,255,0.08)",

                boxShadow:
                    "0 20px 60px rgba(0,0,0,0.45)",

                color:
                    "#ffffff"
            }}

        >

            <Box
                sx={{
                    position: "absolute",
                    top: -100,
                    right: -100,
                    width: 250,
                    height: 250,
                    borderRadius: "50%",
                    background: "rgba(0,229,255,0.15)",
                    filter: "blur(80px)"
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    bottom: -80,
                    left: -80,
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    background: "rgba(139,92,246,0.15)",
                    filter: "blur(80px)"
                }}
            />

            <Typography
                variant="h5"
                fontWeight="bold"
            >
                DIGINOM
            </Typography>

            <Typography
                variant="caption"
                sx={{
                    color: "rgba(255,255,255,0.7)"
                }}
            >
                Talent Intelligence Network
            </Typography>

            <Divider
                sx={{
                    my: 2,
                    borderColor: "rgba(255,255,255,0.1)"
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <Box>

                    <Avatar

                        src={employee.photo_url}

                        sx={{

                            width: 95,

                            height: 95,

                            border: "3px solid #00E5FF",

                            mb: 2,

                            bgcolor: "#1e293b"

                        }}

                    >

                        <PersonIcon
                            sx={{
                                fontSize: 50
                            }}
                        />

                    </Avatar>

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                    >
                        {employee.first_name} {employee.last_name}
                    </Typography>

                    <Typography
                        sx={{
                            color: "#94a3b8"
                        }}
                    >
                        {employee.diginom_id}
                    </Typography>

                </Box>

                <Box
                    sx={{
                        textAlign: "center"
                    }}
                >

                    <Typography
                        variant="body2"
                        sx={{
                            color: "#94a3b8"
                        }}
                    >
                        TRUST SCORE
                    </Typography>

                    <Box

                        sx={{

                            width: 90,

                            height: 90,

                            borderRadius: "50%",

                            border: `6px solid ${trustColor}`,

                            display: "flex",

                            alignItems: "center",

                            justifyContent: "center",

                            mt: 1,

                            boxShadow: `0 0 25px ${trustColor}`

                        }}

                    >

                        <Typography

                            variant="h5"

                            fontWeight="bold"

                            sx={{
                                color: trustColor
                            }}

                        >

                            {employee.trust_score}

                        </Typography>

                    </Box>

                </Box>

            </Box>

            <Box
                sx={{
                    mt: 3
                }}
            >

                <Typography
                    sx={{
                        color: "#cbd5e1"
                    }}
                >
                    {employee.city}, {employee.state}, {employee.country}
                </Typography>

            </Box>

            <Box
                sx={{
                    mt: 2,
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap"
                }}
            >

                <Chip
                    icon={<BadgeIcon />}
                    label={employee.status}
                    color="success"
                />

                <Chip
                    icon={<VerifiedIcon />}
                    label="Identity Verified"
                    sx={{
                        bgcolor: "#22c55e",
                        color: "#fff"
                    }}
                />

            </Box>

            <Box

                sx={{

                    mt: 3,

                    p: 2,

                    borderRadius: 3,

                    background: "rgba(255,255,255,0.05)",

                    border: "1px dashed rgba(255,255,255,0.15)",

                    textAlign: "center"

                }}

            >

                <Typography
                    variant="body2"
                    sx={{
                        color: "#94a3b8"
                    }}
                >
                    QR Verification
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                        color: "#64748b"
                    }}
                >
                    QR Generator Coming Next
                </Typography>

            </Box>

        </Box>

    );

}

export default DigitalEmployeeCard;