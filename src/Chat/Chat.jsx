import React from "react";
import { App as SendbirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
export default function Apps() {    
    const APP_ID = "EAD127B3-C2FC-47A7-B744-D1F2DE076DB5";
	const USER_ID = "prasad";
return (
    <div className="App" style={{
        height:"100vh"
    }}>
        <h1>Hello CodeSandbox</h1>
        <SendbirdApp appId={APP_ID} userId={USER_ID} />
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
