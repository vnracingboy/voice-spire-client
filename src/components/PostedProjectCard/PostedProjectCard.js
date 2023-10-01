import React, { useEffect, useState } from "react";
import "./PostedProjectCard.css";

import WaitingStatus from "../Status/WaitingStatus/WaitingStatus";
import RejectStatus from "../Status/RejectStatus/RejectStatus";
import InvitationStatus from "../Status/InvitationSendStatus/InvitationSendStatus";
import DenyStatus from "../Status/DenyStatus/DenyStatus";
import FinishStatus from "../Status/FinishStatus/FinishStatus";
import RecruitmentStatus from "../Status/RecruitmentStatus/RecruitmentStatus";
import ReceivingStatus from "../Status/ReceivingStatus/ReceivingStatus";
import { getPaymentInfo } from "../../api/axios";
import { Link } from "react-router-dom";

const PostedProjectCard = ({ post }) => {
  const [paymentInfo, setPaymentInfo] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPaymentInfo(post.voiceProjectId)
      .then((json) => setPaymentInfo(json))
      .then((json) => setLoading(false));
  }, [post.projectId]);

  const [dropDown, setDropDown] = useState(false);
  const [dropDown2, setDropDown2] = useState(false);

  const displayDropdown = () => {
    if (post.projectStatus === "Done" || post.projectStatus === "Processing")
      setDropDown2(!dropDown2);
    else setDropDown(!dropDown);
  };

  return (
    <div className="lpa-margin">
      <div className="lpa-container" onClick={displayDropdown}>
        <div className="lpa-card">
          <img src={post.linkThumbnail} alt="thumbnail" />
          <div className="lpa-name">
            <span>{post.title}</span>
            <div className="lpa-bank">
              <span>
                BankCode: <span>{post.bankCode}</span>
              </span>
            </div>
          </div>
          {/* <div className="lpa-status">
            <span>Chưa thanh toán</span>
          </div> */}
          <div className="lpa-icon">
            {post.projectStatus === "WaitApprove" && <WaitingStatus />}
            {post.projectStatus === "NotApproved" && <RejectStatus />}
            {post.projectStatus === "Apply" && <RecruitmentStatus />}
            {post.projectStatus === "Processing" && <ReceivingStatus />}
            {post.projectStatus === "Done" && <FinishStatus />}
          </div>
        </div>
      </div>
      {dropDown && (
        <div className="lpa-dropdown">
          <div className="lpa-dropdown-card">
            <div className="lpa-dropdown-display">
              <div className="lpa-dropdown-small-card">
                <div>
                  <p className="lpa-dropdown-title">Thông tin thanh toán</p>
                  <div className="lpa-dropdown-bank">
                    <strong>Ngân hàng:</strong>
                    <span>{paymentInfo.bankNameBuyer}</span>
                  </div>
                  <div className="lpa-dropdown-bank">
                    <strong>Số tài khoản:</strong>
                    <span>{paymentInfo.bankNumberBuyer}</span>
                  </div>
                  <div className="lpa-dropdown-bank-fullName">
                    <strong>Tên tài khoản:</strong>
                    <span>{paymentInfo.bankAccountNameBuyer}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-wrapper">
              <div className="lpa-dropdown-detail-button">
                <Link
                  to={`/projectmanagementdetail/${post.voiceProjectId}`}
                  className="link"
                >
                  <button>Xem chi tiết dự án</button>
                </Link>
              </div>
              <div className="lpa-dropdown-confirm-button">
                {post.projectStatus === "WaitApprove" && <button>Duyệt</button>}
              </div>
            </div>
          </div>
        </div>
      )}
      {dropDown2 && (
        <div className="lpa-dropdown">
          <div className="lpa-dropdown-card">
            <div className="lpa-dropdown-display">
              <div className="lpa-dropdown-small-card">
                <div>
                  <p className="lpa-dropdown-title">
                    Thông tin thanh toán tổ chức
                  </p>
                  <div className="lpa-dropdown-bank">
                    <strong>Ngân hàng:</strong>
                    <span>{paymentInfo.bankNameBuyer}</span>
                  </div>
                  <div className="lpa-dropdown-bank">
                    <strong>Số tài khoản:</strong>
                    <span>{paymentInfo.bankNumberBuyer}</span>
                  </div>
                  <div className="lpa-dropdown-bank-fullName">
                    <strong>Tên tài khoản:</strong>
                    <span>{paymentInfo.bankAccountNameBuyer}</span>
                  </div>
                </div>
              </div>
              <div className="lpa-dropdown-small-card">
                <div>
                  <p className="lpa-dropdown-title">
                    Thông tin thanh toán bên bán
                  </p>
                  <div className="lpa-dropdown-bank">
                    <strong>Ngân hàng:</strong>
                    <span>{paymentInfo.bankNameSeller}</span>
                  </div>
                  <div className="lpa-dropdown-bank">
                    <strong>Số tài khoản:</strong>
                    <span>{paymentInfo.bankNumberSeller}</span>
                  </div>
                  <div className="lpa-dropdown-bank-fullName">
                    <strong>Tên tài khoản:</strong>
                    <span>{paymentInfo.bankAccountNameSeller}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-wrapper">
              <div className="lpa-dropdown-detail-button">
                <Link
                  to={`/projectmanagementdetail/${post.voiceProjectId}`}
                  className="link"
                >
                  <button>Xem chi tiết dự án</button>
                </Link>
              </div>
              <div className="lpa-dropdown-confirm-button">
                <button>Xem hoạt động dự án</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostedProjectCard;
