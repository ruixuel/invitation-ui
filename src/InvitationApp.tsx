import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Logo from "./images/Logo";
import Button from "@mui/material/Button";
import InvitationDialog from "./components/InvitationDialog";
import SuccessDialog from "./components/SuccessDialog";

const StyledBox = styled(Box)(({ theme }) => {
    return {
        width: "100%",
        height: "60px",
        position: "fixed",
        zIndex: 10,
        backgroundColor: theme.palette.background.default,
    };
});

const FlexBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const FooterTypography = styled(Typography)(({ theme }) => {
    return {
        fontStyle: "italic",
        color: theme.palette.text.secondary,
    };
});

export default function InvitationApp() {
    const theme = useTheme();
    const [invitationDialogOpen, setInvitationDialogOpen] =
        useState<boolean>(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
    const borderColor = theme.palette.divider;

    const handleClick = () => {
        setInvitationDialogOpen(true);
    };

    const handleInvitationDialogClose = (isSucceed = false) => {
        setInvitationDialogOpen(false);
        if (isSucceed) {
            setSuccessDialogOpen(true);
        }
    };

    const handleSuccessDialogClose = (isSucced = false) => {
        setSuccessDialogOpen(false);
    };

    return (
        <Box sx={{ height: "100%", minWidth: "300px" }} id="invitation-app">
            <StyledBox
                sx={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: `1px solid ${borderColor}`,
                    paddingLeft: "10px",
                }}
                id="invitation-app-header"
            >
                <Logo />
                <Typography
                    variant="h6"
                    sx={{
                        textTransform: "uppercase",
                        color: "text.secondary",
                        marginLeft: "10px",
                    }}
                >
                    <FormattedMessage id="broccoli_co" />
                </Typography>
            </StyledBox>
            <FlexBox
                sx={{
                    flexDirection: "column",
                    color: "text.secondary",
                    paddingBottom: "60px",
                    paddingTop: "60px",
                    height: "100%",
                    backgroundColor: "background.paper",
                }}
                id="invitation-app-body"
            >
                <Typography
                    variant="h2"
                    sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        padding: "10px",
                    }}
                >
                    <FormattedMessage
                        id="a_better_way_to_enjoy_every_day"
                        values={{
                            br: () => <br />,
                        }}
                    />
                </Typography>
                <Typography variant="body2" sx={{ padding: "10px" }}>
                    <FormattedMessage id="be_the_first_to_know_when_we_launch" />
                </Typography>
                <Button
                    variant="outlined"
                    onClick={handleClick}
                    aria-label="Request an invite"
                >
                    <FormattedMessage id="request_an_invite" />
                </Button>
                <InvitationDialog
                    open={invitationDialogOpen}
                    onClose={handleInvitationDialogClose}
                />
                <SuccessDialog
                    open={successDialogOpen}
                    onClose={handleSuccessDialogClose}
                />
            </FlexBox>
            <StyledBox
                sx={{
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderTop: `1px solid ${borderColor}`,
                }}
                id="invitation-app-footer"
            >
                <FlexBox>
                    <FooterTypography variant="body2">
                        <FormattedMessage id="made_with" />
                    </FooterTypography>
                    <FavoriteIcon
                        fontSize="small"
                        sx={{
                            margin: "0px 5px 0px 5px",
                            color: "text.secondary",
                        }}
                    />
                    <FooterTypography variant="body2">
                        <FormattedMessage id="in_melbourne" />
                    </FooterTypography>
                </FlexBox>
                <FlexBox>
                    <FooterTypography variant="body2">
                        &copy;&nbsp;2016&nbsp;
                        <FormattedMessage id="broccoli_co" />
                        &nbsp;
                        <FormattedMessage id="all_rights_reserved" />
                    </FooterTypography>
                </FlexBox>
            </StyledBox>
        </Box>
    );
}
