(function(){
	var game = new Phaser.Game(800,600,Phaser.AUTO,null,{preload:preload,create:create,update:update,funcErro:funcErro,fase1:fase1,updateText1:updateText1,updateText2:updateText2,destroySprite:destroySprite});
	var platforms,player,keys,stars,globSndStar,txtScore,score = 0;
	var keyShift,keyTio,keyAgudo,keyA,keyE,keyI,keyO,keyU;
	var gaucho,error,cont,fala,balao,iha,mu,laco,i,text,points,controle,v,vogais,print,vogais2,laco2;
			var timeSinceLastIncrement = 0;

	//var nFases = 10;
	WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Finger Paint']
    }

};
	
	function preload(){
		game.load.image('sky','img/farm.jpg');
		game.load.image('star','img/cow.png');
 game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		game.load.image('laco2','img/lll.png');
		    game.load.audio('mu', 'audio/Vaca.mp3');
		   game.load.audio('iha', 'audio/iha.wav');
		   game.load.audio('error', 'audio/alerta.mp3');


		//Carrega o arquivo de áudio
		
		game.load.image('dude','img/gauch.png');
		game.load.spritesheet('lacos','img/lacosl.png',187,190);
		game.load.image('balao','img/ba.png');
	}
	//var text;
	function create(){
		 this.game.input.keyboard.onDownCallback = function(e){
	switch(controle){

	case 0 :

		if(i==0||i==4||i==18||i==23){

			if(keyTio.isDown) {
 					if(keyTio.downDuration(10)){
					points = points+100;
					//print = { font: "20px Arial", fill: "#ff0000", align: "center" };
					mu.play();
					updateText1(); 	
				//pontos = game.add.text(10, 10, 'SCORE:' + points);
 					laco.animations.play('walk', 17, true); 	
					controle = 1;
					cont=0;
 				}
			}else{
				cont++;
				funcErro();
			}

		}else if(i==1||i==2||i==3||i==5||i==7||i==9||i==10||i==11||i==14||i==21||i==22||i==24){
			if(keyAgudo.isDown){
				if(keyAgudo.downDuration(10)){
					points = points+100;
					//print = { font: "20px Arial", fill: "#ff0000", align: "center" };
					mu.play();

					updateText1(); 	
				//pontos = game.add.text(10, 10, 'SCORE:' + points);
 					laco.animations.play('walk', 17, true); 	
					controle = 1;
					cont=0;
					
 				}

			}else{
				cont++;
				funcErro();
			}


		}else if(i==6||i==8||i==15||i==17||i==20){
			if(keyShift.isDown){
				if(keyTio.isDown){
					if(keyTio.downDuration(10)){
						points = points+100;
					//print = { font: "20px Arial", fill: "#ff0000", align: "center" };
					mu.play();

						updateText1(); 	
				//pontos = game.add.text(10, 10, 'SCORE:' + points);
 						laco.animations.play('walk', 17, true); 	
						controle = 1;
					cont=0;
 					}

				}else{
				cont++;
				funcErro();
				}

			}else{
				cont++;
				funcErro();
			}
		}else if(i==12||i==13||i==16||i==19){

			if(keyShift.isDown){
				if(keyAgudo.isDown){
					if(keyAgudo.downDuration(10)){
						points = points+100;
					//print = { font: "20px Arial", fill: "#ff0000", align: "center" };
					mu.play();

						updateText1(); 	
				//pontos = game.add.text(10, 10, 'SCORE:' + points);
 						laco.animations.play('walk', 17, true); 	
						controle = 1;
						cont=0;
					
 					}

				}else{
				cont++;
				funcErro();
			}

			}else{
				cont++;
				funcErro();
			}

		}
		break;

	case 1:
 	 
 	 	if(i==0||i==7||i==13||i==15 ||i==20){

 				if(keyA.isDown) {
 					if(keyA.downDuration(10)){
					points = points+100;
				//pontos = game.add.text(10, 10, 'SCORE:' + points);
					
					laco.kill();
					laco2 = game.add.sprite(65,319,'laco2');
					iha.play();
					updateText2();

					controle = 2;
					//game.paused = true;
					cont=0;
				
 				}
 			
 			}else{
				cont++;
				funcErro();
			}
 		}else if(i==1||i==5||i==14||i==19||i==22){

 			if(keyI.isDown) {
 					if(keyI.downDuration(10)){
					points = points+100;
				//pontos = game.add.text(10, 10, 'SCORE:' + points);
					
					laco.kill();
					laco2 = game.add.sprite(65,319,'laco2');
					iha.play();
					updateText2();

					controle = 2;
					//game.paused = true;
					cont=0;
				
 				}
 			
 			}else{
				cont++;
				funcErro();
			}
 		} else if(i==2||i==9||i==10||i==16||i==24){

 			if(keyU.isDown) {
 					if(keyU.downDuration(10)){
					points = points+100;
				//pontos = game.add.text(10, 10, 'SCORE:' + points);
					
					laco.kill();
					laco2 = game.add.sprite(65,319,'laco2');
					iha.play();
					updateText2();

					controle = 2;
					//game.paused = true;

				cont=0;
 				}
 			
 			}else{
				cont++;
				funcErro();
			}

 			
 		}else if(i==3||i==6||i==12||i==17||i==21){

 			if(keyE.isDown) {
 					if(keyE.downDuration(10)){
					points = points+100;
				//pontos = game.add.text(10, 10, 'SCORE:' + points);
					
					laco.kill();
					laco2 = game.add.sprite(65,319,'laco2');
					iha.play();
					updateText2();

					controle = 2;
					//game.paused = true;
					cont=0;
				
 				}
 			
 			}else{
				cont++;
				funcErro();
			}


 		} else if(i==4||i==8||i==11||i==18||i==23){

 			if(keyO.isDown) {
 					if(keyO.downDuration(10)){
					points = points+100;
				//pontos = game.add.text(10, 10, 'SCORE:' + points);
					
					laco.kill();
					laco2 = game.add.sprite(65,319,'laco2');
					iha.play();
					updateText2();

					controle = 2;
					//game.paused = true;
					cont=0;
				
 				}
 			
 			}


 		}

 	}
 		
	};   
		//keys=game.input.keyboard.createCursorKeys();
		game.physics.startSystem(Phaser.Physics.ARCADE);
	
		game.add.sprite(0,0,'sky');
		vaca = game.add.sprite(520,300,'star');
		vaca.scale.setTo(0.5,0.5);
		gaucho=game.add.sprite(130,360,'dude');
				gaucho.scale.setTo(0.4,0.4);

		balao= game.add.sprite(25,255,'balao');
		balao.scale.setTo(0.4,0.4);
		laco = game.add.sprite(210,338,'lacos');
	//	game.physics.arcade.enable(laco);

		var walk = laco.animations.add('walk');

		print3 = { font: "14px Finger Paint", fill: "#000000", align: "center" };
    	
	//while(i<=25){
 			fala=game.add.text(45, 266, 'Tu queres me ajudar\n a laçar a vaca?\n Digite o acento e a vogal\n indicados.',print3);
	
		//
		   mu = game.add.audio('mu');
iha = game.add.audio('iha');
error  = game.add.audio('error');
		keys = game.input.keyboard.create

	    keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
	    keyE = game.input.keyboard.addKey(Phaser.Keyboard.E);
	    keyI = game.input.keyboard.addKey(Phaser.Keyboard.I);
	    keyO = game.input.keyboard.addKey(Phaser.Keyboard.O);
	    keyU = game.input.keyboard.addKey(Phaser.Keyboard.U);

	   	keyShift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
	   	keyTio = game.input.keyboard.addKey(Phaser.Keyboard.QUOTES);
	   	keyAgudo = game.input.keyboard.addKey(Phaser.Keyboard.OPEN_BRACKET);

	   	//acento agudo = OPEN_BRACKET
	   	//	TIO = QUOTES
		
	 points = 0;
	 cont=0;
	 fase1();
		
	
	}

	function fase1(){




	 vogais= ['ã','í','ú','é','õ','í','ê','á','ô','ú','ú','ó','è','à','í','â','ù','ê','õ','ì','â','é','í','õ','ú'];
	 	 vogais2= ['a','i','u','e','o','i','e','a','o','u','u','o','e','a','i','a','u','e','o','i','a','e','i','o','u'];

		var acentos = ['´','`','~','^'];
		
    	print = { font: "50px Arial", fill: "#000000", align: "center" };
    	var print2 = { font: "60px Arial", fill: "#ff0044", align: "center" };
    	i = 0;

	//while(i<=25){
 			v = game.add.text(685, 390, vogais[i], print);
 			game.add.text(10, 5, 'PONTOS PARA FINALIZAR: 5000');
	

 			pontos = game.add.text(10, 30, 'PONTOS CONQUISTADOS:' + points);
	
				controle=0;


	}

	function funcErro(){
		if(cont==1){
			fala.setText("\nOPSSS!! TECLA ERRADA!!");
			error.play();
		}else if(cont==2){
			fala.setText("BAHH...\n     NÃO TE ESQUECE: \n     PRIMEIRO O ACENTO,\n    DEPOIS A VOGAL");
			error.play();

		}else if(cont==3){
			fala.setText(" PARA DIGITAR A CRASE (`)\n OU O CIRCUNFLEXO (^)\nPRESSIONE A TECLA 'SHIFT'   ");
						error.play();

		}else if(cont==4){
			fala.setText("     CONFERE DE NOVO,\n     A LETRA E O ACENTO,\n     NO COSTADO DA VACA");
						error.play();


		}else if(cont==5){
			fala.setText("\nMEU BRAÇO ESTÁ CANSANDO.");
						error.play();

		}else if(cont==6){
			fala.setText("\nPRETEOU O OLHO DA GATEADA");
						error.play();

		}else {
			fala.setText("\nNÃO TÁ MORTO QUEM PELEIA!!\n TE CONCENTRA!!");
						error.play();


		}
	}



function update(){

	
	if(controle==3){
		//game.paused=false;

 		
 		laco2.kill();
 		if(i<24){
 					fala.setText("\n     Continue me ajudando\n    na lida campeira!!");
 				}
		laco = game.add.sprite(210,338,'lacos');
	//	game.physics.arcade.enable(laco);

		walk = laco.animations.add('walk');
		i++;
		v = game.add.text(685, 390, vogais[i], print);
		controle=0;
		

 	}else if(controle==2){

  // Update the variable that tracks total time elapsed
		timeSinceLastIncrement += game.time.elapsed;
  
  		if (timeSinceLastIncrement >= 1000) {
  	//		game.paused=false;
  	timeSinceLastIncrement = 0;
 
  			controle=3;
    		   
    // Do your timed code here.
  		}

  	}
	

 	

	//}

}

function destroySprite (sprite) {
    sprite.destroy();

}


function updateText1() {
if(cont==0){
	fala.setText("    De vereda!\n     O laço está girando.\n     Agora tecle a vogal.",print3);
 }else if(cont==1){
	fala.setText("  Aprendeu rápido!\n     O laço está girando.\n     Agora tecle a vogal.",print3);
 }else{
 	fala.setText("Muito bem! Antes tarde\ndo que mais tarde ainda!\nO laço está girando.\n Agora tecle a vogal.",print3);

 }

  	v.setText(vogais2[i]);
  	    pontos.setText("PONTOS CONQUISTADOS: " + points);



}

function updateText2() {

	if(i==24){
v.setText("  ");
	fala.setText("MAZÁÁ VIVENTE!!!\n PARABÉNS!!\n COMPLETASTE O JOGO\n COM SUCESSO!!.");
    pontos.setText("PONTOS CONQUISTADOS: " + points);


	}else if(i<10){

	v.setText("  ");
	fala.setText("\n MAS QUE BAITA GAUCHADA!\n A VACA FOI LAÇADA");
    pontos.setText("PONTOS CONQUISTADOS: " + points);
}else if(i<20){

	v.setText("  ");
	fala.setText("OIGALÊ!!\n A VACA FOI LAÇADA! ");
    pontos.setText("PONTOS CONQUISTADOS: " + points);

} else if(i<24){
		v.setText(" ");
	fala.setText("MUITO BEM!!\n A VACA FOI LAÇADA!! ");
    pontos.setText("PONTOS CONQUISTADOS: " + points);

}

}




}());




    //
  //  
   // 

    	//
    	//
  	//	text = game.add.text(300, 264, '%s', { font: "28px Arial", fill: "#ff0044" },vogal);



    //}



	//
	/*function sortearAcento(int i){
		if((i==0)||(i==9)){
			return '´';

		}else if((i==1)||(i==8)){
			return '^';
		}else if((i==2)||(i==5)){
			return '`';
		}else if((i==3)||(i==6)){
			return '~';
		}else {
			return'´';
		}

	}
	
	*/	
	





































