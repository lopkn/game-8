
class mine extends entity{
    constructor(x,y,team){
      super(x,y,team,'mine');
      this.hp = 70
      this.moneyGeneration = 20
      // this.name = "mine"
      this.sight = 2
      this.moveable = false
      this.shootable =false
      // this.units = ["soldier"]
  }
  
  UpdateMoves(){
    for(let i = 0; i < teams.length; i++){
      if(teams[i].teamname == this.team.teamname){
        teams[i].money += this.moneyGeneration
      }
    }
  }
  draw(){
    MineDraw(this)
  }
  
  hidraw(){
    MineHidraw(this)
  }
}

function MineDraw(e){
    noStroke()
    fill(e.team.color)
    triangle(e.x*tsize+4,e.y*tsize+2,e.x*tsize+tsize-4,e.y*tsize+2,e.x*tsize+tsize/2,e.y*tsize+tsize-2)
}

function MineHidraw(e){

    if(notBuilding()==true){
    selectedBuilding = e
  }
    if(tiles[prevSelectedArea].light == 1){
    stroke("#FFFFFF")
    fill(e.team.color)
     triangle(e.x*tsize+2,e.y*tsize+2,e.x*tsize+tsize-2,e.y*tsize+2,e.x*tsize+tsize/2,e.y*tsize+tsize-2)
    line(newwidth,newheight/2,width,newheight/2)
    noStroke()
    fill("#5F5FFF")
    text(e.team.teamname+"-"+e.name,newwidth,newheight/2 + 20)}
    
    if(e.team.teamname == TT.teamname){
      TT.state = "game"
      text("hp-"+e.hp,newwidth,newheight/2 + 40)
    } else if(TT.state != "start") {TT.state = "inspect"}
}