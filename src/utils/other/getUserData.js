export default function getUserData(youWantTheToken) {
  switch (youWantTheToken) {
    case true:
      if (localStorage.getItem("token")) {
        return localStorage.getItem("token");
      } else {
        return null;
      }

    case false:
      if (localStorage.getItem("user")) {
        return localStorage.getItem("user");
      } else {
        return null;
      }
  }
}
