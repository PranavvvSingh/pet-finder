import { FaRupeeSign as RupeeSign } from "react-icons/fa";
import { MdFavoriteBorder as FavoriteBorder } from "react-icons/md";
import { MdFavorite as Favorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../features/favorites";
import { RootState } from "../app/store";
import { partialPetsType } from "../types/types";
import { addToStore, removeFromStore } from "../config/supabaseClient";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const Card = ({ image, name, price, id }: partialPetsType) => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.collection
  );
  const session = useSelector((state: RootState) => state.auth.user);
  const email = session?.user.email;
  const { toast } = useToast();

  const favoriteStatus = favorites.some((item) => item.id === id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function ToggleFavorite() {
    if (!email) {
      console.log("not logged in");
      navigate("/login");
      toast({
        description: `⚠️ You're not logged in`,
      });
    } else {
      if (favoriteStatus) {
        removeFromStore(id, email);
        dispatch(remove(id));
        toast({
          description: `✅ Removed from Favorites`,
        });
      } else {
        addToStore(id, email);
        dispatch(add({ id, name, price, image }));
        toast({
          description: `✅ Added to Favorites`,
        });
      }
    }
  }
  return (
    <motion.div
      className="overflow-hidden rounded-lg bg-[#FAF9F6] shadow-1 duration-300 border border-amber-400 hover:ring-2 hover:ring-yellow-400 cursor-pointer"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <img
        src={image}
        alt=""
        className="w-[300px] aspect-[16/10] object-cover"
        onClick={() => {
          navigate("/pet/" + id);
        }}
      />
      <div className="p-2 text-center">
        <h3
          className="mb-2 block text-xl font-semibold text-neutral-800"
          onClick={() => {
            navigate("pet/" + id);
          }}
        >
          {name}
        </h3>
        <div className="flex justify-between items-center p-1">
          <div className="flex items-center text-lg">
            <RupeeSign className="inline-block" />
            <p>{price}</p>
          </div>
          {favoriteStatus ? (
              <Favorite
                className="text-2xl text-amber-400"
                onClick={ToggleFavorite}
              />
          ) : (
            <FavoriteBorder
              className="text-2xl hover:text-amber-400"
              onClick={ToggleFavorite}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
