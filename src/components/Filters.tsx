import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setSelectedType,setSelectedPrice, setSelectedSort} from "../features/filters";
import { setSearchText } from "../features/filters";

const Filters = () => {
    const dispatch = useDispatch();
    
    const { pets, selectedType, selectedPrice, selectedSort } =
      useSelector((state: RootState) => state.filter);
  const typeRanges = ["All", "Dog", "Rabbit", "Cat", "Bird", "Fish"];
  const priceRanges = ["All", "0-8000", "8000-15000", "15000-30000", "30000+"];
  const sortRanges = [
    "Recommended",
    "Price: Low to High",
    "Price: High to Low",
  ];

  function handleClearFilters() {
    dispatch(setSelectedType("All"));
    dispatch(setSelectedPrice("All"));
    dispatch(setSelectedSort("Recommended"));
    dispatch(setSearchText(""));
  }
  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-center gap-5 md:gap-8 mb-5">
        <div className="flex flex-wrap items-center">
          <label className="mr-1">Type:</label>
          <div className="border p-1 rounded-lg focus-within:ring ring-yellow-400">
            <select
              value={selectedType}
              onChange={(e) => dispatch(setSelectedType(e.target.value))}
              className="rounded-lg p-1 outline-none text-center"
            >
              {typeRanges.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center">
          <label className="mr-1">Price:</label>
          <div className="border p-1 rounded-lg focus-within:ring ring-yellow-400">
            <select
              value={selectedPrice}
              onChange={(e) => dispatch(setSelectedPrice(e.target.value))}
              className="rounded-lg p-1 outline-none text-center"
            >
              {priceRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center">
          <label className="mr-1">Sort:</label>
          <div className="border p-1 rounded-lg focus-within:ring ring-yellow-400">
            <select
              value={selectedSort}
              onChange={(e) => dispatch(setSelectedSort(e.target.value))}
              className="rounded-lg p-1 outline-none text-center"
            >
              {sortRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="text-neutral-400 rounded-full hover:shadow-lg p-2 text-center border"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>
      <p className="text-center text-neutral-500">
        Showing {pets.length} Results
      </p>
    </>
  );
};

export default Filters;
