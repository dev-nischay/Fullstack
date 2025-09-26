import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
  });
 const navigate = useNavigate();

  let handleSubmit = async () => {
    try {
      let res = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email:input.email,
            username:input.username,
            password:input.password
        }),
        mode: "cors",
      });
      let data = await res.json();
      if (data.error) {
        return alert(data.error);
      }
      alert(data.message);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  const inputs = [
    {placeholder: "Email",name: "email"},
    { placeholder: "Username", name: "username"},
    {placeholder: "Password",name: "password"},
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
        <div className="hero-title">Signup</div>

        {inputs.map((tag, i) => (
          <input
            type="text"
            key={i}
            className="input-1"
            placeholder={tag.placeholder}
            name={tag.name}
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
