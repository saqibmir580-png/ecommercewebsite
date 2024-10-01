import React, { useEffect, useState } from "react";
import "./courseDesc.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContex";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContex";
import Loading from "../../components/loading/Loading";
export const CourseDes = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { fetchUser } = UserData();
  useEffect(() => {
    fetchCourse(params.id);
  }, []);
  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );
    const options = {
      key: "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
      amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "E-learning", //your business name
      description: "Learn with Us",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            }
          );
          await fetchUser();
          await fetchCourses();
          await fetchMyCourse()
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_order_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#8a4baf",
      },
    };
    const razorpay = new window.Razorapy(options);
    razorpay.open();
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="course-description">
              <div className="course-header">
                <img
                  src={`${server}/${course.image}`}
                  alt="imge"
                  className="course-image"
                />
                <div className="course-info">
                  <h2>{course.title}</h2>
                  <p>Instructor:{course.createdBy}</p>
                  <p>Duration:{course.duration} weeks</p>
                </div>
              </div>
              <p>{course.description}</p>
              <p>Let's get started with course At ₹{course.price}</p>

              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                <button className="common-btn" onClick={checkoutHandler}>
                  BuyNow
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
