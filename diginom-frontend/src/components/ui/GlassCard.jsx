import { Paper } from "@mui/material";
import { motion } from "framer-motion";

function GlassCard({

    children,

    sx = {},

    hover = true

}) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 25
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.45
            }}

            whileHover={
                hover
                    ? {
                        y: -6,
                        scale: 1.01
                    }
                    : {}
            }

        >

            <Paper

                elevation={0}

                sx={{

                    p: 3,

                    borderRadius: "24px",

                    background:
                        "rgba(15,23,42,0.72)",

                    backdropFilter:
                        "blur(22px)",

                    border:
                        "1px solid rgba(255,255,255,.08)",

                    color:
                        "#fff",

                    position:
                        "relative",

                    overflow:
                        "hidden",

                    boxShadow:
                        `
                        0 20px 50px
                        rgba(0,0,0,.45),

                        inset 0 1px 1px
                        rgba(255,255,255,.05)
                        `,

                    transition:
                        ".35s",

                    "&:hover": {

                        border:
                            "1px solid rgba(0,229,255,.35)",

                        boxShadow:
                            `
                            0 25px 70px
                            rgba(0,229,255,.18)
                            `
                    },

                    ...sx

                }}

            >

                <motion.div

                    animate={{

                        opacity:
                            [0.15, 0.35, 0.15]

                    }}

                    transition={{

                        repeat:
                            Infinity,

                        duration:
                            6

                    }}

                    style={{

                        position:
                            "absolute",

                        top:
                            -120,

                        right:
                            -120,

                        width:
                            260,

                        height:
                            260,

                        borderRadius:
                            "50%",

                        background:
                            "#00E5FF",

                        filter:
                            "blur(100px)"

                    }}

                />

                <motion.div

                    animate={{

                        opacity:
                            [0.08, 0.18, 0.08]

                    }}

                    transition={{

                        repeat:
                            Infinity,

                        duration:
                            7

                    }}

                    style={{

                        position:
                            "absolute",

                        bottom:
                            -120,

                        left:
                            -120,

                        width:
                            220,

                        height:
                            220,

                        borderRadius:
                            "50%",

                        background:
                            "#8B5CF6",

                        filter:
                            "blur(90px)"

                    }}

                />

                {children}

            </Paper>

        </motion.div>

    );

}

export default GlassCard;