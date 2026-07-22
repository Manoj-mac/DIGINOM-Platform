import { Chip } from "@mui/material";

export default function StatusChip({
    status
}) {

    const colors = {

        Active: "#22C55E",
        Inactive: "#EF4444",

        Pending: "#F59E0B",

        Verified: "#22C55E",

        Rejected: "#EF4444",

        Approved: "#2563EB"

    };

    const color =
        colors[status] || "#64748B";

    return (

        <Chip

            label={status}

            size="small"

            sx={{

                bgcolor: `${color}22`,

                color,

                border: `1px solid ${color}`,

                fontWeight: 700

            }}

        />

    );

}