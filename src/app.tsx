import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Wrapper, Header, Log } from './ui'
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
    socket.on("log", (data) => {
      this.setState((prevState, {}) =>({ logs: [...prevState.logs, data }));
      console.log(this.state.logs);
    });
  }


  render() {
    const { logs } = this.state;
    return (
      <Wrapper>
        <Header>Dart | </Header>
        {logs.reverse().map((log, index) => (
          <Log key={index}>
            <h4>{log.page.url}</h4> <em>{log.page.userAgent}</em> <b>{log.page.device}</b>
          </Log>
          
        ))}
      </Wrapper>
    );
  }
}

export default App;
