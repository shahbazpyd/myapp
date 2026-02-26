import { useState, useEffect } from "react";
function Dashboard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mob_no: "",
    address: "",
    course: "",
  });
  const [courses, setCourses] = useState([]);
  console.log("courses: ", courses);
  const [students, setStudents] = useState([]);
  console.log("students: ", students);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editId
        ? `http://127.0.0.1:8000/api/students/${editId}/`
        : "http://127.0.0.1:8000/api/students/";

      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      // ⭐ update UI instantly
      if (editId) {
        setStudents((prev) => prev.map((st) => (st.id === editId ? data : st)));
      } else {
        setStudents((prev) => [...prev, data]);
      }

      setFormData({
        name: "",
        email: "",
        mob_no: "",
        address: "",
        course: "",
      });

      setEditId(null);
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
      .then((data) => setStudents(data))
      .catch((err) => console.log(err));
  }, []);

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure want to delete>")) return;

    try {
      await fetch(`http://127.0.0.1:8000/api/students/${id}/`, {
        method: "DELETE",
      });

      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (student) => {
    console.log("handleEdit", student);
    setFormData(student);
    setEditId(student.id);
  };
  return (
    <div className="App">
      <div className="container">
        <div className="enroll">
          <p className="heading">Enroll To Course</p>
          <form onSubmit={handleSubmit}>
            <label className="label">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label className="label">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label className="label">Mobile Number</label>
            <input
              type="tel"
              name="mob_no"
              value={formData.mob_no}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength={10}
              required
            />

            <label className="label">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <label className="label">Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>

            <button type="submit">
              {editId ? "Update Student" : "Enroll Student"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setFormData({
                    name: "",
                    email: "",
                    mob_no: "",
                    address: "",
                    course: "",
                  });
                }}
              >
                Cancel Edit
              </button>
            )}
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((std) => (
                <tr key={std.id}>
                  <td>{std.name}</td>
                  <td>{std.email}</td>
                  <td>{std.mob_no}</td>
                  <td>{std.address}</td>
                  <td>{std.course_name}</td>
                  <td className="container">
                    <button onClick={() => handleEdit(std)}>Update</button>
                    <button onClick={() => deleteStudent(std.id)}>
                      Delete
                    </button>
                  </td>
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
export default Dashboard;
