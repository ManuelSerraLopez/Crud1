import readline from 'readline';
import { GestorEstudiantes } from './modules/GestorEstudiantes.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const gestor = new GestorEstudiantes();

function mostrarMenu() {
  console.log('\n--- Menú CRUD y Reportes Académicos ---');
  console.log('1. Crear estudiante');
  console.log('2. Listar estudiantes');
  console.log('3. Buscar estudiante (por ID o Nombre)');
  console.log('4. Actualizar estudiante');
  console.log('5. Eliminar estudiante');
  console.log('6. Calcular promedios por estudiante');
  console.log('7. Filtrar estudiantes por promedio superior a un umbral');
  console.log('8. Generar reporte completo');
  console.log('9. Salir');
  rl.question('Seleccione una opción: ', manejarOpcion);
}

function manejarOpcion(opcion) {
  switch (opcion) {
    case '1': // Crear Estudiante
      rl.question('Nombre: ', (nombre) => {
        rl.question('Edad: ', (edad) => {
          rl.question('Nivel: ', (nivel) => {
            rl.question('Calificaciones (ejemplo: Matematicas=90,Programacion=85): ', (calificaciones) => {
              const parsedCalificaciones = Object.fromEntries(
                calificaciones.split(',').map(pair => pair.split('=').map(value => isNaN(value) ? value : Number(value)))
              );
              gestor.crear(nombre, parseInt(edad), nivel, parsedCalificaciones);
              console.log('Estudiante creado exitosamente.');
              mostrarMenu();
            });
          });
        });
      });
      break;

    case '2': // Listar Estudiantes
      console.log('\nLista de Estudiantes:', gestor.listar());
      mostrarMenu();
      break;

    case '3': // Buscar Estudiante por ID o Nombre
      rl.question('Ingrese ID o Nombre del estudiante: ', (criterio) => {
        const resultado = gestor.buscarEstudiante(isNaN(criterio) ? criterio : parseInt(criterio));
        console.log(resultado || 'Estudiante no encontrado.');
        mostrarMenu();
      });
      break;

    case '4': // Actualizar Estudiante
      rl.question('ID del estudiante a actualizar: ', (id) => {
        rl.question('Nuevo Nombre: ', (nombre) => {
          rl.question('Nueva Edad: ', (edad) => {
            rl.question('Nuevo Nivel: ', (nivel) => {
              rl.question('Nuevas Calificaciones (ejemplo: Matematicas=90,Programacion=85): ', (calificaciones) => {
                const parsedCalificaciones = Object.fromEntries(
                  calificaciones.split(',').map(pair => pair.split('=').map(value => isNaN(value) ? value : Number(value)))
                );
                if (gestor.actualizar(parseInt(id), nombre, parseInt(edad), nivel, parsedCalificaciones)) {
                  console.log('Estudiante actualizado exitosamente.');
                } else {
                  console.log('Estudiante no encontrado.');
                }
                mostrarMenu();
              });
            });
          });
        });
      });
      break;

    case '5': // Eliminar Estudiante
      rl.question('ID del estudiante a eliminar: ', (id) => {
        if (gestor.eliminar(parseInt(id))) {
          console.log('Estudiante eliminado exitosamente.');
        } else {
          console.log('Estudiante no encontrado.');
        }
        mostrarMenu();
      });
      break;

    case '6': // Calcular Promedios por Estudiante
      console.log('\nPromedios por Estudiante:', gestor.promedioPorEstudiante());
      mostrarMenu();
      break;

    case '7': // Filtrar Estudiantes por Promedio Superior
      rl.question('Ingrese el umbral del promedio: ', (umbral) => {
        console.log('\nEstudiantes con Promedio Mayor:', gestor.estudiantesConPromedioMayor(parseFloat(umbral)));
        mostrarMenu();
      });
      break;

    case '8': // Generar Reporte Completo
      console.log('\n--- Reporte Completo de Rendimiento Académico ---');
      const reporte = gestor.reporteRendimientoAcademico();
      console.log(reporte);
      mostrarMenu();
      break;

    case '9': // Salir
      console.log('Saliendo del programa...');
      rl.close();
      break;

    default:
      console.log('Opción inválida. Intente de nuevo.');
      mostrarMenu();
  }
}

mostrarMenu();
