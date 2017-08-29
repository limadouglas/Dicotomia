$(document).ready(function() {
    nerdamer.setConstant('e', 2.71828182846);
    nerdamer.setConstant('E', 2.71828182846);

});



// evento click botão
$('#calcular').click(function() {
    limparTabela();
    dicotomia();
});



// evento enter edittext
$('#fun').on('keypress', function(e) {
    if (e.which === 13) {

        // desabilitando caixa de texto
        $(this).attr("disabled", "disabled");
        $(this).removeAttr("disabled");

        limparTabela();
        dicotomia();
    }

});



// funcão gerencia dicotomia
function dicotomia() {

    var f = nerdamer(String($('#fun').val())).buildFunction(); // f recebe a função especificada pelo usuário. agora basta chamar f passando um paramentro: f(x).

    var a = -100,
        b = a + 1,
        c = 0,
        cAux = 0,
        numLinhas = 0,
        fa = 0,
        fb = 0,
        fc = 0,
        contRaiz = 0;

    while (a <= 100) {
        if ((f(a) >= 0 && f(b) < 0) || (f(a) < 0 && f(b) >= 0)) {
            while (true) {

                c = (a + b) / 2;
                fa = f(a);
                fb = f(b);
                fc = f(c);

                // condição de parada
                if ((Math.abs(cAux - c)) < 0.00001 && numLinhas > 0) {
                    addLinhas(++numLinhas, a, b, c, fa, fb, fc, true);
                    a = c + 0.00001;
                    b = a + 0.025;
                    contRaiz++;
                    break;
                } else {
                    addLinhas(++numLinhas, a, b, c, fa, fb, fc, false);

                    if ((fb >= 0 && fc >= 0) || (fb < 0 && fc < 0)) {
                        b = c;
                    } else {
                        a = c;
                    }
                    cAux = c;
                }
            }
        } else {
            a += 0.025;
            b += 0.025;
        }
    }

    $('#raiz').html('<div class="alert alert-success alert-dismissible fade show" role="alert" id="alerta"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span></button><strong id="qtdRaiz">10</strong> Raíz(es) encontrada(s)! </div>');
    $('#qtdRaiz').html(contRaiz);

    $('.modal').modal('show');
}



// adicionando linha na tabela.
function addLinhas(nl, a, b, c, fa, fb, fc, sucesso) {
    var novaLinha = (sucesso) ? $('<tr class="table-success">') : $('<tr>');
    var col = '';
    col += '<th scope="row">' + nl + '</th>';
    col += '<td>' + a + '</td>';
    col += '<td>' + b + '</td>';
    col += '<td>' + c + '</td>';
    col += '<td>' + fa + '</td>';
    col += '<td>' + fb + '</td>';
    col += '<td>' + fc + '</td>';

    novaLinha.append(col);

    $('#tabela-dicotomia tbody').append(novaLinha);
    if (sucesso) {
        $('#tabela-raizes tbody').append('<tr> <td scope="row">' + nl + '</td> <td>' + c + '</td> </tr>');
    }
    //alert("parou");
    //alert('inseriu na tabela');
}



// removendo todas as linhas da tabela.
function limparTabela() {
    var linhas = $('#tabela-dicotomia tbody tr'); //tr
    linhas.remove();
}





/*
    (Math.pow((Math.E), x) + ( 0.5 * x) );  -- e^x + 0.5*x

    (Math.pow(x,2) - x + Math.sin(5*x));    -- x^2-x+sin(5^x)

    https://github.com/jiggzson/nerdamer
    
*/