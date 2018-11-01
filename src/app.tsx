import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Wrapper, Header, Log, FingerPrint } from "./ui";

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
    socket.on("log", data => {
      this.setState((prevState, {}) => ({ logs: [data, ...prevState.logs] }));
      console.log(this.state.logs);
    });
  }

  renderPerf(perf) {
    return (
      <>
        <p>
          <b>Network: Redirect time:</b> {perf.redirectEnd - perf.redirectStart}
          <em>ms</em>
        </p>
        <p>
          <b>Network: Domain lookup:</b>{" "}
          {perf.domainLookupEnd - perf.domainLookupStart}
          <em>ms</em>
        </p>
        <p>
          <b>Network: Total first bite time:</b>
          {perf.responseStart - perf.navigationStart}
        </p>
        <p>
          <b>Network: Latency:</b>
          {perf.responseStart - perf.fetchStart}
        </p>
        <p>
          <b>Network: Connect:</b> {perf.connectEnd - perf.connectStart}
          <em>ms</em>
        </p>

        <p>
          <b>{`Server: response time:${perf.responseEnd -
            perf.requestStart}`}</b>
          <em>ms</em>
        </p>
        <p>
          <b>Browser: Page load time:</b>{" "}
          {perf.loadEventEnd - perf.navigationStart}
          <em>ms</em>
        </p>
        <p>
          <b>Browser: DOM content loaded:</b>{" "}
          {perf.domContentLoadedEventEnd - perf.navigationStart}
          <em>ms</em>
        </p>
        <p>
          <b>Browser: Time to interactive:</b>{" "}
          {perf.domInteractive - perf.domLoading}
          <em>ms</em>
        </p>
      </>
    );
  }

  render() {
    const { logs } = this.state;
    const size = logs.length;
    return (
      <Wrapper>
        <Header>
          <FingerPrint margin="0 10px 0 0" color="#00BCD4" />
          <h1>Performance Footprint</h1>
        </Header>
        {logs.map((log, index) => (
          <Log key={index}>
            <p>
              <a href={log.page.url} target="preview">
                {log.page.url}
              </a>
              <em>{log.page.userAgent}</em>
            </p>

            <div>{log.perf && this.renderPerf(log.perf)}</div>
          </Log>
        ))}
      </Wrapper>
    );
  }
}

export default App;
