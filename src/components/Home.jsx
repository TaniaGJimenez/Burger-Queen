import '../Assets/Home.css'
import { Link } from 'react-router-dom';
import logoBurgerQueen  from '../Assets/logo-Bq.png'
export function Home() {
    return (
      <div className='containerHome'>
        <figure className="logo-container">
          <img src={logoBurgerQueen} alt="Burger Queen Logotipo" className='logo'/>
        </figure>
         <form>
            <h1 className="titulo">BIENVENIDO</h1>
            <label htmlFor="usuario" className="etiqueta formulario">USUARIO</label>
            <div className='opacityLabel'>
            <input
              type="text"
              id="usuario"
              placeholder="Ingrese su correo electrónico"
              className="input formulario"
            /></div>
            <label htmlFor="contrasena" className="etiqueta formulario">CONTRASEÑA</label>
            <input
              type="password"
              id="contrasena"
              placeholder="Ingresa tu contraseña"
              className="input formulario"
            />
            <Link to="/waiter-view" className="boton formulario">INICIAR SESIÓN</Link>
          </form>
      </div>
    );
  }
  
  