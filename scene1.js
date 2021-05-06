var gamepad;
var gamepadA;
var gamepad_used;
    
var player;
var hp_player = 1;
var gold_player = 6;
var x_0 = 600;
var y_0 = 200;
var angle = 0;
var velocity = 1000;

var vX0;
var vY0;
var vX1;
var vY1;
    
var hpText;
var goldText;
var endText;
var style = { font: "40px Arial", fill: "#52bace", align: "center" , backgroundColor: "#395B75"};
var cursors;
var move;
var bg;
var murs;
var brics;
var murVertical;
var murVertical1;

var bloc_allowed = true;
var bloc_present = false;

var boost_height = 225;

var bloc_rebond;
var cd_bloc_rebond = 0;

var golds;

var power_up;
var power_up_collected;

var image_red;

var miels;

var start = true;

var debugText;
var debugText2;

var tab_notes;
var timer = 0;

var tempo = 180;
var indic_notes;

var children_notes;

class scene1 extends Phaser.Scene{
    
    constructor ()
    {
        super("scene1");
        this.pad = null;
    }
    
    preload ()
    {   
        this.load.image('dude', 'assets/images/dude.png');
        this.load.image('bloc', 'assets/images/platform.png');
        this.load.image('bric', 'assets/images/bric.png');
        this.load.image('bg', 'assets/images/bg3.png');
        this.load.image('power_up', 'assets/images/power_up.png');
        this.load.image('miel', 'assets/images/miel_pot.png');
        this.load.image('gold', 'assets/images/star.png');
        this.load.image('cle', 'assets/images/cle.jpg');
    }
    
    create ()
    {        
        this.physics.world.setBounds(0, 0, config.width, config.height); 
        
        bg = this.add.tileSprite(640, 360, 1280, 720, 'bg');
        
        murs = this.physics.add.staticGroup();
        murVertical = this.physics.add.staticGroup();
        
        murs.create(1280, -32, 'bloc').setScale(2*1280/400).refreshBody();
        murVertical1 = murVertical.create(0-16*720/400, 360, 'bloc').setScale(720/400).refreshBody();
        murVertical1.angle += 90;
        murs.create(1280, 720, 'bloc').setScale(2*1280/400).refreshBody();
        
        cursors = this.input.keyboard.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.Z, 'left': Phaser.Input.Keyboard.KeyCodes.Q, 'right': Phaser.Input.Keyboard.KeyCodes.D, 'down': Phaser.Input.Keyboard.KeyCodes.S,'gas': Phaser.Input.Keyboard.KeyCodes.SPACE, 'restart': Phaser.Input.Keyboard.KeyCodes.R, 'abandon': Phaser.Input.Keyboard.KeyCodes.A});

        player = this.physics.add.sprite(x_0, y_0, 'dude');
        
        player.setCollideWorldBounds(true);
        
        player.setBounce(0.845);
        
        hpText = this.add.text(10, 20, 'Hp = ' + hp_player, style).setScrollFactor(0);
        goldText = this.add.text(10, 80, 'Gold = ' + gold_player, style).setScrollFactor(0);
        debugText = this.add.text(16, 16,"debug", {
            fontSize: '18px',
            padding: { x: 10, y: 5 },
            backgroundColor: '#000000',
            fill: '#ffffff'
        });
        
        this.physics.add.collider(player, murs);
        
        //this.cameras.main.startFollow(player, true, 0.5, 0.5);
        
        this.input.gamepad.once('down', function (pad, button, index) {
            gamepad = pad;
        }, this);
        
        tab_notes = [[4*tempo,150],[5*tempo,1050],[6*tempo,450],[7*tempo,750]];
        
        indic_notes = this.add.group();
        
        debugText2 = this.add.text(1000, 16,"debug", {
            fontSize: '18px',
            padding: { x: 10, y: 5 },
            backgroundColor: '#000000',
            fill: '#ffffff'
        });
        
    }
    
    update ()
    {
        timer++;
        
        for (var couple of tab_notes)
        {
            if (couple[0] - timer == 3*tempo)
            {
                var indic_note = indic_notes.create(couple[1],750,'dude');
            }
            debugText2.setText(couple[0] + couple[1]);
        }
        
        children_notes = indic_notes.getChildren();
        
        for (var indic_note of children_notes)
        {
            indic_note.y--;
            if (indic_note.y < 550){indic_note.destroy();}            
        }
        
        /*this.indic_notes.children.each(function(indic) {
            indic.y += 1;
            }, this);*/
        
        this.input.gamepad.once('connected', function (pad) {});
        
        hpText.setText('Hp = ' + hp_player);
        goldText.setText('Gold = ' + gold_player);
        
        if (gamepad)
        {
            if (Math.pow(gamepad.leftStick.x,2)+Math.pow(gamepad.leftStick.y,2)>0.5)
            {
                move = true;
                gamepad_used = true;
                if (gamepad.leftStick.x == 0){angle = 0;}
                else
                {
                    angle = Math.round(360*Math.atan2(gamepad.leftStick.y,gamepad.leftStick.x)/(2*Math.PI));
                    if (angle < 0){angle += 360;}
                }
            }
            else
            {
                move = false;
                gamepad_used = false;
            }
        }
        
        if (cd_bloc_rebond == 0 && bloc_present)
        {
            bloc_rebond.destroy();
            boost_height = 225;
            player.setBounce(0.845);
            bloc_present = false;
        }
        else
        {
            cd_bloc_rebond--;
        }
        
        if (cursors.down.isDown && bloc_allowed && !bloc_present)
        {
            bloc_allowed = false;
            bloc_present = true;
            bloc_rebond = murs.create(player.x, player.y - 80, 'bloc');
            boost_height = player.y;
            cd_bloc_rebond = 180;
            player.setBounce(1);
            player.setVelocityY(-player.body.velocity.y);
        }
        
        if (!cursors.down.isDown)
        {
            bloc_allowed = true;
        }
        
        
        if(!gamepad_used){
        if (cursors.left.isDown && !cursors.up.isDown && !cursors.right.isDown && !cursors.down.isDown)
        {
            angle = 180;
            move = true;
        }
        else if (!cursors.left.isDown && cursors.up.isDown && !cursors.right.isDown && !cursors.down.isDown)
        {
            angle = 270;
            move = true;
        }    
        else if (!cursors.left.isDown && !cursors.up.isDown && cursors.right.isDown && !cursors.down.isDown)
        {
            angle = 0;
            move = true;
        }   
        else if (!cursors.left.isDown && !cursors.up.isDown && !cursors.right.isDown && cursors.down.isDown)
        {
            angle = 90;
            move = true;
        }
        else if (cursors.left.isDown && cursors.up.isDown && !cursors.right.isDown && !cursors.down.isDown)
        {
            angle = 225;
            move = true;
        }
        else if (!cursors.left.isDown && cursors.up.isDown && cursors.right.isDown && !cursors.down.isDown)
        {
            angle = 315;
            move = true;
        }
        else if (!cursors.left.isDown && !cursors.up.isDown && cursors.right.isDown && cursors.down.isDown)
        {
            angle = 45;
            move = true;
        }
        else if (cursors.left.isDown && !cursors.up.isDown && !cursors.right.isDown && cursors.down.isDown)
        {
            angle = 135;
            move = true;
        }
        else {move = false;}
        }
        
        if (move)
        {
            //player.x += velocity * Math.cos(2*Math.PI*angle/360);
            //player.y += velocity * Math.sin(2*Math.PI*angle/360);
            player.setVelocityX(velocity * Math.cos(2*Math.PI*angle/360));
            //player.setVelocityY(velocity * Math.sin(2*Math.PI*angle/360));
        }
        else
        {
            player.setVelocityX(0);
            //player.setVelocityY(0);
        }
        
        /*if (player.x >= 1280 -50){
            y_0 = player.y;
            start = false;
            this.scene.start("scene2");
        }*/
        
        vX0 = vX1;
        vX1 = player.body.velocity.x;
        vY0 = vY1;
        vY1 = player.body.velocity.y;
        
        if (player.y < 225)
        {
            player.setVelocityY(1100);
        }
        
        if (player.y > 550)
        {
            player.setVelocityY(-3100);
        }
        
        debugText.setText(  '\n timer : ' + 10*Math.round(timer/10) +
                            '\n player.x0 : ' + 10*Math.round(player.x/10) + '  ***  player.y0 : ' + 10*Math.round(player.y/10) +
                            '\n player.Vx0 : ' + 10*Math.round(vX0/10) + '  ***  player.Vy0 : ' + 10*Math.round(vY0/10) +
                            '\n player.Vx1 : ' + 10*Math.round(vX1/10) + '  ***  player.Vy1 : ' + 10*Math.round(vY1/10) +
                            '\n player.Accx : ' + 10*Math.round(player.body.acceleration.x/10) + '  ***  player.Accy : ' + 10*Math.round(player.body.acceleration.y/10));
        
    }

}

function collectGold (player, gold)
{
    gold.disableBody(true, true);

    //  Add and update the score
    gold_player += 1;

    if (gold_player == 10)
    {
        endText = this.add.text(600, 350, 'Vous êtes riche !', style).setScrollFactor(0);
        this.physics.pause();
        return;
    }
}

function collideBric (player, bric)
{
    if (power_up_collected)
    {
        bric.disableBody(true, true);
    }
}

function collectPowerUp (player, power_up)
{
    power_up_collected = true;
    power_up.disableBody(true, true);
}

function collectMiel (player, miel)
{
    hp_player += 1;
    miel.disableBody(true, true);
}