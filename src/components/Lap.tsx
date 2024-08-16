import formattedSeconds from "../utils/timeFormatter";

//For props, I added this interface, so if any props is added in future we can add it here. the code is cleaner, too.
interface Props {
  index: number;
  lap: number;
  onDelete: () => void;
}

const Lap = ({ index, lap, onDelete }:Props) => (
  <div key={index} className="stopwatch-lap">
    <strong>{index}</strong>/ {formattedSeconds(lap)}{" "}
    <button onClick={onDelete}> X </button>
  </div>
);
export default Lap;