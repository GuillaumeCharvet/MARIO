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
var comboText;
var debugText2;
var debugText3;

var score_sans_multi = 0;
var score = 0;
var multiplicateur = 1;
var streak = 0;

var text = "";
var text0 = "";
var tab_timer = [];
var text2 = "";

var tab_notes_entree;
var tab_notes_sortie;
var timer = 0;

var tonalite = 1;
var tempo = 36;
var indic_notes;

var y_sol = 250;
var y_mid = 180;
var y_top0 = 50;
var y_top;

var ymax_type3;
var ymax_type3_can_change = true;

var timer2 =0;
var division = 1;
//var tab_division = [[1,y_top0],[1,y_top0],[1,y_top0],[1,y_top0],[1,y_top0],[1,y_top0],[1,y_top0],[1,y_top0]];
var tab_division = [1,1,1,1,1,1,1,1];
//var tab_tempo = [[0*tempo/4,1*tempo/4-1],[1*tempo/4,2*tempo/4-1],[2*tempo/4,3*tempo/4-1],[3*tempo/4,4*tempo/4-1]];
var tab_tempo = [Math.floor(0*tempo/4),Math.floor(1*tempo/4),Math.floor(2*tempo/4),Math.floor(3*tempo/4)];
var quart_section = 0;
var dernier_rebond = 1;

var vY_indic_notes = 1;

var children_notes;

var note;

var nombre_notes_total;

var textFinal;

var bouton_gauche;
var aller_gauche = false;
var bouton_droit;
var aller_droite = false;
var mode_click = false;

var silhouettes_noir;
var silhouettes_couleur;
var silhouettes_exterieur;

var limites_notes;
var panneau_gauche;
var disque;
var bois;
var tete;

var vitesse_rotation_disque = 0;

var couleurs = [0xEA6400,0x0080FF,0xFFCE00,0xFF0019,0x00E7FF];

class scene1 extends Phaser.Scene{
    
    constructor ()
    {
        super("scene1");
        this.pad = null;
    }
    
    preload ()
    {   
        // ******** IMAGES ********
        this.load.image('dude', 'assets/images/dude.png');
        this.load.image('bloc', 'assets/images/platform.png');
        this.load.image('bric', 'assets/images/bric.png');
        this.load.image('bg', 'assets/images/fond_sombre.png');
        this.load.image('power_up', 'assets/images/power_up.png');
        this.load.image('miel', 'assets/images/miel_pot.png');
        this.load.image('gold', 'assets/images/star.png');
        this.load.image('cle', 'assets/images/cle.jpg');
        
        this.load.image('bouton_gauche', 'assets/images/bouton_gauche.png');
        this.load.image('bouton_droit', 'assets/images/bouton_droit.png');

        this.load.image('silhouettes_noir', 'assets/images/silhouettes_noir.png');
        this.load.image('silhouettes_couleur', 'assets/images/silhouettes_couleur.png');
        this.load.image('silhouettes_exterieur', 'assets/images/silhouettes_exterieur.png');

        this.load.image('limites_notes', 'assets/images/limites_notes.png');
        this.load.image('panneau_gauche', 'assets/images/panneau_gauche.png');
        this.load.image('disque', 'assets/images/disque.png');
        this.load.image('bois', 'assets/images/bois.png');
        this.load.image('tete', 'assets/images/tete.png');

        // ******** SONS ********
        //this.load.audio('note', 'assets/audio/Bzz0.m4a');
        //this.load.audio('note', 'assets/audio/do2.wav');
        this.load.audio('note', 'assets/audio/do2_guitare.wav');

        // ******** FONT ********
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
    
    create ()
    {     
        graphics = this.add.graphics();
        
        this.physics.world.setBounds(config.height/2, 0, config.width-config.height/2, config.height);
        
        bg = this.add.sprite(config.width/2, config.height/2, 'bg');
        //bg = this.add.tileSprite(config.height/2+448, 224, 896, 448, 'bg');
        bg.setDepth(-1);

        // largeur d'une colonne -> on soustrait une demie hauteur à la largeur totale puis on divide par le nombre de colonnes
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
        
        WebFont.load({
            google: {
                families: [ 'Limelight' ]
            }
        });

        debugText = this.add.text(103, 208,score, {
            fontFamily: 'Limelight',
            fontSize: '50px',
            padding: { x: 10, y: 5 },
            fill: '#ffffff'
        }).setDepth(10).setInteractive().setAngle(10);
        
        comboText = this.add.text(92, 272,streak, {
            fontFamily: 'Limelight',
            fontSize: '51px',
            padding: { x: 10, y: 5 },
            fill: '#ffffff'
        }).setDepth(10).setInteractive().setAngle(27);
        
        this.input.gamepad.once('down', function (pad, button, index) {
            gamepad = pad;
        }, this);
        
        //tab_notes_entree = [[4,0,0],[5,3,4],[6,1,7],[7,2,4],[8,3,0],[9,3,0],[12,3,7],[12.25,3,7],[12.5,3,7],[12.75,3,0]];
        tab_notes_entree = [[4,0,0],[5,1,2],[6,2,4],[7,3,5],[8,4,7],[8.25,4,7],[8.5,4,7],[8.75,4,7],[9,3,7],[9.25,3,7],[9.5,3,7],[9.75,3,7],[10,4,7],[11,4,7],[12,1,9],[13,0,5],[14,3,12],[15,2,9],[16,1,7],[17,1,7],[18,1,7],[19,1,7],[20,1,7],[21,0,5],[22,0,5],[23,0,5],[24,0,5],[25,2,4],[26,2,4],[27,2,4],[28,2,4],[29,3,2],[30,2,4],[31,3,2],[32,0,0],[33,1,4],[34,4,7],[36,4,7],[37,3,5],[38,3,5],[39,3,5],[40,3,5],[41,2,4],[42,2,4],[43,2,4],[44,2,4],[45,1,2],[46,2,4],[47,1,2],[48,0,0]];
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

        

        bouton_gauche = this.add.sprite(336, 224, 'bouton_gauche').setInteractive().setAlpha(0.00001);
        bouton_droit = this.add.sprite(784, 224, 'bouton_droit').setInteractive().setAlpha(0.00001);
                
        bouton_gauche.on('pointerdown', function (pointer) {
            aller_gauche = true;
            mode_click = true;
        });
        bouton_gauche.on('pointerout', function (pointer) {
            aller_gauche = false;
        });
        bouton_gauche.on('pointerup', function (pointer) {
            aller_gauche = false;
        });
        bouton_droit.on('pointerdown', function (pointer) {
            aller_droite = true;
            mode_click = true;
        });
        bouton_droit.on('pointerout', function (pointer) {
            aller_droite = false;
        });
        bouton_droit.on('pointerup', function (pointer) {
            aller_droite = false;
        });

        silhouettes_noir = this.add.sprite(548, 324, 'silhouettes_noir').setDepth(2);
        silhouettes_couleur = this.add.sprite(548, 324, 'silhouettes_couleur').setDepth(4.5);
        silhouettes_exterieur = this.add.sprite(548, 409, 'silhouettes_exterieur').setDepth(4);

        limites_notes = this.add.sprite(560, 300, 'limites_notes').setDepth(5);
        //panneau_gauche = this.add.sprite(112, 224, 'panneau_gauche').setDepth(9);
        bois = this.add.sprite(0, 224, 'bois').setDepth(8.5);
        disque = this.add.sprite(0, 224, 'disque').setDepth(9);
        tete = this.add.sprite(0, 224, 'tete').setDepth(10);
        tete.setOrigin(187,38);
        tete.angle += 100;
    }
    
    update ()
    {

        /*if (tab_notes_entree.length == 0 && tab_notes_sortie.length == 0)
        {
            setTimeout(function(){textFinal.setText("C'est qui le bogoss \n avec son gros \n score de " + score + " ??? \n " + score_sans_multi + ' notes /' + nombre_notes_total);},0);
        }*/
        
        if (tete.angle >0){tete.angle--;}

        if (timer > 100){
        vitesse_rotation_disque = Math.min(5,vitesse_rotation_disque+0.01);
        disque.angle += vitesse_rotation_disque;
        }

        timer++;

        //dernier_rebond = tab_division[quart_section];
        if(timer2==tab_tempo[0]||timer2==tab_tempo[1]||timer2==tab_tempo[2]||timer2==tab_tempo[3]){dernier_rebond = tab_division[quart_section];ymax_type3_can_change=true;}

        // chaque temps est décomposé en 4 sous-temps, on note dans lequel on se trouve
        if(timer2==tab_tempo[0]){quart_section=0;console.log(quart_section);}
        else if(timer2==tab_tempo[1]){quart_section=1;console.log(quart_section);}
        else if(timer2==tab_tempo[2]){quart_section=2;console.log(quart_section);}
        else if(timer2==tab_tempo[3]){quart_section=3;console.log(quart_section);}

        // les données du temps précédent sont décalés au nouveau temps
        if (timer2 == 0)
        {
            for (let k = 0; k < 4; k++)
            {
                tab_division.shift();
                tab_division.push(1);
            }
        }

        // on vérifie si les notes qui ne sont pas encore arrivées doivent être affichées dans le cas où elles arriveraient dans moins de 3 tempo
        for (var couple of tab_notes_entree)
        {
            if (couple[0]*tempo - timer <= 3*tempo)
            {
                var indic_note = indic_notes.create(limite_gauche+couple[1]*largeur_note,300+3*tempo*vY_indic_notes,'bloc').setScale(largeur_note/400,0.25);//couple[1]*300+150,450,'bloc').setScale(0.5,0.25);
                
                indic_note.setTint(couleurs[couple[1]]);
                indic_note.setDepth(3);
                tab_notes_sortie.push(tab_notes_entree[0]);
                tab_notes_entree.shift();
            }
        }

        // pour chaque note affichée, on augmente sa hauteur jusqu'à ce qu'elle arrive à un certain palier.
        // si le joueur en est suffisament près lorsqu'elle atteint ce palier, la note est jouée et marque un point.
        // dans tous les cas, l'indicateur est détruit.
        children_notes = indic_notes.getChildren();
        
        for (var indic_note of children_notes)
        {
            //indic_note.y -= 0.4 + (750 - indic_note.y)/60;
            indic_note.y -= vY_indic_notes;
            if (indic_note.y <= 300)
            {
                if ( Math.abs(player.x - indic_note.x) <= 67 && player.y > 200)//(Math.pow(Math.pow(player.x - indic_note.x,2)+0.2*Math.pow(player.y - indic_note.y,2),0.5) <= 100)
                {
                    streak++;

                    if (streak >= 15){multiplicateur = 10}
                    else if (streak >= 10){multiplicateur = 6}
                    else if (streak >= 7){multiplicateur = 4}
                    else if (streak >= 3){multiplicateur = 2}
                    else {multiplicateur = 1;}

                    //texte_grossi(debugText);

                    score_sans_multi++;
                    score = score + multiplicateur * 50;
                    game.sound.volume = 1;
                }
                else
                {
                    game.sound.volume = 0.2;
                    streak = 0;
                }
                tonalite = 2*Math.pow(2,(tab_notes_sortie[0][2])/12);
                game.sound.setRate(tonalite);
                note.play(); // let joue_note = 
                indic_note.destroy();
                tab_notes_sortie.shift();
            }
        }
        
        if (streak >= 15){multiplicateur = 10}
        else if (streak >= 10){multiplicateur = 6}
        else if (streak >= 7){multiplicateur = 4}
        else if (streak >= 3){multiplicateur = 2}
        else {multiplicateur = 1;}

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
        
        if (!cursors.up.isDown){bloc_down_allowed = true;}
        if (!cursors.down.isDown){bloc_up_allowed = true;}

        // lorsque le joueur appuie sur 'down', le jeu modifie le type de courbe sur lequel la baguette évolue
        // selon le type de la courbe du quart de temps précédent, le type de la courbe actuelle ne sera pas la même

        if (cursors.down.isDown && bloc_down_allowed)
        {
            if (timer2 == 0)
            {
                tab_division[0] = 2;
            }
            else
            {
                if (dernier_rebond == 2 || dernier_rebond == 3)
                {
                    tab_division[quart_section] = 2;
                }
                else
                {
                    tab_division[quart_section] = 3;
                }
            }
            bloc_up_allowed = false;
            //bloc_down_allowed = false;
            //bloc_present = true;
            //bloc_rebond = murs.create(player.x, player.y - 80, 'bloc');
            //boost_height = player.y;
            //cd_bloc_rebond = 180;
            //player.setBounce(1);
            //player.setVelocityY(-player.body.velocity.y);
        }
        
        
        
        if (cursors.up.isDown && bloc_up_allowed)
        {
            tab_division[quart_section] = 4;
            tab_division[quart_section+1] = 5;
            bloc_down_allowed = false;
        }

        if (aller_gauche)
        {angle = 180; move = true;}
        else if (aller_droite)
        {angle = 0; move = true;}
        else {move = false;}
        
        if(!gamepad_used && !mode_click){
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


        player.y = calcul_hauteur(tab_division[quart_section],timer2,tab_tempo[quart_section]);
        
        console.log(player.y);
        
        /*if (tab_division[0][0]==4)
        {
            console.log(player.y);
        }*/

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

        timer2 = (timer2+1)%tempo;

        debugText.setText(  /*'\n timer : ' + 10*Math.round(timer/10) +
                            '\n player.x0 : ' + 10*Math.round(player.x/10) + '  ***  player.y0 : ' + 10*Math.round(player.y/10) +
                            '\n player.Vx0 : ' + 10*Math.round(vX0/10) + '  ***  player.Vy0 : ' + 10*Math.round(vY0/10) +
                            '\n player.Vx1 : ' + 10*Math.round(vX1/10) + '  ***  player.Vy1 : ' + 10*Math.round(vY1/10) +
                            '\n player.Accx : ' + 10*Math.round(player.body.acceleration.x/10) + '  ***  player.Accy : ' + 10*Math.round(player.body.acceleration.y/10) +
                            '\n*/ score);

        comboText.setText(  /*'\n timer : ' + 10*Math.round(timer/10) +
        '\n player.x0 : ' + 10*Math.round(player.x/10) + '  ***  player.y0 : ' + 10*Math.round(player.y/10) +
        '\n player.Vx0 : ' + 10*Math.round(vX0/10) + '  ***  player.Vy0 : ' + 10*Math.round(vY0/10) +
        '\n player.Vx1 : ' + 10*Math.round(vX1/10) + '  ***  player.Vy1 : ' + 10*Math.round(vY1/10) +
        '\n player.Accx : ' + 10*Math.round(player.body.acceleration.x/10) + '  ***  player.Accy : ' + 10*Math.round(player.body.acceleration.y/10) +
        '\n*/ 'X' + multiplicateur);
    }

}

function calcul_hauteur(type,t,t0)
{
    let ymax;
    let delta;
    console.log("type=",type);
    // le type 2 correspond à un rebond de petite taille à un tempo 4 fois plus rapide que celui de base
    if(type==2)
    {
        ymax = y_mid;
        if (quart_section==3){delta = tempo - tab_tempo[quart_section];}
        else {delta = tab_tempo[quart_section+1] - tab_tempo[quart_section];}
        console.log("delta",delta);
        return 4*(y_sol-ymax)*(t-t0)*(((t-t0)/delta-1)/delta)+y_sol;
    }
    //calcul_hauteur(timer2/tab_division[0][0],0,tempo/tab_division[0][0],tab_division[0][1]);
    //calcul_hauteur(t,t0,delta,ymax)
    //4*(y_sol-ymax)*(t-t0)*(((t-t0)/delta-1)/delta)+y_sol;

    // le type 1 correspond à un rebond de grande taille; il est d'une largeur telle qu'il retombe sur un temps. 
    else if(type==1)
    {
        let pos_plus_proche_type23;
        ymax = y_top0;
        if (quart_section == 0){pos_plus_proche_type23=-1;}
        else if (quart_section == 1)
        {
            if (tab_division[0]==1){pos_plus_proche_type23=-1;}
            else {pos_plus_proche_type23=0;}
        }
        else if (quart_section == 2)
        {
            if (tab_division[1]==1 && tab_division[0]==1){pos_plus_proche_type23=-1;}
            else if (tab_division[1]==1){pos_plus_proche_type23=0;}
            else {pos_plus_proche_type23=1;}
        }
        else if (quart_section == 3)
        {
            if (tab_division[2]==1 && tab_division[1]==1 && tab_division[0]==1){pos_plus_proche_type23=-1;}
            else if (tab_division[2]==1 && tab_division[1]==1){pos_plus_proche_type23=0;}
            else if (tab_division[2]==1){pos_plus_proche_type23=1;}
            else {pos_plus_proche_type23=2;}
        }
        if (pos_plus_proche_type23==-1){t0=0;delta=tempo;}
        else {t0=tab_tempo[pos_plus_proche_type23+1];delta=tempo-tab_tempo[pos_plus_proche_type23+1];}
        return 4*(y_sol-ymax)*(t-t0)*(((t-t0)/delta-1)/delta)+y_sol;
    }

    // le type 3 correspond à une transition entre un type 1 et un type 2, dans ce sens uniquement. Un type 4 correspondant 
    // au sens inverse serait nécessaire pour une meilleure réactivité.
    else if(type==3)
    {
        if(ymax_type3_can_change){ymax_type3 = player.y;ymax_type3_can_change=false;}
        if (quart_section==3){delta = tempo - tab_tempo[quart_section];}
        else {delta = tab_tempo[quart_section+1] - tab_tempo[quart_section];}
        if (quart_section==3){return y_sol + (ymax_type3 - y_sol) * (t - tempo)/(tab_tempo[quart_section] - tempo);}
        else {return y_sol + (ymax_type3 - y_sol) * (t - tab_tempo[quart_section+1])/(tab_tempo[quart_section] - tab_tempo[quart_section+1]);}

        /*if (quart_section==3){console.log("div **",ymax_type3 * (t - tempo)/(timer2 - tempo));return ymax_type3 * (t - tempo)/(tab_tempo[quart_section] - tempo);}
        else {console.log("div ++",(timer2 - (tab_tempo[quart_section+1]-1)));console.log("quart_section",quart_section);console.log("(t - (tab_tempo[quart_section+1]-1))",(t - (tab_tempo[quart_section+1]-1)));return ymax_type3 * (t - (tab_tempo[quart_section+1]-1))/(tab_tempo[quart_section] - (tab_tempo[quart_section+1]-1));}
    */}

    // le type 4 correspond à un maintien en l'air
    else if(type==4)
    {
        return player.y;
    }

    // le type 5 correspond à une transition d'un type 4 à un type 1, c'est une demi-parabole
    else if(type==5)
    {
        let pos_plus_proche_type23;
        ymax = player.y;
        if (quart_section == 0){pos_plus_proche_type23=-1;}
        else if (quart_section == 1)
        {
            if (tab_division[0]==1){pos_plus_proche_type23=-1;}
            else {pos_plus_proche_type23=0;}
        }
        else if (quart_section == 2)
        {
            if (tab_division[1]==1 && tab_division[0]==1){pos_plus_proche_type23=-1;}
            else if (tab_division[1]==1){pos_plus_proche_type23=0;}
            else {pos_plus_proche_type23=1;}
        }
        else if (quart_section == 3)
        {
            if (tab_division[2]==1 && tab_division[1]==1 && tab_division[0]==1){pos_plus_proche_type23=-1;}
            else if (tab_division[2]==1 && tab_division[1]==1){pos_plus_proche_type23=0;}
            else if (tab_division[2]==1){pos_plus_proche_type23=1;}
            else {pos_plus_proche_type23=2;}
        }
        if (pos_plus_proche_type23==-1){t0=0;delta=tempo;}
        else {t0=tab_tempo[pos_plus_proche_type23+1];delta=2*(tempo-tab_tempo[pos_plus_proche_type23+1]);}
        console.log("delta",delta);
        console.log("pos_plus_proche_type23",pos_plus_proche_type23);
        return 4*(y_sol-ymax)*(t+delta/2-t0)*(((t+delta/2-t0)/delta-1)/delta)+y_sol;
    }
}

function draw_baton(x,y,alpha)
{
    let x0 = getX0(x,y);
    let y0 = getY0(x,y);
    
    let distAB = Math.pow(Math.pow(x0-x,2)+Math.pow(y0-y,2),1/2);
    
    //Affichage de l'extremite eloignee
    graphics.fillStyle(0xFFFCF8, alpha);
    graphics.fillCircle(x0,y0,radius0).setDepth(5);
    
    //Affichage de la baguette
    let poly = new Phaser.Geom.Polygon();

    poly.setTo([ new Phaser.Geom.Point(x-radius2*(y0-y)/distAB, y+radius2*(x0-x)/distAB), new Phaser.Geom.Point(x0-radius0*(y0-y)/distAB, y0+radius0*(x0-x)/distAB), new Phaser.Geom.Point(x0+radius0*(y0-y)/distAB, y0-radius0*(x0-x)/distAB), new Phaser.Geom.Point(x+radius2*(y0-y)/distAB, y-radius2*(x0-x)/distAB) ]);
    graphics.fillStyle(0xFFFCF8, alpha);
    graphics.fillPoints(poly.points, true).setDepth(5);
    
    //Affichage de l'extremite proche 1
    graphics.fillStyle(0x1D1D1B, alpha);
    graphics.fillCircle(x,y,radius2).setDepth(5);

    //Affichage de l'extremite proche 2
    graphics.fillStyle(0xFFFCF8, alpha);
    graphics.fillCircle(x,y,radius2-2).setDepth(5);
    
    //Affichage de l'extremite proche 3
    graphics.fillStyle(0x1D1D1B, alpha);
    graphics.fillCircle(x,y,radius3).setDepth(5);
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

function texte_grossi(texte)
{
    //for (let k = 0; k < 100; k++) {
        texte.setFontSize(texte.fontSize + 2 + 'px');
    //}
}