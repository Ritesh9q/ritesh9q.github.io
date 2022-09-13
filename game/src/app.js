

let data = [
  {id : 1712, url : "https://www.google.com"},
  {id : 1880, url : "https://www.wikipedia.com"},
  {id : 1990, url : "https://www.wikihow.com"}
  ]; 

// let myArray = []

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
  let json;
  let cursors;
  let player;
  let showDebug = false;
  var isClicking = false;
  var swipeDirection;
  let boxes;
  let scoreText;
  let collected = 0;
  let openBoxes;
  let map;
     //controllers keys

    let controller_bg;
    let leftButton;
    let rightButton;
    let upButton;
    let downButton;
  
  function preload() {
   

    this.load.image("tiles", " asset/tuxmon-sample-32px-extruded.png");
    
    this.load.tilemapTiledJSON("map", " asset/tuxemon-town-n.json");
    //this.load.image("atlas", " asset/Boy-skateboard.png");

    this.load.spritesheet("atlas", " asset/player-new.png",{ frameWidth: 45, frameHeight: 90 });

    this.load.spritesheet("atlas-left", " asset/player/left.png",{ frameWidth: 45, frameHeight: 90 });
    this.load.spritesheet("atlas-right", " asset/player/right.png",{ frameWidth: 40, frameHeight: 85 });
    this.load.spritesheet("atlas-up", " asset/player/up.png",{ frameWidth: 37, frameHeight: 90 });
    this.load.spritesheet("atlas-down", " asset/player/down.png",{ frameWidth: 43, frameHeight: 90 });
    this.load.spritesheet("atlas-open", " asset/player/open.png",{ frameWidth: 43, frameHeight: 90 });

        //controllers images

    this.load.image("controller-bg", "asset/controller/controller_bg.png");
    this.load.image("up-button", "asset/controller/up.png");
    this.load.image("left-button", "asset/controller/left.png");
    this.load.image("right-button", "asset/controller/right.png");
    this.load.image("down-button", "asset/controller/down.png");


    //boxes

    this.load.image("box", " asset/box.png");
    this.load.spritesheet("box-opens", " asset/box-opens.png",{ frameWidth: 37, frameHeight: 40 }); 
    this.load.spritesheet("box-active", " asset/box-active.png",{ frameWidth: 37, frameHeight: 50 }); 
    this.load.image("box-opened", " asset/box-open-red.png");  
    this.load.image("box-completed", " asset/box-opened.png");   

    this.load.spritesheet("coins", "asset/Coin-animation.png", { frameWidth: 37, frameHeight: 40 });


    


    this.load.scenePlugin({
      key: 'rexgesturesplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgesturesplugin.min.js',
      sceneKey: 'rexGestures'
  }); 

  }
  
  function create() {

    scoreText = this.add
    .text(16, 16, "Box Collected: "+collected, {
      font: "20px monospace",
      fill: "#000000",
      padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff",
    })
    .setScrollFactor(0)
    .setDepth(10);

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

     this.map = this.make.tilemap({ key: "map" });

  

    this.print = print = this.add.text(0, 0, '')

    this.swipeInput = this.rexGestures.add.swipe({ velocityThreshold: 1000 })
        .on('swipe', function (swipe) {
            console.log('swipeInput');
            print.text += `swipe, v = ${swipe.dragVelocity}\n`;
        }, this);
 
   

  
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
  
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const imageLayer = this.map.createLayer("Image Layer 1", tileset, 0, 0);
    const belowLayer = this.map.createLayer("Below Player", tileset, 0, 0);
    const worldLayer = this.map.createLayer("World", tileset, 0, 0);
    const aboveLayer = this.map.createLayer("Above Player", tileset, 0, 0);
  
    worldLayer.setCollisionByProperty({ collides: true });
  
    // By default, everything gets depth sorted on the screen in the order we created things. Here, we
    // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
    // Higher depths will sit on top of lower depth objects.
    aboveLayer.setDepth(10);
  
    // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
    // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
    const spawnPoint = this.map.findObject(
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );
  
    // Create a sprite with physics enabled via the physics system. The image used for the sprite has
    // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
    player = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, "atlas")
      .setSize(30, 30)
      .setOffset(0, 24) 
      .setDepth(1);  


      // player.setCollideWorldBounds(true)

      // player.refresh();

      // boxes = map.createFromObjects('Objects', { gid: 26, key: 'box' });

       this.boxes = this.physics.add.group();

// The code below was called in my create() function of my game
this.boxes.addMultiple(
  this.map.createFromObjects('Objects', { gid: 26, key: 'box' },this) 
);

Array.from(this.boxes.children.entries).forEach(element => {
  console.log(element);
  
  // this.physics.add.overlap(player,element)
  element.body.setAllowGravity(false);  
  this.physics.add.collider(player, element, collectBox, null, this);
  
});

// console.log(this.boxes.children)

// Object.keys(this.boxes).forEach(box => {
//   console.log(box);
// });
// this.boxes.forEach((box)=>console.log(box));  

// let group;
// this.boxes.reduce((group, box) => {
//   group.add(box)
//   this.physics.world.enable(box)
//   box.body.setImmovable()
//   return group
// }, group)

      

     
    
      // this.boxes.body.enable = false;

      this.physics.world.enable(player);
      this.physics.world.enable(this.boxes); 

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
      frames: this.anims.generateFrameNumbers('atlas-open', { start: 1, end: 6 }),
      frameRate: 10, 
      repeat: -1 
  });

  this.anims.create({
    key: 'box-active',
    frames: this.anims.generateFrameNumbers('box-active', { start: 6, end: 10 }),
    frameRate: 10, 
    repeat: -1 
});

this.anims.create({
  key: 'box-opens',
  frames: this.anims.generateFrameNumbers('box-opens', { start: 0, end: 14 }),
  frameRate: 10, 
  repeat: -1 
});

this.anims.create({
  key: 'coins',
  frames: this.anims.generateFrameNumbers('coins', { start: 0, end: 14 }),
  frameRate: 10, 
  repeat: -1 
});
 
      
   
    this.physics.add.collider(player, worldLayer);
    this.physics.add.collider(this.boxes, worldLayer); 

    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  
    cursors = this.input.keyboard.createCursorKeys();
  
 
  
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
  this.boxes.enableBody=true;
  player.enableBody=true;
  // this.input.onTap(onTap, this);
  // this.physics.add.overlap(player, this.boxes, collectBox, null, this);
  
  //this.physics.enable(player, Phaser.Physics.ARCADE);

  this.physics.world.enable(player);
  this.physics.world.enable(this.boxes);

  }
  
  function update(time, delta) {
  
    this.physics.world.enable(this.boxes);
    // this.boxes.body.setEnable();
    player.body.setEnable();
   

  //  player.body.enable = true;
   



  //   this.boxes.forEach((box) => {

  //     this.physics.add.overlap(player, box, this.collectBox, null, this);
      
  // });

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


    //Double Click
  
    let lastTime = 0;
    this.input.on("pointerdown", ()=>{
        let clickDelay = this.time.now - lastTime;
        lastTime = this.time.now;
        if(clickDelay < 350) {

          player.anims.play('open', true);
         console.log("Double clicked!"); 
        }
    });

    this.input.on('pointerout', function(pointer){
      
      console.log('Pointer Out')
    },this);





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
      // player.anims.play('coins', true); 

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


    this.physics.add.collider(player, this.openBoxes);

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

  function collectBox(player, boxes)
  {
      // boxes.disableBody(true, true);
     
      console.log('Collect Box Executed....');
      collected += 1;
      scoreText.setText("Collected Box:"+collected);

      // var id = boxes.id

    //var url = this.map.createFromObjects('Objects', { id: boxes.id , key: 'box' },this);
    // var url =  JSON.parse(data);  
    // console.log(boxes.x);
    var x =  data.filter(obj => obj.id === boxes.x)

      // console.log(data)
 
      //  console.log(x[0].url);
   
      this.openBoxes = this.physics.add.image(boxes.x,boxes.y,"box-opened").setImmovable(); 
      //this.physics.add.overlap(player,this.openBoxes)
 
      // player.anims.play('box-opens', true);

      setTimeout(()=>{ 
        this.openBoxes.destroy();             
        this.openBoxes = this.physics.add.image(boxes.x,boxes.y,"box-completed").setImmovable();
       // this.physics.add.overlap(player,this.openBoxes)
        
      },1000);

     
      boxes.destroy();

 
    //  if(x[0]){
    //   window.open(x[0].url);
    //  }
     
  
  }
 