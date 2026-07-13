import {

    Box,

    LinearProgress,

    Typography

} from "@mui/material";

function ProfileCompletion({

    value = 92

}) {

    return (

        <Box>

            <Typography

                sx={{

                    color: "#94A3B8",

                    mb: 1

                }}

            >

                Profile Completion

            </Typography>

            <LinearProgress

                variant="determinate"

                value={value}

                sx={{

                    height: 10,

                    borderRadius: 5

                }}

            />

            <Typography

                sx={{

                    color: "#00E5FF",

                    mt: 1,

                    fontWeight: 700

                }}

            >

                {value}%

            </Typography>

        </Box>

    );

}

export default ProfileCompletion;