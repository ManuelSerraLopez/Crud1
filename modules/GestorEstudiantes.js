export class GestorEstudiantes {
    constructor() {
      this.estudiantes = [];
    }
  
    crear(nombre, edad, nivel) {
      const id = this.estudiantes.length + 1;
      this.estudiantes.push({ id, nombre, edad, nivel });
    }
  
    listar() {
      return this.estudiantes;
    }
  
    actualizar(id, nombre, edad, nivel) {
      for (let i = 0; i < this.estudiantes.length; i++) {
        if (this.estudiantes[i].id === id) {
          this.estudiantes[i] = { id, nombre, edad, nivel };
          return true;
        }
      }
      return false;
    }
  
    eliminar(id) {
      for (let i = 0; i < this.estudiantes.length; i++) {
        if (this.estudiantes[i].id === id) {
          this.estudiantes.splice(i, 1);
          return true;
        }
      }
      return false;
    }
  }
  
  listarEstudiantes(); {
    return this.estudiantes.map(e => ({ nombre: e.nombre, nivel: e.nivel }));
  }

  buscarEstudiante(criterio); {
    return this.estudiantes.find(e => e.id === criterio || e.nombre.toLowerCase() === criterio.toLowerCase());
  }
  promedioPorEstudiante(); {
    return this.estudiantes.map(e => {
      const notas = Object.values(e.calificaciones || {});
      const promedio = notas.length ? (notas.reduce((acc, val) => acc + val, 0) / notas.length) : 0;
      return { nombre: e.nombre, promedio: promedio.toFixed(2), nivel: e.nivel };
    });
  }
  
  estudiantesConPromedioMayor(umbral); {
    return this.promedioPorEstudiante().filter(e => parseFloat(e.promedio) > umbral);
  }
  
  aprobadosYReprobadosPorMateria(materia, umbral = 60); {
    const resultados = { aprobados: [], reprobados: [] };
    this.estudiantes.forEach(e => {
      if (e.calificaciones && e.calificaciones[materia] !== undefined) {
        const calificacion = e.calificaciones[materia];
        if (calificacion >= umbral) {
          resultados.aprobados.push({ nombre: e.nombre, calificacion });
        } else {
          resultados.reprobados.push({ nombre: e.nombre, calificacion });
        }
      }
    });
    return resultados;
  }

  promedioGeneralGrupo(); {
    const calificacionesTotales = this.estudiantes.flatMap(e => Object.values(e.calificaciones || {}));
    const promedio = calificacionesTotales.reduce((acc, val) => acc + val, 0) / calificacionesTotales.length;
    return promedio.toFixed(2);
  }
  
  