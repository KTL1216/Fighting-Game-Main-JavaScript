class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 }
  }) {
    this.position = position
    this.width = 50
    this.height = 150
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.framesMax = framesMax
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
    this.offset = offset
  }

  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    )
  }

  animateFrames() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }

  update() {
    this.draw()
    this.animateFrames()
  }
}

class Fighter extends Sprite {
  constructor({
    id,
    position,
    velocity,
    color = 'red',
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    health,
    damageTaken,
    attackBox = { offset: {}, width: undefined, height: undefined }
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset
    })
    this.id = id
    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.lastKey
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height
    }
    this.color = color
    this.isAttacking
    this.health = health
    this.damageTaken = damageTaken;
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
    this.sprites = sprites
    this.dead = false

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }
  }

  update() {
    this.draw()
    if (!this.dead) this.animateFrames()

    // attack boxes
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y

    //draw the attack box
    // c.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // )

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.x < 0) {this.position.x = 0}
    if (this.position.x > 950) {this.position.x = 950}
    if (this.position.y < 0) {this.velocity.y = 0}

    // gravity function
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0
      this.position.y = 330
    } else this.velocity.y += gravity
  }

  attack() {
    this.switchSprite('attack1')
    this.isAttacking = true
  }
  
  pushed() {
    this.switchSprite('idle')
    this.velocity.x = 6
    this.position.x += 160
  }

  backed() {
    this.switchSprite('idle')
    this.velocity.x = 6
    this.position.x -= 160
  }

  launched() {
    this.switchSprite('idle')
    this.position.y -= 160
  }

  skill() {
    if (this.id == 1) {
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) { 
            this.attackBox.width = 280;
            this.switchSprite('skill')
            this.isAttacking = true
            this.damageTaken = 0;
        }
    } else if (this.id == 2) {
        this.switchSprite('skill')
        this.isAttacking = true
    } else if (this.id == 3) {
      this.switchSprite('skill')
      this.position.x += 150
      this.isAttacking = true
    } else if (this.id == 4) {
      this.switchSprite('skill')
      this.attackBox.width = 250;
      this.isAttacking = true
    } else if (this.id == 6) {
      this.switchSprite('skill')
      this.position.y -= 150
      this.isAttacking = true
    } else if (this.id == 7) {
      this.switchSprite('skill')
    } else if (this.id == 8) {
      this.switchSprite('skill')
      this.attackBox.width = 65;
      this.isAttacking = true
    } else if (this.id == 9) {
      this.switchSprite('skill')
      this.attackBox.offset.x = 240;
      this.attackBox.width = 45;
      this.isAttacking = true
    } else if (this.id == 10) {
      this.switchSprite('skill')
      if (this.health < 100) {
        this.health += 5
      }
      this.isAttacking = false
    }
  }

  takeHit() {
    this.health -= this.damageTaken
    if (this.id == 6) {
      this.health += 3
    }

    if (this.health <= 0) {
      this.switchSprite('death')
    } else this.switchSprite('takeHit')
  }

  switchSprite(sprite) {
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1)
        this.dead = true
      return
    }

    if (
        // overriding all other animations with the skill animation
        this.image === this.sprites.skill.image &&
        this.framesCurrent < this.sprites.skill.framesMax - 1
        // overriding all other animations with the attack animation
        || this.image === this.sprites.attack1.image &&
        this.framesCurrent < this.sprites.attack1.framesMax - 1
    )
      return

    // override when fighter gets hit
    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.framesMax - 1
    )
      return

    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          this.framesCurrent = 0
        }
        break
      case 'run':
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image
          this.framesMax = this.sprites.run.framesMax
          this.framesCurrent = 0
        }
        break
      case 'jump':
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image
          this.framesMax = this.sprites.jump.framesMax
          this.framesCurrent = 0
        }
        break

      case 'fall':
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image
          this.framesMax = this.sprites.fall.framesMax
          this.framesCurrent = 0
        }
        break

      case 'attack1':
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image
          this.framesMax = this.sprites.attack1.framesMax
          this.framesCurrent = 0
        }
        break

      case 'takeHit':
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image
          this.framesMax = this.sprites.takeHit.framesMax
          this.framesCurrent = 0
        }
        break

      case 'death':
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image
          this.framesMax = this.sprites.death.framesMax
          this.framesCurrent = 0
        }
        break

      case 'skill':
        if (this.image !== this.sprites.skill.image) {
            this.image = this.sprites.skill.image
            this.framesMax = this.sprites.skill.framesMax
            this.framesCurrent = 0
        }
        break
    }
  }
}
