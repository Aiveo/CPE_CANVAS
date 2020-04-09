function maison() {
  var id = document.getElementById("maison");
  var context = id.getContext("2d");
  context.strokeStyle =  "#ffb33c";
  context.lineWidth = 10;
  context.beginPath();
  context.rect(400, 200, 250, 200);
  context.lineTo(300,100);
  context.lineTo(550,100);
  context.lineTo(650,200);
  context.moveTo(300,100);
  context.lineTo(200,200);
  context.lineTo(200,400);
  context.lineTo(400,400);
  context.stroke();
  context.fillStyle =  "brown";
  context.beginPath();
  context.rect(250, 400, 100, -150);
  context.fill();
  context.fillStyle =  "cyan";
  context.beginPath();
  context.rect(450, 275, 50, 50);
  context.fill();
  context.fillStyle =  "cyan";
  context.beginPath();
  context.rect(600, 275, -50, 50);
  context.fill();
}

function arbre() {
  var id = document.getElementById("arbre");
  var context = id.getContext("2d");
  context.lineWidth = 10;
  context.fillStyle =  "brown";
  context.beginPath();
  context.rect(115, 400, 70, -150);
  context.fill();
  context.fillStyle =  "green";
  context.beginPath();
  context.ellipse(150, 150, 90, 180, 0, 0, 2 * Math.PI);
  context.fill();
}

maison();
arbre();
