import React from "react";
import { useDispatch } from "react-redux";
import addWeeks from "date-fns/addWeeks";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const mode = window.innerWidth < 780 ? 1 : 2;
const theme = createTheme({
    palette: {
        primary: {
            main: "#FF385C",
        },
        secondary: {
            main: "#222",
        },
    },
});
export function DatePicker({ order, setOrder }) {
    const dispatch = useDispatch();
    function getWeeksAfter(date, amount) {
        return date ? addWeeks(date, amount) : undefined;
    }
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                    disablePast
                    className='date-picker-checkout'
                    calendars={mode}
                    // value={[order.checkIn, order.checkOut]}
                    value={['01/01/1999','02/01/1999']}
                    // maxDate={getWeeksAfter(order.checkIn, 8)}
                    onChange={(newValue) => {
                        console.log('hello')
                    }}
                    startText='Check-in'
                    endText='Check-out'
                    renderInput={(startProps, endProps) => (
                        <React.Fragment>
                            <TextField className={"start-date"} {...startProps} />
                            <TextField className={"end-date"} {...endProps} />
                        </React.Fragment>
                    )}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}