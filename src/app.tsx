import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { object } from "prop-types";
interface State {
  endpoint: string;
  logs: [];
}

interface Props {
  title: string;
}

class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      endpoint: "http://localhost:5000"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("perf", (data) => {
      this.setState((prevState, {}) =>({ logs: [...prevState.logs, data }));
      console.log(this.state.logs);
    });
  }


  render() {
    const { logs } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {logs.reverse().map(log => (
          <h5>{log.page.url} <b>{log.page.userAgent}</b></h5>
        ))}
      </div>
    );
  }
}

export default App;
