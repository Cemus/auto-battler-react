export default function getUserData(youWantTheToken) {
  return youWantTheToken
    ? localStorage.getItem("token")
    : localStorage.getItem("user");
}
