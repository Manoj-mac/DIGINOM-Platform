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

function PendingCertifications({ certifications = [] }) {

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >
                    Pending Certifications
                </Typography>

                <Table size="small">

                    <TableHead>
                        <TableRow>
                            <TableCell>Employee</TableCell>
                            <TableCell>Certification</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {certifications.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={2} align="center">
                                    No Pending Certifications
                                </TableCell>
                            </TableRow>
                        ) : (

                            certifications.map((certificate, index) => (

                                <TableRow key={index}>

                                    <TableCell>
                                        {certificate.employee_name || certificate.employee_id}
                                    </TableCell>

                                    <TableCell>
                                        {certificate.certification_name}
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

export default PendingCertifications;