import { MdOutlinePets as Logo } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
// import { logout } from "../features/auth";
import { set } from "../features/favorites";
import { RootState } from "../app/store";
import supabase from "../config/supabaseClient";

const Header = () => {
  const userId = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignOut() {
    console.log("button clicked")
    try {
      const{error}=await supabase.auth.signOut();
      console.log("signed out in header");
      console.log(error)
      // dispatch(logout());
      dispatch(set([]));
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  }

  return (
    <div className="h-[60px] sticky top-0 z-10 flex flex-row justify-between px-2 md:px-8 py-1 bg-yellow-500">
      <NavLink
        to="/"
        className="text-xl md:text-2xl flex gap-1 items-center heading"
      >
        <Logo />
        PetFinder
      </NavLink>
      <div className="flex gap-1 md:gap-3 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            "px-2 py-1 rounded-lg hover:ring-black text-sm md:text-base" +
            (isActive ? " bg-black/[0.2] " : "")
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            "px-2 py-1 rounded-lg hover:ring-black text-sm md:text-base" +
            (isActive ? " bg-black/[0.2] " : "")
          }
        >
          Favorites
        </NavLink>
        {userId ? (
          <p
            onClick={handleSignOut}
            className="cursor-pointer px-2 py-1 rounded-lg text-sm md:text-base"
          >
            Logout
          </p>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              "px-2 py-1 rounded-lg  hover:ring-black text-sm md:text-base" +
              (isActive ? " bg-black/[0.2] " : "")
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
