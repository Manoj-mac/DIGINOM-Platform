import { Paper, Stack, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function SecurityMetricCard({
    title,
    value,
    subtitle,
    icon,
    color = "#2563EB",
    trend
}) {
    return (
        <Paper
            component={motion.div}
            whileHover={{
                y: -6,
                transition: {
                    duration: 0.2
                }
            }}
            elevation={0}
            sx={{
                p: 3,
                height: 170,
                borderRadius: 5,
                background: "#111827",
                border: "1px solid rgba(255,255,255,.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer"
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: -30,
                    right: -30,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    bgcolor: color,
                    opacity: 0.08
                }}
            />

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography
                    color="#94A3B8"
                    fontSize={15}
                    fontWeight={600}
                >
                    {title}
                </Typography>

                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 3,
                        bgcolor: `${color}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color
                    }}
                >
                    {icon}
                </Box>
            </Stack>

            <Box>
                <Typography
                    color="white"
                    fontSize={34}
                    fontWeight={800}
                >
                    {value}
                </Typography>

                <Typography
                    mt={0.5}
                    color="#94A3B8"
                    fontSize={14}
                >
                    {subtitle}
                </Typography>
            </Box>

            {trend && (
                <Typography
                    fontWeight={600}
                    fontSize={13}
                    color={color}
                >
                    {trend}
                </Typography>
            )}
        </Paper>
    );
}