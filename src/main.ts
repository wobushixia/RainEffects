const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const textCanvas = document.getElementById('textCanvas') as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
const textCtx = textCanvas.getContext('2d') as CanvasRenderingContext2D;
const dpr = window.devicePixelRatio || 1;
context.scale(dpr,dpr)
textCtx.scale(dpr,dpr)
canvas.width = 800;
canvas.height = 600;
textCanvas.width = 800
textCanvas.height = 600

class RainText{
  size:number
  x:number
  y:number

  constructor(){
    this.size = Math.random()*10+15
    this.x = textCanvas.width*Math.random()
    this.y = textCanvas.height*Math.random()
  }

  render(){
    textCtx.font = `100 ${this.size}px Roboto`;
    textCtx.fillStyle = '#fff'
    textCtx.fillText('雨',this.x,this.y)
  }
}

class Rain{
  x: number
  y: number
  speed: number;
  length: number;
  shear :number;

  color:string
  dx:number
  dy:number

  constructor(){
    this.x = Math.random()*canvas.width
    this.y = -100
    this.speed = Math.random()*5+10,
    this.length = Math.random()*5+30
    this.shear = Math.random()*3*Math.pow(-1,Math.floor(Math.random()*10))
    this.dx = this.x+this.shear
    this.dy = this.y+this.length
    this.color = `hsl(0, 0%, ${Math.random() * 80 + 20}%)`
  }

  render(){
    this.nextTick()

    context.beginPath()
    context.strokeStyle = this.color
    context.moveTo(this.x,this.y)
    context.lineTo(this.dx,this.dy)
    context.stroke()
  }

  nextTick(){
    if(this.x>=canvas.width||this.y>=canvas.height){
      return
    }
    this.x += this.shear/1.5
    this.y += this.speed
    this.dx = this.x+this.shear
    this.dy = this.y+this.length
  }
}

let rains = []
let rainsText:RainText[] = []
const MAX_RAINS = 200;
const MAX_TEXT = 50;

const update = () => {
  rains.push(new Rain())
  setTimeout(()=>rainsText.push(new RainText()),2000)
  
  context.fillRect(0, 0, canvas.width, canvas.height);

  if(rainsText.length>=MAX_TEXT){
    rainsText.slice(40)
  }
  if(rains.length>=MAX_RAINS){
    rains.slice(100)
  }

  rains.forEach((rain) => {
    rain.render();
  });
  rainsText.forEach((rainText)=>{
    rainText.render()
  })
  requestAnimationFrame(update);
};

update();
