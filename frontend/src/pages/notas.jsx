import React, { useState, useEffect } from 'react';

export default function NotasPage() {
  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [notas, setNotas] = useState([]);
  const [form, setForm] = useState({ alumnoId: '', materiaId: '', valor: '' });

  // Carga inicial de datos 
  useEffect(() => {
    const cargarDatos = async () => {
      // Cargamos Alumnos
      const resAl = await fetch('https://jsonplaceholder.typicode.com/users');
      const dataAl = await resAl.json();
      setAlumnos(dataAl);

      // Cargamos Materias
      const resMat = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      const dataMat = await resMat.json();
      setMaterias(dataMat.map(m => ({ id: m.id, nombre: m.title.substring(0, 15) })));

      // Cargamos Notas (Simuladas)
      const resNot = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10');
      const dataNot = await resNot.json();
      setNotas(dataNot.map(n => ({
        id: n.id,
        alumnoNombre: dataAl[0]?.name || "Alumno Prueba",
        materiaNombre: "Matemáticas",
        valor: (Math.random() * 5).toFixed(1) 
      })));
    };
    cargarDatos();
  }, []);

  const guardarNota = (e) => {
    e.preventDefault();
    const al = alumnos.find(a => a.id === parseInt(form.alumnoId));
    const mat = materias.find(m => m.id === parseInt(form.materiaId));

    const nueva = {
      id: Date.now(),
      alumnoNombre: al ? al.name : 'N/A',
      materiaNombre: mat ? mat.nombre : 'N/A',
      valor: form.valor
    };

    setNotas([nueva, ...notas]);
    setForm({ alumnoId: '', materiaId: '', valor: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
  
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-white/50">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
          Registrar Calificación
        </h3>
        <form onSubmit={guardarNota} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <select 
            className="p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10"
            value={form.alumnoId}
            onChange={e => setForm({...form, alumnoId: e.target.value})}
            required
          >
            <option value="">Seleccionar Alumno</option>
            {alumnos.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>

          <select 
            className="p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10"
            value={form.materiaId}
            onChange={e => setForm({...form, materiaId: e.target.value})}
            required
          >
            <option value="">Seleccionar Materia</option>
            {materias.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
          </select>

          <input 
            type="number" step="0.1" max="5" min="0" placeholder="Nota (0-5)"
            className="p-4 bg-white border border-slate-200 rounded-2xl outline-none"
            value={form.valor}
            onChange={e => setForm({...form, valor: e.target.value})}
            required
          />

          <button className="py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-600/20">
            Registrar
          </button>
        </form>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-white/50">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-widest border-b border-slate-100">
              <th className="pb-4 font-bold">Estudiante</th>
              <th className="pb-4 font-bold">Materia</th>
              <th className="pb-4 font-bold text-center">Nota</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {notas.map(n => (
              <tr key={n.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-5 font-bold text-slate-700">{n.alumnoNombre}</td>
                <td className="py-5 text-slate-500">{n.materiaNombre}</td>
                <td className="py-5 text-center">
                  <span className={`px-4 py-1.5 rounded-full font-black text-sm ${parseFloat(n.valor) >= 3 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {n.valor}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}