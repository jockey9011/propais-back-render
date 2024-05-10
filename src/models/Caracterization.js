const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Caracterization = sequelize.define('caracterization', {
  codigoActividad: {
    type: DataTypes.STRING,
    allowNull: true
  },
  etapaProceso: {
    type: DataTypes.STRING,
    allowNull: true
  },
  primerNombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  segundoNombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  primerApellido: {
    type: DataTypes.STRING,
    allowNull: true
  },
  segundoApellido: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tipoDocumento: {
    type: DataTypes.STRING,
    allowNull: true
  },
  numeroDocumento: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tipoParticipante: {
    type: DataTypes.STRING,
    allowNull: true
  },
  otraCual: {
    type: DataTypes.STRING,
    allowNull: true
  },
  registradoRUR: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nacionalidad: {
    type: DataTypes.STRING,
    allowNull: true
  },
  otraNacionalidad: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nacionalidad1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nacionalidad2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  sexoGenero: {
    type: DataTypes.STRING,
    allowNull: true
  },
  reconocimientoLGBTIQ: {
    type: DataTypes.STRING,
    allowNull: true
  },
  etnia: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tipoDiscapacidad: {
    type: DataTypes.STRING,
    allowNull: true
  },
  departamento: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ciudadMunicipio: {
    type: DataTypes.STRING,
    allowNull: true
  },
  localidad: {
    type: DataTypes.STRING,
    allowNull: true
  },
  zonaGeografica: {
    type: DataTypes.STRING,
    allowNull: true
  },
  registradoSISBENIV: {
    type: DataTypes.STRING,
    allowNull: true
  },
  afiliadoEPSSubsidiado: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nombreEPSSubsidiada: {
    type: DataTypes.STRING,
    allowNull: true
  },
  afiliadoEPSContributivo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nombreEPSContributiva: {
    type: DataTypes.STRING,
    allowNull: true
  },
  numeroCelularPrincipal: {
    type: DataTypes.STRING,
    allowNull: true
  },
  numeroCelularOpcional: {
    type: DataTypes.STRING,
    allowNull: true
  },
  correoElectronico: {
    type: DataTypes.STRING,
    allowNull: true
  },
  direccionResidencia: {
    type: DataTypes.STRING,
    allowNull: true
  },
  barrioResidencia: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tieneHijos: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cantidadHijos: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hijosEscolarizados: {
    type: DataTypes.STRING,
    allowNull: true
  },
  familiaNoAfiliadaEPS: {
    type: DataTypes.STRING,
    allowNull: true
  },
  jefeHogar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  parentescoJefeHogar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  situacionMigratoria: {
    type: DataTypes.STRING,
    allowNull: true
  },
  razonMigracion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  otraRazonMigracion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tiempoViviendoColombia: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tiempoViviendoVenezuela: {
    type: DataTypes.STRING,
    allowNull: true
  },
  grupoPoblacional: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nivelEducativo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  programaFormacionTitulo: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  areaSectorFormacion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  paisEstudios: {
    type: DataTypes.STRING,
    allowNull: true
  },
  titulosConvalidados: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estudiandoActualmente: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ocupacionPrincipal: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tipoEmpleo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  emprendimientoAnteriorPais: {
    type: DataTypes.STRING,
    allowNull: true
  },
  otroPaisEmprendimiento: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estadoNegocio: {
    type: DataTypes.STRING,
    allowNull: true
  },
  empleosGeneradosEmprendimiento: {
    type: DataTypes.STRING,
    allowNull: true
  },
  empleadosTemporales: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ubicacionEmprendimiento: {
    type: DataTypes.STRING,
    allowNull: true
  },
  otraUbicacionEmprendimiento: {
    type: DataTypes.STRING,
    allowNull: true
  },
  barrioSectorEmprendimiento: {
    type: DataTypes.STRING,
    allowNull: true
  },
  descripcionNegocio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  diferenciacionCompetencia: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  registradoEntidades: {
    type: DataTypes.STRING,
    allowNull: true
  },
  numeroRUTNIT: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nombreEmprendimiento: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tiempoInicioOperacion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sectorPrincipal: {
    type: DataTypes.STRING,
    allowNull: true
  },
  actividadEconomica: {
    type: DataTypes.STRING,
    allowNull: true
  },
  categoriaEmprendimiento: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ingresosVentas: {
    type: DataTypes.STRING,
    allowNull: true
  },
  valorPromedioVentasMes: {
    type: DataTypes.STRING,
    allowNull: true
  },
  valorAnualVentas: {
    type: DataTypes.STRING,
    allowNull: true
  },
  productosServiciosOfrecidos: {
    type: DataTypes.STRING,
    allowNull: true
  },
  relAsesor:{
    type: DataTypes.INTEGER,
    allowNull: true
  }, 
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  estado: {
    type: DataTypes.ENUM('caracterización', 'formación', 'capitalización', 'retirado'), 
    allowNull: true
  },
  archivoRuta: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const filePaths = this.getDataValue('archivoRuta');
      return filePaths ? JSON.parse(filePaths) : [];
    },
    set(value) {
      this.setDataValue('archivoRuta', JSON.stringify(value));
    }
  }


});



module.exports = Caracterization;
