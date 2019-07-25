import React from "react";

// input: liked: boolean
// output: onClick; whoever uses this comp will be notified, will then take care of toggling like property, and saving changes in db.
// this comp itself knows nothing about movies, it's just responsbile for rendering an empty or full heart.

const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) {
    classes += "-o";
  }
  return <i onClick={props.onClick} className={classes} aria-hidden="true" />;
};

export default Like;
