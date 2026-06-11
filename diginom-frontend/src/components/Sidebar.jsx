import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div
            style={{
                width: "250px",
                height: "100vh",
                background: "#1e293b",
                color: "white",
                padding: "20px"
            }}
        >
            <h2>DIGINOM</h2>

            <p><Link to="/dashboard">Dashboard</Link></p>
            <p><Link to="/employees">Employees</Link></p>
            <p><Link to="/skills">Skills</Link></p>
            <p><Link to="/certifications">Certifications</Link></p>
            <p><Link to="/documents">Documents</Link></p>
            <p><Link to="/jobs">Jobs</Link></p>
            <p><Link to="/verification">Verification</Link></p>
        </div>
    );
}

export default Sidebar;