$(function() {
  const tasks = JSON.parse(localStorage.getItem("todos")) || [];
  //console.log(guid());

  const updateLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  };

  const posIndex = hash => {
    return tasks.findIndex(v => v.id === hash);
  };

  const deleteTask = indice => {
    const newIndex = posIndex(indice);
    swal(
      {
        title: "¿Estás Segur@?",
        text: `¿Deseas eliminar la tarea "${tasks[newIndex].name}"?`,
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Si, lo deseo",
        cancelButtonText: "No, cancelar",
        closeOnConfirm: true,
        closeOnCancel: false
      },
      function(isConfirm) {
        if (isConfirm) {
          tasks.splice(newIndex, 1);
          $(`#newtask_${indice}`).hide("slow", function(e) {
            $(this).remove();
          });
          updateLocalStorage();
          swal({
            title: "Proceso realizado",
            text: "Se ha eliminado la tarea",
            type: "success"
          });
        } else {
          swal({
            title: "Cancelar",
            text: "Se ha cancelado la acción",
            timer: 2000,
            type: "error"
          });
        }
      }
    );
  };

  const finishTask = indice => {
    const newIndex = posIndex(indice);
    $(`#newtask_${indice}`).css(
      "text-decoration",
      !tasks[newIndex].finish ? "line-through" : "none"
    );
    tasks[newIndex].finish = !tasks[newIndex].finish;
    updateLocalStorage();
  };

  const addTask = (task, indice, finish = false) => {
    updateLocalStorage();
    $("#tasks").append(
      `<div id='newtask_${indice}' style="text-decoration : ${
        finish ? "line-through" : "none"
      }">${task} - <a href="#" id="delete_${indice}">Eliminar</a> | <a href="#" id="finish_${indice}">Terminado</a></div> </div>`
    );
    $(`#delete_${indice}`).click(function(e) {
      //console.log(this.id.split("_")[1]);
      deleteTask(this.id.split("_")[1]);
    });
    $(`#finish_${indice}`).click(function(e) {
      finishTask(this.id.split("_")[1]);
    });
  };

  const loadTask = () => {
    for (let i = 1; i <= tasks.length; i++) {
      addTask(tasks[i - 1].name, tasks[i - 1].id, tasks[i - 1].finish);
    }
  };

  loadTask();

  /*
  text-decoration: line-through;
  */

  $("#saveTask").click(e => {
    //Validar que el campo no esté vacío...
    const $newTask = $("#task").val();
    if ($newTask.length !== 0) {
      const idTask = guid();
      tasks.push({
        id: idTask,
        name: $newTask,
        finish: false
      });
      addTask($newTask, idTask);
      $("#task")
        .val("")
        .focus();
    } else {
      $("#task").focus();
      //alert("Por favor escribe una tarea");
      swal({
        title: "Error",
        text: "Por favor escribe una tarea",
        type: "error"
      });
    }
  });

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }
});
