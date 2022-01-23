import "../scss/Title.scss";
import video1 from "../assets/test.mp4";
export default function UploadDone(video) {
  return (
    <div>
      <video width="400" controls>
        <source src={video1} type="video/mp4" />
        Your browser does not support HTML video.
      </video>
    </div>
  );
}
