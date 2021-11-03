
class trap extends entity{
    constructor(x,y,team){
      super(x,y,team,'trap');
      this.hp = 10
      this.moveable = false
      this.shootable = false
      this.sight = 4
  }
  
  UpdateMoves(){
    for(let i = 0; i < entities.length; i++){
      if(entities[i].moveable == true){
      if(entities[i].posnum == this.posnum){
         entities[i].hp -= 20
         console.log("you stepped on a landmine!")
         this.hp = 0
      }
    }}
  }
  draw(){
    TrapDraw(this)
  }
  
  hidraw(){
    TrapHidraw(this)
  }
}

function TrapDraw(e){
noStroke()
    fill(e.team.color)
    quad(e.x*tsize+tsize/2,e.y*tsize,e.x*tsize,e.y*tsize+tsize/2,e.x*tsize+tsize/2,e.y*tsize+tsize,e.x*tsize+tsize,e.y*tsize+tsize/2)
}

function TrapHidraw(e){

    if(notBuilding()==true){
    selectedBuilding = e
  }
    if(tiles[prevSelectedArea].light == 1 && (turn == myTeamNum || teams[myTeamNum].name == e.team.teamname)){
    stroke("#FFFFFF")
    fill(e.team.color)
         quad(e.x*tsize+tsize/2,e.y*tsize,e.x*tsize,e.y*tsize+tsize/2,e.x*tsize+tsize/2,e.y*tsize+tsize,e.x*tsize+tsize,e.y*tsize+tsize/2)
    line(newwidth,newheight/2,width,newheight/2)
    noStroke()
    fill("#5F5FFF")
    text(e.team.teamname+"-"+e.name,newwidth,newheight/2 + 20)}
    
    if(e.team.teamname == teams[myTeamNum].name){
      TT.state = "game"
      text("hp-"+e.hp,newwidth,newheight/2 + 40)
    } else if(TT.state != "start") {TT.state = "inspect"}
}