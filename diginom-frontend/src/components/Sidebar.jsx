import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Divider,
    Box,
    Avatar,
    Chip
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import BadgeIcon from "@mui/icons-material/Badge";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import TimelineIcon from "@mui/icons-material/Timeline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DescriptionIcon from "@mui/icons-material/Description";
import SchoolIcon from "@mui/icons-material/School";
import ArticleIcon from "@mui/icons-material/Article";
import NoteIcon from "@mui/icons-material/Note";

import {
    useNavigate,
    useLocation
} from "react-router-dom";

const drawerWidth = 280;

function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const role =
        localStorage.getItem("role")?.toUpperCase() ||
        "EMPLOYEE";

    const employeeName =
        localStorage.getItem("employee_name") ||
        "Employee";

    let menuItems = [];

    if (role === "ADMIN") {

        menuItems = [

            { section: "MAIN" },

            {
                text: "Dashboard",
                icon: <DashboardIcon />,
                path: "/dashboard"
            },

            {
                text: "Employees",
                icon: <PeopleIcon />,
                path: "/employees"
            },

            {
                text: "Skills",
                icon: <SchoolIcon />,
                path: "/skills"
            },

            {
                text: "Certifications",
                icon: <AssignmentIcon />,
                path: "/certifications"
            },

            {
                text: "Documents",
                icon: <DescriptionIcon />,
                path: "/documents"
            },

            {
                text: "Resumes",
                icon: <ArticleIcon />,
                path: "/resumes"
            },

            { section: "RECRUITMENT" },

            {
                text: "Jobs",
                icon: <WorkIcon />,
                path: "/jobs"
            },

            {
                text: "Interviews",
                icon: <TimelineIcon />,
                path: "/interviews"
            },

            {
                text: "Offers",
                icon: <AssignmentIcon />,
                path: "/offers"
            },

            {
                text: "Pipeline",
                icon: <TimelineIcon />,
                path: "/pipeline"
            },

            { section: "SYSTEM" },

            {
                text: "Analytics",
                icon: <AnalyticsIcon />,
                path: "/analytics"
            },

            {
                text: "Recruiter Notes",
                icon: <NoteIcon />,
                path: "/recruiter-notes"
            },

            {
                text: "Notifications",
                icon: <NotificationsIcon />,
                path: "/notifications"
            },

            {
                text: "Identity Center",
                icon: <BadgeIcon />,
                path: "/identity-center"
            }

        ];

    } else if (role === "HR") {

        menuItems = [

            { section: "MAIN" },

            {
                text: "Dashboard",
                icon: <DashboardIcon />,
                path: "/hr-dashboard"
            },

            {
                text: "Employees",
                icon: <PeopleIcon />,
                path: "/employees"
            },

            {
                text: "Skills",
                icon: <SchoolIcon />,
                path: "/skills"
            },

            {
                text: "Certifications",
                icon: <AssignmentIcon />,
                path: "/certifications"
            },

            {
                text: "Documents",
                icon: <DescriptionIcon />,
                path: "/documents"
            },

            { section: "SYSTEM" },

            {
                text: "Notifications",
                icon: <NotificationsIcon />,
                path: "/notifications"
            }

        ];

    } else if (role === "RECRUITER") {

        menuItems = [

            { section: "RECRUITMENT" },

            {
                text: "Dashboard",
                icon: <DashboardIcon />,
                path: "/recruiter-dashboard"
            },

            {
                text: "Jobs",
                icon: <WorkIcon />,
                path: "/jobs"
            },

            {
                text: "Interviews",
                icon: <TimelineIcon />,
                path: "/interviews"
            },

            {
                text: "Offers",
                icon: <AssignmentIcon />,
                path: "/offers"
            },

            {
                text: "Pipeline",
                icon: <TimelineIcon />,
                path: "/pipeline"
            },

            {
                text: "Recruiter Notes",
                icon: <NoteIcon />,
                path: "/recruiter-notes"
            },

            { section: "SYSTEM" },

            {
                text: "Notifications",
                icon: <NotificationsIcon />,
                path: "/notifications"
            }

        ];

    } else {

        menuItems = [

            { section: "WORKSPACE" },

            {
                text: "Dashboard",
                icon: <DashboardIcon />,
                path: "/employee-dashboard"
            },

            {
                text: "Profile",
                icon: <PeopleIcon />,
                path: "/employee-profile"
            },

            {
                text: "Notifications",
                icon: <NotificationsIcon />,
                path: "/notifications"
            }

        ];

    }

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(15,23,42,.96)",
                    backdropFilter: "blur(20px)",
                    borderRight: "1px solid rgba(255,255,255,.08)",
                    color: "#fff",
                    overflow: "hidden",
                    boxSizing: "border-box"
                }
            }}
        >

            {/* Logo */}

            <Toolbar
                sx={{
                    minHeight: 88,
                    px: 3,
                    display: "flex",
                    alignItems: "center"
                }}
            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={800}
                        sx={{
                            color: "#00E5FF",
                            letterSpacing: 1
                        }}
                    >
                        DIGINOM
                    </Typography>

                    <Typography
                        variant="caption"
                        sx={{
                            color: "#94A3B8"
                        }}
                    >
                        Workforce Identity Platform
                    </Typography>

                </Box>

            </Toolbar>

            <Divider sx={{ borderColor: "rgba(255,255,255,.08)" }} />

            {/* Scrollable Menu */}

            <List
                sx={{
                    flex: 1,
                    px: 2,
                    py: 2,
                    overflowY: "auto",

                    "&::-webkit-scrollbar": {
                        width: 6
                    },

                    "&::-webkit-scrollbar-thumb": {
                        background: "rgba(255,255,255,.15)",
                        borderRadius: 10
                    }
                }}
            >

                {menuItems.map((item, index) => {

                    if (item.section) {

                        return (

                            <Typography
                                key={index}
                                sx={{
                                    color: "#64748B",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: 2,
                                    mt: index === 0 ? 0 : 3,
                                    mb: 1,
                                    px: 2,
                                    textTransform: "uppercase"
                                }}
                            >
                                {item.section}
                            </Typography>

                        );

                    }

                    const active =
                        location.pathname === item.path;

                    return (

                        <ListItemButton
                            key={item.text}
                            onClick={() => navigate(item.path)}
                            sx={{
                                position: "relative",
                                borderRadius: 3,
                                mb: 1,
                                py: 1.4,
                                px: 2,
                                transition: "all .25s ease",

                                background: active
                                    ? "linear-gradient(90deg,#00E5FF,#2563EB)"
                                    : "transparent",

                                color: active
                                    ? "#fff"
                                    : "#CBD5E1",

                                "&::before": active
                                    ? {
                                        content: '""',
                                        position: "absolute",
                                        left: 0,
                                        top: 8,
                                        bottom: 8,
                                        width: 4,
                                        borderRadius: 10,
                                        background: "#00E5FF"
                                    }
                                    : {},

                                "&:hover": {
                                    background: active
                                        ? "linear-gradient(90deg,#00E5FF,#2563EB)"
                                        : "rgba(255,255,255,.06)",

                                    transform: "translateX(6px)"
                                }
                            }}
                        >

                            <ListItemIcon
                                sx={{
                                    minWidth: 40,
                                    color: active
                                        ? "#fff"
                                        : "#94A3B8"
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontWeight: 600,
                                    fontSize: 14
                                }}
                            />

                        </ListItemButton>

                    );

                })}

            </List>

            <Divider
                sx={{
                    borderColor: "rgba(255,255,255,.08)"
                }}
            />

            {/* Footer */}

            <Box
                sx={{
                    p: 3
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >

                    <Avatar
                        sx={{
                            width: 48,
                            height: 48,
                            bgcolor: "#00E5FF",
                            color: "#000",
                            fontWeight: 700
                        }}
                    >
                        {employeeName.charAt(0).toUpperCase()}
                    </Avatar>

                    <Box>

                        <Typography
                            fontWeight={700}
                            color="white"
                        >
                            {employeeName}
                        </Typography>

                        <Typography
                            variant="caption"
                            sx={{
                                color: "#94A3B8"
                            }}
                        >
                            {role}
                        </Typography>

                    </Box>

                </Box>

                <Chip
                    label="Trust Score : 94"
                    sx={{
                        mt: 2,
                        width: "100%",
                        height: 36,
                        bgcolor: "rgba(0,229,255,.12)",
                        color: "#00E5FF",
                        fontWeight: 700,
                        border: "1px solid rgba(0,229,255,.25)"
                    }}
                />

            </Box>

        </Drawer>

    );

}

export default Sidebar; 