interface BmiInput {
  heightInCm: number
  weightInKg: number
}

export const parseBmiArguments = (height: number, weight: number): BmiInput => {
  if (!isNaN(height) && !isNaN(weight)) {
    return {
      heightInCm: height,
      weightInKg: weight
    }
  } else {
    throw new Error(
      'malformatted parameters, provided values were not numbers!'
    )
  }
}

export const calculateBmi = (
  heightInCm: number,
  weightInKg: number
): string => {
  const heightInM = heightInCm / 100
  const bmi = weightInKg / (heightInM * heightInM)

  if (bmi < 16) {
    return `Your bmi is ${bmi}, your status is: Severely underweight`
  } else if (bmi >= 16 && bmi < 17) {
    return `Your bmi is ${bmi}, your status is: Moderately underweight`
  } else if (bmi >= 17 && bmi < 18.5) {
    return `Your bmi is ${bmi}, your status is: Underweight`
  } else if (bmi >= 18.5 && bmi < 25) {
    return `Your bmi is ${bmi}, your status is: Normal (healthy weight)`
  } else if (bmi >= 25 && bmi < 30) {
    return `Your bmi is ${bmi}, your status is: Overweight`
  } else if (bmi >= 30 && bmi < 35) {
    return `Your bmi is ${bmi}, your status is: Moderately obese`
  } else if (bmi >= 35 && bmi < 40) {
    return `Your bmi is ${bmi}, your status is: Severely obese`
  } else {
    return `Your bmi is ${bmi}, your status is: Very severely obese`
  }
}
