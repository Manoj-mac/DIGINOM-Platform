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
import ConfirmDialog
    from "../components/ConfirmDialog";
import { useNavigate } from "react-router-dom";

function Skills() {

    const [skills, setSkills] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const fetchSkills = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const response =
                    await api.get(
                        "/skills",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );
                const [confirmOpen,
                    setConfirmOpen] =
                    useState(false);

                const [selectedSkill,
                    setSelectedSkill] =
                    useState(null);

                setSkills(response.data);

            } catch (error) {

                console.log(error);
            }
        };

        fetchSkills();

    }, []);
    const deleteSkill =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                await api.delete(

                    `/skills/${selectedSkill}`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setSkills(

                    prevSkills =>

                        prevSkills.filter(

                            skill =>

                                skill.skill_id !==

                                selectedSkill
                        )
                );

                setConfirmOpen(
                    false
                );

                setSelectedSkill(
                    null
                );

            } catch (error) {

                console.log(
                    error
                );
            }
        };

    const filteredSkills =
        skills.filter(
            (skill) =>
                skill.skill_name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    backgroundColor: "#f5f7fa",
                    minHeight: "100vh"
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                >
                    Skills Management
                </Typography>

                <Card sx={{ mb: 3 }}>

                    <CardContent>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 2
                            }}
                        >

                            <TextField
                                label="Search Skill"
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
                                        "/skills/add"
                                    )
                                }
                            >
                                Add Skill
                            </Button>

                        </Box>

                    </CardContent>

                </Card>

                <TableContainer component={Paper}>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Employee
                                </TableCell>

                                <TableCell>
                                    Skill
                                </TableCell>

                                <TableCell>
                                    Level
                                </TableCell>

                                <TableCell>
                                    Verified
                                </TableCell>

                                <TableCell>
                                    Actions
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {filteredSkills.map(
                                (skill) => (

                                    <TableRow
                                        key={
                                            skill.skill_id
                                        }
                                    >
                                        <TableCell>
                                            {skill.employee_name}
                                        </TableCell>

                                        <TableCell>
                                            {
                                                skill.skill_name
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                skill.skill_level
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                skill.verified
                                                    ? "Yes"
                                                    : "No"
                                            }
                                        </TableCell>

                                        <TableCell>

                                            <Button
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    mr: 1
                                                }}
                                                onClick={() =>
                                                    navigate(
                                                        `/skills/edit/${skill.skill_id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                onClick={() => {

                                                    setSelectedSkill(
                                                        skill.skill_id
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

                    title="Delete Skill"

                    message="Are you sure you want to delete this skill? This action cannot be undone."

                    onConfirm={
                        deleteSkill
                    }

                    onCancel={() => {

                        setConfirmOpen(
                            false
                        );

                        setSelectedSkill(
                            null
                        );

                    }}

                />


                open={confirmOpen}

                title="Delete Skill"

                message="Are you sure you want to delete this skill? This action cannot be undone."

                onConfirm={
                    deleteSkill
                }

                onCancel={() => {

                    setConfirmOpen(
                        false
                    );

                    setSelectedSkill(
                        null
                    );

                }}

            </Box>

        </Box>
    );
}

export default Skills;