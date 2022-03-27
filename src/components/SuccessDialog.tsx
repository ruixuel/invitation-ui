import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormattedMessage } from "react-intl";

type SuccessDialogProps = {
    open: boolean;
    onClose: () => void;
};

export default function SuccessDialog(props: SuccessDialogProps) {
    const handleClose = () => {
        props.onClose();
    };

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            id="invitation-success-dialog"
        >
            <DialogTitle
                sx={{
                    fontStyle: "italic",
                }}
                id="invitation-success-dialog-title"
            >
                <FormattedMessage id="all_done" />
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="invitation-success-dialog-text">
                    <FormattedMessage id="succes_msg" />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    id="invitation-success-dialog-ok-button"
                    variant="outlined"
                    fullWidth
                    onClick={handleClose}
                    aria-label="ok"
                >
                    <FormattedMessage id="ok" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}
