import React from "react";
import "./chat.css"
import { useState,useEffect } from "react";
import { App as SendbirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import axios from 'axios';
export default function Chat() {    
    // const APP_ID = "EAD127B3-C2FC-47A7-B744-D1F2DE076DB5";
   const APP_ID="049FF9C5-DFDC-4991-B147-D2FDFDC72C54";
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/client/user', { withCredentials: true });
            setUserData(response.data.user);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);
      
return (
    <div className="App" style={{
        height:"85vh"
    }}>
        <SendbirdApp appId={APP_ID} userId={userData.username} />
    </div>
);
}


// import React from 'react';
// import {
//   Chat,
//   Channel,
//   ChannelHeader,
//   MessageList,
//   MessageInput,
//   Thread,
//   Window,
//   StreamChat,
// } from 'stream-chat-react';

// const Apps = () => {
//   const [client, setClient] = React.useState(null);
//   const [channel, setChannel] = React.useState(null);

//   React.useEffect(() => {
//     const init = async () => {
//       const apiKey = "1278402";
//       const client = new Chat(apiKey);
//       const user = { id: 'your_user_id' };
//       const token = await client.devToken(user.id);
//       await client.connectUser(user, token);
//       const channel = client.channel('messaging', 'react-talk', {
//         members: [user],
//       });
//       await channel.watch();
//       setClient(client);
//       setChannel(channel);
//     };
//     init();
//   }, []);

//   if (!client || !channel) {
//     return <LoadingIndicator />;
//   }

//   return (
//     <StreamChat client={client}>
//       <Channel channel={channel}>
//         <Window>
//           <ChannelHeader />
//           <MessageList />
//           <MessageInput />
//         </Window>
//         <Thread />
//       </Channel>
//     </StreamChat>
//   );
// };

// export default Apps;
