function nextGeneration() {
  console.log('generation:', generation++);

  calculateFitness();

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = pickOne();
  }
  savedBirds = [];
}

function pickOne() {
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;

  let bird = savedBirds[index];
  let child = new Bird(bird.brain);

  child.mutate();
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (const bird of savedBirds) {
    sum += bird.score;
  }

  // normalize fitness
  for (const bird of savedBirds) {
    bird.fitness = bird.score / sum;
  }
}
