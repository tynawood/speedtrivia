////////////////////////////////////////////////////////////
// GAME
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */
var loadingText = 'LOADING...'; //text for loading...
var startButtonText =document.getElementById('stbn'); //text for start button

 var ansA = document.getElementById('Ansa').innerHTML;


document.getElementById('Ansa').style.display="none";
document.getElementById('Ansa').style.color='#ccc';

// ansA.innerHTML = '<span style="font-size:40px">John Doe</span>';

//ansA.style.background="#00ff00";
 //startButtonText.position='absolute';

 //startButtonText.position.style.position = 'absolute';
 //startButtonText.position.style.left = '10px';
 //startButtonText.position.style.top = '10px';
 //startButtonText.position.style.width = '300px';
 //startButtonText.position.style.height = '300px';
 //startButtonText.position.style.padding = '10px';
 //startButtonText.position.style.background = '#00ff00';

var categoryPage = false; //show/hide category select page
var categoryAllOption = true; //add ALL category select option
var categoryContinueText = 'SELECT'; //text for category page button
var categoryAllText = 'All'; //text for all category select option

var backgroundColour = ''; //background colour
var questionTextColour = '#000'; //question text colour
var answerTextColour = '#e8b012'; //answer text colour
var questionTextSize = 50; //question text size
var answerTextSize = 50; //answer text size
var textLineHeight = 5; //text line height
var questionTextDisplay = '[NUMBER] ';

//questionTextDisplay.style.marginLeft = '50px';
//var questionTextDisplay = 'Q[NUMBER] / [TOTAL]:'; //current question and total question display
var questionTextAlign = 'center'; //question text align, for now only support align center
var questionStartY = 170; //question starting position y
var questionImageOffsetY = -60; //question image format offset y

var answerListsEnable = true; //enable answer list style
var answerLists = ['(a) ','b) ','c) ','d) ','e) ','f) ','g) ','h) ']; //answer list style formatn, maximum 8
var answerAnimationEnable = true; //enable answer animation

var answerButtonBgEnable = true; //toggle answer button background
var answerButtonBgRoundNumber = 35; //answer button background round corner number
var answerButtonBgShadowNumber = 20; //answer button background shadow
var answerButtonBgColour = '#000'; //answer button background colour
//answerButtonBgColour.Transform(1, Math.tan(angle), 0, 1, 0, 0);
var answerButtonBgShadowColour = '#856113'; //answer button background shadow colour
var answeredButtonBgColour = '#fff'; //answered button background colour
var answeredButtonBgShadowColour = '#856113'; //answered button background shadow colour
var answerButtonPositionOffsetY = -15; //answer button background offsey y

var audioQuestionDelay = 300;
var audioAnswerDelay = 100;

var textHeight = 70; //text height
var textSpace = 25; //text spacing

var timerStart = 20; //timer start number
var timerBarHeight = 10; //timer bar height
var timerBarColour = '#fff'; //timer bar colour

var animateCorrectEnable = true; //toggle answer correct animation
var randomQuestionEnable = true; //toggle random question

var resultTitleText = 'You are going to want to give up but DONT!\n Your Score is '; //text for result page title
var replayButtonText = 'JUST TRY AGAIN'; //text for replay button


//Social share, [SCORE] will replace with game score
var shareText ='SHARE YOUR SCORE WITH FRIENDS'; //text for share instruction
var shareTitle = 'Highscore on UMB SPEED TRIVIA GAME is [SCORE]';//social share score title
var shareMessage = '[SCORE] is mine new highscore on UMB SPEED TRIVIA GAME! Try it now!'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
var editQuestion = false;
var question_arr = [];
var answerType_arr = ['2type1','2type2','3type1','3type2','3type3','4type1','4type2','4type3','5type1','5type2','5type3','6type1','6type2','7type1','7type2','8type1','8type2'];

var questionCountNum = 0;
var sequenceCountNum = 0;
var playerData = {timer:0, timerCount:0, timerWidth:0, score:0, answered:false};
var sequence_arr = [];

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	replayButton.cursor = "pointer";
	replayButton.addEventListener("click", function(evt) {
		playSound('soundSelect');
		if(categoryPage){
			goPage('category');
		}else{
			goPage('game');
		}
	});
	
	iconFacebook.cursor = "pointer";
	iconFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	iconTwitter.cursor = "pointer";
	iconTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	//iconGoogle.cursor = "pointer";
	//iconGoogle.addEventListener("click", function(evt) {
	//	share('google');
	//});
}
function setupTouchEvent(){
	stage.cursor = "pointer";
	stage.addEventListener("click", handlerTouchMethod);
}

function removeTouchEvent(){
	stage.cursor = null;
	stage.removeEventListener("click", handlerTouchMethod);
}

function handlerTouchMethod(evt) {
	 switch (evt.type){
		 case 'click':
		 	if(curPage=='category'){
				//category page
				var touchX = (evt.stageX / scalePercent);
				if(touchX < canvasW/100 * 15){
					playSound('soundWhoosh');
					//left
					toggleCategory(false);
				}else if(touchX > canvasW/100 * 85){
					playSound('soundWhoosh');
					//right
					toggleCategory(true);
				}else{
					playSound('soundSelect');
					//choose
					goPage('game');
				}
			}else{
				//main page
				if(question_arr.length!=0){
					playSound('soundSelect');
					if(categoryPage){
						goPage('category');
					}else{
						goPage('game');
					}
				}
			}
		 	break;
	 }
}

/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainLettersAnimate=false;
	mainContainer.visible=false;
	categoryContainer.visible=false;
	gameContainer.visible=false;
	resultContainer.visible=false;
	
	removeTouchEvent();
	stopAnimateButton(startButton);
	stopAnimateButton(categoryContinueTxt);
	stopAnimateButton(replayButton);
	
	var targetContainer = ''
	switch(page){
		case 'main':
			stopSoundLoop('musicGame');
			playSoundLoop('musicMain');
			
			targetContainer = mainContainer;
			startAnimateButton(startButton);
			setupTouchEvent();

		break;
		
		case 'category':
			targetContainer = categoryContainer;
			
			setTimeout(function() {
				setupTouchEvent();
			}, 200);
			startAnimateButton(categoryContinueTxt);
			displayCategoryName();
		break;
		
		case 'game':
			stopSoundLoop('musicMain');
			//playSoundLoop('musicGame');
			
			targetContainer = gameContainer;
			startGame();
			 $("#mainHolder").css("background-image", "url('assets/bg1.png')");
		break;
		
		case 'result':
			stopSoundLoop('musicGame');
			playSoundLoop('musicMain');
			
			targetContainer = resultContainer;
			stopGame();

			 if(playerData.score==10){
alert("You  Scored  All Questions\n\nWoohoo!! That's wasup, \n you are a few steps away from the dream so don't give up! \n\n Continue to Intermediate Dream" 
	);
window.location.href ="https://www.xbard.com/game/level2/index.html";
			 }
			else{

				/*alert("move to next level");*/
				startAnimateButton(replayButton);}
			
		break;
	}
	targetContainer.alpha=0;
	targetContainer.visible=true;
	$(targetContainer)
	.clearQueue()
	.stop(true,true)
	.animate({ alpha:1 }, 500);
}

/*!
 * 
 * SWITCH CATEGORY - This is the function that runs to select category name
 * 
 */
var category_arr=[];
var categoryNum=0;

function toggleCategory(con){
	if(con){
		categoryNum++;
		categoryNum=categoryNum>category_arr.length-1?0:categoryNum;
	}else{
		categoryNum--;
		categoryNum=categoryNum<0?category_arr.length-1:categoryNum;
	}
	displayCategoryName();
}

function displayCategoryName(){
	categoryTitleTxt.text = category_arr[categoryNum];
}

/*!
 * 
 * FILTER CATEGORY WORD - This is the function that runs to filter category
 * 
 */
function filterCategoryQuestion(){
	sequence_arr = [];
	for(n=0;n<question_arr.length;n++){
		sequence_arr.push(n);
	}
	
	if(editQuestion){
		return;
	}
	
	//do nothing if category page is off
	if(!categoryPage){
		return;
	}
	
	//do nothing if category all is selected
	if(categoryAllOption && category_arr[categoryNum] == categoryAllText){
		return;
	}
	
	//filter the category
	sequence_arr = [];
	for(n=0;n<question_arr.length;n++){
		if(category_arr[categoryNum] == question_arr[n].category){
			sequence_arr.push(n);
		}
	}
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
 function startGame(){	
	questionCountNum = 0;
	sequenceCountNum = 0;
	playerData.score = 0;
	
	updateScore();
	filterCategoryQuestion();
	if(randomQuestionEnable && !editQuestion){
		shuffle(sequence_arr);	
	}
	loadQuestion();
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	toggleGameTimer(false);
}

/*!
 * 
 * START ANIMATE BUTTON - This is the function that runs to play blinking animation
 * 
 */
function startAnimateButton(obj){
	obj.alpha=0;
	$(obj)
	.animate({ alpha:1}, 500)
	.animate({ alpha:0}, 500, function(){
		startAnimateButton(obj);	
	});
}

/*!
 * 
 * STOP ANIMATE BUTTON - This is the function that runs to stop blinking animation
 * 
 */
function stopAnimateButton(obj){
	obj.alpha=0;
	$(obj)
	.clearQueue()
	.stop(true,true);
}


/*!
 * 
 * LOAD QUESTION - This is the function that runs to load new question
 * 
 */
function loadQuestion(){
	toggleQuestionLoader(true);
	resetQuestion();
	imageFest=[];
	
	sequenceCountNum = sequence_arr[questionCountNum];
	if(question_arr[sequenceCountNum].type == 'image'){
		imageFest.push({src:question_arr[sequenceCountNum].question, id:'questionImage'})
	}
	
	var questionAudio = question_arr[sequenceCountNum].audio;
	questionAudio = questionAudio == undefined ? '' : questionAudio;
	if(questionAudio != ''){
		audio_arr.push({type:'question', id:'questionAudio', list:0});
		imageFest.push({src:question_arr[sequenceCountNum].audio, id:'questionAudio'})
	}
	
	for(n=0;n<question_arr[sequenceCountNum].answer.length;n++){
		if(question_arr[sequenceCountNum].answer[n].type == 'image'){
			imageFest.push({src:question_arr[sequenceCountNum].answer[n].text, id:'answerImage'+n})
		}
		
		var answerAudio = question_arr[sequenceCountNum].answer[n].audio;
		answerAudio = answerAudio == undefined ? '' : answerAudio;
		if(answerAudio != ''){
			audio_arr.push({type:'answer', id:'answerAudio'+n, list:n});
			imageFest.push({src:question_arr[sequenceCountNum].answer[n].audio, id:'answerAudio'+n})
		}
	}
	
	if(imageFest.length > 0){
		loadQuestionAssets();	
	}else{
		buildQuestion();
	}
}

/*!
 * 
 * BUILD QUESTION - This is the function that runs to build question
 * 
 */
function buildQuestion(){
	toggleQuestionLoader(false);
	if(!editQuestion){
		toggleGameTimer(true);
	}
	
	var curQuestionText = questionTextDisplay.replace('[NUMBER]', (questionCountNum+1));


	curQuestionText = curQuestionText.replace('[TOTAL]', sequence_arr.length);
	questionTxt.text = curQuestionText;
	var questionType = question_arr[sequenceCountNum].type;
	
	if(questionType == 'image'){
		$.question['q'+questionCountNum] = new createjs.Bitmap(imageLoader.getResult('questionImage'));
		$.question['q'+questionCountNum].regX = $.question['q'+questionCountNum].image.naturalWidth/2;
		$.question['q'+questionCountNum].regY = 0;
		$.question['q'+questionCountNum].x = canvasW/2;
		$.question['q'+questionCountNum].y = questionStartY+questionImageOffsetY;
		
		questionContainer.addChild($.question['q'+questionCountNum]);
	}else{
		var fontSize = question_arr[sequenceCountNum].fontSize;
		fontSize = fontSize == undefined ? questionTextSize : fontSize;
		$.question['q'+questionCountNum] = new createjs.Text();
		$.question['q'+questionCountNum].font = fontSize+"px bariol_regularregular";
		$.question['q'+questionCountNum].lineHeight = Number(fontSize)+Number(textLineHeight);
		$.question['q'+questionCountNum].color = questionTextColour;
		$.question['q'+questionCountNum].textAlign = questionTextAlign;
		$.question['q'+questionCountNum].textBaseline='alphabetic';
		
		$.question['q'+questionCountNum].x = canvasW/2;
		$.question['q'+questionCountNum].y = questionStartY;
		
		$.question['q'+questionCountNum].text = question_arr[sequenceCountNum].question;
		questionContainer.addChild($.question['q'+questionCountNum]);
	}
	
	buildAnswers();
	
	if(audio_arr.length == 0){
		initanimateAnswerss();
	}else if(audio_arr.length == 1 && audio_arr[0].type == 'question'){
		initanimateAnswerss();	
	}
	
	questionContainer.alpha = 0;
	TweenMax.to(questionContainer, .5, {alpha:1, overwrite:true, onComplete:function(){
		if(audio_arr.length > 0)
			playAudioLoop();
	}});
}


/*!
 * 
 * AUDIO - This is the function that runs to play question and answer audio
 * 
 */
var audioNum = 0;
var audio_arr = [];
var audioInterval = null;
function playAudioLoop(){
	toggleAudioInterval(false);
	if(audio_arr[audioNum].type == 'question'){
		playAudio(audio_arr[audioNum].id);
	}else if(audio_arr[audioNum].type == 'answer'){
		playAudio(audio_arr[audioNum].id);
		animateAnswer(audio_arr[audioNum].list);
	}
}

function playAudioComplete(){
	audioNum++;
	if(audioNum < audio_arr.length){
		toggleAudioInterval(true);
	}
}

function toggleAudioInterval(con){
	if(con){
		var audioTimer = audioAnswerDelay;
		if(audio_arr.length > 0 &&audio_arr[audioNum].type == 'question'){
			audioTimer = audioQuestionDelay	
		}
		audioInterval = setInterval(function(){
			playAudioLoop();
		}, audioTimer);
	}else{
		clearInterval(audioInterval);
		audioInterval = null;
	}
}


/*!
 * 
 * BUILD ANSWERS - This is the function that runs to build answers
 * 
 */
function buildAnswers(){
	playerData.answered = false;
	
	var startX = 0;
	var startY = 0;
	var curTextSpace = 0;
	var answerLayoutPosition_arr = [];
	var answerLayoutDimension_arr = [];
	var ansersbackground='#000';
	
	if(question_arr[sequenceCountNum].answerLayout == answerType_arr[0]){
		startY = canvasH/100 * 58;
		curTextSpace = textSpace+(textSpace/2);
		answerLayoutPosition_arr = [{x:canvasW/2, y:startY},
									{x:canvasW/2, y:startY + textHeight + curTextSpace}];
									
		answerLayoutDimension_arr = [{w:canvasW/100 * 80, h:textHeight},
									{w:canvasW/100 * 80, h:textHeight}];
									
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[1]){
		startY = canvasH/100 * 58;
		answerLayoutPosition_arr = [{x:canvasW/100 * 30, y:startY},
									{x:canvasW/100 * 70, y:startY}];
									
		answerLayoutDimension_arr = [{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight}];
									
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[2]){
		startY = canvasH/100 * 50;
		curTextSpace = textSpace+(textSpace/2);
		answerLayoutPosition_arr = [{x:canvasW/2, y:startY},
								{x:canvasW/2, y:startY + textHeight + curTextSpace},
								{x:canvasW/2, y:startY + (textHeight*2) + (curTextSpace*2)}];
		
		answerLayoutDimension_arr = [{w:canvasW/100 * 80, h:textHeight},
									{w:canvasW/100 * 80, h:textHeight},
									{w:canvasW/100 * 80, h:textHeight}];
									
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[3]){
		startY = canvasH/100 * 58;
		answerLayoutPosition_arr = [{x:canvasW/100 * 20, y:startY},
									{x:canvasW/100 * 50, y:startY},
									{x:canvasW/100 * 80, y:startY}];
									
		answerLayoutDimension_arr = [{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight}];
									
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[4]){
		startY = canvasH/100 * 58;
		curTextSpace = textSpace+(textSpace/2);
		answerLayoutPosition_arr = [{x:canvasW/100 * 30, y:startY},
									{x:canvasW/100 * 70, y:startY},
									{x:canvasW/2, y:startY + textHeight + curTextSpace}];
									
		answerLayoutDimension_arr = [{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight}];
									
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[5]){
		startY = canvasH/100 * 50;
		answerLayoutPosition_arr = [{x:canvasW/2, y:startY},
									{x:canvasW/2, y:startY + textHeight + textSpace},
									{x:canvasW/2, y:startY + (textHeight*2) + (textSpace*2)},
									{x:canvasW/2, y:startY + (textHeight*3) + (textSpace*3)}];
		answerLayoutDimension_arr = [{w:canvasW/100 * 80, h:textHeight},
									{w:canvasW/100 * 80, h:textHeight},
									{w:canvasW/100 * 80, h:textHeight},
									{w:canvasW/100 * 80, h:textHeight}];
							
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[6]){
		startY = canvasH/100 * 58;
		answerLayoutPosition_arr = [{x:canvasW/100 * 20, y:startY},
									{x:canvasW/100 * 40, y:startY},
									{x:canvasW/100 * 60, y:startY},
									{x:canvasW/100 * 80, y:startY}];
									
		answerLayoutDimension_arr = [{w:canvasW/100 * 18, h:textHeight},
									{w:canvasW/100 * 18, h:textHeight},
									{w:canvasW/100 * 18, h:textHeight},
									{w:canvasW/100 * 18, h:textHeight}];
							
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[7]){
		startY = canvasH/100 * 58;
		curTextSpace = textSpace+(textSpace/2);
		answerLayoutPosition_arr = [{x:canvasW/100 * 30, y:startY},
									{x:canvasW/100 * 70, y:startY},
									{x:canvasW/100 * 30, y:startY + textHeight + curTextSpace},
									{x:canvasW/100 * 70, y:startY + textHeight + curTextSpace}];
									
		answerLayoutDimension_arr = [{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight}];
							
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[8]){
		startY = canvasH/100 * 40;
		answerLayoutPosition_arr = [{x:canvasW/2, y:startY},
									{x:canvasW/2, y:startY + textHeight + textSpace},
									{x:canvasW/2, y:startY + (textHeight*2) + (textSpace*2)},
									{x:canvasW/2, y:startY + (textHeight*3) + (textSpace*3)},
									{x:canvasW/2, y:startY + (textHeight*4) + (textSpace*4)}];
		answerLayoutDimension_arr = [{w:canvasW/100 * 80, h:textHeight},
									{w:canvasW/100 * 80, h:textHeight},
									{w:canvasW/100 * 80, h:textHeight},
									{w:canvasW/100 * 80, h:textHeight},
									{w:canvasW/100 * 80, h:textHeight}];
							
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[9]){
		startY = canvasH/100 * 50;
		curTextSpace = textSpace+(textSpace/2);
		answerLayoutPosition_arr = [{x:canvasW/100 * 30, y:startY},
									{x:canvasW/100 * 30, y:startY + textHeight + curTextSpace},
									{x:canvasW/100 * 30, y:startY + (textHeight*2) + (curTextSpace*2)},
									{x:canvasW/100 * 70, y:startY},
									{x:canvasW/100 * 70, y:startY + textHeight + curTextSpace}];
		answerLayoutDimension_arr = [{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight}];
							
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[10]){
		startY = canvasH/100 * 58;
		curTextSpace = textSpace+(textSpace/2);
		answerLayoutPosition_arr = [{x:canvasW/100 * 20, y:startY},
									{x:canvasW/2, y:startY},
									{x:canvasW/100 * 80, y:startY},
									{x:canvasW/100 * 35, y:startY + textHeight + curTextSpace},
									{x:canvasW/100 * 65, y:startY + textHeight + curTextSpace}];
		answerLayoutDimension_arr = [{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight}];
							
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[11]){
		startY = canvasH/100 * 50;
		curTextSpace = textSpace+(textSpace/2);
		answerLayoutPosition_arr = [{x:canvasW/100 * 30, y:startY},
									{x:canvasW/100 * 30, y:startY + textHeight + curTextSpace},
									{x:canvasW/100 * 30, y:startY + (textHeight*2) + (curTextSpace*2)},
									{x:canvasW/100 * 70, y:startY},
									{x:canvasW/100 * 70, y:startY + textHeight + curTextSpace},
									{x:canvasW/100 * 70, y:startY + (textHeight*2) + (curTextSpace*2)}];
		answerLayoutDimension_arr = [{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight}];
							
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[12]){
		startY = canvasH/100 * 58;
		curTextSpace = textSpace+(textSpace/2);
		answerLayoutPosition_arr = [{x:canvasW/100 * 20, y:startY},
									{x:canvasW/2, y:startY},
									{x:canvasW/100 * 80, y:startY},
									{x:canvasW/100 * 20, y:startY + textHeight + curTextSpace},
									{x:canvasW/2, y:startY + textHeight + curTextSpace},
									{x:canvasW/100 * 80, y:startY + textHeight + curTextSpace}];
		answerLayoutDimension_arr = [{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight}];
							
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[13]){
		startY = canvasH/100 * 54;
		answerLayoutPosition_arr = [{x:canvasW/100 * 30, y:startY},
									{x:canvasW/100 * 30, y:startY + textHeight + textSpace},
									{x:canvasW/100 * 30, y:startY + (textHeight*2) + (textSpace*2)},
									{x:canvasW/100 * 70, y:startY},
									{x:canvasW/100 * 70, y:startY + textHeight + textSpace},
									{x:canvasW/100 * 70, y:startY + (textHeight*2) + (textSpace*2)},
									{x:canvasW/2, y:startY + (textHeight*3) + (textSpace*3)}];
		answerLayoutDimension_arr = [{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight}];
							
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[14]){
		startY = canvasH/100 * 50;
		curTextSpace = textSpace+(textSpace/2);
		answerLayoutPosition_arr = [{x:canvasW/100 * 20, y:startY},
									{x:canvasW/2, y:startY},
									{x:canvasW/100 * 80, y:startY},
									{x:canvasW/100 * 20, y:startY + textHeight + curTextSpace},
									{x:canvasW/2, y:startY + textHeight + curTextSpace},
									{x:canvasW/100 * 80, y:startY + textHeight + curTextSpace},
									{x:canvasW/2, y:startY + (textHeight*2) + (curTextSpace*2)}];
		answerLayoutDimension_arr = [{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight},
									{w:canvasW/100 * 28, h:textHeight}];
							
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[15]){
		startY = canvasH/100 * 60;
		curTextSpace = textSpace+(textSpace/2);
		answerLayoutPosition_arr = [{x:canvasW/100 * 20, y:startY},
							{x:canvasW/100 * 40, y:startY},
							{x:canvasW/100 * 60, y:startY},
							{x:canvasW/100 * 80, y:startY},
							{x:canvasW/100 * 20, y:startY + textHeight + curTextSpace},
							{x:canvasW/100 * 40, y:startY + textHeight + curTextSpace},
							{x:canvasW/100 * 60, y:startY + textHeight + curTextSpace},
							{x:canvasW/100 * 80, y:startY + textHeight + curTextSpace}];
		answerLayoutDimension_arr = [{w:canvasW/100 * 18, h:textHeight},
									{w:canvasW/100 * 18, h:textHeight},
									{w:canvasW/100 * 18, h:textHeight},
									{w:canvasW/100 * 18, h:textHeight},
									{w:canvasW/100 * 18, h:textHeight},
									{w:canvasW/100 * 18, h:textHeight},
									{w:canvasW/100 * 18, h:textHeight},
									{w:canvasW/100 * 18, h:textHeight}];
	}else if(question_arr[sequenceCountNum].answerLayout == answerType_arr[16]){
		startY = canvasH/100 * 54;
		answerLayoutPosition_arr = [{x:canvasW/100 * 30, y:startY},
									{x:canvasW/100 * 30, y:startY + textHeight + textSpace},
									{x:canvasW/100 * 30, y:startY + (textHeight*2) + (textSpace*2)},
									{x:canvasW/100 * 30, y:startY + (textHeight*3) + (textSpace*3)},
									{x:canvasW/100 * 70, y:startY},
									{x:canvasW/100 * 70, y:startY + textHeight + textSpace},
									{x:canvasW/100 * 70, y:startY + (textHeight*2) + (textSpace*2)},
									{x:canvasW/100 * 70, y:startY + (textHeight*3) + (textSpace*3)}];
		answerLayoutDimension_arr = [{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight},
									{w:canvasW/100 * 38, h:textHeight}];
	}
	
	for(n=0;n<question_arr[sequenceCountNum].answer.length;n++){
		var answerType = question_arr[sequenceCountNum].answer[n].type;
		var answerOffsetY = question_arr[sequenceCountNum].answerOffsetY;
		answerOffsetY = answerOffsetY == undefined ? 0 : answerOffsetY;
		answerOffsetY = Number(answerOffsetY);
		
		var answerXArray = 0;
		var answerYArray = 0;
		if (n < answerLayoutPosition_arr.length){
			answerXArray = answerLayoutPosition_arr[n].x;
			answerYArray = answerLayoutPosition_arr[n].y;
		}
		
		var answerX = question_arr[sequenceCountNum].answer[n].x;
		answerX = answerX == undefined ? answerXArray : answerX;
		answerX = Number(answerX);
		var answerY = question_arr[sequenceCountNum].answer[n].y;
		answerY = answerY == undefined ? answerYArray : answerY;
		answerY = Number(answerY);
		
		if(answerType == 'image'){
			$.question['answer'+n] = new createjs.Bitmap(imageLoader.getResult('answerImage'+n));
			$.question['answer'+n].x = answerX;
			$.question['answer'+n].y = answerY+answerOffsetY;
			$.question['answer'+n].answerType = 'image';
			centerReg($.question['answer'+n]);
			createHitarea($.question['answer'+n]);
			questionContainer.addChild($.question['answer'+n]);
		}else{
			var answerWArray = 0;
			var answerHArray = textHeight;
			if (n < answerLayoutDimension_arr.length){
				answerWArray = answerLayoutDimension_arr[n].w;
				answerHArray = answerLayoutDimension_arr[n].h;
			}
			
			var answerW = question_arr[sequenceCountNum].answer[n].width;
			answerW = answerW == undefined ? answerWArray : answerW;
			answerW = Number(answerW);
			var answerH = question_arr[sequenceCountNum].answer[n].height;
			answerH = answerH == undefined ? answerHArray : answerH;
			answerH = Number(answerH);
			
			if(editQuestion){
				$.question['answerHitArea'+n] = new createjs.Shape(new createjs.Graphics().beginFill("#ff0000").drawRect(0-(answerW/2), answerButtonPositionOffsetY-(answerH/2), answerW, answerH));
				$.question['answerHitArea'+n].x = answerX;
				$.question['answerHitArea'+n].y = answerY+answerOffsetY;
				editContainer.addChild($.question['answerHitArea'+n]);
			}
			
			if(answerButtonBgEnable){
				$.question['answerButtonBg'+n] = new createjs.Shape(new createjs.Graphics().beginFill(answerButtonBgColour).drawRoundRect(0-(answerW/2), answerButtonPositionOffsetY-(answerH/2), answerW, answerH, answerButtonBgRoundNumber));
				$.question['answerButtonBg'+n].x = answerX;
				$.question['answerButtonBg'+n].y = answerY+answerOffsetY;
				
				$.question['answerButtonBgShadow'+n] = new createjs.Shape(new createjs.Graphics().beginFill(answerButtonBgShadowColour).drawRoundRect(0-(answerW/2), answerButtonPositionOffsetY-(answerH/1.5), answerW, answerH+answerButtonBgShadowNumber, answerButtonBgRoundNumber));
				$.question['answerButtonBgShadow'+n].x = answerX;
				$.question['answerButtonBgShadow'+n].y = answerY+answerOffsetY;
				questionContainer.addChild($.question['answerButtonBgShadow'+n], $.question['answerButtonBg'+n]);
				
				$.question['answeredButtonBg'+n] = new createjs.Shape(new createjs.Graphics().beginFill(answeredButtonBgColour).drawRoundRect(0-(answerW/2), answerButtonPositionOffsetY-(answerH/2), answerW, answerH, answerButtonBgRoundNumber));
				$.question['answeredButtonBg'+n].x = answerX;
				$.question['answeredButtonBg'+n].y = answerY+answerOffsetY;
				
				$.question['answeredButtonBgShadow'+n] = new createjs.Shape(new createjs.Graphics().beginFill(answeredButtonBgShadowColour).drawRoundRect(0-(answerW/2), answerButtonPositionOffsetY-(answerH/2), answerW, answerH+answerButtonBgShadowNumber, answerButtonBgRoundNumber));
				$.question['answeredButtonBgShadow'+n].x = answerX;
				$.question['answeredButtonBgShadow'+n].y = answerY+answerOffsetY;
				
				$.question['answeredButtonBgShadow'+n].visible = $.question['answeredButtonBg'+n].visible = false;
				questionContainer.addChild($.question['answeredButtonBgShadow'+n], $.question['answeredButtonBg'+n]);
			}
			
			var fontSize = question_arr[sequenceCountNum].answer[n].fontSize;
			fontSize = fontSize == undefined ? questionTextSize : fontSize;
		
			$.question['answer'+n] = new createjs.Text();
			$.question['answer'+n].font = fontSize+"px bariol_regularregular";
			$.question['answer'+n].lineHeight = Number(fontSize)+Number(textLineHeight);
			$.question['answer'+n].color = answerTextColour;
			$.question['answer'+n].textAlign = questionTextAlign;
			$.question['answer'+n].textBaseline='alphabetic';
			$.question['answer'+n].x = answerX;
			$.question['answer'+n].y = answerY+answerOffsetY;
			$.question['answer'+n].answerType = 'text';
			
			var curAnswerList = '';
			if(answerListsEnable){
				curAnswerList = answerLists[n];
			}
			$.question['answer'+n].text = curAnswerList+question_arr[sequenceCountNum].answer[n].text;
			
			questionContainer.addChild($.question['answer'+n]);
			createAnswerHitArea($.question['answer'+n], answerW, answerH);
		}
		
		$.question['answer'+n].name = n;
		buildAnswerEvent($.question['answer'+n]);
	}
}

function initanimateAnswerss(){
	var animateDelayNum = .5;
	for(n=0;n<question_arr[sequenceCountNum].answer.length;n++){
		if(answerAnimationEnable){
			$.question['answer'+n].alpha = 0;
			if(answerButtonBgEnable && $.question['answer'+n].answerType == 'text'){
				$.question['answerButtonBg'+n].alpha = 0;
				$.question['answerButtonBgShadow'+n].alpha = 0;
			}
			TweenMax.to($.question['answer'+n], 0, {delay:animateDelayNum, scaleX:1, scaleY:1, overwrite:true, ease:Elastic.easeOut, onComplete:animateAnswer, onCompleteParams:[n]});
			animateDelayNum+=.3;
		}
	}
}

function animateAnswer(n){
	var scaleNum = .7;
	var speedNum = 1.3;
	$.question['answer'+n].scaleX = $.question['answer'+n].scaleY = scaleNum;
	TweenMax.to($.question['answer'+n], speedNum, {alpha:1, scaleX:1, scaleY:1, overwrite:true, ease:Elastic.easeOut});		
	
	if(answerButtonBgEnable && $.question['answer'+n].answerType == 'text'){
		$.question['answerButtonBg'+n].scaleX = $.question['answerButtonBg'+n].scaleY = scaleNum;
		$.question['answerButtonBgShadow'+n].scaleX = $.question['answerButtonBgShadow'+n].scaleY = scaleNum;
		
		TweenMax.to($.question['answerButtonBg'+n], speedNum, {alpha:1, scaleX:1, scaleY:1, overwrite:true, ease:Elastic.easeOut});
		TweenMax.to($.question['answerButtonBgShadow'+n], speedNum, {alpha:1, scaleX:1, scaleY:1, overwrite:true, ease:Elastic.easeOut});
	}
}

/*!
 * 
 * RESET QUESTION - This is the function that runs to reset question
 * 
 */
function resetQuestion(){
	stopAudio();
	toggleAudioInterval(false);
		
	audioNum = 0;
	audio_arr = [];
	brainCorrectAnimate.visible = false;
	editContainer.removeAllChildren();
	questionContainer.removeAllChildren();
}

/*!
 * 
 * BUILD ANSWER EVENT - This is the function that runs to build answer event
 * 
 */
function buildAnswerEvent(obj){
	if(!editQuestion){
		obj.cursor = "pointer";
		obj.addEventListener("click", function(evt) {
			focusTapAnswer(evt.target.name, evt.target.answerType);
		});
	}
}

function createAnswerHitArea(obj, answerW, answerH){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0-(answerW/2), answerButtonPositionOffsetY-(answerH/2), answerW, answerH));	
}

/*!
 * 
 * FOCUS ANSWER ANIMATION - This is the function that runs to focus on answer animation
 * 
 */
function focusTapAnswer(n, type){
	if(!playerData.answered){
		stopAudio();
		toggleAudioInterval(false);
		playSound('soundSelectAnswer');
		
		playerData.answered = true;
		
		for(p=0;p<question_arr[sequenceCountNum].answer.length;p++){
			TweenMax.killTweensOf($.question['answer'+p]);
			$.question['answer'+p].alpha = 1;
			$.question['answer'+p].scaleX = $.question['answer'+p].scaleY = 1;
			
			if(answerButtonBgEnable && $.question['answer'+n].answerType == 'text'){
				$.question['answerButtonBg'+p].alpha = 1;
				$.question['answerButtonBgShadow'+p].alpha = 1;
				
				$.question['answerButtonBg'+p].scaleX = $.question['answerButtonBg'+p].scaleY = 1;
				$.question['answerButtonBgShadow'+p].scaleX = $.question['answerButtonBgShadow'+p].scaleY = 1;
				
				TweenMax.killTweensOf($.question['answerButtonBg'+p]);
				TweenMax.killTweensOf($.question['answerButtonBgShadow'+p]);
			}
		}
		
		
		$.question['answer'+n].scaleX = $.question['answer'+n].scaleY = .5;
		TweenMax.to($.question['answer'+n], 1, {scaleX:1, scaleY:1, overwrite:true, ease:Elastic.easeOut, onComplete:function(){
			checkAnswer(n);	
		}});
		
		var totalNum = Number(questionContainer.numChildren);
		questionContainer.setChildIndex($.question['answer'+n], totalNum-1);
		
		if(answerButtonBgEnable && type == 'text'){
			$.question['answeredButtonBgShadow'+n].visible = $.question['answeredButtonBg'+n].visible = true;
			$.question['answerButtonBgShadow'+n].visible = $.question['answerButtonBg'+n].visible = false;
			
			$.question['answeredButtonBg'+n].scaleX = $.question['answeredButtonBg'+n].scaleY = .5;
			$.question['answeredButtonBgShadow'+n].scaleX = $.question['answeredButtonBgShadow'+n].scaleY = .5;
			
			TweenMax.to($.question['answeredButtonBg'+n], 1, {scaleX:1, scaleY:1, overwrite:true, ease:Elastic.easeOut});
			TweenMax.to($.question['answeredButtonBgShadow'+n], 1, {scaleX:1, scaleY:1, overwrite:true, ease:Elastic.easeOut});
			
			questionContainer.setChildIndex($.question['answeredButtonBgShadow'+n], totalNum-3);
			questionContainer.setChildIndex($.question['answeredButtonBg'+n], totalNum-2);
		}
	}
}

/*!
 * 
 * CHECK RIGHT ANSWER - This is the function that runs to check right answer
 * 
 */
function checkAnswer(number){
	toggleGameTimer(false);
	if((number+1) == question_arr[sequenceCountNum].correctAnswer){
		if(animateCorrectEnable){
			animateBrainCorrect();
			return;
		}else{
			increaseScore();	
		}
	}
	
	prepareNextQuestion();
}

function animateBrainCorrect(){
	questionContainer.alpha = 0;
	brainCorrectAnimate.visible = true;
	brainCorrectAnimate.gotoAndPlay('correct');
	
	setTimeout(function() {
		playSound('soundScoreBrainIdea');
	}, 500);
	
	TweenMax.to(brainCorrectAnimate, 1, {overwrite:true, onComplete:function(){
		increaseScore();
		prepareNextQuestion();
	}});
}

/*!
 * 
 * PREPARE NEXT QUESTION - This is the function that runs for next question
 * 
 */
function prepareNextQuestion(){
	if(questionCountNum < sequence_arr.length-1){
		questionCountNum++;
		loadQuestion();
	}else{
		playSound('soundComplete');
		goPage('result');
	}	
}


/*!
 * 
 * UPDATE GAME SCORE - This is the function that runs to update game score
 * 
 */
function increaseScore(){
	playSound('soundScoreBrain');
	playerData.score++;
	brainScore.scaleX = brainScore.scaleY = .5;
	TweenMax.to(brainScore, 1, {scaleX:1, scaleY:1, overwrite:true, ease:Elastic.easeOut});
	updateScore();
}

function updateScore(){
	scoreTxt.text = resultScoreTxt.text = playerData.score;
}

/*!
 * 
 * UPDATE GAME TIMER - This is the function that runs to update game timer
 * 
 */
function updateTimer(anime){
	var newWidth = playerData.timerCount / playerData.timer * canvasW;
	TweenMax.killTweensOf(playerData);
	if(anime){
		TweenMax.to(playerData, 1, {timerWidth:newWidth, overwrite:true, onUpdate:function(){
			timerBar.graphics.clear();
			timerBar.graphics.beginFill(timerBarColour).drawRect(0, canvasH-timerBarHeight, playerData.timerWidth, timerBarHeight);
		}});
	}else{
		playerData.timerWidth = newWidth;
		timerBar.graphics.clear();
		timerBar.graphics.beginFill(timerBarColour).drawRect(0, canvasH-timerBarHeight, newWidth, timerBarHeight);
	}
}

/*!
 * 
 * TOGGLE GAME LOADER - This is the function that runs to toggle game loader
 * 
 */
function toggleQuestionLoader(con){
	loaderAnimate.visible = con;
	if(con){
		loaderAnimate.gotoAndPlay('loading');
	}else{
		loaderAnimate.gotoAndPlay('static');	
	}
}

/*!
 * 
 * GAME TIMER - This is the function that runs for game timer
 * 
 */
var gameTimerInterval

function toggleGameTimer(con){
	if(con){
		playerData.timer = playerData.timerCount = timerStart;
		updateTimer(false);
		
		clearInterval(gameTimerInterval);
		gameTimerInterval = setInterval(function(){
			playerData.timerCount -= .1;
			updateTimer(true);
			
			if(playerData.timerCount <= 0){
				playSound('soundFail');
				goPage('result');	
			}
		}, 100);
	}else{
		clearInterval(gameTimerInterval);
	}
}

/*!
 * 
 * XML - This is the function that runs to load word from xml
 * 
 */
function loadXML(src){
	$.ajax({
       url: src,
       type: "GET",
       dataType: "xml",
       success: function (result) {
			if(editQuestion){
				edit.xmlFile = result;
			}
            $(result).find('item').each(function(questionIndex, questionElement){
				category_arr.push($(questionElement).find('category').text());
				
				question_arr.push({category:$(questionElement).find('category').text(), question:$(questionElement).find('question').text(), fontSize:$(questionElement).find('question').attr('fontSize'),type:$(questionElement).find('question').attr('type'), answer:[], answerLayout:$(questionElement).find('answers').attr('answerLayout'), answerOffsetY:$(questionElement).find('answers').attr('answerOffsetY'), correctAnswer:$(questionElement).find('answers').attr('correctAnswer'), audio:$(questionElement).find('question').attr('audio')});
				
				$(questionElement).find('answers answer').each(function(answerIndex, answerElement){
					question_arr[questionIndex].answer.push({text:$(answerElement).text(), type:$(answerElement).attr('type'), width:$(answerElement).attr('width'), height:$(answerElement).attr('height'), x:$(answerElement).attr('x'), y:$(answerElement).attr('y'), fontSize:$(answerElement).attr('fontSize'), audio:$(answerElement).attr('audio')});
				});
			});
			
			loadXMLComplete();
       }
	});
}

function loadXMLComplete(){
	if(question_arr.length!=0){
		category_arr = unique(category_arr);
		if(categoryAllOption){
			category_arr.push(categoryAllText);
		}
		startButton.text = startButtonText;
	}
	
	if(editQuestion){
		loadEditPage();
		goPage('game');
	}else{
		goPage('main');
	}
}

/*!
 * 
 * QUESTION AND ANSWER IMAGE PRELOADER - This is the function that runs to preload question/answer image
 * 
 */
var imageLoader, imageFest;
function loadQuestionAssets(){
	imageLoader = new createjs.LoadQueue(false);
	createjs.Sound.alternateExtensions = ["mp3"];
	imageLoader.installPlugin(createjs.Sound);
	
	imageLoader.addEventListener("complete", handleImageComplete);
	imageLoader.loadManifest(imageFest);
}

function handleImageComplete() {
	buildQuestion();
};

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	var title = '';
	var text = '';
	title = shareTitle.replace("[SCORE]", playerData.score);
	text = shareMessage.replace("[SCORE]", playerData.score);
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'http://www.facebook.com/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}
	
	window.open(shareurl);
}