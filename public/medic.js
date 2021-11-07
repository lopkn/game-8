
class medic extends entity{
  constructor(x,y,team){
    super(x,y,team,"medic");
    this.moveable = true
    this.shootable =true
    this.hp = 100
    this.moveTurns = 3
    this.MaxTurns = 4
    this.sight = 5.5
    this.shootdistance = 2
    this.dmg = [-50,-30]
  }
  draw(){
    MedicDraw(this)
  }
  
  hidraw(){
    MedicHidraw(this)
  }
  UpdateMoves(){
    this.moveTurns = this.MaxTurns
  }
}
function MedicDraw(e){
    noStroke()
    fill(e.team.color)
    rect(e.x*tsize + tsize/2-2,e.y*tsize+2,4,tsize-4)
    rect(e.x*tsize + 2, e.y*tsize + tsize/2-2,tsize-4,4)
}


function MedicHidraw(e){
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
    if(myTeamNum == turn && e.team.teamname == TT.teamname){
    text("hp-"+e.hp,newwidth,newheight/2 + 40)
    text("moves-"+e.moveTurns,newwidth,newheight/2 + 60)
    }}
}