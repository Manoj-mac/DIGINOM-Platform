import {
    Badge,
    IconButton
} from "@mui/material";

import NotificationsIcon
    from "@mui/icons-material/Notifications";

import {
    useEffect,
    useState
} from "react";

import { useNavigate }
    from "react-router-dom";

import api from "../api/api";

function NotificationBell() {

    const [count,
        setCount] =
        useState(0);

    const navigate =
        useNavigate();

    useEffect(() => {

        fetchCount();

    }, []);

    const fetchCount =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const email =
                    localStorage.getItem(
                        "email"
                    );

                const response =
                    await api.get(

                        `/notifications/${email}/count`,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setCount(
                    response.data.count
                );

            } catch (error) {

                console.log(error);
            }
        };

    return (

        <IconButton

            onClick={() =>
                navigate(
                    "/notifications"
                )
            }
        >

            <Badge

                badgeContent={
                    count
                }

                color="error"
            >

                <NotificationsIcon />

            </Badge>

        </IconButton>
    );
}

export default NotificationBell;