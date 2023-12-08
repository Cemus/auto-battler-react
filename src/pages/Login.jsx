import { Component } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default class Register extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
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
          console.log("SALUT1");
          return response.json();
        })
        .then((data) => {
          console.log("SALUT");
          if (data.error) {
            this.context.logout();
            this.setState((prevState) => ({
              errors: {
                ...prevState.errors,
                submitError: data.error,
              },
            }));
          } else {
            console.log("lolilol");
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            this.context.updateUser(data.user);
          }
        })
        .catch((error) => {
          console.error("Error during the request", error);
          this.setState((prevState) => ({
            errors: {
              ...prevState.errors,
              submitError: "The server is not responding.",
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
    const { user } = this.context;
    if (user) {
      console.log("lol redirecty");
      return <Navigate to="/" />;
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
            </fieldset>
            <div className="form-group">
              {!this.state.isSubmitting ? (
                <button className="submit">Log in</button>
              ) : (
                <p className="submit">Please wait...</p>
              )}
              <div className="text-danger">
                {this.state.errors.submitError && (
                  <span>{this.state.errors.submitError}</span>
                )}
              </div>
            </div>
            <p>
              {"You don't have an account ?"} <br /> Click{" "}
              <Link to="/register" className="text-link">
                here
              </Link>{" "}
              to register.
            </p>
          </form>
        </main>
      </>
    );
  }
}
