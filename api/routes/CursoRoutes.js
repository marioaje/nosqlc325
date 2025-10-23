const express = require('express');
const route = express.Router();

const Curso = require('../models/Curso');


//Crear un nuevo curso
route.post('/', async(req, resp) =>{
        const { nombre,
                descripcion, 
                estado, 
                correo } = req.body;


       const nuevoCurso = new Curso (
                { nombre,
                    descripcion, 
                    estado, 
                    correo }
       );    
       
       try {
            const cursoGuardado = await nuevoCurso.save();
            resp.status(201).json(cursoGuardado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Obtener dats
route.get('/', async(req, resp) =>{
               try {
                         const cursoDatos = await Curso.find();
                         resp.json(cursoDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

// route.get('/', async(req, resp) =>{

//       }
// );

module.exports = route;