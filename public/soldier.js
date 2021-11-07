
class soldier extends entity{
  constructor(x,y,team){
    super(x,y,team,"soldier");
    this.moveable = true
    this.shootable =true
    this.hp = 100
    this.moveTurns = 3
    // this.name = "soldier"
    this.MaxTurns = 5
    this.shootdistance = 2
    this.dmg = [30,70]
    this.sight = 5
  }
  draw(){
    SoldierDraw(this)
  }
  
  hidraw(){
    SoldierHidraw(this)
  }
  UpdateMoves(){
    this.moveTurns = this.MaxTurns
  }
}

function SoldierDraw(e){
    noStroke()
    fill(e.team.color)
    ellipse(e.x*tsize + tsize/2,e.y*tsize + tsize/2, 10)
}

function SoldierHidraw(e){

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
    if(myTeamNum == turn){
    text("hp-"+e.hp,newwidth,newheight/2 + 40)
    text("moves-"+e.moveTurns,newwidth,newheight/2 + 60)
    shopdisplay3()
    }

  }

}

function shopdisplay3(){
  let ttx = 100
  text("trap:100g",newwidth,newheight/2 + ttx)
}