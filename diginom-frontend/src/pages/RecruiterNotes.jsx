import {
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import api from "../api/api";
import Sidebar from "../components/Sidebar";

function RecruiterNotes() {

    const [note,
        setNote] =
        useState("");

    const [notes,
        setNotes] =
        useState([]);

    const recruiterEmail =
        "admin@gmail.com";

    const employeeId =
        "REPLACE_WITH_EMPLOYEE_ID";

    const fetchNotes =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await api.get(

                        `/recruiter-notes/${recruiterEmail}`,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setNotes(
                    response.data
                );

            } catch (error) {

                console.log(error);
            }
        };

    useEffect(() => {

        fetchNotes();

    }, []);

    const addNote =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                await api.post(

                    "/recruiter-notes",

                    {

                        recruiter_email:
                            recruiterEmail,

                        employee_id:
                            employeeId,

                        note:
                            note
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setNote("");

                fetchNotes();

            } catch (error) {

                console.log(error);
            }
        };

    return (

        <Box
            sx={{
                display: "flex"
            }}
        >

            <Sidebar />

            <Box
                sx={{
                    p: 4,
                    flexGrow: 1
                }}
            >

                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Recruiter Notes
                </Typography>

                <Paper
                    sx={{
                        p: 3,
                        mb: 3
                    }}
                >

                    <TextField
                        label="Add Note"
                        multiline
                        rows={4}
                        fullWidth
                        value={note}
                        onChange={(e) =>
                            setNote(
                                e.target.value
                            )
                        }
                    />

                    <Button
                        variant="contained"
                        sx={{
                            mt: 2
                        }}
                        onClick={addNote}
                    >
                        Save Note
                    </Button>

                </Paper>

                {notes.map(

                    (item) => (

                        <Paper
                            key={
                                item.note_id
                            }
                            sx={{
                                p: 2,
                                mb: 2
                            }}
                        >

                            <Typography>
                                {item.note}
                            </Typography>

                        </Paper>

                    )

                )}

            </Box>

        </Box>
    );
}

export default RecruiterNotes;