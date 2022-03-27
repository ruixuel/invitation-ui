import { ThemeOptions } from "@mui/material/styles";
import { teal } from "@mui/material/colors";

export const darkTheme: ThemeOptions = {
    palette: {
        mode: "dark",
        primary: {
            main: teal[500],
        },
        background: {
            default: teal[900],
            paper: "#000000",
        },
    },
};
