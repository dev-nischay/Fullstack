import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const body = {
    email: input.email,
    password: input.password,
  };

  let handleSubmit = async () => {
    try {
      let res = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        mode: "cors",
      });
      let data = await res.json();

      if (data.error) {
        return alert(data.error);
      }
      alert(data.message);
      data.token ? localStorage.setItem("token", data.token) : null;
      navigate("/feedback");


    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  let inputTags = [
    { placeholder: "Email", name: "email" },
    { placeholder: "Password", name: "password" },
  ];
  let handleChange = (event) => {
    let { name, value } = event.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="card-root">
        <div className="hero-title">Signin</div>

        {inputTags.map((tag, index) => (
          <input
            type="text"
            placeholder={tag.placeholder}
            name={tag.name}
            className="input-1"
            key={index}
            value={input[tag.name]}
            onChange={handleChange}
          ></input>
        ))}

        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </div>
    </>
  );
};
