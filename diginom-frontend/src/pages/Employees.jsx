import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";

import api from "../api/api";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import ConfirmDialog
    from "../components/ConfirmDialog";
import AppSnackbar
    from "../components/AppSnackbar";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const [trustScores, setTrustScores] =
        useState({});
    const [search, setSearch] = useState("");

    const [confirmOpen,
        setConfirmOpen] =
        useState(false);

    const [selectedEmployee,
        setSelectedEmployee] =
        useState(null);
    const navigate = useNavigate();


    const [snackbarOpen,
        setSnackbarOpen] =
        useState(false);

    const [snackbarMessage,
        setSnackbarMessage] =
        useState("");

    const [snackbarSeverity,
        setSnackbarSeverity] =
        useState("success");
    useEffect(() => {

        const fetchEmployees = async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await api.get(
                        "/employees",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setEmployees(
                    response.data
                );

                const scores = {};

                for (
                    const employee
                    of response.data
                ) {

                    try {

                        const scoreResponse =
                            await api.get(
                                `/employees/${employee.employee_id}/trust-score`,
                                {
                                    headers: {
                                        Authorization:
                                            `Bearer ${token}`
                                    }
                                }
                            );

                        scores[
                            employee.employee_id
                        ] =
                            scoreResponse.data
                                .trust_score;

                    } catch {

                        scores[
                            employee.employee_id
                        ] = 0;
                    }
                }

                setTrustScores(
                    scores
                );

            } catch (error) {

                console.log(
                    error
                );
            }
        };

        fetchEmployees();

    }, []);

    const deleteEmployee =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                await api.delete(

                    `/employees/${selectedEmployee}`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setEmployees(

                    employees.filter(

                        (employee) =>

                            employee.employee_id !==

                            selectedEmployee
                    )
                );

                setConfirmOpen(
                    false
                );

                setSelectedEmployee(
                    null
                );

                setSnackbarMessage(
                    "Employee deleted successfully"
                );

                setSnackbarSeverity(
                    "success"
                );

                setSnackbarOpen(
                    true
                );

            } catch (error) {

                console.log(error);

                setSnackbarMessage(
                    "Failed to delete employee"
                );

                setSnackbarSeverity(
                    "error"
                );

                setSnackbarOpen(
                    true
                );
            }
        };

    const filteredEmployees =
        employees.filter(
            (employee) =>
                employee.first_name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                employee.email
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (

        <Box
            sx={{
                display: "flex"
            }}
        >

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    backgroundColor:
                        "#f5f7fa",
                    minHeight:
                        "100vh"
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                >
                    Employees Management
                </Typography>

                <Card sx={{ mb: 3 }}>

                    <CardContent>

                        <Box
                            sx={{
                                display:
                                    "flex",
                                justifyContent:
                                    "space-between",
                                gap: 2
                            }}
                        >

                            <TextField
                                label="Search Employee"
                                variant="outlined"
                                fullWidth
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                            <Button
                                variant="contained"
                                onClick={() =>
                                    navigate(
                                        "/employees/add"
                                    )
                                }
                            >
                                Add Employee
                            </Button>

                        </Box>

                    </CardContent>

                </Card>

                <TableContainer
                    component={Paper}
                >

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Name
                                </TableCell>

                                <TableCell>
                                    Email
                                </TableCell>

                                <TableCell>
                                    Role
                                </TableCell>

                                <TableCell>
                                    Trust Score
                                </TableCell>

                                <TableCell>
                                    Actions
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {filteredEmployees.map(
                                (
                                    employee
                                ) => (

                                    <TableRow
                                        key={
                                            employee.employee_id
                                        }
                                    >

                                        <TableCell>
                                            {employee.first_name}
                                        </TableCell>

                                        <TableCell>
                                            {employee.email}
                                        </TableCell>

                                        <TableCell>
                                            {employee.role}
                                        </TableCell>

                                        <TableCell>

                                            <Typography
                                                fontWeight="bold"
                                                sx={{
                                                    color:
                                                        (trustScores[
                                                            employee.employee_id
                                                        ] || 0) >= 80
                                                            ? "#16a34a"
                                                            : (trustScores[
                                                                employee.employee_id
                                                            ] || 0) >= 50
                                                                ? "#f59e0b"
                                                                : "#dc2626"
                                                }}
                                            >
                                                {
                                                    trustScores[
                                                    employee.employee_id
                                                    ] || 0
                                                }/100
                                            </Typography>

                                        </TableCell>

                                        <TableCell>

                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="success"
                                                sx={{
                                                    mr: 1
                                                }}
                                                onClick={() =>
                                                    navigate(
                                                        `/employee-profile/${employee.employee_id}`
                                                    )
                                                }
                                            >
                                                Profile
                                            </Button>

                                            <Button
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    mr: 1
                                                }}
                                                onClick={() =>
                                                    navigate(
                                                        `/employees/edit/${employee.employee_id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                                sx={{
                                                    mr: 1
                                                }}
                                                onClick={() =>
                                                    navigate(
                                                        `/timeline/${employee.employee_id}`
                                                    )
                                                }
                                            >
                                                Timeline
                                            </Button>
                                            <Button
                                                size="small"
                                                color="error"
                                                variant="contained"
                                                onClick={() => {

                                                    setSelectedEmployee(
                                                        employee.employee_id
                                                    );

                                                    setConfirmOpen(
                                                        true
                                                    );

                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>

                                    </TableRow>

                                )
                            )}

                        </TableBody>

                    </Table>

                </TableContainer>

                <ConfirmDialog

                    open={confirmOpen}

                    title="Delete Employee"

                    message="Are you sure you want to delete this employee? This action cannot be undone."

                    onConfirm={
                        deleteEmployee
                    }

                    onCancel={() => {

                        setConfirmOpen(
                            false
                        );

                        setSelectedEmployee(
                            null
                        );

                    }}

                />
                <ConfirmDialog

                    open={confirmOpen}

                    title="Delete Employee"

                    message="Are you sure you want to delete this employee? This action cannot be undone."

                    onConfirm={
                        deleteEmployee
                    }

                    onCancel={() => {

                        setConfirmOpen(
                            false
                        );

                        setSelectedEmployee(
                            null
                        );

                    }}

                />

                <AppSnackbar

                    open={snackbarOpen}

                    message={snackbarMessage}

                    severity={snackbarSeverity}

                    onClose={() =>
                        setSnackbarOpen(
                            false
                        )
                    }

                />

            </Box>

        </Box>
    );
}

export default Employees;