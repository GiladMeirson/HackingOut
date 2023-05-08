let canvas = "";
let ctx = "";
let initX = 0;
let initY = 0;
const Radius = 25;
const velocity = 5;
const HeigtRoom = innerHeight * 0.3;
const WidthRoom = innerWidth * 0.35;
let StartTime=0;
let finishTime=0;


const init = () => {
  canvas = document.getElementById("MyCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  initX = canvas.width / 2;
  initY = canvas.height / 2;
  //
  LeftX = canvas.width / 2 - WidthRoom;
  RightX = LeftX + WidthRoom * 2;
  UpperY = canvas.height / 2 - HeigtRoom;
  LowerY = UpperY + HeigtRoom * 2;
  LengthGate = (LowerY - UpperY) * 0.2;
  startGateY=UpperY+(LowerY-UpperY)*0.33;
  document.getElementById('CodeIN').addEventListener('keydown',(e)=>{
    if (e.keyCode==13) {
        CheckCode();
    }
  })

  animate();
};

const DrawPlayer = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, Radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
};

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 38 || e.keyCode == 87) {
    //up
    console.log("up");
    initY -= velocity;
  }
  if (e.keyCode == 37 || e.keyCode == 65) {
    //left
    console.log("left");
    initX -= velocity;
  }
  if (e.keyCode == 39 || e.keyCode == 68) {
    //right
    console.log("right");
    initX += velocity;
  }
  if (e.keyCode == 40 || e.keyCode == 83) {
    //down
    console.log("down");
    initY += velocity;
  }

  CheckColidBoundries();
});

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  DrawPlayer(initX, initY);
  DrawSecen();
  DrawGate();
  CheclColidGate();

  window.requestAnimationFrame(animate);
};

const DrawSecen = () => {
  ctx.beginPath();
  ctx.rect(
    canvas.width / 2 - WidthRoom,
    canvas.height / 2 - HeigtRoom,
    WidthRoom * 2,
    HeigtRoom * 2
  );
  ctx.lineWidth = "6";
  ctx.strokeStyle = "#0000ff";
  ctx.stroke();
  ctx.closePath();
};

const CheckColidBoundries = () => {
  if (initY - Radius <= UpperY) {
    initY = UpperY + Radius;
  }
  if (initY + Radius >= LowerY) {
    initY = LowerY - Radius;
  }
  if (initX - Radius <= LeftX) {
    initX = LeftX + Radius;
  }
  if (initX + Radius >= RightX) {
    initX = RightX - Radius;
  }
};

const DrawGate = () => {
  ctx.beginPath();
  ctx.moveTo(LeftX, startGateY);
  ctx.lineTo(LeftX, startGateY + LengthGate);
  ctx.lineWidth = "16";
  ctx.strokeStyle = "#ff0000";
  ctx.stroke();
  ctx.closePath();
};

const CheclColidGate=()=>{
    if (initX-Radius<=LeftX+5) {
        if (initY+Radius>=startGateY && initY-Radius<=startGateY+LengthGate) {
            $('#modal').fadeIn(750);
            initX = LeftX + Radius*2;
        }
    }
}

const ClosrModal=()=>{
    $('#modal').fadeOut(250);
}


const CheckCode=()=>{
    let code =$('#CodeIN').val();
    let Rcode = document.title.replace('The Code is : ','');
    if (code==Rcode) {
        console.log('WIN!!!');
        document.getElementById('CodeIN').style.border='1px solid darkgreen';
        finishTime= GetTimeDiff();
        document.getElementById('Wrap').innerHTML=`<h1>You Win</h1> <br> <h1>Finish Time :</h1> <br> <h1>${finishTime}</h1>`;
        

    }
    else{
        document.getElementById('CodeIN').style.border='1px solid red';
    }


}

const StartGame=()=>{
    $('#modalStart').fadeOut(750);
    StartTime=new Date();
    console.log(StartTime)

}


const GetTimeDiff=()=>{
    let now = new Date();
    let timediff=now-StartTime;
    let hours=timediff/3600000;
    let hoursM=hours%1;
    hours=Math.floor(hours);

    let min = hoursM*60;
    let minN=min%1;
    min=Math.floor(min);

    let sec=minN*60;
    let secM=sec%1;
    sec=Math.floor(sec);

    let milisec=Math.floor(secM*100);
    str='hours :'+hours+' || min :'+min+' ||sec :'+sec+' ||milisec :'+milisec;
    return str;
    // let strRes=`Hours:${timediff.getHours()}`;
    // console.log(strRes);
}