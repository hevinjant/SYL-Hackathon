import React, { useState } from "react";
import "../styles/Form.css";

function Form({ formLabel, handleFormSubmit }) {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFormSubmit(input);
    setInput("");
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label>{formLabel}</label>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter your goal"
        />
      </form>
    </div>
  );
}

export default Form;
