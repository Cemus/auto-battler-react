import { Component, createContext } from "react";
import getUserData from "../utils/other/getUserData";

const UserContext = createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      battleInformations: {
        fighters: {},
        quest: {},
      },
    };
  }

  logout = () => {
    localStorage.clear();
    this.setState({ user: null });
  };

  battle = (selectedFighters, currentQuest) => {
    console.log(selectedFighters);
    this.setState({
      battleInformations: { fighters: selectedFighters, quest: currentQuest },
    });
  };

  componentDidMount() {
    this.login();
  }

  login = () => {
    const userInfos = getUserData(false);
    let userInfosParsed;
    if (userInfos) {
      userInfosParsed = JSON.parse(getUserData(false));
      this.setState({ user: userInfosParsed });
    } else {
      return this.logout();
    }
  };

  updateUser = (userInfos) => {
    if (userInfos) this.setState({ user: userInfos });
  };

  render() {
    console.log(this.state.battleInformations);
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          battleInformations: this.state.battleInformations,
          updateUser: this.updateUser,
          logout: this.logout,
          battle: this.battle,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer, UserContext };
