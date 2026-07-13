import {
    Badge,
    IconButton,
    Tooltip
} from "@mui/material";

import NotificationsNoneRoundedIcon
    from "@mui/icons-material/NotificationsNoneRounded";

function NotificationBell({

    count = 0,

    onClick

}) {

    return (

        <Tooltip title="Notifications">

            <IconButton

                onClick={onClick}

                sx={{

                    width: 48,

                    height: 48,

                    borderRadius: 3,

                    color: "#E2E8F0",

                    background:
                        "rgba(255,255,255,.05)",

                    border:
                        "1px solid rgba(255,255,255,.08)",

                    transition: ".3s",

                    "&:hover": {

                        background:
                            "rgba(0,229,255,.12)",

                        color: "#00E5FF"

                    }

                }}

            >

                <Badge

                    badgeContent={count}

                    color="error"

                >

                    <NotificationsNoneRoundedIcon />

                </Badge>

            </IconButton>

        </Tooltip>

    );

}

export default NotificationBell;