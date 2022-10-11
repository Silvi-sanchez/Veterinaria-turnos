import {useState, useEffect} from 'react';
import Formulario from './components/Formulario'; 
import Cita from './components/Cita';

function App() {

  //Citas en el localStorage
  //Estado de todas las citas
  const [citas, setCitas]= useState(JSON.parse(localStorage.getItem('citas')) || []);


  useEffect(() => {
      localStorage.setItem('citas', JSON.stringify(citas))
  }, [citas])

  //Funcion que tome todas las citas y agregue una nueva
  const crearCita = cita =>{
    setCitas([
      ...citas,
      cita
    ])
  };

  //Funcion encargada de eliminar tarjetas(citas)
  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    setCitas(nuevasCitas);
  }


  return (
    <div>
      <h1 className='portada'>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
            crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{citas.length === 0 ? 'No hay citas' : 'Administra tus citas'}</h2>
            {citas.map(cita => (
              <Cita
              cita={cita}
              key={cita.id}
              eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;