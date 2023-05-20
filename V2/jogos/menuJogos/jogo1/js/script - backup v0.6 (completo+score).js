(function(){
	var game = new Phaser.Game(800,600,Phaser.AUTO,null,{preload:preload,create:create,update:update,render:render});//{}Qual fase);
	var platforms,player,keys,txtScore,score = 0;
	var pulo = false;
	var sprite2;
	var star;
	var jogando = 1;

	var canvas, ctx, ALTURA, LARGURA, frames = 0, maxPulos = 3,velocidade = 6, estadoAtual,
    estados = {
          jogar: 0,
          jogando: 1,
          perdeu:2
    	};

	function preload(){ // O que deve ser carregado antes do jogo iniciar
		game.load.image('ceu','img/fundo1.png');
		game.load.image('platform','img/platform.png');
		game.load.image('platform2','img/fundoR.png');
		game.load.image('star','img/fino2.png');
		game.load.image('cupinzeiro','img/cupinzeiro.png');	
		game.load.spritesheet('cavalo','img/cavaloF2.png',200,200);

	}
	function create(){ // Criar elementos dentro do jogo (val, array)
		game.physics.startSystem(Phaser.Physics.ARCADE);//sistema de física do Phaser
		game.add.sprite(0,0,'ceu');//(largura,altura)

		platforms = game.add.group();
		platforms.enableBody = true; // Habilita o corpo solido para todas plataformas do grupo
		var platform = platforms.create(0,game.world.height - 32,'platform');
			platform.scale.setTo(2,1); //Multiplica o tamanho da plataforma
			platform.body.immovable = true; // Deixa o chao estático
		//criando estrelas	
		/*stars = game.add.group();
		stars.enableBody = true;
		for (var i = 0; i < 12; i++){ // numeros de estrelas
			var star = stars.create(i*70,0,'star'); // 70 pixel entre as estrelas, 0 posição na tela
				star.body.gravity.y = 150;
				star.body.bounce.y = 0.2 + (Math.random()*0.5);
		}*/

		/////////////////////////////////////////// cupinzeiro
	    sprite2 = game.add.sprite(799, 504, 'cupinzeiro');
	    sprite2.name = 'cupinzeiro';
	    game.physics.enable(sprite2, Phaser.Physics.ARCADE);
	    sprite2.body.velocity.x = -150;
		sprite2.body.immovable = true;

		/////////////////////////////////////////// personagem
		player = game.add.sprite(100,game.world.height - 300,'cavalo');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 150; //intensidade da gravidade (y vertical)(x horizontal)
		player.body.bounce.y = 0.3; // reação da colisão(kikar)
		player.body.collideWorldBounds = true; //limitação da acão da gravidade(dentro da tela)
		/////////////////////////////////////////// animação
		player.animations.add('right',[0,1],5,true); //anime os frames[], velocidade da animação, loop da animação
		/////////////////////////////////////////// Score
		game.add.text(10,10,'Pontos para finalizar: 2000', {fontSize:'32px',fill:'#fff'})
		txtScore = game.add.text(10,50,'Pontos conquistados: 0', {fontSize:'32px',fill:'#fff'})
		game.add.sprite(0,game.world.height - 42,'platform2'); //fundo 2 movimento a frente dos objetos
		/////////////////////////////////////////// Contagem de pontos
		star = game.add.sprite(799, -1, 'star');
		star.name = 'star';
	    game.physics.enable(star, Phaser.Physics.ARCADE);
	    star.body.velocity.x = -150;
	    star.enableBody = true;


	}
	function update(){ // Logica do jogo que deve ser verificada a cada loop do jogo(colisão,movimentação)
		game.physics.arcade.collide(player, sprite2, collisionHandler, null, this);// colisão cupinzeiro
		game.world.wrap(sprite2,25);// Faz o cupinzeiro atravesar a tela e voltar
		game.world.wrap(star,25);// Faz  a star atravesar a tela e voltar

		game.physics.arcade.collide(player,platforms); // verifica se o jogador interage com as plataformas
		//game.physics.arcade.collide(star,player); // interação estrela e o player
		game.physics.arcade.overlap(player,star,collectStar);


		/////////////////////////////////////////// movimentação de pulo
		player.body.velocity.x = 0;
		if(player.body.touching.down){
		  	player.animations.play('right');
		} if (game.input.activePointer.leftButton.isDown && player.body.touching.down){
		  		player.body.velocity.y = -220;
				player.animations.stop(); // parado no ar
		  		player.frame = 1;
		  }
	}
	function collectStar(player,star){
				
		if (score == 1999){

	        txtFim = game.add.text(300,300,'Fim de jogo', {fontSize:'52px',fill:'#fff'})
	        txtFim.text = 'Fim de jogo';
	        score = score + 1;
			txtScore.text = 'Pontos conquistados: ' + score;
	    } else{
	    	score = score + 1;
			txtScore.text = 'Pontos conquistados: ' + score;
	    }
	}

	function collisionHandler (obj1, obj2) {

    //game.stage.backgroundColor = '#892d2d';

	}

	function render() {

    //game.debug.bodyInfo(player, 32, 32); // Os debugs servem para verificar os comandos em tempo real
    // game.debug.body(player);
    //game.debug.body(sprite2);
	}	



}());