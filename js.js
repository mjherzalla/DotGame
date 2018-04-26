
 
 var dotClickedCount=0;
 var GameStat="Paused";
 var LevelStat="1";
 var dotsPerLevel=25;

 function startGame(){
  
  var timeleft = 35;
  var gameTimer = setInterval(function(){
    timeleft--;
    document.getElementById("time").innerHTML = timeleft;
    if(timeleft <= 0 || dotClickedCount>=dotsPerLevel ){

       
      clearInterval(gameTimer);
    }
     
      if(dotClickedCount==dotsPerLevel ){

        nextLevel();
        alert(dotClickedCount+",,"+dotsPerLevel);
      }

  },1000);
 }

 startGame();
 function nextLevel(){
  var NextLevelMsg = document.getElementById("NextLevelMsg");
  NextLevelMsg.style.display="block";



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

  var slider = document.getElementById("speed");

  slider.onchange = function() {
  var speed = (10/this.value)*10;
  document.getElementById("speedTxt").innerHTML=this.value;

  setStyle(".dot {"+
    "animation: DotMotion "+speed+"s 1;"+
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
  
  var btn = document.getElementById("statBtn");
  var slider = document.getElementById("speed");
  var speed = (10/this.value)*10;
     if (GameStat == "Paused") 
     {
         GameStat = "Running";
         document.getElementById("speed").disabled = false;
         btn.innerHTML = '<a onclick="GameStatetoggle()" class="btn btn-info btn-lg">'+
         ' <span class="glyphicon glyphicon-pause"></span> Pause'+
          '</a>';
        Timer = setInterval(GameTimer, 900);


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
     else 
     {
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
      var GameBody = document.getElementById("GameBody");
      GameBody.style.pointerEvents="none";

       clearInterval(Timer);
     }
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




  } else  {
    //startSimulation();
  }
}

function changeDotsColor(Color){
  setStyle(".dot { background: radial-gradient(circle at 50px 50px, "+Color+", #000);}"); 
}



//to check if the tab is visibale or the user has opened a new tab
document.addEventListener("visibilitychange", handleVisibilityChange, false);
  