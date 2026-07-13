import { Box } from "@mui/material";

import Sidebar from "../components/Sidebar";

import DashboardBackground
    from "../components/ui/DashboardBackground";

import TopNavbar
    from "../components/common/TopNavbar";

function DashboardLayout({ children }) {

    return (

        <DashboardBackground>

            <Box
                sx={{
                    display: "flex",
                    minHeight: "100vh",
                    width: "100%"
                }}
            >

                {/* Sidebar */}

                <Sidebar />

                {/* Main Area */}

                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden"
                    }}
                >

                    {/* Top Navigation */}

                    <TopNavbar />

                    {/* Page Content */}

                    <Box
                        component="main"
                        sx={{
                            flex: 1,
                            p: 4,
                            overflowY: "auto",
                            position: "relative",
                            zIndex: 5
                        }}
                    >

                        {children}

                    </Box>

                </Box>

            </Box>

        </DashboardBackground>

    );

}

export default DashboardLayout;