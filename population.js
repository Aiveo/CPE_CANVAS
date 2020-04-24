async function Population() {
    let population = await fetch('./population.json');
    population = await population.json();
    let max_densitee = Max_densitee(population);
    let min_densitee = Min_densitee(population);
    let max_annee = Max_annee(population);
    let min_annee = Min_annee(population);
    let nb_annee = Nb_annee(population);

    let hauteur_canvas = document.getElementById("graph").getBoundingClientRect().height;
    let largeur_canvas = document.getElementById("graph").getBoundingClientRect().width;

    let marge_gauche = largeur_canvas/10;
    let marge_bas = hauteur_canvas/10;

    let trigger = true;
    let id = document.getElementById("graph");
    let context = id.getContext("2d");

    print_axes(context,max_densitee,min_densitee,max_annee,min_annee,hauteur_canvas,largeur_canvas,marge_gauche,marge_bas);

    context.strokeStyle =  "red";
    context.lineWidth = 1;
    context.beginPath();
    for (let annee of population) {
        let coordonnee = Cood_point(annee,max_densitee,min_densitee,max_annee,min_annee,nb_annee,hauteur_canvas,largeur_canvas,marge_gauche,marge_bas);
        if (trigger) {
            trigger = false;
            context.moveTo(coordonnee['x'],coordonnee['y']);
        } else {
            context.lineTo(coordonnee['x'],coordonnee['y']);
        }
    }
    context.stroke();
}

function Cood_point (annee,max_densitee,min_densitee,max_annee,min_annee,nb_annee,hauteur_canvas,largeur_canvas,marge_gauche,marge_bas) {
    let x,y;
    x = ((annee['year']-min_annee)/nb_annee)*(largeur_canvas-marge_gauche)+marge_gauche;
    y = hauteur_canvas-(((annee['population']-min_densitee)/(max_densitee-min_densitee))*(hauteur_canvas-marge_bas)+marge_bas);
    let ret = {
        'x': x,
        'y': y
    };
    return ret;
}

function print_axes (context,max_densitee,min_densitee,max_annee,min_annee,hauteur_canvas,largeur_canvas,marge_gauche,marge_bas) {
    context.strokeStyle =  "black";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(marge_gauche,0);
    context.lineTo(marge_gauche,hauteur_canvas-marge_bas);
    context.lineTo(largeur_canvas,hauteur_canvas-marge_bas);
    context.stroke();
    context.font = "12px Arial";
    context.textBaseline = "top";
    context.textAlign = "center";
    let pas_x = 5;
    for (let i=min_annee; i <= max_annee; i++) {
        if (i % pas_x == 0) {
            let x = ((i-min_annee)/(max_annee-min_annee))*(largeur_canvas-marge_gauche)+marge_gauche;
            let y = (hauteur_canvas-marge_bas+(marge_bas/10));
            context.fillText(i,x,y);
            context.moveTo(x,y);
            context.lineTo(x,y-(marge_bas/10));
            context.stroke();
        }
    }

    context.textBaseline = "middle";
    context.textAlign = "end";
    let i = min_densitee;
    let pas_y = 2000000;
    while (i % pas_y != 0) {
        i++
    }
    for (i; i <= max_densitee; i=i+pas_y) {
        let x = marge_gauche-(marge_gauche/10);
        let y = hauteur_canvas-(((i-min_densitee)/(max_densitee-min_densitee))*(hauteur_canvas-marge_bas)+marge_bas);
        context.fillText(i,x,y);
        context.moveTo(x+(marge_gauche/20),y);
        context.lineTo(x+(marge_gauche/10),y);
        context.stroke();
    }
}

function Max_densitee (population) {
    let max = 0;
    for (let year of population) {
        if (year.population > max) {
            max = year.population;
        }
    }
    return max;
}

function Min_densitee (population) {
    let min = 100000000000;
    for (let year of population) {
        if (year.population < min) {
            min = year.population;
        }
    }
    return min;
}

function Max_annee (population) {
    let max = 0;
    for (let year of population) {
        if (year.year > max) {
            max = year.year;
        }
    }
    return max;
}

function Min_annee (population) {
    let min = 100000000000;
    for (let year of population) {
        if (year.year < min) {
            min = year.year;
        }
    }
    return min;
}

function Nb_annee (population) {
    return population.length;
}

Population();