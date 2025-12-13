export const calculateHealthMetrics = (data) => {
    const heightM = data.height / 100;
    const weight = parseFloat(data.weight);
    const age = parseFloat(data.age);
    let bmi = 0;
    let bmiStatus = "";
    let bmiAdvice = "";
    
    if (heightM > 0 && weight > 0) {
        bmi = (weight / (heightM * heightM)).toFixed(1);
        if (bmi < 18.5) { bmiStatus = "Underweight"; bmiAdvice = "Increase calorie intake."; }
        else if (bmi < 24.9) { bmiStatus = "Normal"; bmiAdvice = "Maintain current diet."; }
        else { bmiStatus = "Overweight"; bmiAdvice = "Reduce sugar and increase cardio."; }
    }

    let bmr = 0;
    if (weight > 0 && heightM > 0 && age > 0) {
        bmr = (10 * weight) + (6.25 * data.height) - (5 * age) + 5;
    }
    return { bmi, bmiStatus, bmiAdvice, bmr: bmr.toFixed(0) };
};