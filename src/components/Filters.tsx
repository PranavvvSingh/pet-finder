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

  const { pets, selectedType, selectedPrice, selectedSort } = useSelector(
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
  // function handleChange(val: string) {
  //   dispatch(setSelectedType(val));
  // }
  // type propTypes = {
  //   label: string;
  //   value: string | undefined;
  //   handleChange: (arg0: string) => void;
  //   placeholder: string;
  //   range: string[];
  // };
  // function SelectComponent({
  //   label,
  //   value,
  //   handleChange,
  //   placeholder,
  //   range,
  // }: propTypes): JSX.Element {
  //   return (
  //     <div className="flex flex-wrap items-center">
  //       <label className="mr-1">{label}</label>
  //       <Select value={value} onValueChange={(val) => handleChange(val)}>
  //         <SelectTrigger className="w-[150px] focus:ring-amber-500">
  //           <SelectValue placeholder={placeholder} />
  //         </SelectTrigger>
  //         <SelectContent className="focus-within:ring-1 ring-yellow-400 ring-inset">
  //           {range.map((type) => (
  //             <SelectItem key={type} value={type}>
  //               {type}
  //             </SelectItem>
  //           ))}
  //         </SelectContent>
  //       </Select>
  //     </div>
  //   );
  // }
  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-center gap-5 md:gap-8 mb-5">
        <div className="flex flex-wrap items-center">
          <label className="mr-1">Type:</label>
          <Select
            value={selectedType}
            onValueChange={(val) => dispatch(setSelectedType(val))}
          >
            <SelectTrigger className="w-[150px] focus:ring-amber-500">
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
        <div className="flex flex-wrap items-center">
          <label className="mr-1">Price:</label>
          <Select
            value={selectedPrice}
            onValueChange={(val) => dispatch(setSelectedPrice(val))}
          >
            <SelectTrigger className="w-[150px] focus:ring-amber-500">
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
        <div className="flex flex-wrap items-center">
          <label className="mr-1">Sort:</label>
          <Select
            value={selectedSort}
            onValueChange={(val) => dispatch(setSelectedSort(val))}
          >
            <SelectTrigger className="w-[150px] focus:ring-amber-500">
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

        {/* <div className="flex flex-wrap items-center">
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
        </div> */}
        {/* <div className="flex items-center">
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
        </div> */}
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
