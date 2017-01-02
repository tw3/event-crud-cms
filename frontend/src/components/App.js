import React from "react";
import { connect } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import Menu from "./common/Menu";
import "../stylesheets/main.scss";

// App component
export class App extends React.Component {
  // pre-render logic
  componentWillMount() {
    // the first time we load the app, we need that events list
    this.props.dispatch({type: 'EVENTS_FETCH_LIST'});
  }

  // render
  render() {
    // show the loading state while we wait for the app to load
    const {scheduledEvents, children} = this.props;
    if (!scheduledEvents.length) {
      return (
        <ProgressBar active now={100} />
      );
    }

    // render
    return (
      <div className="container">
        <div>
          <Menu />
        </div>
        <div>
          {children}
        </div>
        <div className="footer">
          <img src="/media/logo.svg" />
          <span>
						Events CRUD CMS
          </span>
        </div>
      </div>
    );
  }
}

// export the connected class
function mapStateToProps(state) {
  return {
    scheduledEvents: state.scheduledEvents || [],
  };
}
export default connect(mapStateToProps)(App);
