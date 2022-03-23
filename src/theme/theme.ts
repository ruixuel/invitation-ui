import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { lightTheme } from "./light";
import { darkTheme } from "./dark";
import { ThemeOptions } from "@mui/system";

type ThemeType = {
    dark: ThemeOptions;
    light: ThemeOptions;
};

const THEME = {
    dark: darkTheme,
    light: lightTheme,
};

export const getTheme = (themeMode: string) => {
    const themeObj = THEME[themeMode as keyof ThemeType] ?? THEME["light"];
    const theme = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                    },
                },
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        textAlign: "center",
                    },
                },
            },
            MuiDialogContentText: {
                styleOverrides: {
                    root: {
                        textAlign: "center",
                    },
                },
            },
            MuiDialogActions: {
                styleOverrides: {
                    root: {
                        justifyContent: "center",
                        padding: "24px 20px 40px 20px",
                        flexDirection: "column",
                    },
                },
            },
        },
        ...themeObj,
    });
    return responsiveFontSizes(theme);
};
