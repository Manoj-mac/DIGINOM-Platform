import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette: {

        primary: {
            main: "#2563eb"
        },

        secondary: {
            main: "#0f172a"
        },

        background: {
            default: "#f8fafc",
            paper: "#ffffff"
        }
    },

    shape: {
        borderRadius: 12
    },

    typography: {

        fontFamily:
            "'Inter', sans-serif",

        h4: {
            fontWeight: 700
        },

        h5: {
            fontWeight: 600
        },

        button: {
            textTransform: "none"
        }
    }
});

export default theme;