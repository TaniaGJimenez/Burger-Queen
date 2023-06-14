import '../Assets/Home.css';
import axios from 'axios';
import { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import logoBurgerQueen from '../Assets/logo-Bq.png';

export function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleErrors = (error) => {
    let errorMessage = '';

    if (error.response) {
      if (error.response.status === 400) {
        errorMessage = 'Ingrese un correo y contraseña validos';
      } else if (error.response.status === 404) {
        errorMessage = 'Verifique su usuario y contraseña';
      }
    } else {
      errorMessage = 'Error al procesar la solicitud';
    }

    setError(errorMessage);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:8080/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Navegar a diferentes rutas según el rol del usuario
        if (user.role === 'waiter') {
          navigate('/waiter-view');
        } else if (user.role === 'admin') {
          navigate('/admin-view');
        } else if (user.role === 'kitchen') {
          navigate('/kitchen-view');
        }
      })
      .catch((error) => {
        handleErrors(error);
      });
  };

  return (
    <div className="containerHome">
      <figure className="logo-container">
        <img src={logoBurgerQueen} alt="Burger Queen Logotipo" className="logo" />
      </figure>
      <form onSubmit={handleSubmit}>
        <h1 className="titulo">BIENVENIDO</h1>
        <label htmlFor="usuario" className="etiqueta formulario">
          USUARIO
        </label>
        <div className="opacityLabel">
          <input
            type="text"
            id="usuario"
            placeholder="Ingrese su correo electrónico"
            className="input formulario"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <label htmlFor="contrasena" className="etiqueta formulario">
          CONTRASEÑA
        </label>
        <input
          type="password"
          id="contrasena"
          placeholder="Ingresa tu contraseña"
          className="input formulario"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" className="boton formulario">
          INICIAR SESIÓN
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}


// export function Home(){
//   return <h1>Waiter View</h1>
// }
// //? Realizar la solicitud de autenticación para obtener el token
// fetch('http://localhost:8080/login', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     email: 'grace.hopper@systers.xyz',
//     password: '123456'
//   })
// })
//   .then(res => res.json())
//   .then(data => {
//     const token = data.token;

//   //? Usar el token para realizar las demás solicitudes

//   //? Obtener la lista de usuarios
//     fetch('http://localhost:8080/users', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log('Usuarios:', data);
//       })
//       .catch(error => {
//         console.error('Error al obtener la lista de usuarios:', error);
//       });

//     //? Obtener la lista de productos
//     fetch('http://localhost:8080/products', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log('Productos:', data);
//       })
//       .catch(error => {
//         console.error('Error al obtener la lista de productos:', error);
//       });

//     //? Obtener la lista de pedidos
//     fetch('http://localhost:8080/orders', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log('Pedidos:', data);
//       })
//       .catch(error => {
//         console.error('Error al obtener la lista de pedidos:', error);
//       });

//     //? Actualizar un pedido existente
//     const orderId = 2;
//     fetch(`http://localhost:8080/orders/${orderId}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         status: 'delivered',
//         dateProcessed: '2022-03-05 16:00'
//       })
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log('Pedido actualizado:', data);
//       })
//       .catch(error => {
//         console.error('Error al actualizar el pedido:', error);
//       });

//     //? Crear un nuevo pedido
//     fetch('http://localhost:8080/orders', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         client: 'Harry Potter',
//         products: [
//           {
//             qty: 1,
//             product: {
//               id: 1,
//               name: 'Sandwich de jamón y queso',
//               price: 1000,
//               image: 'https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png',
//               type: 'Desayuno',
//               dateEntry: '2022-03-05 15:14:10'
//             }
//           },
//           {
//             qty: 1,
//             product: {
//               id: 2,
//               name: 'Café americano',
//               price: 500,
//               image: 'https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png',
//               type: 'Desayuno',
//               dateEntry: '2022-03-05 15:14:10'
//             }
//           }
//         ],
//         status: 'pending',
//         dataEntry: '2022-03-05 15:00'
//       })
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log('Nuevo pedido creado:', data);
//       })
//       .catch(error => {
//         console.error('Error al crear el nuevo pedido:', error);
//       });
//   })
//   .catch(error => {
//     console.error('Error en la solicitud de autenticación:', error);
//   });
