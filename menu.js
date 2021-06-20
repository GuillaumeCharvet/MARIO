
var panneau_gauche;
var disque;
var bois;
var tete;

class menu extends Phaser.Scene{
    
    constructor ()
    {
        super("menu");
        this.pad = null;
    }
    
    preload ()
    {   
        this.load.image('disque', 'assets/images/disque.png');
        this.load.image('bois', 'assets/images/bois.png');
        this.load.image('tete', 'assets/images/tete.png');
    }
    
    create ()
    {
        this.physics.world.setBounds(0, 0, 2*config.width, config.height); 

        bois = this.add.sprite(0, 224, 'bois').setDepth(8.5);
        disque = this.add.sprite(0, 224, 'disque').setDepth(9);
        tete = this.add.sprite(0, 224, 'tete').setDepth(10);
        tete.setOrigin((224+187)/447,38/447);
        tete.x = 187;
        tete.y = 38;
        tete.angle += 90;

        setTimeout(function(){game.scene.stop("menu");game.scene.start("main")},1000);
    }
    
    update ()
    {

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

    let x1 = x + 0.5*(x0-x);
    let y1 = y + 0.5*(y0-y);
    let radius0b = radius0 + 0.5 * (radius2 - radius0);
    let x2 = x + 0.3*(x0-x);
    let y2 = y + 0.3*(y0-y);
    let radius0c = radius0 + 0.3 * (radius2 - radius0);
    
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
    
    poly.setTo([ new Phaser.Geom.Point(x2-radius0c*(y1-y2)/distBC, y2+radius0c*(x1-x2)/distBC), new Phaser.Geom.Point(x1-radius0b*(y1-y2)/distBC, y1+radius0b*(x1-x2)/distBC), new Phaser.Geom.Point(x1+radius0b*(y1-y2)/distBC, y1-radius0b*(x1-x2)/distBC), new Phaser.Geom.Point(x2+radius0c*(y1-y2)/distBC, y2-radius0c*(x1-x2)/distBC) ]);
    graphics.fillStyle(0x1D1D1B, alpha);
    graphics.fillPoints(poly.points, true).setDepth(5);

    poly.setTo([ new Phaser.Geom.Point(x-radius2*(y2-y)/distCD, y+radius2*(x2-x)/distCD), new Phaser.Geom.Point(x2-radius0c*(y2-y)/distCD, y2+radius0c*(x2-x)/distCD), new Phaser.Geom.Point(x2+radius0c*(y2-y)/distCD, y2-radius0c*(x2-x)/distCD), new Phaser.Geom.Point(x+radius2*(y2-y)/distCD, y-radius2*(x2-x)/distCD) ]);
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