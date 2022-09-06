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
  let boxes;

    //controllers keys

    let controller_bg;
    let leftButton;
    let rightButton;
    let upButton;
    let downButton;
  
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

        //controllers images

    this.load.image("controller-bg", "asset/controller/controller_bg.png");
    this.load.image("up-button", "asset/controller/up.png");
    this.load.image("left-button", "asset/controller/left.png");
    this.load.image("right-button", "asset/controller/right.png");
    this.load.image("down-button", "asset/controller/down.png");
    


    this.load.scenePlugin({
      key: 'rexgesturesplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgesturesplugin.min.js',
      sceneKey: 'rexGestures'
  }); 

  }
  
  function create() {

       //controller images
  //  controller_bg =  this.add.image(190, 550, 'controller-bg').setScrollFactor(0);
  //  controller_bg.setDepth(100);
   
   

  //  leftButton =  this.add.sprite(130, 580, 'left-button').setScrollFactor(0);
  //  leftButton.setDepth(101)

  //  rightButton =  this.add.sprite(260, 510, 'right-button').setScrollFactor(0);
  //  rightButton.setDepth(101)

  //  upButton =  this.add.sprite(130, 510, 'up-button').setScrollFactor(0);
  //  upButton.setDepth(101)

  //  downButton =  this.add.sprite(250, 580, 'down-button').setScrollFactor(0);
  //  downButton.setDepth(101)

    const map = this.make.tilemap({ key: "map" });

  

    this.print = print = this.add.text(0, 0, '')

    this.swipeInput = this.rexGestures.add.swipe({ velocityThreshold: 1000 })
        .on('swipe', function (swipe) {
            console.log('swipeInput');
            print.text += `swipe, v = ${swipe.dragVelocity}\n`;
        }, this);


   

  
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
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
  
    // Create a sprite with physics enabled via the physics system. The image used for the sprite has
    // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
    player = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, "atlas")
      .setSize(30, 40)
      .setOffset(0, 24);

      boxes = map.createFromObjects('Objects', { gid: 26, key: 'box' });


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
  

  
    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  
    cursors = this.input.keyboard.createCursorKeys();
  
    // Help text that has a "fixed" position on the screen
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


    if(this.swipeInput.left){

      var velocityThreshold = swipe.velocityThreshold;
      swipe.setVelocityThreshold(velocityThreshold);
      console.log('Swipe Left');
// swipe.velocityThreshold = velocityThreshold;



      // this.rexGestures.add.press(game)
      //           .on('pressstart', function (press) {
      //             this.physics.velocityFromAngle(-30, -300, player.body.velocity);
      //             player.anims.play('left', true);
      //           })
      //           .on('pressend', function (press) {
      //               console.log('press end');
      //           });
     

    
    }

      function onTap(pointer, doubleTap) {

    if (doubleTap)
    {
        
        cursors.down.isDown = false;
        cursors.left.isDown = false;
        cursors.right.isDown = false;
        cursors.up.isDown = false;
       
    }
   

}

  // this.input.onTap(onTap, this);


  }
  
  function update(time, delta) {

    // var left = leftButton.setInteractive();
    // var right = rightButton.setInteractive();
    // var up = upButton.setInteractive();
    // var down = downButton.setInteractive();
  


    // left.on('pointerdown', function(pointer){   

    //   if(cursors.left.isDown){
    //     cursors.left.isDown = false
    //   }else{
    //     cursors.left.isDown = true
    //   }
      
    // },this);

    // left.on('pointerout', function(pointer){
    //   cursors.left.isDown = false;
      
    // },this);



    // right.on('pointerdown', function(pointer){
    //   if(cursors.right.isDown){
    //     cursors.right.isDown = false
    //   }else{
    //     cursors.right.isDown = true
    //   }
      
    // },this);

    // right.on('pointerout', function(pointer){
      
    //   cursors.right.isDown = false;
    // },this);

    
    // up.on('pointerdown', function(pointer){
    //   if(cursors.up.isDown){
    //     cursors.up.isDown = false
    //   }else{
    //     cursors.up.isDown = true
    //   }
      
    // },this);

    // up.on('pointerout', function(pointer){
      
    //   cursors.up.isDown = false;
    // },this);


    
    // down.on('pointerdown', function(pointer){
    //   if(cursors.down.isDown){
    //     cursors.down.isDown = false
    //   }else{
    //     cursors.down.isDown = true
    //   }
    // },this);

    // down.on('pointerout', function(pointer){
    //   cursors.down.isDown = false;
    // },this);




    const speed = 175;
    const prevVelocity = player.body.velocity.clone();


    if (this.swipeInput.isSwiped) {
      console.log('isSwiped');
      this.print.text += `update(): swipe ${dumpDirectionStates(this.swipeInput)}\n`;
     

      
  }

//   function onTap(pointer, doubleTap) {

//     if (doubleTap)
//     {
        
//         cursors.down.isDown = false;
//         cursors.left.isDown = false;
//         cursors.right.isDown = false;
//         cursors.up.isDown = false;
       
//     }
   

// }

//   this.input.onTap.add(onTap, this);
  
    // var angle = 30;
  
    // Stop any previous movement from the last frame
    player.body.setVelocity(0);

    this.input.mouse.disableContextMenu();

    this.input.on('pointerdown', function (pointer) {

        if (pointer.rightButtonDown())
        {
          player.anims.play('open', true);
        }
       

    }, this); 

  

    var playerImage = player.setInteractive();

      playerImage.on('pointerdown', function(pointer){
      

      player.anims.stop(null,true);

      cursors.down.isDown = false;
      cursors.left.isDown = false;
      cursors.right.isDown = false;
      cursors.up.isDown = false;
      
    },this);

    



    if(this.swipeInput.up){
 

      console.log('Swipe Up');

      cursors.down.isDown = false;
      cursors.left.isDown = false;
      cursors.right.isDown = false;
      cursors.up.isDown = true;
      
      

    }
    
    if(this.swipeInput.down){
 

      console.log('Swipe Down');

      cursors.down.isDown = true;
      cursors.left.isDown = false;
      cursors.right.isDown = false;
      cursors.up.isDown = false;

     

    }
    
    if(this.swipeInput.left){

      cursors.down.isDown = false;
      cursors.left.isDown = true;
      cursors.right.isDown = false;
      cursors.up.isDown = false;
 

      console.log('Swipe Left');

      
      

    }
    
    if(this.swipeInput.right){

      cursors.down.isDown = false;
      cursors.left.isDown = false;
      cursors.right.isDown = true; 
      cursors.up.isDown = false;
 

      console.log('Swipe Right');

      
    }

    if (cursors.left.isDown) {
     
      this.physics.velocityFromAngle(-30, -300, player.body.velocity);
      player.anims.play('left', true);

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
  
  var directions = ['left', 'right', 'up', 'down'];
  var dumpDirectionStates = function (swipe) {
      var s = '';
      var dir;
      for (var i = 0, cnt = directions.length; i < cnt; i++) {
          dir = directions[i];
          if (swipe[dir]) {
              s += ' ' + dir;
              // console.log(directions[i]);
              if (directions[i] === 'up') {
               
                console.log('Swipe Up');
                
            }
          }
          
      }
      return s;
  }
