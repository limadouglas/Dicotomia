// evento click botão
$('#calcular').click(function () {
    limparTabela();
    dicotomia();
});


// evento enter edittext
$('#fun').on('keypress', function (e) {
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
        aAux = 0,
        numLinhas = 1;
    aAux = a;

    while (a <= 100) {
        if ((a > 0 && aAux < 0)(a < 0 && aAux > 0)) {
            b = a;
            a = aAux;
            while (true) {

                c = (a + b) / 2;

                // condição de parada
                if ((Math.abs(cAux - c)) < 0.000001) {
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
        } else {
            a += 0.25;
        }
    }
}


// calculo principal
function calDicotomia(x) {

    // tratando a função, substituindo as variáveis por número. 
    funcao = String($('#fun').val());
    funcao = funcao.replace(/[e]/ig, "2.7182");
    console.log("funcao: " + funcao);
    funcao = funcao.replace(/[a-z]/ig, String(x));

    console.log("funcao: " + funcao);
    // calculando a função tratada.
    var result = nerdamer(funcao);

    //  return (Math.pow((Math.E), x) + ( 0.5 * x) );  // 1/2.0= 0
    // return (Math.pow(x,2) - x + Math.sin(5*x));

    // log
    console.log("funcao: " + funcao);
    console.log("result: " + result);

    return parseFloat(String(result.text()));

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


/*
    (Math.pow((Math.E), x) + ( 0.5 * x) );  // 1/2.0= 0
    (Math.pow(x,2) - x + Math.sin(5*x));
    e^x + 0.5*x
*/