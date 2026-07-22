import { Box, Typography } from "@mui/material";
import AppCard from "./AppCard";

export default function MetricCard({
    title,
    value,
    icon,
    color = "#00E5FF"
}) {
    return (
        <AppCard>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                        mt={1}
                    >
                        {value}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: `${color}22`,
                        color
                    }}
                >
                    {icon}
                </Box>
            </Box>
        </AppCard>
    );
}