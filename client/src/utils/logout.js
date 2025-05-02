import axios from "axios";
import { clearData } from "../redux/slices/loginSlice";

const logout = async (dispatch) => {
  let { data } = await axios.post("/api/auth/logout");
  if (data.message === "Logged out") {
    dispatch(clearData());
    localStorage.removeItem("userInfo");
    sessionStorage.removeItem("userInfo");
    window.location.href = "/login";
  }
};

export default logout;
