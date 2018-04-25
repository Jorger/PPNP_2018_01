$(function() {
  const faces = [];

  const validateFace = face => {
    const haveNose = face[1] === "-" || face[1] === "~";
    return (
      (face[0] === ":" || face[0] === ";") &&
      (face[haveNose ? 2 : 1] === ")" || face[haveNose ? 2 : 1] === "D")
    );
  };

  function countSmileys(faces) {
    let numSmiles = 0;
    if (faces.length !== 0) {
      for (let i = 0; i < faces.length; i++) {
        // numSmiles += validateFace(faces[i]) ? 1 : 0;
        numSmiles += +validateFace(faces[i]);
      }
      // for (let face of faces) {
      //   numSmiles += validateFace(face) ? 1 : 0;
      // }
    }
    return numSmiles;
  }

  $("#saveFace").click(e => {
    //Validar que el campo no esté vacío...
    const $newFace = $("#face").val();
    if ($newFace.length !== 0) {
      faces.push($newFace);
      $("#faces").append(`<div>${$newFace}</div>`);
      $("#face")
        .val("")
        .focus();
      $("#numFaces").html(
        `Número de Rostros encontrados : ${countSmileys(faces)}`
      );
    }
  });
});
