import {
    Box,
    Typography
} from "@mui/material";

function SectionHeader({

    title,

    subtitle,

    action = null

}) {

    return (

        <Box

            sx={{

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                mb: 3

            }}

        >

            <Box>

                <Typography

                    variant="h5"

                    sx={{

                        color: "#ffffff",

                        fontWeight: 700

                    }}

                >

                    {title}

                </Typography>

                {subtitle && (

                    <Typography

                        sx={{

                            color: "#94A3B8",

                            mt: .5

                        }}

                    >

                        {subtitle}

                    </Typography>

                )}

            </Box>

            {action}

        </Box>

    );

}

export default SectionHeader;