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
    width: 140,
    height: 50
  }
})

const kentonEnemy = new Fighter({
  id: 2,
  position: {
    x: 900,
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
      y: 50
    },
    width: 130,
    height: 50
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
    x: 100,
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
      imageSrc: './img/jessica/Take hit.png',
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
      x: 120,
      y: 50
    },
    width: 95,
    height: 50
  }
})

const player = jessica
const enemy = kentonEnemy

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

decreaseTimer()

function animate() {
  //deciding attacking speed
  var playerHitFrame
  if (player.id == 1) {
    playerHitFrame = 4
  } else if (player.id == 2) {
    playerHitFrame = 2
  } else if (player.id == 3) {
    playerHitFrame = 1
  }
  var enemyHitFrame
  if (enemy.id == 1) {
    enemyHitFrame = 4
  } else if (enemy.id == 2) {
    enemyHitFrame = 2
  } else if (enemy.id == 3) {
    enemyHitFrame = 1
  }

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
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === playerHitFrame) {
    player.isAttacking = false

    if (player.id == 1) {
      player.attackBox.width = 140;
      player.damageTaken = 10;
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
        player.attack()
        break
      case 'q':
        if (player.id == 1) {
          enemy.damageTaken = 20;
        }
        player.skill()
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
        player.damageTaken = 20
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
