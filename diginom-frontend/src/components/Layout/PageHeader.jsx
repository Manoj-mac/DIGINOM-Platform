import { Box, Typography } from "@mui/material";

export default function PageHeader({
    title,
    subtitle,
    action
}) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
                mb: 4
            }}
        >
            <Box>
                <Typography variant="h3">
                    {title}
                </Typography>

                {subtitle && (
                    <Typography
                        color="text.secondary"
                        mt={1}
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>

            {action}
        </Box>
    );
}
