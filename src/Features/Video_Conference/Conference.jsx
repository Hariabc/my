import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Conference = () => {
  const { meetingId } = useParams();
  const meetingRef = useRef(null);

  useEffect(() => {
    const joinConference = async () => {
      const appID = 326790568;
      const serverSecret = "ad581563225a754f4e531ef7ae18ff1b";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        meetingId,
        Date.now().toString(),
        "V"
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: meetingRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
    };

    joinConference();

    // Clean up Zego resources when the component unmounts
    return () => {
      
      // No need for explicit cleanup if not using getInstance or logoutRoom
    };
  }, [meetingId]);

  return (
    <div>
      <div>
        <h2>Video Conference Room</h2>
        {/* You can add more UI elements or information about the conference */}
      </div>
      <div ref={meetingRef} style={{ width: "100vw", height: "100vh" }}></div>
      <div>
        {/* Adjust the 'to' attribute with the correct path */}
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default Conference;
