
building_costs = [["mine",200],["architect",250],["factory",400],["soldier",100],["tank",250]]


function findBuildingDetails(j){
  for(let i = 0; i < building_costs.length; i++){
    if(building_costs[i][0] == j){
      return(i)
    }
  }
  return(false)
}






newwidth = 720
newheight = 720

function randint(max){
  return Math.floor(Math.random() * max);
}

function inbox(x,y,x1,y1,x2,y2){
  if(x>=x1 && x<= x2 && y >= y1 && y <= y2){
    return(true)
  } else {
    return(false)
         }
}

turns = 1
prevSelectedArea = 0
tsize = 18
rowx = newwidth / tsize
rowy = newheight /tsize
entities = []
selectedBuilding = 0
keywait = 0
started = false



class team{
  constructor(teamname,color){
    this.teamname = teamname
    this.color = color
    this.buildings = []
    this.money = 800
    this.state = "start"
  }
}

tilecolors = ['#FF00FF','#2F4FAF','#CFCF30','#3FAF2F','#3F7F2F','#5F5F5F','#FFFFFF']
tilenames = ['error','shallow water','sand','grassland','dense forrest','mountain','snowy mountain']

class tile{
  constructor(id,x,y){
    
    if(id < 30){
      this.id = 1
    } else if (id < 36){
      this.id = 2
    } else if (id < 55){
      this.id = 3
    } else if (id < 65){
      this.id = 4
    } else if (id < 80){
      this.id = 5
    } else if (id < 101){
      this.id = 6
    }
    
    this.x = x
    this.y = y
    this.light = 0
    this.highlight = 0
    this.name = tilenames[this.id]
  }
  
  draw(){
    stroke(0)
      strokeWeight(1)
      fill(tilecolors[this.id])
      rect(this.x*tsize,this.y*tsize,tsize,tsize)
      this.light = 1
  }
  darkdraw(){
      stroke(50)
      strokeWeight(1)
      fill(50)
      rect(this.x*tsize,this.y*tsize,tsize,tsize)
      this.light = 0
  }
  hidraw(){
      strokeWeight(2)
    stroke(TT.color)
      fill(tilecolors[this.id])
      rect(this.x*tsize,this.y*tsize,tsize,tsize)
    stroke(25)
    fill(200)
    textSize(20)
    text(this.name,730,100)
    text(this.x+","+this.y,730,120)
  }
}

class entity{
  constructor(x,y,team,name){
    this.hp = 0
    this.x = x
    this.y = y
    this.team = team
    this.selected = false
    this.posnum = this.x + this.y * (newwidth/tsize)
    this.cost = building_costs[findBuildingDetails(name)][1]
    this.name = name
  }
  
  update(){
    this.posnum = this.x + this.y * (newwidth/tsize)
  }
  
}





class factory extends entity{
    constructor(x,y,team){
      super(x,y,team,'factory');
      this.hp = 300
      this.moneyGeneration = 25
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
    noStroke()
    fill(this.team.color)
    rect(this.x*tsize+2,this.y*tsize+2,14,14)
  }
  
  hidraw(){
    selectedBuilding = this
    stroke("#FFFFFF")
    fill(this.team.color)
    rect(this.x*tsize+2,this.y*tsize+2,14,14)
    line(newwidth,newheight/2,width,newheight/2)
    noStroke()
    fill("#5F5FFF")
    text(this.team.teamname+"-"+this.name,newwidth,newheight/2 + 20)
    
    if(this.team.teamname == TT.teamname){
      if(TT.state == "game"){
      TT.state = "building"}
      text("hp-"+this.hp,newwidth,newheight/2 + 40)
      shopdisplay()
    } else if(TT.state != "start") {TT.state = "inspect"}
  }
}



function shopdisplay(){
  let ttx = 80
  text("soldier:100g",newwidth,newheight/2 + ttx)
  text("architect:250g",newwidth,newheight/2 + ttx + 20)
  text("tank:250g",newwidth,newheight/2 + ttx + 40)
}

function shopdisplay2(){
  let ttx = 100
  text("factory:400g",newwidth,newheight/2 + ttx)
  text("mine:200g",newwidth,newheight/2 + ttx + 20)
}





class mine extends entity{
    constructor(x,y,team){
      super(x,y,team,'mine');
      this.hp = 70
      this.moneyGeneration = 15
      // this.name = "mine"
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
    noStroke()
    fill(this.team.color)
    triangle(this.x*tsize+4,this.y*tsize+2,this.x*tsize+tsize-4,this.y*tsize+2,this.x*tsize+tsize/2,this.y*tsize+tsize-2)
  }
  
  hidraw(){
    selectedBuilding = this
    stroke("#FFFFFF")
    fill(this.team.color)
     triangle(this.x*tsize+2,this.y*tsize+2,this.x*tsize+tsize-2,this.y*tsize+2,this.x*tsize+tsize/2,this.y*tsize+tsize-2)
    line(newwidth,newheight/2,width,newheight/2)
    noStroke()
    fill("#5F5FFF")
    text(this.team.teamname+"-"+this.name,newwidth,newheight/2 + 20)
    
    if(this.team.teamname == TT.teamname){
      TT.state = "game"
      text("hp-"+this.hp,newwidth,newheight/2 + 40)
    } else if(TT.state != "start") {TT.state = "inspect"}
  }
}







class architect extends entity{
  constructor(x,y,team){
    super(x,y,team,'architect');
    this.hp = 100
    this.moveable = true
    this.shootable =false
    this.moveTurns = 3
    // this.name = "architect"
    this.MaxTurns = 3
  }
  draw(){
    noStroke()
    fill(this.team.color)
    rect(this.x*tsize+4,this.y*tsize+4,10,10)
  }
  
  hidraw(){
    selectedBuilding = this
    stroke(this.moveturns * 127)
    fill(this.team.color)
    ellipse(this.x*tsize+2,this.y*tsize+2,5)
    line(newwidth,newheight/2,width,newheight/2)
    noStroke()
    fill("#5F5FFF")
    text(this.team.teamname+"-"+this.name,newwidth,newheight/2 + 20)
    if(this.team.teamname == TT.teamname){
    text("hp-"+this.hp,newwidth,newheight/2 + 40)
    text("moves-"+this.moveTurns,newwidth,newheight/2 + 60)
    shopdisplay2()
    } else if(TT.state != "start") {TT.state = "inspect"}
  }
  UpdateMoves(){
    this.moveTurns = this.MaxTurns
  }
}







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
  }
  draw(){
    noStroke()
    // console.log(this.team)
    fill(this.team.color)
    ellipse(this.x*tsize + tsize/2,this.y*tsize + tsize/2, 10)
  }
  
  hidraw(){
    if(TT.state == "building"){
      TT.state = "game"
    }
    selectedBuilding = this
    stroke(this.moveturns * 127)
    fill(this.team.color)
    ellipse(this.x*tsize+2,this.y*tsize+2,5)
    line(newwidth,newheight/2,width,newheight/2)
    noStroke()
    fill("#5F5FFF")
    text(this.team.teamname+"-"+this.name,newwidth,newheight/2 + 20)
    if(this.team.teamname == TT.teamname){
    text("hp-"+this.hp,newwidth,newheight/2 + 40)
    text("moves-"+this.moveTurns,newwidth,newheight/2 + 60)
    }
  }
  UpdateMoves(){
    this.moveTurns = this.MaxTurns
  }
}








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
    this.dmg = [120,160]
  }
  draw(){
    noStroke()
    // console.log(this.team)
    fill(this.team.color)
    ellipse(this.x*tsize + tsize/2,this.y*tsize + tsize/2, 14)
  }
  
  hidraw(){
    if(TT.state == "building"){
      TT.state = "game"
    }
    selectedBuilding = this
    stroke(this.moveturns * 127)
    fill(this.team.color)
    ellipse(this.x*tsize+2,this.y*tsize+2,5)
    line(newwidth,newheight/2,width,newheight/2)
    noStroke()
    fill("#5F5FFF")
    text(this.team.teamname+"-"+this.name,newwidth,newheight/2 + 20)
    if(this.team.teamname == TT.teamname){
    text("shield-"+this.hp,newwidth,newheight/2 + 40)
    text("moves-"+this.moveTurns,newwidth,newheight/2 + 60)
    }
  }
  UpdateMoves(){
    this.moveTurns = this.MaxTurns
  }
}

















function mousetotile(ex,ey){
  return(int(ex/tsize) + int(ey/tsize) * newheight/tsize)
}

function tiletopos(e){
  return([ e - int(e/(newwidth/tsize)) * (newwidth/tsize),int(e/(newheight/tsize))])
}


function gettile(ex,ey){
  num =ex+ey*(newwidth/tsize)
  first = tiles[num]
  for(let i = 0; i < entities.length; i++){
    if(entities[i].posnum == num){
      return([first,true])
    }
  }
  return([first,false])
}


function checkMouseEntities(){
  for(let i = 0; i < entities.length; i++){
    if(entities[i].posnum == prevSelectedArea && tiles[prevSelectedArea].light == 1){
      entities[i].hidraw()
      return(i)
    }
  }
  return("no entity")
}
function checkMouseEntities2(e){
  for(let i = 0; i < entities.length; i++){
    if(entities[i].posnum == e){
      // entities[i].hidraw()
      return(i)
    }
  }
  return("no entity")
}

function checkPosEntities(){
  
}











//buttons

function action1(){

if(started == false){
  myTeamNum = 0
}

  if(TT.state == "start" && cme == "no entity"){
  temp = tiletopos(prevSelectedArea)
  entities.push(new factory(temp[0],temp[1],TT))
    TT.state = "game"
    update(currentlyDoing)
    // console.log(entities)
  } else if(selectedBuilding.name == "factory" &&TT.state == "building" && currentlyDoing == 1){
   
    if(TT.money >= 100){
      TT.money -= 100
       currentlyDoing = "soldier"
      console.log("making new:soldier")
    }
    
  } else if(currentlyDoing == 1 && TT.state == "game" && selectedBuilding.team.teamname == TT.teamname && selectedBuilding.name != "factory"){
            TT.state = "moving"
    currentlyDoing = "moving"
            }
}





function action2(ein){
  if(started == false){
  myTeamNum = 1
}
  if(selectedBuilding.name == "factory" &&TT.state == "building" && currentlyDoing == 1){
   
    if(TT.money >= 250){
      TT.money -= 250
       currentlyDoing = "architect"
      console.log("making new:architect")
    }
    
  }else if(selectedBuilding.name == "architect" && currentlyDoing == 1){
   
    if(TT.money >= 400){
      TT.money -= 400
       currentlyDoing = "factory"
      console.log("making new:factory")
    }
    
  }  else if(currentlyDoing == 1 && TT.state == "game" && selectedBuilding.team.teamname == TT.teamname && selectedBuilding.shootable == true && selectedBuilding.moveTurns > 0){
            TT.state = "shooting"
    currentlyDoing = "shooting"
    shootingSeed = ein
            }
}

function action3(){

if(started == false){
  myTeamNum = 2
}



  if(selectedBuilding.name == "factory" &&TT.state == "building" && currentlyDoing == 1){
   
    if(TT.money >= 250){
      TT.money -= 250
       currentlyDoing = "tank"
      console.log("building new:tank")
    }
    
  }else if(selectedBuilding.name == "architect" && currentlyDoing == 1){
   
    if(TT.money >= 200){
      TT.money -= 200
       currentlyDoing = "mine"
      console.log("building new:mine")
    }
    
  }


}
function clientSYNC(syncPacket){
  tempEntities = syncPacket[0]
  entities = []
  for(let i = 0; i<tempEntities.length;i++){
    en = tempEntities[i]
    if(en.name == "factory"){
      tempEntity = new factory()
    } else if (en.name == "mine"){
      tempEntity = new mine()
    } else if (en.name == "soldier"){
      tempEntity = new soldier()
    } else if (en.name == "tank"){
      tempEntity = new tank()
    } else if (en.name == "architect"){
      tempEntity = new architect()
    }


      Object.assign(tempEntity,en)
      entities.push(tempEntity)

  }



  teams = syncPacket[1]
  currentlyDoing = syncPacket[2][0]
  TT = syncPacket[2][1]
  turn = syncPacket[3]
  console.log("synced!")
}

function SYNC(){
  entitySync = entities
  teamSync = teams
  stateSync = [currentlyDoing,TT]
  turnSync = turn
  syncPacket = [entitySync,teamSync,stateSync,turnSync]
  socket.emit('toSerSync',syncPacket)
}


function exit(){
  if(TT.state == "moving" || TT.state == "shooting"){
TT.state = "game"}
  if(currentlyDoing == "moving"|| currentlyDoing == "shooting"){
    currentlyDoing = 1
  }
  if(currentlyDoing == "mine"){
    currentlyDoing = 1
    TT.money += 200
  }


}

function endTurn(){
  if(TT.state == "game" && currentlyDoing == 1){
  turn += 1
  if(turn > teams.length - 1){
    turn = 0
  }
  turns += 1
  for(let i = 0; i < entities.length; i++){
    if(entities[i].name != "noUpdate"){entities[i].UpdateMoves()}
  }
  }
}

function eExit(){
  // TT.state = "game"
}
//create game!

team1 = new team("purple",'#AF00FF')
team2 = new team("red","#FF0000")
teams = [team1,team2]
tiles = []
turn = 0
currentlyDoing = 1

function kd(num){
  if(num == 65){kd65()}
  if(num == 87){kd87()}
  if(num == 83){kd83()}
  if(num == 68){kd68()}
}

class player{
  constructor(){
  this.id = id}
}
seeded = false
function seed(e){
  noiseSeed(e)
  for(let j = 0; j < rowy; j++){
for(let i = 0; i < rowx; i++){
  let n = int(noise(i * 0.2, j * 0.2)*100)
  tiles.push(new tile(n+1,i,j))
}
}
seeded = true
}





//create tiles!
function setup() {
  socket = io.connect('/');
  socket.on('connect', () => {
    // player1 = new player(socket.id)
  });
  socket.on('seed',seed)
  socket.on('toClient',cloned);
  socket.on('deletePlayer',deletePlayer);
  socket.on('toClientClick',toClientUpdate)
  socket.on('BackToClientAction',allbuttons)
  socket.on('toClientSync',clientSYNC)

socket.on('tckd',kd);





  createCanvas(880 , 720);

// for(let j = 0; j < rowy; j++){
// for(let i = 0; i < rowx; i++){
//   let n = int(noise(i * 0.2, j * 0.2)*100)
//   tiles.push(new tile(n+1,i,j))
// }
// }
  
  B1 = createButton('ACT 1');
  B1.position(0,newheight);
  B1.mousePressed(function(){allbuttonsemit(1)});
  B2 = createButton('ACT 2');
  B2.position(100,newheight);
  B2.mousePressed(function(){allbuttonsemit(2)});
  B2 = createButton('ACT 3');
  B2.position(200,newheight);
  B2.mousePressed(function(){allbuttonsemit(3)});
  bEnd =createButton('End Turn');
  bEnd.position(newwidth,newheight)
  bEnd.mousePressed(function(){allbuttonsemit(4)})
  bEx =createButton('Exit');
  bEx.position(newwidth+100,newheight)
  bEx.mousePressed(function(){allbuttonsemit(5)})
  bEs =createButton('start');
  bEs.position(newwidth+200,newheight)
  bEs.mousePressed(function(){allbuttonsemit(6)})
  bEsy =createButton('sync');
  bEsy.position(newwidth+200,newheight+50)
  bEsy.mousePressed(SYNC)
}

//start factory

function entitiesDistanceCheck(inEntity){
  for(let i = 0; i < entities.length; i++){
    let curEntity = entities[i]
    if(curEntity.team.teamname == teams[myTeamNum].teamname){
    if(dist(inEntity.x,inEntity.y,curEntity.x,curEntity.y) < 3){
      return(true)
    }}


  }
  return(false)
}


function tilesDistanceCheck(j){
  for(let i = 0; i<entities.length;i++){
    let curEntity = entities[i]
    if(curEntity.team.teamname == teams[myTeamNum].teamname){
      if(dist(tiles[j].x,tiles[j].y,curEntity.x,curEntity.y) < 5){
        return(true)
      }
    }
  }

  return(false)
}




//update frame
function update(fupdate,ex,ey){
    TT = teams[turn]
    background(40);
    //draw tiles
    fill("#AFAFFF")
    text("turn:"+str(turns),newwidth + 10, 20)
    text("state:"+TT.state,newwidth + 10, 40)
    text("money:"+TT.money+"g",newwidth + 10, 60)
  text("cur:"+currentlyDoing,newwidth+10,80)



    for(let i = 0; i < tiles.length; i++){
      if(tilesDistanceCheck(i) == true || TT.state == "start"){
      tiles[i].draw()}else {tiles[i].darkdraw()}
    } 



    if(inbox(ex,ey,0,0,newwidth-1,newheight-1)){
      prevSelectedArea = mousetotile(ex,ey)
      thisSelectedArea = mousetotile(ex,ey)
      thisSelectedEntity = checkMouseEntities2(thisSelectedArea)
    } else {
      thisSelectedEntity = null
      thisSelectedArea = null
    }
  try{
    let tempTile = tiles[prevSelectedArea]
    if(tempTile.light == 1 || TT.state == "start"){
      tempTile.hidraw()
    }}catch (error) {
  console.error(error);
    console.log(prevSelectedArea)
    }
    
    //ifbuild
      temp = tiletopos(prevSelectedArea)
    //build units
    if(fupdate == "soldier" && thisSelectedArea != null && dist(temp[0],temp[1],selectedBuilding.x,selectedBuilding.y) < 2.1 && cme == "no entity"){
      entities.push(new soldier(temp[0],temp[1],TT))
      currentlyDoing = 1
      TT.state = "game"
    }
      if(fupdate == "architect" && thisSelectedArea != null && dist(temp[0],temp[1],selectedBuilding.x,selectedBuilding.y) < 2.1 && cme == "no entity"){
      entities.push(new architect(temp[0],temp[1],TT))
      currentlyDoing = 1
      TT.state = "game"
    } 
        if(fupdate == "factory" && thisSelectedArea != null && dist(temp[0],temp[1],selectedBuilding.x,selectedBuilding.y) < 1.1 && cme == "no entity"){
      entities.push(new factory(temp[0],temp[1],TT))
      currentlyDoing = 1
      TT.state = "game"
    }
          if(fupdate == "tank" && thisSelectedArea != null && dist(temp[0],temp[1],selectedBuilding.x,selectedBuilding.y) < 1.1 && cme == "no entity"){
      entities.push(new tank(temp[0],temp[1],TT))
      currentlyDoing = 1
      TT.state = "game"
    }
  if(fupdate == "mine" && thisSelectedArea != null && dist(temp[0],temp[1],selectedBuilding.x,selectedBuilding.y) < 1.1 && cme == "no entity" && tiles[temp[0]+temp[1]*newwidth/tsize].name == "mountain"){
      entities.push(new mine(temp[0],temp[1],TT))
      currentlyDoing = 1
      TT.state = "game"
    }
  
  if(thisSelectedEntity != "no entity" && thisSelectedEntity != null){
    // console.log(thisSelectedEntity)
          if(currentlyDoing != 1 &&fupdate == "shooting" && thisSelectedArea != null && dist(temp[0],temp[1],selectedBuilding.x,selectedBuilding.y) <= selectedBuilding.shootdistance && thisSelectedEntity != "no entity" && entities[thisSelectedEntity].team.teamname != TT.teamname && entities[cme].moveTurns > 0){
      thismany = int(shootingSeed*(entities[cme].dmg[1]-entities[cme].dmg[0]))+entities[cme].dmg[0]
      console.log("dealt " +thismany+" hp!")
            entities[thisSelectedEntity].hp -= thismany
            entities[cme].moveTurns -= 2
      currentlyDoing = 1
      TT.state = "game"
    }}
  
  
  
  
    
    //draw entities
    // console.log(typeof(myTeamNum) == "undefined")
    if(typeof(myTeamNum) != "undefined"){
    for(let i = entities.length - 1; i >= 0; i--){
      entities[i].update()
      if(entities[i].hp <= 0){
        entities.splice(i,1)
      } else {
        if(entities[i].team.teamname == teams[myTeamNum].teamname){entities[i].draw()}
          else if(entitiesDistanceCheck(entities[i]) == true){
            entities[i].draw()
          }



      




    }
    }
}
    
    //check mouse entities
    cme = checkMouseEntities()
    if(cme == "no entity" && TT.state != "start" && currentlyDoing == 1 && TT.state != "moving"){
      selectedBuilding = 0
      TT.state = "game"
      // console.log("beep")
    } else if(TT.state == "moving" && cme == "no entity"){
      temp = tiletopos(thisSelectedArea)
      // console.log(dist(temp[0],temp[1],selectedBuilding.x,selectedBuilding.y))
      if(dist(temp[0],temp[1],selectedBuilding.x,selectedBuilding.y)<1.1&&selectedBuilding.moveTurns > 0){
        selectedBuilding.moveTurns -= 1
                selectedBuilding.x = temp[0]
        selectedBuilding.y = temp[1]
        selectedBuilding.update()
        if(tiles[selectedBuilding.posnum].name == "mountain" || tiles[selectedBuilding.posnum].name == "snowy" || tiles[selectedBuilding.posnum].name == "shallow water"){
           selectedBuilding.moveTurns -= 1
           }

      } else if(selectedBuilding.moveTurns <= 0){
        TT.state = "game"
        currentlyDoing = 1
        selectedBuilding.moveTurns = 0
      }
      
    }
  }

clickPing = 0

function draw() {
  if(started == true){
    if(seeded == true){
    console.log("game loaded! here is the basic instructions manual because the gui of this game is AWESOME and totally not lacking!")
    console.log("when you first start, you can only use the button action 1. this places down a factory at the block you selected.")
    console.log("selected a block by clicking it and then click action 1 to place down your factory!")
    console.log("your factory has 300 health points and you lose the game if all of your factories are destroyed.")
    console.log("after you've put down your factory, you could spend money to buy units. click your factory.")
    console.log("the unit's price is listed on the right and use the corresponding actions to place down the building.")
    console.log("after you've chosen which building you want to put down via the action buttons, choose a tile 1-2 blocks next to your factory to build the unit!")
    console.log("heavier units can only be built in a 1 block radius.")
    console.log("\n the soldier unit has 100hp, can move 3 tiles after being spawned. then 5 tiles after every turn. it can shoot in a 2 tile radius.")
    console.log("the tank can move 3 tiles every turn. it has 300hp and deals 3 times more damage as the soldier")
    console.log("moving through mountains or water costs 2 turns. shooting costs 2 turns as well. any action will be complete if you have more than 0 turns.")
    console.log("the architect can build new factories and mines. mines can only be placed down at mountain tiles.")
    console.log("factories generate 50 gold per turn, mines generate 30 per turn.")
    seeded = 0
    update(0)
  }
  fill(0)
  rect(newwidth,newheight-40,newwidth+200,newheight)
  fill(clickPing*12.5,keywait*10,keywait*10)
  rect(newwidth,newheight-37,newwidth+keywait*10,newheight-3)
  if(keywait > 0){
    keywait -= 1
  }
  if(clickPing>0){
    clickPing -= 1
  }
  if(keywait <= 0){
  if(keyIsDown(65)){socket.emit('toserkd',65);keywait = 20}
  if(keyIsDown(87)){socket.emit('toserkd',87);keywait = 20}
  if(keyIsDown(68)){socket.emit('toserkd',68);keywait = 20}
  if(keyIsDown(83)){socket.emit('toserkd',83);keywait = 20}}
  if(mouseIsPressed){
    clickPing = 20
    tempx = mouseX
    tempy = mouseY
    data = [currentlyDoing,tempx,tempy]
    socket.emit('toServerClick',data)
    // update(currentlyDoing,mouseX,mouseY)
    // console.log(mousetotile())
// console.log(tiletopos(mousetotile()))
}}}



  function toClientUpdate(data){
    console.log("1")
    update(data[0],data[1],data[2])
  }


  function kd65(){
  if( selectedBuilding.team.teamname == TT.teamname && selectedBuilding.moveTurns > 0 && gettile(selectedBuilding.x-1,selectedBuilding.y)[1]==false){
    selectedBuilding.x-=1
    selectedBuilding.moveTurns-=1
    selectedBuilding.update()
    if(tiles[selectedBuilding.posnum].name == "mountain" || tiles[selectedBuilding.posnum].name == "snowy" || tiles[selectedBuilding.posnum].name == "shallow water"){
           selectedBuilding.moveTurns -= 1
           }
    update(currentlyDoing,selectedBuilding.x*tsize+2,selectedBuilding.y*tsize+2)
     keywait += 20
  }}
   
   function kd68(){
    if(selectedBuilding.team.teamname == TT.teamname && selectedBuilding.moveTurns > 0 && gettile(selectedBuilding.x+1,selectedBuilding.y)[1]==false){
    selectedBuilding.x+=1
    selectedBuilding.moveTurns-=1
    selectedBuilding.update()
    if(tiles[selectedBuilding.posnum].name == "mountain" || tiles[selectedBuilding.posnum].name == "snowy" || tiles[selectedBuilding.posnum].name == "shallow water"){
           selectedBuilding.moveTurns -= 1
           }
    update(currentlyDoing,selectedBuilding.x*tsize+2,selectedBuilding.y*tsize+2)
     keywait += 20
  }}
   
   function kd87(){
    if( selectedBuilding.team.teamname == TT.teamname && selectedBuilding.moveTurns > 0 && gettile(selectedBuilding.x,selectedBuilding.y-1)[1]==false){
    selectedBuilding.y-=1
    selectedBuilding.moveTurns-=1
    selectedBuilding.update()
    if(tiles[selectedBuilding.posnum].name == "mountain" || tiles[selectedBuilding.posnum].name == "snowy" || tiles[selectedBuilding.posnum].name == "shallow water"){
           selectedBuilding.moveTurns -= 1
           }
    update(currentlyDoing,selectedBuilding.x*tsize+2,selectedBuilding.y*tsize+2)
     keywait += 20
  }
   }
   function kd83(){
    // console.log(selectedBuilding.x,selectedBuilding.y+1)
    if( selectedBuilding.team.teamname == TT.teamname && selectedBuilding.moveTurns > 0 && gettile(selectedBuilding.x,selectedBuilding.y+1)[1]==false){
    selectedBuilding.y+=1
    selectedBuilding.moveTurns-=1
    selectedBuilding.update()
    if(tiles[selectedBuilding.posnum].name == "mountain" || tiles[selectedBuilding.posnum].name == "snowy" || tiles[selectedBuilding.posnum].name == "shallow water"){
           selectedBuilding.moveTurns -= 1
           }
    update(currentlyDoing,selectedBuilding.x*tsize+2,selectedBuilding.y*tsize+2)
     keywait += 20
  }}
   
   
 

// function cloned(data) {
//   ellipse(data.p.x,data.p.y,data.p.size+300)
//   console.log(data.p.size)
// }


function cloned(data) {
  data_client = data
}

function allbuttonsemit(toserver){
  socket.emit('action',toserver)
  console.log('emiting '+toserver+' to server')
}

function allbuttons(toclient){
  if(toclient[0] == 1){
    action1()
  }else if(toclient[0] == 2){
    action2(toclient[1])
  } else if(toclient[0] == 3){
    action3()
  } else if(toclient[0] == 4){
    endTurn()
  } else if(toclient[0] == 5){
    exit()
  } else if(toclient[0] == 6){
    started = true
  }
}





function deletePlayer(deletePlayer_event_data){
  // debugger
  // console.log(deletePlayer_event_data)
  // for (let i = enemies.length - 1; i >= 0; i--) {
  //   if (enemies[i].id == deletePlayer_event_data) {
  //     enemies.splice(i,1)
  //     playerLeftArray.push(deletePlayer_event_data)
  //   }
  // }
}