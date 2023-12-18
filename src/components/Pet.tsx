import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRupeeSign as RupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { petType } from "../types/types";
import type { RootState } from "../app/store";
import supabase from "../config/supabaseClient";
import { addToStore, removeFromStore } from "../config/supabaseClient";
import { add, remove } from "../features/favorites";

const Pet = () => {
  const [pet, setPet] = useState<petType>({} as petType);
  const dispatch = useDispatch();
  const { petId } = useParams<{ petId?: string }>();
  const numericPetId = petId ? parseInt(petId, 10) : undefined;
  const session = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    async function fetchPets() {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("id", numericPetId);
      if (data) {
        setPet(data[0]);
      }
      if (error) console.log("ERROR");
    }
    fetchPets();
  }, [numericPetId]);
  const favorites = useSelector(
    (state: RootState) => state.favorites.collection
  );
  const favoriteStatus = favorites.some((item) => item.id === numericPetId);
  async function ToggleFavorite() {
    if (session?.user.email) {
      if (favoriteStatus) {
        removeFromStore(pet.id, session?.user.email);
        dispatch(remove(pet.id));
      } else {
        addToStore(pet.id, session?.user.email);
        console.log(pet);
        dispatch(add(pet));
      }
    }
  }
  return (
    <div className="flex flex-row flex-wrap justify-center items-center mt-[50px] p-5 gap-5">
      <img
        src={pet?.image}
        alt=""
        className="w-[400px] h-[250px] md:w-[550px] md:h-[350px] rounded-lg"
      />
      <div className="flex  flex-col  p-2 h-max gap-5 w-[550px]">
        <h1 className="text-4xl md:text-6xl">{pet?.name}</h1>
        <h5 className="text-neutral-500 text-base md:text-xl">
          {pet?.subtype}
        </h5>
        <div className="text-xl md:text-3xl">
          <RupeeSign className="inline-block" />
          {pet?.price}
        </div>
        <p className="md:text-lg">{pet?.description}</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="bg-amber-400 rounded-xl p-1 md:p-3"
            onClick={ToggleFavorite}
          >
            {favoriteStatus ? "Remove from Favorites" : "Add To Favorites"}
          </button>
          <button className="bg-amber-400 rounded-xl p-1 md:p-3">
            Inquire
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pet;
