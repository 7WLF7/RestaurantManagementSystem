import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';

export default function AddProductForm({ onSuccess }) {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);

  // Fetch categories for dropdown
  useEffect(() => {
    fetch('http://localhost:5049/api/Categorie', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setCategories)
      .catch(err => console.error('Eroare la preluarea categoriilor:', err));
  }, [token]);

  const formik = useFormik({
    initialValues: {
      categorieNume: '',
      name: '',
      description: '',
      pret: '',
      cantitateStoc: ''
    },
    validationSchema: Yup.object({
      categorieNume: Yup.string().required('Categoria este obligatorie'),
      name: Yup.string().required('Numele produsului este obligatoriu'),
      description: Yup.string().required('Descrierea este obligatorie'),
      pret: Yup.number()
        .typeError('Prețul trebuie să fie un număr')
        .positive('Prețul trebuie să fie pozitiv')
        .required('Prețul este obligatoriu'),
      cantitateStoc: Yup.number()
        .typeError('Cantitatea trebuie să fie un număr întreg')
        .integer('Cantitatea trebuie să fie un număr întreg')
        .min(0, 'Cantitatea nu poate fi negativă')
        .required('Cantitatea în stoc este obligatorie')
    }),
    onSubmit: async (values, { setStatus, resetForm }) => {
      try {
        const res = await fetch('http://localhost:5049/api/produse/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...values,
            pret: parseFloat(values.pret),
            cantitateStoc: parseInt(values.cantitateStoc, 10)
          })
        });
        const text = await res.text();
        if (!res.ok) throw new Error(text || 'Eroare la adăugarea produsului');
        setStatus('Produs adăugat cu succes!');
        resetForm();
        if (onSuccess) onSuccess();
      } catch (err) {
        setStatus(err.message);
        console.error(err);
      }
    }
  });

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-md mx-auto">
      <h3 className="text-black text-2xl font-semibold mb-4">Adaugă produs nou</h3>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Category dropdown */}
        <div>
          <label className="block mb-1 font-medium text-black">Categorie</label>
          <select
            name="categorieNume"
            value={formik.values.categorieNume}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 rounded-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">— selectează —</option>
            {categories.map(c => (
              <option key={c.id} value={c.nume} className="text-black">
                {c.nume}
              </option>
            ))}
          </select>
          {formik.touched.categorieNume && formik.errors.categorieNume && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.categorieNume}</p>
          )}
        </div>

        {/* Other fields with visible borders */}
        {[
          { name: 'name', label: 'Nume produs', type: 'text' },
          { name: 'description', label: 'Descriere', type: 'text' },
          { name: 'pret', label: 'Preț', type: 'number' },
          { name: 'cantitateStoc', label: 'Cantitate în stoc', type: 'number' }
        ].map(({ name, label, type }) => (
          <div key={name}>
            <label className="block mb-1 font-medium text-black">{label}</label>
            <input
              name={name}
              type={type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[name]}
              className="border border-gray-300 rounded-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            {formik.touched[name] && formik.errors[name] && (
              <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
            )}
          </div>
        ))}

        {/* Status message */}
        {formik.status && (
          <div
            className={
              formik.status.startsWith('Produs adăugat')
                ? 'text-green-600 font-medium'
                : 'text-red-600 font-medium'
            }
          >
            {formik.status}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Adaugă produs
        </button>
      </form>
    </div>
  );
}
