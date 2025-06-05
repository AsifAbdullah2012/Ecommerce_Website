import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/mutations";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ variables: form });
      const token = res.data.login;
      const user = jwtDecode(token);

      if (form.remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      navigate("/"); // Redirect to homepage after login
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-10">
      {/* Amazon logo */}
      <div className="flex items-center space-x-1 mb-6">
        <h1 className="text-3xl font-bold text-orange-500">amazon</h1>
        <span className="text-lg">.de</span>
      </div>

      {/* Login form card */}
      <div className="bg-white rounded-md shadow-md p-8 w-96">
        <h2 className="text-2xl font-semibold mb-6">Anmelden</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">E-Mail-Adresse</label>
            <input
              type="email"
              value={form.email}
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Passwort</label>
            <input
              type="password"
              value={form.password}
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="********"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={form.remember}
              onChange={(e) => setForm({ ...form, remember: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="remember" className="text-sm">
              Angemeldet bleiben
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded focus:outline-none transition"
          >
            {loading ? "Anmelden..." : "Anmelden"}
          </button>

          {error && (
            <p className="text-red-600 text-sm mt-2">Fehler: {error.message}</p>
          )}
          {data && (
            <p className="text-green-600 text-sm mt-2">
              Erfolgreich angemeldet!
            </p>
          )}
        </form>

        <p className="text-xs text-gray-600 mt-4">
          Durch die Anmeldung erklärst du dich mit unseren{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Nutzungsbedingungen
          </a>{" "}
          und der{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Datenschutzerklärung
          </a>{" "}
          einverstanden.
        </p>

        <div className="mt-4 border-t pt-4">
          <p className="text-sm">
            Neu bei Amazon?{" "}
            <a href="/registration" className="text-blue-600 hover:underline">
              Jetzt registrieren
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
