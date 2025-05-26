// pages/AdminDashboard.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { token } = useAuth();

  const formik = useFormik({
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

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Panou Admin</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-3">
        {['username', 'email', 'password'].map((field) => (
          <div key={field}>
            <label className="block mb-1 font-medium">
              {field === 'username' ? 'Nume' : field === 'email' ? 'Email' : 'Parola'}
            </label>
            <input
              name={field}
              type={field === 'password' ? 'password' : 'text'}
              onChange={formik.handleChange}
              value={formik.values[field]}
              className="border p-2 w-full rounded"
            />
            {formik.touched[field] && formik.errors[field] && (
              <div className="text-red-500 text-sm mt-1">{formik.errors[field]}</div>
            )}
          </div>
        ))}
        {formik.status && (
          <div className="text-red-500 text-sm font-medium">{formik.status}</div>
        )}
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Creează angajat
        </button>
      </form>
    </div>
  );
}
