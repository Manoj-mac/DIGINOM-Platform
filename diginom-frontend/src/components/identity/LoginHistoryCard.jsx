import {
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";

import GlassCard from "../ui/GlassCard";

function LoginHistoryCard() {

    return (

        <GlassCard sx={{ p: 3 }}>

            <Typography
                variant="h5"
                color="white"
                gutterBottom
            >
                Recent Logins
            </Typography>

            <List>

                <ListItem>

                    <ListItemText
                        primary="Windows 11 • Chrome"
                        secondary="Today 09:30 AM"
                    />

                </ListItem>

                <ListItem>

                    <ListItemText
                        primary="Android • Chrome"
                        secondary="Yesterday 07:15 PM"
                    />

                </ListItem>

            </List>

        </GlassCard>

    );

}

export default LoginHistoryCard;