// pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import AddProductForm from '../components/AddProductForm';

export default function AdminDashboard() {
  const { token } = useAuth();

  // --- Angajat ---
  const formikEmployee = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Numele este obligatoriu'),
      email: Yup.string().email('Email invalid').required('Emailul este obligatoriu'),
      password: Yup.string().min(6, 'Minim 6 caractere').required('Parola este obligatorie')
    }),
    onSubmit: async (vals, { setStatus, resetForm }) => {
      try {
        const res = await fetch('http://localhost:5049/api/Auth/register-employee', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(vals)
        });
        if (!res.ok) throw new Error(await res.text());
        setStatus('Angajat creat cu succes!');
        resetForm();
      } catch (e) {
        setStatus('Eroare: ' + e.message);
      }
    }
  });

  // --- Categorie ---
  const formikCategory = useFormik({
    initialValues: { categoryName: '' },
    validationSchema: Yup.object({
      categoryName: Yup.string().required('Numele categoriei este obligatoriu')
    }),
    onSubmit: async (vals, { setStatus, resetForm }) => {
      try {
        const res = await fetch('http://localhost:5049/api/Categorie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ nume: vals.categoryName })
        });
        if (!res.ok) throw new Error(await res.text());
        setStatus('Categorie creată cu succes!');
        resetForm();
      } catch (e) {
        setStatus('Eroare: ' + e.message);
      }
    }
  });

  return (
    <div className="p-8 min-w-screen bg-gray-100">
      <h2 className="h-8 text-3xl font-semibold mb-6 text-center"></h2>
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Creare angajat */}
        <section className="flex-1 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-black text-2xl mb-4">Creează angajat</h3>
          <form onSubmit={formikEmployee.handleSubmit} className="space-y-4">
            {['username', 'email', 'password'].map((field) => (
              <div key={field}>
                <label className="block mb-1 font-medium text-black">
                  {field === 'username'
                    ? 'Nume'
                    : field === 'email'
                    ? 'Email'
                    : 'Parola'}
                </label>
                <input
                  name={field}
                  type={field === 'password' ? 'password' : 'text'}
                  onChange={formikEmployee.handleChange}
                  onBlur={formikEmployee.handleBlur}
                  value={formikEmployee.values[field]}
                  className="border border-gray-300 p-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
                {formikEmployee.touched[field] && formikEmployee.errors[field] && (
                  <div className="text-red-500 text-sm mt-1">
                    {formikEmployee.errors[field]}
                  </div>
                )}
              </div>
            ))}
            {formikEmployee.status && (
              <div className="text-green-600 font-medium mt-2">
                {formikEmployee.status}
              </div>
            )}
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Creează angajat
            </button>
          </form>
        </section>

        {/* Adăugare categorie */}
        <section className="flex-1 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-black text-2xl mb-4">Adaugă categorie nouă</h3>
          <form onSubmit={formikCategory.handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-black">Nume categorie</label>
              <input
                name="categoryName"
                type="text"
                onChange={formikCategory.handleChange}
                onBlur={formikCategory.handleBlur}
                value={formikCategory.values.categoryName}
                className="border border-gray-300 p-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
              {formikCategory.touched.categoryName && formikCategory.errors.categoryName && (
                <div className="text-red-500 text-sm mt-1">
                  {formikCategory.errors.categoryName}
                </div>
              )}
            </div>
            {formikCategory.status && (
              <div className="text-green-600 font-medium mt-2">
                {formikCategory.status}
              </div>
            )}
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Creează categorie
            </button>
          </form>
        </section>

        {/* Adăugare produs */}
        <section className="flex-1">
          <AddProductForm />
        </section>
      </div>
    </div>
  );
}
