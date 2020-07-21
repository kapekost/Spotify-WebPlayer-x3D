import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));
const DocumentsItems = (props) => {
  const classes = useStyles();
  console.log(props.documents);
  if (props.documents.length === 0) {
    return <div>loading ...</div>;
  }

  return props.documents.map((document) => (
    <span key={document.id}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <span role="img" aria-label="icon package">
            🔖
          </span>
        </ListItemAvatar>
        <ListItemText
          primary={"details " + document.details}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {"Title " + document.title}
              </Typography>
              <br />
              <Moment date={document.date} durationFromNow /> {"ago"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </span>
  ));
};
export default function DocumentsList(props) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <DocumentsItems documents={props.documentsList}></DocumentsItems>
    </List>
  );
}
