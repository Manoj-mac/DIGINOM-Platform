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

function RecentEmployees({ employees = [] }) {

    return (
        <Card sx={{ mt: 4 }}>
            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >
                    Recent Employees
                </Typography>

                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>DIGINOM ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {employees.map((employee) => (

                            <TableRow key={employee.employee_id}>

                                <TableCell>
                                    {employee.diginom_id}
                                </TableCell>

                                <TableCell>
                                    {employee.first_name} {employee.last_name}
                                </TableCell>

                                <TableCell>
                                    {employee.email}
                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </CardContent>
        </Card>
    );
}

export default RecentEmployees;