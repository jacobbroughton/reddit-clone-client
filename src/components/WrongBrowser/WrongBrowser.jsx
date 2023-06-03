import React from "react"
import "./WrongBrowser.css";

const WrongBrowser = () => {
  return (
    <div className="wrong-browser-view">
      <div className="wrong-browser-container">
        <h1>Oops!</h1>
        <p>
          It looks like you're using a browser that has disabled third-party cookies from
          cross-origin domains. This breaks this app's authentication, rendering it
          unusable. The only way around this is to purchase a yearly domain.
        </p>
        <p>
          Since this is a portfolio project (not a for-profit app), I ask you to view this
          on a non-webkit browser (like chrome or firefox on desktop) to ensure the
          optimal experience.
        </p>
        <strong>
          By the way, i'm sorry about this. Thanks in advance for checking out the
          project.
        </strong>
      </div>
    </div>
  );
};
export default WrongBrowser;
