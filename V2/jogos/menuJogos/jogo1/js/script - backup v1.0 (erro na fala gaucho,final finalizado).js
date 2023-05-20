(function(){
	var game = new Phaser.Game(800,600,Phaser.AUTO,null,{preload:preload,create:create,update:update});//{}Qual fase);
	var platforms,player,keys,txtScore,score = 0,pulo = false,sprite2,star,jogando = 1,trocaPassaro = 0,papagaio1,papagaio2,ceu1,fala_gaucho;

	function preload(){ // O que deve ser carregado antes do jogo iniciar
		game.load.image('ceu','img/ceuAzul.png');
		game.load.image('fundo','img/montanha3.png');
		game.load.image('fundo2','img/montanha3R.png');
		game.load.image('platform','img/platform.png');
		game.load.image('platform2','img/fundoR1.png');
		game.load.image('star','img/colisaop.png');
		game.load.image('cupinzeiro','img/cupinzeiroP.png');	
		game.load.image('nuvem','img/nuvem.png');
		game.load.spritesheet('fala_gaucho','img/fala_gaucho.png');
		game.load.image('gaucho','img/gaucho.png');
		game.load.image('prenda','img/prenda.png');
		game.load.spritesheet('cavalo','img/cavaloF3.png',200,200);
		game.load.spritesheet('papagaio','img/papa2.png',50,35);
		game.load.audio('andar_cavalo', 'audio/andar_cavalo.wav');
		game.load.audio('pulo_cavalo', 'audio/pulo_cavalo.wav');
		game.load.audio('passaros', 'audio/passaros.wav');

	}
	function create(){ // Criar elementos dentro do jogo (val, array)
		game.physics.startSystem(Phaser.Physics.ARCADE);//sistema de física do Phaser
		andar_cavalo = game.add.audio('andar_cavalo');
		pulo_cavalo = game.add.audio('pulo_cavalo');
		passaros = game.add.audio('passaros');
		game.add.sprite(0,0,'ceu');//(largura,altura)


				//////////////////////////////////////////// nuvens
	    nuvem = game.add.sprite(400, 224, 'nuvem');
	    nuvem.name = 'nuvem';
	    game.physics.enable(nuvem, Phaser.Physics.ARCADE);
	    nuvem.body.velocity.x = -10;
		nuvem.body.immovable = true;

		nuvem2 = game.add.sprite(700, 100, 'nuvem');
		nuvem2.name = 'nuvem';
	    game.physics.enable(nuvem2, Phaser.Physics.ARCADE);
	    nuvem2.body.velocity.x = -7;
		nuvem2.body.immovable = true;

		//////////////////////////////////////////////////// Fundo em movimento
		montanha = game.add.sprite(0, 0, 'fundo');
	    montanha.name = 'fundo';
	    game.physics.enable(montanha, Phaser.Physics.ARCADE);
	    montanha.body.velocity.x = -170;
		montanha.body.immovable = true;

		montanha2 = game.add.sprite(-1800, 0, 'fundo2');
	    montanha2.name = 'fundo2';
	    game.physics.enable(montanha2, Phaser.Physics.ARCADE);
	    montanha2.body.velocity.x = -170;
		montanha2.body.immovable = true;

		platforms = game.add.group();
		platforms.enableBody = true; // Habilita o corpo solido para todas plataformas do grupo
		var platform = platforms.create(0,game.world.height - 32,'platform');
			platform.scale.setTo(2,1); //Multiplica o tamanho da plataforma
			platform.body.immovable = true; // Deixa o chao estático

		/////////////////////////////////////////// cupinzeiro
	    sprite2 = game.add.sprite(750, 521, 'cupinzeiro');
	    sprite2.name = 'cupinzeiro';
	    game.physics.enable(sprite2, Phaser.Physics.ARCADE);
	    sprite2.body.velocity.x = -170;
		sprite2.body.immovable = true;

		/////////////////////////////////////////// personagem
		player = game.add.sprite(0,game.world.height - 300,'cavalo');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 120; //intensidade da gravidade (y vertical)(x horizontal)
		//player.body.bounce.y = 0.3; // reação da colisão(kikar)
		player.body.collideWorldBounds = true; //limitação da acão da gravidade(dentro da tela)

		/////////////////////////////////////////// animação
		player.animations.add('corre',[0,1],5,true); //anime os frames[], velocidade da animação, loop da animação
		player.animations.add('sentar',[2,2],5,true);
		/////////////////////////////////////////// Score
		game.add.text(10,10,'Pontos para finalizar: 25', {fontSize:'32px',fill:'#fff'})
		txtScore = game.add.text(10,50,'Pontos conquistados: 0', {fontSize:'32px',fill:'#fff'})
		//game.add.sprite(0,game.world.height - 42,'platform2'); //fundo 2 movimento a frente dos objetos
		/////////////////////////////////////////// Contagem de pontos
		star = game.add.sprite(814, 547, 'star');
		star.name = 'star';
	    game.physics.enable(star, Phaser.Physics.ARCADE);
	    star.body.velocity.x = -9000;
	    star.enableBody = true;
	    /////////////////////////////////////////// passaros
	    papagaio1 = game.add.sprite(800, (Math.random() * 300), 'papagaio');
	    papagaio1.name = 'papagaio';
	    game.physics.enable(papagaio1, Phaser.Physics.ARCADE);
	    papagaio1.body.velocity.x = -60;
		papagaio1.body.immovable = true;
		papagaio1.animations.add('voando',[0,1,2,3,4,5,6,7,6,5,4,3,2,0,1,2,3,4,5,6,7,6,5,4,3,2,1,0,1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,5,6,7,6,5,4,3],15,true); //anime os frames[], velocidade da animação, loop da animação

	}

	function update(){ // Logica do jogo que deve ser verificada a cada loop do jogo(colisão,movimentação)
		game.world.wrap(montanha2,1800); // Faz atravesar a tela e voltar
		game.world.wrap(montanha,1800); // Faz atravesar a tela e voltar
		game.world.wrap(sprite2,25); // Faz o cupinzeiro atravesar a tela e voltar
		game.world.wrap(star,200); // Faz atravesar a tela e voltar
		game.world.wrap(papagaio1,800); // Faz atravesar a tela e voltar
		game.world.wrap(nuvem,80); // Faz atravesar a tela e voltar
		colidiu = game.physics.arcade.collide(player, sprite2, collisionHandler, null, this);// colisão cupinzeiro
		game.physics.arcade.collide(star, sprite2, collisionHandler, null, this);// colisão pontos com cupizeiro
		papagaio1.animations.play('voando'); // Faz papagaio voar
		game.physics.arcade.collide(player,platforms); // verifica se o jogador interage com as plataformas
		pontos = game.physics.arcade.overlap(player,star,collectStar);

		/////////////////////////////////////////// Cenario Colisão cavalo e cupinzeiro
		if (colidiu == true){
		  		player.frame = 1;
		  		game.input.onDown.add(falaae, this);
			if (colidiu == true &&  player.body.touching.down){

		  		player.frame = 2;

				//Para alguns objetos ficarem lentos ou parados
				nuvem.body.velocity.x = -3;
				nuvem2.body.velocity.x = -3;	
				papagaio1.body.velocity.x = -20;			
				montanha.body.velocity.x = 0;
				montanha2.body.velocity.x = 0;
				player.body.velocity.x = 0;
				sprite2.body.velocity.x = 0;

				//fala = game.add.sprite(0, 100, 'fala_gaucho');
				
 		}
			} else { //Os objetos voltam a velocidade normal
				nuvem.body.velocity.x = -10;
				nuvem2.body.velocity.x = -7;				
				montanha.body.velocity.x = -170;
				montanha2.body.velocity.x = -170;
				player.body.velocity.x = -170;
				sprite2.body.velocity.x = -170;
				papagaio1.body.velocity.x = -69;
		  		star.body.velocity.x = -170;

		
}
		/////////////////////////////////////////// movimentação de pulo
		player.body.velocity.x = 0;
		if(player.body.touching.down){
		  	player.animations.play('corre');
		  	star.body.velocity.x = -9000;

		} if (game.input.activePointer.leftButton.isDown && player.body.touching.down){
		  		//andar_cavalo.stop();

		  		player.body.velocity.y = -160;
				player.animations.stop(); // parado no ar
		  		player.frame = 1;
		  		pulo_cavalo.play();
		  }

// Fim de jogo, parada e apresentação da prenda e do gaucho
			if(score >= 25){
		  		player.frame = 0;
				nuvem.body.velocity.x = -3;
				nuvem2.body.velocity.x = -3;	
				papagaio1.body.velocity.x = -20;			
				montanha.body.velocity.x = 0;
				montanha2.body.velocity.x = 0;
				player.body.velocity.x = 0;
				sprite2.body.velocity.x = 0;	
				gaucho = game.add.sprite(200, 390, 'gaucho');
				gaucho.scale.setTo(0.5,0.5);
				game.add.sprite(400, 468, 'prenda');		
	   		} 


	}



	

	function collectStar(player,star){
				
		if (score >= 24){
	        txtFim = game.add.text(100,300,'Jogo completado', {fontSize:'46px',fill:'#fff'})
	        txtFim.text = 'Parabéns,nível completo!';
	        score = score + 0.5;
			txtScore.text = 'Pontos conquistados: ' + score;	

	    } else {
	    	score = score + 0.5;
			txtScore.text = 'Pontos conquistados: ' + score;
	    } 
	}

	function collisionHandler (obj1, obj2) {

    //game.stage.backgroundColor = '#892d2d';


	}

		function falaae () {

    fala = game.add.sprite(0, 100, 'fala_gaucho');
    setTimeout(function() {
      fala.kill()
  }, 3500) ;

	}


}());