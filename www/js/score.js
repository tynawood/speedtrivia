////////////////////////////////////////////////////////////
// SCORE
////////////////////////////////////////////////////////////

/*!
 * 
 * SCOREBOARD SETTING CUSTOMIZATION START
 * 
 */
var displayScoreBoard = true; //toggle submit and scoreboard button

var scoreBoardTitle = 'TOP 10 Scoreboard'; //text for scoreboard title
var scoreBackText = 'Back'; //text for scoreboard back button
var scoreRank_arr = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th']; //scoreboard ranking list

//text for scoreboard
//col = table name
//percentX = position x
//align = text alignment
var score_arr = [{col:'RANK', percentX:10, align:'center'},
				{col:'NAME', percentX:25, align:'left'},
		{col:'CATEGORY', percentX:70, align:'center'},
				{col:'SCORE', percentX:89, align:'center'}];

/*!
 * 
 * SCOREBOARD SETTING CUSTOMIZATION END
 * 
 */
 
var scoreBoardContainer, submitScoreContainer;
var scoreTitle, bgScoreboard, scoreBackTxt, saveButton, scoreboardButton;
$.scoreList={};
$.saveList={};

/*!
 * 
 * SCOREBOARD ASSETS - This is the function that runs to add scoreboard assets
 * 
 */
function addScoreboardAssets(){
	manifest.push({src:'assets/scoreboard/bg_scoreboard.png', id:'bgScoreboard'});
	manifest.push({src:'assets/scoreboard/icon_replay.png', id:'iconReplay'});
	manifest.push({src:'assets/scoreboard/icon_save.png', id:'iconSave'});
	manifest.push({src:'assets/scoreboard/icon_scoreboard.png', id:'iconScoreboard'});
}

/*!
 * 
 * SCOREBOARD CANVAS - This is the function that runs to build scoreboard canvas
 * 
 */
function buildScoreBoardCanvas(){
	if(!displayScoreBoard){
		return;	
	}
	
	//buttons
	resultContainer.removeChild(replayButton);
	
	buttonReplay = new createjs.Bitmap(loader.getResult('iconReplay'));
	centerReg(buttonReplay);
	createHitarea(buttonReplay);
	saveButton = new createjs.Bitmap(loader.getResult('iconSave'));
	centerReg(saveButton);
	createHitarea(saveButton);
	scoreboardButton = new createjs.Bitmap(loader.getResult('iconScoreboard'));
	centerReg(scoreboardButton);
	createHitarea(scoreboardButton);
	
	resultContainer.addChild(buttonReplay, saveButton, scoreboardButton);
	
	//scoreboard
	scoreBoardContainer = new createjs.Container();
	bgScoreboard = new createjs.Bitmap(loader.getResult('bgScoreboard'));
	
	scoreTitle = new createjs.Text();
	scoreTitle.font = "80px bariol_regularregular";
	scoreTitle.color = "#ffffff";
	scoreTitle.text = scoreBoardTitle;
	scoreTitle.textAlign = "center";
	scoreTitle.textBaseline='alphabetic';
	scoreTitle.x = canvasW/2;
	scoreTitle.y = canvasH/100*14;
	
	scoreBackTxt = new createjs.Text();
	scoreBackTxt.font = "50px bariol_regularregular";
	scoreBackTxt.color = "#ffffff";
	scoreBackTxt.text = scoreBackText;
	scoreBackTxt.textAlign = "center";
	scoreBackTxt.textBaseline='alphabetic';
	scoreBackTxt.x = canvasW/2;
	scoreBackTxt.y = canvasH/100*95;
	scoreBackTxt.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-200, -30, 400, 40));
	scoreBoardContainer.addChild(bgScoreboard, scoreTitle, scoreBackTxt);
	
	var scoreStartY = canvasH/100*23;
	var scoreSpanceY = 49.5;
	for(scoreNum=0;scoreNum<=10;scoreNum++){
		for(scoreColNum=0;scoreColNum<score_arr.length;scoreColNum++){
			$.scoreList[scoreNum+'_'+scoreColNum] = new createjs.Text();
			$.scoreList[scoreNum+'_'+scoreColNum].font = "35px bariol_regularregular";
			$.scoreList[scoreNum+'_'+scoreColNum].color = "#ffffff";
			$.scoreList[scoreNum+'_'+scoreColNum].textAlign = score_arr[scoreColNum].align;
			$.scoreList[scoreNum+'_'+scoreColNum].textBaseline='alphabetic';
			$.scoreList[scoreNum+'_'+scoreColNum].x = canvasW/100 * score_arr[scoreColNum].percentX;
			$.scoreList[scoreNum+'_'+scoreColNum].y = scoreStartY;
			
			if(scoreColNum == 0){
				//position
				$.scoreList[scoreNum+'_'+scoreColNum].text = scoreRank_arr[scoreNum-1];	
			}
			
			if(scoreNum == 0){
				$.scoreList[scoreNum+'_'+scoreColNum].text = score_arr[scoreColNum].col;	
			}
			
			scoreBoardContainer.addChild($.scoreList[scoreNum+'_'+scoreColNum]);
		}
		scoreStartY += scoreSpanceY;
	}
	
	scoreBoardContainer.visible = false;
	canvasContainer.addChild(scoreBoardContainer);
	
	$.get('submit.html', function(data){
		$('#canvasHolder').append(data);
		buildScoreboardButtons();
		toggleSaveButton(true);
		resizeScore();

	});
}

/*!
 * 
 * TOGGLE SUBMIT SCORE BUTTON - This is the function that runs to display submit score button
 * 
 */
function toggleSaveButton(con){

	saveButton.visible = false;
	if(con){
		saveButton.visible = true;
		
		buttonReplay.x = canvasW/100 * 40;
		saveButton.x = canvasW/2;
		scoreboardButton.x = canvasW/100 * 60;
		buttonReplay.y = saveButton.y = scoreboardButton.y = canvasH/100*65;
	}else{
		buttonReplay.x = canvasW/100 * 45;
		scoreboardButton.x = canvasW/100 * 55;
		buttonReplay.y = saveButton.y = scoreboardButton.y = canvasH/100*65;	
	}
}

/*!
 * 
 * SCOREBOARD BUTTONS - This is the function that runs to build scoreboard buttons
 * 
 */
function buildScoreboardButtons(){
	$('#buttonCancel').click(function(){
		playSound('soundSelect');
		goScorePage('');
	});
	
	$('#buttonSubmit').click(function(){
		playSound('soundSelect');
		
		var typeString = 'quizgame'
		if(categoryPage){
			typeString = category_arr[categoryNum];	
		}
		submitUserScore(typeString, playerData.score);
	});
	
	scoreBackTxt.cursor = "pointer";
	scoreBackTxt.addEventListener("click", function(evt) {
		playSound('soundSelect');
		goScorePage('');
	});
	
	buttonReplay.cursor = "pointer";
	buttonReplay.addEventListener("click", function(evt) {
		playSound('soundSelect');
		if(categoryPage){
			goPage('category');
		}else{
			goPage('game');
		}
	});
	
	saveButton.cursor = "pointer";
	saveButton.addEventListener("click", function(evt) {
		playSound('soundSelect');
		goScorePage('submit');
	
	});
	
	scoreboardButton.cursor = "pointer";
	scoreboardButton.addEventListener("click", function(evt) {
		playSound('soundSelect');
		goScorePage('scoreboard');
		
		var typeString = 'quizgame'
		if(categoryPage){
			typeString = category_arr[categoryNum];	
		}
		loadScoreboard(typeString);
	});
}

/*!
 * 
 * DISPLAY TOP 10 SCOREBOARD - This is the function that runs to display top ten scoreboard
 * 
 */

function goScorePage(page){
	var targetContainer;
	scoreBoardContainer.visible = false;
	$('#scoreHolder').hide();
	
	switch(page){
		case 'submit':
			targetContainer = null;
			$('#scoreHolder').show();
			resizeScore();

		break;
		
		case 'scoreboard':
			targetContainer = scoreBoardContainer;
		break;
		
		case '':
			targetContainer = null;
		break;
	}
	
	if(targetContainer != null){
		targetContainer.visible = true;
	}
}

function submitUserScore(type, score){
	var errorCon = false;
	var errorMessage = 'Submission error:';
	
	if($('#uName').val().length == 0){
		errorCon = true;
		errorMessage += '\n*Please enter your name';
	}
	
	if($('#uEmail').val().length == 0){
		errorCon = true;
		errorMessage += '\n*Please enter your email';
	}
	
	if(!validateEmail($('#uEmail').val())){
		errorCon = true;
		errorMessage += '\n*Please enter a valite email';
	}
	
	if(errorCon){
		alert(errorMessage);	
	}else{
		//proceed	
		$.ajax({
		  type: "POST",
		  url: 'https://wanadryve.com/umb/addScoreUnique.php',
		  data: { name: $('#uName').val(), email: $('#uEmail').val(), type: type, score: score },
		  success: submitScoreSuccess,
		  dataType  : 'json'
		});
	}
}

function submitScoreSuccess(data){
	if(data.status == true){
		toggleSaveButton(false);
		goScorePage('');
	}else{
		alert('Submission error, please try again.')	
	}
}

function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}

function loadScoreboard(type){
	$.ajax({
	  type: "POST",
	  url: 'https://wanadryve.com/umb/topRank.php',
	  data: { type: type},
	  success: loadScoreboardSuccess,
	  dataType  : 'json'
	});	
}

function loadScoreboardSuccess(data){
	if(data.status == true){
		var scoreList = data.datas;
		
		if(scoreList.length>0){
			for(var i=0; i<scoreList.length; i++){
				if(typeof scoreList[i] != "undefined"){
					$.scoreList[(i+1)+'_'+1].text = scoreList[i].name;
					$.scoreList[(i+1)+'_'+2].text = scoreList[i].type;
					$.scoreList[(i+1)+'_'+3].text = scoreList[i].score;
				}
			}
		}
	}
}

/*!
 * 
 * RESIZE SCORE - This is the function that runs to resize score
 * 
 */
function resizeScore(){
	$('.fontLink').each(function(index, element) {
        $(this).css('font-size', Math.round(Number($(this).attr('data-fontsize'))*scalePercent));
    });
	
	$('#scoreHolder').css('width',stageW*scalePercent);
	$('#scoreHolder').css('height',stageH*scalePercent);
	
	$('#scoreHolder').css('left', (offset.left/2));
	$('#scoreHolder').css('top', (offset.top/2));
	
	$('#scoreHolder .scoreInnerContent').css('width',contentW*scalePercent);
	$('#scoreHolder .scoreInnerContent').css('height',contentH*scalePercent);
	
	var spaceTop = (stageH - contentH)/2;
	var spaceLeft = (stageW - contentW)/2;
	$('#scoreHolder .scoreInnerContent').css('left', spaceLeft*scalePercent);
	$('#scoreHolder .scoreInnerContent').css('top', spaceTop*scalePercent);
}