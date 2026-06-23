import {

    AppBar,
    Toolbar,
    Typography,
    Box,
    Avatar,
    IconButton,
    InputBase,
    Menu,
    MenuItem

} from "@mui/material";

import SearchIcon
    from "@mui/icons-material/Search";

import NotificationsIcon
    from "@mui/icons-material/Notifications";

import { useState } from "react";

import {
    useNavigate
} from "react-router-dom";

function Topbar() {

    const navigate =
        useNavigate();

    const [anchorEl,
        setAnchorEl] =
        useState(null);

    const handleMenuOpen =
        (event) => {

            setAnchorEl(
                event.currentTarget
            );
        };

    const handleLogout =
        () => {

            localStorage.removeItem(
                "token"
            );

            navigate(
                "/login"
            );
        };

    return (

        <AppBar

            position="sticky"

            elevation={0}

            sx={{

                backgroundColor:
                    "#fff",

                color:
                    "#000",

                borderBottom:
                    "1px solid #e5e7eb"
            }}
        >

            <Toolbar>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    DIGINOM
                </Typography>

                <Box
                    sx={{
                        width: 400,
                        ml: 4,
                        display: "flex",
                        alignItems:
                            "center",
                        background:
                            "#f3f4f6",
                        px: 2,
                        py: 1,
                        borderRadius: 2
                    }}
                >

                    <SearchIcon />

                    <InputBase
                        placeholder="Search..."
                        sx={{
                            ml: 1,
                            flex: 1
                        }}
                    />

                </Box>

                <Box
                    sx={{
                        flexGrow: 1
                    }}
                />

                <IconButton>

                    <NotificationsIcon />

                </IconButton>

                <IconButton
                    onClick={
                        handleMenuOpen
                    }
                >

                    <Avatar>
                        M
                    </Avatar>

                </IconButton>

                <Menu

                    anchorEl={
                        anchorEl
                    }

                    open={
                        Boolean(
                            anchorEl
                        )
                    }

                    onClose={() =>
                        setAnchorEl(
                            null
                        )
                    }
                >

                    <MenuItem>
                        Profile
                    </MenuItem>

                    <MenuItem
                        onClick={
                            handleLogout
                        }
                    >
                        Logout
                    </MenuItem>

                </Menu>

            </Toolbar>

        </AppBar>
    );
}

export default Topbar;