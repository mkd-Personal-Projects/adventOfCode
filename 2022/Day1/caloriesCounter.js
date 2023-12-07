exports.caloriesCounter = (caloriesList) => {
  const caloriesSets = caloriesList.split("\n");

  let greatestSum = 0;
  let currentSum = 0;

  for (let i = 0; i < caloriesSets.length + 1; i++) {
    const calories = +caloriesSets[i];

    if (calories > 1) {
      currentSum += calories;
    } else {
      if (currentSum > greatestSum) {
        greatestSum = currentSum;
      }
      currentSum = 0;
    }
  }

  return greatestSum;
};
// 68442
