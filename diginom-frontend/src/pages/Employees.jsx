import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    TableRow,
    TableCell
} from "@mui/material";
import {
    People,
    VerifiedUser,
    PendingActions,
    Shield,
    Edit,
    Timeline,
    Delete,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import api from "../api/api";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import PageHeader from "../components/Layout/PageHeader";

import MetricCard from "../components/ui/MetricCard";
import SearchToolbar from "../components/ui/SearchToolbar";
import AppTable from "../components/ui/AppTable";
import StatusChip from "../components/ui/StatusChip";
import AccountCircle from "@mui/icons-material/AccountCircle";


import ConfirmDialog from "../components/ConfirmDialog";
import AppSnackbar from "../components/AppSnackbar";
function Employees() {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [trustScores, setTrustScores] = useState({});
    const [search, setSearch] = useState("");

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const loadEmployees = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/employees", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setEmployees(response.data);

            const scores = {};

            await Promise.all(
                response.data.map(async (employee) => {
                    try {

                        const score = await api.get(
                            `/employees/${employee.employee_id}/trust-score`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );

                        scores[employee.employee_id] =
                            score.data.trust_score;

                    } catch {

                        scores[employee.employee_id] = 0;

                    }
                })
            );

            setTrustScores(scores);

        } catch (err) {

            console.log(err);

        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const deleteEmployee = async () => {

        try {

            const token = localStorage.getItem("token");

            await api.delete(
                `/employees/${selectedEmployee}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setEmployees((prev) =>
                prev.filter(
                    (item) =>
                        item.employee_id !== selectedEmployee
                )
            );

            setConfirmOpen(false);
            setSelectedEmployee(null);

            setSnackbarMessage("Employee deleted successfully");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);

        } catch (err) {

            console.log(err);

            setSnackbarMessage("Failed to delete employee");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);

        }
    };

    const filteredEmployees = useMemo(() => {

        return employees.filter((employee) => {

            const keyword = search.toLowerCase();

            return (
                employee.first_name?.toLowerCase().includes(keyword) ||
                employee.email?.toLowerCase().includes(keyword) ||
                employee.role?.toLowerCase().includes(keyword)
            );

        });

    }, [employees, search]);

    const verifiedEmployees = Object.values(trustScores).filter(
        (score) => score >= 80
    ).length;

    const pendingEmployees = Object.values(trustScores).filter(
        (score) => score < 80
    ).length;

    const averageTrust =
        Object.keys(trustScores).length === 0
            ? 0
            : Math.round(
                Object.values(trustScores).reduce(
                    (a, b) => a + b,
                    0
                ) / Object.keys(trustScores).length
            );

    return (

        <DashboardLayout>

            <PageHeader
                title="Employees"
                subtitle="Manage employees, identities and workforce records."
                action={
                    <Button
                        variant="contained"
                        onClick={() => navigate("/employees/add")}
                    >
                        Add Employee
                    </Button>
                }
            />

            <Grid container spacing={3} sx={{ mb: 4 }}>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Total Employees"
                        value={employees.length}
                        icon={<People />}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Verified"
                        value={verifiedEmployees}
                        color="#22C55E"
                        icon={<VerifiedUser />}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Pending"
                        value={pendingEmployees}
                        color="#F59E0B"
                        icon={<PendingActions />}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title="Average Trust"
                        value={`${averageTrust}%`}
                        color="#3B82F6"
                        icon={<Shield />}
                    />
                </Grid>

            </Grid>

            <SearchToolbar
                search={search}
                onSearchChange={setSearch}
                onRefresh={loadEmployees}
                onAdd={() => navigate("/employees/add")}
                addLabel="Add Employee"
            />

            <AppTable
                columns={[
                    "Employee",
                    "Email",
                    "Role",
                    "Trust Score",
                    "Status",
                    "Actions"
                ]}
            >

                {filteredEmployees.map((employee) => {

                    const trust =
                        trustScores[employee.employee_id] || 0;

                    return (

                        <TableRow
                            hover
                            key={employee.employee_id}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "action.hover"
                                }
                            }}
                        >

                            <TableCell>

                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >

                                    <Box
                                        sx={{
                                            width: 42,
                                            height: 42,
                                            borderRadius: "50%",
                                            bgcolor: "primary.main",
                                            color: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        {employee.first_name?.charAt(0).toUpperCase()}
                                    </Box>

                                    <Box>

                                        <Typography
                                            fontWeight={600}
                                        >
                                            {employee.first_name} {employee.last_name ?? ""}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            ID :
                                            {employee.employee_id}
                                        </Typography>

                                    </Box>

                                </Stack>

                            </TableCell>

                            <TableCell>
                                {employee.email}
                            </TableCell>

                            <TableCell>
                                {employee.role}
                            </TableCell>

                            <TableCell>

                                <Typography
                                    fontWeight={700}
                                    color={
                                        trust >= 80
                                            ? "success.main"
                                            : trust >= 50
                                                ? "warning.main"
                                                : "error.main"
                                    }
                                >
                                    <Typography
                                        fontWeight={700}
                                        color={
                                            trust >= 80
                                                ? "success.main"
                                                : trust >= 50
                                                    ? "warning.main"
                                                    : "error.main"
                                        }
                                    >
                                        {trust}%
                                    </Typography>
                                </Typography>

                            </TableCell>

                            <TableCell>

                                <StatusChip
                                    status={
                                        trust >= 80
                                            ? "Verified"
                                            : "Pending"
                                    }
                                />

                            </TableCell>

                            <TableCell>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                >

                                    <Tooltip title="Profile">

                                        <IconButton
                                            color="success"
                                            onClick={() =>
                                                navigate(
                                                    `/employee-profile/${employee.employee_id}`
                                                )
                                            }
                                        >
                                            <AccountCircle />
                                        </IconButton>

                                    </Tooltip>

                                    <Tooltip title="Edit">

                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                navigate(
                                                    `/employees/edit/${employee.employee_id}`
                                                )
                                            }
                                        >
                                            <Edit />
                                        </IconButton>

                                    </Tooltip>

                                    <Tooltip title="Timeline">

                                        <IconButton
                                            color="secondary"
                                            onClick={() =>
                                                navigate(
                                                    `/timeline/${employee.employee_id}`
                                                )
                                            }
                                        >
                                            <Timeline />
                                        </IconButton>

                                    </Tooltip>

                                    <Tooltip title="Delete">

                                        <IconButton
                                            color="error"
                                            onClick={() => {

                                                setSelectedEmployee(
                                                    employee.employee_id
                                                );

                                                setConfirmOpen(true);

                                            }}
                                        >
                                            <Delete />
                                        </IconButton>

                                    </Tooltip>

                                </Stack>

                            </TableCell>

                        </TableRow>

                    );

                })}

            </AppTable>

            <ConfirmDialog
                open={confirmOpen}
                title="Delete Employee"
                message="Are you sure you want to delete this employee? This action cannot be undone."
                onConfirm={deleteEmployee}
                onCancel={() => {
                    setConfirmOpen(false);
                    setSelectedEmployee(null);
                }}
            />

            <AppSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />

        </DashboardLayout>

    );
}

export default Employees;