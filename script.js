const cursos = [
  // Año 1
  { nombre: "Filosofía", abre: ["Epistemología de las ciencias sociales"] },
  { nombre: "Psicología", abre: ["Procesos psicológicos básicos"] },
  { nombre: "Métodos de la investigación social" },
  { nombre: "Historia social de Chile" },
  { nombre: "Psicobiología", abre: ["Neurofisiología"] },
  { nombre: "Curso transversal Facso 1" },
  { nombre: "Inglés I", abre: ["Inglés II"] },

  { nombre: "Epistemología de las ciencias sociales" },
  { nombre: "Psicología de la personalidad", abre: ["Psicopatología"] },
  { nombre: "Procesos psicológicos básicos" },
  { nombre: "Estadística I", abre: ["Estadística II"] },
  { nombre: "Procesos básicos de aprendizaje" },
  { nombre: "CFG" },
  { nombre: "Inglés II", abre: ["Inglés III"] },

  // Año 2
  { nombre: "Teorías y sistemas psicológicos" },
  { nombre: "Psicopatología", abre: ["Psiquiatría"] },
  { nombre: "Psicología del desarrollo I", abre: ["Psicología del desarrollo II"] },
  { nombre: "Estadística II" },
  { nombre: "Psicología social I", abre: ["Psicología social II", "Psicología del trabajo y las organizaciones"] },
  { nombre: "Neurofisiología", abre: ["Neurociencia cognitiva"] },
  { nombre: "Inglés III", abre: ["Inglés IV"] },

  { nombre: "Introducción a la evaluación psicológica", abre: ["Psicología jurídica"] },
  { nombre: "Psiquiatría", abre: ["Psicología clínica"] },
  { nombre: "Psicología del desarrollo II", abre: ["Psicología educacional"] },
  { nombre: "Metodología cualitativa" },
  { nombre: "Psicología social II", abre: ["Psicología comunitaria", "Psicología educacional"] },
  { nombre: "Neurociencia cognitiva" },
  { nombre: "Curso deportivo/artístico" },
  { nombre: "Inglés IV" },
  { nombre: "Curso transversal Facso II" },

  // Año 3
  { nombre: "Psicología del trabajo y las organizaciones" },
  { nombre: "Psicología clínica" },
  { nombre: "Psicología educacional" },
  { nombre: "Psicología jurídica" },
  { nombre: "Psicología comunitaria" },

  // Año 4
  { nombre: "Cursos optativos" },
  { nombre: "Curso transversal Facso III" },
  { nombre: "Seminario de grado I", abre: ["Seminario de grado II"] },

  { nombre: "Seminario de grado II" },
  { nombre: "Curso transversal Facso IV" },

  // Año 5
  { nombre: "Práctica profesional I" },
  { nombre: "Seminario de práctica I" },
  { nombre: "Cursos de formación profesional" },
  { nombre: "Practica profesional II" },
];

const estadoCursos = {}; // nombre: 'bloqueado' | 'desbloqueado' | 'aprobado'

function inicializarMalla() {
  const malla = document.getElementById("malla");

  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.className = "ramo";
    div.innerText = curso.nombre;
    div.dataset.nombre = curso.nombre;
    malla.appendChild(div);

    // Si ningún ramo lo desbloquea, es libre
    const tieneRequisito = cursos.some(c => (c.abre || []).includes(curso.nombre));
    estadoCursos[curso.nombre] = tieneRequisito ? "bloqueado" : "desbloqueado";
  });

  actualizarVisual();
  agregarListeners();
}

function actualizarVisual() {
  document.querySelectorAll(".ramo").forEach(div => {
    const nombre = div.dataset.nombre;
    div.className = "ramo " + estadoCursos[nombre];
  });
}

function agregarListeners() {
  document.querySelectorAll(".ramo").forEach(div => {
    div.addEventListener("click", () => {
      const nombre = div.dataset.nombre;
      const estado = estadoCursos[nombre];
      if (estado !== "desbloqueado") return;

      estadoCursos[nombre] = "aprobado";

      // Desbloquear los cursos que dependen de este
      const cursoActual = cursos.find(c => c.nombre === nombre);
      if (cursoActual?.abre) {
        cursoActual.abre.forEach(cursoAbierto => {
          // Verificar si TODOS sus requisitos han sido aprobados
          const requisitos = cursos.filter(c => c.abre?.includes(cursoAbierto));
          const todosAprobados = requisitos.every(r => estadoCursos[r.nombre] === "aprobado");
          if (todosAprobados) {
            estadoCursos[cursoAbierto] = "desbloqueado";
          }
        });
      }

      actualizarVisual();
    });
  });
}

window.onload = inicializarMalla;
