import React, { Component } from "react";

// input: liked: boolean
// output: onClick; whoever uses this comp will be notified, will then take care of toggling like property, and saving changes in db.
// this comp itself knows nothing about movies, it's just responsbile for rendering an empty or full heart.

class Like extends Component {
  render() {
    return <i class="fa fa-heart" aria-hidden="true" />;
  }
}

export default Like;
