import './SetSelector.css'

export default function SetSelector({ setArray }) {
  let setOptions = setArray.map((set) => {
    return (
      <option key={set.name} value={JSON.stringify(set)}>
        {set.name}
      </option>
    );
  });
  return <select id="setSelector">{setOptions}</select>;
}