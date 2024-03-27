//const usuario = require("../modelos/usuario");
const Usuario =  require ("../modelos/usuario");
const Producto = require("../modelos/producto");

function socket(io){
    io.on("connection",(socket)=>{
        mostrarUsuarios();
        

        //MOSTRAR USUARIOS
        async function mostrarUsuarios(){
            try{
                var usuarios=await Usuario.find();
                //console.log(usuarios);
                io.emit("servidorEnviarUsuarios",usuarios);
            }
            catch(err){
                console.log("Error al obtener los usuarios");
            }
        }
        //GUARDAR USUARIOS
        socket.on("clienteGuardarUsuario",async(usuario)=>{
                try{
                    if(usuario.id==""){
                        await new Usuario(usuario).save();
                        io.emit("servidorUsuarioGuardado","Usuario guardado correctamente");    
                    }
                    else{
                        await Usuario.findByIdAndUpdate(usuario.id, usuario)
                        io.emit("servidorUsuarioGuardado","Usuario actualizado");
                    }
                    mostrarUsuarios();
                }
                catch(err){
                    console.log("Error al registrar al usuario");
                }
        });

        //OBTENER USUARIO POR ID
        socket.on("clienteObtenerUsuarioId",async(id)=>{
            io.emit("servidorObtenerUsuarioId",await Usuario.findById(id));
        });
        //BORRA USUARIO POR ID
        socket.on("clienteBorrarUsuario",async(id)=>{
            await Usuario.deleteOne({_id:id});
            mostrarUsuarios();
        });

//---------------productos-----------

// Mostrar productos
mostrarProductos();
async function mostrarProductos() {
    try {
        const productos = await Producto.find();
        io.emit("servidorEnviarProductos", productos);
    } catch (err) {
        console.log("Error al obtener los productos");
    }
}

        // Agregar productos
socket.on("clienteGuardarProducto", async (producto) => {
    try {
        if (producto.id == "") {
            await new Producto(producto).save();
            io.emit("servidorProductoGuardado", "Producto guardado correctamente");
        } else {
            await Producto.findByIdAndUpdate(producto.id, producto);
            io.emit("servidorProductoGuardado", "Producto actualizado");
        }
        mostrarProductos();
    } catch (err) {
        console.log("Error al registrar el producto");
    }
});

// Obtener producto por ID
socket.on("clienteObtenerProductoId", async (id) => {
    io.emit("servidorObtenerProductoId", await Producto.findById(id));
});

// Eliminar producto por ID
socket.on("clienteBorrarProducto", async (id) => {
    await Producto.deleteOne({ _id: id });
    mostrarProductos();
});



    });
}
module.exports=socket;