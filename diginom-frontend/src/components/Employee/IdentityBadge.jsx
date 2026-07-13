import {
    Chip
} from "@mui/material";

import VerifiedRoundedIcon
    from "@mui/icons-material/VerifiedRounded";

function IdentityBadge({

    verified = true

}) {

    return (

        <Chip

            icon={
                <VerifiedRoundedIcon />
            }

            label={
                verified
                    ? "VERIFIED IDENTITY"
                    : "PENDING VERIFICATION"
            }

            sx={{

                bgcolor:
                    verified
                        ? "#22C55E22"
                        : "#F59E0B22",

                color:
                    verified
                        ? "#22C55E"
                        : "#F59E0B",

                fontWeight: 700,

                borderRadius: 3

            }}

        />

    );

}

export default IdentityBadge;