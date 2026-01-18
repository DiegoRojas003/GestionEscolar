import React, { useState, useEffect } from 'react';

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Estado inicial con todos los campos necesarios
  const initialForm = {
    nombre: '',
    apellido: '',
    email: '',
    fecha_nacimiento: ''
  };
  const [form, setForm] = useState(initialForm);

  // URL base de tu API de Spring Boot
  const API_URL = 'http://localhost:8080/alumnos';

  // Listar (GET)
  const cargarAlumnos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAlumnos(data);
    } catch (error) {
      console.error("Error cargando alumnos:", error);
    }
  };

  useEffect(() => { cargarAlumnos(); }, []);

  // Crear o Actualizar (POST/PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    const datosParaEnviar = {
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,
      fecha_nacimiento: form.fecha_nacimiento
    };

    if (editingId) {
      datosParaEnviar.id = editingId;
    }

    try {
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosParaEnviar)
      });

      if (res.ok) {
        setForm({ nombre: '', apellido: '', email: '', fecha_nacimiento: '' });
        setEditingId(null);
        cargarAlumnos();
      } else {
        const errorJson = await res.json();
        console.log("Detalles del error 400:", errorJson);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const prepararEdicion = (alumno) => {
    setForm({
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      email: alumno.email,
      fecha_nacimiento: alumno.fecha_nacimiento
    });
    setEditingId(alumno.id);
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este alumno?")) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      cargarAlumnos();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6">
      {/* Formulario */}
      <div className="lg:col-span-4 bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/40 h-fit">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className={`w-2 h-8 rounded-full ${editingId ? 'bg-orange-500' : 'bg-blue-600'}`}></span>
          {editingId ? 'Editar Alumno' : 'Nuevo Registro'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10"
            placeholder="Nombre" value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })} required
          />
          <input
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10"
            placeholder="Apellido" value={form.apellido}
            onChange={(e) => setForm({ ...form, apellido: e.target.value })} required
          />
          <input
            type="email"
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10"
            placeholder="Email (her@example.com)" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} required
          />
          <input
            type="date"
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10"
            value={form.fecha_nacimiento}
            onChange={(e) => setForm({ ...form, fecha_nacimiento: e.target.value })} required
          />
          <button className={`w-full py-4 text-white font-bold rounded-2xl transition-all ${editingId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-slate-900 hover:bg-blue-600'}`}>
            {editingId ? 'Actualizar Datos' : 'Guardar Alumno'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm(initialForm) }} className="w-full text-slate-500 text-sm hover:underline">
              Cancelar Edición
            </button>
          )}
        </form>
      </div>

      {/* Tabla */}
      <div className="lg:col-span-8 bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-widest">
                <th className="pb-4">Nombre Completo</th>
                <th className="pb-4">Email</th>
                <th className="pb-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {alumnos.map(al => (
                <tr key={al.id} className="hover:bg-white/50 transition-all">
                  <td className="py-4 font-medium text-slate-700">{al.nombre} {al.apellido}</td>
                  <td className="py-4 text-slate-500 text-sm">{al.email}</td>
                  <td className="py-4 text-right space-x-3">
                    <button onClick={() => prepararEdicion(al)} className="text-blue-600 hover:text-blue-800 font-bold text-sm">Editar</button>
                    <button onClick={() => eliminar(al.id)} className="text-red-500 hover:text-red-700 font-bold text-sm">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}