import React, { useState, useEffect } from 'react';

const Materias = () => {
  const [materias, setMaterias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

 const API_URL = 'http://localhost:8080/alumnos';

  // 1. (GET)
  const cargarMaterias = async () => {
    try {
      setLoading(true);
      const res = await fetch(URL);
      const data = await res.json();
      setMaterias(data);
    } catch (error) {
      console.error("Error cargando materias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMaterias();
  }, []);

  // 2. CREAR Y EDITAR
  const handleSubmit = async (e) => {
    e.preventDefault();
    const metodo = editingId ? 'PUT' : 'POST';
    const urlFinal = editingId ? `${URL}/${editingId}` : URL;

    try {
      const res = await fetch(urlFinal, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre })
      });

      if (res.ok) {
        setNombre('');
        setEditingId(null);
        cargarMaterias();
      }
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // 3. PREPARAR EDICIÓN
  const prepararEdicion = (materia) => {
    setNombre(materia.nombre);
    setEditingId(materia.id);
  };

  // 4. ELIMINAR (DELETE)
  const eliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta materia? Se perderán las notas asociadas.")) {
      try {
        await fetch(`${URL}/${id}`, { method: 'DELETE' });
        cargarMaterias();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
      
     
      <div className="lg:col-span-4">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-8 rounded-[2.5rem] shadow-xl shadow-indigo-900/5">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <span className={`w-2 h-8 rounded-full ${editingId ? 'bg-amber-500' : 'bg-indigo-600'}`}></span>
            {editingId ? 'Editar Materia' : 'Nueva Materia'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-bold text-slate-500 ml-1">Nombre de la Asignatura</label>
              <input 
                type="text" 
                className="w-full mt-1.5 px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                placeholder="Ej. Cálculo Integral"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit"
              className={`w-full py-4 font-bold rounded-2xl transition-all shadow-lg active:scale-95 ${
                editingId 
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20' 
                : 'bg-slate-900 hover:bg-indigo-600 text-white shadow-slate-900/20'
              }`}
            >
              {editingId ? 'Guardar Cambios' : 'Registrar Materia'}
            </button>

            {editingId && (
              <button 
                type="button" 
                onClick={() => { setEditingId(null); setNombre(''); }}
                className="w-full py-2 text-slate-400 text-sm font-medium hover:text-slate-600 transition-colors"
              >
                Cancelar edición
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="lg:col-span-8">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-8 rounded-[2.5rem] shadow-xl shadow-indigo-900/5 min-h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-800">Materias Activas</h3>
            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest">
              {materias.length} Registradas
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materias.map((m) => (
                <div 
                  key={m.id} 
                  className="group p-5 bg-white border border-slate-100 rounded-3xl hover:border-indigo-200 hover:shadow-md transition-all flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="Spec 12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.247 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="font-bold text-slate-700">{m.nombre}</span>
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => prepararEdicion(m)}
                      className="p-2 text-amber-500 hover:bg-amber-50 rounded-xl transition-colors"
                      title="Editar"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button 
                      onClick={() => eliminar(m.id)}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors"
                      title="Eliminar"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
              
              {materias.length === 0 && !loading && (
                <div className="col-span-full py-10 text-center text-slate-400 italic">
                  No hay materias creadas.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Materias;