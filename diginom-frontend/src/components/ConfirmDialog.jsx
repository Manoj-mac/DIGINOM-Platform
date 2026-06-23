import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";

function ConfirmDialog({

    open,

    title,

    message,

    onConfirm,

    onCancel,

    confirmText

}) {

    return (

        <Dialog
            open={open}
            onClose={onCancel}
        >

            <DialogTitle>
                {title}
            </DialogTitle>

            <DialogContent>

                <DialogContentText>
                    {message}
                </DialogContentText>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button
                    color="error"
                    variant="contained"
                    onClick={onConfirm}
                >
                
                    Delete
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default ConfirmDialog;