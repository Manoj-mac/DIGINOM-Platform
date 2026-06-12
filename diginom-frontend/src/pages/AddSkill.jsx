import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    MenuItem
} from "@mui/material";

import api from "../api/api";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function AddSkill() {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);

    const [formData, setFormData] = useState({
        employee_id: "",
        skill_name: "",
        skill_level: ""
    });

    useEffect(() => {

        const fetchEmployees = async () => {

            try {

                const token =
                    localStorage.getItem("token");

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

                setEmployees(response.data);

            } catch (error) {

                console.log(error);
            }
        };

        fetchEmployees();

    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await api.post(
                "/skills",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            navigate("/skills");

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                >
                    Add Skill
                </Typography>

                <Card>

                    <CardContent>

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <TextField
                                select
                                fullWidth
                                label="Employee"
                                margin="normal"
                                value={
                                    formData.employee_id
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        employee_id:
                                            e.target.value
                                    })
                                }
                            >

                                {employees.map(
                                    (employee) => (

                                        <MenuItem
                                            key={
                                                employee.employee_id
                                            }
                                            value={
                                                employee.employee_id
                                            }
                                        >
                                            {
                                                employee.first_name
                                            }
                                        </MenuItem>

                                    )
                                )}

                            </TextField>

                            <TextField
                                fullWidth
                                label="Skill Name"
                                margin="normal"
                                value={
                                    formData.skill_name
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        skill_name:
                                            e.target.value
                                    })
                                }
                            />

                            <TextField
                                select
                                fullWidth
                                label="Skill Level"
                                margin="normal"
                                value={
                                    formData.skill_level
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        skill_level:
                                            e.target.value
                                    })
                                }
                            >

                                <MenuItem value="Beginner">
                                    Beginner
                                </MenuItem>

                                <MenuItem value="Intermediate">
                                    Intermediate
                                </MenuItem>

                                <MenuItem value="Advanced">
                                    Advanced
                                </MenuItem>

                                <MenuItem value="Expert">
                                    Expert
                                </MenuItem>

                            </TextField>

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 2 }}
                            >
                                Save Skill
                            </Button>

                        </form>

                    </CardContent>

                </Card>

            </Box>

        </Box>
    );
}

export default AddSkill;