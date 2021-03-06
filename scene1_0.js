var gamepad;
var gamepadA;
var gamepad_used;

var graphics;

var radius0 = 12;
var radius1 = 30;
var radius2 = 40;
var radius3 = 6;

var decalage = 69;
var yH = 140;
var yB = 145;

var traceX = [-1000,-1000,-1000,-1000,-1000,-1000,-1000,-1000,-1000,-1000,-1000,-1000];
var traceY = [-1000,-1000,-1000,-1000,-1000,-1000,-1000,-1000,-1000,-1000,-1000,-1000];

var player;
var hp_player = 1;
var gold_player = 6;
var x_init = 600;
var y_init = 200;
var angle = 0;
var velocity = 1200;

var y_sol = 280;
var y_mid = 180;
var y_top0 = 50;
var y_top;
var timer2 = 29;
var division = 1;
var tab_division = [[1,y_top0],[1,y_top0]];

var largeur_note;
var limite_gauche;

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

var bloc_down_allowed = true;
var bloc_up_allowed = true;
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

var debugText0;
var debugText;
var debugText2;
var debugText3;

var score = 0;

var text = "";
var text0 = "";
var tab_timer = [];
var text2 = "";

var tab_notes_entree;
var tab_notes_sortie;
var timer = 0;

var tonalite = 1;
var tempo = 18;
var indic_notes;

var vY_indic_notes = 1;

var children_notes;

var note;

var nombre_notes_total;

var textFinal;

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
        this.load.image('bg', 'assets/images/bg.png');
        this.load.image('power_up', 'assets/images/power_up.png');
        this.load.image('miel', 'assets/images/miel_pot.png');
        this.load.image('gold', 'assets/images/star.png');
        this.load.image('cle', 'assets/images/cle.jpg');
        
        //this.load.audio('note', 'assets/audio/Bzz0.m4a');
        //this.load.audio('note', 'assets/audio/do2.wav');
        this.load.audio('note', 'assets/audio/do2_guitare.wav');
    }
    
    create ()
    {     
        graphics = this.add.graphics();
        
        this.physics.world.setBounds(config.height/2, 0, config.width-config.height/2, config.height);
        
        bg = this.add.tileSprite(config.height/2+448, 224, 896, 448, 'bg');
        bg.setDepth(-1);

        // largeur d'une colonne -> on soustrait une demie hauteur ?? la largeur totale puis on divide par le nombre de colonnes
        largeur_note = (config.width-config.height/2)/5;
        limite_gauche = config.height/2+0.5*largeur_note;

        velocity = 1200*(30/tempo);
        /*
        murs = this.physics.add.staticGroup();
        murVertical = this.physics.add.staticGroup();
        
        murs.create(1280, -32, 'bloc').setScale(2*1280/400).refreshBody();
        murVertical1 = murVertical.create(0-16*720/400, 360, 'bloc').setScale(720/400).refreshBody();
        murVertical1.angle += 90;
        murs.create(1280, 720, 'bloc').setScale(2*1280/400).refreshBody();
        */
        cursors = this.input.keyboard.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.Z, 'left': Phaser.Input.Keyboard.KeyCodes.Q, 'right': Phaser.Input.Keyboard.KeyCodes.D, 'down': Phaser.Input.Keyboard.KeyCodes.S,'gas': Phaser.Input.Keyboard.KeyCodes.SPACE, 'restart': Phaser.Input.Keyboard.KeyCodes.R, 'abandon': Phaser.Input.Keyboard.KeyCodes.A});

        player = this.physics.add.sprite(x_init, y_init, 'dude');
        
        player.setCollideWorldBounds(true);
        
        player.setBounce(0.845);
        player.setVisible(false);
        
        note = this.sound.add("note", { loop: false });
        
        debugText = this.add.text(16, 16,"debug", {
            fontSize: '18px',
            padding: { x: 10, y: 5 },
            fill: '#ffffff'
        });
        
        /*this.physics.add.collider(player, murs, ground, null, this);*/
        
        //this.cameras.main.startFollow(player, true, 0.5, 0.5);
        
        this.input.gamepad.once('down', function (pad, button, index) {
            gamepad = pad;
        }, this);
        
        //tab_notes_entree = [[4,0,0],[5,3,4],[6,1,7],[7,2,4],[8,3,0],[9,3,0],[12,3,7],[12.25,3,7],[12.5,3,7],[12.75,3,0]];
        tab_notes_entree = [[4,0,0],[5,1,2],[6,2,4],[7,3,5],[8,4,7],[9,4,7],[10,4,7],[11,4,7],[12,1,9],[13,0,5],[14,3,12],[15,2,9],[16,1,7],[17,1,7],[18,1,7],[19,1,7],[20,1,7],[21,0,5],[22,0,5],[23,0,5],[24,0,5],[25,2,4],[26,2,4],[27,2,4],[28,2,4],[29,3,2],[30,2,4],[31,3,2],[32,0,0],[33,1,4],[34,4,7],[36,4,7],[37,3,5],[38,3,5],[39,3,5],[40,3,5],[41,2,4],[42,2,4],[43,2,4],[44,2,4],[45,1,2],[46,2,4],[47,1,2],[48,0,0]];
        //tab_notes_entree = [[4,0,0],[5,1,2],[6,2,4],[7,3,5],[8,2,7],[8.5,2,6],[9,2,7],[9.5,2,6],[10,2,7]];
        tab_notes_sortie = [];
        
        nombre_notes_total = tab_notes_entree.length;

        indic_notes = this.add.group();
        /*
        debugText2 = this.add.text(0, 450,"debug", {
            fontSize: '18px',
            padding: { x: 10, y: 5 },
            backgroundColor: '#000000',
            fill: '#ffffff'
        });
        
        debugText3 = this.add.text(0, 500,"debug", {
            fontSize: '18px',
            padding: { x: 10, y: 5 },
            backgroundColor: '#000000',
            fill: '#ffffff'
        });
        
        debugText0 = this.add.text(0, 400,"debug", {
            fontSize: '18px',
            padding: { x: 10, y: 5 },
            backgroundColor: '#000000',
            fill: '#ffffff'
        });
        */
        textFinal = this.add.text(100, config.height/2-100,"", {
            fontSize: '50px',
            padding: { x: 10, y: 5 },
            fill: '#ffffff'
        });
        
    }
    
    update ()
    {
        if (tab_notes_entree.length == 0)
        {
            setTimeout(function(){textFinal.setText("C'est qui le bogoss \n avec son gros \n score de " + score + '/' + nombre_notes_total + " ??");},2000);
        }
        
        timer++;
        
        timer2 = (timer2+1)%tempo;

        if (timer2 == 0){
            console.log(tab_division[0][0],tab_division[0][1],tab_division[1][0],tab_division[1][1])
            tab_division.shift();
            tab_division.push([1,y_top0]);            
        }

        /*if (timer%60 == 0)
        {
            tonalite *= Math.pow(2,1/12);
            game.sound.setRate(tonalite);
            note.play();
        }*/
        /*
        text = "";
        text0 = "";
        */
        for (var couple of tab_notes_entree)
        {
            if (couple[0]*tempo - timer <= 3*tempo)
            {
                //couple[2] = false;
                var indic_note = indic_notes.create(limite_gauche+couple[1]*largeur_note,450+tempo+((450-330)%tempo),'bloc').setScale(largeur_note/400,0.25);//couple[1]*300+150,450,'bloc').setScale(0.5,0.25);
                indic_note.setTint(0xff0000);
                tab_notes_sortie.push(tab_notes_entree[0]);
                tab_notes_entree.shift();
            }
            /*text += couple[1] + ",";*/
            //text0 += tab_notes_sortie.length + ",";//tab_notes_sortie[tab_notes_sortie.length -1] + ",";
        }
        /*
        for (var couple of tab_notes_sortie)
        {
            text0 += couple[1] + ","; //tab_notes_sortie.length + ",";//tab_notes_sortie[tab_notes_sortie.length -1] + ",";
        }*/
        
        /*if (player.body.touchingdown && player.y > 450)
        {
            //tab_timer.push(timer);
            text2 += timer + ",";
        }*/
        /*
        debugText2.setText("partoche ?? venir : " + text);
        
        debugText3.setText("touches du joueur : " + text2);
        
        debugText0.setText("partoche ?? arriver : " + text0);
        */
        children_notes = indic_notes.getChildren();
        
        for (var indic_note of children_notes)
        {
            //indic_note.y -= 0.4 + (750 - indic_note.y)/60;
            indic_note.y -= vY_indic_notes;
            if (indic_note.y < 330)
            {
                if ( Math.abs(player.x - indic_note.x) <= 67 && player.y > 150)//(Math.pow(Math.pow(player.x - indic_note.x,2)+0.2*Math.pow(player.y - indic_note.y,2),0.5) <= 100)
                {
                    score++;
                    game.sound.volume = 1;
                }
                else
                {
                    game.sound.volume = 0.2;
                }
                tonalite = 2*Math.pow(2,(tab_notes_sortie[0][2])/12);
                game.sound.setRate(tonalite);
                note.play();
                indic_note.destroy();
                tab_notes_sortie.shift();
                //this.physics.pause();
                //player.y = 550;
            }
        }
        
        /*this.indic_notes.children.each(function(indic) {
            indic.y += 1;
            }, this);*/
        
        this.input.gamepad.once('connected', function (pad) {});
        
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
            //bloc_rebond.destroy();
            boost_height = 225;
            player.setBounce(0.845);
            bloc_present = false;
        }
        else
        {
            cd_bloc_rebond--;
        }
        
        if (cursors.down.isDown && bloc_down_allowed && !bloc_present)
        {
            if (timer2 == 0)
            {
                tab_division[0][0] = 4;
                tab_division[0][1] = y_mid;
            }
            else
            {
                tab_division[1][0] = 4;
                tab_division[1][1] = y_mid;
            }

            //bloc_down_allowed = false;
            //bloc_present = true;
            //bloc_rebond = murs.create(player.x, player.y - 80, 'bloc');
            //boost_height = player.y;
            //cd_bloc_rebond = 180;
            //player.setBounce(1);
            //player.setVelocityY(-player.body.velocity.y);
        }
        
        if (!cursors.down.isDown)
        {
            bloc_down_allowed = true;
        }
        
        if (cursors.up.isDown && bloc_up_allowed && !bloc_present)
        {
            bloc_up_allowed = false;
            bloc_present = true;
            bloc_rebond = murs.create(player.x, player.y + 80, 'bloc');
            //boost_height = player.y;
            cd_bloc_rebond = 180;
            //player.setBounce(1);
            //player.setVelocityY(-player.body.velocity.y);
        }
        
        if (!cursors.up.isDown)
        {
            bloc_up_allowed = true;
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
            y_init = player.y;
            start = false;
            this.scene.start("scene2");
        }*/
        
        vX0 = vX1;
        vX1 = player.body.velocity.x;
        vY0 = vY1;
        vY1 = player.body.velocity.y;

        y_top = tab_division[0][1];
        player.y = calcul_hauteur(timer2/tab_division[0][0],0,tempo/tab_division[0][0],tab_division[0][1]);
        if (tab_division[0][0]==4)
        {
            //console.log(player.y);
        }

        /*
        if (player.y < 225)
        {
            player.setVelocityY(1100);
        }
        
        if (player.y > 550)
        {
            player.setVelocityY(-3100);
        }*/
        
        graphics.clear();
        
        /*traceX.push(player.x);
        traceX.shift();
        traceY.push(player.y);
        traceY.shift();        
        for (let i = 0; i < traceX.length; i++)
        {
            draw_baton(traceX[i],traceY[i],(i+1)/traceX.length*(i+1)/traceX.length);
        }*/
        
        draw_baton(player.x,player.y,1);

        debugText.setText(  /*'\n timer : ' + 10*Math.round(timer/10) +
                            '\n player.x0 : ' + 10*Math.round(player.x/10) + '  ***  player.y0 : ' + 10*Math.round(player.y/10) +
                            '\n player.Vx0 : ' + 10*Math.round(vX0/10) + '  ***  player.Vy0 : ' + 10*Math.round(vY0/10) +
                            '\n player.Vx1 : ' + 10*Math.round(vX1/10) + '  ***  player.Vy1 : ' + 10*Math.round(vY1/10) +
                            '\n player.Accx : ' + 10*Math.round(player.body.acceleration.x/10) + '  ***  player.Accy : ' + 10*Math.round(player.body.acceleration.y/10) +
                            '\n*/ 'score : ' + score);
    }

}

function calcul_hauteur(t,t0,delta,ymax)
{
    return 4*(y_sol-ymax)*(t-t0)*(((t-t0)/delta-1)/delta)+y_sol;
}

function draw_baton(x,y,alpha)
{
    let x0 = getX0(x,y);
    let y0 = getY0(x,y);
    
    let distAB = Math.pow(Math.pow(x0-x,2)+Math.pow(y0-y,2),1/2);
    
    //Affichage de l'extremite eloignee
    graphics.fillStyle(0x3A3023, alpha);
    graphics.fillCircle(x0,y0,radius0);
    
    //Affichage de la baguette
    let poly = new Phaser.Geom.Polygon();

    poly.setTo([ new Phaser.Geom.Point(x-radius2*(y0-y)/distAB, y+radius2*(x0-x)/distAB), new Phaser.Geom.Point(x0-radius0*(y0-y)/distAB, y0+radius0*(x0-x)/distAB), new Phaser.Geom.Point(x0+radius0*(y0-y)/distAB, y0-radius0*(x0-x)/distAB), new Phaser.Geom.Point(x+radius2*(y0-y)/distAB, y-radius2*(x0-x)/distAB) ]);
    graphics.fillStyle(0x3A3023, alpha);
    graphics.fillPoints(poly.points, true);
    
    //Affichage de l'extremite proche
    graphics.fillStyle(0x9B8A72, alpha);
    graphics.fillCircle(x,y,radius2);
    
    //Affichage de l'extremite proche
    graphics.fillStyle(0x3A3023, alpha);
    graphics.fillCircle(x,y,radius3);
}

function getX0(x,y)
{
    return decalage*x/276+448*(1-decalage/276);
}

function getY0(x,y)
{
    return (yH-yB)*(x-448)*(x-448)/(172*276)+yH + (y-200)/8;
}

function ground (player, murs)
{
    if (player.y > 450)
        {
            //tab_timer.push(timer);
            text2 += timer + ",";
        }
}