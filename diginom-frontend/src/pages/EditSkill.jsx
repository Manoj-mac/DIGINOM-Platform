import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    MenuItem,
    Checkbox,
    FormControlLabel
} from "@mui/material";

import api from "../api/api";
import Sidebar from "../components/Sidebar";
import {
    useNavigate,
    useParams
} from "react-router-dom";

function EditSkill() {

    const { skillId } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            skill_name: "",
            skill_level: "",
            verified: false
        });

    useEffect(() => {

        const fetchSkill =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

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

                    const skill =
                        response.data.find(
                            (s) =>
                                s.skill_id === skillId
                        );

                    if (skill) {

                        setFormData({
                            skill_name:
                                skill.skill_name,
                            skill_level:
                                skill.skill_level,
                            verified:
                                skill.verified
                        });
                    }

                } catch (error) {

                    console.log(error);
                }
            };

        fetchSkill();

    }, [skillId]);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                await api.put(
                    `/skills/${skillId}`,
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
                    Edit Skill
                </Typography>

                <Card>

                    <CardContent>

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

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

                                <MenuItem value="Expert">
                                    Expert
                                </MenuItem>

                            </TextField>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            formData.verified
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                verified:
                                                    e.target.checked
                                            })
                                        }
                                    />
                                }
                                label="Verified"
                            />

                            <br />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 2
                                }}
                            >
                                Save Changes
                            </Button>

                        </form>

                    </CardContent>

                </Card>

            </Box>

        </Box>
    );
}

export default EditSkill;