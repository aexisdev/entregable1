//? importando express..
const express = require('express');
//? creando servidor.
const app = express();
//? modulos de trabajo.
const path = require('path');
const fs = require('fs/promises');
//? app.use
app.use(express.json());


//TODO/ METODO GET. OBTENER

//? Ruta del archivo app.json.
const jsonPath = path.resolve('./file/app.json');

app.get('/app', async (req, res) => {
    //* Obteniendo el json.
    const jsonFile = await fs.readFile(jsonPath, 'utf8');
    res.send(jsonFile);
});

//TODO/ METODO POST. CREAR

app.post('/app', async (req, res) => {
    //*Enviar la informacion al json.   
    //? chores = tareas.
    const chores = req.body;
    //*Obtener arreglo desde jsonFile.
    const appArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
    //*Agregar tarea y id.
    const lastApp = appArray.length - 1;
    const newIdApp = appArray[lastApp].id + 1;
    appArray.push({...chores, id: newIdApp});
    // //* Escribiendo en la nueva informacion en el arreglo.
    await fs.writeFile(jsonPath, JSON.stringify(appArray));
    res.end(); 
});

//TODO/ METODO PUT. ACTUALIZAR

app.put('/app', async (req, res) => {
    //*Actualizacion del usuario.
    //*Obtener arreglo desde jsonFile.
    const appArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
    //*Obteniendo los elementos del body.
    const {name, tarea, hora, tarde, id} = req.body;
    //*Buscando el id de los usuarios para actualizar.
    const choresIndex = appArray.findIndex(chores => chores.id === id);
    // console.log(choresIndex);
    if(choresIndex >= 0){
        appArray[choresIndex].name = name;
        appArray[choresIndex].tarea = tarea;
        appArray[choresIndex].hora = hora;
        appArray[choresIndex].tarde = tarde;
    };
    // console.log(appArray);
    //*Escribir de nuevo en el arreglo.
    await fs.writeFile(jsonPath, JSON.stringify(appArray));
    res.send('Usuario actualizado...'); 
});

//TODO/ METODO DELETE. Eliminar

app.delete('/app', async (req, res) => {
    //*Obtener arreglo desde jsonFile.
    const appArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
    //*Encontrar el id del usuario.
    const {id} = req.body;
    //*Encontrar al usuario a eliminar (id).
    const choresIndex = appArray.findIndex(chores => chores.id === id);
    //*Eliminado del arreglo.
    appArray.splice(choresIndex, 1);
    //*Escribir de nuevo de informacion en el arreglo.
    await fs.writeFile(jsonPath, JSON.stringify(appArray));
    res.end();
});

//?Puerto del servidor.
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto ${PORT}`);
});