import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Grid, Paper, Box } from "@material-ui/core";
import "./home.css";
import "x3dom";

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
function createX3Dom() {
  return {
    __html: ` <x3d id="mainScene">
<scene>
  <Background
    id="3dBackground"
    backUrl="./images/bg.jpg"
    bind="true"
    groundColor="(0,0,0)"
    isActive="true"
  ></Background>
  <!-- Main box - start playback, play pause -->
  <transform DEF="spinning_cube" translation="0 1.5 1">
    <shape id="playBox">
      <appearance id="playBoxAppearance">
        <material
          id="playBoxConnected"
          transparency="0.2"
          diffuseColor="1 0 0"
        ></material>
      </appearance>
      <box></box>
    </shape>
  </transform>

  <!-- Main track text-->
  <transform DEF="text" translation="0 -1 0">
    <shape>
      <appearance>
        <material
          ambientintensity="0.0933"
          diffusecolor="0.32 0.54 0.26"
          shininess="0.51"
          specularcolor="0.46 0.46 0.46"
          emissivecolor="0,0,0"
        ></material>
      </appearance>
      <text id="mainText" string="Welcome" solid="false">
        <!-- Webfonts seem only to work in Webkit-Safari/Mac right now -->
        <fontstyle
          family="'Orbitron'"
          style="BOLDITALIC"
          size="0.5"
          horizontal="true"
          justify='"MIDDLE" "MIDDLE"'
          lefttoright="true"
          spacing="1"
          toptobottom="true"
          quality="4"
        ></fontstyle>
      </text>
    </shape>
  </transform>

  <!-- Next track box - play next track -->
  <transform
    DEF="next_cube"
    translation="4 1 -3"
    rotation="0 1 0 0.1"
  >
    <shape id="playBox_next">
      <appearance id="playBoxNextAppearance">
        <ImageTexture url="./images/spotify.png"></ImageTexture>
        <material
          transparency="0.3"
          diffuseColor="0.2 0.5 0.8"
        ></material>
      </appearance>
      <box></box>
    </shape>
  </transform>

  <!-- Previous track box - play previous track -->
  <transform
    DEF="prev_cube"
    translation="-4 1 -3"
    rotation="0 1 0 -0.1"
  >
    <shape id="playBox_prev">
      <appearance id="playBoxPrevAppearance">
        <ImageTexture url="./images/spotify.png"></ImageTexture>
        <material
          transparency="0.3"
          diffuseColor="0.2 0.5 0.5"
        ></material>
      </appearance>
      <box></box>
    </shape>
  </transform>

  <!--ROUTES-->

  <!-- main box spin-->
  <timeSensor
    DEF="time"
    cycleInterval="4"
    loop="true"
  ></timeSensor>
  <orientationInterpolator
    DEF="spin"
    key="0 0.5 0.8"
    keyValue="0 1 0.8 0  0 1 0.3 3.14159  0 1 0 6.28317"
  ></orientationInterpolator>
  <Route
    fromNode="time"
    fromField="fraction_changed"
    toNode="spin"
    toField="set_fraction"
  ></Route>
  <Route
    fromNode="spin"
    fromField="value_changed"
    toNode="spinning_cube"
    toField="rotation"
  ></Route>

  <!-- side boxes rotate-->
  <timeSensor
    DEF="float_time"
    cycleInterval="9"
    loop="true"
  ></timeSensor>
  <PositionInterpolator
    DEF="float_next"
    key="0 0.5 1"
    keyValue="4 0 -3  4 1 -3  4 0 -3"
  ></PositionInterpolator>
  <PositionInterpolator
    DEF="float_prev"
    key="0 0.5 1"
    keyValue="-4 0 -3  -4 1 -3  -4 0 -3"
  ></PositionInterpolator>
  <Route
    fromNode="float_time"
    fromField="fraction_changed"
    toNode="float_next"
    toField="set_fraction"
  ></Route>
  <Route
    fromNode="float_time"
    fromField="fraction_changed"
    toNode="float_prev"
    toField="set_fraction"
  ></Route>
  <Route
    fromNode="float_next"
    fromField="value_changed"
    toNode="next_cube"
    toField="translation"
  ></Route>
  <Route
    fromNode="float_prev"
    fromField="value_changed"
    toNode="prev_cube"
    toField="translation"
  ></Route>
</scene>
</x3d>`,
  };
}
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
              <div dangerouslySetInnerHTML={createX3Dom()}></div>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
