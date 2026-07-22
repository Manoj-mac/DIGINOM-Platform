import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

export default function AppTable({
    columns,
    children
}) {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.08)",
                bgcolor: "background.paper"
            }}
        >
            <TableContainer>
                <Table>

                    <TableHead>

                        <TableRow>

                            {columns.map((column) => (

                                <TableCell
                                    key={column}
                                    sx={{
                                        fontWeight: 700,
                                        py: 2,
                                        bgcolor: "rgba(255,255,255,.03)"
                                    }}
                                >
                                    {column}
                                </TableCell>

                            ))}

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {children}

                    </TableBody>

                </Table>

            </TableContainer>

        </Paper>
    );
}