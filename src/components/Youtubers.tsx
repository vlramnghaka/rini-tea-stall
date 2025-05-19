import { useState, useEffect, Suspense } from "react";
import Loading from './Loading.tsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

type YoutubeDataType = {
  embedId:string;
  channelUrl:string;
  channel:string;
}

const YoutubeEmbed:React.FC<YoutubeDataType> = ({ embedId, channelUrl, channel }) => (
  <div className="video-responsive">
    <iframe
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
    <br />
    Subscribe:{" "}
    <a href={channelUrl} target="_blank" rel="noopener noreferrer">
      {channel}
    </a>
  </div>
);

type importYoutubeDataType = {
  name: string;
  channel: string;
  id: string;
}

const Youtubers = () => {
  const [youtubeData, setYoutubeData] = useState<importYoutubeDataType[]>([]);

  useEffect(() => {
    fetch("/data/youtubersVideo.json") // Fetching JSON from the public folder
      .then((response) => response.json())
      .then((data) => setYoutubeData(data))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  return (
    <>
      <Suspense fallback={<Loading />} >
      {youtubeData.length > 0 ? (
        youtubeData.map((data:importYoutubeDataType, index:number) => (
          <YoutubeEmbed key={index} embedId={data.id} channelUrl={data.channel} channel={data.name} />
        ))
      ) : (
        <FontAwesomeIcon icon={faMugHot} beatFade size="2xl"/>
      )}
      </Suspense>
    </>
  );
};

export default Youtubers;