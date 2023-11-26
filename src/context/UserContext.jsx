import React, { createContext } from "react";

const UserContext = createContext();

class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  logout() {
    localStorage.clear();
    this.setState({ user: null });
  }

  updateUser = (newUser) => {
    this.setState({ user: newUser });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          updateUser: this.updateUser,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
