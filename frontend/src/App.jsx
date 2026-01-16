import React, { useState } from 'react';
import Alumnos from './pages/alumnos';
import Materias from './pages/Materias';
import Notas from './pages/notas';

export default function App() {
  const [tab, setTab] = useState('alumnos');
  
  // Llamada al api
  const [listaAlumnos, setListaAlumnos] = useState([]);
  const [listaMaterias, setListaMaterias] = useState([]);

  return (
    <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-indigo-100 p-8">
      <header className="mb-10 text-center">
  <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 mb-2">
    Academy<span className="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Flow</span>
  </h1>
  <p className="text-slate-500 font-medium text-sm">
    Exitos perro que yo se que le va a ir bien ponga el titulo acá el archivo se encuentra en src/app.jsx
  </p>
</header>
      <div className="max-w-6xl mx-auto">
       
        <nav className="flex justify-center mb-12">
          <div className="bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl border border-white shadow-sm flex gap-2">
            {['alumnos', 'materias', 'notas'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-8 py-2.5 rounded-xl font-bold transition-all uppercase text-xs tracking-widest ${
                  tab === t ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </nav>

      
        {tab === 'alumnos' && <Alumnos onUpdate={setListaAlumnos} />}
        {tab === 'materias' && <Materias onUpdate={setListaMaterias} />}
        {tab === 'notas' && <Notas alumnos={listaAlumnos} materias={listaMaterias} />}
      </div>
    </div>
  );
}