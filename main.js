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

//var bg;
var bg0;
var bg1;
var bg2;
var bg3;
var bg4;

var murs;
var brics;
var murVertical;
var murVertical1;

var bloc_down_allowed;
var bloc_up_allowed;
var bloc_present;

var boost_height = 225;

var bloc_rebond;

var golds;

var power_up;
var power_up_collected;

var image_red;

var miels;

var start = true;

var debugText0;
var debugText2;
var debugText3;

var score_sans_multi;
var score;
var multiplicateur;
var streak;

var text = "";
var text0 = "";
var tab_timer = [];
var text2 = "";

var tab_notes_entree;
var tab_notes_sortie;
var tab_notes_effet;
var timer;

var tonalite;
var tempo = 36;

var indic_notes;
var children_notes;

var y_sol = 250;
var y_mid = 180;
var y_top0 = 50;
var y_top;

var ymax_type3;
var ymax_type3_can_change = true;

var timer2;
var division = 1;
//var tab_division = [[1,y_top0],[1,y_top0],[1,y_top0],[1,y_top0],[1,y_top0],[1,y_top0],[1,y_top0],[1,y_top0]];
var tab_division;
//var tab_tempo = [[0*tempo/4,1*tempo/4-1],[1*tempo/4,2*tempo/4-1],[2*tempo/4,3*tempo/4-1],[3*tempo/4,4*tempo/4-1]];
var tab_tempo = [Math.floor(0*tempo/4),Math.floor(1*tempo/4),Math.floor(2*tempo/4),Math.floor(3*tempo/4)];
var quart_section;
var dernier_rebond;

var vY_indic_notes = 1;

var trombone;
var saxophone;
var guitare;
var contrebasse;
var trompette;

var nombre_notes_total;

var textFinal;

var scoreText;
var sizeFontScore = 50;
var comboText;
var sizeFontCombo = 51;

var bouton_gauche;
var aller_gauche;
var bouton_droit;
var aller_droite;
var mode_click;

var silhouettes_noir;
var silhouettes_couleur;
var silhouettes_exterieur;

var limites_notes;
var limites_notes_int;
var panneau_gauche;
var disque;
var bois;
var tete;

var cd_erreur;

var vitesse_rotation_disque;
var debut_morceau;
var milieu_morceau;
var fin_morceau;

var couleurs = [0xEA6400,0x0080FF,0xFFCE00,0xFF0019,0x00E7FF];
var emitter0;
var FX1;
var FX2;
var FX3;
var FX4;
var FX5;
var FXs;

var disque_debut;
var disque_milieu;
var disque_fin;

var crowd;

class main extends Phaser.Scene{
    
    constructor ()
    {
        super("main");
        this.pad = null;
    }
    
    preload ()
    {   

        // ******** IMAGES ********
        this.load.image('bloc', 'assets/images/note_strillee.png');
        //this.load.image('bg', 'assets/images/fond_sombre.png');
        this.load.image('bg0', 'assets/images/fond_sombre0.png');
        this.load.image('bg1', 'assets/images/fond_sombre1.png');
        this.load.image('bg2', 'assets/images/fond_sombre2.png');
        this.load.image('bg3', 'assets/images/fond_sombre3.png');
        this.load.image('bg4', 'assets/images/fond_sombre4.png');
        
        this.load.image('bouton_gauche', 'assets/images/bouton_gauche.png');
        this.load.image('bouton_droit', 'assets/images/bouton_droit.png');

        this.load.image('silhouettes_noir', 'assets/images/silhouettes_noir.png');
        this.load.image('silhouettes_couleur', 'assets/images/silhouettes_couleur.png');
        this.load.image('silhouettes_exterieur', 'assets/images/silhouettes_exterieur.png');

        this.load.image('limites_notes', 'assets/images/limites_notes.png');
        this.load.image('limites_notes_int', 'assets/images/limites_notes_int.png');
        this.load.image('panneau_gauche', 'assets/images/panneau_gauche.png');
        this.load.image('disque', 'assets/images/disque.png');
        this.load.image('bois', 'assets/images/bois.png');
        this.load.image('tete', 'assets/images/tete.png');

        // ******** FX ********
        this.load.image('FX1', 'assets/images/FX1.png');
        this.load.image('FX2', 'assets/images/FX2.png');
        this.load.image('FX3', 'assets/images/FX3.png');
        this.load.image('FX4', 'assets/images/FX4.png');
        this.load.image('FX5', 'assets/images/FX5.png');

        // ******** SONS ********
        //this.load.audio('note', 'assets/audio/Bzz0.m4a');
        //this.load.audio('note', 'assets/audio/do2.wav');
        this.load.audio('trombone', 'assets/audio/la3diese_trompette.wav');
        this.load.audio('saxophone', 'assets/audio/do2_saxophone.wav');
        this.load.audio('guitare', 'assets/audio/do2_guitare.wav');
        this.load.audio('contrebasse', 'assets/audio/si1_contrebasse.wav');
        this.load.audio('trompette', 'assets/audio/la3diese_trompette.wav');

        this.load.audio('disque_debut', 'assets/audio/disque_debut.wav');
        this.load.audio('disque_milieu', 'assets/audio/disque_milieuDB3.mp3');
        this.load.audio('disque_fin', 'assets/audio/disque_fin.wav');
        
        this.load.audio('crowd', 'assets/audio/crowd.wav');

        // ******** FONT ********
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
    
    create ()
    {    
        timer = 0;
        timer2 = 0;
        tab_division = [1,1,1,1,1,1,1,1];
        quart_section = 0;
        tonalite = 1;
        dernier_rebond = 1;
        bloc_down_allowed = true;
        bloc_up_allowed = true;
        bloc_present = false;
        vitesse_rotation_disque = 0;
        aller_gauche = false;
        bouton_droit;
        aller_droite = false;
        mode_click = false;
        
        debut_morceau = true;
        milieu_morceau = true;
        fin_morceau = true;
        cd_erreur = 0;

        score_sans_multi = 0;
        score = 0;
        multiplicateur = 1;
        streak = 0;

        graphics = this.add.graphics();
        
        this.physics.world.setBounds(config.height/2, 0, config.width-config.height/2, config.height);
        
        //bg = this.add.sprite(config.width/2+400, config.height/2, 'bg');
        //bg.setDepth(-1);

        bg0 = this.add.sprite(config.width/2+150, config.height/2, 'bg0').setDepth(-0.5).setScale(1.1);
        bg1 = this.add.sprite(config.width/2, config.height/2, 'bg1').setDepth(-1).setScale(1.1);
        bg2 = this.add.sprite(config.width/2, config.height/2, 'bg2').setDepth(-2).setScale(1.07);
        bg3 = this.add.sprite(config.width/2, config.height/2, 'bg3').setDepth(-3).setScale(1.03);
        bg4 = this.add.sprite(config.width/2, config.height/2, 'bg4').setDepth(-4).setScale(1.0);

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
        
        trombone = this.sound.add("trombone");
        saxophone = this.sound.add("saxophone");
        guitare = this.sound.add("guitare");
        contrebasse = this.sound.add("contrebasse");
        trompette = this.sound.add("trompette");

        disque_debut = this.sound.add("disque_debut");
        //disque_milieu = this.sound.add("disque_milieu",{ loop: true });
        disque_fin = this.sound.add("disque_fin");

        crowd = this.sound.add("crowd");
        
        WebFont.load({
            google: {
                families: [ 'Limelight' ]
            }
        });

        scoreText = this.add.text(103, 208,score, {
            fontFamily: 'Limelight',
            fontSize: sizeFontScore+'px',
            padding: { x: 10, y: 5 },
            fill: '#ffffff'
        }).setDepth(10).setInteractive().setAngle(10);
        
        comboText = this.add.text(92, 272,multiplicateur, {
            fontFamily: 'Limelight',
            fontSize: sizeFontCombo+'px',
            padding: { x: 10, y: 5 },
            fill: '#ffffff'
        }).setDepth(10).setInteractive().setAngle(27);
        
        this.input.gamepad.once('down', function (pad, button, index) {
            gamepad = pad;
        }, this);
        
        //tab_notes_entree = [[4,0,0],[5,3,4],[6,1,7],[7,2,4],[8,3,0],[9,3,0],[12,3,7],[12.25,3,7],[12.5,3,7],[12.75,3,0]];
        //tab_notes_entree = [[4,0,0],[5,1,2],[6,2,4],[7,3,5],[8,4,7],[8.25,4,7],[8.5,4,7],[8.75,4,7],[9,3,7],[9.25,3,7],[9.5,3,7],[9.75,3,7],[10,4,7],[11,4,7],[12,1,9],[13,0,5],[14,3,12],[15,2,9],[16,1,7],[17,1,7],[18,1,7],[19,1,7],[20,1,7],[21,0,5],[22,0,5],[23,0,5],[24,0,5],[25,2,4],[26,2,4],[27,2,4],[28,2,4],[29,3,2],[30,2,4],[31,3,2],[32,0,0],[33,1,4],[34,4,7],[36,4,7],[37,3,5],[38,3,5],[39,3,5],[40,3,5],[41,2,4],[42,2,4],[43,2,4],[44,2,4],[45,1,2],[46,2,4],[47,1,2],[48,0,0]];
        //tab_notes_entree = [[4,0,0],[5,1,2],[6,2,4],[7,3,5],[8,2,7],[8.5,2,6],[9,2,7],[9.5,2,6],[10,2,7]];
        
        tab_notes_entree = [[6,1,4],[7,1,7],[8,0,4],[9,0,0],[10,1,2],[11,1,2],[12,0,0],[13,1,-3],[14,3,-8],[15,3,-8],[16,3,-5],[17,3,-8],[18,3,-5],[19,3,-4],[20,3,-3],[21,3,-1],[22,1,4],[23,1,7],[24,0,4],[25,0,0],[26,1,9],[27,1,9],[28,0,7],[29,1,8],[30,2,8],[30.25,2,8],[30.5,2,7],[30.75,2,5],[31,2,8],[31.25,2,8],[31.5,2,7],[31.75,2,5],[32,3,8],[32.25,3,8],[32.5,3,5],[32.75,3,7],[33,3,8],[33.25,3,8],[33.5,3,5],[33.75,3,7],[34,3,4],[35,3,4],[36,3,7],[37,2,0],[38,4,9],[39,0,7],[40,4,9],[41,0,7],[42,0,8],[42.25,0,7],[42.5,0,8],[42.75,0,7],[43,0,8],[44,1,8],[44.25,1,7],[44.5,1,8],[44.75,1,10],[45,1,8],[46,2,4],[47,3,2],[48,2,0],[49,2,-3],[50,3,0],[50.25,3,0],[50.5,3,0],[50.75,3,0],[51,2,4],[51.25,2,4],[51.5,2,4],[51.75,2,4],[52,1,7],[52.25,1,4],[52.5,1,7],[52.75,1,4],[53,1,7],[53.25,1,4],[53.5,1,7],[53.75,1,4],[54,1,7]];

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

        comboText.setText(multiplicateur);

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
        limites_notes_int = this.add.sprite(560, 300, 'limites_notes_int').setDepth(5).setAlpha(0.5);
        //panneau_gauche = this.add.sprite(112, 224, 'panneau_gauche').setDepth(9);
        bois = this.add.sprite(0, 224, 'bois').setDepth(8.5);
        disque = this.add.sprite(0, 224, 'disque').setDepth(9);
        tete = this.add.sprite(0, 224, 'tete').setDepth(10);
        tete.setOrigin((224+187)/447,38/447);
        tete.x = 187;
        tete.y = 38;
        tete.angle += 90;

        FX1 = this.add.particles('FX1').createEmitter({
            x: 370,
            y: 240,
            speed: { min: 400, max: 550 },
            angle: { min: 280, max: 320 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'SCREEN',
            //active: false,
            lifespan: 600,
            gravityY: 800
        });
        FX1.explode();
        FX2 = this.add.particles('FX2').createEmitter({
            x: 485,
            y: 250,
            speed: { min: 300, max: 600 },
            angle: { min: 255, max: 295 },
            scale: { start: 0.5, end: 0 },
            rotate: {start: 0, end: 180 },
            blendMode: 'SCREEN',
            gravityY: 1800,
            //active: false,
            lifespan: 600,
            gravityY: 800
        });
        FX2.explode();
        FX3 = this.add.particles('FX3').createEmitter({
            x: 600,
            y: 250,
            speed: { min: 400, max: 600 },
            angle: { min: 250, max: 290 },
            scale: { start: 0.5, end: 0 },
            rotate: {start: 0, end: 180 },
            blendMode: 'SCREEN',
            //active: false,
            lifespan: 600,
            gravityY: 800
        });
        FX3.explode();
        FX4 = this.add.particles('FX4').createEmitter({
            x: 700,
            y: 250,
            speed: { min: 400, max: 600 },
            angle: { min: 250, max: 280 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'SCREEN',
            //active: false,
            lifespan: 600,
            gravityY: 800
        });
        FX4.explode();
        FX5 = this.add.particles('FX5').createEmitter({
            x: 780,
            y: 250,
            speed: { min: 400, max: 600 },
            angle: { min: 220, max: 260 },
            scale: { start: 0.5, end: 0 },
            rotate: {start: 0, end: 180 },
            blendMode: 'SCREEN',
            //active: false,
            lifespan: 600,
            gravityY: 800
        });
        FX5.explode();

        FXs = [FX1,FX2,FX3,FX4,FX5];
    }
    
    update ()
    {

        /*if (tab_notes_entree.length == 0 && tab_notes_sortie.length == 0)
        {
            setTimeout(function(){textFinal.setText("C'est qui le bogoss \n avec son gros \n score de " + score + " ??? \n " + score_sans_multi + ' notes /' + nombre_notes_total);},0);
        }*/
        
        // Gestion de la rotation de la tete
        if (tete.angle >0 ){tete.angle--;}
        else if (tete.angle <0 ){tete.angle++;}
        if(cd_erreur){tete.angle += Math.floor(Math.random()*11-5);}

        if (vitesse_rotation_disque == 0 && debut_morceau)
        {
            disque_debut.play();
            setTimeout(()=>{debut_morceau=false;},10000);
        }
        else if (vitesse_rotation_disque < 4.2 && !debut_morceau && fin_morceau)
        {
            
        }
        
        //else if (milieu_morceau && timer%600==0 && !(tab_notes_entree.length == 0 && tab_notes_sortie.length == 0)){disque_milieu.play();}

        // Gestion de la rotation du disque
        // -> Acceleration du disque au debut puis vitesse constante
        if (timer > 100 && !(tab_notes_entree.length == 0 && tab_notes_sortie.length == 0))
        {
            vitesse_rotation_disque = Math.min(6.28,vitesse_rotation_disque+0.1);
            disque.angle += vitesse_rotation_disque;
        }
        // -> Deceleration du disque a la fin
        if (tab_notes_entree.length == 0 && tab_notes_sortie.length == 0)
        {
            vitesse_rotation_disque = Math.max(0,vitesse_rotation_disque-0.03);
            disque.angle += vitesse_rotation_disque;
            if(fin_morceau){
                fin_morceau=false;
                //disque_fin.play();
                setTimeout(()=>{game.sound.setVolume(1);game.sound.setRate(1.5);crowd.play();},1500);
                setTimeout(()=>{game.scene.start("menu");game.scene.stop("main")},6000);
            }
        }

        // Mouvement des spectateurs en fonction de la valeur du combo
        bg1.x+=(config.width/2+170-bg1.x)*0.4;
        bg1.y+=(config.height/2+5-bg1.y)*0.4;

        if(timer%5==0)
        {
            bg1.x += Math.floor(Math.random()*3-1)*Math.floor(Math.random()*multiplicateur);
            bg1.y += Math.floor(Math.random()*3-1)*Math.floor(Math.random()*multiplicateur*2);
        }

        bg2.x+=(config.width/2+170-bg2.x)*0.4;
        bg2.y+=(config.height/2-5-bg2.y)*0.4;

        if(timer%6==0)
        {
            bg2.x += Math.floor(Math.random()*3-1)*Math.floor(Math.random()*multiplicateur);
            bg2.y += Math.floor(Math.random()*3-1)*Math.floor(Math.random()*multiplicateur*2);
        }

        bg3.x+=(config.width/2+170-bg3.x)*0.4;
        bg3.y+=(config.height/2-10-bg3.y)*0.4;

        if(timer%7==0)
        {
            bg3.x += Math.floor(Math.random()*3-1)*Math.floor(Math.random()*multiplicateur);
            bg3.y += Math.floor(Math.random()*3-1)*Math.floor(Math.random()*multiplicateur*2);
        }

        bg4.x+=(config.width/2+170-bg4.x)*0.4;
        bg4.y+=(config.height/2-15-bg4.y)*0.4;

        if(timer%8==0)
        {
            bg4.x += Math.floor(Math.random()*3-1)*Math.floor(Math.random()*multiplicateur);
            bg4.y += Math.floor(Math.random()*3-1)*Math.floor(Math.random()*multiplicateur*2);
        }

        cd_erreur = Math.max(0,cd_erreur-1);

        timer++;

        //dernier_rebond = tab_division[quart_section];
        if(timer2==tab_tempo[0]||timer2==tab_tempo[1]||timer2==tab_tempo[2]||timer2==tab_tempo[3]){dernier_rebond = tab_division[quart_section];ymax_type3_can_change=true;}

        // Chaque temps est d??compos?? en 4 sous-temps, on note dans lequel on se trouve
        if(timer2==tab_tempo[0]){quart_section=0;}
        else if(timer2==tab_tempo[1]){quart_section=1;}
        else if(timer2==tab_tempo[2]){quart_section=2;}
        else if(timer2==tab_tempo[3]){quart_section=3;}

        // Les donn??es du temps pr??c??dent sont d??cal??s au nouveau temps
        if (timer2 == 0)
        {
            for (let k = 0; k < 4; k++)
            {
                tab_division.shift();
                tab_division.push(1);
            }
        }

        // On v??rifie si les notes qui ne sont pas encore arriv??es doivent ??tre affich??es dans le cas o?? elles arriveraient dans moins de 3 tempo
        for (var couple of tab_notes_entree)
        {
            if ((couple[0]+2)*tempo - timer <= 3*tempo)
            {
                var indic_note = indic_notes.create(limite_gauche+couple[1]*largeur_note,300+4*tempo*vY_indic_notes,'bloc').setScale(largeur_note/124,1);//couple[1]*300+150,450,'bloc').setScale(0.5,0.25);
                
                indic_note.setTint(couleurs[couple[1]]);
                indic_note.setDepth(3);
                tab_notes_sortie.push(tab_notes_entree[0]);
                tab_notes_entree.shift();
            }
        }

        // Pour chaque note affich??e, on augmente sa hauteur jusqu'?? ce qu'elle arrive ?? un certain palier.
        // Si le joueur en est suffisament pr??s lorsqu'elle atteint ce palier, la note est jou??e et marque un point.
        // Dans tous les cas, l'indicateur est d??truit.
        children_notes = indic_notes.getChildren();
        
        for (var indic_note of children_notes)
        {
            if (indic_note.y > 300)
            {
                //indic_note.y -= 0.4 + (750 - indic_note.y)/60;
                indic_note.y -= vY_indic_notes;
                if (indic_note.y <= 300)
                {
                    indic_note.setDepth(7);
                    if ( Math.abs(player.x - indic_note.x) <= 67 && player.y > 160)//(Math.pow(Math.pow(player.x - indic_note.x,2)+0.2*Math.pow(player.y - indic_note.y,2),0.5) <= 100)
                    {
                        streak++;

                        if (streak >= 15){multiplicateur = 10}
                        else if (streak >= 10){multiplicateur = 6}
                        else if (streak >= 7){multiplicateur = 4}
                        else if (streak >= 3){multiplicateur = 2}
                        else {multiplicateur = 1;}

                        texte_grossi(scoreText);
                        //coreText.setFontSize(200);
                        score_sans_multi++;
                        score += multiplicateur * 50;
                        game.sound.volume = 1;
                        //console.log('tab_notes_sortie[0][1]',tab_notes_sortie[0][1]);
                        (FXs[tab_notes_sortie[0][1]]).explode();
                        (FXs[tab_notes_sortie[0][1]]).explode();
                        (FXs[tab_notes_sortie[0][1]]).explode();
                        (FXs[tab_notes_sortie[0][1]]).explode();
                        cd_erreur = 0;
                    }
                    else
                    {
                        game.sound.volume = 0.2;
                        streak = 0;
                        indic_note.destroy();
                        //this.cameras.main.shake(200,0.01);
                        cd_erreur = 30;
                    }
                    if (tab_notes_sortie[0][1]==0)
                    {
                        tonalite = 2*Math.pow(2,(2+tab_notes_sortie[0][2]-12)/12);
                        game.sound.setRate(tonalite);
                        guitare.stop();
                        contrebasse.stop();
                        trombone.play(); // let joue_note = 
                    }
                    else if (tab_notes_sortie[0][1]==1)
                    {
                        tonalite = 2*Math.pow(2,(tab_notes_sortie[0][2]-12)/12);
                        game.sound.setRate(tonalite);
                        guitare.stop();
                        contrebasse.stop();
                        trompette.stop();
                        saxophone.play(); // let joue_note = 
                    }
                    else if (tab_notes_sortie[0][1]==2)
                    {
                        tonalite = 2*Math.pow(2,(tab_notes_sortie[0][2]-0.4-12)/12);
                        game.sound.setRate(tonalite);
                        contrebasse.stop();
                        trompette.stop();
                        guitare.play(); // let joue_note = 
                    }
                    else if (tab_notes_sortie[0][1]==3)
                    {
                        tonalite = 2*Math.pow(2,(1+tab_notes_sortie[0][2]-0.6-12)/12);
                        game.sound.setRate(tonalite);
                        guitare.stop();
                        trompette.stop();
                        contrebasse.play(); // let joue_note = 
                    }
                    else
                    {
                        tonalite = 2*Math.pow(2,(2+tab_notes_sortie[0][2]-12)/12);
                        game.sound.setRate(tonalite);
                        guitare.stop();
                        contrebasse.stop();
                        trompette.play(); // let joue_note = 
                    }
                    tab_notes_sortie.shift();        
                                
                }
            }
            else
            {
                indic_note.scaleX *= 1.02;
                indic_note.scaleY *= 1.08;
                indic_note.alpha *= 0.96;
                if (indic_note.alpha < 0.3){indic_note.destroy();}
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
        
        if (!cursors.up.isDown){bloc_down_allowed = true;}
        if (!cursors.down.isDown){bloc_up_allowed = true;}

        // Lorsque le joueur appuie sur 'down', le jeu modifie le type de courbe sur lequel la baguette ??volue
        // Selon le type de la courbe du quart de temps pr??c??dent, le type de la courbe actuelle ne sera pas la m??me

        if (cursors.down.isDown && bloc_down_allowed && !mode_click)
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
        }    
        
        if (cursors.up.isDown && bloc_up_allowed && !mode_click)
        {
            tab_division[quart_section] = 4;
            tab_division[quart_section+1] = 5;
            bloc_down_allowed = false;
        }

        
        if (aller_gauche && aller_droite)
        {
            move = false;
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
        }
        else if (aller_gauche)
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
        
        vX0 = vX1;
        vX1 = player.body.velocity.x;
        vY0 = vY1;
        vY1 = player.body.velocity.y;

        y_top = tab_division[0][1];

        player.y = calcul_hauteur(tab_division[quart_section],timer2,tab_tempo[quart_section]);
        
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

        // Mise a jour affichage score et combo
        scoreText.setText(score);
        comboText.setText('X' + multiplicateur);

        if (cursors.restart.isDown)
        {this.scene.restart();}
    }

}

function calcul_hauteur(type,t,t0)
{
    let ymax;
    let delta;
    //console.log("type=",type);
    // le type 2 correspond ?? un rebond de petite taille ?? un tempo 4 fois plus rapide que celui de base
    if(type==2)
    {
        ymax = y_mid;
        if (quart_section==3){delta = tempo - tab_tempo[quart_section];}
        else {delta = tab_tempo[quart_section+1] - tab_tempo[quart_section];}
        //console.log("delta",delta);
        return 4*(y_sol-ymax)*(t-t0)*(((t-t0)/delta-1)/delta)+y_sol;
    }
    //calcul_hauteur(timer2/tab_division[0][0],0,tempo/tab_division[0][0],tab_division[0][1]);
    //calcul_hauteur(t,t0,delta,ymax)
    //4*(y_sol-ymax)*(t-t0)*(((t-t0)/delta-1)/delta)+y_sol;

    // le type 1 correspond ?? un rebond de grande taille; il est d'une largeur telle qu'il retombe sur un temps. 
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

    // le type 3 correspond ?? une transition entre un type 1 et un type 2, dans ce sens uniquement. Un type 4 correspondant 
    // au sens inverse serait n??cessaire pour une meilleure r??activit??.
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

    // le type 4 correspond ?? un maintien en l'air
    else if(type==4)
    {
        return player.y;
    }

    // le type 5 correspond ?? une transition d'un type 4 ?? un type 1, c'est une demi-parabole
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
        //console.log("delta",delta);
        //console.log("pos_plus_proche_type23",pos_plus_proche_type23);
        return 4*(y_sol-ymax)*(t+delta/2-t0)*(((t+delta/2-t0)/delta-1)/delta)+y_sol;
    }
}

function draw_baton(x,y,alpha)
{
    let x0 = getX0(x,y);
    let y0 = getY0(x,y);

    let x1 = x + 0.45*(x0-x);
    let y1 = y + 0.45*(y0-y);
    let radius0b = radius0 + 0.55 * (radius2 - radius0);
    let x2 = x + 0.2*(x0-x);
    let y2 = y + 0.2*(y0-y);
    let radius0c = radius0 + 0.85 * (radius2 - radius0);
    
    let distAB = Math.pow(Math.pow(x0-x1,2)+Math.pow(y0-y1,2),1/2);
    let distBC = Math.pow(Math.pow(x1-x2,2)+Math.pow(y1-y2,2),1/2);
    let distCD = Math.pow(Math.pow(x2-x,2)+Math.pow(y2-y,2),1/2);

    //Affichage de l'extremite eloignee
    graphics.fillStyle(0xFFFCF8, alpha);
    graphics.fillCircle(x0,y0,radius0).setDepth(5);
    
    //Affichage de la baguette
    let poly = new Phaser.Geom.Polygon();

    poly.setTo([ new Phaser.Geom.Point(x1-radius0b*(y0-y1)/distAB, y1+radius0b*(x0-x1)/distAB), new Phaser.Geom.Point(x0-radius0*(y0-y1)/distAB, y0+radius0*(x0-x1)/distAB), new Phaser.Geom.Point(x0+radius0*(y0-y1)/distAB, y0-radius0*(x0-x1)/distAB), new Phaser.Geom.Point(x1+radius0b*(y0-y1)/distAB, y1-radius0b*(x0-x1)/distAB) ]);
    graphics.fillStyle(0xFFFCF8, alpha);
    graphics.fillPoints(poly.points, true).setDepth(5);
    
    graphics.fillStyle(0x1D1D1B, alpha);
    graphics.fillCircle(x1,y1,radius0b).setDepth(5);

    let poly1 = new Phaser.Geom.Polygon();

    poly1.setTo([ new Phaser.Geom.Point(x2-radius0c*(y1-y2)/distBC, y2+radius0c*(x1-x2)/distBC), new Phaser.Geom.Point(x1-radius0b*(y1-y2)/distBC, y1+radius0b*(x1-x2)/distBC), new Phaser.Geom.Point(x1+radius0b*(y1-y2)/distBC, y1-radius0b*(x1-x2)/distBC), new Phaser.Geom.Point(x2+radius0c*(y1-y2)/distBC, y2-radius0c*(x1-x2)/distBC) ]);
    graphics.fillStyle(0x1D1D1B, alpha);
    graphics.fillPoints(poly1.points, true).setDepth(5);

    graphics.fillStyle(0xFFFCF8, alpha);
    graphics.fillCircle(x2,y2,radius0c).setDepth(5);

    let poly2 = new Phaser.Geom.Polygon();

    poly2.setTo([ new Phaser.Geom.Point(x-radius2*(y2-y)/distCD, y+radius2*(x2-x)/distCD), new Phaser.Geom.Point(x2-radius0c*(y2-y)/distCD, y2+radius0c*(x2-x)/distCD), new Phaser.Geom.Point(x2+radius0c*(y2-y)/distCD, y2-radius0c*(x2-x)/distCD), new Phaser.Geom.Point(x+radius2*(y2-y)/distCD, y-radius2*(x2-x)/distCD) ]);
    graphics.fillStyle(0xFFFCF8, alpha);
    graphics.fillPoints(poly2.points, true).setDepth(5);

    //Affichage de l'extremite proche 1
    graphics.fillStyle(0x1D1D1B, alpha);
    graphics.fillCircle(x,y,radius2+2).setDepth(5);

    //Affichage de l'extremite proche 2
    graphics.fillStyle(0xFFFCF8, alpha);
    graphics.fillCircle(x,y,radius2-2).setDepth(5);
    
    //Affichage de l'extremite proche 3
    graphics.fillStyle(0x1D1D1B, alpha);
    graphics.fillCircle(x,y,radius3).setDepth(5);
}

function getX0(x,y)
{
    return 120+decalage*x/276+448*(1-decalage/276);
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
    for (let k = 0; k < 5; k++) {
        setTimeout(function(){texte.setFontSize(sizeFontScore+5*k);},k*2);
        setTimeout(function(){texte.setFontSize(sizeFontScore+20-5*k);},(k+5)*2);
    }
}