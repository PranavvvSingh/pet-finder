import Card from "./Card";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Saved = () => {
  const favorites = useSelector((state: RootState) => state.favorites.collection);
  const session = useSelector((state: RootState) => state.auth.user);
  const name = session?.user.user_metadata.name;
  return (
    <>
      <p className="text-center text-neutral-500 mt-10">
        Welcome {name}. Showing {favorites.length} Results
      </p>
      <div className="flex flex-wrap p-7 gap-8 justify-center">
        {favorites?.map((pet) => {
          return (
            <Card
              key={pet.id}
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

export default Saved;
