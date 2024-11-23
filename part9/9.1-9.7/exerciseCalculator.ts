interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercise = (dailyHours: number[], target: number): ExerciseResult => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(hours => hours > 0).length;
    const totalHours = dailyHours.reduce((acc, cur) => acc + cur, 0);
    const average = totalHours / periodLength;
    const success = average >= target;

    let rating;
    let ratingDescription;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'Great job! You met the target!';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'Not too bad, but could be better.';
    } else {
        rating = 1;
        ratingDescription = 'You need to push harder next time.';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
};

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2));