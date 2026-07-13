import {

    IconButton,

    Tooltip

} from "@mui/material";

import DarkModeRoundedIcon
    from "@mui/icons-material/DarkModeRounded";

function ThemeSwitcher() {

    return (

        <Tooltip title="Theme">

            <IconButton

                sx={{

                    width: 48,

                    height: 48,

                    borderRadius: 3,

                    color: "#E2E8F0",

                    background:
                        "rgba(255,255,255,.05)",

                    border:
                        "1px solid rgba(255,255,255,.08)",

                    "&:hover": {

                        background:
                            "rgba(255,255,255,.08)"

                    }

                }}

            >

                <DarkModeRoundedIcon />

            </IconButton>

        </Tooltip>

    );

}

export default ThemeSwitcher;