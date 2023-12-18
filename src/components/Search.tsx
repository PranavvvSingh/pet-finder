import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import { setSearchText } from "../features/filters";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect, useRef} from "react";

const Search = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((state: RootState) => state.filter);

  const searchRef: React.LegacyRef<HTMLInputElement>|null = useRef(null);
  useEffect(() => {
    if(searchRef.current) searchRef.current.value=searchText
  }, [searchText]);

  return (
    <div className="flex justify-center p-10">
      <form
        className="flex border-4 focus-within:ring-2 ring-inset ring-yellow-500 justify-between w-[300px] md:w-[400px] px-4 py-2 gap-2 rounded-full"
        onSubmit={(event) => {
          event.preventDefault();
          if(searchRef.current) dispatch(setSearchText(searchRef.current.value));
          console.log("submitted");
        }}
      >
        <input
          className="outline-none ps-2 bg-inherit text-black w-full"
          type="search"
          placeholder="Search..."
          ref={searchRef}
          spellCheck="true"
          required
        />
        <SearchIcon className="text-3xl" />
      </form>
    </div>
  );
};

export default Search;
