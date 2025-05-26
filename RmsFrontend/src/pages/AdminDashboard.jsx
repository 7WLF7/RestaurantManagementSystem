// pages/AdminDashboard.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required()
    }),
    onSubmit: async (vals, { setStatus, resetForm }) => {
      try {
        const res = await fetch(
          'http://localhost:5049/api/Auth/register-employee',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ${token}'
            },
            body: JSON.stringify(vals)
          }
        );
        if (!res.ok) throw new Error(await res.text());
        setStatus('Angajat creat cu succes!');
        resetForm();
      } catch (e) {
        setStatus(e.message);
      }
    }
  });

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Panou Admin</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-3">
        {['name','email','password'].map(field => (
          <div key={field}>
            <label className="block capitalize">{field}</label>
            <input
              name={field}
              type={field === 'password' ? 'password' : 'text'}
              onChange={formik.handleChange}
              value={formik.values[field]}
              className="border p-2 w-full"
            />
          </div>
        ))}
        {formik.status && <div className="text-red-500">{formik.status}</div>}
        <button type="submit" className="bg-black text-white px-4 py-2">
          Creează angajat
        </button>
      </form>
    </div>
  );
}
