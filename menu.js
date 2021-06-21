
var panneau_gauche;
var disque;
var bois;
var tete;

var UI_titre;
var UI_titre_texte;
var depth_titre = 8;
var titre_scale = false;

var UI_jouer;
var UI_jouer_texte;
var depth_jouer = 7;
var jouer_scale = false;

var UI_reglages;
var UI_reglages_texte;
var depth_reglages = 6;
var reglages_scale = false;

var UI_controles;
var UI_controles_texte;
var depth_controles = 4;
var controles_scale = false;

var UI_quitter;
var UI_quitter_texte;
var depth_quitter = 5;
var quitter_scale = false;

var UI_retour1;
var UI_retour1_texte;
var depth_retour1 = 9;
var UI_retour2;
var UI_retour2_texte;
var depth_retour2 = 9;

var stop_menu = false;
var retour_menu1 = false;
var retour_menu2 = false;

var controles;
var reglages;
var curseur;

var curseur_selec = false;
var curseur_decal = 0;

class menu extends Phaser.Scene{
    
    constructor ()
    {
        super("menu");
        this.pad = null;
    }
    
    preload ()
    {   
        // Cote gauche
        this.load.image('disque', 'assets/images/disque.png');
        this.load.image('bois', 'assets/images/bois.png');
        this.load.image('tete', 'assets/images/tete.png');

        // UI
        this.load.image('UI_titre', 'assets/images/UI_titre.png');
        this.load.image('UI_jouer', 'assets/images/UI_jouer.png');
        this.load.image('UI_reglages', 'assets/images/UI_reglages.png');
        this.load.image('UI_controles', 'assets/images/UI_controles.png');
        this.load.image('UI_quitter', 'assets/images/UI_quitter.png');
        this.load.image('UI_titre_texte', 'assets/images/UI_titre_texte.png');
        this.load.image('UI_jouer_texte', 'assets/images/UI_jouer_texte.png');
        this.load.image('UI_reglages_texte', 'assets/images/UI_reglages_texte.png');
        this.load.image('UI_controles_texte', 'assets/images/UI_controles_texte.png');
        this.load.image('UI_quitter_texte', 'assets/images/UI_quitter_texte.png');
        this.load.image('UI_retour1', 'assets/images/UI_retour.png');
        this.load.image('UI_retour1_texte', 'assets/images/UI_retour1_texte.png');
        this.load.image('UI_retour2', 'assets/images/UI_retour.png');
        this.load.image('UI_retour2_texte', 'assets/images/UI_retour2_texte.png');

        this.load.image('controles', 'assets/images/controles.png');
        this.load.image('reglages', 'assets/images/reglages.png');
        this.load.image('curseur', 'assets/images/curseur.png');

    }
    
    create ()
    {        
        //bg = this.add.sprite(config.width/2, config.height/2, 'bg');
        //bg = this.add.tileSprite(config.height/2+448, 224, 896, 448, 'bg');
        //bg.setDepth(-1);

        bois = this.add.sprite(0, 224, 'bois').setDepth(10);
        disque = this.add.sprite(0, 224, 'disque').setDepth(11);
        tete = this.add.sprite(0, 224, 'tete').setDepth(12);
        tete.setOrigin((224+187)/447,38/447);
        tete.x = 187;
        tete.y = 38;
        tete.angle += 90;

        UI_titre = this.add.sprite(528, 224, 'UI_titre').setDepth(depth_titre);
        UI_titre_texte = this.add.sprite(508, 87, 'UI_titre_texte').setDepth(depth_titre);
        UI_jouer = this.add.sprite(443, 250, 'UI_jouer').setDepth(depth_jouer).setInteractive();
        UI_jouer_texte = this.add.sprite(473, 260, 'UI_jouer_texte').setDepth(depth_jouer).setInteractive();
        UI_reglages = this.add.sprite(778, 254, 'UI_reglages').setDepth(depth_reglages).setInteractive().setScale(1.2);
        UI_reglages_texte = this.add.sprite(770, 254, 'UI_reglages_texte').setDepth(depth_reglages).setInteractive();
        UI_controles = this.add.sprite(368, 369, 'UI_controles').setDepth(depth_controles).setInteractive().setScale(1.2);
        UI_controles_texte = this.add.sprite(378, 369, 'UI_controles_texte').setDepth(depth_controles).setInteractive();
        UI_quitter = this.add.sprite(718, 384, 'UI_quitter').setDepth(depth_quitter).setInteractive();
        UI_quitter_texte = this.add.sprite(718, 374, 'UI_quitter_texte').setDepth(depth_quitter).setInteractive();
        UI_retour1 = this.add.sprite(338, 384, 'UI_retour1').setDepth(depth_retour1).setInteractive().setVisible(false);
        UI_retour1_texte = this.add.sprite(343, 378, 'UI_retour1_texte').setDepth(depth_retour1).setInteractive().setVisible(false);
        UI_retour2 = this.add.sprite(738, 374, 'UI_retour2').setDepth(depth_retour2).setInteractive().setVisible(false);
        UI_retour2_texte = this.add.sprite(743, 368, 'UI_retour2_texte').setDepth(depth_retour2).setInteractive().setVisible(false);

        controles = this.add.sprite(448+30, 224, 'controles').setDepth(20).setVisible(false);
        reglages = this.add.sprite(448, 114, 'reglages').setDepth(20).setVisible(false);
        curseur = this.add.sprite(528, 120, 'curseur').setDepth(20).setInteractive().setVisible(false);

        // JOUER
        UI_jouer.on('pointerover', function (pointer) {
            if(!stop_menu){UI_jouer.setDepth(9);
            UI_jouer_texte.setDepth(9.1);}
        });

        UI_jouer_texte.on('pointerover', function (pointer) {
            if(!stop_menu){UI_jouer.setDepth(9);
            UI_jouer_texte.setDepth(9.1);}
        });

        UI_jouer.on('pointerout', function (pointer) {
            if(!stop_menu){UI_jouer.setDepth(depth_jouer);
            UI_jouer_texte.setDepth(depth_jouer);}
        });

        UI_jouer.on('pointerdown', function (pointer) {
            if(!stop_menu){jouer_scale = true;stop_menu=true;}
        });

        UI_jouer_texte.on('pointerdown', function (pointer) {
            if(!stop_menu){jouer_scale = true;stop_menu=true;}
        });
        // REGLAGES
        UI_reglages.on('pointerover', function (pointer) {
            if(!stop_menu){UI_reglages.setDepth(9);
            UI_reglages_texte.setDepth(9.1);}
        });

        UI_reglages_texte.on('pointerover', function (pointer) {
            if(!stop_menu){UI_reglages.setDepth(9);
            UI_reglages_texte.setDepth(9.1);}
        });

        UI_reglages.on('pointerout', function (pointer) {
            if(!stop_menu){UI_reglages.setDepth(depth_reglages);
            UI_reglages_texte.setDepth(depth_reglages);}
        });

        UI_reglages.on('pointerdown', function (pointer) {
            if(!stop_menu){reglages_scale = true;stop_menu=true;}
        });

        UI_reglages_texte.on('pointerdown', function (pointer) {
            if(!stop_menu){reglages_scale = true;stop_menu=true;}
        });
        // CONTROLES
        UI_controles.on('pointerover', function (pointer) {
            if(!stop_menu){UI_controles.setDepth(9);
            UI_controles_texte.setDepth(9.1);}
        });

        UI_controles_texte.on('pointerover', function (pointer) {
            if(!stop_menu){UI_controles.setDepth(9);
            UI_controles_texte.setDepth(9.1);}
        });

        UI_controles.on('pointerout', function (pointer) {
            if(!stop_menu){UI_controles.setDepth(depth_controles);
            UI_controles_texte.setDepth(depth_controles);}
        });

        UI_controles.on('pointerdown', function (pointer) {
            if(!stop_menu){controles_scale = true;stop_menu=true;}
        });

        UI_controles_texte.on('pointerdown', function (pointer) {
            if(!stop_menu){controles_scale = true;stop_menu=true;}
        });
        // QUITTER
        UI_quitter.on('pointerover', function (pointer) {
            if(!stop_menu){UI_quitter.setDepth(9);
            UI_quitter_texte.setDepth(9.1);}
        });

        UI_quitter_texte.on('pointerover', function (pointer) {
            if(!stop_menu){UI_quitter.setDepth(9);
            UI_quitter_texte.setDepth(9.1);}
        });

        UI_quitter.on('pointerout', function (pointer) {
            if(!stop_menu){UI_quitter.setDepth(depth_quitter);
            UI_quitter_texte.setDepth(depth_quitter);}
        });

        UI_quitter.on('pointerdown', function (pointer) {
            if(!stop_menu){quitter_scale = true;stop_menu=true;}
        });

        UI_quitter_texte.on('pointerdown', function (pointer) {
            if(!stop_menu){quitter_scale = true;stop_menu=true;}
        });
        // RETOUR
        /*UI_retour1.on('pointerover', function (pointer) {
            if(!stop_menu){UI_retour1.setDepth(9);
            UI_retour1_texte.setDepth(9.1);}
        });

        UI_retour1_texte.on('pointerover', function (pointer) {
            if(!stop_menu){UI_retour1.setDepth(9);
            UI_retour1_texte.setDepth(9.1);}
        });

        UI_retour1.on('pointerout', function (pointer) {
            if(!stop_menu){UI_retour1.setDepth(depth_quitter);
            UI_retour1_texte.setDepth(depth_quitter);}
        });*/

        UI_retour1.on('pointerdown', function (pointer) {
            if(true){UI_retour1.setVisible(false);UI_retour1_texte.setVisible(false);reglages.setVisible(false);curseur.setVisible(false);retour_menu1 = true;stop_menu=false;}
        });

        UI_retour1_texte.on('pointerdown', function (pointer) {
            if(true){UI_retour1.setVisible(false);UI_retour1_texte.setVisible(false);reglages.setVisible(false);curseur.setVisible(false);retour_menu1 = true;stop_menu=false;}
        });

        UI_retour2.on('pointerdown', function (pointer) {
            if(true){UI_retour2.setVisible(false);UI_retour2_texte.setVisible(false);controles.setVisible(false);retour_menu2 = true;stop_menu=false;}
        });

        UI_retour2_texte.on('pointerdown', function (pointer) {
            if(true){UI_retour2.setVisible(false);UI_retour2_texte.setVisible(false);controles.setVisible(false);retour_menu2 = true;stop_menu=false;}
        });

        /*curseur.on('pointerdown', function (pointer) {
            curseur_selec=true;
        });

        curseur.on('pointerup', function (pointer) {
            curseur_selec=false;
        });*/

    }
    
    update ()
    {
        if (jouer_scale){UI_jouer.scale *= 1.04;};
        if (UI_jouer.scale>20){game.scene.start("main");game.scene.stop("menu")}

        if (quitter_scale){UI_quitter.scale *= 1.02;};
        if (UI_quitter.scale>40){game.scene.stop("menu")}

        if (reglages_scale && UI_reglages.scale<10 && !retour_menu1 && !retour_menu2){UI_reglages.scale *= 1.04;}
        if (UI_reglages.scale>10 && !retour_menu1 && !retour_menu2){UI_retour1.setVisible(true);UI_retour1_texte.setVisible(true);reglages.setVisible(true);curseur.setVisible(true);reglages_scale=false}

        if (controles_scale && UI_controles.scale<=13 && !retour_menu1 && !retour_menu2){UI_controles.scale *= 1.04;};
        if (UI_controles.scale>13 && !retour_menu1 && !retour_menu2){UI_retour2.setVisible(true);UI_retour2_texte.setVisible(true);controles.setVisible(true);controles_scale=false}

        if (retour_menu1 && UI_reglages.scale>1.2){UI_reglages.scale = Math.max(1.2,UI_reglages.scale/1.04);}
        if (UI_reglages.scale==1.2 && retour_menu1){retour_menu1 = false;}

        if (retour_menu2 && UI_controles.scale>1.2){UI_controles.scale = Math.max(1.2,UI_controles.scale/1.04);}
        if (UI_controles.scale==1.2 && retour_menu2){retour_menu2 = false;}

        //if (curseur_selec){curseur_decal = pointer.x}
        //curseur.x = curseur_decal;
    }
}