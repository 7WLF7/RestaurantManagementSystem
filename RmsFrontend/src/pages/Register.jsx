import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Numele trebuie să aibă minim 3 caractere")
        .required("Numele este obligatoriu"),
      email: Yup.string()
        .email("Adresa de email invalidă")
        .required("Emailul este obligatoriu"),
      password: Yup.string()
        .min(6, "Parola trebuie să aibă minim 6 caractere")
        .matches(/[0-9]/, "Parola trebuie să conțină minim un număr")
        .required("Parola este obligatorie"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Parolele trebuie să coincidă")
        .required("Confirmarea parolei este obligatorie"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const response = await fetch("https://localhost:5000/api/Auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Eroare la înregistrare");
        }

        login(data.user); // You may need to update `data.user` based on what your backend returns
        navigate("/home");
      } catch (error) {
        setStatus(error.message);
        console.error("Registration error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-black text-2xl font-bold mb-3 text-center">Înregistrare</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-1">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="text-black block text-sm font-medium mb-1">
              Nume complet
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ion Popescu"
              className={`text-black w-full p-2 border ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            ) : null}
          </div>

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

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="text-black block text-sm font-medium mb-1">
              Confirmă parola
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="********"
              className={`text-black w-full p-2 border ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>
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
            {formik.isSubmitting ? "Se încarcă..." : "Înregistrează-te"}
          </button>

          {/* Login Link */}
          <div className="text-center mt-2">
            <p className="text-sm text-gray-600">
              Ai deja cont?{" "}
              <Link to="/login" className="text-black font-medium hover:underline">
                Autentifică-te
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
