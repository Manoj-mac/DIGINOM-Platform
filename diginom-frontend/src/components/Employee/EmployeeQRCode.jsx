import {

    Box,

    Typography

} from "@mui/material";

import QrCode2RoundedIcon
    from "@mui/icons-material/QrCode2Rounded";

function EmployeeQRCode() {

    return (

        <Box

            sx={{

                mt: 4,

                textAlign: "center"

            }}

        >

            <QrCode2RoundedIcon

                sx={{

                    fontSize: 130,

                    color: "#00E5FF"

                }}

            />

            <Typography

                sx={{

                    color: "#94A3B8",

                    mt: 1

                }}

            >

                Scan to verify employee identity

            </Typography>

        </Box>

    );

}

export default EmployeeQRCode;