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

//Update put
route.put('/:id', async(req, resp) =>{

       try {

               const cursoActualizado = await Curso.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!cursoActualizado){
                    return resp.status(404).json({mesaje: "Curso no encontrado"});
               }
            
               resp.status(200).json(cursoActualizado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Delete 
route.delete('/:id', async(req, resp) =>{

       try {

               const cursoEliminado = await Curso.findByIdAndDelete(
                         req.params.id,
                    );

               if (!cursoEliminado){
                    return resp.status(404).json({mesaje: "Curso no encontrado"});
               }
            
               resp.status(200).json({mesaje : 'Curso eliminado'});
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