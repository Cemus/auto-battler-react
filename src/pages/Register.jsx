import { Component } from "react";
import GlowingParticles from "../components/GlowingParticles";
import { Link, Navigate } from "react-router-dom";
import getUserData from "../utils/other/getUserData";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isSubmitting: false,
      inputs: {
        name: "",
        userName: "",
        password: "",
        confirmedPassword: "",
      },
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const userInfos = JSON.parse(getUserData(false));
    console.log(userInfos);
    if (userInfos) this.setState({ isLoggedIn: true });
  }

  handleChange(event) {
    let input = this.state.inputs;
    input[event.target.name] = event.target.value;
    this.setState({
      input,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateForm(this.state.inputs)) {
      const { name, userName, password } = this.state.inputs;
      this.setState({ isSubmitting: true });
      fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: userName,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error during the request", error);
          this.setState((prevState) => ({
            errors: {
              ...prevState.errors,
              submitError: "Failed connecting to the server.",
            },
          }));
        })
        .finally(() => {
          this.setState({ isSubmitting: false });
        });
    }
  }

  validateForm(inputs) {
    let isValid = true;
    let errors = {};
    if (!inputs["name"]) {
      errors["name"] = "Please enter your name.";
      isValid = false;
    }
    if (!inputs["userName"]) {
      errors["userName"] = "Please enter an username.";
      isValid = false;
    }
    if (!inputs["password"]) {
      errors["password"] = "Please enter your password.";
      isValid = false;
    }
    if (!inputs["confirmedPassword"]) {
      errors["confirmedPassword"] = "Please enter your confirm password.";
      isValid = false;
    }
    if (inputs["password"] !== "undefined") {
      if (inputs["password"].length < 6) {
        errors["password"] = "Please add at least 6 characters.";
        isValid = false;
      }
    }
    if (
      inputs["password"] !== "undefined" &&
      inputs["confirmedPassword"] !== "undefined"
    ) {
      if (inputs["password"] != inputs["confirmedPassword"]) {
        errors["confirmedPassword"] = "Passwords don't match.";
        isValid = false;
      }
    }
    this.setState({
      errors: errors,
    });
    return isValid;
  }
  render() {
    if (this.state.isLoggedIn) {
      return <Navigate to="/home" />;
    }
    return (
      <>
        <main className="main--home">
          <header className="header--main">
            <h2>Welcome!</h2>
          </header>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Register</legend>
              <div className="form-group">
                <label htmlFor="registerName">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  name="name"
                  id="registerName"
                  onChange={this.handleChange}
                  required
                ></input>
                <div className="text-danger">{this.state.errors.name}</div>
              </div>
              <div className="form-group">
                <label htmlFor="registerUserName">Username</label>
                <input
                  type="text"
                  placeholder="Your username"
                  name="userName"
                  id="registerUserName"
                  onChange={this.handleChange}
                  required
                ></input>
                <div className="text-danger">{this.state.errors.userName}</div>
              </div>
              <div className="form-group">
                <label htmlFor="registerPassword">Password</label>
                <input
                  type="password"
                  onChange={this.handleChange}
                  name="password"
                  id="registerPassword"
                  minLength={6}
                  required
                ></input>
                <div className="text-danger">{this.state.errors.password}</div>
              </div>
              <div className="form-group">
                <label htmlFor="registerConfirmedPassword">
                  Confirm password
                </label>
                <input
                  type="password"
                  onChange={this.handleChange}
                  name="confirmedPassword"
                  id="registerConfirmedPassword"
                  minLength={6}
                  required
                ></input>
                <div className="text-danger">
                  {this.state.errors.confirmedPassword}
                </div>
              </div>
              <div className="form-group">
                <button className="submit">Register an account</button>
                <div className="text-danger">
                  {this.state.errors.submitError}
                </div>
              </div>
              <p>
                You already have an account ? <br /> Click{" "}
                <Link to="/login" className="text-link">
                  here
                </Link>{" "}
                to log in.{" "}
              </p>
            </fieldset>
          </form>
        </main>
        <GlowingParticles />
      </>
    );
  }
}
