import { Box } from "@mui/material";

function DashboardBackground({ children }) {

    return (

        <Box

            sx={{

                minHeight: "100vh",

                position: "relative",

                overflow: "hidden",

                background:
                    "linear-gradient(180deg,#020617 0%,#071129 45%,#0F172A 100%)"

            }}

        >

            {/* Aurora Glow */}

            <Box

                sx={{

                    position: "absolute",

                    width: 700,

                    height: 700,

                    borderRadius: "50%",

                    background:
                        "radial-gradient(circle,#00E5FF33 0%,transparent 70%)",

                    top: -250,

                    left: -180,

                    filter: "blur(90px)",

                    pointerEvents: "none"

                }}

            />

            {/* Purple Glow */}

            <Box

                sx={{

                    position: "absolute",

                    width: 600,

                    height: 600,

                    borderRadius: "50%",

                    background:
                        "radial-gradient(circle,#7C3AED25 0%,transparent 70%)",

                    right: -150,

                    bottom: -150,

                    filter: "blur(100px)",

                    pointerEvents: "none"

                }}

            />

            {/* Blue Glow */}

            <Box

                sx={{

                    position: "absolute",

                    width: 450,

                    height: 450,

                    borderRadius: "50%",

                    background:
                        "radial-gradient(circle,#2563EB20 0%,transparent 70%)",

                    top: "35%",

                    right: "20%",

                    filter: "blur(120px)",

                    pointerEvents: "none"

                }}

            />

            {/* Noise Overlay */}

            <Box

                sx={{

                    position: "absolute",

                    inset: 0,

                    opacity: 0.03,

                    backgroundImage:
                        "radial-gradient(circle at 1px 1px,#ffffff 1px,transparent 0)",

                    backgroundSize: "22px 22px",

                    pointerEvents: "none"

                }}

            />

            <Box

                sx={{

                    position: "relative",

                    zIndex: 2

                }}

            >

                {children}

            </Box>

        </Box>

    );

}

export default DashboardBackground;