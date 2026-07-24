import {
    Card,
    CardContent,
    Typography,
    Button,
    Stack
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function QuickActions() {

    const navigate = useNavigate();

    return (

        <Card sx={{ height: "100%" }}>

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >
                    Quick Actions
                </Typography>

                <Stack spacing={2} mt={2}>

                    <Button
                        variant="contained"
                        onClick={() => navigate("/employees")}
                    >
                        Add Employee
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => navigate("/jobs")}
                    >
                        Create Job
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => navigate("/documents")}
                    >
                        Verify Documents
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => navigate("/interviews")}
                    >
                        Schedule Interview
                    </Button>

                </Stack>

            </CardContent>

        </Card>

    );
}

export default QuickActions;