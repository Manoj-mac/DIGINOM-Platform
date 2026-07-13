import {
    Avatar,
    Box,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";

import GlassCard from "../ui/GlassCard";
import IdentityBadge from "./IdentityBadge";
import ProfileCompletion from "./ProfileCompletion";
import EmployeeQRCode from "./EmployeeQRCode";

function DigitalEmployeeCard({

    employee

}) {

    return (

        <GlassCard

            sx={{

                p: 4,

                height: "100%"

            }}

        >

            <Stack

                spacing={3}

                alignItems="center"

            >

                <Avatar

                    src={employee.profile_image}

                    sx={{

                        width: 110,

                        height: 110,

                        fontSize: 40,

                        bgcolor: "#00E5FF",

                        color: "#020617",

                        fontWeight: 700,

                        boxShadow:
                            "0 0 35px rgba(0,229,255,.35)"

                    }}

                >

                    {employee.first_name?.charAt(0)}

                </Avatar>

                <Box textAlign="center">

                    <Typography

                        variant="h5"

                        fontWeight={700}

                        color="#fff"

                    >

                        {employee.first_name} {employee.last_name}

                    </Typography>

                    <Typography

                        color="#94A3B8"

                    >

                        {employee.designation || "Employee"}

                    </Typography>

                </Box>

                <IdentityBadge verified />

            </Stack>

            <Divider

                sx={{

                    my: 4,

                    borderColor:
                        "rgba(255,255,255,.08)"

                }}

            />

            <Grid

                container

                spacing={3}

            >

                <Grid item xs={6}>

                    <Stack direction="row" spacing={1}>

                        <BadgeIcon color="primary" />

                        <Box>

                            <Typography color="#64748B">

                                Employee ID

                            </Typography>

                            <Typography color="#fff">

                                {employee.diginom_id}

                            </Typography>

                        </Box>

                    </Stack>

                </Grid>

                <Grid item xs={6}>

                    <Stack direction="row" spacing={1}>

                        <BusinessIcon color="primary" />

                        <Box>

                            <Typography color="#64748B">

                                Company

                            </Typography>

                            <Typography color="#fff">

                                {employee.company_name || "DIGINOM"}

                            </Typography>

                        </Box>

                    </Stack>

                </Grid>

                <Grid item xs={6}>

                    <Stack direction="row" spacing={1}>

                        <WorkIcon color="primary" />

                        <Box>

                            <Typography color="#64748B">

                                Department

                            </Typography>

                            <Typography color="#fff">

                                {employee.department || "Engineering"}

                            </Typography>

                        </Box>

                    </Stack>

                </Grid>

                <Grid item xs={6}>

                    <Stack direction="row" spacing={1}>

                        <ShieldRoundedIcon color="primary" />

                        <Box>

                            <Typography color="#64748B">

                                Trust Score

                            </Typography>

                            <Typography

                                color="#00E5FF"

                                fontWeight={700}

                            >

                                {employee.trust_score}

                            </Typography>

                        </Box>

                    </Stack>

                </Grid>

            </Grid>

            <Divider

                sx={{

                    my: 4,

                    borderColor:
                        "rgba(255,255,255,.08)"

                }}

            />

            <ProfileCompletion value={92} />

            <EmployeeQRCode />

        </GlassCard>

    );

}

export default DigitalEmployeeCard;