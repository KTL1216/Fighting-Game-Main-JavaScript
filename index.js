function toggleDiv() {
  console.log("toggle")
  if(document.getElementById("selection").style.display == 'inline-block')
  {
  document.getElementById("selection").style.display = 'none';
  document.getElementById("game").style.display = 'inline-block';
  }
 
  else
  {  
  document.getElementById("game").style.display = 'none';
  document.getElementById("selection").style.display = 'inline-block'
  }
}

let tristanButton = document.getElementById("tristan-button");
let jessicaButton = document.getElementById("jessica-button");
let davidButton = document.getElementById("david-button");
let danielButton = document.getElementById("daniel-button");
let michaelButton = document.getElementById("michael-button");
let benButton = document.getElementById("ben-button");

const buttonList = [tristanButton, jessicaButton, davidButton, danielButton, michaelButton, benButton]

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background.png'
})

const shop = new Sprite({
  position: {
    x: 600,
    y: 128
  },
  imageSrc: './img/shop.png',
  scale: 2.75,
  framesMax: 6
})

const tristan = new Fighter({
  id: 1,
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/tristan/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idle: {
      imageSrc: './img/tristan/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/tristan/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/tristan/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/tristan/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/tristan/Attack1.png',
      framesMax: 6
    },
    takeHit: {
      imageSrc: './img/tristan/Take Hit - white silhouette.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/tristan/Death.png',
      framesMax: 6
    },
    skill: {
      imageSrc: './img/tristan/Attack2.png',
      framesMax: 4
    }
  },
  health: 100,
  damageTaken: 10,
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 150,
    height: 50
  }
})

const kentonEnemy = new Fighter({
  id: 2,
  position: {
    x: 950,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/kenton-enemy/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
      imageSrc: './img/kenton-enemy/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/kenton-enemy/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/kenton-enemy/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/kenton-enemy/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/kenton-enemy/Attack1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/kenton-enemy/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/kenton-enemy/Death.png',
      framesMax: 7
    },
    skill: {
      imageSrc: './img/kenton-enemy/Attack2.png',
      framesMax: 3
    }
  },
  health: 100,
  damageTaken: 10,
  attackBox: {
    offset: {
      x: -170,
      y: 35
    },
    width: 130,
    height: 65
  }
})

const jessica = new Fighter({
  id: 3,
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/jessica/Idle.png',
  framesMax: 8,
  scale: 3.5,
  offset: {
    x: 120,
    y: 80
  },
  sprites: {
    idle: {
      imageSrc: './img/jessica/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/jessica/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/jessica/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/jessica/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/jessica/Attack1.png',
      framesMax: 3
    },
    takeHit: {
      imageSrc: './img/jessica/Take Hit.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/jessica/Death.png',
      framesMax: 4
    },
    skill: {
      imageSrc: './img/jessica/Attack2.png',
      framesMax: 3
    }
  },
  health: 100,
  damageTaken: 10,
  attackBox: {
    offset: {
      x: 80,
      y: 50
    },
    width: 110,
    height: 50
  }
})

const david = new Fighter({
  id: 4,
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/david/Idle.png',
  framesMax: 10,
  scale: 3,
  offset: {
    x: 200,
    y: 145
  },
  sprites: {
    idle: {
      imageSrc: './img/david/Idle.png',
      framesMax: 10
    },
    run: {
      imageSrc: './img/david/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/david/Jump.png',
      framesMax: 3
    },
    fall: {
      imageSrc: './img/david/Fall.png',
      framesMax: 3
    },
    attack1: {
      imageSrc: './img/david/Attack1.png',
      framesMax: 7
    },
    takeHit: {
      imageSrc: './img/david/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/david/Death.png',
      framesMax: 7
    },
    skill: {
      imageSrc: './img/david/Attack3.png',
      framesMax: 8
    }
  },
  health: 100,
  damageTaken: 10,
  attackBox: {
    offset: {
      x: 120,
      y: 65
    },
    width: 120,
    height: 50
  }
})

const daniel = new Fighter({
  id: 5,
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/daniel/Idle.png',
  framesMax: 8,
  scale: 3,
  offset: {
    x: 200,
    y: 145
  },
  sprites: {
    idle: {
      imageSrc: './img/daniel/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/daniel/move.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/daniel/jump.png',
      framesMax: 3
    },
    fall: {
      imageSrc: './img/daniel/fall.png',
      framesMax: 3
    },
    attack1: {
      imageSrc: './img/daniel/Attack.png',
      framesMax: 8
    },
    takeHit: {
      imageSrc: './img/daniel/Take Hit.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/daniel/Death.png',
      framesMax: 5
    },
    skill: {
      imageSrc: './img/daniel/Attack.png',
      framesMax: 8
    }
  },
  health: 100,
  damageTaken: 10,
  attackBox: {
    offset: {
      x: 150,
      y: 65
    },
    width: 90,
    height: 50
  }
})

const michael = new Fighter({
  id: 6,
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/michael/Idle.png',
  framesMax: 8,
  scale: 3.5,
  offset: {
    x: 120,
    y: 83
  },
  sprites: {
    idle: {
      imageSrc: './img/michael/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/michael/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/michael/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/michael/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/michael/Attack2.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/michael/Take Hit.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/michael/Death.png',
      framesMax: 4
    },
    skill: {
      imageSrc: './img/michael/Attack1.png',
      framesMax: 4
    }
  },
  health: 100,
  damageTaken: 10,
  attackBox: {
    offset: {
      x: 70,
      y: 50
    },
    width: 110,
    height: 50
  }
})

const ben = new Fighter({
  id: 7,
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/ben/Idle.png',
  framesMax: 11,
  scale: 1.4,
  offset: {
    x: 140,
    y: 50
  },
  sprites: {
    idle: {
      imageSrc: './img/ben/Idle.png',
      framesMax: 6
    },
    run: {
      imageSrc: './img/ben/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/ben/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/ben/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/ben/Attack2.png',
      framesMax: 7
    },
    takeHit: {
      imageSrc: './img/ben/Hit.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/ben/Death.png',
      framesMax: 7
    },
    skill: {
      imageSrc: './img/ben/Attack1.png',
      framesMax: 8
    }
  },
  health: 100,
  damageTaken: 10,
  attackBox: {
    offset: {
      x: 75,
      y: 65
    },
    width: 165,
    height: 50
  }
})

const tiger = new Fighter({
  id: 8,
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/tiger/Idle.png',
  framesMax: 11,
  scale: 3.5,
  offset: {
    x: 120,
    y: 83
  },
  sprites: {
    idle: {
      imageSrc: './img/tiger/Idle.png',
      framesMax: 11
    },
    run: {
      imageSrc: './img/tiger/Run.png',
      framesMax: 5
    },
    jump: {
      imageSrc: './img/tiger/Jump.png',
      framesMax: 3
    },
    fall: {
      imageSrc: './img/tiger/Fall.png',
      framesMax: 3
    },
    attack1: {
      imageSrc: './img/tiger/Attack1.png',
      framesMax: 5
    },
    takeHit: {
      imageSrc: './img/tiger/Take Hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/tiger/Death.png',
      framesMax: 5
    },
    skill: {
      imageSrc: './img/tiger/Attack2.png',
      framesMax: 7
    }
  },
  health: 100,
  damageTaken: 10,
  attackBox: {
    offset: {
      x: 70,
      y: 70
    },
    width: 110,
    height: 50
  }
})

var player = tristan

tristanButton.addEventListener("click", function(){
  player = tristan
  tristanButton.textContent = "SELECTED"
  buttonList.forEach(function (item, index) {
    item.setAttribute('disabled', 'disabled');
  });
  decideHitFrame()
});

jessicaButton.addEventListener("click", function(){
  player = jessica
  jessicaButton.textContent = "SELECTED"
  buttonList.forEach(function (item, index) {
    item.setAttribute('disabled', 'disabled');
  });
  decideHitFrame()
});

davidButton.addEventListener("click", function(){
  player = david
  davidButton.textContent = "SELECTED"
  buttonList.forEach(function (item, index) {
    item.setAttribute('disabled', 'disabled');
  });
  decideHitFrame()
});

danielButton.addEventListener("click", function(){
  player = daniel
  danielButton.textContent = "SELECTED"
  buttonList.forEach(function (item, index) {
    item.setAttribute('disabled', 'disabled');
  });
  decideHitFrame()
})

danielButton.addEventListener("click", function(){
  player = daniel
  danielButton.textContent = "SELECTED"
  buttonList.forEach(function (item, index) {
    item.setAttribute('disabled', 'disabled');
  });
  decideHitFrame()
})

michaelButton.addEventListener("click", function(){
  player = michael
  michaelButton.textContent = "SELECTED"
  buttonList.forEach(function (item, index) {
    item.setAttribute('disabled', 'disabled');
  });
  decideHitFrame()
})

benButton.addEventListener("click", function(){
  player = ben
  benButton.textContent = "SELECTED"
  buttonList.forEach(function (item, index) {
    item.setAttribute('disabled', 'disabled');
  });
  decideHitFrame()
})

var enemy = kentonEnemy

//deciding attacking frame
var playerHitFrame
var enemyHitFrame

function decideHitFrame() {
  console.log(player.id)
  if (player.id == 1) {
    playerHitFrame = 4
  } else if (player.id == 2) {
    playerHitFrame = 2
  } else if (player.id == 3) {
    playerHitFrame = 1
  } else if (player.id == 4) {
    playerHitFrame = 5
  } else if (player.id == 5) {
    playerHitFrame = 3
  } else if (player.id == 6) {
    playerHitFrame = 2
  } else if (player.id == 7) {
    playerHitFrame = 5
  } else if (player.id == 8) {
    playerHitFrame = 3
  }
  if (enemy.id == 2) {
    enemyHitFrame = 2
  } 
}

console.log(player)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  l: {
    pressed: false
  },
  j: {
    pressed: false
  }
}

window.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    decreaseTimer()
  }
})


function animate() {


  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  shop.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  // player movement

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  // jumping
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

  // Enemy movement
  if (keys.j.pressed && enemy.lastKey === 'j') {
    enemy.velocity.x = -5
    enemy.switchSprite('run')
  } else if (keys.l.pressed && enemy.lastKey === 'l') {
    enemy.velocity.x = 5
    enemy.switchSprite('run')
  } else {
    enemy.switchSprite('idle')
  }

  // jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
  }

  // detect for collision & enemy gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking &&
    player.framesCurrent === playerHitFrame
  ) {
    enemy.takeHit()
    player.isAttacking = false

    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })

    
    if (player.id == 1) {
      player.attackBox.width = 140;
      player.damageTaken = 10;
      enemy.damageTaken = 10;
    }

    if (player.id == 4) {
      player.attackBox.width = 150;
      enemy.damageTaken = 10;
      playerHitFrame = 5
    }

    if (player.id == 8) {
      player.attackBox.width = 110;
      enemy.damageTaken = 10;
    }

    if (player.id == 6) {
      enemy.damageTaken = 10;
    }
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === playerHitFrame) {
    player.isAttacking = false

    if (player.id == 1) {
      player.attackBox.width = 140;
      player.damageTaken = 10;
      enemy.damageTaken = 10;
    }
    if (player.id == 4) {
      player.attackBox.width = 150;
      enemy.damageTaken = 15;
      playerHitFrame = 5
    }
    if (player.id == 8) {
      player.attackBox.width = 110;
      enemy.damageTaken = 10;
    }
    if (player.id == 6) {
      enemy.damageTaken = 10;
    }
  }

  // this is where our player gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === enemyHitFrame
  ) {
    player.takeHit()
    enemy.isAttacking = false

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
    
    player.damageTaken = 10
  }

  // if enemy misses
  if (enemy.isAttacking && enemy.framesCurrent === enemyHitFrame) {
    enemy.isAttacking = false
    
    player.damageTaken = 10
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
}

animate()

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
        player.velocity.y = -20
        break
      case 's':
        if (player.id == 4) {
          enemy.damageTaken = 15;
        }
        if (player.id == 5) {
          enemy.damageTaken = 25;
        }
        if (player.id == 7) {
          enemy.damageTaken = 15;
        }
        player.attack()
        break
      case 'q':
        if (player.id == 1) {
          enemy.damageTaken = 20;
        }
        if (player.id == 4) {
          playerHitFrame = 6
          enemy.damageTaken = 25;
        }
        
        if (player.id == 8) {
          enemy.damageTaken = 20;
        }
        player.skill()
        if (player.id == 7) {
          player.id = tiger.id
          player.scale = tiger.scale
          player.imageSrc = tiger.imageSrc;
          player.sprites = tiger.sprites;
          player.attackBox = tiger.attackBox
          player.offset.y += 16
          decideHitFrame()
        }
        break
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
      case 'l':
        keys.l.pressed = true
        enemy.lastKey = 'l'
        break
      case 'j':
        keys.j.pressed = true
        enemy.lastKey = 'j'
        break
      case 'i':
        enemy.velocity.y = -20
        break
      case 'k':
        enemy.attack()
        break
      case 'u':
        player.damageTaken = 27
        enemy.skill()
        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }

  // enemy keys
  switch (event.key) {
    case 'l':
      keys.l.pressed = false
      break
    case 'j':
      keys.j.pressed = false
      break
  }
})