import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default () => {
  const [input, setInput] = useState({
    title: "",
    rating: "",
    other: "",
  });
  const navigate = useNavigate();

  const body = {
    title: input.title,
    rating: input.rating,
    other: input.other,
  };

  let handleSubmit = async () => {
    try {
      let token = localStorage.getItem("token");

      let res = await fetch("http://localhost:3000/user/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        mode: "cors",
      });

      let data = await res.json();
      data.error ? alert(data.error) : alert(data.message);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been Logged out");
    navigate("/");
  };

  const handleChange = (event) => {
    let { name, value } = event.target;

    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  let inputTags = [
    { placeholder: "Title", name: "title" },
    { placeholder: "Rating", name: "rating" },
    { placeholder: "Other", name: "other" },
  ];

  return (
    <>
      <div className="card-root">
        <div className="hero-title">Feedback</div>

        {inputTags.map((tag, index) => (
          <input
            type="text"
            className="input-1"
            placeholder={tag.placeholder}
            name={tag.name}
            key={index}
            value={input[tag.name]}
            onChange={handleChange}
          />
        ))}

        <div>
          <button onClick={handleSubmit} className="submit-btn">
            Submit
          </button>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
