import {
    Box,
    Grid
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import api from "../api/api";

import Sidebar
    from "../components/Sidebar";

import HeroBanner
    from "../components/ui/HeroBanner";

import DigitalEmployeeCard
    from "../components/Employee/DigitalEmployeeCard";

import TrustScoreRing
    from "../components/Employee/TrustScoreRing";

import EmployeeStats
    from "../components/Employee/EmployeeStats";

import ActivityTimeline
    from "../components/Employee/ActivityTimeline";


function EmployeeDashboard() {

    const [employee, setEmployee] =
        useState(null);

    const [summary, setSummary] =
        useState(null);

    const [timeline, setTimeline] =
        useState([]);

    const employeeId =
        localStorage.getItem(
            "employee_id"
        );


    useEffect(() => {

        const fetchDashboardData =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );


                    // EMPLOYEE DETAILS

                    const employeeResponse =
                        await api.get(

                            `/employees/${employeeId}`,

                            {

                                headers: {

                                    Authorization:
                                        `Bearer ${token}`

                                }

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

                                headers: {

                                    Authorization:
                                        `Bearer ${token}`

                                }

                            }

                        );

                    setSummary(
                        summaryResponse.data
                    );


                    // EMPLOYEE TIMELINE

                    const timelineResponse =
                        await api.get(

                            `/employees/${employeeId}/timeline`,

                            {

                                headers: {

                                    Authorization:
                                        `Bearer ${token}`

                                }

                            }

                        );

                    setTimeline(
                        timelineResponse.data
                    );

                }

                catch (error) {

                    console.error(
                        "Employee Dashboard Error",
                        error
                    );

                }

            };


        if (employeeId) {

            fetchDashboardData();

        }

    }, [employeeId]);


    return (

        <Box

            sx={{

                display: "flex",

                background: "#020617",

                minHeight: "100vh"

            }}

        >

            <Sidebar />

            <Box

                sx={{

                    flexGrow: 1,

                    p: 4,

                    overflow: "hidden"

                }}

            >

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


                <ActivityTimeline

                    timeline={timeline}

                />

            </Box>

        </Box>

    );

}

export default EmployeeDashboard;