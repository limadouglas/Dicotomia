$(function() {
    var a = -1,
        b = 0,
        c = 0,
        cAux = 0,
        numLinhas = 1;;

    while (true) {

        cAux = c;
        c = (a + b) / 2;

        // condição de parada
        if ((Math.abs(cAux - c)) < 0.00001 || numLinhas > 100) {
            break;
        } else {
            addLinhas(numLinhas++, a, b, c, funcao(a), funcao(b), funcao(c));
        }

        if ((funcao(b) >= 0 && funcao(c) >= 0) || (funcao(b) < 0 && funcao(c) < 0)) {
            b = c;
        } else {
            a = c;
        }
    }

    //  1=1 ->c sobrescreve b
    // -1=1->c sobrescreve a
});



// calculando função.
function funcao(x) {
    return x - 0.0001;
}



// adicionando linha na tabela.
function addLinhas(numLinhas, a, b, c, fa, fb, fc) {
    var newRow = $("<tr>");
    var cols = "";
    cols += '<th scope="row">' + numLinhas + '</th>';
    cols += '<td>' + a + '</td>';
    cols += '<td>' + b + '</td>';
    cols += '<td>' + c + '</td>';
    cols += '<td>' + fa + '</td>';
    cols += '<td>' + fb + '</td>';
    cols += '<td>' + fc + '</td>';

    newRow.append(cols);

    $("#tabela-dicotomia").append(newRow);

}