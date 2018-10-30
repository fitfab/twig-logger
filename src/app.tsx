import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Wrapper, Header, Log } from "./ui";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

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

  render() {
    const { logs } = this.state;
    const size = logs.length;
    return (
      <Wrapper>
        <Header>
          <h1>D</h1>
          <b>a</b>
          <span>rt – Live Performance</span>
        </Header>
        {logs.map((log, index) => (
          <Log key={index}>
            <div>
              <p>
                <a href={log.page.url} target="preview">
                  {log.page.url}
                </a>
              </p>
              <em>{log.page.userAgent}</em>{" "}
              <p>
                <b>Page load:</b>{" "}
                {(log.perf.loadEventEnd - log.perf.navigationStart) / 1000}
                {"s"}
              </p>
            </div>
            <LineChart
              width={600}
              height={200}
              data={[log.perf]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="requestStart" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="requestStart"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="responseEnd" stroke="#82ca9d" />
            </LineChart>
          </Log>
        ))}
      </Wrapper>
    );
  }
}

export default App;
