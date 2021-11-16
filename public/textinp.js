
var FINALOUT = ""
var LTDSTATE = "walk"
var ltdCurrentMob = "none"
function textInput(){
  let inp = keyinput.value()
  keyinput.value('')
  let oup = INPout
  let sinp = inp.split(' ')


  if(sinp[0] == "g8"){


    if(inp == "g8 hi"){
      oup.html("hello!")

    }
  } else if(sinp[0] == "ltd"){


    if(inp == "ltd start"){
      if(typeof(ltdp) == "undefined"){
        ltdp = new ltdPlayer()
        FNOUTadd("created new ltd player!")
      } else {FNOUTadd("you already have a player created.")}
    }

    if(typeof(ltdp) != "undefined"){
     


      if(inp == "ltd move" && LTDSTATE == "walk"){
        ltdMove()
      }

      if(LTDSTATE == "mob choice"){
        if(choiceExclude("fight")){
          FNOUTadd("you're fighting new mob!")
          LTDSTATE = "fighting"
          fight(ltdCurrentMob)
        } else {
          FNOUTadd("you ran away")
          ltdCurrentMob = "none"
        }
      }



    }


    oup.html(FINALOUT)
    FINALOUT = ""
  }

}

function choiceExclude(choice){
  if(sinp[1] == choice){return(true)}
  return(false)
}


function FNOUTadd(outadd){
  FINALOUT += outadd + "<br>"
}


function chanceMet(i){
  if(Math.random() > i){return(true)}
  return(false)
}

function intrange(i,j){
  return(int(i + Math.random()*(j-i)))
}

class ltdPlayer {
  constructor(){
    this.floor = 1
    this.level = [1,0]
    this.health = 50
    this.stats = [1,1,1,1]
    this.armor = new ltdArmor(10,0.5,1,0.9)
    this.sword = new ltdSword("new")
    //agility, strength, defense, dodging

    this.inventory = []
  }
}


class mob1 {
  constructor(){
    this.level = ltdp.floor
    this.health = intrange(20,35)
    this.armor = new ltdArmor(10,0.5,1,0.9)
    this.sword = new ltdSword("new")
    //agility, strength, defense, dodging

    this.inventory = []
  }
}

class ltdSword{
  constructor(in1){
    if(in1 == "new"){
      this.damage = [10,15]
      this.durability = 20
    }
  }



  swing(){
    if(this.durability > 0){
      this.durability -= 1
      return(intrange(this.damage[0],this.damage[1]))
    } else {return("b")}
  }

}

class ltdArmor{
  constructor(pts,blp,abs,pen){
      this.armorPoints = pts
      this.blockPercentage = blp
      this.absorptionMultiplier = abs
      this.attributes = []
      this.penetrationChance = pen


  }


}









var ltdturn = 0






function createMob(){
  let mob = new mob1()
  return(mob)
}






function ltdMove(){

  let gloRand = Math.random()*1000

  if(gloRand > 800){
    ltdCurrentMob = createMob()
    LTDSTATE = "mob choice"
  }

}



function fight(inmob){

}


