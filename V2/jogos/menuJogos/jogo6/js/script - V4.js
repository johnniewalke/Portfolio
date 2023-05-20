(function(){
	var game = new Phaser.Game(800,600,Phaser.AUTO,null,{preload:preload,create:create,update:update});//{}Qual fase);
	var platforms,player,keys,stars,txtScore,score = 15, letraAtual, galinhaAtual;
	var colidiu, isOvoQuebrado;

	function preload(){ // O que deve ser carregado antes do jogo iniciar
		game.load.image('fundo','img/Fundo_Galinheiro_V4.png');
		game.load.image('platform','img/platform.png');
		game.load.spritesheet('ovo','img/ovo_inteiro.png');	
		game.load.spritesheet('ovoQuebrado','img/ovoQuebrado.png');	
		game.load.spritesheet('galinha','img/galinha_gigante.png',1000,1000);
	}
	function create(){ // Criar elementos dentro do jogo (val, array)
		colidiu = false;
		isOvoQuebrado = false;
		
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
				novo();
			}	
		};
		
		game.physics.startSystem(Phaser.Physics.ARCADE);//sistema de física do Phaser
		game.add.sprite(0,0,'fundo');//(largura,altura)

		platforms = game.add.group();
		platforms.enableBody = true; // Habilita o corpo solido para todas plataformas do grupo
		var platform = platforms.create(0,game.world.height - 112,'platform');
			platform.scale.setTo(2,1); //Multiplica o tamanho da plataforma
			platform.body.immovable = true; // Deixa o chao estático

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
		botaOvo();


	}
	
	function update(){ // Logica do jogo que deve ser verificada a cada loop do jogo(colisão,movimentação)
		//colidiu = game.physics.arcade.collide(ovoOk,platforms); // verifica se o jogador interage com as plataformas
		/////////////////////////////////////////// movimentação lateral
		
		if (game.physics.arcade.collide(ovoOk,platforms)){
			quebraOvo();
		}

	}
	function collectStar(player,star){
		score = score - 1;
		txtScore.text = 'ESTRELA: ' + score;
	}

	function quebraOvo(player,platforms){	
		if(!isOvoQuebrado){
			isOvoQuebrado = true;
		}else{
			player2 = game.add.sprite(ovoOk.x -25, ovoOk.y,'ovoQuebrado');
			player2.scale.setTo(0.035,0.035);		
		}
		ovoOk.kill();
		v.kill();
		sorteiaLetra();
		novo();	
	}
	
	function novo(){
		sorteiaLetra();
		galinhaAtual.animations.play('bota');
		ovoOk =  game.add.sprite(galinhaAtual.x+70, galinhaAtual.height+70, 'ovo');
		ovoOk.scale.setTo(0.07,0.07);
		game.physics.enable(ovoOk, Phaser.Physics.ARCADE);
		ovoOk.body.collideWorldBounds = true;
	    ovoOk.body.velocity.y = 100;		
		game.physics.arcade.enable(ovoOk);	
		
		print = { font: "40px Arial", fill: "#000000", align: "center" };	
		v = game.add.text(ovoOk.x, ovoOk.y, letraAtual, print);
		
		game.physics.enable(v, Phaser.Physics.ARCADE);
		v.body.velocity.y = 100;
	}
	
	function botaOvo(){
		sorteiaLetra();
		v = game.add.text(-30, -30, "");
		print = { font: "40px Arial", fill: "#ffffff", align: "center" };	
		
		ovoOk = game.add.text(galinha2.x, 400, "");
		game.physics.enable(ovoOk, Phaser.Physics.ARCADE);
	    ovoOk.body.velocity.y = 100;
		
		game.physics.arcade.enable(ovoOk);
		//letra="I";
		
		var x, y;
		if(letra == "M"){	
			x = ovoOk.x+5;
			y = ovoOk.y+8;
		}else if(letra == "I") {
			x = ovoOk.x+17;
			y = ovoOk.y+8;
		} else {
			x = ovoOk.x+5;
			y = ovoOk.y-2;
		}
		
		print = { font: "40px Arial", fill: "#000000", align: "center" };	
		v = game.add.text(-70,0, letraAtual, print);
		
		
		game.physics.enable(v, Phaser.Physics.ARCADE);
		v.body.velocity.y = 100;
	
		novo();
		ovoOk.body.collide(platforms);
		game.physics.add.collider(platforms, ovoOk);
		game.physics.add.collider(platforms, ovoOk, collisionHandler, null, this);	
	}

	function sorteiaLetra(){
		letras1 = ['q','w','e','a','s','d', 'z', 'x', 'c'];
		letras2 = ['r','t','y','f','g','h','v','b','n'];
		letras3 = ['u', 'i', 'o', 'p','j','k','l','ç','m'];
	
		var selecGal,selecLetra;
		sortGalinha = Math.floor(Math.random() * 3); // sorteia a galinha 
	
		// atribui a galinha  e vetor de letras sorteado
		if(sortGalinha==0){
			galinhaAtual = galinha1;
			selecLetra = letras1;
		}if(sortGalinha==1){
			galinhaAtual = galinha2;
			selecLetra = letras2;
		}if(sortGalinha==2){
			galinhaAtual = galinha3;
			selecLetra = letras3;
		}
		sortLetra = Math.floor(Math.random() * 9); // sortei a letra da galinha	
		letraAtual = selecLetra[sortLetra].toUpperCase();	
		
				
	}
}());