import {
    Box,
    Typography
} from "@mui/material";

import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot
} from "@mui/lab";

import VerifiedIcon from "@mui/icons-material/Verified";
import DescriptionIcon from "@mui/icons-material/Description";
import PsychologyIcon from "@mui/icons-material/Psychology";
import PersonIcon from "@mui/icons-material/Person";

import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";

function ActivityTimeline({

    timeline = []

}) {

    const getIcon = (type) => {

        switch (type) {

            case "SKILL_ADDED":
                return <PsychologyIcon />;

            case "CERTIFICATION_ADDED":
                return <VerifiedIcon />;

            case "DOCUMENT_UPLOADED":
                return <DescriptionIcon />;

            default:
                return <PersonIcon />;
        }

    };

    return (

        <GlassCard

            sx={{

                mt: 4,

                p: 3

            }}

        >

            <SectionHeader

                title="Activity Timeline"

                subtitle="Recent verified employee activities"

            />

            {

                timeline.length === 0 ? (

                    <Box

                        sx={{

                            py: 6,

                            textAlign: "center"

                        }}

                    >

                        <Typography

                            variant="h6"

                            sx={{

                                color: "#94A3B8"

                            }}

                        >

                            No Activity Found

                        </Typography>

                        <Typography

                            sx={{

                                color: "#64748B",

                                mt: 1

                            }}

                        >

                            Employee activities will appear here.

                        </Typography>

                    </Box>

                ) : (

                    <Timeline position="right">

                        {

                            timeline.map((item) => (

                                <TimelineItem

                                    key={item.timeline_id}

                                >

                                    <TimelineSeparator>

                                        <TimelineDot

                                            sx={{

                                                bgcolor: "#00E5FF",

                                                boxShadow:
                                                    "0 0 15px rgba(0,229,255,.45)"

                                            }}

                                        >

                                            {

                                                getIcon(

                                                    item.event_type

                                                )

                                            }

                                        </TimelineDot>

                                        <TimelineConnector

                                            sx={{

                                                bgcolor:
                                                    "rgba(255,255,255,.12)"

                                            }}

                                        />

                                    </TimelineSeparator>

                                    <TimelineContent>

                                        <Typography

                                            sx={{

                                                color: "#FFFFFF",

                                                fontWeight: 700,

                                                mb: .5

                                            }}

                                        >

                                            {

                                                item.event_type

                                                    .replaceAll("_", " ")

                                            }

                                        </Typography>

                                        <Typography

                                            sx={{

                                                color: "#CBD5E1",

                                                mb: .5

                                            }}

                                        >

                                            {

                                                item.event_description

                                            }

                                        </Typography>

                                        <Typography

                                            variant="caption"

                                            sx={{

                                                color: "#64748B"

                                            }}

                                        >

                                            {

                                                new Date(

                                                    item.created_at

                                                ).toLocaleString()

                                            }

                                        </Typography>

                                    </TimelineContent>

                                </TimelineItem>

                            ))

                        }

                    </Timeline>

                )

            }

        </GlassCard>

    );

}

export default ActivityTimeline;