import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import { setSearchText } from "../features/filters";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Search = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((state: RootState) => state.filter);
  const [text, setText] = useState(searchText);

  // useEffect(() => {
  //   setText(searchText);
  // }, [searchText]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
    if(e.target.value=="") dispatch(setSearchText(""));
  }

  return (
    <div className="flex justify-center p-10">
      <form
        className="flex group border-4 focus-within:ring-2 ring-inset ring-yellow-500 justify-between w-[300px] md:w-[400px] px-4 py-2 gap-2 rounded-full"
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(setSearchText(text));
        }}
      >
        <input
          className="outline-none ps-2 bg-inherit text-black w-full"
          type="search"
          placeholder="Search..."
          value={text}
          onChange={(e) => handleChange(e)}
          spellCheck="false"
          required
        />
        {text.length > 0 ? (
          <RxCross2
            className="text-3xl text-neutral-500 group-focus-within:text-amber-500 cursor-pointer"
            onClick={() => {setText("");dispatch(setSearchText(""));}}
          />
        ) : (
          <SearchIcon className="text-3xl text-neutral-500 group-focus-within:text-amber-500" />
        )}
      </form>
    </div>
  );
};

export default Search;
