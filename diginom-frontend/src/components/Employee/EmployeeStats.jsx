import {
    Grid,
    Paper,
    Typography,
    Box
} from "@mui/material";

import WorkspacePremiumIcon
    from "@mui/icons-material/WorkspacePremium";

import DescriptionIcon
    from "@mui/icons-material/Description";

import PsychologyIcon
    from "@mui/icons-material/Psychology";

import BadgeIcon
    from "@mui/icons-material/Badge";

function EmployeeStats({

    verifiedSkills = 0,

    verifiedCertifications = 0,

    verifiedDocuments = 0,

    employmentStatus = "ACTIVE"

}) {

    const cards = [

        {

            title: "Verified Skills",

            value: verifiedSkills,

            color: "#00E5FF",

            icon: <PsychologyIcon fontSize="large" />

        },

        {

            title: "Verified Certifications",

            value: verifiedCertifications,

            color: "#8B5CF6",

            icon: <WorkspacePremiumIcon fontSize="large" />

        },

        {

            title: "Verified Documents",

            value: verifiedDocuments,

            color: "#22C55E",

            icon: <DescriptionIcon fontSize="large" />

        },

        {

            title: "Employment Status",

            value: employmentStatus,

            color: "#F59E0B",

            icon: <BadgeIcon fontSize="large" />

        }

    ];

    return (

        <Grid
            container
            spacing={3}
            sx={{ mt: 4 }}
        >

            {

                cards.map((card) => (

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={3}
                        key={card.title}
                    >

                        <Paper

                            elevation={0}

                            sx={{

                                p: 3,

                                height: 150,

                                display: "flex",

                                justifyContent: "space-between",

                                alignItems: "center",

                                borderRadius: 5,

                                background:
                                    "linear-gradient(145deg, rgba(15,23,42,0.92), rgba(30,41,59,0.85))",

                                backdropFilter:
                                    "blur(20px)",

                                border:
                                    "1px solid rgba(255,255,255,0.08)",

                                transition: "0.35s",

                                cursor: "pointer",

                                "&:hover": {

                                    transform:
                                        "translateY(-8px) scale(1.02)",

                                    boxShadow:
                                        `0 0 35px ${card.color}`,

                                    border:
                                        `1px solid ${card.color}`

                                }

                            }}

                        >

                            <Box>

                                <Typography

                                    sx={{

                                        color: "#94A3B8",

                                        fontSize: 15,

                                        mb: 1

                                    }}

                                >

                                    {card.title}

                                </Typography>

                                <Typography

                                    variant="h3"

                                    fontWeight="bold"

                                    sx={{

                                        color: "#ffffff"

                                    }}

                                >

                                    {card.value}

                                </Typography>

                            </Box>

                            <Box

                                sx={{

                                    width: 70,

                                    height: 70,

                                    borderRadius: "50%",

                                    display: "flex",

                                    alignItems: "center",

                                    justifyContent: "center",

                                    color: card.color,

                                    background:
                                        `${card.color}20`,

                                    boxShadow:
                                        `0 0 20px ${card.color}`

                                }}

                            >

                                {card.icon}

                            </Box>

                        </Paper>

                    </Grid>

                ))

            }

        </Grid>

    );

}

export default EmployeeStats;