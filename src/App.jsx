import "./styles/App.css";
import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Arena from "./pages/Arena";
import Party from "./pages/Party";
import Shop from "./pages/Shop";
import Cards from "./pages/Cards";
import Home from "./pages/Home";
import { UserProvider } from "./context/UserContext";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
  }
  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  };
  render() {
    return (
      <Router>
        <UserProvider>
          <Routes>
            <Route
              path="/register"
              element={
                <Layout>
                  <Register />
                </Layout>
              }
            />

            <Route
              path="/party"
              element={
                <Layout>
                  <Party />
                </Layout>
              }
            />
            <Route
              path="/cards"
              element={
                <Layout>
                  <Cards />
                </Layout>
              }
            />
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/shop"
              element={
                <Layout>
                  <Shop />
                </Layout>
              }
            />
            <Route
              path="/arena"
              element={
                <Layout>
                  <Arena />
                </Layout>
              }
            />
            <Route
              path="/login"
              element={
                <Layout>
                  <Login />
                </Layout>
              }
            />
          </Routes>
        </UserProvider>
      </Router>
    );
  }
}

export default App;
