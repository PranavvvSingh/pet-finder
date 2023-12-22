import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  setSelectedType,
  setSelectedPrice,
  setSelectedSort,
} from "../features/filters";
import { setSearchText } from "../features/filters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filters = () => {
  const dispatch = useDispatch();

  const { selectedType, selectedPrice, selectedSort } = useSelector(
    (state: RootState) => state.filter
  );
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
      <div className="grid grid-cols-2 px-3  sm:flex flex-row flex-wrap items-center justify-center  gap-3 sm:gap-8">
        <div className="flex items-center">
          <label className="mr-1">Type:</label>
          <Select
            value={selectedType}
            onValueChange={(val) => dispatch(setSelectedType(val))}
          >
            <SelectTrigger className=" md:w-[150px] focus:ring-amber-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="focus-within:ring-1 ring-yellow-400 ring-inset">
              {typeRanges.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex  items-center">
          <label className="mr-1">Price:</label>
          <Select
            value={selectedPrice}
            onValueChange={(val) => dispatch(setSelectedPrice(val))}
          >
            <SelectTrigger className="md:w-[150px] focus:ring-amber-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="focus-within:ring-1 ring-yellow-400 ring-inset">
              {priceRanges.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center">
          <label className="mr-1">Sort:</label>
          <Select
            value={selectedSort}
            onValueChange={(val) => dispatch(setSelectedSort(val))}
          >
            <SelectTrigger className="md:w-[180px] focus:ring-amber-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="focus-within:ring-1 ring-yellow-400 ring-inset">
              {sortRanges.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          className="text-neutral-400 rounded-full hover:shadow-lg p-2 text-center border"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>
      {/* <p className="text-center text-neutral-500">
        Showing {pets.length} Results
      </p> */}
    </>
  );
};

export default Filters;
