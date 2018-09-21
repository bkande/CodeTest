import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  state = {
    toggle: true
  }

  constructor(props) {
    super(props);
    console.log("Constructor");
  }

  // before component renders, have access to this.props
  componentWillMount() {
    console.log("Will mount");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Welcome text="Welcome to React App" toggle={this.state.toggle} />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.toggle &&
          <p>This should show and hide</p>
        }
        <button onClick = {this.toggle}>Show / Hide</button>
        <Example />
      </div>
    );
  }

  componentDidMount() {
    console.log('mounted');
  }

  toggle = () => {
    this.setState({toggle: !this.state.toggle})
  }

}

class Welcome extends Component {
  render() {
    const {text, toggle} = this.props;
    console.log(toggle);
    return (
      <div>
      <h1 className="App-title">{text}</h1>
      </div>
    );
  }
}

class CountdownClock extends Component {
  constructor(props){
    super(props);
    this.state = {
      time: 0,
      isOn: false,
      start: 0
    }

    this.startTimer = this.startTimer.bind(this)
  }
}


class Example extends React.Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 5 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);
    }
  }

  render() {
    return(
      <div>
        <button onClick={this.startTimer}>Start</button>
        m: {this.state.time.m} s: {this.state.time.s}
      </div>
    );
  }
}



export default App;

