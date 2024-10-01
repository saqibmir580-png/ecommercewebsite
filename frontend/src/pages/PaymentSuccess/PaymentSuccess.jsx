import React from "react";
import './paymentuccess.css'
import { useParams } from "react-router-dom";

const PaymentSuccess = ({ user }) => {
  const parms = useParams();

  return (
    <div className="payment-success-page">
      {user && (
        <div className="success-message">
          <h2>Payment Successful</h2>
          <p>Your course subscription has been activated</p>
          <p>Reference no- {parms.id}</p>
          <Link to={`/${user._id}/dashboard`} className="common-btn" >Go to Dashboard</Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
