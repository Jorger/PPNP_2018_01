$(function() {
  const automorphic = n => {
    const square = String(n ** 2);
    return (
      +square.substr(square.length - String(n).length, String(n).length) === n
    );
  };

  $("#validateNumber").click(function(e) {
    //Validar que el campo no esté vacío...
    const $numberValidate = $("#numberValidate").val();
    //Validar si es un número...
    if (!isNaN($numberValidate) && $numberValidate.length !== 0) {
      const numberAutomorphic = automorphic(+$numberValidate);
      $("#answer")
        .html(
          `El número ${$numberValidate} ${
            numberAutomorphic ? "<em>ES</em>" : "<em>NO ES</em>"
          } automorphic`
        )
        .css({ color: numberAutomorphic ? "blue" : "red" });
    } else {
      alert("Por favor digita un número");
      $("#numberValidate").focus();
    }
  });
});
