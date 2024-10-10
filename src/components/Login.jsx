import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { BG_URL, PHOTO_URL } from "../utils/constant";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null); // [1
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    // Validate the form data
    if (isSignInForm) {
      const msg = checkValidData(
        null,
        email.current.value,
        password.current.value
      );
      setErrorMessage(msg);
      if (msg === null) {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // console.log(user);
            navigate("/browse");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      }

      // return;
    } else {
      const msg = checkValidData(
        name.current.value,
        email.current.value,
        password.current.value
      );
      setErrorMessage(msg);

      if (msg === null) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value,
              photoURL: `${PHOTO_URL}${email.current.value}`,
            })
              .then(() => {
                const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  })
                );

                navigate("/browse");
              })
              .catch(
                (error) => {
                  setErrorMessage(error.message);
                }
                // console.log(user);
                // ...
              );
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setErrorMessage(errorCode + "-" + errorMessage);
            // ..
          });
      }
    }

    // const msg = checkValidData(name.current.value,email.current.value, password.current.value);
    // setErrorMessage(msg);
    // Sign In or Sign Up
  };
  const handleGoogleLogin = async (e) => {
    // console.log("sdsd");
    const provider = await new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value,
          photoURL: `${PHOTO_URL}${email.current.value}`,
        })
          .then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );

            navigate("/browse");
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrorMessage(errorCode + "-" + errorMessage);
        // ..
      });
  };
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      {/* w-full h-auto object-cover sm:h-[50vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] */}
      <Header />
      <div className="absolute w-full h-full">
        <img
          className="w-full h-screen object-cover 
           "
          //h-screen object-cover md:w-full md:h-auto
          src={BG_URL}
          alt="logo"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className=" text-white w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12  xl:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 rounded-lg bg-opacity-80"
      >
        {/*   text-white w-11/12 sm:w-8/12 md:w-5/12 lg:w-4/12 xl:w-3/12
    absolute p-8 sm:p-10 md:p-12 
    bg-black my-16 sm:my-20 md:my-24 lg:my-32 xl:my-36
    mx-auto left-0 right-0 
    rounded-lg bg-opacity-80 */}
        <h1 className="font-bold text-2xl md:text-4xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <label className="input input-bordered flex items-center gap-2 mb-4 bg-gray-700 rounded-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input ref={email} type="text" className="grow" placeholder="Email" />
        </label>

        {!isSignInForm && (
          <label className="input input-bordered flex items-center gap-2 mb-4 bg-gray-700 rounded-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              ref={name}
              type="text"
              className="grow"
              placeholder="Username"
            />
          </label>
        )}
        <label className="input input-bordered flex items-center gap-2 bg-gray-700 rounded-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            ref={password}
            type="password"
            className="grow"
            placeholder="Password"
          />
        </label>

        <p className="text-red-500">{errorMessage}</p>
        {/* <div className="flex my-4 "> */}
        {isSignInForm ? (
          <>
            <button
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-red-700  text-white text-xs md:text-lg w-full mb-2 mt-4 rounded-none"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <button
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg   text-white text-xs md:text-lg flex justify-center    bg-red-700 w-full rounded-none"
              onClick={handleGoogleLogin}
            >
              <img
                className="  w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 md:mr-2"
                alt="google-icon"
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
              />
              Sign in with Google
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-red-700  text-white text-xs md:text-lg w-full mb-2 mt-4 rounded-none"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>

            <button
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg   text-white text-xs md:text-lg flex justify-center p-4   bg-red-700 w-full rounded-none  "
              onClick={handleGoogleLogin}
            >
              <img
                className="  w-6 h-6 md:mr-2 "
                alt="google-icon"
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
              />
              Sign in with Google
            </button>
          </>
        )}

        {/* </div> */}

        <p className="cursor-pointer pt-2" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
