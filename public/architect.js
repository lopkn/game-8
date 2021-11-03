

class architect extends entity{
  constructor(x,y,team){
    super(x,y,team,'architect');
    this.hp = 100
    this.moveable = true
    this.shootable =false
    this.moveTurns = 3
    this.sight = 5
    // this.name = "architect"
    this.MaxTurns = 3
  }
  draw(){
ArchDraw(this)
console.log("change")
  }
  
  hidraw(){
ArchHidraw(this)
  }
  UpdateMoves(){
    this.moveTurns = this.MaxTurns
  }
}
function ArchDraw(e){
      noStroke()
    fill(e.team.color)
    rect(e.x*tsize+4,e.y*tsize+4,10,10)
}

function ArchHidraw(e){
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
    text("hp-"+e.hp,newwidth,newheight/2 + 40)
    text("moves-"+e.moveTurns,newwidth,newheight/2 + 60)
    shopdisplay2()
    } else if(TT.state != "start") {TT.state = "inspect"}}
}



function shopdisplay2(){
  let ttx = 100
  text("factory:400g",newwidth,newheight/2 + ttx)
  text("mine:200g",newwidth,newheight/2 + ttx + 20)
  text("trap:50g",newwidth,newheight/2 + ttx + 40)

}