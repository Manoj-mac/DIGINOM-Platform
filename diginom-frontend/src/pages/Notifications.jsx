import {
    Box,
    Typography,
    Paper
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import api from "../api/api";
import Sidebar from "../components/Sidebar";

function Notifications() {

    const [notifications,
        setNotifications] =
        useState([]);

    useEffect(() => {

        fetchNotifications();

    }, []);

    const fetchNotifications =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const userEmail =
                    "jeevan30@gmail.com";

                console.log(
                    "USER EMAIL:",
                    userEmail
                );

                const response =
                    await api.get(

                        `/notifications/${userEmail}`,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                console.log(
                    response.data
                );

                setNotifications(
                    response.data
                );

            } catch (error) {

                console.log(
                    error
                );
            }
        };

    return (

        <Box
            sx={{
                display: "flex"
            }}
        >

            <Sidebar />

            <Box
                sx={{
                    flexGrow: 1,
                    p: 4
                }}
            >

                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Notifications
                </Typography>

                {notifications.map(

                    (notification) => (

                        <Paper
                            key={
                                notification.notification_id
                            }
                            sx={{
                                p: 2,
                                mb: 2
                            }}
                        >

                            <Typography
                                fontWeight="bold"
                            >
                                {
                                    notification.title
                                }
                            </Typography>

                            <Typography>
                                {
                                    notification.message
                                }
                            </Typography>

                        </Paper>

                    )

                )}

            </Box>

        </Box>
    );
}

export default Notifications;