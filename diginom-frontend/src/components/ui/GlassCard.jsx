import { Paper } from "@mui/material";

function GlassCard({

    children,

    sx = {},

    hover = true

}) {

    return (

        <Paper

            elevation={0}

            sx={{

                background:
                    "rgba(15,23,42,.72)",

                backdropFilter:
                    "blur(22px)",

                WebkitBackdropFilter:
                    "blur(22px)",

                border:
                    "1px solid rgba(255,255,255,.08)",

                borderRadius: 5,

                overflow: "hidden",

                position: "relative",

                transition:
                    "all .35s ease",

                boxShadow:
                    "0 8px 32px rgba(0,0,0,.35)",

                ...(hover && {

                    "&:hover": {

                        transform:
                            "translateY(-6px)",

                        border:
                            "1px solid rgba(0,229,255,.35)",

                        boxShadow:
                            "0 15px 45px rgba(0,229,255,.18)"

                    }

                }),

                ...sx

            }}

        >

            {children}

        </Paper>

    );

}

export default GlassCard;