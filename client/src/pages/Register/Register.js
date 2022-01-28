import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, FormInput, Alert } from "../../components";
import { useGlobalContext } from "../../context/globalContext";
import "./Register.css";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [userValues, setUserValues] = useState(initialState);

  const navigate = useNavigate();

  //global state
  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } =
    useGlobalContext();

  //The clearAlert() passed from useGlobalContext removes the alert display at the top of the login/register page after 4 seconds
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/"); //the homepage
      }, 4000);
    }
  }, [user, navigate]); //invoked on initial render and when user or navigate changes

  const handleChange = (e) => {
    setUserValues({ ...userValues, [e.target.name]: e.target.value });
  };

  const toggleMember = () => {
    setUserValues({ ...userValues, isMember: !userValues.isMember });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //destructuring to save space on line 46
    const { name, email, password, isMember } = userValues;

    // displays an alert if any of the required fields are missing
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = { name, email, password };

    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  return (
    <main className="full-page registration-container">
      <form onSubmit={handleSubmit} className="form registration-form">
        <Logo className="register-logo" />
        <h1 className="registration-title">
          {userValues.isMember ? "Login" : "Register"}
        </h1>
        {showAlert && <Alert />}

        {!userValues.isMember && (
          <FormInput
            type="text"
            name="name"
            value={userValues.name}
            handleChange={handleChange}
          />
        )}
        <FormInput
          type="email"
          name="email"
          value={userValues.email}
          handleChange={handleChange}
        />
        <FormInput
          type="password"
          name="password"
          value={userValues.password}
          handleChange={handleChange}
        />
        <button className="btn btn-full registration-btn" disabled={isLoading}>
          {isLoading ? "Processing..." : "Submit"}
        </button>
        <p className="registration-text">
          {userValues.isMember ? "Not a member?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {userValues.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </main>
  );
};

export default Register;
