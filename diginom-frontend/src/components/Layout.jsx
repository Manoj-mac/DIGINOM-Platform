import {

    Box

} from "@mui/material";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({

    children

}) {

    return (

        <Box
            sx={{
                display: "flex"
            }}
        >

            <Sidebar />

            <Box
                sx={{
                    flexGrow: 1
                }}
            >

                <Topbar />

                <Box p={4}>
                    {children}
                </Box>

            </Box>

        </Box>
    );
}

export default Layout;