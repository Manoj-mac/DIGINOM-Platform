import { Paper, Typography } from "@mui/material";

export default function SecurityTimeline() {
    return (
        <Paper
            elevation={0}
            sx={{
                bgcolor: "#111827",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 4,
                p: 4,
                height: 420
            }}
        >
            <Typography
                variant="h6"
                color="white"
                fontWeight={700}
            >
                Security Timeline
            </Typography>
        </Paper>
    );
}