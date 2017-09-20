var f;

$(document).ready(function() {
    nerdamer.setConstant('e', 2.71828182846);
    nerdamer.setConstant('E', 2.71828182846);



});



// evento click botão
$('#calcularDicotomia').click(function() {
    limparTabela();
    f = nerdamer(String($('#fun').val())).buildFunction(); // f recebe a função especificada pelo usuário. agora basta chamar f passando um paramentro: f(x).

    var linha = '<tr><th>#</th> <th> A </th> <th> B </th> <th> C </th> <th> F(A) </th> <th> F(B) </th> <th> F(C) </th></tr>';
    $('#tabela-raiz thead').eq(0).append(linha);
    dicotomia();
});

$('#calcularRaphson').click(function() {
    limparTabela();
    f = nerdamer(String($('#fun').val())).buildFunction(); // f recebe a função especificada pelo usuário. agora basta chamar f passando um paramentro: f(x).

    var linha = '<tr><th>#</th> <th> X </th> <th> f(X) </th> <th> f\'(X) </th> <th> calculo </th> <th> Precisão </th></tr>';
    $('#tabela-raiz thead').eq(0).append(linha);

    raphson();
});



// evento enter edittext
$('#fun').on('keypress', function(e) {
    if (e.which === 13) {

        // desabilitando caixa de texto
        $(this).attr("disabled", "disabled");
        $(this).removeAttr("disabled");

    }

});



// funcão gerencia dicotomia |------------------------------------------------------------------------------------
function dicotomia() {

    var a = -100,
        b = a + 0.001,
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
                    b = a + 0.001;
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
            a += 0.001;
            b += 0.001;
        }

    }

    $('#raiz').html('<div class="alert alert-success alert-dismissible fade show" role="alert" id="alerta"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span></button><strong id="qtdRaiz">10</strong> Raíz(es) encontrada(s)! </div>');
    $('#qtdRaiz').html(contRaiz);

    $('.modal').modal('show');
}


// funcão gerencia newton raphson |--------------------------------------------------------------------------------------------------------
function raphson() {

    var x = 100,
        a = 100,
        b = a + 0.001,
        fun = 0,
        funDerivada = 0,
        precisaoAnterior = 0,
        precisao = null,
        numLinhas = 0,
        contRaiz = 0,
        raizNaoEncontrada = true;

    while (a >= -100) {
        if ((f(a) >= 0 && f(b) < 0) || (f(a) < 0 && f(b) >= 0)) {
            x = b;
            precisaoAnterior = 1;
            precisao = null;
            while (true) {
                // funcao é calculada automaticamente com f(x).
                fun = f(x);

                // derivada 
                funDerivada = (((f(x + 0.00001) - fun) / 0.00001));

                // quando a precisão for menor que 0.0001 a raiz foi encontrada.
                if (precisao < 0.0001 && precisao != null) {
                    addLinhaRaphson(++numLinhas, x, fun, funDerivada, x - (fun / funDerivada), precisao, true);
                    contRaiz++;;
                    b = x - 0.001;
                    a = b - 0.001;
                    break;
                } else {
                    if (precisao == null)
                        precisao = 0;
                    addLinhaRaphson(++numLinhas, x, fun, funDerivada, x - (fun / funDerivada), precisao, false);
                }

                precisaoAnterior = x;

                x = x - (fun / funDerivada);

                precisao = x - precisaoAnterior;
            }

        } else {
            a -= 0.001;
            b -= 0.001;
        }
    }

    /*

        //  for (var i = x; i > -10; i--) {
        //     fun = 0;
        //     funDerivada = 0;
        //     precisaoAnterior = 0;
        //    precisao = 0;

        while (numLinhas < 100) {

            // funcao é calculada automaticamente com f(x).
            fun = f(x);

            // derivada 
            funDerivada = (((f(x + 0.00001) - fun) / 0.00001));

            // quando a precisão for menor que 0.0001 a raiz foi encontrada.
            if (precisao < 0.001 && precisao != null) {
                raizNaoEncontrada = false;
                addLinhaRaphson(++numLinhas, x, fun, funDerivada, x - (fun / funDerivada), precisao, true);
                contRaiz++;
                x -= 0.005;
            } else {
                if (precisao == null)
                    precisao = 0;
                addLinhaRaphson(++numLinhas, x, fun, funDerivada, x - (fun / funDerivada), precisao, false);
            }

            precisaoAnterior = x;

            x = x - (fun / funDerivada);

            precisao = x - precisaoAnterior;
        }


        raizNaoEncontrada = true;
        i = x;

        // }
    */

    $('#raiz').html('<div class="alert alert-success alert-dismissible fade show" role="alert" id="alerta"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span></button><strong id="qtdRaiz">10</strong> Raíz(es) encontrada(s)! </div>');
    $('#qtdRaiz').html(contRaiz);

    $('.modal').modal('show');

}



// adicionando linha na tabela de dicotomia
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

    $('#tabela-raiz tbody').append(novaLinha);
    if (sucesso) {
        $('#tabela-raizes tbody').append('<tr> <td scope="row">' + nl + '</td> <td>' + c + '</td> </tr>');
    }

}


// adicionando linha na tabela de raphson.
function addLinhaRaphson(nl, x, funcao, funDerivada, calc, precisao, sucesso) {
    var novaLinha = (sucesso) ? $('<tr class="table-success">') : $('<tr>');
    var col = '';
    col += '<th scope="row">' + nl + '</th>';
    col += '<td>' + x + '</td>';
    col += '<td>' + funcao + '</td>';
    col += '<td>' + funDerivada + '</td>';
    col += '<td>' + calc + '</td>';
    col += '<td>' + precisao + '</td>';

    novaLinha.append(col);

    $('#tabela-raiz tbody').append(novaLinha);
    if (sucesso) {
        $('#tabela-raizes tbody').append('<tr> <td scope="row">' + nl + '</td> <td>' + x + '</td> </tr>');
    }

}



// removendo todas as linhas da tabela.
function limparTabela() {
    $('#tabela-raiz thead tr').remove();
    $('#tabela-raiz tbody tr').remove();
    $('#tabela-raizes tbody tr').remove();
}


/*
    (Math.pow((Math.E), x) + ( 0.5 * x) );  -- e^x + 0.5*x

    (Math.pow(x,2) - x + Math.sin(5*x));    -- x^2-x+sin(5^x)

    https://github.com/jiggzson/nerdamer
    
*/