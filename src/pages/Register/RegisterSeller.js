import React, { useState } from "react";
import "./Register.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const RegisterSeller = () => {
  const registerSellerURL = "/api/VoiceSellers/Register";
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [phone, setPhone] = useState();
  const [fullName, setFullName] = useState();
  const [address, setAddress] = useState();
  const [birthDay, setBirthDay] = useState();
  const [gender, setGender] = useState("Nam");
  const [loading, setLoading] = useState(false);
  const [errorInput, setErrorInput] = useState("");

  const handleRegister = async (e) => {
    setLoading(true);

    e.preventDefault();

    let account = {
      fullname: fullName,
      phone: phone,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      birthDay: birthDay,
      introduce: null,
      address: address,
      gender: gender,
      avatarLink: null,
      rateAvg: 0,
      bankName: null,
      bankNumber: null,
      bankAccountName: null,
      googleId: null,
      status: true,
    };

    const headers = {
      accept: "*/*",
    };
    // 400: Email has already been used - Password's length must greater than 8 - Password not match - Data Invalid (birthday),
    // chưa validation: fullName để trống, email thiếu .com, .vn..., phone length <= 10, phone để trống
    try {
      await axios
        .post(registerSellerURL, account, { headers })
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            navigate("/");
          }
        });
    } catch (error) {
      console.log(error.response.data);
      setErrorInput(error.response.data);
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-card">
          <div className="left">
            <div className="center-item">
              <h3>TẠO TÀI KHOẢN GIỌNG ĐỌC</h3>
              <p>Vui lòng nhập đầy đủ các thông tin được yêu cầu</p>
            </div>
            <form onSubmit={handleRegister}>
              <div className="col-item">
                <span>Email*</span>
                <input
                  type="email"
                  placeholder="Nhập Email của bạn"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="register-error">
                  {errorInput === "Email has already been used" && errorInput}
                </div>
              </div>
              <div className="col-item">
                <span>Mật Khẩu*</span>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="register-error">
                  {errorInput === "Password's length must greater than 8" &&
                    errorInput}
                </div>
              </div>
              <div className="col-item">
                <span>Nhập lại mật khẩu*</span>
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
                <div className="register-error">
                  {errorInput === "Password not match" && errorInput}
                </div>
              </div>
              <div className="col-item">
                <span>Số điện thoại*</span>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="col-item">
                <span>Họ và tên*</span>
                <input
                  type="text"
                  placeholder="Nhập họ và tên"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="col-item">
                <span>Địa chỉ*</span>
                <input
                  type="text"
                  placeholder="Nhập địa chỉ"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="col-item">
                <span>Ngày sinh*</span>
                <DatePicker
                  selected={birthDay}
                  onChange={(date) => setBirthDay(date)}
                  dateFormat="yyyy-MM-dd"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={50}
                  placeholderText="Chọn ngày tháng năm sinh"
                  required
                />
              </div>
              <div className="col-item">
                <span>Giới tính*</span>
                <select
                  defaultValue={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              <div className="row-item">
                <input type="checkbox" required />
                <span>
                  Tôi đã đọc và đồng ý với <b>điều khoản</b> của VoiceMarket
                </span>
              </div>
              <div className="button">
                <button type="submit">
                  {loading ? <span>Loading...</span> : <span>Đăng Ký</span>}
                </button>
              </div>
            </form>
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

export default RegisterSeller;
