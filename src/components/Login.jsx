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
        className=" text-white w-10/12 sm:w-8/12 md:w-5/12 lg:w-4/12  xl:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 rounded-lg bg-opacity-80"
      >
        {/*   text-white w-11/12 sm:w-8/12 md:w-5/12 lg:w-4/12 xl:w-3/12
    absolute p-8 sm:p-10 md:p-12 
    bg-black my-16 sm:my-20 md:my-24 lg:my-32 xl:my-36
    mx-auto left-0 right-0 
    rounded-lg bg-opacity-80 */}
        <h1 className="font-bold text-2xl md:text-4xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <input
          ref={email}
          type="text"
          placeholder="Email Address or Phone"
          className="p-4 my-4 w-full bg-gray-700"
        />
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4  w-full bg-gray-700"
          />
        )}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className="text-red-500">{errorMessage}</p>
        {/* <div className="flex my-4 "> */}
        {isSignInForm ? (
          <>
            <button
              className="p-4 my-4 bg-red-700 w-full"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <button
              className="flex justify-center p-4   bg-red-700 w-full"
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
        ) : (
          <>
            <button
              className="p-4 my-4 bg-red-700 w-full"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>

            <button
              className="flex justify-center p-4   bg-red-700 w-full"
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
