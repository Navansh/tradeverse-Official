import React, { useEffect, useRef } from "react";
import {
  useLobby,
  useAudio,
  useVideo,
  useHuddle01,
  usePeers,
} from "@huddle01/react/hooks";
import { useRouter } from "next/router";
import { Audio, Video } from "@huddle01/react/components";
import { Button } from "@/components";
import { useEventListener } from "@huddle01/react";

const VideoCall = () => {
  const router = useRouter();
  const { id } = router.query;

  const { peerIds } = usePeers();
  const { joinLobby } = useLobby();
  const {
    fetchAudioStream,
    stopAudioStream,
    error: micError,
    stream: audioStream,
  } = useAudio();
  const {
    fetchVideoStream,
    stopVideoStream,
    error,
    stream: videoStream,
  } = useVideo();

  const { initialize, isInitialized } = useHuddle01();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // its preferable to use env vars to store projectId
    initialize("L-UtmOW84pscUfMWmRGCk2-dwngKPaoK");
    console.log(id)
  }, []);

  const startVideo = () => {
    if (isInitialized) {
      fetchVideoStream();
    }
  };

  useEventListener("lobby:joined", () => {
    console.log("lobby:joined");
    fetchVideoStream();
    fetchAudioStream();
});

useEventListener("lobby:cam-on", () => {
    if (videoStream && videoRef.current) videoRef.current.srcObject = videoStream;
});


  //alert(fetchAudioStream.isCallable)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-2 items-center gap-12">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-[860px] h-[630px] flex-shrink-0 border-Bar border-2">
          <video ref={videoRef} autoPlay muted></video>
          </div>
          <div className="grid grid-cols-2 items-center">
            <button
              disabled={!fetchVideoStream.isCallable}
              onClick={fetchVideoStream}
            >
              enable camera
            </button>
            <button
              disabled={!fetchAudioStream?.isCallable}
              onClick={startVideo}
            >
              enable mic
            </button>
          </div>
        </div>

        <div
          onClick={() => joinLobby(`${id}`)}
          className="flex flex-col items-center space-y-6"
        >
          <h1>Ready to join?</h1>
          <Button title="Join Room" isFunc />
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
