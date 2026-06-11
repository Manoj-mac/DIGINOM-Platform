import { useEffect, useState } from "react";
import api from "../api/api";
import Sidebar from "../components/Sidebar";

function Dashboard() {

    const [stats, setStats] = useState({});

    useEffect(() => {

        const fetchStats = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const response =
                    await api.get(
                        "/dashboard/stats",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setStats(response.data);

            } catch (error) {

                console.log(error);
            }
        };

        fetchStats();

    }, []);

    return (
        <div style={{ display: "flex" }}>

            <Sidebar />

            <div style={{ padding: "20px" }}>

                <h1>DIGINOM Dashboard 🚀</h1>

                <h3>Total Employees: {stats.employees}</h3>

                <h3>Total Skills: {stats.skills}</h3>

                <h3>Total Certifications: {stats.certifications}</h3>

                <h3>Total Documents: {stats.documents}</h3>

                <h3>Total Jobs: {stats.jobs}</h3>

                <h3>Total Verifications: {stats.verifications}</h3>

            </div>

        </div>
    );
}

export default Dashboard;