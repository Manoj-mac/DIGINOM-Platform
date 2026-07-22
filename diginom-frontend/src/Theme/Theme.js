import { createTheme } from "@mui/material/styles";

import { COLORS } from "./colors";

const theme = createTheme({

    palette: {

        mode: "dark",

        primary: {
            main: COLORS.primary
        },

        secondary: {
            main: COLORS.secondary
        },

        success: {
            main: COLORS.success
        },

        warning: {
            main: COLORS.warning
        },

        error: {
            main: COLORS.danger
        },

        background: {

            default: COLORS.background,

            paper: COLORS.surface

        },

        text: {

            primary: COLORS.textPrimary,

            secondary: COLORS.textSecondary

        }

    },

    shape: {

        borderRadius: 18

    },

    typography: {

        fontFamily: `"Inter","Segoe UI",sans-serif`,

        h3: {
            fontSize: "2rem",
            fontWeight: 700
        },

        h4: {
            fontSize: "1.75rem",
            fontWeight: 700
        },

        h5: {
            fontSize: "1.35rem",
            fontWeight: 700
        },

        h6: {
            fontSize: "1.1rem",
            fontWeight: 600
        },

        body1: {
            fontSize: "0.95rem"
        },

        body2: {
            fontSize: "0.85rem"
        }

    },

    components: {

        MuiPaper: {

            styleOverrides: {

                root: {

                    backgroundImage: "none",

                    border: `1px solid ${COLORS.border}`,

                    boxShadow: "0 8px 30px rgba(0,0,0,.18)"

                }

            }

        },

        MuiButton: {

            styleOverrides: {

                root: {

                    borderRadius: 12,

                    height: 44,

                    textTransform: "none",

                    fontWeight: 600

                }

            }

        },

        MuiCard: {

            styleOverrides: {

                root: {

                    borderRadius: 20

                }

            }

        },

        MuiOutlinedInput: {

            styleOverrides: {

                root: {

                    borderRadius: 12

                }

            }

        }

    }

});

export default theme;