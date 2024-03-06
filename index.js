var botoes = ["green", "red", "yellow", "blue"];

//Variaveis basicas
var sequencia = [];
var level = 0;
var cont;
var started = false;
var waiting = false;

//Criação dos Objetos de Audio
var nomeAudios = ['green.mp3', 'red.mp3', 'yellow.mp3', 'blue.mp3', 'wrong.mp3'];
var audios = [];
nomeAudios.forEach(function(nomeAudio) {
    var nome = "sounds/" + nomeAudio;
    var audio = new Audio(nome);
    audios.push(audio);
});

function GeraNumero(){
    return Math.round(Math.random() * 3);
}

function AddSequencia(){
    cont = 0;
    sequencia.push(GeraNumero());
    console.log(sequencia);
    level++;
    $("h1").text("Level " + level);
    $('#' + botoes[sequencia[sequencia.length - 1]]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(document).ready(function() {
    $(document).keydown(function(event) {
        if (event.key === 'a' && !started) {
            $('body').css("background-color", "#011F3F");
            AddSequencia();
            $("h1").text("Level " + level);
            waiting = false;
            Start();
        }
    });
});

function Start(){
    started = true;
    waiting = false;
    for (var i = 0; i < botoes.length; i++) {
        (function(n) {
            $('#' + botoes[i]).off('click').on('click',(function() {
                if (waiting) {
                    return false; 
                }

                var $this = $(this); 
                var color = $this.css("background-color");
                $this.css("background-color", "purple");
                $this.addClass("pressed");
                audios[n].play();
                
                setTimeout(function() {
                    $this.css("background-color", color).removeClass("pressed");
                }, 100);
                
                if (n !== sequencia[cont]) {
                    Reset();
                    return false;
                }

                cont++;

                if (cont === level){
                    waiting = true;
                    
                    setTimeout(function() {
                        AddSequencia();
                        waiting = false; 
                    }, 300);
                }
            }));
        })(i);
    }
}

function Reset(){
    audios[4].play();
    $('body').css("background-color", "red");
    $("h1").text("Game Over! Tente de novo.");
    sequencia = [];
    level = 0;
    cont = 0;
    started = false;
    waiting = true;
}