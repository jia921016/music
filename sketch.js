var colors = "8e9aaf-cbc0d3-efd3d7-feeafa-dee2ff".split("-").map(a=>"#"+a)
var colors_r = "03071e-370617-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08".split("-").map(a=>"#"+a)
var clr,clr_r

var positionX =[]
var positionY =[]
var clrList =[]
var clr_r_List =[]
var m_x,m_y
var sizeList =[]
var song
var songIsplay=false //設定此變數為"假"，收到按下滑鼠把變數改為"真"，音樂播放
var amp
var vol=0
var music_btn,mouse_btn,Speech_btn
var musicIsplay=true
var mouseIsplay=true
var myRec = new p5.SpeechRec();
var result


function preload(){
  song = loadSound("Ice & Fire - King Canyon.mp3");
}



function setup() {
  createCanvas(windowWidth, windowHeight);  
  angleMode(DEGREES);//將方位度數改為角度模式

  music_btn = createButton("播音樂")
  music_btn.position(10,10)
  music_btn.size(350, 100);
  music_btn.style('background-color', 'black');
  music_btn.style('font-size', '44px');
  music_btn.style('color', 'white');
  music_btn.mousePressed(music_btn_pressed)

  mouse_btn = createButton("暫停")
  mouse_btn.position(370,10)
  mouse_btn.size(350, 100);
  mouse_btn.style('background-color', 'black');
  mouse_btn.style('font-size', '44px');
  mouse_btn.style('color', 'white');
  mouse_btn.mousePressed(mouse_btn_pressed)

  Speech_btn = createButton("語音辨識(播音樂/暫停)")
  Speech_btn.position(740,10)
  Speech_btn.size(350, 100);
  Speech_btn.style('background-color', 'black');
  Speech_btn.style('font-size', '32px');
  Speech_btn.style('color', 'white');
  Speech_btn.mousePressed(Speech_btn_pressed)

  
}

function music_btn_pressed(){  
  song.stop()
  song.play()
  songIsplay = true
  musicIsplay = false
  amp=new p5.Amplitude()
  music_btn.style('background-color', '#00b4d8');
  mouse_btn.style('background-color', 'black');
}

function mouse_btn_pressed(){  
  song.pause()
  musicIsplay = true
  songIsplay = false
  music_btn.style('background-color', 'black');
  mouse_btn.style('background-color', '#00b4d8');

 
}

function Speech_btn_pressed(){ 
  music_btn.style('background-color', 'black');
  mouse_btn.style('background-color', 'black');
  Speech_btn.style('background-color', '#00b4d8');
  myRec.onResult = showResult;
  myRec.start();
}

function showResult()
	{
		if(myRec.resultValue==true) {
			// background(192, 255, 192);
			// text(myRec.resultString, width/2, height/2);
      push()
        translate(0,0)
        background(192, 255, 192);
        fill(255,0,0)
        textStyle("italic")
        text(myRec.resultString,1200,10);
        text(myRec.resultString,0, height/2);
      pop()
      result = myRec.resultString
      if(myRec.resultString==="播音樂")
      {
        music_btn_pressed()
      }
      if(myRec.resultString==="暫停")
      {
        song.pause()
        mosueIsplay = true
        songIsplay = false
        }
		}
	}

function draw() {
  background("#43bccd");
  push()
  textSize(50)
  fill(255,0,0)  
  text(result,1100,100);   
pop()

if(songIsplay){
  vol = amp.getLevel()
  m_x =map(vol,0,1,0,width) 
  m_y= map(vol,0,1,0,height)
  
}
else
if(mouseIsplay)
{
  m_x = mouseX
  m_y= mouseY

}   

  for(var j=0;j<10;j++){
    positionX.push(random(width))
    positionY.push(random(height))
    clrList.push(colors[int(random(colors.length))])
    clr_r_List.push(colors_r[int(random(colors_r.length))])
    sizeList.push(random(0.5,1.5))
    //畫圖
    push() 
      translate(positionX[j],positionY[j]) //原點移到視窗的中心點
      clr = clrList[j]
      clr_r = clr_r_List[j]
      drawFlower(clr,clr_r,sizeList[j])//沒有clr_r_r的話記得拿掉
      
    pop()
    }
  
  
}

function drawFlower(clr,clr_r,size=1){
  background("#43bccd");   
  

    push()
    scale(size) //縮放
      fill(clr)
      ellipse(0+m_x/20,0+m_y/20,400/1.05,400/0.88) //臉
      fill("#caf0f8")
      triangle(0+m_x/20,-400/20+m_y/20,-400/13+m_x/20,400/13+m_y/20,400/20+m_x/20,400/13+m_y/20) //鼻子
  
      fill("#bc4749")
  
      ellipse(-400/5.3+m_x/20,-400/5+m_y/20,400/6.66,400/10) //眼睛
      ellipse(400/5.3+m_x/20,-400/5+m_y/20,400/6.66,400/10) //眼睛
    
      fill(0)
      ellipse(-400/5.3+m_x/20,-400/5+m_y/20,400/16)//左眼珠
      ellipse(400/5.3+m_x/20,-400/5+m_y/20,400/16)
  
      arc(0+m_x/20,-400/3.07+m_y/20,400/1.21,400/1.6,180,0) //瀏海
  
       
         fill(clr_r)
         arc(0+m_x/20,400/5.3+m_y/20,400/4,400/5.3,0,180)
  
    pop()

}