import {
    Typography,
    Box
} from "@mui/material";

function PageHeader({

    title,
    subtitle

}) {

    return (

        <Box mb={3}>

            <Typography
                variant="h4"
                fontWeight="bold"
            >
                {title}
            </Typography>

            <Typography
                color="text.secondary"
            >
                {subtitle}
            </Typography>

        </Box>
    );
}

export default PageHeader;