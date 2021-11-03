class tank extends entity{
  constructor(x,y,team){
    super(x,y,team,'tank');
    this.hp = 300
    this.moveTurns = 3
    // this.name = "tank"
    this.MaxTurns = 3
    this.shootdistance = 3
    this.moveable = true
    this.shootable =true
    this.sight = 6
    this.dmg = [120,160]
  }
  draw(){
    TankDraw(this)
  }
  
  hidraw(){
    TankHidraw(this)
  }
  UpdateMoves(){
    this.moveTurns = this.MaxTurns
  }
}

function TankDraw(e){
    noStroke()
    fill(e.team.color)
    ellipse(e.x*tsize + tsize/2,e.y*tsize + tsize/2, 14)
}

function TankHidraw(e){

    if(TT.state == "building"){
      TT.state = "game"
    }
    if(notBuilding()==true){
    selectedBuilding = e
  }
        if(tiles[prevSelectedArea].light == 1){
    stroke(e.moveturns * 127)
    fill(e.team.color)
    ellipse(e.x*tsize+2,e.y*tsize+2,5)
    line(newwidth,newheight/2,width,newheight/2)
    noStroke()
    fill("#5F5FFF")
    text(e.team.teamname+"-"+e.name,newwidth,newheight/2 + 20)
    if(e.team.teamname == TT.teamname){
    text("shield-"+e.hp,newwidth,newheight/2 + 40)
    text("moves-"+e.moveTurns,newwidth,newheight/2 + 60)
    }}
}