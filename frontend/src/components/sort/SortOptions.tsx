import { Field } from "../../interfaces/interface";
import "./SortOptions.css"

function SortOptions(props: { sortOptions: Array<Field>, handleSort: (selectedSortBy: string) => void }) {

  const {sortOptions , handleSort} = props;

  return (
    <div className="sort-options">
      {sortOptions.map((option, index) => (
        <button key={index} onClick={() => handleSort(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SortOptions;