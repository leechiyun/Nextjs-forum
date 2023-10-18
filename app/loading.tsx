import loadingImage from "../public/loading.gif";

export default function Loading() {
  return (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
