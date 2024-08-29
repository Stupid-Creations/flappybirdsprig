/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Flappy Bird!
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const pipe = "P";
const upsidedown = "U"
const tail = "T";

setLegend(
  [player, bitmap`
................
................
................
....0000000.....
..0066660220....
..06666012020...
.000666012020...
0222066601220...
01222066600000..
011220660999990.
.0010660900000..
..006666099990..
...0066660000...
.....0000.......
................
................`], [pipe, bitmap`
................
..004444444400..
..00D444424400..
..00D444424400..
..00DD44442400..
..000000000000..
...0000000000...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...`], [tail, bitmap`
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...`], [upsidedown, bitmap`
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0DD4444440...
...0000000000...
..000000000000..
..00DD44442400..
..00D444424400..
..00D444424400..
..004444444400..`]
);


let score = 0
let level = 0
const levels = [
  map`
.....
.....
p....
.....
.....
.....`,map `
......
......
......
......
...P..
..pT..`
]

setMap(levels[level])

const gameLoop = () => {
  if(level === 0){
    clearText();
    getFirst(player).y += 1
    score+=1;
      for (j = 0; j < getAll(tail).length; j++) {
    if(getAll(tail)[j].x === 0){
      getAll(tail)[j].remove();
    }
  }
    for (j = 0; j < getAll(pipe).length; j++) {
    if(getAll(pipe)[j].x === 0){
      getAll(pipe)[j].remove();
    }
  }
  for (j = 0; j < getAll(upsidedown).length; j++) {
    if(getAll(upsidedown)[j].x === 0){
      getAll(upsidedown)[j].remove();
    }
  }
  for (j = 0; j < getAll(tail).length; j++) {
    getAll(tail)[j].x -= 1;
  }
  for (i = 0; i < getAll(pipe).length; i++) {
    getAll(pipe)[i].x -= 1;
  }
  for (i = 0; i < getAll(upsidedown).length; i++) {
    getAll(upsidedown)[i].x -= 1;
  }

  yes = Math.random(0, 1);
  if (yes) {
    ch2ser = Math.random(0, 1);
    if (ch2ser > 0.5) {
      y = 5 - Math.floor(Math.random()*2);
      addSprite(4, y, pipe);

    } else {
      y = 0 + Math.floor(Math.random()*2);
      addSprite(4, y, upsidedown);

    }

    if (y > 0 && y < 2) {
      for (i = 0; i < y; i++) {
        addSprite(4, i, tail);
      }
    } else
    if (y > 2) {
      for (j = 5; j > y; j--) {
        addSprite(4, j, tail);
      }
    }
  }
  if(tilesWith(player,pipe).length > 0){
    level = 1;
    setMap(levels[level])
    addText(" game over\n\ns to restart\n\n score: "+score,{x:5,y:3})
  }
      if(tilesWith(player,tail).length > 0){
    level = 1;
    setMap(levels[level])
    addText(" game over\n\ns to restart\n\n score: "+score,{x:5,y:3})
  }
      if(tilesWith(player,upsidedown).length > 0){
    level = 1;
    setMap(levels[level])
    addText(" game over\n\ns to restart\n\n score: "+score,{x:5,y:3})
  }
  }
}

setInterval(gameLoop, 1000);



onInput("w", () => {
  if(level===0){
  getFirst(player).y -= 1
  }
})

onInput("s", () => {
  if(level === 1){
    level = 0;
    score = 0;
    setMap(levels[level])
  }})
