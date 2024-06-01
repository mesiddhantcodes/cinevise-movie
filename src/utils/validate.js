export const checkValidData = (name, email, password) => {
  // herer i want to validate the sign up form also which contain name, email and password
  // but name is not contain in sign in form so i have to make it optional
  // so i will make it optional by providing default value to it
  // and also i will make it optional by providing default value to it
  // please suggest me how to make it optional
  if (name === null) {
    if (!email || !password) {
      return "All fields are mandatory";
    }
  } else {
    if (!name || !email || !password) {
      return "All fields are mandatory";
    }
  }

  const isNameValid = /^[a-zA-Z]+$/.test(name);
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(
    password
  );
  if (!isEmailValid) {
    return "Invalid Email";
  }
  if (!isNameValid) {
    return "Name should contain only alphabets";
  }
  if (!isPasswordValid) {
    return "Password should be alphanumeric and atleast 6 characters long";
  }

  return null;
};
