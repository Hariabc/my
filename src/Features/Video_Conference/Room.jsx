// Room.jsx

import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import "./Room.css";

const Room = () => {
  const { roomID } = useParams();
  const meetingRef = useRef();

  useEffect(() => {
    const meeting = async () => {
      const appID = 326790568;
      const serverSecret = "ad581563225a754f4e531ef7ae18ff1b";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        Date.now().toString(),
        "Name"
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: meetingRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
    };

    meeting();
  }, [roomID]);

  return <div ref={meetingRef} className="meeting-container"></div>;
};

export default Room;
