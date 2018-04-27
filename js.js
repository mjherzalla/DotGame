 var dotClickedCount=0;
 var GameStat="Paused";
 var LevelStat=1;
 var minSpeed=10;
 var dotsPerLevel=25;
 var btn = document.getElementById("statBtn");
 var timeleft = 40;

  function CountdownTimer (){
    timeleft--;
    document.getElementById("time").innerHTML = timeleft;
    if(timeleft <= 0 || dotClickedCount>=dotsPerLevel ){

       
      clearInterval(Timer2);
      clearInterval(Timer);
    
     
      if(dotClickedCount==dotsPerLevel ){

        nextLevel();
        
      }else{
        document.getElementById("score2").innerHTML=document.getElementById("score").innerHTML;
        var NextLevelMsg = document.getElementById("lostMsg");
        NextLevelMsg.style.display="block";
        document.getElementById("GameBody").innerHTML="";
        var GameBody = document.getElementById("GameBody");
        GameBody.style.pointerEvents="none";
        var GameBody = document.getElementById("topbar");
        GameBody.style.pointerEvents="none";

      }
    }
  }

  function startnewgame(){
    var NextLevelMsg = document.getElementById("WelcomeMsg");
    NextLevelMsg.style.display="none";
    var lostMsg = document.getElementById("lostMsg");
    lostMsg.style.display="none";

    document.getElementById("score").innerHTML="0";
    timeleft = 40;
    document.getElementById("level").innerHTML="Level1";
    document.getElementById("time").innerHTML="40";
    document.getElementById("progressBarCount").style.width="0";
    document.getElementById("GameBody").innerHTML="";
    dotClickedCount=0;
    var GameBody = document.getElementById("topbar");
    GameBody.style.pointerEvents="auto";

    var slider = document.getElementById("speed");
    slider.value="10";
    slider.onchange();
    playGame();
   }


 function nextLevel(){
  var NextLevelMsg = document.getElementById("NextLevelMsg");
  NextLevelMsg.style.display="block";
  LevelStat++;
  var level = document.getElementById("level");
  level.innerHTML="Level"+LevelStat;

  var GameBody = document.getElementById("GameBody");
   GameBody.style.pointerEvents="none";
   var topbar = document.getElementById("topbar");
   topbar.style.pointerEvents="none";
 }


 function Continue(){
  var NextLevelMsg = document.getElementById("NextLevelMsg");
  NextLevelMsg.style.display="none";
  var nextspeed=minSpeed+LevelStat;
  document.getElementById("speed").min=nextspeed;
  var slider = document.getElementById("speed");
  slider.value=nextspeed;
  slider.onchange();
  timeleft = 40;
  document.getElementById("progressBarCount").style.width="0";
  document.getElementById("time").innerHTML="40";
  document.getElementById("GameBody").innerHTML="";
  dotClickedCount=0;
  var GameBody = document.getElementById("topbar");
  GameBody.style.pointerEvents="auto";

  var topbar = document.getElementById("topbar");
  topbar.style.pointerEvents="auto";
  
  playGame();
 }


//Get Game Div size     
 var screenWidth= document.getElementById("GameBody").offsetWidth;
 
 //assigning final values   
 var max_siz=100;
 var min_siz=10; 
 var max_ID=90000;
 var min_ID=1000;  

 
function GameTimer() {
 
 //Randomize the game   
 var size = Math.floor((Math.random() * max_siz) + min_siz);
  if (size > 100){size=100 }
 //to set random   locations dots within the screen size  rang 
 var Rscreen=screenWidth-100;
 var dotHorizontalLocation = Math.floor((Math.random() *  Rscreen) ); 
 var dotID= Math.floor((Math.random() *  max_ID) + min_ID);

 // Creating Dots dynamically  
 var div = document.createElement("div");
 div.className  = "dot";
 div.style.width = size+"px";
 div.style.height = size+"px";
 if(dotHorizontalLocation<size)
   {
     div.style.left = size/2;
   }else{
      div.style.left = dotHorizontalLocation+"px";
   }
 
  div.id=dotID; 

 //To make every single dot clickable and unique 
 div.onclick = function() {  
		  var dot = document.getElementById(dotID);
      var score = parseInt(document.getElementById("score").innerHTML);
   
      //removing the clicked Dot
      document.getElementById("GameBody").removeChild(dot);
      //add Score after rounding to the nest integer to avoid decimals
      document.getElementById("score").innerHTML= score+
      Math.round(100/size) * document.getElementById("speed").value; 
      dotClickedCount++;
      var temp=dotClickedCount*4;
      document.getElementById("progressBarCount").style.width = temp+"%" ;
      
      
	  };

 document.getElementById("GameBody").appendChild(div);
}


//updating speed on silder change
var slider = document.getElementById("speed");
    slider.onchange = function() {
   
    var Dotsspeed = (10/this.value)*10;
    document.getElementById("speedTxt").innerHTML=this.value;

     setStyle(".dot {"+
       "animation: DotMotion "+Dotsspeed+"s 1;"+
       "animation-timing-function: linear;"+
       "z-index:1;}");  
}

function setStyle(cssText) {
    var sheet = document.createElement('style');
    sheet.type = 'text/css';
    /* Optional */ window.customSheet = sheet;
    (document.head || document.getElementsByTagName('head')[0]).appendChild(sheet);
    return (setStyle = function(cssText, node) {
        if(!node || node.parentNode !== sheet)
            return sheet.appendChild(document.createTextNode(cssText));
        node.nodeValue = cssText;
        return node;
    })(cssText);
};




function GameStatetoggle () {
  
  
  var slider = document.getElementById("speed");
  var speed = (10/this.value)*10;
     if (GameStat == "Paused") 
     {
       playGame();
       
     } 
     else 
     {
      pauseGame();
     
     }
  }

function pauseGame(){
   
    GameStat = "Paused";
    document.getElementById("speed").disabled = true;

     btn.innerHTML = '<a onclick="GameStatetoggle()" class="btn btn-info btn-lg">'+
    ' <span class="glyphicon glyphicon-play"></span> Play'+
     '</a>';

   setStyle(".dot {"+
   "animation: DotMotion "+speed+"s 1;"+
   "animation-play-state:paused;"+
   "animation-timing-function: linear;"+
   "z-index:1;}"); 


   var pausedmesg = document.getElementById("PauseMsg");
   pausedmesg.style.display="block";
   var GameBody = document.getElementById("GameBody");
   GameBody.style.pointerEvents="none";
   
    clearInterval(Timer2);
    clearInterval(Timer);
  }

  


  function playGame(){
    GameStat = "Running";
    document.getElementById("speed").disabled = false;
    btn.innerHTML = '<a onclick="GameStatetoggle()" class="btn btn-info btn-lg">'+
    ' <span class="glyphicon glyphicon-pause"></span> Pause'+
     '</a>';
   
     Timer = setInterval(GameTimer, 900);
     Timer2 = setInterval(CountdownTimer, 1000);
    setStyle(".dot {"+
     "animation: DotMotion "+speed+"s 1;"+
     "animation-play-state:running;"+
     "animation-timing-function: linear;"+
     "z-index:1;}"); 
  var pausedmesg = document.getElementById("PauseMsg");
  pausedmesg.style.display="none";

  var GameBody = document.getElementById("GameBody");
  GameBody.style.pointerEvents="auto";
  }



//startSimulation and pauseSimulation defined elsewhere
function handleVisibilityChange() {
  if (document.hidden && GameStat == "Running" ) {
    var btn = document.getElementById("statBtn");

    btn.innerHTML = '<a onclick="GameStatetoggle()" class="btn btn-info btn-lg">'+
    ' <span class="glyphicon glyphicon-play"></span> Play'+
     '</a>';

    var pausedmesg = document.getElementById("PauseMsg");
    pausedmesg.style.display="block";
    var GameBody = document.getElementById("GameBody");
    GameBody.style.pointerEvents="none";
    document.getElementById("speed").disabled = true;

    setStyle(".dot {"+
    "animation-play-state: paused;"+
    "animation-timing-function: linear;"+
    "z-index:1;}"); 

     clearInterval(Timer);
     clearInterval(Timer2);



  } else  {
    //startSimulation();
  }
}

function changeDotsColor(Color){
  setStyle(".dot { background: radial-gradient(circle at 50px 50px, "+Color+", #000);}"); 
}



//to check if the tab is visibale or the user has opened a new tab
document.addEventListener("visibilitychange", handleVisibilityChange, false);
  