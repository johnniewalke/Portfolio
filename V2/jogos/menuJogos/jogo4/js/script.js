(function(){
	//variável contadora de acertos. ao chegar em 8 o jogo termina
	var matches = 0;

	//imagem a ser exibida em caso de acerto
	var matchSign = document.querySelector("#match");

	//array que armazenará os objetos com src e id de 1 a 8
	var images = [];

	//-->array que armazena as cartas viradas
	var flippedCards = [];

	//---->referência ao elemento modal
	var modalGameOver = document.querySelector("#modalGameOver");
	

	//estrutura de atribiução das imagens aos card
	for(var i = 0; i < 18; i++){
		//cria um objeto img com um src e um id
		var img = {
			src: "img/" + i + ".png",
			id: i%9
		};
		
		//inserer o objeto criado no array
		images.push(img);
	}
	// console.log(images);

	//chama a função de inicialização do jogo
	startGame();
	//-->zera o array de cartas viradas
	flippedCards = [];
	
	//função de inicialização do jogo
	function startGame(){
		//embaralhamento do array de imagens
		images = randomSort(images);

		//lista de elementos div com as classes front
		var frontFaces = document.getElementsByClassName("front");
	
		//posicionamento das cartas
	/*	for(var i = 0; i < 16; i++){
			var card = document.querySelector("#card" + i);
			// console.log(card);
			card.style.left = (i % 8 === 0) ? 5 + "px" : (i % 8) * 133 + 5 + "px";
			card.style.top = i < 8 ? 5 + "px" : 202 + "px";
		}*/
		for(var i = 0; i < 18; i++){
			var card = document.querySelector("#card" + i);
			card.style.left = (i % 6 === 0) ? 5 + "px" : (i % 6) * 132 + 5 + "px";
			card.style.top = i < 6 ? 5 + "px" : (i < 12 ? 201 + "px" : 397 + "px");
			
			//adiciona às cartas o evento click chamando a função que vira as cartas(false é um medido de segurança)
			card.addEventListener("click",flipCard,false);
			
			//adiciona as imagense IDs às cartas
			frontFaces[i].style.background = "url('"+images[i].src+"')";
			frontFaces[i].setAttribute("id",images[i].id);
			//consolo.log(frontFaces[i]);
		}

		//===> volta com o modal para o fundo
		modalGameOver.style.zIndex = -2;
		modalGameOver.removeEventListener("click",startGame,false);
	}

	//função que embaralha as cartas recebendo um array por parâmetro
	function randomSort(oldArray){
		//console.log(Math.floor (Math.random()*11);
		//cria um array vazio
		var newArray = [];
		
		//executa o bloco de comandos enquanto o novo array não atingir o mesmo número de elementos do array passado por parâmetro
		while(newArray.length !== oldArray.length){
			//cria uma variável i recebendo um número aleatório entre 0 e o número de elementos do array -1
			var i = Math.floor(Math.random()*18);
			
			
			//verifica se o elemento indicado pelo índice i já existe no novo array
			if(newArray.indexOf(oldArray[i]) < 0){
				//caso o elemento não exista, ele é inserido
				newArray.push(oldArray[i]);
			}
		}
		
		//retorna o array novo, que agora possui todos os elementos do original porém organizados aleatóriamente
		return newArray;
		
	}

	//função que vira as cartas
	function flipCard(){
		//-->verifica se o número de cartas clicadas é menor que 2
		if(flippedCards.length < 2){
			//pega as faces da carta clicada
			var faces = this.getElementsByClassName("face");
			//console.log(faces[0]);
			//console.log(faces[0].classList.length);
			//-->confere se a carta já está virada, verificando a quantidade de classes da face. O que imprede que a mesma carta seja virada duas vezes
			if(faces[0].classList.length > 2){
				return;
			}

			//Ativa e desativa - adiciona a classe fliped às faces da carta para que sejam viradas
			faces[0].classList.toggle("flipped");
			faces[1].classList.toggle("flipped");
			//console.log(faces[0].classList);

			//-->adiciona a carta clicada ao array de cartas viradas
			flippedCards.push(this);

			//verifica se o número de cartas no array de cartas viradas é igual a 2
			if(flippedCards.length === 2){
				//compara o id das cartas viradas para ver se houve um acerto
				if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){
					//em caso de acerto adiciona a classe match a todas as faces das duas cartas presentes no array de cartas viradas
					flippedCards[0].childNodes[1].classList.toggle("match");
					flippedCards[0].childNodes[3].classList.toggle("match");
					flippedCards[1].childNodes[1].classList.toggle("match");
					flippedCards[1].childNodes[3].classList.toggle("match");
					
					//chama a função que exibe a mensagem MATCH
					matchCardsSign();
					
					//limpa o array de cartas viradas
					flippedCards = [];
					
					//soma um ao contador de acertos
					matches++;
					
					//verifica se o contador de acertos chegou a 8
					if(matches >= 10){
						//caso haja 8 acertos, chama a função que finaliza o jogo
						gameOver();
					}
				} 
			} 

		} else {
			// console.log(flippedCards);
			//-->em caso haver duas cartas no array de cartas viradas (terceiro click) remove a classe flipped das cartas no array de cartas viradas
			flippedCards[0].childNodes[1].classList.toggle("flipped");
			flippedCards[0].childNodes[3].classList.toggle("flipped");
			flippedCards[1].childNodes[1].classList.toggle("flipped");
			flippedCards[1].childNodes[3].classList.toggle("flipped");
			
			//-->limpa o array de cartas viradas
			flippedCards = [];
		}
	}

	/*window.setTimeout(function(){
		gameOver();
	},5000); */
	//====> função que trás o modal para frente
	function gameOver(){
		modalGameOver.style.zIndex = 99;
		modalGameOver.addEventListener("click",startGame,false);
	}

		//função que gera o sinal de MATCH
	function matchCardsSign(){
		//joga a mensagem de MATCH para o primeiro plano
		matchSign.style.zIndex = "1";
		
		//deixa a mensagem transparente
		matchSign.style.opacity = "0";
		
		//move a mensagem para cima
		matchSign.style.top = "150px";
		
		//função executada após 1.5 segundo
		setTimeout(function(){
			//joga a mensagem de MATCH para o plano de fundo
			matchSign.style.zIndex = "-1";
			
			//remove a transparência da mansagem
			matchSign.style.opacity = "1";
			
			//move a mensagem para o centro da tela
			matchSign.style.top = "250px";
		},1500);
	}//fim da função que exibe mensagem de MATCH
	

}());
