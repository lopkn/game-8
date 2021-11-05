

class factory extends entity{
    constructor(x,y,team){
      super(x,y,team,'factory');
      this.hp = 300
      this.moneyGeneration = 35
      this.moveable = false
      this.sight = 5
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
    FactoryDraw(this)
  }
  
  hidraw(){
    FactoryHidraw(this)
}
}

function FactoryDraw(e){
    noStroke()
    fill(e.team.color)
    rect(e.x*tsize+2,e.y*tsize+2,14,14)
}

function FactoryHidraw(e){
  {

    if(notBuilding()==true){
    selectedBuilding = e
  }
        if(tiles[prevSelectedArea].light == 1){
    stroke("#FFFFFF")
    fill(e.team.color)
    rect(e.x*tsize+2,e.y*tsize+2,14,14)
    line(newwidth,newheight/2,width,newheight/2)
    noStroke()
    fill("#5F5FFF")
    text(e.team.teamname+"-"+e.name,newwidth,newheight/2 + 20)
    }
    if(e.team.teamname == TT.teamname){
      if(TT.state == "game"){
      TT.state = "building"}
      text("hp-"+e.hp,newwidth,newheight/2 + 40)
      shopdisplay()
    } else if(TT.state != "start") {TT.state = "inspect"}
  }
}

function shopdisplay(){
  let ttx = 80
  text("soldier:100g",newwidth,newheight/2 + ttx)
  text("architect:250g",newwidth,newheight/2 + ttx + 20)
  text("tank:250g",newwidth,newheight/2 + ttx + 40)
  text("medic:250g",newwidth,newheight/2 + ttx + 60)
}
