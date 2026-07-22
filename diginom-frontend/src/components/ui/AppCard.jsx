import { Paper } from "@mui/material";

export default function AppCard({ children, sx = {}, ...props }) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: "background.paper",
                border: "1px solid rgba(255,255,255,.06)",
                transition: "all .25s ease",

                "&:hover": {
                    transform: "translateY(-2px)",
                    borderColor: "rgba(0,229,255,.25)",
                    boxShadow: "0 12px 30px rgba(0,0,0,.18)"
                },

                ...sx
            }}
            {...props}
        >
            {children}
        </Paper>
    );
}