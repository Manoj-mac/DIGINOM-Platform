import { Box } from "@mui/material";

import Sidebar from "../Sidebar";
import TopNavbar from "../common/TopNavbar";

import DashboardBackground from "../ui/DashboardBackground";
import PageContainer from "../Layout/PageContainer";
function DashboardLayout({ children }) {

    return (

        <DashboardBackground>

            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden"
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
                        minWidth: 0,
                        overflow: "hidden"
                    }}
                >

                    {/* Top Navigation */}

                    <TopNavbar />

                    {/* Scrollable Content */}

                    <Box
                        component="main"
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            overflowX: "hidden",
                            bgcolor: "background.default"
                        }}
                    >

                        <PageContainer>

                            {children}

                        </PageContainer>

                    </Box>

                </Box>

            </Box>

        </DashboardBackground>

    );

}

export default DashboardLayout;