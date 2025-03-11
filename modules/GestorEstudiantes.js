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
  