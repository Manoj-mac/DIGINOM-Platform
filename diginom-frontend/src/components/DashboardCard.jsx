import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

function DashboardCard({

    title,
    value

}) {

    return (

        <Card
            elevation={2}
            sx={{
                borderRadius: 3
            }}
        >

            <CardContent>

                <Typography
                    color="text.secondary"
                >
                    {title}
                </Typography>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    {value}
                </Typography>

            </CardContent>

        </Card>
    );
}

export default DashboardCard;