import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: "400px",
    justifyContent: "center",
    alignItems: "center",
}));



export const Kpi = () => {

    const style = useSelector((state) => state.style)
    const data = useSelector(state => state.data.data)
    function calculateDaysOfRunningSystem() {
        var Difference_In_Time = new Date().getTime() - new Date("09/20/2021").getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        return Math.floor(Difference_In_Days);   // The function returns the product of p1 and p2
    }
    function calculateMeasurementCounts() {
        var runningHours = (new Date().getTime() - new Date("09/20/2021").getTime()) / (1000 * 3600);
        return Math.floor(runningHours * 6) * calculateNbrOfBouys() * calculateNbrOfSensors();
    }
    function calculateNbrOfBouys() {
        //TO DO
        //{data.buoyCount()}
        return 3;
    }
    function calculateNbrOfSensors() {
        //To DO
        //{data.sensorCount()}
        return 2;
    }
    return (
        <div>
            <Grid
                container
                spacing={2}
                // alignItems="center"
                //className="App-Grid"

                justifyContent="center"
                wrap="wrap"
                style={{ overflow: "auto" }}
            >
                <Grid item xs={12} md={3} >
                    <Item style={{ height: "100px" }} >
                        <Stack direction="row" spacing={3} style={{ paddingTop: "15px", paddingLeft: "15px" }}>
                            <Avatar alt="" sx={{ width: 56, height: 56, bgcolor: style.accentColor1light, paddingTop: "10px" }}>
                                <img src="Buoy.svg" width="40" height="40" style={{ color: style.accentColor1 }} />
                            </Avatar>
                            <Stack direction="column" spacing={-1} style={{ verticalAlign: "center" }}>
                                <div style={{ fontSize: "30px", fontWeight: "bold", color: style.textColor }}>

                                    {calculateNbrOfBouys()}
                                </div>
                                <div style={{ fontSize: "14px", color: style.lightGray }}>
                                    Current active buoys
                                </div>
                            </Stack>
                        </Stack>
                    </Item>
                </Grid>
                <Grid item xs={12} md={3} >
                    <Item style={{ height: "100px" }}>
                        <Stack direction="row" spacing={3} style={{ paddingTop: "15px", paddingLeft: "15px" }}>
                            <Avatar alt="" sx={{ width: 56, height: 56, bgcolor: style.accentColor1light, paddingTop: "10px" }}>
                                <img src="Drone.svg" width="40" height="40" style={{ color: style.accentColor1 }} />
                            </Avatar>
                            <Stack direction="column" spacing={-1} style={{ verticalAlign: "center" }}>
                                <div style={{ fontSize: "30px", fontWeight: "bold", color: style.textColor }}>
                                    2
                                </div>
                                <div style={{ fontSize: "14px", color: style.lightGray }}>
                                    Current active drones
                                </div>
                            </Stack>
                        </Stack>
                    </Item>
                </Grid>
                <Grid item xs={12} md={3} >
                    <Item style={{ height: "100px" }}>
                        <Stack direction="row" spacing={3} style={{ paddingTop: "15px", paddingLeft: "15px" }}>
                            <Avatar alt="" sx={{ width: 56, height: 56, bgcolor: style.accentColor1light, paddingTop: "10px" }}>
                                <img src="Data.svg" width="40" height="40" style={{ color: style.accentColor1 }} />
                            </Avatar>
                            <Stack direction="column" spacing={-1} style={{ verticalAlign: "center" }}>
                                <div style={{ fontSize: "30px", fontWeight: "bold", color: style.textColor }}>
                                    {calculateMeasurementCounts()}
                                </div>
                                <div style={{ fontSize: "14px", color: style.lightGray }}>
                                    Collected measurements
                                </div>
                            </Stack>
                        </Stack>
                    </Item>
                </Grid>
                <Grid item xs={12} md={3} >
                    <Item style={{ height: "100px" }}>
                        <Stack direction="row" spacing={3} style={{ paddingTop: "15px", paddingLeft: "15px" }}>
                            <Avatar alt="" sx={{ width: 56, height: 56, bgcolor: style.accentColor1light, paddingTop: "10px" }}>
                                <img src="Date.svg" width="40" height="40" style={{ color: style.accentColor1 }} />
                            </Avatar>
                            <Stack direction="column" spacing={-1} style={{ verticalAlign: "center" }}>
                                <div style={{ fontSize: "30px", fontWeight: "bold", color: style.textColor }}>
                                    {calculateDaysOfRunningSystem()}
                                </div>
                                <div style={{ fontSize: "14px", color: style.lightGray }}>
                                    days of running system
                                </div>
                            </Stack>
                        </Stack>
                    </Item>
                </Grid>
            </Grid>
        </div>

    )
}
