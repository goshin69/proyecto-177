$(document).ready(function () {
    getTemplates();
})

function getTemplates() {
    $.ajax({
        url: "/get-template",
        type: "get",
        success: function (result) {
            fillBlanks(result.word)
        },
        error: function (result) {
            alert(result.responseJSON.message)
        }
    })
}

function fillBlanks(randomWord) {
    //Asegurarse de que los espacios en blanco están vacíos para empezar
    $("#blanks").empty();

    //Mostrar los espacios en blanco usando <span>
    for (let i = 0; i < randomWord.inputs; i++) {
        let input_html = `<span class="fill_blanks" id="input_${i}">_</span>`
        $("#blanks").append(input_html)
    }

    //Mostrar la pista
    $("#hint").html(randomWord.category)

    var gameOver = false
    //Rellenar los espacios en blanco sólo si se encuentra la coincidencia de caracteres
    $(".clickable").click(function () {
        var correctGuess = false;

        let id = $(this).attr("id");
        var life = parseInt($("#life").text())

        for (var i = 0; i < randomWord.word.length; i++) {
            if (randomWord.word.charAt(i).toLowerCase() == id) {
                if (life > 0 && ($(".fill_blanks").eq(i).html() == "_" || $(".fill_blanks").eq(i).html() == id)) {

                    $(".fill_blanks").eq(i).html(id);
                    correctGuess = true;

                    //Comprobar si la palabra adivinada está completa
                    if ($("#blanks").text() === randomWord.word.toLowerCase()) {
                        $("#result").text("¡Ganaste!")
                        correctGuess = true;
                        gameOver = true
                    }
                }

            }

        }

        if (life > 0 && correctGuess != true && gameOver != true) {
            life = life - 1
            $("#life").text(life)
        }
        else if (life == 0) {
            $("#result").text("¡Perdiste!")
        }
    })
}

