import React from "react";
import "./dashboard.css";
import { CourseData } from "../../context/CourseContex";
import CourseCard from "../../components/courseCard/CourseCard";

export const Dashboard = () => {
  const { mycourse } = CourseData();

  return (
    <div className="student-dashboard">
      <h2>All Enrolled Courses</h2>
      <div className="dashboard-content">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No Course Enrolled Yet</p>
        )}
      </div>
    </div>
  );
};
