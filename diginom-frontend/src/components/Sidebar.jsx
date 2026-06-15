import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Box
} from "@mui/material";

import {
    Dashboard,
    People,
    Psychology,
    WorkspacePremium,
    Description,
    Business,
    Work,
    Settings,
    QuestionAnswer
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";


const drawerWidth = 240;

function Sidebar() {

    const navigate = useNavigate();

    const menuItems = [
        {
            text: "Dashboard",
            icon: <Dashboard />,
            path: "/dashboard"
        },
        {
            text: "Employees",
            icon: <People />,
            path: "/employees"
        },
        {
            text: "Skills",
            icon: <Psychology />,
            path: "/skills"
        },
        {
            text: "Certifications",
            icon: <WorkspacePremium />,
            path: "/certifications"
        },
        {
            text: "Documents",
            icon: <Description />,
            path: "/documents"
        },
        {
            text: "Companies",
            icon: <Business />,
            path: "/companies"
        },
        {
            text: "Jobs",
            icon: <Work />,
            path: "/jobs"
        },
        {
            text: "Recruiter Dashboard",
            icon: <Dashboard />,
            path: "/recruiter-dashboard"
        },
        {
            text: "Audit Logs",
            icon: <Description />,
            path: "/audit-logs"
        },
        {
            text: "Settings",
            icon: <Settings />,
            path: "/settings"
        },
        {
            text: "Interviews",
            icon: <QuestionAnswer />,
            path: "/interviews"
        },
        {
            text: "Offers",
            icon: <Work />,
            path: "/offers"
        },
        {
            text: "Analytics",
            icon: <Dashboard />,
            path: "/analytics"
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
                    boxSizing: "border-box"
                }
            }}
        >
            <Toolbar>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    DIGINOM
                </Typography>

            </Toolbar>

            <Box sx={{ overflow: "auto" }}>

                <List>

                    {menuItems.map((item) => (

                        <ListItem
                            key={item.text}
                            disablePadding
                        >

                            <ListItemButton
                                onClick={() =>
                                    navigate(item.path)
                                }
                            >

                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.text}
                                />

                            </ListItemButton>

                        </ListItem>

                    ))}

                </List>

            </Box>

        </Drawer>
    );
}

export default Sidebar;