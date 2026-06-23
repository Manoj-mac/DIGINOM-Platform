import {

    Drawer,
    List,
    ListItemButton,
    ListItemText

} from "@mui/material";

import {
    useNavigate
} from "react-router-dom";

function RecruitmentSidebar() {

    const navigate =
        useNavigate();

    return (

        <Drawer
            variant="permanent"
        >

            <List>

                <ListItemButton
                    onClick={() =>
                        navigate(
                            "/recruitment"
                        )
                    }
                >
                    <ListItemText
                        primary="Dashboard"
                    />
                </ListItemButton>

                <ListItemButton
                    onClick={() =>
                        navigate(
                            "/jobs"
                        )
                    }
                >
                    <ListItemText
                        primary="Jobs"
                    />
                </ListItemButton>

                <ListItemButton
                    onClick={() =>
                        navigate(
                            "/interviews"
                        )
                    }
                >
                    <ListItemText
                        primary="Interviews"
                    />
                </ListItemButton>

                <ListItemButton
                    onClick={() =>
                        navigate(
                            "/offers"
                        )
                    }
                >
                    <ListItemText
                        primary="Offers"
                    />
                </ListItemButton>

                <ListItemButton
                    onClick={() =>
                        navigate(
                            "/analytics"
                        )
                    }
                >
                    <ListItemText
                        primary="Analytics"
                    />
                    <ListItemButton
                        onClick={() =>
                            navigate(
                                "/pipeline"
                            )
                        }
                    >
                        <ListItemText
                            primary="Pipeline"
                        />
                    </ListItemButton>
                </ListItemButton>

            </List>

        </Drawer>
    );
}

export default RecruitmentSidebar;