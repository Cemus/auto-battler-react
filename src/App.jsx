import "./styles/App.css";
import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Arena from "./pages/Arena";
import Party from "./pages/Party";
import Shop from "./pages/Shop";
import Cards from "./pages/Cards";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
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
        </Routes>
      </Router>
    );
  }
}

export default App;
