const catchError = require('../utils/catchError');
const Caracterization = require('../models/Caracterization');
const Capitalization = require('../models/Capitalization'); 
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');



const uploadBulk = catchError(async (req, res) => {
    try {
        if (!req.file) {
            console.log('No se proporcionó ningún archivo CSV.');
            return res.status(400).json({ error: 'No se proporcionó ningún archivo CSV.' });
        }

        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csvParser())
            .on('data', (data) => {
                console.log('Datos del archivo CSV:', data);
                results.push(data);
            })
            .on('end', async () => {
                console.log('Datos del archivo CSV procesados con éxito:', results);
                // Procesar los datos del archivo CSV y crear instancias de Caracterization
                await Caracterization.bulkCreate(results);
                console.log('Carga masiva exitosa.');
                res.json({ message: 'Carga masiva exitosa' });
            });
    } catch (error) {
        console.error('Error processing bulk upload:', error);
        res.status(500).json({ error: error.message }); // Devuelve el mensaje de error al cliente
    }
});


const getAll = catchError(async (req, res) => {
    const results = await Caracterization.findAll({
        order: [['id', 'DESC']]
    });
    return res.json(results);
});


const create = catchError(async (req, res) => {
    const {
        codigoActividad,
        etapaProceso,
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        tipoDocumento,
        numeroDocumento,
        tipoParticipante,
        otraCual,
        registradoRUR,
        nacionalidad,
        otraNacionalidad,
        edad,
        sexoGenero,
        reconocimientoLGBTIQ,
        etnia,
        tipoDiscapacidad,
        departamento,
        ciudadMunicipio,
        localidad,
        zonaGeografica,
        registradoSISBENIV,
        afiliadoEPSSubsidiado,
        nombreEPSSubsidiada,
        afiliadoEPSContributivo,
        nombreEPSContributiva,
        numeroCelularPrincipal,
        numeroCelularOpcional,
        correoElectronico,
        direccionResidencia,
        barrioResidencia,
        tieneHijos,
        cantidadHijos,
        hijosEscolarizados,
        familiaNoAfiliadaEPS,
        jefeHogar,
        parentescoJefeHogar,
        situacionMigratoria,
        razonMigracion,
        otraRazonMigracion,
        tiempoViviendoColombia,
        tiempoViviendoVenezuela,
        grupoPoblacional,
        nivelEducativo,
        programaFormacionTitulo,
        areaSectorFormacion,
        paisEstudios,
        titulosConvalidados,
        estudiandoActualmente,
        ocupacionPrincipal,
        tipoEmpleo,
        emprendimientoAnteriorPais,
        otroPaisEmprendimiento,
        estadoNegocio,
        empleosGeneradosEmprendimiento,
        empleadosTemporales,
        ubicacionEmprendimiento,
        otraUbicacionEmprendimiento,
        barrioSectorEmprendimiento,
        descripcionNegocio,
        diferenciacionCompetencia,
        registradoEntidades,
        numeroRUTNIT,
        nombreEmprendimiento,
        tiempoInicioOperacion,
        sectorPrincipal,
        actividadEconomica,
        categoriaEmprendimiento,
        ingresosVentas,
        valorPromedioVentasMes,
        valorAnualVentas,
        productosServiciosOfrecidos,
        relAsesor,
        estado
    } = req.body;

    try {
        // Crear una nueva caracterización
        const caracterization = await Caracterization.create({
            codigoActividad,
            etapaProceso,
            primerNombre,
            segundoNombre,
            primerApellido,
            segundoApellido,
            tipoDocumento,
            numeroDocumento,
            tipoParticipante,
            otraCual,
            registradoRUR,
            nacionalidad,
            otraNacionalidad,
            edad,
            sexoGenero,
            reconocimientoLGBTIQ,
            etnia,
            tipoDiscapacidad,
            departamento,
            ciudadMunicipio,
            localidad,
            zonaGeografica,
            registradoSISBENIV,
            afiliadoEPSSubsidiado,
            nombreEPSSubsidiada,
            afiliadoEPSContributivo,
            nombreEPSContributiva,
            numeroCelularPrincipal,
            numeroCelularOpcional,
            correoElectronico,
            direccionResidencia,
            barrioResidencia,
            tieneHijos,
            cantidadHijos,
            hijosEscolarizados,
            familiaNoAfiliadaEPS,
            jefeHogar,
            parentescoJefeHogar,
            situacionMigratoria,
            razonMigracion,
            otraRazonMigracion,
            tiempoViviendoColombia,
            tiempoViviendoVenezuela,
            grupoPoblacional,
            nivelEducativo,
            programaFormacionTitulo,
            areaSectorFormacion,
            paisEstudios,
            titulosConvalidados,
            estudiandoActualmente,
            ocupacionPrincipal,
            tipoEmpleo,
            emprendimientoAnteriorPais,
            otroPaisEmprendimiento,
            estadoNegocio,
            empleosGeneradosEmprendimiento,
            empleadosTemporales,
            ubicacionEmprendimiento,
            otraUbicacionEmprendimiento,
            barrioSectorEmprendimiento,
            descripcionNegocio,
            diferenciacionCompetencia,
            registradoEntidades,
            numeroRUTNIT,
            nombreEmprendimiento,
            tiempoInicioOperacion,
            sectorPrincipal,
            actividadEconomica,
            categoriaEmprendimiento,
            ingresosVentas,
            valorPromedioVentasMes,
            valorAnualVentas,
            productosServiciosOfrecidos,
            relAsesor,
            estado
        });

        // Crear una nueva capitalización con el id de la caracterización recién creada
        const capitalization = await Capitalization.create({
            relCaracterization: caracterization.id,
            // Otros campos de la capitalización que necesites completar
        });

        // Enviar la respuesta al cliente con el resultado de la creación de la caracterización y la capitalización
        return res.status(201).json({
            caracterization,
            capitalization
        });
    } catch (error) {
        console.error('Error creating caracterization and capitalization:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Caracterization.findByPk(id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
});



const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Caracterization.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Caracterization.update(req.body, { where: { id }, returning: true });
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const updateBulk = catchError(async (req, res) => {
    try {
        const { selectedIds, relAsesor } = req.body;

        // Actualizar varios registros
        await Caracterization.update(
            { relAsesor }, // Campos a actualizar
            { where: { id: selectedIds } } // Condición para actualizar múltiples registros
        );

        res.json({ message: 'Caracterizaciones actualizadas con éxito' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
});


// Controlador para subir archivos
const uploadFile = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }
    
        const caracterization = await Caracterization.findByPk(req.params.id);
        if (!caracterization) {
            return res.status(404).json({ message: 'Caracterization not found' });
        }
    
        // Obtener las rutas de los archivos ya almacenados
        let existingFilePaths = [];
    
        if (caracterization.archivoRuta && typeof caracterization.archivoRuta === 'string' && caracterization.archivoRuta.trim() !== '') {
            console.log('Existing file paths:', caracterization.archivoRuta);
            try {
                existingFilePaths = JSON.parse(caracterization.archivoRuta);
                if (!Array.isArray(existingFilePaths)) {
                    throw new Error('Existing file paths is not an array');
                }
            } catch (e) {
                console.error('Error parsing existing file paths:', e);
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
    
        // Asegurarse de que existingFilePaths sea un array
        if (!Array.isArray(existingFilePaths)) {
            console.error('Existing file paths is not an array:', existingFilePaths);
            return res.status(500).json({ message: 'Internal server error' });
        }
    
        // Añadir las nuevas rutas al array existente
        const newFilePaths = req.files.map(file => file.path);
        existingFilePaths.push(...newFilePaths);
    
        // Convertir el array de rutas a una cadena JSON válida
        const filePathsString = JSON.stringify(existingFilePaths);
    
        caracterization.archivoRuta = filePathsString;
        await caracterization.save();
        
        return res.status(200).json({ message: 'Files uploaded successfully', filePaths: existingFilePaths });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


  const downloadFile = async (req, res) => {
    try {
      const filePath = req.query.filePath; // Obtener la ruta del query parameter
      if (!filePath) {
        return res.status(400).json({ message: 'File path is required' });
      }
  
      return res.download(filePath);  // Enviar el archivo como respuesta
    } catch (error) {
      console.error('Error downloading file:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  

  const deleteFile = async (req, res) => {
    try {
      const caracterizationId = req.params.id;
      const filePathToDelete = req.body.filePath;
  
      // Verificar si el archivo existe en la base de datos
      const caracterization = await Caracterization.findOne({ where: { id: caracterizationId } });
      if (!caracterization) {
        return res.status(404).json({ message: 'Characterization not found' });
      }
  
      let existingFilePaths = [];
  
      // Obtener las rutas de los archivos ya almacenados
      if (caracterization.archivoRuta) {
        try {
          existingFilePaths = JSON.parse(caracterization.archivoRuta);
        } catch (e) {
          console.error('Error parsing existing file paths:', e);
          return res.status(500).json({ message: 'Internal server error' });
        }
      }
  
      // Eliminar el archivo del sistema de archivos
      if (fs.existsSync(filePathToDelete)) {
        fs.unlinkSync(filePathToDelete);
      }
  
      // Actualizar la lista de archivos en la base de datos
      const updatedFilePaths = existingFilePaths.filter(filePath => filePath !== filePathToDelete);
      caracterization.archivoRuta = JSON.stringify(updatedFilePaths);
      await caracterization.save();
  
      return res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    updateBulk,
    uploadBulk,
    uploadFile,
    downloadFile,
    deleteFile
};
