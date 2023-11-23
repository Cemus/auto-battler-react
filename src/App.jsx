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

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
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
            path="/home"
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
      </Router>
    );
  }
}

export default App;
