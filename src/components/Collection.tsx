import { useEffect } from "react";
import Card from "./Card";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import supabase, { fetchFavorites } from "../config/supabaseClient";
import { set } from "../features/favorites";
import { setPets } from "../features/filters";
import Filters from "./Filters";

const Collection = () => {
  const dispatch = useDispatch();

  const { pets, searchText, selectedType, selectedPrice, selectedSort } =
    useSelector((state: RootState) => state.filter);

  const session = useSelector((state: RootState) => state.auth.user);
  const user_email = session?.user.email;

  useEffect(() => {
    async function fetchFav() {
      if (user_email) {
        const fav = await fetchFavorites(user_email!);
        dispatch(set(fav));
      }
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
      if (data) dispatch(setPets(data));
      if (error) console.log("ERROR");
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPrice, selectedSort, selectedType, searchText]);

  return (
    <>
      <Search />
      <Filters />
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
