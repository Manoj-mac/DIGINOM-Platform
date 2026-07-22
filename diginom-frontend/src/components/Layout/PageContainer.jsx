import { Box } from "@mui/material";

export default function PageContainer({ children }) {
    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "1600px",
                mx: "auto",
                px: {
                    xs: 2,
                    md: 4
                },
                py: 4
            }}
        >
            {children}
        </Box>
    );
}