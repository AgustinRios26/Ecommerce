# Ecommerce

<h3>Backend deploy: <a href="https://ecommerce-agr.herokuapp.com/">Backend</a> </h3>
<h3>Documentacion Postman: <a href="https://documenter.getpostman.com/view/20685324/VUqrMGEy">Postman</a> </h3>

<br>
<hr>

## Backend
**Usando NodeJs con Express y MongoDB para la base de datos. Token encriptado con JSONWebToken** <br>
*Usuarios con rol de admin tienen acceso a todas las peticiones*
*Pago a traves de Stripe en proceso.*

### Usuarios

El usuario requiere nombre, email y password <br>
En caso de tener una cuenta podemos logearnos con el mail y la contraseña, en caso que no tengamos cuenta podemos registrarnos 
(esta pensado para que el rol se crea automaticamente en 1) <br>
La sesion es un token que se guarda por 7 dias, se almacena en una cookie <br>
Se crea codigo para administrar los errores de inicio de sesion, ya sea datos incorrectos como en caso de registrarse y ya esta registrado ese email <br>
Tambien se crea una validación verificando si el usuario esta logeado solamente para que sea utilizado por el frontend. <br>
*Solo el admin puede ver todos los usuarios* <br>



### Productos

Los productos requieren de nombre, descripcion, precio, imagen, stock, categoria y keywords (palabras clave). <br>
Podemos ver todos los productos publicados, los cuales se mostraran con una paginacion de hasta 20 productos <br>
Podemos publicar productos en la pagina (las imagenes se tienen que subir en formato url con terminacion .jpg o .png) <br>
Podemos obtener todos los productos por vendedor <br>
Además, podremos filtrar por nombre, categoria, y precio (precio menor a:... , y precio mayor a:... ) <br>


### Carrito
Se le asigna a cada usuario un carrito en especifico, con lo cual vamos a poder realizar diferentes consultas <br>
Entre ellas las de consultar los productos del carrito, agregar productos al carrito y eliminar productos del carrito <br>
Tambien vamos a poder pagar los productos que tengamos en el carrito<br>

<br>
<hr>
