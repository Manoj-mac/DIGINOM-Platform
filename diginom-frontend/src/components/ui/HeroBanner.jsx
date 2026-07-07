import {
    Box,
    Typography,
    Chip
} from "@mui/material";

import VerifiedIcon from "@mui/icons-material/Verified";
import WavingHandIcon from "@mui/icons-material/WavingHand";

import {
    motion
} from "framer-motion";

function HeroBanner({

    name = "Employee",

    role = "Digital Workforce"

}) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: -30
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.6
            }}

        >

            <Box

                sx={{

                    p: 4,

                    borderRadius: "28px",

                    background:
                        "linear-gradient(135deg,#020617,#0F172A,#1E1B4B)",

                    border:
                        "1px solid rgba(255,255,255,.08)",

                    boxShadow:
                        "0 25px 60px rgba(0,0,0,.45)",

                    position:
                        "relative",

                    overflow:
                        "hidden",

                    mb: 4

                }}

            >

                <Box

                    sx={{

                        position: "absolute",

                        top: -100,

                        right: -100,

                        width: 260,

                        height: 260,

                        borderRadius: "50%",

                        background:
                            "rgba(0,229,255,.18)",

                        filter:
                            "blur(100px)"

                    }}

                />

                <Typography

                    sx={{

                        color: "#00E5FF",

                        display: "flex",

                        alignItems: "center",

                        gap: 1,

                        mb: 1

                    }}

                >

                    <WavingHandIcon />

                    Welcome Back

                </Typography>

                <Typography

                    variant="h3"

                    fontWeight="bold"

                    sx={{

                        color: "#fff",

                        mb: 1

                    }}

                >

                    {name}

                </Typography>

                <Typography

                    sx={{

                        color: "#94A3B8",

                        mb: 3,

                        fontSize: 18

                    }}

                >

                    {role}

                </Typography>

                <Chip

                    icon={<VerifiedIcon />}

                    label="Identity Verified"

                    sx={{

                        bgcolor:
                            "#22C55E",

                        color:
                            "#fff",

                        fontWeight:
                            "bold"

                    }}

                />

            </Box>

        </motion.div>

    );

}

export default HeroBanner;