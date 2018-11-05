import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Wrapper, Header, Log, FingerPrint, ErrorBlock, PerfBlock } from "./ui";

interface State {
  endpoint: string;
  logs: [Log?];
  error?: JSError;
}

interface Props {
  title: string;
}

interface Log {
  page?: Page;
  perf?: {
    connectEnd?: number;
    connectStart?: number;
    domComplete?: number;
    domContentLoadedEventEnd?: number;
    domContentLoadedEventStart?: number;
    domInteractive?: number;
    domLoading?: number;
    domainLookupEnd?: number;
    domainLookupStart?: number;
    fetchStart?: number;
    loadEventEnd?: number;
    loadEventStart?: number;
    navigationStart?: number;
    redirectEnd?: number;
    redirectStart?: number;
    requestStart?: number;
    responseEnd?: number;
    responseStart?: number;
    secureConnectionStart?: number;
    unloadEventEnd?: number;
    unloadEventStart?: number;
  };
  type?: string;
}

interface Page {
  device?: string;
  historyState?: string;
  readySate?: string;
  referrer?: string;
  url?: string;
  userAgent?: string;
}

interface JSError {
  colno?: number;
  filename?: string;
  lineno?: number;
  message?: string;
  stack?: any;
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

    socket.on("log", (data: Log) => {
      console.log("data: ", data);
      this.setState((prevState, {}) => {
        return {
          logs: [data, ...prevState.logs]
        };
      });
      console.log("state: ", this.state);
    });
  }

  renderPerf(data) {
    const { error, perf } = data;
    return (
      <PerfBlock>
        <p>
          <b>Browser: Page load time:</b>{" "}
          {perf.loadEventEnd - perf.navigationStart}
          <em>ms</em>
        </p>
        <p>
          <b>Browser: Time to interactive:</b>{" "}
          {perf.domInteractive - perf.domLoading}
          <em>ms</em>
        </p>
        <p>
          <b>Browser: DOM content loaded:</b>{" "}
          {perf.domContentLoadedEventEnd - perf.navigationStart}
          <em>ms</em>
        </p>

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

        {error && this.renderError(error)}
      </PerfBlock>
    );
  }

  renderError(data) {
    return (
      <ErrorBlock>
        <p>
          <b>Message: </b>
          {data.message}
        </p>
        <p>
          <b>File name: </b>
          {data.filename}
        </p>
        <p>
          <b>Line number: </b>
          {data.lineno}
        </p>
        <p>
          <b>Col number: </b>
          {data.colno}
        </p>
      </ErrorBlock>
    );
  }

  render() {
    const { logs } = this.state;
    const size = logs.length;
    return (
      <Wrapper>
        <Header>
          <FingerPrint margin="0 10px 0 0" color="#00BCD4" />
          <h1>Page Fingerprint</h1>
        </Header>
        {logs.map((log, index) => (
          <Log key={index}>
            <p>
              <a href={log.page.url} target="preview">
                {log.page.url}
              </a>
              <em>{log.page.userAgent}</em>
            </p>

            <div>{log.perf && this.renderPerf(log)}</div>
          </Log>
        ))}
      </Wrapper>
    );
  }
}

export default App;
