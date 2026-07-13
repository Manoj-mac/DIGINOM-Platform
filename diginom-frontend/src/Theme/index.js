import { createTheme } from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";
import components from "./components";
import shape from "./shape";
import customShadows from "./shadows";

const theme = createTheme({

    palette,

    typography,

    components,

    shape

});

theme.customShadows = customShadows;

export default theme;