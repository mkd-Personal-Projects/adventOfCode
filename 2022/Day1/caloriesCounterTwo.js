exports.caloriesCounterTwo = (caloriesList) => {
  const caloriesSets = caloriesList.split("\n");

  let currentSum = 0;
  const topThree = [0, 0, 0];

  for (let i = 0; i < caloriesSets.length + 1; i++) {
    const currentCalories = +caloriesSets[i];

    if (currentCalories > 1) {
      currentSum += currentCalories;
    } else {
      if (currentSum > Math.min(...topThree)) {
        topThree.sort((a, b) => a - b).shift();
        topThree.unshift(currentSum);
      }
      currentSum = 0;
    }
  }

  return topThree.reduce((accumulator, eachNum) => accumulator + eachNum);
};
// 204837
