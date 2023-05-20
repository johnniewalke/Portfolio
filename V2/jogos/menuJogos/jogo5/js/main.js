
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'ph_game', { preload: preload, create: create, update: update});
var platforms;

function preload() {

    game.load.image('cuia', 'assets/sprites/cuia.png');
    game.load.image('cuia_chao', 'assets/sprites/cuia_chao.png');
    game.load.image('gaucho', 'assets/sprites/gaucho2.png');
    game.load.image('prenda', 'assets/sprites/prenda.png');
    game.load.image('background', 'assets/sprites/fundo.png');
    game.load.image('platform','assets/sprites/platform.png');
    game.load.image('prenda2', 'assets/sprites/prenda2.png')
    game.load.image('barra', 'assets/sprites/suporte.png')

}

var sprite,cuia_chao,suporte;
var gaucho;
var prenda;
//var prenda2;
var background;
var score = 25;

function create() {

     game.physics.startSystem(Phaser.Physics.ARCADE);

     background = game.add.sprite(0, 0, 'background');
     scoreTxt = game.add.text(400, 10, 'Pontos para completar: 25', { font: '32px Arial', fill: '#000000' });
     fimTxt = game.add.text(250, 270, '', { font: '52px Arial', fill: '#000000' });
     gaucho = game.add.sprite(130, 150, 'gaucho');
     gaucho.scale.setTo(0.5,0.5)
    
     prenda = game.add.sprite(630, 410, 'prenda');
     sprite = game.add.sprite(180, 190, 'cuia');
     suporte = game.add.sprite(180, 230, 'barra');
     game.physics.arcade.enable(suporte);
     suporte.body.immovable = true;
     suportePrenda = game.add.sprite(650, 400, 'barra');
     game.physics.arcade.enable(suportePrenda);
     suportePrenda.body.immovable = true;
     suportePrenda.scale.setTo(1.5,1)

     sprite.inputEnabled = true;
     sprite.input.enableDrag(true);

     platforms = game.add.group();
     platforms.enableBody = true; // Habilita o corpo solido para todas plataformas do grupo
     var platform = platforms.create(0,game.world.height - 32,'platform');
     platform.scale.setTo(2,1); //Multiplica o tamanho da plataforma
     platform.body.immovable = true; // Deixa o chao estático



}

function update() {

    //game.input.onDown.add(colisãoSuporte, this);
    game.physics.enable( [ sprite, prenda ], Phaser.Physics.ARCADE); // colisão cuia e prenda
    game.physics.arcade.overlap(sprite, prenda, colisãoPrenda, null, this); // Contagem de pontos
    game.physics.arcade.collide(sprite, platforms, colisãoChão, null, this); // colisão chao
    game.physics.arcade.collide(sprite, suporte, colisãoSuporte, null, this); // colisão chao
    game.physics.arcade.collide(sprite, suportePrenda, colisãoSuportePrenda, null, this); // colisão chao
    
    if (game.input.activePointer.leftButton.isDown == false){
          sprite.body.velocity.y = 200;
    } else if (game.input.activePointer.leftButton.isDown){
          sprite.body.velocity.y = 0;
    } else {
          sprite.body.velocity.y = 0;
    } 
  
  }

function colisãoSuporte(){

    sprite.body.velocity.y = 0;
    sprite.body.collideWorldBounds = true;

}

function colisãoSuportePrenda(obj1, obj2){

    if (game.input.activePointer.leftButton.isDown == false){
     obj1.kill();
     cuia_chao = game.add.sprite(sprite.x+1, sprite.height+300, 'cuia_chao'); 
     cuia_chao.inputEnabled = true;
     cuia_chao.input.enableDrag(true);
    setTimeout(function() {
      obj1.reset(180, 190);
      cuia_chao.kill()
  }, 1000) ;
 }
}

function colisãoPrenda (obj1, obj2) {

    if (score == 1){
         obj1.kill();
         score -= 1;
         scoreTxt.text = 'Pontos para completar: ' + score;
         fimTxt.text = 'Fim de Jogo!'
     } else if(score >1 ){
       prenda2 = game.add.sprite(630, 410, 'prenda2');
       obj1.kill();
       setTimeout(function() {
         obj1.reset(180, 190);

     prenda2.kill();
     }, 1000);
       score -= 1;
       scoreTxt.text = 'Pontos para completar: ' + score;
     } else {
     	score = 0;
     	prenda2 = game.add.sprite(630, 410, 'prenda2');
     }

  }

  function colisãoChão (obj1, obj2){

     obj1.kill();
     cuia_chao = game.add.sprite(sprite.x+1, sprite.height+470, 'cuia_chao'); //230, 500,
     cuia_chao.inputEnabled = true;
     cuia_chao.input.enableDrag(true);
    setTimeout(function() {
      obj1.reset(180, 190);
      cuia_chao.kill()
  }, 1000) ;

  }
