import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const isLoading = useSelector((state) => state.user.isLoading);
  const account = useSelector((state) => state.user.account);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    dispatch(handleLoginRedux(email, password));
 
  };

  const handleGoBack = () => {
    navigate("/users");
  };

  const handlePressEnter = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (account && account.auth === true) {
      navigate("/users");
    }
  }, [account]);

  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title">Log in</div>
      <div className="row g-3 align-items-center">
        <label htmlFor="inputEmail" className="form-label fw-bold">
          Login name
        </label>
        <input
          className="form-control mt-0 my-3 px-4 py-2 rounded-pill"
          type="text"
          id="inputEmail"
          placeholder="Email or Username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="row g-3 align-items-center position-relative">
        <input
          className="form-control px-4 py-2 rounded-pill"
          type={isShowPassword === false ? "password" : "text"}
          placeholder="Password"
          //   aria-describedby="passwordHelpBlock"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(event) => handlePressEnter(event)}
        />
        <i
          id="eye-icon"
          className={
            isShowPassword === false
              ? "fa-solid fa-eye"
              : "fa-solid fa-eye-slash"
          }
          onClick={() => setIsShowPassword(!isShowPassword)}
          hidden={password ? false : true}
        ></i>
        {/* <div id="passwordHelpBlock" className="form-text">
          Your password must be 6-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </div> */}
      </div>
      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={handleLogin}
      >
        <span className="text-btn">
          {isLoading ? <i className="fa fa-spinner fa-spin-pulse"></i> : ""}
          &#160;Login
        </span>
      </button>
      <div className="back">
        <i className="fa fa-angles-left"></i>&nbsp;
        <span onClick={() => handleGoBack()}>Go back</span>
      </div>
    </div>
  );
};

export default Login;
