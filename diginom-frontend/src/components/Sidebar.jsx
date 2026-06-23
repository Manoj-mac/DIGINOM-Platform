import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Divider
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
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

const drawerWidth = 260;

function Sidebar() {

    const navigate = useNavigate();

    const location = useLocation();

    const menuItems = [

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
        }
    ];

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {

                    width: drawerWidth,

                    boxSizing: "border-box",

                    borderRight:
                        "1px solid #e5e7eb",

                    background:
                        "#ffffff"
                }
            }}
        >

            <Toolbar>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="primary"
                >
                    DIGINOM
                </Typography>

            </Toolbar>

            <Divider />

            <List>

                {menuItems.map((item) => (

                    <ListItemButton

                        key={item.text}

                        selected={
                            location.pathname ===
                            item.path
                        }

                        onClick={() =>
                            navigate(item.path)
                        }

                        sx={{
                            mx: 1,
                            mb: 1,
                            borderRadius: 2
                        }}
                    >

                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={item.text}
                        />

                    </ListItemButton>

                ))}

            </List>

        </Drawer>
    );
}

export default Sidebar;