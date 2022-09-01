const config = {
    type: Phaser.CANVAS,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "game-container",
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };
  
  const game = new Phaser.Game(config);
  let cursors;
  let player;
  let showDebug = false;
  var isClicking = false;
  var swipeDirection;
  var button;
  var leftButton;
  var myButton
  var circle

  
  function preload() {
    this.load.image("tiles", " asset/tuxmon-sample-32px-extruded.png");
    this.load.image("box", " asset/box.png");
    this.load.tilemapTiledJSON("map", " asset/tuxemon-town.json");
    //this.load.image("atlas", " asset/Boy-skateboard.png");

    this.load.spritesheet("atlas", " asset/player-new.png",{ frameWidth: 45, frameHeight: 90 });

    this.load.spritesheet("atlas-left", " asset/player/left.png",{ frameWidth: 45, frameHeight: 90 });
    this.load.spritesheet("atlas-right", " asset/player/right.png",{ frameWidth: 40, frameHeight: 85 });
    this.load.spritesheet("atlas-up", " asset/player/up.png",{ frameWidth: 37, frameHeight: 90 });
    this.load.spritesheet("atlas-down", " asset/player/down.png",{ frameWidth: 43, frameHeight: 90 });
    this.load.spritesheet("atlas-open", " asset/player/open.png",{ frameWidth: 43, frameHeight: 93 });


    this.load.image("button", "asset/box.png");

    this.load.image("left-button", "images/Left-Bottom.png");

    this.load.image("circle", "images/Circle.png");  

    // this.load.image("button", "images/Circle.png");
      

    var url;
  
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);

 
  }
  
  function create() {
  
    // var t = game.add.text(0, 0, "this text is fixed to the camera", { font: "32px Arial", fill: "#ffffff", align: "center" });
    
    // this.add.image(40, 30, 'circle');

    //  A sprite, doesn't scroll with the camera (is fixed to camera)
  



    const map = this.make.tilemap({ key: "map" });
   
    
    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
  
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createLayer("World", tileset, 0, 0);
    const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);
  
    worldLayer.setCollisionByProperty({ collides: true });
  
    // By default, everything gets depth sorted on the screen in the order we created things. Here, we
    // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
    // Higher depths will sit on top of lower depth objects.
    aboveLayer.setDepth(10);
  
    // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
    // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
    const spawnPoint = map.findObject(
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );

    const spawnPoint1 = map.findObject(
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );

    const spawnPoint2 = map.findObject(
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );


  //  circle = this.add.sprite(spawnPoint.x, spawnPoint.y, "circle");
  //  circle.fixedToCamera= true;
   

  
    // Create a sprite with physics enabled via the physics system. The image used for the sprite has
    // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
    player = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, "atlas")
      .setSize(30, 40) 
      .setOffset(0, 24);

    button = this.physics.add
    .sprite(spawnPoint1.x, spawnPoint1.y, "circle")
    .setSize(50, 90)
    .setOffset(0, 24)

      // button = document.getElementById("up");

      // this.add.dom(button);

      // this.physics.add.existing(button, false);
  

      //  myButton = this.add.dom(button);


    

      
    //  button = this.physics.add.Image(200, 270, "button");



      // button.setOrigin(1,1);
      // button.setPosition(50,50);
      // button.setScale(0.5);
      // button = this.physics.add.group();
     

      // button.fixedToCamera = true;
      // button.setScrollFactor(0)
      // button.cameraOffset.setTo(0, 0);




 //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('atlas-left', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });


    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('atlas-right', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('atlas-up', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('atlas-down', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
      key: 'open',
      frames: this.anims.generateFrameNumbers('atlas-open', { start: 3, end: 6 }),
      frameRate: 10,
      repeat: -1
  });

      
    
    this.physics.add.collider(player, worldLayer);

    this.physics.add.collider(button, worldLayer);
  
  
    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  
    cursors = this.input.keyboard.createCursorKeys();
  
    
    this.add
      .text(16, 16, "", {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        //  backgroundColor: "#ffffff",
      })
      .setScrollFactor(0)
      .setDepth(30);
  
    // Debug graphics
    this.input.keyboard.once("keydown-D", (event) => {
      // Turn on physics debugging to show player's hitbox
      this.physics.world.createDebugGraphic();
  
      // Create worldLayer collision graphic above the player, but below the help text
      const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
      worldLayer.renderDebug(graphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
      });
    });



   
            


    
  }
    

  
  
  function update(time, delta) {




  
    var alien = button.setInteractive();
   
    // var alien = myButton.setInteractive();

    
   
    // alien.on('pointerover', function () {
    //   alert('pointerover');
      

    // });
  
  // add left,right and up and down with max length.

    // alien.on('pointerdown', function (pointer) {

    //   if(pointer.isDown){
    //     this.physics.velocityFromAngle(-30, -3000, player.body.velocity);
    //      player.anims.play('left', true); 
    //   }
     
        
      

    // },this);


    alien.on('pointerdown', function(pointer){
      

      if(cursors.left.isDown){
        cursors.left.isDown = false
      }else{
        cursors.left.isDown = true
      }


      // this.key.up.isDown = true;
      
    },this);

    alien.on('pointerout', function(pointer){
      console.log('false');

      cursors.left.isDown = false;
      
      
      
    },this);

    const speed = 175;
    const prevVelocity = player.body.velocity.clone();
  
    // var angle = 30;
  
    // Stop any previous movement from the last frame
    player.body.setVelocity(0);





    this.input.mouse.disableContextMenu();

    // this.input.on('pointerdown', function (pointer) {

    //     if (pointer.rightButtonDown())
    //     {
    //       this.physics.velocityFromAngle(30, -300, player.body.velocity);
    //       player.anims.play('open', true);
    //     }
       

    // }, this); 


    // let jump = function () {
    //   if (player.body.touching.down) {
    //     this.physics.velocityFromAngle(30, 300, player.body.velocity);
    //     player.anims.play('down', true);
    //   }
    // }


 




    // document.getElementById('up').onclick() = this.upit;


    if (cursors.left.isDown) {
      this.physics.velocityFromAngle(-30, -300, player.body.velocity);
      player.anims.play('left', true);
      // player.body.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
      this.physics.velocityFromAngle(-30, 300, player.body.velocity);
      player.anims.play('right', true);
      // player.body.setVelocityX(speed);
    }
  
    // Vertical movement
    else if (cursors.up.isDown) {
      this.physics.velocityFromAngle(30, -300, player.body.velocity);
      player.anims.play('up', true);
      // player.body.setVelocityY(-speed);
    }
    else if (cursors.down.isDown ){
      this.physics.velocityFromAngle(30, 300, player.body.velocity);
      player.anims.play('down', true);
      // player.body.setVelocityY(speed);
    }
   
    else if ((this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)).isDown){
      // this.physics.velocityFromAngle(30, 300, player.body.velocity);
      player.anims.play('open', true);
      // player.body.setVelocityY(speed);
    }
  
    else{
        // player.anims.stopOnFrame(true);

        player.anims.stop(null,true);
    }
     
  
    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);
  


  }
  