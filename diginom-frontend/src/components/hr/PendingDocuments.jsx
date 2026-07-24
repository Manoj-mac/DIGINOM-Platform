import {
    Card,
    CardContent,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";

function PendingDocuments({ documents = [] }) {

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >
                    Pending Documents
                </Typography>

                <Table size="small">

                    <TableHead>
                        <TableRow>
                            <TableCell>Employee</TableCell>
                            <TableCell>Document</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {documents.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={2} align="center">
                                    No Pending Documents
                                </TableCell>
                            </TableRow>
                        ) : (

                            documents.map((document, index) => (

                                <TableRow key={index}>

                                    <TableCell>
                                        {document.employee_name || document.employee_id}
                                    </TableCell>

                                    <TableCell>
                                        {document.document_type}
                                    </TableCell>

                                </TableRow>

                            ))

                        )}

                    </TableBody>

                </Table>

            </CardContent>
        </Card>
    );
}

export default PendingDocuments;