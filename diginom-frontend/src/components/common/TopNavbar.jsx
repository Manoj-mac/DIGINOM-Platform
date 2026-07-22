import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Badge,
    Avatar,
    Tooltip,
} from "@mui/material";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { useNavigate } from "react-router-dom";

export default function TopNavbar() {
    const navigate = useNavigate();

    const employeeName =
        localStorage.getItem("employee_name") || "Employee";

    const initials = employeeName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            color="transparent"
            sx={{
                backdropFilter: "blur(20px)",
                background: "rgba(255,255,255,0.75)",
                borderBottom: "1px solid rgba(0,0,0,.06)",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box>
                    <Typography variant="h5" fontWeight={700}>
                        DIGINOM
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Digital Workforce Identity Platform
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    <Tooltip title="Notifications">
                        <IconButton>
                            <Badge badgeContent={3} color="error">
                                <NotificationsOutlinedIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Settings">
                        <IconButton>
                            <SettingsOutlinedIcon />
                        </IconButton>
                    </Tooltip>

                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: "primary.main",
                            fontWeight: 700,
                        }}
                    >
                        {initials}
                    </Avatar>

                    <Typography fontWeight={600}>
                        {employeeName}
                    </Typography>

                    <Tooltip title="Logout">
                        <IconButton onClick={logout}>
                            <LogoutOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
}