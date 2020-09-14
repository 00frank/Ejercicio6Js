// Para hacer: cambiar la forma en la que se muestra el monto y el total de forma que quede como
// viene en el html, ej: $55,00 || $-123,55

var table = document.querySelector("table");                //selecciona la tabla
var lastTR = table.insertRow(table.rows.length);            //inserta una fila en la ultima posicion
var spanTotal = document.querySelector("span");             //selecciona el span para despues actualizarlo
var total = spanTotal.innerText;                            //selecciona el total(primer span en el html)
total = parseFloat(total.replace("$", "")).toFixed(2);      //agrega dos decimales y parsea a float
//este total es el primer valor que se muestra, en este caso $55,00

const consulta = "<tr><td>Tipo de movimiento: <select name=\"opcmov\" id=\"opcmov\" required><option value=\"default\" disabled selected>Seleccione una opción</option><option value=\"mov1\">Extracción</option><option value=\"mov2\">Deposito</option></select></td><td><input type=\"number\" name=\"importe\" id=\"importe\" required></td><td><input type=\"submit\" value=\"Confirmar\" onclick=\"operacion()\"></td></tr>"
lastTR.innerHTML = (consulta);                              //inserta el "menu" en la ultima fila

const inputMonto = document.getElementById("importe");
const inputMovimiento = document.getElementById("opcmov");

function operacion() {
    //funcion llamada en el evento "onclick" del input:submit
    var monto = inputMonto.value;
    var mov = inputMovimiento.value;
    monto = (mov == "mov1") ? (-monto) : monto;     //si el movimiento es "Extracción" monto sera negativo
    monto = parseFloat(monto).toFixed(2);           //agrega dos decimales (en caso de no tenerlos) y parsea a float
    monto = parseFloat(monto.replace(".", ","));    //cambia los puntos por comas y vuelve a parsear

    insertarOperacion(monto);
    // alert("Operacion realizada con exito");
    limpiarInputs();
}

function insertarOperacion(monto) {
    var fecha = generarFecha();
    var operacionclass = (monto < 0) ? "text-danger" : "text-success"; //dependiendo el monto se asignara una clase u otra
    total = getTotal();
    var newTotal = generarTotal(monto);
    var UltimaOperacion = table.insertRow(table.rows.length - 1); //agrega fila en la anteultima posicion
    const ultOperacion = "<tr><td>" + fecha + "</td><td class=\"" + operacionclass + "\">$" + monto + "</td><td>$" + newTotal + "</td></tr>"

    UltimaOperacion.innerHTML = ultOperacion;
    actualizarTotal(newTotal);
}

function generarFecha() {
    //Funcion para generar la fecha actual en formato dd/mm/yyyy
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

function generarTotal(monto) {
    var result = parseFloat(total) + parseFloat(monto);
    return result;
}

function limpiarInputs() {
    inputMonto.value = "";
    inputMovimiento.value = "default";
}

function actualizarTotal(total) {
    spanTotal.innerText = "$" + total;
}

function getTotal() {
    total = spanTotal.innerText;
    total = parseFloat(total.replace("$", "")).toFixed(2);
    return total;
}
