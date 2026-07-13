import {

    Avatar,

    Box,

    Typography

} from "@mui/material";

function UserMenu() {

    const name =
        localStorage.getItem("employee_name")
        || "Employee";

    const role =
        localStorage.getItem("role")
        || "Employee";

    return (

        <Box

            sx={{

                display: "flex",

                alignItems: "center",

                gap: 2,

                px: 2,

                py: 1,

                borderRadius: 4,

                background:
                    "rgba(255,255,255,.05)",

                border:
                    "1px solid rgba(255,255,255,.08)"

            }}

        >

            <Avatar

                sx={{

                    bgcolor: "#00E5FF",

                    color: "#000"

                }}

            >

                {name.charAt(0)}

            </Avatar>

            <Box>

                <Typography

                    fontWeight={700}

                    color="#fff"

                >

                    {name}

                </Typography>

                <Typography

                    variant="caption"

                    color="#94A3B8"

                >

                    {role}

                </Typography>

            </Box>

        </Box>

    );

}

export default UserMenu;