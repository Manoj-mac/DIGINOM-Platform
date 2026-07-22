import { Paper, Typography } from "@mui/material";

export default function DeviceGrid() {
    return (
        <Paper
            elevation={0}
            sx={{
                bgcolor: "#111827",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 4,
                p: 4,
                minHeight: 300
            }}
        >
            <Typography
                variant="h6"
                color="white"
                fontWeight={700}
            >
                Trusted Devices
            </Typography>
        </Paper>
    );
}