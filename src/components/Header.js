import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../redux/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constant";
import { toggleAiSearchView } from "../redux/gptSlice";
import { changeLanguage } from "../redux/configSlice";
import lang from "../utils/languageConstant";
// import logo from "../../public/logo.png"
import logo from "../utils/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const langKey = useSelector((store) => store.config.lang);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const user = useSelector((store) => store.user);
  const gptShowSearch = useSelector((store) => store.gpt.showAiSearch);

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

  const handleAiSearch = () => {
    dispatch(toggleAiSearchView());
  };

  const handleLanguageChange = (lang) => {
    dispatch(changeLanguage(lang));
  };
  const handleItemClick = (lang) => {
    handleLanguageChange(lang);
    setIsOpen(false);
  };
  return (
    <div className="absolute w-screen px-4 py-0 bg-gradient-to-b from-black z-20 flex  flex-col md:flex-row justify-between ">
      {/* <div className="flex-shrink-0"> */}
      <img
        className="w-28 sm:w-32 md:w-40 lg:w-48 xl:w-64 mx-auto md:mx-0 md:mt-[-2%]"
        src={logo}
        alt="logo"
      />
      {user && (
        <div className="flex justify-between items-center  p-2  space-x-4 mt-[-2%]">
          {gptShowSearch && (
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                onClick={toggleDropdown}
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-red-500  text-white text-xs md:text-lg hover:bg-opacity-50 "
              >
                {lang[langKey].selectBtn}
              </div>
              {isOpen && (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow bg-base-200"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <li key={lang.identifier}>
                      <button
                        className=" block px-2 py-2 hover:bg-black-400"
                        onClick={() => handleItemClick(lang.identifier)}
                      >
                        {lang.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <button
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-red-500  text-white text-xs md:text-lg hover:bg-opacity-50"
            onClick={handleAiSearch}
          >
            {gptShowSearch ? lang[langKey].homeBtn : "Movie-Search"}
          </button>

          <button
            onClick={handleSignOut}
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-red-500  text-white text-xs md:text-lg hover:bg-opacity-50"
          >
            {lang[langKey].signBtn}
          </button>
          <img
            className="  w-10 h-10 md:w-16 md:h-16 p-2 "
            alt="usericon"
            src={user?.photoURL}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
