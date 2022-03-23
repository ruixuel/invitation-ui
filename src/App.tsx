import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { IntlProvider } from "react-intl";
import { isNil } from "./utils/Utils";
import { getMessages } from "./i18n/messages";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./theme/theme";
import InvitationApp from "./InvitationApp";

function App() {
    const searchParams = new URLSearchParams(window.location.search);
    const locale =
        searchParams.get("locale") ??
        (!isNil(navigator.languages) && navigator.languages.length > 0
            ? navigator.languages[0]
            : navigator.language);
    const themeMode = searchParams.get("theme") ?? "light";
    return (
        <IntlProvider
            messages={getMessages(locale)}
            locale={locale}
            defaultLocale="en"
        >
            <React.Fragment>
                <CssBaseline enableColorScheme />
                <ThemeProvider theme={getTheme(themeMode)}>
                    <InvitationApp />
                </ThemeProvider>
            </React.Fragment>
        </IntlProvider>
    );
}

export default App;
