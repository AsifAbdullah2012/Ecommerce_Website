import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/mutations";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({ variables: form });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Register</button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Registered as {data.register.name}</p>}
    </form>
  );
};

export default Register;
