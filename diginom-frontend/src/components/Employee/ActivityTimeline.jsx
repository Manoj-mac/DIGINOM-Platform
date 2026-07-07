import {

    Paper,

    Typography,

    Box

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

        <Paper

            elevation={0}

            sx={{

                mt: 5,

                p: 3,

                borderRadius: 5,

                background:
                    "rgba(255,255,255,0.05)",

                backdropFilter:
                    "blur(20px)",

                border:
                    "1px solid rgba(255,255,255,0.08)"

            }}

        >

            <Typography

                variant="h5"

                fontWeight="bold"

                sx={{

                    color: "#fff",

                    mb: 3

                }}

            >

                Activity Timeline

            </Typography>

            <Timeline position="right">

                {

                    timeline.map((item) => (

                        <TimelineItem
                            key={item.timeline_id}
                        >

                            <TimelineSeparator>

                                <TimelineDot
                                    color="primary"
                                >

                                    {

                                        getIcon(
                                            item.event_type
                                        )

                                    }

                                </TimelineDot>

                                <TimelineConnector />

                            </TimelineSeparator>

                            <TimelineContent>

                                <Typography

                                    fontWeight="bold"

                                    color="#fff"

                                >

                                    {

                                        item.event_type.replaceAll(
                                            "_",
                                            " "
                                        )

                                    }

                                </Typography>

                                <Typography
                                    color="#94A3B8"
                                >

                                    {

                                        item.event_description

                                    }

                                </Typography>

                                <Typography

                                    variant="caption"

                                    color="#64748B"

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

        </Paper>

    );

}

export default ActivityTimeline;