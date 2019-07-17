import React, { Component } from "react";
import * as firebase from "firebase/app";

class EnableLocalStorage extends Component {
  state = {};
  render() {
    return (
      <div className="center-on-page">
        <div className="leading-loose">
          Hi there, I think you blocked cookies on your browser. Here's how to enable them again:<br /> 
          1. Click Settings<br />
          2. Click Advanced<br />
          3. Click Content Settings<br />
          4. Click Cookies<br />
          5. Uncheck Block Third Party Cookies<br />
          6. Refresh this page<br />
          7. If you still see this error, reinstall the extension.<br />
        </div>
      </div>
    );
  }
}

export default EnableLocalStorage;
