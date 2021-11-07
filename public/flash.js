class flash{
  constructor(x1,y1,x2,y2,text){
    this.x1 = x1 * tsize + tsize/2
    this.x2 = x2 * tsize + tsize/2
    this.y1 = y1 * tsize + tsize/2
    this.y2 = y2 * tsize + tsize/2
    this.text = text
    if(text<0){
      this.norm = 0
      this.text *= -1
    } else {this.norm = 1}
    this.life = 100 + text/10
  }


  updraw(){
    strokeWeight(this.life/25 * this.text/50)
    stroke(this.norm*230,Math.random()*150+100,Math.random()*20)
    line(this.x1, this.y1, this.x2, this.y2)
    textSize(20)
    stroke(this.norm*230,this.life*2,0)
    fill(0,(this.norm-1)*-255,this.life)
    text(this.text,this.x2-10,this.y2 + this.life/4 - 25)
    this.life -= 2
    noStroke()
  }
}
  flashes = []
function fl(){
  for(let i = flashes.length - 1; i >= 0; i--){
      flashes[i].updraw()
      if(flashes[i].life < 1){
        flashes.splice(i,1)
      }
    }
}