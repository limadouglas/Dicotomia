// evento click botão
$('#calcular').click(function() {
    limparTabela();
    dicotomia();
});


// evento enter edittext
$('#fun').on('keypress', function(e) {
    if (e.which === 13) {
        limparTabela();
        dicotomia();

        // desabilitando caixa de texto
        $(this).attr("disabled", "disabled");
        $(this).removeAttr("disabled");
    }

});


// funcão gerencia dicotomia
function dicotomia() {
    var a = -100,
        b = 0,
        c = 0,
        cAux = 0,
        numLinhas = 1;

    for (; a < 100; a++, b++) {

        while (true) {

            c = (a + b) / 2;

            // condição de parada
            if ((Math.abs(cAux - c)) < 0.000001 || numLinhas > 7900) {
                addLinhas(numLinhas++, a, b, c, calDicotomia(a), calDicotomia(b), calDicotomia(c), true);
                break;
            } else {
                addLinhas(numLinhas++, a, b, c, calDicotomia(a), calDicotomia(b), calDicotomia(c), false);
            }

            if ((calDicotomia(b) >= 0 && calDicotomia(c) >= 0) || (calDicotomia(b) < 0 && calDicotomia(c) < 0)) {
                b = c;
            } else {
                a = c;
            }

            cAux = c;
        }

    }

}


// calculo principal
function calDicotomia(x) {

    // tratando a função, substituindo as variáveis por número. 
    funcao = String($('#fun').val());
    funcao = funcao.replace(/[a-z]/ig, String(x));

    // calculando a função tratada.
    var result = nerdamer(funcao).evaluate();

    // log
    console.log("funcao: " + funcao);
    console.log("result: " + result);

    return parseFloat(result.text());

}



// adicionando linha na tabela.
function addLinhas(numLinhas, a, b, c, fa, fb, fc, sucesso) {
    var newRow = (sucesso) ? $("<tr class='table-success'>") : $("<tr>");
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


// removendo todas as linhas da tabela.
function limparTabela() {
    var linhas = $('#tabela-dicotomia tbody tr'); //tr
    linhas.remove();
}