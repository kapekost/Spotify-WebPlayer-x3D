import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Grid, Paper, Box } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
export default () => {
  const classes = useStyles();

  //   const state = useSelector((state) => state.homeStore);
  //   const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <Grid container direction="row-reverse" spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Box textAlign="left" fontWeight="fontWeightBold">
              Home
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
