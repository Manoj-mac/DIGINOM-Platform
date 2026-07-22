
import {
    useEffect,
    useState
} from "react";

import api from "../api/api";

import HeroBanner from "../components/ui/HeroBanner";

import DigitalEmployeeCard from "../components/Employee/DigitalEmployeeCard";

import TrustScoreRing from "../components/Employee/TrustScoreRing";

import EmployeeStats from "../components/Employee/EmployeeStats";

import ActivityTimeline from "../components/Employee/ActivityTimeline";

import NotificationPanel from "../components/Employee/NotificationPanel";

import DashboardLayout from "../components/dashboard/DashboardLayout";
function EmployeeDashboard() {

    const [employee, setEmployee] = useState(null);

    const [summary, setSummary] = useState(null);

    const [timeline, setTimeline] = useState([]);

    const [notifications, setNotifications] = useState([]);

    const employeeId =
        localStorage.getItem(
            "employee_id"
        );

    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const headers = {

                    Authorization:
                        `Bearer ${token}`

                };

                // EMPLOYEE

                const employeeResponse =
                    await api.get(

                        `/employees/${employeeId}`,

                        {
                            headers
                        }

                    );

                setEmployee(
                    employeeResponse.data
                );

                // DASHBOARD SUMMARY

                const summaryResponse =
                    await api.get(

                        `/employee-dashboard-summary/${employeeId}`,

                        {
                            headers
                        }

                    );

                setSummary(
                    summaryResponse.data
                );

                // ACTIVITY TIMELINE

                const timelineResponse =
                    await api.get(

                        `/employees/${employeeId}/timeline`,

                        {
                            headers
                        }

                    );

                setTimeline(
                    timelineResponse.data
                );

                // NOTIFICATIONS

                const notificationResponse =
                    await api.get(

                        `/notifications/${employeeResponse.data.email}`,

                        {
                            headers
                        }

                    );

                setNotifications(
                    notificationResponse.data
                );

            }

            catch (error) {

                console.error(
                    "Employee Dashboard Error:",
                    error
                );

            }

        };

        if (employeeId) {

            fetchDashboardData();

        }

    },

        [employeeId]);

    return (

        <DashboardLayout>

            <HeroBanner

                name={
                    employee
                        ? `${employee.first_name} ${employee.last_name}`
                        : "Employee"
                }

                role="Digital Workforce Identity Platform"

            />

            {employee && (

                <Grid
                    container
                    spacing={4}
                    sx={{ mt: 2 }}
                >

                    <Grid
                        item
                        xs={12}
                        lg={7}
                    >

                        <DigitalEmployeeCard

                            employee={{

                                ...employee,

                                trust_score:
                                    summary?.trust_score ?? 0

                            }}

                        />

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        lg={5}
                    >

                        <TrustScoreRing

                            score={
                                summary?.trust_score ?? 0
                            }

                            verifiedSkills={
                                summary?.verified_skills ?? 0
                            }

                            verifiedCertifications={
                                summary?.verified_certifications ?? 0
                            }

                            verifiedDocuments={
                                summary?.verified_documents ?? 0
                            }

                        />

                    </Grid>

                </Grid>

            )}

            {summary && (

                <EmployeeStats

                    verifiedSkills={
                        summary.verified_skills
                    }

                    verifiedCertifications={
                        summary.verified_certifications
                    }

                    verifiedDocuments={
                        summary.verified_documents
                    }

                    employmentStatus={
                        summary.employment_status
                    }

                />

            )}

            <Grid
                container
                spacing={4}
                sx={{ mt: 2 }}
            >

                <Grid
                    item
                    xs={12}
                    lg={8}
                >

                    <ActivityTimeline
                        timeline={timeline}
                    />

                </Grid>

                <Grid
                    item
                    xs={12}
                    lg={4}
                >

                    <NotificationPanel
                        notifications={notifications}
                    />

                </Grid>

            </Grid>

        </DashboardLayout>

    );

}

export default EmployeeDashboard;