import { ThemeOptions } from "@mui/material/styles";
import { teal } from "@mui/material/colors";

export const lightTheme: ThemeOptions = {
    palette: {
        mode: "light",
        primary: {
            main: teal[500],
        },
        background: {
            default: teal[50],
            paper: "#ffffff",
        },
    },
};
