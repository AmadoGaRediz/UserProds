const socket=io();

//MOSTRAR USUARIOS
socket.on("servidorEnviarUsuarios",(usuarios)=>{
    var tr="";
    //<td>${usuario._id}</td>
    usuarios.forEach((usuario,idLocal)=>{
        tr=tr+`
            <tr>
                <td>${(idLocal+1)*100}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.password}</td>
                <td>
                    <a href="#" onclick="editarUsuario('${usuario._id}')">Editar</a> / 
                    <a href="#" onclick="borrarUsuario('${usuario._id}')">Borrar</a>
                </td>
            </tr>
        `;
    });
    document.getElementById("datos").innerHTML=tr;
});
//FIN MOSTRAR USUARIOS


//GUARDAR USUARIO
var formNuevoUsuario=document.getElementById("formNuevoUsuario");
var datos=document.getElementById("datos");
var mensajes=document.getElementById("mensajes");
formNuevoUsuario.addEventListener("submit",(e)=>{
    e.preventDefault();
    var usuario={
        id:document.getElementById("id").value,
        nombre:document.getElementById("nombre").value,
        usuario:document.getElementById("usuario").value,
        password:document.getElementById("password").value
    }
    socket.emit("clienteGuardarUsuario", usuario);
    socket.on("servidorUsuarioGuardado",(mensaje)=>{
        console.log("Usuario guardado");
        mensajes.innerHTML=mensaje;
        document.getElementById("nombre").value="";
        document.getElementById("usuario").value="";
        document.getElementById("password").value="";
        document.getElementById("nombre").focus();
        setTimeout(()=>{mensajes.innerHTML=""},3000);
    });
});
//FIN GUARDAR USUARIO


//EDITAR USUARIO PARTE1
function editarUsuario(id){
    console.log("Estas en editar usuario "+id);
    socket.emit("clienteObtenerUsuarioId",id);
    socket.on("servidorObtenerUsuarioId",(usuario)=>{
        document.getElementById("tituloFormulario").innerHTML="Editar usuario";
        document.getElementById("textoBoton").innerHTML="Editar usuario"
        document.getElementById("id").value=usuario._id;
        document.getElementById("nombre").value=usuario.nombre;
        document.getElementById("usuario").value=usuario.usuario;
        document.getElementById("password").value=usuario.password;
    });
}
//FIN EDITAR USUARIO PARTE1

//BORRAR USUARIO
function borrarUsuario(id){
    socket.emit("clienteBorrarUsuario",id);
}
//FIN BORRAR USUARIO



//-------------Productos-----------------------

// Mostrar productos
socket.on("servidorEnviarProductos", (productos) => {
    let tr = "";
    productos.forEach((producto, idLocal) => {
        tr += `
            <tr>
                <td>${(idLocal + 1) * 100}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.cantidad}</td>
                <td>
                    <a href="#" onclick="editarProducto('${producto._id}')">Editar</a> / 
                    <a href="#" onclick="borrarProducto('${producto._id}')">Borrar</a>
                </td>
            </tr>
        `;
    });
    document.getElementById("datosProductos").innerHTML = tr;
});

// Guardar producto
const formNuevoProducto = document.getElementById("formNuevoProducto");
const mensajesProducto = document.getElementById("mensajesProducto");

formNuevoProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    const producto = {
        id: document.getElementById("idProducto").value,
        nombre: document.getElementById("nombreProducto").value,
        precio: document.getElementById("precioProducto").value,
        descripcion: document.getElementById("descripcionProducto").value,
        cantidad: document.getElementById("cantidadProducto").value
    };
    socket.emit("clienteGuardarProducto", producto);
    socket.on("servidorProductoGuardado", (mensaje) => {
        console.log("Producto guardado");
        mensajesProducto.innerHTML = mensaje;
        document.getElementById("nombreProducto").value = "";
        document.getElementById("precioProducto").value = "";
        document.getElementById("descripcionProducto").value = "";
        document.getElementById("cantidadProducto").value = "";
        document.getElementById("nombreProducto").focus();
        setTimeout(() => { mensajesProducto.innerHTML = ""; }, 3000);
    });
});

// Editar producto
function editarProducto(id) {
    console.log("Estás editando el producto " + id);
    socket.emit("clienteObtenerProductoId", id);
    socket.on("servidorObtenerProductoId", (producto) => {
        document.getElementById("idProducto").value = producto._id;
        document.getElementById("nombreProducto").value = producto.nombre;
        document.getElementById("precioProducto").value = producto.precio;
        document.getElementById("descripcionProducto").value = producto.descripcion;
        document.getElementById("cantidadProducto").value = producto.cantidad;
    });
}

// Borrar producto
function borrarProducto(id) {
    socket.emit("clienteBorrarProducto", id);
}