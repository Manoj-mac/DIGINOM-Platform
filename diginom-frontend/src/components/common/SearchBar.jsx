import {
    TextField,
    InputAdornment
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {

    return (

        <TextField

            placeholder="Search employees, jobs, skills..."

            variant="outlined"

            fullWidth

            InputProps={{

                startAdornment: (

                    <InputAdornment position="start">

                        <SearchIcon
                            sx={{
                                color: "#94A3B8"
                            }}
                        />

                    </InputAdornment>

                )

            }}

            sx={{

                maxWidth: 450,

                "& .MuiOutlinedInput-root": {

                    borderRadius: 4,

                    background:
                        "rgba(255,255,255,.05)",

                    color: "#fff",

                    "& fieldset": {

                        border:
                            "1px solid rgba(255,255,255,.08)"

                    },

                    "&:hover fieldset": {

                        borderColor: "#00E5FF"

                    },

                    "&.Mui-focused fieldset": {

                        borderColor: "#00E5FF"

                    }

                },

                input: {

                    color: "#fff"

                }

            }}

        />

    );

}

export default SearchBar;