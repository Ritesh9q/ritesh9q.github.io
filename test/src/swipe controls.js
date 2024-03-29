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
    
    // An atlas is a way to pack multiple images together into one texture. I'm using it to load all
    // the player animations (walking left, walking right, etc.) in one image. For more info see:
    //  https://labs.phaser.io/view.html?src=src/animation/texture%20atlas%20animation.js
    // If you don't use an atlas, you can do the same thing with a spritesheet, see:
    //  https://labs.phaser.io/view.html?src=src/animation/single%20sprite%20sheet.js
  
    // this.load.atlas(
    //   "atlas",
    //   "https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png",
    //   "https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json"
    // );

    this.load.scenePlugin({
      key: 'rexgesturesplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgesturesplugin.min.js',
      sceneKey: 'rexGestures'
  }); 

  }
  
  function create() {
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

      
    // .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
    // Watch the player and worldLayer for collisions, for the duration of the scene:
    this.physics.add.collider(player, worldLayer);
  
    // Create the player's walking animations from the texture atlas. These are stored in the global
    // animation manager so any sprite can access them.
    // const anims = this.anims;
    // anims.create({
    //   key: "misa-left-walk",
    //   frames: anims.generateFrameNames("atlas", {
    //     prefix: "misa-left-walk.",
    //     start: 0,
    //     end: 3,
    //     zeroPad: 3,
    //   }),
    //   frameRate: 10,
    //   repeat: -1,
    // });
    // anims.create({
    //   key: "misa-right-walk",
    //   frames: anims.generateFrameNames("atlas", {
    //     prefix: "misa-right-walk.",
    //     start: 0,
    //     end: 3,
    //     zeroPad: 3,
    //   }),
    //   frameRate: 10,
    //   repeat: -1,
    // });
    // anims.create({
    //   key: "misa-front-walk",
    //   frames: anims.generateFrameNames("atlas", {
    //     prefix: "misa-front-walk.",
    //     start: 0,
    //     end: 3,
    //     zeroPad: 3,
    //   }),
    //   frameRate: 10,
    //   repeat: -1,
    // });
    // anims.create({
    //   key: "misa-back-walk",
    //   frames: anims.generateFrameNames("atlas", {
    //     prefix: "misa-back-walk.",
    //     start: 0,
    //     end: 3,
    //     zeroPad: 3,
    //   }),
    //   frameRate: 10,
    //   repeat: -1,
    // });
  
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


  }
  
  function update(time, delta) {
    const speed = 175;
    const prevVelocity = player.body.velocity.clone();


    if (this.swipeInput.isSwiped) {
      console.log('isSwiped');
      this.print.text += `update(): swipe ${dumpDirectionStates(this.swipeInput)}\n`;
      // console.log();
      // if()


      
  }
  
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

   // Phaser.Input.Keyboard.KeyCodes.SPACE

  //  var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Horizontal movement
      
      if(this.input.pointer1.isDown){
      this.physics.velocityFromAngle(-30, 300, player.body.velocity);
      player.anims.play('right', true);
          
      }

    if(this.swipeInput.up ){
 

      console.log('somethng something...');

      this.physics.velocityFromAngle(30, -300, player.body.velocity);
      player.anims.play('up', true);
      

    }

    if (cursors.left.isDown) {
     
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
