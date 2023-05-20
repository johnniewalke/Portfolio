var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

//Váriáveis
var click = false;
var mastro;
var bird;
var birdInvertido;
var bandeira;
var fase = 1;
var faseTexto;
var baloesPegos = 0;
var baloes;

//Pré carregamento antes de início do jogo

function preload() {

    //Carregar uma imagem. Parâmetros "Nome" e "Caminho da imagem"

    game.load.image('fundo', 'sprites/sky.png');
    game.load.image('bandeira', 'sprites/bandeira.jpg');
    game.load.image('balao', 'sprites/balao.png', 32, 32);
    game.load.image('mastro', 'sprites/mastro.png');
    game.load.spritesheet('bird', 'sprites/juca.png', 35, 30);

}

    //Criar os objetos na tela do jogo
    function create() {

    //Carregar o nosso sistema de física assim que o jogo for criado
    //Parâmetro (Systema de fisica Arcaide (Box...))
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //posição de x,y e nome da sprite
    var fundo = game.add.sprite(0, 0, 'fundo');
    fundo.scale.setTo(1.8, 1.8);
    

    faseTexto = game.add.text(10, 30, 'Pontos conquistados: 0', {
        'fontSize': '20px',
        'fill': '#000'
    });
    
    bird = game.add.sprite(15, 15, 'bird');
    bird.animations.add('bird', [0, 1], 5, true);
    game.physics.arcade.enable(bird);
    bird.body.collideWorldBounds = true;
    bird.scale.setTo(1.7, 2.1);


    baloes = game.add.group();
    baloes.enableBody = true;


        if(fase == 1) {

        inicial();
        for (var i = 3; i < 13; i++) {

            var balao = baloes.create(i * 50, 210, 'balao');

        }
        bandeiraAleatoria();
    }
}

    function update() {

        faseTexto.text = "Pontos Conquistados: " + fase;

        if (game.physics.arcade.collide(bird, bandeira)) {
            if(baloesPegos == 10 && fase == 1){
                bandeira.kill();
                mastro.kill();
                faseDois();
                baloesPegos = 0;
                fase++;
                bandeiraAleatoria();
            }
             if(baloesPegos == 10 && fase == 2){
                 bandeira.kill();
                 mastro.kill();
                 faseTres();
                 baloesPegos = 0;
                 fase++;
                 bandeiraAleatoria();

             }
             if(baloesPegos ==10 && fase ==3){
                 bandeira.kill();
                 mastro.kill();
                 faseAleatoria();
                 baloesPegos = 0;
                 fase++;
                 bandeiraAleatoria();

             }
             if(baloesPegos == 10 && fase > 3 && fase < 15) {
                 bandeira.kill();
                 mastro.kill();
                 faseAleatoria();
                 baloesPegos = 0;
                 fase++;
                 bandeiraAleatoria();
             }
             if(baloesPegos == 10 && fase == 15){
                mastro.kill();
                bandeira.kill();
                bird.visible = false;
                var gameOver = game.add.text(230, 300, 'Fim de jogo', {
                     'fontSize': '60px',
                     'fill': '#000'
                 });
             }
        }
        game.physics.arcade.overlap(bird,baloes,colherBaloes);
        bird.animations.play('bird');

        bird.body.allowRotation = true;

            if( bird.rotation < - 1.0 || bird.rotation > 2.5 ){
                bird.rotation = game.physics.arcade.moveToPointer(bird, 50, game.input.activePointer, 100);
            }
            if( bird.rotation > - 1.0 && bird.rotation < 2.5) {
                bird.rotation = game.physics.arcade.moveToPointer(bird, 50, game.input.activePointer, 100);
            }
    }

    function inicial() {
        click = true;
    }

    function listener () {

    }


    function fimDeJogo() {
        bird.kill();
    }

    function colherBaloes(bird,balao) {
        balao.kill();
        baloesPegos++;
        console.log(baloesPegos);
    }

    function faseDois() {

        var balaoUm = 200;
        var balaoDois = 250;

        for(var i = 3; i < 13; i++){
            if(i < 8){
                var balao = baloes.create(i*50,balaoUm,'balao');
            }else{
                var balao = baloes.create(i*50,balaoDois,'balao');
            }
        }

    }

    function faseTres() {

    var cont = 10;

    for(var i = 3; i < 13; i++){

        if(cont < 0){
            cont++;
        }else{
            cont--;
        }
        if(i < 8){
            var balao = baloes.create(i*50,200 + 5 *cont,'balao');
        }else{
            var balao = baloes.create(i*50,200 + 5 *cont,'balao');
        }
    }
    }

    function faseAleatoria() {

    var posicao = 1;

    for(var i = 3; i < 13; i++){
        if(posicao == 1){

           var balao = baloes.create(i*50,200 + Math.floor(Math.random()*10)*i-3,'balao');
            posicao --;
        }else{
            var balao = baloes.create(i*50,180 + Math.floor(Math.random()*10)*-3,'balao');
            posicao ++;
        }
    }
    }

    function bandeiraAleatoria() {

        var posicaoX;
        var posicaoY;

        do{
            posicaoX = Math.floor(Math.random() * 8)*100;
            posicaoY = Math.floor(Math.random() * 6)*100;

        }while(posicaoY < 350);

        mastro = game.add.sprite(posicaoX+70, posicaoY, 'mastro');
        mastro.scale.setTo(0.7, 0.7);

        bandeira = game.add.sprite(posicaoX, posicaoY, 'bandeira');
        game.physics.arcade.enable(bandeira);

        bandeira.body.immovable = true;
        bandeira.scale.setTo(0.3, 0.3);

    }

