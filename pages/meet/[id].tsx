import React, { useEffect, useRef, useState } from "react";
import {
  useLobby,
  useAudio,
  useVideo,
  useHuddle01,
  usePeers,
} from "@huddle01/react/hooks";
import { useRouter } from "next/router";
// import { Audio, Video } from "@huddle01/react/components";
// import { Button } from "@/components";
import { useEventListener } from "@huddle01/react";
import { HuddleIframe, useEventListner } from "@huddle01/iframe";
// JavaScript | TypeScript
import { iframeApi } from "@huddle01/iframe";
import { Navbar } from "@/components";
import { useContractContext } from "@/context/ContractProvider";

const VideoCall = () => {
  const router = useRouter();
  const { id } = router.query;
  const [roomId, setRoomId] = useState("");

  // const { peerIds } = usePeers();
  // const { joinLobby } = useLobby();
  // const {
  //   fetchAudioStream,
  //   stopAudioStream,
  //   error: micError,
  //   stream: audioStream,
  // } = useAudio();
  // const {
  //   fetchVideoStream,
  //   stopVideoStream,
  //   error,
  //   stream: videoStream,
  // } = useVideo();

  const updateString = (newValue: string | string[] | undefined) => {
    if (typeof newValue === "string") {
      setRoomId(newValue);
    }
  };

 

  const { initialize, isInitialized } = useHuddle01();
  // const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // its preferable to use env vars to store projectId
    initialize("L-UtmOW84pscUfMWmRGCk2-dwngKPaoK");
    console.log(id);
    updateString(id);
  }, []);

  //   const startVideo = () => {
  //     if (isInitialized) {
  //       fetchVideoStream();
  //     }
  //   };

  useEventListner("lobby:initialized", () => {
    iframeApi.initialize({
      redirectUrlOnLeave:
        "https://tradeverse-particle.vercel.app/dashboard/feed",
      wallets: ["metamask"],
      background:
        "https://gateway.pinata.cloud/ipfs/QmWCec9nWPf7KnaBGeaWtVoPT8dBEXSWXjLhhb47RTfPUD?_gl=1*1rqjpoc*rs_ga*NzczNDkyOTU3LjE2ODc0NzY0MjE.*rs_ga_5RMPXG14TE*MTY4NzQ3NjQyMC4xLjEuMTY4NzQ3NjcyOC43LjAuMA..",
      gradientAndMesh: false,
    });
  });

  const { startStream } = useContractContext();

  useEventListner("room:joined", (data) => {
    startStream(roomId);
    console.log(roomId)
  });

  //   useEventListener("lobby:joined", () => {
  //     console.log("lobby:joined");
  //     fetchVideoStream();
  //     fetchAudioStream();
  // });

  // useEventListener("lobby:cam-on", () => {
  //     if (videoStream && videoRef.current) videoRef.current.srcObject = videoStream;
  // });

  //alert(fetchAudioStream.isCallable)
  return (
    <div className="">
      <HuddleIframe
        roomUrl={`https://iframe.huddle01.com/${id}`}
        className="w-full aspect-video h-[960px] mt-[12px]"
      />
      <div className="fixed top-0 w-full">
        <Navbar />
      </div>
    </div>
  );
};

export default VideoCall;
