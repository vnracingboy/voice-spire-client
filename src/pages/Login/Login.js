import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
const LOGIN_URL = "/api/VoiceSellers/Login";
const VoiceSellersURL = "/api/VoiceSellers/";
const BuyerURL = "/api/Buyers/";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const errRef = useRef();

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const checkBankAccount = async (userId, role) => {
    const headers = {
      accept: "text/plain",
    };
    if (role === "seller") {
      try {
        await axios
          .get(VoiceSellersURL + userId, { headers })
          .then((response) => {
            if (response.status === 200) {
              if (
                !response.data?.bankName ||
                !response.data?.bankNumber ||
                !response.data?.bankAccountName
              ) {
                navigate("/bank");
              } else {
                navigate("/posts");
              }
            }
          });
      } catch (error) {
        console.log(error.response?.data);
      }
    }
    if (role === "buyer") {
      try {
        await axios.get(BuyerURL + userId).then((response) => {
          if (response.status === 200) {
            if (
              !response.data?.bankName ||
              !response.data?.bankNumber ||
              !response.data?.bankAccountName
            ) {
              navigate("/bank");
            } else {
              navigate("/voices");
            }
          }
        });
      } catch (error) {
        console.log(error.response?.data);
      }
    }
    if (role === "manager") {
      navigate("/lv");
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  useEffect(() => {
    if (auth.role) {
      if (auth.role[0] === "seller") navigate("/posts");
      else if (auth.role[0] === "buyer") navigate("/voices");
      else if (auth.role[0] === "manager") navigate("/lv");
    } else navigate("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));

      const token = response?.data?.token;
      const roleStr = response?.data?.role;
      let userId = null;

      if (roleStr === "seller") {
        userId = response.data.voiceSeller.voiceSellerId;
      } else if (roleStr === "buyer") {
        userId = response.data.buyer.buyerId;
      }
      const role = roleStr.split(" ");
      setAuth({ userId, email, password, role, token });
      checkBankAccount(userId, roleStr);

      setEmail("");
      setPassword("");

      setLoading(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Sai Email hoặc mật khẩu");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-card">
          <div className="left">
            <div className="center-item">
              <h3>Đăng nhập</h3>
              <p>
                Vui lòng đăng nhập để sử dụng đầy đủ các tính năng của
                VoiceMarket
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="col-item">
                <span>Email</span>
                <input
                  type="email"
                  ref={emailRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
              <div className="col-item">
                <span>Mật khẩu</span>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <div className="row-item">
                {/* <input type="checkbox" />
                <i>Remember me</i>
                <span>Quên mật khẩu?</span> */}
              </div>
              <div className="button">
                <button className={loading ? "disabled" : ""}>
                  {loading ? (
                    <div className="loading-login">
                      <div className="loading-login-container">
                        <div className="loader-login"></div>
                      </div>
                    </div>
                  ) : (
                    <span>Đăng nhập</span>
                  )}
                </button>
              </div>
            </form>

            <div className="row-item">
              <i>
                Bạn chưa có tài khoản VoiceMarket?
                <Link to="/register" className="link">
                  <strong> Đăng ký </strong>
                </Link>
                ngay
              </i>
            </div>
          </div>
          <div className="right">
            <div className="center-item">
              <h1>VOICE MARKET</h1>
            </div>
            <div className="col-item">
              <span>
                Bạn muốn tìm nguồn cung cấp một kho tàng giọng đọc: tài năng, đa
                dạng, thổi vào sản phẩm của bạn một làn gió tươi trẻ, tràn đầy
                sức sống tươi mới, mà chi phí lại rẻ, tiện lợi, bạn có thể chủ
                động hơn, tiết kiệm thời gian hơn? Bạn có thấy những yêu cầu ấy
                quá khắt khe không? Bạn nghĩ có nơi nào có thể đáp ứng nổi những
                yêu cầu của bạn không? Có đấy! Bạn hãy thử đến với Voice Spire
                xem!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
