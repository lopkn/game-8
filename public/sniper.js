class sniper extends entity{
  constructor(x,y,team){
    super(x,y,team,'sniper');
    this.hp = 300
    this.moveTurns = 3
    // this.name = "tank"
    this.MaxTurns = 2
    this.shootdistance = 6
    this.moveable = true
    this.shootable =true
    this.sight = 6
    this.dmg = [20,60]
  }
  draw(){
    SniperDraw(this)
  }
  
  hidraw(){
    SniperHidraw(this)
  }
  UpdateMoves(){
    this.moveTurns = this.MaxTurns
  }
}

function SniperDraw(e){
    stroke(e.team.color)
    strokeWeight(2)
    noFill()
    ellipse(e.x*tsize + tsize/2,e.y*tsize + tsize/2, 10)
    line(e.x*tsize +tsize/2, e.y*tsize,e.x*tsize +tsize/2,e.y*tsize+tsize/3)
    line(e.x*tsize +tsize/2, e.y*tsize + tsize,e.x*tsize +tsize/2,e.y*tsize+tsize-tsize/3)

    line(e.x*tsize,e.y*tsize + tsize/2,e.x*tsize +tsize/3 ,e.y*tsize + tsize/2)
    line(e.x*tsize + tsize,e.y*tsize + tsize/2,e.x*tsize +tsize-tsize/3 ,e.y*tsize + tsize/2)
}

function SniperHidraw(e){

    if(TT.state == "building"){
      TT.state = "game"
    }
    if(notBuilding()==true){
    selectedBuilding = e
  }
        if(tiles[prevSelectedArea].light == 1){
    stroke(e.moveTurns * 127)
    fill(e.team.color)
    ellipse(e.x*tsize+2,e.y*tsize+2,5)
    line(newwidth,newheight/2,width,newheight/2)
    noStroke()
    fill("#5F5FFF")
    text(e.team.teamname+"-"+e.name,newwidth,newheight/2 + 20)
    if(e.team.teamname == TT.teamname){
    text("hp-"+e.hp,newwidth,newheight/2 + 40)
    text("moves-"+e.moveTurns,newwidth,newheight/2 + 60)
    }}
}