import { CiSearch } from "react-icons/ci";
const Search = () => {
  return (
    <div>
      <input type="text" />
      <select>
        <option>Filter By Region</option>
        <option value="someOption">Africa</option>
        <option value="otherOption">America</option>
        <option value="otherOption">Europe</option>
        <option value="otherOption">America</option>
        <option value="otherOption">Oceania</option>
      </select>
    </div>
  );
};

export default Search;
