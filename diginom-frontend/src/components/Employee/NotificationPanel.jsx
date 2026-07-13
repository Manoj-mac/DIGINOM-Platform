import {
    Box,
    Typography,
    Chip
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";

function NotificationPanel({

    notifications = []

}) {

    const getIcon = (title) => {

        const text = title.toLowerCase();

        if (text.includes("success"))
            return <CheckCircleIcon sx={{ color: "#22C55E" }} />;

        if (text.includes("warning"))
            return <WarningAmberIcon sx={{ color: "#F59E0B" }} />;

        if (text.includes("error"))
            return <ErrorOutlineRoundedIcon sx={{ color: "#EF4444" }} />

        return <InfoIcon sx={{ color: "#00E5FF" }} />;

    };

    return (

        <GlassCard

            sx={{

                p: 3,

                mt: 4,

                height: "100%"

            }}

        >

            <SectionHeader

                title="Notifications"

                subtitle="Latest platform updates"

            />

            {

                notifications.length === 0 ? (

                    <Box

                        sx={{

                            py: 6,

                            textAlign: "center"

                        }}

                    >

                        <NotificationsIcon

                            sx={{

                                fontSize: 45,

                                color: "#475569"

                            }}

                        />

                        <Typography

                            sx={{

                                color: "#94A3B8",

                                mt: 2,

                                fontWeight: 600

                            }}

                        >

                            No Notifications

                        </Typography>

                        <Typography

                            sx={{

                                color: "#64748B",

                                mt: 1

                            }}

                        >

                            You're all caught up.

                        </Typography>

                    </Box>

                ) : (

                    notifications.map((notification) => (

                        <Box

                            key={notification.notification_id}

                            sx={{

                                display: "flex",

                                gap: 2,

                                alignItems: "flex-start",

                                p: 2,

                                mb: 2,

                                borderRadius: 3,

                                transition: ".25s",

                                border:
                                    "1px solid rgba(255,255,255,.06)",

                                "&:hover": {

                                    background:
                                        "rgba(255,255,255,.05)",

                                    transform:
                                        "translateY(-2px)"

                                }

                            }}

                        >

                            {getIcon(notification.title)}

                            <Box sx={{ flex: 1 }}>

                                <Typography

                                    sx={{

                                        color: "#FFFFFF",

                                        fontWeight: 700

                                    }}

                                >

                                    {notification.title}

                                </Typography>

                                <Typography

                                    sx={{

                                        color: "#CBD5E1",

                                        mt: .5

                                    }}

                                >

                                    {notification.message}

                                </Typography>

                                <Typography

                                    variant="caption"

                                    sx={{

                                        color: "#64748B"

                                    }}

                                >

                                    {

                                        new Date(

                                            notification.created_at

                                        ).toLocaleString()

                                    }

                                </Typography>

                            </Box>

                            {

                                !notification.is_read && (

                                    <Chip

                                        label="New"

                                        size="small"

                                        sx={{

                                            bgcolor:
                                                "#00E5FF22",

                                            color:
                                                "#00E5FF",

                                            fontWeight: 700

                                        }}

                                    />

                                )

                            }

                        </Box>

                    ))

                )

            }

        </GlassCard>

    );

}

export default NotificationPanel;