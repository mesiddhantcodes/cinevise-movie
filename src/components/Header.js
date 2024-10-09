import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../redux/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constant";
import { toggleGptSearchView } from "../redux/gptSlice";
import { changeLanguage } from "../redux/configSlice";
// import logo from "../../public/logo.png"
import logo from "../utils/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const gptShowSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, [dispatch, navigate]);

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-50 flex  flex-col md:flex-row justify-between ">
      {/* <div className="flex-shrink-0"> */}
      <img
        className="w-28 sm:w-32 md:w-40 lg:w-48 xl:w-56 mx-auto md:mx-0 md:mt-[-2%]"
        src={logo}
        alt="logo"
      />
      {/*  w-48 md:w-38 mx-auto md:mx-0  md:mt-[-2%]*/}
      {user && (
        <div className="flex justify-between items-center  p-2  space-x-4 mt-[-2%]">
          {gptShowSearch && (
            <select
              className="p-2 m-2 bg-gray-700 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-1 px-2 mr-10 md:mr-0 md:py-2 md:px-4  text-xs md:text-lg  bg-purple-600 text-white rounded-md"
            onClick={handleGptSearch}
          >
            {gptShowSearch ? "Home Page" : "GPT-Search"}
          </button>
          <img
            className="hidden md:block w-16 h-16 p-2 "
            alt="usericon"
            src={user?.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="py-1 px-2 mr-10 md:mr-0 md:py-2 md:px-4  text-xs md:text-lg  bg-red-600 text-white  rounded-lg"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
