import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { Shake, ShakeEvent } from "@/utils/shake";
import DeviceMotion from "./DeviceMotion";

const shake = new Shake({ threshold: 15, timeout: 1000 });

export interface ShakeProps {
  onShake?: () => void;
}

const ShakeComponent = ({ onShake }: ShakeProps) => {
  const [approvedShake, setApprovedShake] = useState(false);
  const [accel, setAccel] = useState(false);

  const handleShakeEvent = (event: ShakeEvent) => {
    // console.log("Shake!", event.detail.timeStamp, event.detail.acceleration);
    onShake && onShake();
  };

  const handleDeviceMotion = (event: DeviceMotionEvent): void => {
    setAccel(!accel);
  };

  useEffect(() => {
    window.addEventListener("devicemotion", handleDeviceMotion);

    return () => {
      window.removeEventListener("devicemotion", handleDeviceMotion);
    };
  }, []);

  return (
    <div>
      {!approvedShake && (
        <Button
          onClick={async () => {
            const approved = await shake.approve();
            setApprovedShake(approved);
          }}
        >
          Enable Shake
        </Button>
      )}
      <DeviceMotion>
        {({
          acceleration,
          accelerationIncludingGravity,
          interval,
          rotationRate
        }) => (
          <div>
            {`Acceleration: ${JSON.stringify(acceleration)}`}
            {`Acceleration including gravity: ${JSON.stringify(
              accelerationIncludingGravity
            )}`}
            {`Interval: ${interval}`}
            {`Rotation rate: ${JSON.stringify(rotationRate)}`}
          </div>
        )}
      </DeviceMotion>
    </div>
  );
};

export default ShakeComponent;
