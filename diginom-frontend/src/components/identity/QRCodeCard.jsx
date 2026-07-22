import {
    Box,
    Stack,
    Typography
} from "@mui/material";

import GlassCard from "../ui/GlassCard";

function QRCodeCard({ employee, qrImage }) {

    return (

        <GlassCard
            sx={{
                p: 4,
                height: "100%"
            }}
        >

            <Typography
                variant="h5"
                color="white"
                fontWeight={700}
            >
                Digital Verification QR
            </Typography>

            <Typography
                color="text.secondary"
                mt={1}
            >
                Scan this QR to verify employee identity.
            </Typography>

            <Stack
                alignItems="center"
                mt={4}
                spacing={3}
            >

                <Box
                    sx={{
                        bgcolor: "#fff",
                        p: 2,
                        borderRadius: 3
                    }}
                >

                    {qrImage && (

                        <img
                            src={qrImage}
                            alt="QR Code"
                            width={180}
                            height={180}
                        />

                    )}

                </Box>

                <Typography
                    color="primary.main"
                    fontWeight={700}
                >
                    {employee.diginom_id}
                </Typography>

            </Stack>

        </GlassCard>

    );

}

export default QRCodeCard;