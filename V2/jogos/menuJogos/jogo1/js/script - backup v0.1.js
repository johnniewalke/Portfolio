(function(){
	var game = new Phaser.Game(800,600,Phaser.AUTO,null,{preload:preload,create:create,update:update});//{}Qual fase);
	var platforms,player,keys,stars,txtScore,score = 12;
	function preload(){ // O que deve ser carregado antes do jogo iniciar
		game.load.image('ceu','img/sky2.png');
		game.load.image('platform','img/platform.png');
		game.load.image('star','img/star.png');
		game.load.spritesheet('cavalo','img/cavalo3.png',50,50);	
	}
	function create(){ // Criar elementos dentro do jogo (val, array)
		keys = game.input.keyboard.createCursorKeys(); // função que verifica o teclado
		game.physics.startSystem(Phaser.Physics.ARCADE);//sistema de física do Phaser
		game.add.sprite(0,0,'ceu');//(largura,altura)

		platforms = game.add.group();
		platforms.enableBody = true; // Habilita o corpo solido para todas plataformas do grupo
		var platform = platforms.create(0,game.world.height - 64,'platform');
			platform.scale.setTo(2,2); //Multiplica o tamanho da plataforma
			platform.body.immovable = true; // Deixa o chao estático
		//criando estrelas	
		stars = game.add.group();
		stars.enableBody = true;
		for (var i = 0; i < 12; i++){ // numeros de estrelas
			var star = stars.create(i*70,0,'star'); // 70 pixel entre as estrelas, 0 posição na tela
				star.body.gravity.y = 150;
				star.body.bounce.y = 0.7 + (Math.random()*0.5);
		}


		/////////////////////////////////////////// personagem
		player = game.add.sprite(90,game.world.height - 150,'cavalo');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 100; //intensidade da gravidade (y vertical)(x horizontal)
		player.body.bounce.y = 0.2; // reação da colisão(kikar)
		player.body.collideWorldBounds = true; //limitação da acão da gravidade(dentro da tela)
		/////////////////////////////////////////// animação
		player.animations.add('left',[1,0],10,true); //anime os frames[], velocidade da animação, loop da animação
		player.animations.add('right',[3,4],10,true);
		/////////////////////////////////////////// Score
		txtScore = game.add.text(16,100,'ESTRELA: 12', {fontSize:'32px',fill:'#fff'})

	}
	function update(){ // Logica do jogo que deve ser verificada a cada loop do jogo(colisão,movimentação)
		game.physics.arcade.collide(player,platforms); // verifica se o jogador interage com as plataformas
		game.physics.arcade.collide(stars,platforms); // interação estrela e plataforma
		game.physics.arcade.overlap(player,stars,collectStar);
		/////////////////////////////////////////// movimentação lateral
		player.body.velocity.x = 0;
		if(keys.left.isDown){ //movimento para esquerda do personagem
			player.body.velocity.x = -150;
			player.animations.play('left');
		} else
		if(keys.right.isDown){ //movimento para direita do personagem
			player.body.velocity.x = 150;
			player.animations.play('right');
		} else{
		  	player.animations.stop(); // parado de frente
		  	player.frame = 2;
		  }
		/////////////////////////////////////////// movimentação de pulo
		if(keys.up.isDown && player.body.touching.down){
			player.body.velocity.y = -150;
		}
	}
	function collectStar(player,star){
		star.kill();
		score = score - 1;
		txtScore.text = 'ESTRELA: ' + score;
	}
}());