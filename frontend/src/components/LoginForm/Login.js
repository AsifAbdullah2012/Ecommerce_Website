import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/mutations";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ variables: form }).then((res) => {
      localStorage.setItem("token", res.data.login);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Logged in!</p>}
    </form>
  );
};

export default Login;
