import {

    Box,

    Button

} from "@mui/material";

import AutoAwesomeRoundedIcon
    from "@mui/icons-material/AutoAwesomeRounded";

import SearchBar
    from "./SearchBar";

import NotificationBell
    from "./NotificationBell";

import ThemeSwitcher
    from "./ThemeSwitcher";

import UserMenu
    from "./UserMenu";

function TopNavbar() {

    return (

        <Box

            sx={{

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                p: 3,

                borderBottom:
                    "1px solid rgba(255,255,255,.06)",

                background:
                    "rgba(2,6,23,.65)",

                backdropFilter:
                    "blur(20px)",

                position: "sticky",

                top: 0,

                zIndex: 100

            }}

        >

            <SearchBar />

            <Box

                sx={{

                    display: "flex",

                    alignItems: "center",

                    gap: 2

                }}

            >

                <Button

                    variant="contained"

                    startIcon={
                        <AutoAwesomeRoundedIcon />
                    }

                    sx={{

                        borderRadius: 4,

                        px: 3,

                        background:
                            "linear-gradient(90deg,#00E5FF,#2563EB)",

                        textTransform:
                            "none",

                        fontWeight: 700

                    }}

                >

                    DIGINOM AI

                </Button>

                <NotificationBell count={3} />

                <ThemeSwitcher />

                <UserMenu />

            </Box>

        </Box>

    );

}

export default TopNavbar;