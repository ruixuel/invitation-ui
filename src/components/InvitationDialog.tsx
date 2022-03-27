import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { FormattedMessage, useIntl } from "react-intl";
import { useEffect, useState } from "react";
import {
    isEmptyString,
    validateEmail,
    validateStringLength,
} from "../utils/Utils";
import ApiManager from "../lib/ApiManager";
import { styled } from "@mui/material/styles";

type InvitationDialogProps = {
    open: boolean;
    onClose: (isSucceed?: boolean) => void;
};

interface State {
    name: string;
    email: string;
    confirmEmail: string;
}

interface ErrorState {
    nameError: string | null;
    emailError: string | null;
    confirmEmailError: string | null;
}

export const StyledDialogDivider = styled(Divider)(({ theme }) => {
    return {
        width: "50px",
        borderColor: theme.palette.text.primary,
        margin: "auto",
    };
});

export default function InvitationDialog(props: InvitationDialogProps) {
    const intl = useIntl();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [inputError, setInputError] = useState<ErrorState>({
        nameError: null,
        emailError: null,
        confirmEmailError: null,
    });
    const [values, setValues] = useState<State>({
        name: "",
        email: "",
        confirmEmail: "",
    });

    const validateConfirmEmail = (input: State) => {
        return input.email === input.confirmEmail;
    };

    const validateName = (input: State) => {
        return validateStringLength(input.name, 3);
    };

    const validateEmailAddress = (input: State) => {
        return validateEmail(input.email);
    };

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setError(null);
            setValues({ ...values, [prop]: event.target.value });
        };

    useEffect(() => {
        if (inputError.nameError !== null) {
            const isValid = validateName(values);
            if (isValid) {
                setInputError({ ...inputError, nameError: null });
            }
        }
    }, [values.name]);

    useEffect(() => {
        if (inputError.emailError !== null) {
            const isValid = validateEmailAddress(values);
            if (isValid) {
                setInputError({ ...inputError, emailError: null });
            }
            const isConfirmEmailValid = validateConfirmEmail(values);
            if (isConfirmEmailValid) {
                setInputError({ ...inputError, confirmEmailError: null });
            }
        }
    }, [values.email]);

    useEffect(() => {
        if (inputError.confirmEmailError !== null) {
            const isValid = validateConfirmEmail(values);
            if (isValid) {
                setInputError({ ...inputError, confirmEmailError: null });
            }
        }
    }, [values.confirmEmail]);

    const handleClose = () => {
        if (!loading) {
            props.onClose();
        }
        setValues({
            name: "",
            email: "",
            confirmEmail: "",
        });
        setError(null);
        setInputError({
            nameError: null,
            emailError: null,
            confirmEmailError: null,
        });
    };

    const handleOnSubmit = () => {
        const isNameValid = validateName(values);
        const isEmailValid = validateEmailAddress(values);
        const isConfirmEmailValid = validateConfirmEmail(values);
        const isInputValid = isNameValid && isEmailValid && isConfirmEmailValid;
        const errorMsg: ErrorState = {
            nameError: null,
            emailError: null,
            confirmEmailError: null,
        };
        if (isInputValid) {
            setInputError(errorMsg);
            setLoading(true);
            ApiManager.register({
                name: values.name,
                email: values.email,
            })
                .then((result) => {
                    props.onClose(true);
                    setLoading(false);
                    setValues({
                        name: "",
                        email: "",
                        confirmEmail: "",
                    });
                    setError(null);
                    setInputError({
                        nameError: null,
                        emailError: null,
                        confirmEmailError: null,
                    });
                })
                .catch((error) => {
                    const errorText =
                        error.response?.data?.errorMessage ??
                        intl.formatMessage({ id: "error_occurred" });
                    setError(errorText);
                    setLoading(false);
                });
        } else {
            if (!isNameValid) {
                errorMsg.nameError = intl.formatMessage({ id: "name_error" });
            }
            if (!isEmailValid) {
                errorMsg.emailError = intl.formatMessage({ id: "email_error" });
            }
            if (!isConfirmEmailValid) {
                errorMsg.confirmEmailError = intl.formatMessage({
                    id: "confirm_email_error",
                });
            } else if (!isEmailValid) {
                errorMsg.confirmEmailError = intl.formatMessage({
                    id: "email_error",
                });
            }
            setInputError(errorMsg);
        }
    };

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            id="invitation-register-dialog"
            aria-label="invitation-register-dialog"
        >
            <DialogTitle id="invitation-register-dialog-title">
                <FormattedMessage id="request_an_invite" />
            </DialogTitle>
            <StyledDialogDivider />
            <DialogContent>
                <TextField
                    margin="dense"
                    id="invitation-register-dialog-name"
                    required
                    label={intl.formatMessage({ id: "full_name" })}
                    fullWidth
                    value={values.name}
                    onChange={handleChange("name")}
                    error={inputError.nameError !== null}
                    helperText={inputError.nameError}
                    disabled={loading}
                    inputProps={{ "aria-label": "name-input" }}
                />
                <TextField
                    margin="dense"
                    id="invitation-register-dialog-email"
                    required
                    label={intl.formatMessage({ id: "email" })}
                    type="email"
                    fullWidth
                    value={values.email}
                    onChange={handleChange("email")}
                    error={inputError.emailError !== null}
                    helperText={inputError.emailError}
                    disabled={loading}
                    inputProps={{ "aria-label": "email-input" }}
                />
                <TextField
                    margin="dense"
                    id="invitation-register-dialog-confirm-email"
                    required
                    label={intl.formatMessage({ id: "confirm_email" })}
                    type="email"
                    fullWidth
                    value={values.confirmEmail}
                    onChange={handleChange("confirmEmail")}
                    error={inputError.confirmEmailError !== null}
                    helperText={inputError.confirmEmailError}
                    disabled={loading}
                    inputProps={{ "aria-label": "confirm-email-input" }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={handleOnSubmit}
                    disabled={loading}
                    fullWidth
                    id="invitation-register-dialog-send-button"
                    aria-label="send"
                >
                    {loading ? (
                        <FormattedMessage id="sending_please_wait" />
                    ) : (
                        <FormattedMessage id="send" />
                    )}
                </Button>
                <Typography
                    variant="body2"
                    sx={{
                        color: "error.main",
                        fontStyle: "italic",
                        marginTop: "10px",
                    }}
                >
                    {error}
                </Typography>
            </DialogActions>
        </Dialog>
    );
}
