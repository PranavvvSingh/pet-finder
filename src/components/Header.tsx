// import { MdOutlinePets as Logo } from "react-icons/md";
import { FaPaw as Logo} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../features/favorites";
import { RootState } from "../app/store";
import supabase from "../config/supabaseClient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Header = () => {
  const userId = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignOut() {
    console.log("button clicked");
    try {
      const { error } = await supabase.auth.signOut();
      console.log("signed out in header");
      console.log(error);
      dispatch(set([]));
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  }

  return (
    <div className="h-[60px] sticky top-0 z-50 flex flex-row justify-between px-2 md:px-8 py-1 bg-yellow-500">
      <NavLink
        to="/"
        className="text-xl md:text-2xl flex gap-1 items-center heading"
      >
        <Logo className="" />
        PetFinder
      </NavLink>
      <div className="flex gap-1 md:gap-3 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            "px-2 py-1 rounded-lg hover:ring-black text-sm md:text-base subheading" +
            (isActive ? " bg-black/[0.2] " : "")
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            "px-2 py-1 rounded-lg hover:ring-black text-sm md:text-base subheading" +
            (isActive ? " bg-black/[0.2] " : "")
          }
        >
          Favorites
        </NavLink>
        {userId ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <p className="cursor-pointer px-2 py-1 rounded-lg text-sm md:text-base subheading">
                Logout
              </p>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-2 border-amber-400">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-[20px]">
                  Confirm Logout
                </AlertDialogTitle>
                <AlertDialogDescription className="text-[15px]">
                  Are you sure you want to logout?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleSignOut}
                  className="bg-amber-400 hover:bg-amber-500 text-neutral-800"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              "px-2 py-1 rounded-lg  hover:ring-black text-sm md:text-base subheading" +
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
