import React, { Component } from "react";

type State = Pick<
  DeviceMotionEvent,
  "acceleration" | "accelerationIncludingGravity" | "interval" | "rotationRate"
>;

class DeviceMotion extends Component<
  { children: (state: State) => React.ReactNode },
  State
> {
  state = {
    acceleration: {
      x: 0,
      y: 0,
      z: 0
    },
    accelerationIncludingGravity: {
      x: 0,
      y: 0,
      z: 0
    },
    interval: 0,
    rotationRate: {
      alpha: 0,
      beta: 0,
      gamma: 0
    }
  };

  handleDeviceMotion = (event: DeviceMotionEvent) => {
    const {
      acceleration,
      accelerationIncludingGravity,
      interval,
      rotationRate
    } = event;

    this.setState({
      acceleration,
      accelerationIncludingGravity,
      interval,
      rotationRate
    });
  };

  componentDidMount() {
    window.addEventListener("devicemotion", this.handleDeviceMotion, true);
  }

  componentWillUnmount() {
    window.removeEventListener("devicemotion", this.handleDeviceMotion, true);
  }

  render() {
    return this.props.children(this.state);
  }
}

export default DeviceMotion;
