document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

/**
 * Task form
 */
const taskForm = document.querySelector("#taskForm");
console.log(taskForm["dniPropietario"].value)

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const dniPropietario = taskForm["dniPropietario"].value;
  const dniInquilino = taskForm["dniInquilino"].value;
  const datosImnueble = taskForm["datosInmueble"].value;
  const caracteristicasImnueble = taskForm["caracteristicasInmueble"].value;
  const plazoAlquiler = taskForm["plazoAlquiler"].value;
  const montoAlquiler = taskForm["montoAlquiler"].value;
  const moraDiaria = taskForm["moraDiaria"].value;
  App.createTask(dniPropietario, dniInquilino, datosImnueble, caracteristicasImnueble, plazoAlquiler, montoAlquiler, moraDiaria);
});
