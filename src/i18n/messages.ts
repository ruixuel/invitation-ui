import { isNil } from "../utils/Utils";

type Messages = {
    EN: Record<string, string>;
};

const EN_MESSAGES = {
    broccoli_co: "Broccoli & Co.",
    a_better_way_to_enjoy_every_day:
        "A better way<br></br> to enjoy every day.",
    be_the_first_to_know_when_we_launch: "Be the first to know when we launch.",
    made_with: "Made with ",
    in_melbourne: " in Melbourne",
    all_rights_reserved: "All rights reserved.",
    request_an_invite: "Request an invite",
    full_name: "Full name",
    email: "Email",
    confirm_email: "Confirm email",
    send: "Send",
    name_error: "Name should contain at least 3 characters",
    email_error: "Invalid Email",
    confirm_email_error: "Confirm email does not match Email",
    sending_please_wait: "Sending, please wait...",
    all_done: "All done!",
    succes_msg:
        "You will be one of the first to experience Broccoli & Co. when we launch.",
    ok: "OK",
    error_occurred: "An error occured",
};

const MESSAGES: Messages = {
    EN: EN_MESSAGES,
};

export const getMessages = (locale: string) => {
    return isNil(MESSAGES[locale as keyof Messages])
        ? MESSAGES["EN"]
        : MESSAGES[locale as keyof Messages];
};
