import {useState} from 'react';
import { v4 as uuidv4 } from "uuid";
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

  //Crear el estado de las citas 
  const [cita, setCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  })

  //Creando estado del error
  const [error, setError] = useState(false);

  //Para dar mensj al usuario que sus datos se guardaron bien
  const [mensajeEnviado, setMensajeEnviado] = useState(false);


  const handlerState = e => {
    setCita({
      //Nos traemos una copia con los puntos
      ...cita,
    [e.target.name]: e.target.value
    })
   }

  //Extraer valores de las citas
  const {mascota, propietario, fecha, hora, sintomas} = cita;


  //Cuando el usuario presione agregar cita
  const submitCita = e => {
    e.preventDefault();

    //Validar
    if(
       mascota.trim() === '' ||
       propietario.trim() === '' ||
       fecha.trim() === '' ||
       hora.trim() === '' ||
       sintomas.trim() === '' 
    ){
       setError(true);
       return;
    }
    setError(false);

    //Agregar un ID
    cita.id = uuidv4();;

    //Crear una cita
    crearCita(cita)

    //Mostramos mensaje de exito
    setMensajeEnviado(true)
    //Ocultar el mensaje de exito
    setTimeout(() =>{
        setMensajeEnviado(false)
    },3000)

    //Limpiar formulario
    setCita({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })
  }

  return(
    <>
      <h2>Crear cita</h2>
       {error ? <p className="alerta-error">Todos los campos son obligatorios!</p> : null} 
       {mensajeEnviado ? <p className="alerta-enviado">Sus datos fueron guardados exitosamente!</p> : null} 
       {/* {error && <p className="alerta-error">Todos los campos son obligatorios</p>}  */}
      <form
        onSubmit={submitCita}
      >
        <label>Nombre de Mascota</label>
        <input 
          type="text" 
          name="mascota"
          className="u-full-width"
          placeholder="Nombre mascota"
          value={mascota}
          onChange={handlerState}
        />
        <label>Nombre del Dueño</label>
        <input 
          type="text" 
          name="propietario"
          className="u-full-width"
          placeholder="Nombre del dueño de la mascota"
          value={propietario}
          onChange={handlerState}
        />
        <label>Fecha Ingreso</label>
        <input 
          type="date" 
          name="fecha"
          className="u-full-width"
          value={fecha}
          onChange={handlerState}
        />
        <label>Hora Ingreso</label>
        <input 
          type="time" 
          name="hora"
          className="u-full-width"
          value={hora}
          onChange={handlerState}
        />
        <label>Síntomas</label>
        <textarea 
          name="sintomas"
          className="u-full-width"
          placeholder="¿Cuales son los síntomas?"
          value={sintomas}
          onChange={handlerState}
        ></textarea>
        <button
          type="submit"
          className="u-full-width button-primary"
        >
          Agregar Cita
        </button>
      </form>
    </>
  );
};

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;
