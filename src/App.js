import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mob_no: "",
    address: "",
    course: "",
  });
  const [courses, setCourses] = useState([]);
  console.log("courses: ", courses);
  const [students, setStudent] = useState([]);
  console.log("students: ", students);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/students/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const newStudent = await response.json();
      console.log(newStudent);
      // ⭐ update UI instantly
      setStudent((prev) => [...prev, newStudent]);

      alert("Student Enrolled Successfully");
    } catch (error) {
      console.error(error);
      alert("Error submiting from");
    }
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/courses/")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/students/")
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      <div className="container">
        <div className="enroll">
          <p className="heading">Enroll To Course</p>
          <form onSubmit={handleSubmit}>
            <label className="label">Name</label>
            <input name="name" onChange={handleChange} />

            <label className="label">Email</label>
            <input name="email" onChange={handleChange} />

            <label className="label">Mobile Number</label>
            <input name="mob_no" onChange={handleChange} />

            <label className="label">Address</label>
            <input name="address" onChange={handleChange} />

            <label className="label">Course</label>
            <select name="course" onChange={handleChange}>
              <option>Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>

            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="available-course">
          <p className="heading"> Available Course </p>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Fees</th>
                <th>Duration</th>
              </tr>
            </thead>

            <tbody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.name}</td>
                    <td>₹ {course.fees}</td>
                    <td>{course.duration}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No Course Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="enrolled-student">
        <p className="heading">Enrolled Students</p>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Address</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              students.map((std) => (
                <tr key={std.id}>
                  <td>{std.name}</td>
                  <td>{std.email}</td>
                  <td>{std.mob_no}</td>
                  <td>{std.address}</td>
                  <td>{std.course_name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No Course Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default App;
