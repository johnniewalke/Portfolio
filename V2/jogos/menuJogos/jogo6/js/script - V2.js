(function(){
	var game = new Phaser.Game(800,600,Phaser.AUTO,null,{preload:preload,create:create,update:update});//{}Qual fase);
	var platforms,player,keys,stars,txtScore,score = 15;
	var colidiu;

	function preload(){ // O que deve ser carregado antes do jogo iniciar
		game.load.image('fundo','img/Fundo_Galinheiro_V4.png');
		game.load.image('platform','img/platform.png');
		game.load.spritesheet('ovo','img/ovo_inteiro.png');	
		game.load.spritesheet('ovoQuebrado','img/ovoQuebrado.png');	
		game.load.spritesheet('galinha','img/galinha_gigante.png',1000,1000);
	}
	function create(){ // Criar elementos dentro do jogo (val, array)
		keys = game.input.keyboard.createCursorKeys(); // função que verifica o teclado
		game.physics.startSystem(Phaser.Physics.ARCADE);//sistema de física do Phaser
		game.add.sprite(0,0,'fundo');//(largura,altura)

		platforms = game.add.group();
		platforms.enableBody = true; // Habilita o corpo solido para todas plataformas do grupo
		var platform = platforms.create(0,game.world.height - 112,'platform');
			platform.scale.setTo(2,1); //Multiplica o tamanho da plataforma
			platform.body.immovable = true; // Deixa o chao estático

		/////////////////////////////////////////// personagem
		player = game.add.sprite(220,game.world.height - 400,'ovo');
		player.scale.setTo(0.05,0.05)
		game.physics.arcade.enable(player);

		/////////////////////////////////////////// animação
		player.animations.add('left',[1,0],10,true); //anime os frames[], velocidade da animação, loop da animação
		player.animations.add('right',[3,4],10,true);

		this.game.input.keyboard.onDownCallback = function(e){
			
			letraMinuscula = letraAtual.toLowerCase();
			letraMaiuscula = letraAtual.toUpperCase();
			
			codeMaiuscula = letraMaiuscula.charCodeAt(0);
			codeMinuscula = letraMinuscula.charCodeAt(0);
			
			if(e.keyCode==codeMaiuscula || e.keyCode==codeMinuscula){
				ovoOk.kill();
				v.kill();
				galinha1.animations.stop(0);
				galinha2.animations.stop(0);
				galinha3.animations.stop(0);
			}	
		};

		/////////////////////////////////////////// Galinhas,tamanho,animação
		galinha1 = game.add.sprite(150,80, 'galinha');
		galinha1.scale.setTo(0.18, 0.20);
		galinha1.animations.add('bota',[0,1],3.2,true); //anime os frames[], velocidade da animação, loop da animação
	//	galinha1.animations.play('bota');
		
		galinha2 = game.add.sprite(325,80, 'galinha');
		galinha2.scale.setTo(0.18, 0.20);
		galinha2.animations.add('bota',[0,1],3,true); //anime os frames[], velocidade da animação, loop da animação
	//	galinha2.animations.play('bota');
		
		galinha3 = game.add.sprite(500,80, 'galinha');
		galinha3.scale.setTo(0.18, 0.20);
		galinha3.animations.add('bota',[0,1],2.8,true); //anime os frames[], velocidade da animação, loop da animação
	//	galinha3.animations.play('bota');
		sorteiaLetra();

	}
	function update(){ // Logica do jogo que deve ser verificada a cada loop do jogo(colisão,movimentação)
		colidiu = game.physics.arcade.collide(ovoOk,platforms); // verifica se o jogador interage com as plataformas
		game.physics.arcade.collide(stars,platforms); // interação estrela e plataforma
		game.physics.arcade.overlap(player,platforms,quebraOvo);
		/////////////////////////////////////////// movimentação lateral

		if (colidiu === true){
		quebraOvo();
		}

	}
	function collectStar(player,star){
		score = score - 1;
		txtScore.text = 'ESTRELA: ' + score;
	}

		function quebraOvo(player,platforms){	
		player2 = game.add.sprite(ovoOk.x -25, ovoOk.y,'ovoQuebrado');
		player2.scale.setTo(0.035,0.035)
		ovoOk.kill();
		v.kill();

	}
		function botaOvo(galinha, letra){
	
		galinha.animations.play('bota');
	
		game.input.keyboard.addKey(Phaser.Keyboard.UP)
		print = { font: "40px Arial", fill: "#000000", align: "center" };	
		
		ovoOk = game.add.sprite(galinha.x+70, galinha.height+70, 'ovo');
		ovoOk.scale.setTo(0.07,0.07);
		
		game.physics.enable(ovoOk, Phaser.Physics.ARCADE);
		ovoOk.body.collideWorldBounds = true;
	    ovoOk.body.velocity.y = 50;
		
		game.physics.arcade.enable(ovoOk);
		//letra="I";
		if(letra == "M"){
			v = game.add.text(ovoOk.x+5, ovoOk.y+8, letra, print);
		} 
		else if(letra == "I") {
			v = game.add.text(ovoOk.x+17, ovoOk.y+8, letra, print);
		} else {
			v = game.add.text(ovoOk.x+5, ovoOk.y-2, letra, print);
		}

	    	game.physics.enable(v, Phaser.Physics.ARCADE);
			v.body.velocity.y = 50;
			v.body.collideWorldBounds = true;

		ovoOk.body.collide(platforms);
		game.physics.add.collider(platforms, ovoOk);
		game.physics.add.collider(platforms, ovoOk, collisionHandler, null, this);
		galinha = game.add.sprite(galinha.x,galinha.y, 'galinha');
		galinha.frame = 1;
	}

		function sorteiaLetra(){
		letras1 = ['q','w','e','a','s','d', 'z', 'x', 'c'];
		letras2 = ['r','t','y','f','g','h','v','b','n'];
		letras3 = ['u', 'i', 'o', 'p','j','k','l','ç','m'];
	
		var selecGal,selecLetra;
		sortGalinha = Math.floor(Math.random() * 3); // sorteia a galinha 
	
		// atribui a galinha  e vetor de letras sorteado
		if(sortGalinha==0){
			selecGal = galinha1;
			selecLetra = letras1;
		}if(sortGalinha==1){
			selecGal = galinha2;
			selecLetra = letras2;
		}if(sortGalinha==2){
			selecGal = galinha3;
			selecLetra = letras3;
		}

		
		sortLetra = Math.floor(Math.random() * 9); // sortei a letra da galinha
		
		letraAtual = selecLetra[sortLetra].toUpperCase();
		botaOvo(selecGal, letraAtual);
				
		}
}());