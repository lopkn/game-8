
building_costs = [["mine",200],["architect",250],["factory",400],["soldier",100],["tank",250],["medic",250],["trap",50]]







function abActions(){
  let tempc = checkMouseEntities()
  if(currentlyDoing == 1 && TT.state != "start" && tempc != "no entity" && entities[tempc].team.teamname == TT.teamname){
  if(selectedBuilding.name == "factory"){
   l.html(" act1: hire soldier<br> act2: hire architect<br> act3: buy tank<br> act4: hire medic<br> click a tile near the factory after you've bought the unit to build it") 
  } else if(selectedBuilding.name == "architect"){
   l.html(" act1: move<br> act2: build factory<br> act3: build mine(only on mountains)<br> act4: build trap<br> click a tile near the architect after you've bought the unit to build it") 
  } else if(selectedBuilding.name == "soldier"){
    l.html(" act1: move<br> act2: aim & shoot<br> act3: build/destroy road tiles<br> act4: build trap(more expensive than architect)") 
  } else if(selectedBuilding.name == "tank"){
    l.html(" act1: move<br> act2: aim & shoot") 
  } else if(selectedBuilding.name == "medic"){
    l.html(" act1: move<br> act2: aim & heal")
  } else if(selectedBuilding.name == "mine"){
    l.html(" your mine literally sits there and cant do anything")
  } else if(selectedBuilding.name == "trap"){
    l.html(" what, you want to make the trap move and shoot?")
  }}
  else if(currentlyDoing == "shooting"){
    l.html(" click something in range to shoot! press the exit button to exit shooting mode")
  } else if(currentlyDoing == "moving"){
    l.html(" you're trying to move your unit. click a block directly adjacent to the unit to move.<br> if you have a keyboard, selecting the unit and pressing WASD also moves the unit!<br> make sure to press the exit button after you're done moving!")
  } else if(currentlyDoing == "soldier"){
    l.html(" you're trying to make a soldier. click a tile in a 2 block radius of your factory to build.")
  } else if(currentlyDoing == "mine"){
    l.html(" you're trying to build a mine. click a tile in a 1 block radius of your architect to build.<br> (the tile has to be a mountain tile)")
  } else if(currentlyDoing == "tank"){
    l.html(" you're trying to build a tank. click a tile in a 1 block radius of your factory to build.")
  } else if(currentlyDoing == "medic"){
    l.html(" you're trying to make a medic. click a tile in a 2 block radius of your factory to build.")
  } else if(currentlyDoing == "trap"){
    l.html(" you're trying to set a trap. click a tile in a 2 block radius of your unit to build.")
  } else if(currentlyDoing == "architect"){
    l.html(" you're trying to make an architect. click a tile in a 2 block radius of your factory to build.")
  }

  else if(TT.state == "start"){
    l.html(" act1: place down a factory at selected tile")
  }


  else{
    l.html(" really dosen't look like you're doing anything. please be considerate and think faster<br> if you have ran out of things to do, press the end turn button.")
  }


}

















function findBuildingDetails(j){
  for(let i = 0; i < building_costs.length; i++){
    if(building_costs[i][0] == j){
      return(i)
    }
  }
  return(false)
}


function notBuilding(){
  for(let i = 0; i < building_costs.length;i++){
    if(currentlyDoing == building_costs[i][0]){
      return(false)
    }
  }
  return(true)
}

needwaittime = 20

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
cme = "no entity"
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

tilecolors = ['#FF00FF',"#203090",'#2F4FAF','#CFCF30','#3FAF2F','#3F8F2F','#306F20','#5F5F5F','#FFFFFF']
tilenames = ['error','water','shallow water','sand','grassland','forrest','dense forrest','mountain','snowy mountain']

class tile{
  constructor(id,x,y){
    
    if(id < 27){
      this.id = 1
      this.movedouble = true
    } else if(id < 33){
      this.id = 2
      this.movedouble = true
    } else if (id < 36){
      this.id = 3
    } else if (id < 48){
      this.id = 4
    }else if (id < 53){
      this.id = 5
    } else if (id < 65){
      this.id = 6
    } else if (id < 80){
      this.id = 7
      this.movedouble = true
    } else if (id < 1001){
      this.id = 8
      this.movedouble = true
    }
    this.road = false
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
      if(this.road == true){
        fill(255,255,0,90)
        rect(this.x*tsize,this.y*tsize+tsize/2-3,tsize,6)
      }

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
            if(this.road == true){
        noStroke()
        fill(255,255,0,250)
        rect(this.x*tsize,this.y*tsize+tsize/2-3,tsize,6)
      }
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
      return([first,i])
    }
  }
  return([first,false])
}


function checkMouseEntities(){
  for(let i = 0; i < entities.length; i++){
    if(entities[i].posnum == prevSelectedArea /*&& tiles[prevSelectedArea].light == 1*/){
      entities[i].hidraw()
      return(i)
    }
  }
  return("no entity")
}
function checkMouseEntities2(e){
  for(let i = 0; i < entities.length; i++){
    if(entities[i].posnum == e){
      return(i)
    }
  }
  return("no entity")
}

function checkPosEntities(){
  
}











//buttons

function action1(){


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
    
  }else if(selectedBuilding.name == "soldier" && currentlyDoing == 1){
   let temptile =tiles[selectedBuilding.posnum]
    if(temptile.road == false){
      if(TT.money >= 150){
        TT.money -= 150
        temptile.road = true
      }
    } else {
      temptile.road = false
      TT.money += 75
    }
    
  }


}


function action4(){


  if(selectedBuilding.name == "factory" &&TT.state == "building" && currentlyDoing == 1){
   
    if(TT.money >= 250){
      TT.money -= 250
       currentlyDoing = "medic"
      console.log("making new:medic")
    }
    
  }else if(selectedBuilding.name == "architect" && currentlyDoing == 1){
   
    if(TT.money >= 50){
      TT.money -= 50
       currentlyDoing = "trap"
      console.log("building new:trap")
    }
    
  }else if(selectedBuilding.name == "soldier" && currentlyDoing == 1){
   
    if(TT.money >= 100){
      TT.money -= 100
       currentlyDoing = "trap"
      console.log("building new:trap")
    }
    
  }



}

function clientSYNC(syncPacket){
  tempEntities = syncPacket[0]
  // entities = syncPacket[0]
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
    } else if (en.name == "medic"){
      tempEntity = new medic()
    } else if (en.name == "trap"){
      tempEntity = new trap()
    }


      Object.assign(tempEntity,en)
      entities.push(tempEntity)

  }



  teams = syncPacket[1]
  currentlyDoing = syncPacket[2][0]
  TT = syncPacket[2][1]
  turn = syncPacket[3]
   for(let i = 0; i < syncPacket[4].length; i++){
    tiles[syncPacket[4][i]].road = true
  }
  console.log("synced!")
}

function SYNC(){
  entitySync = entities
  teamSync = teams
  stateSync = [currentlyDoing,TT]
  turnSync = turn
  syncPacket = [entitySync,teamSync,stateSync,turnSync,roadTiles()]
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
  } else if (currentlyDoing == "soldier"){
    currentlyDoing = 1
    TT.money += 95
  } else if (currentlyDoing == "trap"){
    currentlyDoing = 1
    TT.money += 45
  } else if (currentlyDoing == "medic"){
    currentlyDoing = 1
    TT.money += 200
  } else if (currentlyDoing == "tank"){
    currentlyDoing = 1
    TT.money += 200
  } else if (currentlyDoing == "architect"){
    currentlyDoing = 1
    TT.money += 100
  } else if (currentlyDoing == "factory"){
    currentlyDoing = 1
    TT.money += 300
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
    if(entities[i].update != "noUpdate"){entities[i].UpdateMoves()}
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
  console.log(e)
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





  createCanvas(880 , 720).position(50,0);

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
  B2 = createButton('ACT 4');
  B2.position(300,newheight);
  B2.mousePressed(function(){allbuttonsemit(4)});


  bEnd =createButton('End Turn');
  bEnd.position(newwidth,newheight)
  bEnd.mousePressed(function(){allbuttonsemit("end")})
  bEx =createButton('Exit');
  bEx.position(newwidth+100,newheight)
  bEx.mousePressed(function(){allbuttonsemit("exit")})
  bEs =createButton('start');
  bEs.position(newwidth+200,newheight)
  bEs.mousePressed(function(){allbuttonsemit("start")})
  bEsy =createButton('sync');
  bEsy.position(newwidth+200,newheight+50)
  bEsy.mousePressed(SYNC)
  bEsy =createButton('save');
  bEsy.position(newwidth+100,newheight+50)
  bEsy.mousePressed(saveToSer); BD = createButton('decoy'); BD.position(2000,1500)

  l = createP("button actions displayed here!\nclick on any act button to join that team, then press start!")
  l.position(50,newheight+50)
  l.style('color','white')
}

//start factory

function LOADER(JSONpacket){
  packet = JSON.parse(JSONpacket)["a"]
  console.log(packet)
  entities = []

  tempEntities = packet[0]
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
    } else if (en.name == "medic"){
      tempEntity = new medic()
    } else if (en.name == "trap"){
      tempEntity = new trap()
    }


      Object.assign(tempEntity,en)
      entities.push(tempEntity)

  }

  teams = packet[1]
  currentlyDoing = packet[2][0]
  TT = packet[2][1]
  turn = packet[3]

  for(let i = 0; i < packet[4].length; i++){
    tiles[packet[4][i]].road = true
  }

  console.log("loaded!")

}

function roadTiles(){
    let allRoadTiles = []
  for(let i = 0; i < tiles.length; i++){
    if(tiles[i].road != false){
      allRoadTiles.push(i)
    }
  }
  return(allRoadTiles)
}

function saveToSer(){
  entitySave = entities
  teamSave = teams
  stateSave = [currentlyDoing,TT]
  turnSave = turn
  

  packet = [entitySave,teamSave,stateSave,turnSave,roadTiles]
  socket.emit('toSerSave',packet)
}

function entitiesDistanceCheck(inEntity){
  for(let i = 0; i < entities.length; i++){
    let curEntity = entities[i]
    if(curEntity.team.teamname == teams[myTeamNum].teamname){
    if(dist(inEntity.x,inEntity.y,curEntity.x,curEntity.y) < 4 && curEntity.name != "trap"){
      return(true)
    }}


  }
  return(false)
}


function tilesDistanceCheck(j){
  for(let i = 0; i<entities.length;i++){
    let curEntity = entities[i]
    if(curEntity.team.teamname == teams[myTeamNum].teamname){
      if(dist(tiles[j].x,tiles[j].y,curEntity.x,curEntity.y) < curEntity.sight){
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
      if(fupdate == "medic" && thisSelectedArea != null && dist(temp[0],temp[1],selectedBuilding.x,selectedBuilding.y) < 2.1 && cme == "no entity" ){
      entities.push(new medic(temp[0],temp[1],TT))
      currentlyDoing = 1
      TT.state = "game"
    }
    if(fupdate == "trap" && thisSelectedArea != null && dist(temp[0],temp[1],selectedBuilding.x,selectedBuilding.y) < 2.1 && cme == "no entity" ){
      entities.push(new trap(temp[0],temp[1],TT))
      currentlyDoing = 1
      TT.state = "game"
    }

  if(cme != "no entity"){
  if(thisSelectedEntity != "no entity" && thisSelectedEntity != null){
    // console.log(thisSelectedEntity)
          if(currentlyDoing != 1 &&fupdate == "shooting" && thisSelectedArea != null && dist(temp[0],temp[1],selectedBuilding.x,selectedBuilding.y) <= selectedBuilding.shootdistance && thisSelectedEntity != "no entity" && entities[cme].name != "medic" && entities[thisSelectedEntity].team.teamname != TT.teamname && entities[cme].moveTurns > 0 || currentlyDoing != 1 &&fupdate == "shooting" && thisSelectedArea != null && dist(temp[0],temp[1],selectedBuilding.x,selectedBuilding.y) <= selectedBuilding.shootdistance && thisSelectedEntity != "no entity" && entities[cme].name == "medic" && entities[thisSelectedEntity].hp < 150 && entities[thisSelectedEntity].team.teamname == TT.teamname && entities[cme].moveTurns > 0){
      thismany = int(shootingSeed*(entities[cme].dmg[1]-entities[cme].dmg[0]))+entities[cme].dmg[0]
      if(thismany < 0){console.log("healt " +(-thismany)+" hp!")}else{
      console.log("dealt " +thismany+" hp!")}
            entities[thisSelectedEntity].hp -= thismany
            TT.money += int(thismany/2)
            entities[cme].moveTurns -= 2
      currentlyDoing = 1
      TT.state = "game"
    }

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
          else if(entities[i].name != "trap" &&entitiesDistanceCheck(entities[i]) == true){
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
    } else if(TT.state == "moving" &&( cme == "no entity" || entities[cme].name == "trap") ){
      temp = tiletopos(thisSelectedArea)

      if(dist(temp[0],temp[1],selectedBuilding.x,selectedBuilding.y)<1.1&&selectedBuilding.moveTurns > 0){
        if(tiles[selectedBuilding.posnum].road == false){
        selectedBuilding.moveTurns -= 1}
        
        selectedBuilding.x = temp[0]
        selectedBuilding.y = temp[1]
        selectedBuilding.update()
        if(tiles[selectedBuilding.posnum].movedouble == true){
           selectedBuilding.moveTurns -= 1
           }

      } else if(selectedBuilding.moveTurns <= 0){
        TT.state = "game"
        currentlyDoing = 1
        selectedBuilding.moveTurns = 0
      }
      
    }

  if(turn == myTeamNum){
    abActions()
  } else {
    l.html("wait for the others to finish thier moves")
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
  if(keyIsDown(65)){socket.emit('toserkd',65);keywait = needwaittime}
  if(keyIsDown(87)){socket.emit('toserkd',87);keywait = needwaittime}
  if(keyIsDown(68)){socket.emit('toserkd',68);keywait = needwaittime}
  if(keyIsDown(83)){socket.emit('toserkd',83);keywait = needwaittime}}
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
  if( selectedBuilding.team.teamname == TT.teamname && selectedBuilding.moveTurns > 0 && (gettile(selectedBuilding.x-1,selectedBuilding.y)[1]===false||entities[gettile(selectedBuilding.x-1,selectedBuilding.y)[1]].name == "trap")) {
    selectedBuilding.x-=1
            if(tiles[selectedBuilding.posnum].road == false){
        selectedBuilding.moveTurns -= 1} 
    selectedBuilding.update()
    if(tiles[selectedBuilding.posnum].movedouble == true){
           selectedBuilding.moveTurns -= 1
           }
    update(currentlyDoing,selectedBuilding.x*tsize+2,selectedBuilding.y*tsize+2)
     keywait += 20
  }}
   
   function kd68(){
    if(selectedBuilding.team.teamname == TT.teamname && selectedBuilding.moveTurns > 0 && (gettile(selectedBuilding.x+1,selectedBuilding.y)[1]===false||entities[gettile(selectedBuilding.x+1,selectedBuilding.y)[1]].name == "trap")){
    selectedBuilding.x+=1
            if(tiles[selectedBuilding.posnum].road == false){
        selectedBuilding.moveTurns -= 1}
    selectedBuilding.update()
    if(tiles[selectedBuilding.posnum].movedouble == true){
           selectedBuilding.moveTurns -= 1
           }
    update(currentlyDoing,selectedBuilding.x*tsize+2,selectedBuilding.y*tsize+2)
     keywait += 20
  }}
   
   function kd87(){
    if( selectedBuilding.team.teamname == TT.teamname && selectedBuilding.moveTurns > 0 && (gettile(selectedBuilding.x,selectedBuilding.y-1)[1]===false||entities[gettile(selectedBuilding.x,selectedBuilding.y-1)[1]].name == "trap")){
    selectedBuilding.y-=1
            if(tiles[selectedBuilding.posnum].road == false){
        selectedBuilding.moveTurns -= 1}
    selectedBuilding.update()
    if(tiles[selectedBuilding.posnum].movedouble == true){
           selectedBuilding.moveTurns -= 1
           }
    update(currentlyDoing,selectedBuilding.x*tsize+2,selectedBuilding.y*tsize+2)
     keywait += 20
  }
   }
   function kd83(){
    // console.log(selectedBuilding.x,selectedBuilding.y+1)
    if( selectedBuilding.team.teamname == TT.teamname && selectedBuilding.moveTurns > 0 && (gettile(selectedBuilding.x,selectedBuilding.y+1)[1]===false||entities[gettile(selectedBuilding.x,selectedBuilding.y+1)[1]].name == "trap")){
    selectedBuilding.y+=1
            if(tiles[selectedBuilding.posnum].road == false){
        selectedBuilding.moveTurns -= 1} 
    selectedBuilding.update()
    if(tiles[selectedBuilding.posnum].movedouble == true){
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
  if(started == false && typeof(toserver) == "number"){
    myTeamNum = toserver -1
  } else {
  socket.emit('action',toserver)
  console.log('emiting '+toserver+' to server')}
}

function allbuttons(toclient){
  if(toclient[0] == 1){
    action1()
  }else if(toclient[0] == 2){
    action2(toclient[1])
  } else if(toclient[0] == 3){
    action3()
  } else if(toclient[0] == 4){
    action4()
  } else if(toclient[0] == "end"){
    endTurn()
  } else if(toclient[0] == "exit"){
    exit()
  } else if(toclient[0] == "start"){
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