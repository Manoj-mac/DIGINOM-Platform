import {
    Box,
    Typography,
    LinearProgress
} from "@mui/material";

function TrustScoreRing({

    score = 0,

    verifiedSkills = 0,

    verifiedCertifications = 0,

    verifiedDocuments = 0

}) {

    const trustColor =

        score >= 90
            ? "#22c55e"

            : score >= 70
                ? "#00E5FF"

                : score >= 50
                    ? "#f59e0b"

                    : "#ef4444";

    const trustLabel =

        score >= 90
            ? "Excellent"

            : score >= 70
                ? "Very Good"

                : score >= 50
                    ? "Good"

                    : "Needs Improvement";

    return (

        <Box
            sx={{

                width: 260,

                p: 3,

                borderRadius: 4,

                background:
                    "rgba(255,255,255,0.04)",

                border:
                    "1px solid rgba(255,255,255,0.08)",

                backdropFilter:
                    "blur(20px)"
            }}
        >

            <Typography
                variant="subtitle2"
                sx={{
                    color:
                        "#94a3b8"
                }}
            >
                TRUST SCORE
            </Typography>

            <Typography

                variant="h2"

                fontWeight="bold"

                sx={{
                    color:
                        trustColor
                }}
            >
                {score}
            </Typography>

            <Typography
                sx={{
                    mb: 2,
                    color:
                        "#ffffff"
                }}
            >
                {trustLabel}
            </Typography>

            <LinearProgress

                variant="determinate"

                value={score}

                sx={{

                    height: 10,

                    borderRadius: 10,

                    mb: 3,

                    backgroundColor:
                        "#1e293b",

                    "& .MuiLinearProgress-bar": {

                        backgroundColor:
                            trustColor
                    }

                }}

            />

            <Typography
                sx={{
                    color:
                        "#cbd5e1"
                }}
            >
                Skills :
                {" "}
                {verifiedSkills}
            </Typography>

            <Typography
                sx={{
                    color:
                        "#cbd5e1"
                }}
            >
                Certifications :
                {" "}
                {verifiedCertifications}
            </Typography>

            <Typography
                sx={{
                    color:
                        "#cbd5e1"
                }}
            >
                Documents :
                {" "}
                {verifiedDocuments}
            </Typography>

        </Box>

    );

}

export default TrustScoreRing;