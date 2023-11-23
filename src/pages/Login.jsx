import { Component } from "react";
import GlowingParticles from "../components/GlowingParticles";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isSubmitting: false,
      inputs: {
        userName: "",
        password: "",
      },
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      const { userName, password } = this.state.inputs;
      this.setState({
        isSubmitting: true,
      });
      fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            this.setState((prevState) => ({
              errors: {
                ...prevState.errors,
                submitError: data.error,
              },
            }));
          } else {
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            this.setState({ isLoggedIn: true });
          }
        })
        .catch((error) => {
          console.error("Error during the request", error);
          this.setState((prevState) => ({
            errors: {
              ...prevState.errors,
              submitError: error,
            },
          }));
        })
        .finally(() => {
          this.setState({
            isSubmitting: false,
          });
        });
    }
  }

  validateForm(inputs) {
    let isValid = true;
    let errors = {};
    if (!inputs["userName"]) {
      errors["userName"] = "Please enter an username.";
      isValid = false;
    }
    if (!inputs["password"]) {
      errors["password"] = "Please enter your password.";
      isValid = false;
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
              <legend>Login</legend>

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
                {!this.state.isSubmitting ? (
                  <button className="submit">Log in</button>
                ) : (
                  <p className="submit">Please wait...</p>
                )}
                <div className="text-danger">
                  {this.state.errors.submitError}
                </div>
              </div>

              <p>
                {"You don't have an account ?"} <br /> Click{" "}
                <Link to="/" className="text-link">
                  here
                </Link>{" "}
                to register.
              </p>
            </fieldset>
          </form>
        </main>
        <GlowingParticles />
      </>
    );
  }
}
