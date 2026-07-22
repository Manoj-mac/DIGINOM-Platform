import {
    Box,
    Button,
    TextField
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import InputAdornment from "@mui/material/InputAdornment";

export default function SearchToolbar({
    search,
    onSearchChange,
    onRefresh,
    onAdd,
    addLabel = "Add"
}) {

    return (

        <Box
            sx={{
                display: "flex",
                gap: 2,
                mb: 3,
                alignItems: "center",
                flexWrap: "wrap"
            }}
        >

            <TextField
                placeholder="Search..."
                value={search}
                onChange={(e) =>
                    onSearchChange(e.target.value)
                }
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchRoundedIcon />
                        </InputAdornment>
                    )
                }}
                sx={{
                    flex: 1,
                    minWidth: 320
                }}
            />

            <Button
                variant="outlined"
                startIcon={<RefreshRoundedIcon />}
                onClick={onRefresh}
            >
                Refresh
            </Button>

            <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={onAdd}
            >
                {addLabel}
            </Button>

        </Box>

    );

}