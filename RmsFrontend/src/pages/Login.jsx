import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Adresa de email invalidă")
        .required("Emailul este obligatoriu"),
      password: Yup.string()
        .min(6, "Parola trebuie să aibă minim 6 caractere")
        .matches(/[0-9]/, "Parola trebuie să conțină minim un număr")
        .required("Parola este obligatorie"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const response = await fetch("http://localhost:5049/api/Auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Email sau parolă incorectă.");
        }

        // Assuming your backend returns the user object and a token
        login({
          user: data.user,
          token: data.token // If using JWT or similar
        });
        
        navigate("/homepage"); // Redirect to your protected page
        
      } catch (error) {
        setStatus(error.message || "A apărut o eroare. Vă rugăm să încercați din nou.");
        console.error("Login error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-black text-2xl font-bold mb-4 text-center">Autentificare</h2>
        
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="text-black block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="exemplu@gmail.com"
              className={`text-black w-full p-2 border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            ) : null}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="text-black block text-sm font-medium mb-1">
              Parolă
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className={`text-black w-full p-2 border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            ) : null}
          </div>

          {/* Server Error Message */}
          {formik.status && (
            <p className="text-red-500 text-sm">{formik.status}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md mt-4"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Se încarcă..." : "Conectează-te"}
          </button>

          {/* Register Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Nu ai cont?{" "}
              <Link to="/register" className="text-black font-medium hover:underline">
                Înregistrează-te
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;