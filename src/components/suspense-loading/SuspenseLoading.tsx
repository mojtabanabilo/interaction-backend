import spinner from "../../assets/Rolling-1s-197px.svg";

export default function Suspense() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img src={spinner} alt="loading..." />
    </div>
  );
}
