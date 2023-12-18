import { useEffect } from "react";
import Card from "./Card";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedType,
  setSelectedPrice,
  setSelectedSort,
  setPets,
} from "../features/filters";
import { setSearchText } from "../features/filters";
import { RootState } from "../app/store";
import supabase, { fetchFavorites } from "../config/supabaseClient";
import { set } from "../features/favorites";
// import { partialPetsType } from "../types/types";

const Collection = () => {
  const dispatch = useDispatch();
  const { pets, searchText, selectedType, selectedPrice, selectedSort } =
    useSelector((state: RootState) => state.filter);

  const session = useSelector((state: RootState) => state.auth.user);
  const user_email = session?.user.email;

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

  useEffect(() => {
    async function fetchFav() {
      if(user_email){
        const fav = await fetchFavorites(user_email!);
        dispatch(set(fav));
      }
      // else{
      //   console.log("user_email is undefined or null");
      // }
    }
    fetchFav();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_email]);

  useEffect(() => {
    const fetchData = async () => {
      let query = supabase.from("pets").select("*");
      if (selectedType !== "All") query = query.eq("type", selectedType);
      if (selectedPrice !== "All") {
        if (selectedPrice === "30000+") query = query.gte("price", 30000);
        else {
          query = query.lte("price", parseInt(selectedPrice.split("-")[1]));
          query = query.gte("price", parseInt(selectedPrice.split("-")[0]));
        }
      }
      if (selectedSort === "Price: Low to High")
        query = query.order("price", { ascending: true });
      if (selectedSort === "Price: High to Low")
        query = query.order("price", { ascending: false });
      if (searchText !== "") {
        query = query.textSearch("description", searchText, {
          type: "websearch",
          config: "english",
        });
      }
      const { data, error } = await query;
      if (data) {
        dispatch(setPets(data));
      }
      if (error) console.log("ERROR");
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPrice, selectedSort, selectedType, searchText]);

  return (
    <>
      <Search />
      <div className="flex flex-row flex-wrap items-center justify-center gap-5 md:gap-8 mb-5">
        <div className="flex flex-wrap items-center">
          <label className="mr-1">Type:</label>
          <div className="border p-1 rounded-lg focus-within:ring ring-yellow-400">
            <select
              value={selectedType}
              onChange={(e) => dispatch(setSelectedType(e.target.value))}
              className="rounded-lg p-1 outline-none text-center "
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
      <div className="flex flex-wrap p-7 gap-8 justify-center">
        {pets.map((pet) => {
          return (
            <Card
              key={crypto.randomUUID()}
              id={pet.id}
              name={pet.name}
              price={pet.price}
              image={pet.image}
            />
          );
        })}
      </div>
    </>
  );
};

export default Collection;
