import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/mutations";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwörter stimmen nicht überein!");
      return;
    }
    registerUser({
      variables: {
        name: form.name,
        email: form.email,
        password: form.password,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-10">
      {/* Amazon logo */}
      <div className="flex items-center space-x-1 mb-6">
        <h1 className="text-3xl font-bold text-orange-500">amazon</h1>
        <span className="text-lg">.de</span>
      </div>

      {/* Form container */}
      <div className="bg-white rounded-md shadow-md p-8 w-96">
        <h2 className="text-2xl font-semibold mb-4">Konto erstellen</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold">Dein Name</label>
            <input
              placeholder="Vor- und Nachname"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold">
              Mobiltelefonnummer oder E-Mail-Adresse
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold">Passwort</label>
            <input
              type="password"
              placeholder="mindestens 6 Zeichen"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <p className="text-xs text-gray-600 mt-1">
              Passwörter müssen mindestens 6 Zeichen lang sein.
            </p>
          </div>

          <div>
            <label className="text-sm font-bold">
              Passwort nochmals eingeben
            </label>
            <input
              type="password"
              placeholder="Passwort bestätigen"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded focus:outline-none transition"
          >
            {loading ? "Registrieren..." : "Weiter"}
          </button>

          {error && (
            <p className="text-red-600 text-sm mt-2">Error: {error.message}</p>
          )}
          {data && (
            <p className="text-green-600 text-sm mt-2">
              Registriert als {data.register.name}
            </p>
          )}
        </form>

        <p className="text-xs text-gray-600 mt-4">
          Durch die Erstellung eines Kontos erklärst du dich mit den{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Nutzungs- und Verkaufsbedingungen
          </a>{" "}
          von Amazon einverstanden. Lies auch unsere{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Datenschutzerklärung
          </a>
          , unsere{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Erklärung zu Cookies
          </a>{" "}
          und unsere{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Erklärung zu interessensbasierter Werbung
          </a>
          .
        </p>

        <div className="mt-4 border-t pt-4">
          <p className="text-sm">
            Kaufst du für dein Unternehmen ein?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Ein kostenloses Unternehmenskonto erstellen
            </a>
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm">
            Du hast bereits ein Konto?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Anmelden
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
