import { Component } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "../styles/app.css";

export default class GlowingParticles extends Component {
  async loadParticles(main) {
    await loadFull(main);
  }

  render() {
    return (
      <div className="particles-container">
        <Particles
          id="tsparticles"
          init={this.loadParticles}
          options={{
            particles: {
              color: {
                value: "#FFD700",
              },
              move: {
                direction: "top",
                enable: true,
                outModes: "out",
                speed: 1,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 50,
              },
              opacity: {
                value: 0.9,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: 8,
              },
              wobble: {
                enable: true,
                distance: 5,
                speed: 10,
              },
              zIndex: {
                value: {
                  min: 0,
                  max: 100,
                },
              },
              shadow: {
                enable: true,
                color: "#FFD700",
                blur: 20,
              },
            },
          }}
        />
      </div>
    );
  }
}
