const TOTAL = 300;

let birds = [];
let savedBirds = [];
let pipes = [];

let counter = 0;

let generation = 1;

const NUM_INPUTS = 5;
const NUM_HIDDEN = 8;
const NUM_OUTPUTS = 2;

const cycles = 100;
let slider;
let button;

let showAll = true;

function showAllOrBest() {
  if (showAll) {
    button.elt.innerText = 'show All';
  } else {
    button.elt.innerText = 'show the best';
  }
  showAll = !showAll;
}

function setup() {
  createCanvas(600, 600);
  slider = createSlider(1, 100, 1);
  button = createButton('show the best');
  button.mousePressed(showAllOrBest);
  console.log(button);

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    if (counter % 75 === 0) {
      pipes.push(new Pipe());
    }

    counter++;

    let bestScore = 0;
    for (const bird of birds) {
      bird.update();
      bird.think(pipes);
      if (bird.score > bestScore) {
        bestScore = bird.score;
        bird.isTheBest = true;
      } else {
        bird.isTheBest = false;
      }
    }

    if (birds.length === 0) {
      counter = 0;
      nextGeneration();
      pipes = [];
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j]) || birds[j].y > height || birds[j].y < 0) {
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
  }

  // all the drawing stuff
  background(0);
  for (const bird of birds) {
    bird.show(showAll);
  }

  for (const pipe of pipes) {
    pipe.show(showAll);
  }
}
