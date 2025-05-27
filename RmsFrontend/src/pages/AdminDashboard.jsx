// pages/AdminDashboard.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';

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
    initialValues: {
      categoryName: ''
    },
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

  // --- Produs ---
  const formikProduct = useFormik({
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
      pret: Yup.number().typeError('Prețul trebuie să fie un număr').positive('Prețul trebuie să fie pozitiv').required('Prețul este obligatoriu'),
      cantitateStoc: Yup.number().typeError('Cantitatea trebuie să fie un număr').min(0, 'Cantitatea nu poate fi negativă').required('Cantitatea este obligatorie')
    }),
    onSubmit: async (vals, { setStatus, resetForm }) => {
      try {
        const payload = {
          categorieNume: vals.categorieNume,
          name: vals.name,
          description: vals.description,
          pret: parseFloat(vals.pret),
          cantitateStoc: parseInt(vals.cantitateStoc, 10)
        };
        const res = await fetch('http://localhost:5049/api/produse/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(await res.text());
        setStatus('Produs adăugat cu succes!');
        resetForm();
      } catch (e) {
        setStatus('Eroare: ' + e.message);
      }
    }
  });

  return (
    <div className="p-8 min-w-screen">
      <h2 className="text-3xl font-semibold mb-6"></h2>
      <div className="flex space-x-6 ">
        {/* Creare angajat */}
        <section className="flex-1 border p-6 rounded shadow">
          <h3 className="text-2xl mb-4">Creează angajat</h3>
          <form onSubmit={formikEmployee.handleSubmit} className="space-y-4">
            {['username', 'email', 'password'].map((field) => (
              <div key={field}>
                <label className="block mb-1 font-medium">
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
                  className="border p-2 w-full rounded"
                />
                {formikEmployee.touched[field] && formikEmployee.errors[field] && (
                  <div className="text-red-500 text-sm mt-1">
                    {formikEmployee.errors[field]}
                  </div>
                )}
              </div>
            ))}
            {formikEmployee.status && (
              <div className="text-green-600 font-medium">{formikEmployee.status}</div>
            )}
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Creează angajat
            </button>
          </form>
        </section>

        {/* Adăugare categorie */}
        <section className="flex-1 border p-6 rounded shadow">
          <h3 className="text-2xl mb-4">Adaugă categorie nouă</h3>
          <form onSubmit={formikCategory.handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Nume categorie</label>
              <input
                name="categoryName"
                type="text"
                onChange={formikCategory.handleChange}
                onBlur={formikCategory.handleBlur}
                value={formikCategory.values.categoryName}
                className="border p-2 w-full rounded"
              />
              {formikCategory.touched.categoryName && formikCategory.errors.categoryName && (
                <div className="text-red-500 text-sm mt-1">
                  {formikCategory.errors.categoryName}
                </div>
              )}
            </div>
            {formikCategory.status && (
              <div className="text-green-600 font-medium">{formikCategory.status}</div>
            )}
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Creează categorie
            </button>
          </form>
        </section>

        {/* Adăugare produs */}
        <section className="flex-1 border p-6 rounded shadow">
          <h3 className="text-2xl mb-4">Adaugă produs nou</h3>
          <form onSubmit={formikProduct.handleSubmit} className="space-y-4">
            {[
              { name: 'categorieNume', label: 'Categorie' },
              { name: 'name', label: 'Nume produs' },
              { name: 'description', label: 'Descriere', type: 'text' },
              { name: 'pret', label: 'Preț', type: 'number' },
              { name: 'cantitateStoc', label: 'Cantitate în stoc', type: 'number' }
            ].map(({ name, label, type }) => (
              <div key={name}>
                <label className="block mb-1 font-medium">{label}</label>
                <input
                  name={name}
                  type={type || 'text'}
                  onChange={formikProduct.handleChange}
                  onBlur={formikProduct.handleBlur}
                  value={formikProduct.values[name]}
                  className="border p-2 w-full rounded"
                />
                {formikProduct.touched[name] && formikProduct.errors[name] && (
                  <div className="text-red-500 text-sm mt-1">
                    {formikProduct.errors[name]}
                  </div>
                )}
              </div>
            ))}
            {formikProduct.status && (
              <div className="text-green-600 font-medium">{formikProduct.status}</div>
            )}
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Adaugă produs
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
