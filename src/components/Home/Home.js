import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/courses/")
      .then((res) => res.json())
      .then((data) => {
        console.log("corse-data: ", data)
        setCourses(data)})
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-container">
      {courses.length > 0 ? (
        courses.map((course) => (
        <div className="home-cards" key={course.id}>
          <Link to="/dashboard">
            <div className="course-name">
              <p>{course.name}</p>
            </div>
            <div className="course-img">
              <img src={course.image} alt="course-image" />
            </div>
            <div className="course-details">
              <p>{course.details}</p>
            </div>
            <div className="course-fees">
              <p>₹ {course.fees}</p>
            </div>
            <div className="course-duration">
              <p>{course.duration} Months</p>
            </div>
          </Link>
        </div>
        ))
      ) : (
        <p>No Course Available</p>
      )}
    </div>
  );
}
export default Home;
