import {
    Box,
    Typography
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import GlassCard from "./GlassCard";

import FadeIn from "./FadeIn";

function MetricCard({

    title,

    value,

    icon,

    color = "#00E5FF",

    subtitle = "",

    trend = "+0%"

}) {
    return (

        <FadeIn>

            <GlassCard
                sx={{
                    p: 3,
                    height: "100%"
                }}
            >

                ....

            </GlassCard>

        </FadeIn>

    )

}

export default MetricCard;