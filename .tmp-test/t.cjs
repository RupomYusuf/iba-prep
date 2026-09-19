//#region src/data/questions/algebra.js
const questions$5 = [
	{
		id: "alg-e1",
		topic: "Algebra",
		subtopic: "Linear Equations",
		difficulty: "easy",
		q: "If 3x + 5 = 20, what is the value of x?",
		options: [
			"3",
			"5",
			"7",
			"15"
		],
		answer: 1,
		explanation: "Subtract 5 from both sides: 3x = 15. Divide by 3: x = 5.",
		concepts: ["Solving one-variable linear equations", "Inverse operations"],
		mistake: "Adding 5 instead of subtracting it (gives x = 25/3)."
	},
	{
		id: "alg-e2",
		topic: "Algebra",
		subtopic: "Exponents",
		difficulty: "easy",
		q: "Simplify: (x³ · x⁴) / x⁵",
		options: [
			"x²",
			"x⁶",
			"x¹²",
			"x⁰"
		],
		answer: 0,
		explanation: "Multiply: x^(3+4) = x⁷. Divide: x^(7−5) = x².",
		concepts: ["Laws of exponents: aᵐ · aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ"],
		mistake: "Multiplying the exponents in the first step (x¹²)."
	},
	{
		id: "alg-e3",
		topic: "Algebra",
		subtopic: "Linear Equations",
		difficulty: "easy",
		q: "If 2x = 3y and y = 6, what is x?",
		options: [
			"4",
			"6",
			"9",
			"12"
		],
		answer: 2,
		explanation: "Substitute y = 6: 2x = 18, so x = 9.",
		concepts: ["Substitution", "Solving linear equations"],
		mistake: "Solving 2x = 3 + 6 instead of 3 × 6."
	},
	{
		id: "alg-e4",
		topic: "Algebra",
		subtopic: "Linear Equations",
		difficulty: "easy",
		q: "Solve for x: x/4 + 2 = 7",
		options: [
			"12",
			"20",
			"28",
			"36"
		],
		answer: 1,
		explanation: "Subtract 2: x/4 = 5. Multiply both sides by 4: x = 20.",
		concepts: ["Equations with fractions", "Inverse operations"],
		mistake: "Multiplying only one side by 4, or subtracting 2 after multiplying."
	},
	{
		id: "alg-e5",
		topic: "Algebra",
		subtopic: "Exponents",
		difficulty: "easy",
		q: "Which expression is equivalent to (2x)³?",
		options: [
			"2x³",
			"6x³",
			"8x³",
			"8x⁴"
		],
		answer: 2,
		explanation: "Cube both factors: 2³ · x³ = 8x³.",
		concepts: ["Power of a product: (ab)ⁿ = aⁿbⁿ"],
		mistake: "Cubing only the x and leaving the 2 unchanged."
	},
	{
		id: "alg-e6",
		topic: "Algebra",
		subtopic: "Linear Equations",
		difficulty: "easy",
		q: "If x − 7 = −3, what is x?",
		options: [
			"4",
			"−4",
			"10",
			"−10"
		],
		answer: 0,
		explanation: "Add 7 to both sides: x = −3 + 7 = 4.",
		concepts: ["Working with negative numbers", "Inverse operations"],
		mistake: "Sign errors: writing x = −3 − 7 = −10."
	},
	{
		id: "alg-e7",
		topic: "Algebra",
		subtopic: "Translating Words",
		difficulty: "easy",
		q: "Five less than twice a number is 11. What is the number?",
		options: [
			"3",
			"8",
			"13",
			"16"
		],
		answer: 1,
		explanation: "Translate: 2n − 5 = 11 → 2n = 16 → n = 8.",
		concepts: ["Translating words into equations"],
		mistake: "Writing 5 − 2n = 11 (order matters for \"less than\")."
	},
	{
		id: "alg-e8",
		topic: "Algebra",
		subtopic: "Functions",
		difficulty: "easy",
		q: "If f(x) = 2x + 3, what is f(4)?",
		options: [
			"8",
			"11",
			"14",
			"24"
		],
		answer: 1,
		explanation: "Substitute x = 4: f(4) = 2(4) + 3 = 11.",
		concepts: ["Evaluating functions"],
		mistake: "Multiplying 2 × 4 × 3 (confusing evaluation with multiplication of all terms)."
	},
	{
		id: "alg-m1",
		topic: "Algebra",
		subtopic: "Systems of Equations",
		difficulty: "medium",
		q: "If x + y = 10 and x − y = 4, what is the value of xy?",
		options: [
			"18",
			"21",
			"24",
			"35"
		],
		answer: 1,
		explanation: "Add the equations: 2x = 14 → x = 7, so y = 3. Then xy = 21.",
		concepts: ["Elimination method for simultaneous equations"],
		mistake: "Finding x and y but then computing x + y or x − y instead of the product."
	},
	{
		id: "alg-m2",
		topic: "Algebra",
		subtopic: "Quadratic Equations",
		difficulty: "medium",
		q: "What is the sum of the roots of 2x² − 8x + 6 = 0?",
		options: [
			"3",
			"4",
			"6",
			"8"
		],
		answer: 1,
		explanation: "Sum of roots = −b/a = −(−8)/2 = 4. (No need to factor.)",
		concepts: ["Vieta's formulas: sum = −b/a, product = c/a"],
		mistake: "Using b/a (forgetting the negative sign) → 8."
	},
	{
		id: "alg-m3",
		topic: "Algebra",
		subtopic: "Quadratic Equations",
		difficulty: "medium",
		q: "What is the sum of all solutions of x² = 49?",
		options: [
			"0",
			"7",
			"14",
			"49"
		],
		answer: 0,
		explanation: "The solutions are x = 7 and x = −7. Their sum is 0.",
		concepts: ["Square roots have both positive and negative solutions"],
		mistake: "Considering only x = 7 and answering 7."
	},
	{
		id: "alg-m4",
		topic: "Algebra",
		subtopic: "Exponents",
		difficulty: "medium",
		q: "If 3^(2x−1) = 81, what is x?",
		options: [
			"2",
			"5/2",
			"3",
			"17/2"
		],
		answer: 1,
		explanation: "81 = 3⁴, so 2x − 1 = 4 → 2x = 5 → x = 5/2.",
		concepts: ["Equating exponents with the same base"],
		mistake: "Writing 81 = 3³ (81 is 3⁴, not 3³)."
	},
	{
		id: "alg-m5",
		topic: "Algebra",
		subtopic: "Absolute Value",
		difficulty: "medium",
		q: "If |2x − 3| = 7, what is the sum of all possible values of x?",
		options: [
			"1.5",
			"3",
			"5",
			"10"
		],
		answer: 1,
		explanation: "2x − 3 = 7 → x = 5; 2x − 3 = −7 → x = −2. Sum = 5 + (−2) = 3.",
		concepts: ["Absolute value equations produce two cases"],
		mistake: "Solving only the positive case (giving 5)."
	},
	{
		id: "alg-m6",
		topic: "Algebra",
		subtopic: "Inequalities",
		difficulty: "medium",
		q: "Solve: −2x + 7 > 1",
		options: [
			"x < 3",
			"x > 3",
			"x < −3",
			"x > −3"
		],
		answer: 0,
		explanation: "Subtract 7: −2x > −6. Divide by −2 and flip the sign: x < 3.",
		concepts: ["Inequality sign flips when dividing by a negative number"],
		mistake: "Forgetting to flip the inequality sign → x > 3."
	},
	{
		id: "alg-m7",
		topic: "Algebra",
		subtopic: "Systems of Equations",
		difficulty: "medium",
		q: "If a = b + 2 and a² − b² = 24, what is ab?",
		options: [
			"12",
			"24",
			"35",
			"48"
		],
		answer: 2,
		explanation: "a² − b² = (a − b)(a + b) = 2(a + b) = 24 → a + b = 12. With a − b = 2: a = 7, b = 5, so ab = 35.",
		concepts: ["Difference of squares", "System solving"],
		mistake: "Stopping after finding a + b = 12 and answering 12."
	},
	{
		id: "alg-m8",
		topic: "Algebra",
		subtopic: "Quadratic Equations",
		difficulty: "medium",
		q: "For what value of k is x² + 6x + k a perfect square trinomial?",
		options: [
			"3",
			"6",
			"9",
			"12"
		],
		answer: 2,
		explanation: "A perfect square needs k = (6/2)² = 9: x² + 6x + 9 = (x + 3)².",
		concepts: ["Completing the square"],
		mistake: "Taking k = 6 (the coefficient itself instead of half of it, squared)."
	},
	{
		id: "alg-m9",
		topic: "Algebra",
		subtopic: "Exponents",
		difficulty: "medium",
		q: "For what value of x does 4ˣ = 2^(x+6)?",
		options: [
			"2",
			"3",
			"6",
			"12"
		],
		answer: 2,
		explanation: "4ˣ = (2²)ˣ = 2^(2x). So 2x = x + 6 → x = 6.",
		concepts: ["Rewriting to a common base", "Exponent laws"],
		mistake: "Treating 4ˣ as 4x or forgetting to rewrite 4 as 2²."
	},
	{
		id: "alg-m10",
		topic: "Algebra",
		subtopic: "Functions",
		difficulty: "medium",
		q: "If f(x) = x² − 2x, for how many values of x does f(x) = 8?",
		options: [
			"0",
			"1",
			"2",
			"3"
		],
		answer: 2,
		explanation: "x² − 2x = 8 → x² − 2x − 8 = 0 → (x − 4)(x + 2) = 0 → x = 4 or x = −2. Two values.",
		concepts: ["Setting up equations from functions", "Factoring quadratics"],
		mistake: "Assuming a parabola hits a horizontal line only once."
	},
	{
		"id": "alg-m11",
		"topic": "Algebra",
		"subtopic": "Inequalities",
		"difficulty": "medium",
		"q": "For how many integers x is x² + 6x ≤ 0?",
		"options": [
			"5",
			"6",
			"7",
			"13"
		],
		"answer": 2,
		"explanation": "Factor: x(x + 6) ≤ 0. The product is negative or zero between the roots, so −6 ≤ x ≤ 0. Integers: −6, −5, −4, −3, −2, −1, 0 → 7 integers.",
		"concepts": ["Solving quadratic inequalities by sign analysis", "Counting integers in a closed interval"],
		"mistake": "Writing x < 0 only (missing −6 ≤ x) or counting −6 to 0 as 6 integers."
	},
	{
		"id": "alg-m12",
		"topic": "Algebra",
		"subtopic": "Exponents",
		"difficulty": "medium",
		"q": "If 2^(a+b) = 64 and 2^(a−b) = 4, what is ab?",
		"options": [
			"6",
			"8",
			"12",
			"16"
		],
		"answer": 1,
		"explanation": "64 = 2⁶ and 4 = 2², so a + b = 6 and a − b = 2. Adding: a = 4, so b = 2. ab = 8.",
		"concepts": ["Equating exponents with the same base", "Two-equation systems"],
		"mistake": "Computing aᵇ = 4² = 16 instead of the product ab."
	},
	{
		id: "alg-h1",
		topic: "Algebra",
		subtopic: "Systems of Equations",
		difficulty: "hard",
		q: "If x − y = 3 and x² − y² = 51, what is xy?",
		options: [
			"56",
			"60",
			"70",
			"75"
		],
		answer: 2,
		explanation: "x² − y² = (x − y)(x + y) → 51 = 3(x + y) → x + y = 17. With x − y = 3: x = 10, y = 7. xy = 70.",
		concepts: ["Difference of squares", "System solving"],
		mistake: "Stopping at x + y = 17 without solving for x and y."
	},
	{
		id: "alg-h2",
		topic: "Algebra",
		subtopic: "Exponents",
		difficulty: "hard",
		q: "If 2^x · 2^y = 32 and x − y = 2, what is xy?",
		options: [
			"21/4",
			"5",
			"15/4",
			"9/2"
		],
		answer: 0,
		explanation: "2^(x+y) = 2⁵ → x + y = 5. With x − y = 2: x = 3.5, y = 1.5. xy = 21/4 = 5.25.",
		concepts: ["Exponent laws", "Simultaneous equations"],
		mistake: "Computing x + y = 32 (forgetting to match the base 2)."
	},
	{
		id: "alg-h3",
		topic: "Algebra",
		subtopic: "Quadratic Equations",
		difficulty: "hard",
		q: "The sum of the roots of x² − 5x + k = 0 is twice the product of the roots. What is k?",
		options: [
			"2",
			"2.5",
			"5",
			"10"
		],
		answer: 1,
		explanation: "Sum = 5, product = k. Given 5 = 2k → k = 2.5.",
		concepts: ["Vieta's formulas"],
		mistake: "Setting product = 2 × sum (reversing the relation) → k = 10."
	},
	{
		id: "alg-h4",
		topic: "Algebra",
		subtopic: "Algebraic Manipulation",
		difficulty: "hard",
		q: "If x + 1/x = 5, what is x² + 1/x²?",
		options: [
			"23",
			"25",
			"27",
			"10"
		],
		answer: 0,
		explanation: "Square both sides: (x + 1/x)² = x² + 2 + 1/x² = 25 → x² + 1/x² = 23.",
		concepts: ["Squaring a symmetric expression", "(a + b)² = a² + 2ab + b²"],
		mistake: "Forgetting the middle term +2 and answering 25."
	},
	{
		id: "alg-h5",
		topic: "Algebra",
		subtopic: "Inequalities",
		difficulty: "hard",
		q: "How many integers satisfy |x − 4| < 3?",
		options: [
			"4",
			"5",
			"6",
			"7"
		],
		answer: 1,
		explanation: "−3 < x − 4 < 3 → 1 < x < 7. Integers: 2, 3, 4, 5, 6 → 5 integers.",
		concepts: ["Absolute value inequalities", "Strict vs non-strict bounds"],
		mistake: "Including 1 or 7 (they fail the strict inequality)."
	},
	{
		id: "alg-h6",
		topic: "Algebra",
		subtopic: "Functions",
		difficulty: "hard",
		q: "If f(x) = 3x − 1 and g(x) = x² + 1, what is g(f(2))?",
		options: [
			"25",
			"26",
			"36",
			"50"
		],
		answer: 1,
		explanation: "f(2) = 5. Then g(5) = 25 + 1 = 26.",
		concepts: ["Composite functions"],
		mistake: "Computing f(g(2)) instead of g(f(2))."
	},
	{
		id: "alg-h7",
		topic: "Algebra",
		subtopic: "Factoring",
		difficulty: "hard",
		q: "Which of the following is equal to x⁴ − 16?",
		options: [
			"(x² + 4)(x − 2)(x + 2)",
			"(x − 2)²(x + 2)²",
			"(x² − 4)(x − 2)²",
			"(x + 2)³(x − 2)"
		],
		answer: 0,
		explanation: "x⁴ − 16 = (x² − 4)(x² + 4) = (x − 2)(x + 2)(x² + 4). Note x² + 4 cannot be factored further over real numbers.",
		concepts: ["Difference of squares applied twice"],
		mistake: "Stopping at (x² − 4)(x² + 4) and not factoring x² − 4."
	},
	{
		id: "alg-h8",
		topic: "Algebra",
		subtopic: "Algebraic Manipulation",
		difficulty: "hard",
		q: "If a + b = 7 and ab = 12, what is a² + b²?",
		options: [
			"25",
			"37",
			"49",
			"61"
		],
		answer: 0,
		explanation: "a² + b² = (a + b)² − 2ab = 49 − 24 = 25.",
		concepts: ["Symmetric identities: (a + b)² = a² + 2ab + b²"],
		mistake: "Using (a + b)² − ab = 37 (forgetting the factor of 2)."
	}
];
//#endregion
//#region src/data/questions/arithmetic.js
const questions$4 = [
	{
		id: "ari-e1",
		topic: "Arithmetic",
		subtopic: "Percentages",
		difficulty: "easy",
		q: "What is 25% of 240?",
		options: [
			"48",
			"60",
			"64",
			"80"
		],
		answer: 1,
		explanation: "25% = 1/4, and 240/4 = 60.",
		concepts: ["Percent as a fraction", "Quarter of a number"],
		mistake: "Computing 25% of 240 as 240 × 25 = 6000 without dividing by 100."
	},
	{
		id: "ari-e2",
		topic: "Arithmetic",
		subtopic: "Ratio & Proportion",
		difficulty: "easy",
		q: "Two numbers are in the ratio 3 : 5 and their sum is 40. What is the larger number?",
		options: [
			"15",
			"24",
			"25",
			"30"
		],
		answer: 2,
		explanation: "Parts = 3 + 5 = 8, each part = 5. Larger = 5 × 5 = 25.",
		concepts: ["Dividing in a given ratio"],
		mistake: "Taking 3/5 of 40 = 24 (the smaller number as a fraction of the whole)."
	},
	{
		id: "ari-e3",
		topic: "Arithmetic",
		subtopic: "Averages",
		difficulty: "easy",
		q: "What is the average of 4, 8, 12, 16?",
		options: [
			"8",
			"10",
			"12",
			"16"
		],
		answer: 1,
		explanation: "Sum = 40, count = 4, average = 40/4 = 10.",
		concepts: ["Average = sum ÷ count"],
		mistake: "Dividing by 3 (number of gaps) instead of 4 (number of terms)."
	},
	{
		id: "ari-e4",
		topic: "Arithmetic",
		subtopic: "LCM & HCF",
		difficulty: "easy",
		q: "What is the least common multiple (LCM) of 6 and 8?",
		options: [
			"2",
			"12",
			"24",
			"48"
		],
		answer: 2,
		explanation: "Multiples of 6: 6, 12, 18, 24… Multiples of 8: 8, 16, 24… First common multiple = 24.",
		concepts: ["LCM by listing or prime factorization"],
		mistake: "Confusing LCM with HCF (2) or taking the product (48)."
	},
	{
		id: "ari-e5",
		topic: "Arithmetic",
		subtopic: "Percentages",
		difficulty: "easy",
		q: "15 is what percent of 60?",
		options: [
			"15%",
			"25%",
			"40%",
			"45%"
		],
		answer: 1,
		explanation: "Write it as a fraction: 15/60 = 1/4 = 0.25. As a percent, 0.25 × 100 = 25%.",
		concepts: ["Percent as a ratio"],
		mistake: "Inverting the fraction: 60/15 = 4 → 400%."
	},
	{
		id: "ari-e6",
		topic: "Arithmetic",
		subtopic: "Speed & Distance",
		difficulty: "easy",
		q: "A car travels 150 km in 3 hours. What is its average speed?",
		options: [
			"45 km/h",
			"50 km/h",
			"55 km/h",
			"75 km/h"
		],
		answer: 1,
		explanation: "Speed = distance/time = 150/3 = 50 km/h.",
		concepts: ["Speed = distance / time"],
		mistake: "Dividing time by distance (3/150) or confusing with 150 × 3."
	},
	{
		id: "ari-e7",
		topic: "Arithmetic",
		subtopic: "Divisibility",
		difficulty: "easy",
		q: "Which of the following numbers is divisible by both 4 and 9?",
		options: [
			"108",
			"114",
			"126",
			"132"
		],
		answer: 0,
		explanation: "108 = 4 × 27 and 1 + 0 + 8 = 9 (divisible by 9). Check others: 114/4 fails, 126/4 fails, 132 fails the 9-test (1+3+2 = 6).",
		concepts: ["Divisibility rules for 4 (last two digits) and 9 (digit sum)"],
		mistake: "Testing divisibility by 4 only and picking 132."
	},
	{
		id: "ari-e8",
		topic: "Arithmetic",
		subtopic: "Interest",
		difficulty: "easy",
		q: "What is the simple interest on Tk 5,000 at 5% per year for 2 years?",
		options: [
			"Tk 250",
			"Tk 500",
			"Tk 525",
			"Tk 550"
		],
		answer: 1,
		explanation: "SI = P·r·t/100 = 5000 × 5 × 2 / 100 = 500.",
		concepts: ["Simple interest formula"],
		mistake: "Using compound interest (525) when the question says simple."
	},
	{
		id: "ari-m1",
		topic: "Arithmetic",
		subtopic: "Percentages",
		difficulty: "medium",
		q: "A shirt is discounted 20%, then a further 10% is taken off the reduced price. What is the total discount?",
		options: [
			"28%",
			"30%",
			"30.5%",
			"32%"
		],
		answer: 0,
		explanation: "Final price = P × 0.8 × 0.9 = 0.72P. Total discount = 28%.",
		concepts: ["Successive percentage change: multiply factors"],
		mistake: "Adding the percentages (20% + 10% = 30%)."
	},
	{
		id: "ari-m2",
		topic: "Arithmetic",
		subtopic: "Averages",
		difficulty: "medium",
		q: "The average of 5 numbers is 12. If one number is removed, the average of the remaining 4 is 10. What number was removed?",
		options: [
			"10",
			"16",
			"20",
			"22"
		],
		answer: 2,
		explanation: "Original sum = 60. New sum = 40. Removed = 60 − 40 = 20.",
		concepts: ["Working with sums from averages"],
		mistake: "Averaging the averages (12 − 10 = 2 or similar)."
	},
	{
		id: "ari-m3",
		topic: "Arithmetic",
		subtopic: "LCM & HCF",
		difficulty: "medium",
		q: "What is the greatest common divisor (GCD) of 36, 48 and 60?",
		options: [
			"6",
			"12",
			"18",
			"24"
		],
		answer: 1,
		explanation: "36 = 2²·3², 48 = 2⁴·3, 60 = 2²·3·5. Common factors: 2²·3 = 12.",
		concepts: ["GCD via prime factorization"],
		mistake: "Confusing GCD with LCM (720 for these numbers)."
	},
	{
		id: "ari-m4",
		topic: "Arithmetic",
		subtopic: "Percentages",
		difficulty: "medium",
		q: "The price of an item increases by 25% and then decreases by 20%. What is the net change?",
		options: [
			"5% increase",
			"No change",
			"5% decrease",
			"10% decrease"
		],
		answer: 1,
		explanation: "New price = P × 1.25 × 0.8 = P. Net change = 0.",
		concepts: ["Successive percentage change: multiply factors"],
		mistake: "Adding 25% − 20% = 5% and choosing a net increase."
	},
	{
		id: "ari-m5",
		topic: "Arithmetic",
		subtopic: "Ratio & Proportion",
		difficulty: "medium",
		q: "If 7 workers can complete a job in 12 days, how long will 14 workers take at the same rate?",
		options: [
			"4 days",
			"6 days",
			"12 days",
			"24 days"
		],
		answer: 1,
		explanation: "Doubling the workers halves the time (inverse proportion): 12/2 = 6 days.",
		concepts: ["Inverse proportion: workers × days = constant"],
		mistake: "Assuming direct proportion: 12 × 2 = 24 days."
	},
	{
		id: "ari-m6",
		topic: "Arithmetic",
		subtopic: "Percentages",
		difficulty: "medium",
		q: "40% of a number is 56. What is the number?",
		options: [
			"22.4",
			"96",
			"140",
			"160"
		],
		answer: 2,
		explanation: "0.40 × n = 56 → n = 56/0.4 = 140.",
		concepts: ["Reverse percentage problems"],
		mistake: "Computing 56 × 1.4 = 78.4 or 56 × 0.6."
	},
	{
		id: "ari-m7",
		topic: "Arithmetic",
		subtopic: "Interest",
		difficulty: "medium",
		q: "What is the compound interest on Tk 10,000 at 10% per year for 2 years (compounded annually)?",
		options: [
			"Tk 2,000",
			"Tk 2,100",
			"Tk 2,200",
			"Tk 2,310"
		],
		answer: 1,
		explanation: "Amount = 10000 × 1.1² = 12,100. CI = 12,100 − 10,000 = 2,100.",
		concepts: ["Compound interest: A = P(1 + r)ⁿ"],
		mistake: "Using simple interest (2,000) instead of compounding."
	},
	{
		id: "ari-m8",
		topic: "Arithmetic",
		subtopic: "Ratio & Proportion",
		difficulty: "medium",
		q: "If a : b = 2 : 3 and b : c = 4 : 5, what is a : c?",
		options: [
			"2 : 5",
			"8 : 15",
			"4 : 5",
			"6 : 15"
		],
		answer: 1,
		explanation: "a : b : c — make b common: a : b = 8 : 12, b : c = 12 : 15. So a : c = 8 : 15.",
		concepts: ["Linking ratios through a common term"],
		mistake: "Ignoring the shared term b and answering 2 : 5."
	},
	{
		id: "ari-m9",
		topic: "Arithmetic",
		subtopic: "Averages",
		difficulty: "medium",
		q: "What is the average of the first 10 positive even integers?",
		options: [
			"9",
			"10",
			"11",
			"12"
		],
		answer: 2,
		explanation: "The even numbers 2, 4, …, 20 are an AP with average = (first + last)/2 = (2 + 20)/2 = 11.",
		concepts: ["Average of an AP = mean of first and last terms"],
		mistake: "Using 10 (half of the count) or forgetting the sequence starts at 2."
	},
	{
		id: "ari-m10",
		topic: "Arithmetic",
		subtopic: "Interest",
		difficulty: "medium",
		q: "A sum of money doubles in 8 years at simple interest. What is the annual rate of interest?",
		options: [
			"8%",
			"10%",
			"12.5%",
			"25%"
		],
		answer: 2,
		explanation: "Interest earned = 100% of principal in 8 years. Rate = 100/8 = 12.5% per year.",
		concepts: ["Simple interest growth is linear"],
		mistake: "Using compound logic (doubling is not 100/8 under CI)."
	},
	{
		"id": "ari-m11",
		"topic": "Arithmetic",
		"subtopic": "Percentages",
		"difficulty": "medium",
		"q": "The price of a stock rises by 10% and then falls by 10%. Compared to the original price, the final price is:",
		"options": [
			"The same",
			"1% lower",
			"1% higher",
			"10% lower"
		],
		"answer": 1,
		"explanation": "Final = P × 1.10 × 0.90 = 0.99P — exactly 1% below the original. A rise and fall of the same percent never cancel.",
		"concepts": ["Successive percentage change: multiply factors"],
		"mistake": "Assuming the two changes cancel (same price) instead of multiplying 1.1 × 0.9 = 0.99."
	},
	{
		"id": "ari-m12",
		"topic": "Arithmetic",
		"subtopic": "Averages",
		"difficulty": "medium",
		"q": "What is the average of the first 50 odd numbers?",
		"options": [
			"25",
			"49",
			"50",
			"51"
		],
		"answer": 2,
		"explanation": "The first 50 odd numbers run from 1 to 99. Their average = (1 + 99)/2 = 50. (Sum = 50² = 2500; 2500/50 = 50.)",
		"concepts": ["Average of an AP = mean of first and last terms", "Sum of first n odd numbers = n²"],
		"mistake": "Halving the count (50/2 = 25) or landing one off at 49/51."
	},
	{
		id: "ari-h1",
		topic: "Arithmetic",
		subtopic: "Speed & Distance",
		difficulty: "hard",
		q: "A train 300 m long crosses a pole in 15 seconds. What is its speed in km/h?",
		options: [
			"60 km/h",
			"66 km/h",
			"72 km/h",
			"75 km/h"
		],
		answer: 2,
		explanation: "Speed = 300/15 = 20 m/s. Convert: 20 × 18/5 = 72 km/h.",
		concepts: ["Crossing a pole = travelling own length", "m/s ↔ km/h conversion (×18/5)"],
		mistake: "Multiplying by 5/18 instead of 18/5 → 11.1 km/h."
	},
	{
		id: "ari-h2",
		topic: "Arithmetic",
		subtopic: "Mixtures",
		difficulty: "hard",
		q: "A 30-litre solution is 60% acid. How much water must be added to make it 40% acid?",
		options: [
			"10 L",
			"15 L",
			"18 L",
			"20 L"
		],
		answer: 1,
		explanation: "Acid = 18 L. After adding x litres of water: 18/(30 + x) = 0.4 → 30 + x = 45 → x = 15.",
		concepts: ["Conservation of solute in mixtures"],
		mistake: "Setting up 60% of (30 + x) = 40% of 30 (wrong conservation equation)."
	},
	{
		id: "ari-h3",
		topic: "Arithmetic",
		subtopic: "LCM & HCF",
		difficulty: "hard",
		q: "Two numbers are in the ratio 3 : 4 and their LCM is 84. What is their sum?",
		options: [
			"21",
			"35",
			"42",
			"49"
		],
		answer: 3,
		explanation: "Let the numbers be 3x and 4x. LCM(3x, 4x) = 12x = 84 → x = 7. Numbers: 21 and 28. Sum = 49.",
		concepts: ["LCM of ratio terms", "HCF × LCM = product of numbers"],
		mistake: "Using LCM = 7x (giving x = 12 and sum 84)."
	},
	{
		id: "ari-h4",
		topic: "Arithmetic",
		subtopic: "Percentages",
		difficulty: "hard",
		q: "If x is 30% of y, then y is what percent of x?",
		options: [
			"30%",
			"70%",
			"133.33%",
			"333.33%"
		],
		answer: 3,
		explanation: "x = 0.3y → y = x/0.3 = (10/3)x ≈ 333.33% of x.",
		concepts: ["Reversing percentage relations"],
		mistake: "Answering 133.33% (computing y = 1.3x)."
	},
	{
		id: "ari-h5",
		topic: "Arithmetic",
		subtopic: "Number Properties",
		difficulty: "hard",
		q: "The product of two numbers is 96 and their sum is 20. What is their difference?",
		options: [
			"2",
			"4",
			"6",
			"8"
		],
		answer: 1,
		explanation: "Numbers are 12 and 8 (12 × 8 = 96, 12 + 8 = 20). Difference = 4.",
		concepts: ["Sum–product pairs"],
		mistake: "Guessing 16 and 6 (sum 22) or 24 and 4 (product 96 but sum 28)."
	},
	{
		id: "ari-h6",
		topic: "Arithmetic",
		subtopic: "Averages",
		difficulty: "hard",
		q: "The average of n numbers is 20. If 30 is added to each number, what is the new average?",
		options: [
			"20",
			"30",
			"20 + 30/n",
			"50"
		],
		answer: 3,
		explanation: "Adding a constant to every term adds the same constant to the average: 20 + 30 = 50.",
		concepts: ["Effect of shifting all values on mean"],
		mistake: "Thinking the increase gets \"diluted\" by n (choosing 20 + 30/n)."
	},
	{
		id: "ari-h7",
		topic: "Arithmetic",
		subtopic: "Speed & Distance",
		difficulty: "hard",
		q: "A boat travels 30 km downstream in 2 hours and returns upstream in 3 hours. What is the speed of the current?",
		options: [
			"2 km/h",
			"2.5 km/h",
			"5 km/h",
			"12.5 km/h"
		],
		answer: 1,
		explanation: "Downstream speed = 15 km/h, upstream = 10 km/h. Current = (15 − 10)/2 = 2.5 km/h; boat speed = 12.5 km/h.",
		concepts: ["Downstream = boat + current, upstream = boat − current"],
		mistake: "Answering 12.5 (the boat's speed) instead of the current."
	},
	{
		id: "ari-h8",
		topic: "Arithmetic",
		subtopic: "Number Properties",
		difficulty: "hard",
		q: "What is the sum of the first 20 odd numbers?",
		options: [
			"200",
			"400",
			"420",
			"441"
		],
		answer: 1,
		explanation: "Sum of first n odd numbers = n² = 20² = 400.",
		concepts: ["Sum of first n odd numbers = n²"],
		mistake: "Using n(n+1)/2 = 210 (formula for first n naturals)."
	}
];
//#endregion
//#region src/data/questions/geometry.js
const questions$3 = [
	{
		id: "geo-e1",
		topic: "Geometry",
		subtopic: "Triangles",
		difficulty: "easy",
		q: "Two angles of a triangle measure 60° and 70°. What is the third angle?",
		options: [
			"40°",
			"50°",
			"60°",
			"70°"
		],
		answer: 1,
		explanation: "Angles of a triangle sum to 180°: 180 − (60 + 70) = 50°.",
		concepts: ["Angle sum of a triangle"],
		mistake: "Subtracting from 360° (quadrilateral rule)."
	},
	{
		id: "geo-e2",
		topic: "Geometry",
		subtopic: "Circles",
		difficulty: "easy",
		q: "What is the area of a circle of radius 7? (Use π = 22/7)",
		options: [
			"44",
			"154",
			"308",
			"616"
		],
		answer: 1,
		explanation: "Area = πr² = (22/7) × 49 = 154.",
		concepts: ["Circle area formula"],
		mistake: "Using 2πr (44) — that is the circumference."
	},
	{
		id: "geo-e3",
		topic: "Geometry",
		subtopic: "Quadrilaterals",
		difficulty: "easy",
		q: "What is the perimeter of a rectangle 8 cm long and 5 cm wide?",
		options: [
			"13 cm",
			"26 cm",
			"40 cm",
			"80 cm"
		],
		answer: 1,
		explanation: "Perimeter = 2(8 + 5) = 26 cm.",
		concepts: ["Rectangle perimeter"],
		mistake: "Computing area (40) instead of perimeter."
	},
	{
		id: "geo-e4",
		topic: "Geometry",
		subtopic: "Polygons",
		difficulty: "easy",
		q: "What is the sum of the interior angles of a quadrilateral?",
		options: [
			"180°",
			"270°",
			"360°",
			"540°"
		],
		answer: 2,
		explanation: "(n − 2) × 180° with n = 4: 2 × 180° = 360°.",
		concepts: ["Interior angle sum formula (n − 2) × 180°"],
		mistake: "Using the triangle rule (180°)."
	},
	{
		id: "geo-e5",
		topic: "Geometry",
		subtopic: "Triangles",
		difficulty: "easy",
		q: "A right triangle has legs of 6 and 8. What is the hypotenuse?",
		options: [
			"9",
			"10",
			"12",
			"14"
		],
		answer: 1,
		explanation: "√(36 + 64) = √100 = 10. (6-8-10 is a multiple of the 3-4-5 triple.)",
		concepts: ["Pythagorean theorem", "Pythagorean triples"],
		mistake: "Adding the legs (14) or applying the theorem incorrectly."
	},
	{
		id: "geo-e6",
		topic: "Geometry",
		subtopic: "Solid Geometry",
		difficulty: "easy",
		q: "What is the volume of a cube with side length 4?",
		options: [
			"16",
			"24",
			"48",
			"64"
		],
		answer: 3,
		explanation: "Volume = side³ = 4³ = 64.",
		concepts: ["Volume of a cube"],
		mistake: "Computing surface area (96) or 3s = 12."
	},
	{
		id: "geo-e7",
		topic: "Geometry",
		subtopic: "Angles",
		difficulty: "easy",
		q: "What is the complement of a 35° angle?",
		options: [
			"35°",
			"55°",
			"65°",
			"145°"
		],
		answer: 1,
		explanation: "Complementary angles sum to 90°: 90 − 35 = 55°.",
		concepts: ["Complementary (90°) vs supplementary (180°) angles"],
		mistake: "Subtracting from 180° (gives the supplement, 145°)."
	},
	{
		id: "geo-e8",
		topic: "Geometry",
		subtopic: "Circles",
		difficulty: "easy",
		q: "What is the circumference of a circle with diameter 14? (Use π = 22/7)",
		options: [
			"22",
			"44",
			"88",
			"154"
		],
		answer: 1,
		explanation: "Circumference = πd = (22/7) × 14 = 44.",
		concepts: ["Circumference from diameter"],
		mistake: "Using πr² (154) — that is the area."
	},
	{
		id: "geo-m1",
		topic: "Geometry",
		subtopic: "Triangles",
		difficulty: "medium",
		q: "A triangle has sides 9, 12 and 15. What is its area?",
		options: [
			"54",
			"60",
			"67.5",
			"108"
		],
		answer: 0,
		explanation: "9² + 12² = 81 + 144 = 225 = 15², so it is right-angled. Area = ½ × 9 × 12 = 54.",
		concepts: ["Recognizing right triangles (Pythagorean triples)", "Area of a right triangle"],
		mistake: "Using Heron's formula with errors, or assuming 15 is a leg."
	},
	{
		id: "geo-m2",
		topic: "Geometry",
		subtopic: "Coordinate Geometry",
		difficulty: "medium",
		q: "What is the slope of the line through (2, 3) and (6, 11)?",
		options: [
			"1/2",
			"2",
			"3",
			"8"
		],
		answer: 1,
		explanation: "Slope = (11 − 3)/(6 − 2) = 8/4 = 2.",
		concepts: ["Slope formula (rise over run)"],
		mistake: "Inverting the ratio: (6 − 2)/(11 − 3) = 1/2."
	},
	{
		id: "geo-m3",
		topic: "Geometry",
		subtopic: "Coordinate Geometry",
		difficulty: "medium",
		q: "What is the distance between the points (−1, 2) and (5, 10)?",
		options: [
			"8",
			"10",
			"12",
			"14"
		],
		answer: 1,
		explanation: "d = √[(5 − (−1))² + (10 − 2)²] = √(36 + 64) = √100 = 10.",
		concepts: ["Distance formula"],
		mistake: "Sign error with −1 giving Δx = 4."
	},
	{
		id: "geo-m4",
		topic: "Geometry",
		subtopic: "Circles",
		difficulty: "medium",
		q: "A sector of a circle of radius 10 has a central angle of 90°. What is the area of the sector?",
		options: [
			"10π",
			"25π",
			"50π",
			"100π"
		],
		answer: 1,
		explanation: "Sector area = (90/360) × π × 10² = ¼ × 100π = 25π.",
		concepts: ["Sector area as a fraction of the circle"],
		mistake: "Using 90/100 as the fraction, or radius as diameter."
	},
	{
		id: "geo-m5",
		topic: "Geometry",
		subtopic: "Polygons",
		difficulty: "medium",
		q: "What is the measure of each interior angle of a regular hexagon?",
		options: [
			"108°",
			"120°",
			"135°",
			"150°"
		],
		answer: 1,
		explanation: "Interior sum = (6 − 2) × 180° = 720°. Each angle = 720°/6 = 120°.",
		concepts: ["Regular polygon interior angles"],
		mistake: "Using exterior angle 360/n = 60° (that is the exterior angle)."
	},
	{
		id: "geo-m6",
		topic: "Geometry",
		subtopic: "Quadrilaterals",
		difficulty: "medium",
		q: "What is the length of the diagonal of a square with side 8?",
		options: [
			"8",
			"8√2",
			"8√3",
			"16"
		],
		answer: 1,
		explanation: "Diagonal = side√2 = 8√2 (from the 45-45-90 triangle).",
		concepts: ["45-45-90 triangle ratio 1 : 1 : √2"],
		mistake: "Using √3 (the 30-60-90 ratio) or doubling the side."
	},
	{
		id: "geo-m7",
		topic: "Geometry",
		subtopic: "Solid Geometry",
		difficulty: "medium",
		q: "What is the volume of a cylinder with radius 3 and height 5?",
		options: [
			"15π",
			"30π",
			"45π",
			"75π"
		],
		answer: 2,
		explanation: "V = πr²h = π × 9 × 5 = 45π.",
		concepts: ["Cylinder volume"],
		mistake: "Using πrh = 15π (forgetting to square r)."
	},
	{
		id: "geo-m8",
		topic: "Geometry",
		subtopic: "Similarity",
		difficulty: "medium",
		q: "Two similar triangles have sides in ratio 2 : 3. If the area of the smaller triangle is 16, what is the area of the larger?",
		options: [
			"24",
			"32",
			"36",
			"64"
		],
		answer: 2,
		explanation: "Area scales as the square of the side ratio: 16 × (3/2)² = 16 × 9/4 = 36.",
		concepts: ["Area ratio = (linear ratio)² for similar figures"],
		mistake: "Scaling area by the linear ratio: 16 × 3/2 = 24."
	},
	{
		id: "geo-m9",
		topic: "Geometry",
		subtopic: "Coordinate Geometry",
		difficulty: "medium",
		q: "What is the midpoint of the segment joining (2, −3) and (8, 5)?",
		options: [
			"(5, 1)",
			"(3, 2)",
			"(10, 2)",
			"(6, 1)"
		],
		answer: 0,
		explanation: "Midpoint = ((2 + 8)/2, (−3 + 5)/2) = (5, 1).",
		concepts: ["Midpoint formula"],
		mistake: "Subtracting coordinates instead of averaging."
	},
	{
		id: "geo-m10",
		topic: "Geometry",
		subtopic: "Quadrilaterals",
		difficulty: "medium",
		q: "What is the area of a trapezoid with parallel sides 10 and 6 and height 4?",
		options: [
			"24",
			"32",
			"40",
			"48"
		],
		answer: 1,
		explanation: "Area = ½(a + b)h = ½(10 + 6)(4) = 32.",
		concepts: ["Trapezoid area formula"],
		mistake: "Multiplying the two bases first: ½ × 10 × 6 × 4."
	},
	{
		"id": "geo-m11",
		"topic": "Geometry",
		"subtopic": "Circles",
		"difficulty": "medium",
		"q": "The area of a circle is 49π. What is its circumference?",
		"options": [
			"7π",
			"14π",
			"28π",
			"49π"
		],
		"answer": 1,
		"explanation": "πr² = 49π → r = 7. Circumference = 2πr = 14π.",
		"concepts": ["Working backwards from area to radius"],
		"mistake": "Answering 49π (the area) or 28π (forgetting the ½ in r = √(A/π))."
	},
	{
		"id": "geo-m12",
		"topic": "Geometry",
		"subtopic": "Angles",
		"difficulty": "medium",
		"q": "An exterior angle of a triangle measures 110°, and one of its two opposite interior angles is 60°. What is the other opposite interior angle?",
		"options": [
			"50°",
			"55°",
			"70°",
			"110°"
		],
		"answer": 0,
		"explanation": "An exterior angle equals the sum of the two opposite interior angles: 110° = 60° + x → x = 50°.",
		"concepts": ["Exterior angle theorem"],
		"mistake": "Computing 180° − 110° = 70° (the adjacent interior angle, not the opposite one)."
	},
	{
		id: "geo-h1",
		topic: "Geometry",
		subtopic: "Triangles",
		difficulty: "hard",
		q: "A right triangle has hypotenuse 13 and one leg 5. What is its area?",
		options: [
			"25",
			"30",
			"32.5",
			"60"
		],
		answer: 1,
		explanation: "Other leg = √(169 − 25) = 12. Area = ½ × 5 × 12 = 30.",
		concepts: ["Pythagorean theorem (5-12-13 triple)", "Triangle area"],
		mistake: "Using the hypotenuse as a leg in the area: ½ × 5 × 13 = 32.5."
	},
	{
		id: "geo-h2",
		topic: "Geometry",
		subtopic: "Circles",
		difficulty: "hard",
		q: "A square has a diagonal of length 12. What is the area of the circle passing through all four vertices of the square?",
		options: [
			"24π",
			"36π",
			"72π",
			"144π"
		],
		answer: 1,
		explanation: "The circle's diameter equals the square's diagonal, so radius = 6. Area = 36π.",
		concepts: ["Circumscribed circle of a square", "Diagonal as diameter"],
		mistake: "Taking the side as the radius or using radius = 12."
	},
	{
		id: "geo-h3",
		topic: "Geometry",
		subtopic: "Coordinate Geometry",
		difficulty: "hard",
		q: "What is the x-intercept of the line 2x + 3y = 12?",
		options: [
			"3",
			"4",
			"6",
			"12"
		],
		answer: 2,
		explanation: "Set y = 0: 2x = 12 → x = 6. The x-intercept is (6, 0).",
		concepts: ["Intercepts of a line"],
		mistake: "Setting x = 0 instead (that gives the y-intercept, 4)."
	},
	{
		id: "geo-h4",
		topic: "Geometry",
		subtopic: "Triangles",
		difficulty: "hard",
		q: "What is the area of an equilateral triangle with side 6?",
		options: [
			"6√3",
			"9√3",
			"12√3",
			"18√3"
		],
		answer: 1,
		explanation: "Area = (√3/4)s² = (√3/4)(36) = 9√3.",
		concepts: ["Equilateral triangle area formula"],
		mistake: "Using height = side (6) → 18, or height = s√2."
	},
	{
		id: "geo-h5",
		topic: "Geometry",
		subtopic: "Polygons",
		difficulty: "hard",
		q: "Each interior angle of a regular polygon measures 150°. How many sides does it have?",
		options: [
			"9",
			"10",
			"12",
			"15"
		],
		answer: 2,
		explanation: "Exterior angle = 180° − 150° = 30°, and the exterior angles always sum to 360°, so n = 360/30 = 12.",
		concepts: ["Exterior angle = 360°/n", "Interior + exterior = 180°"],
		mistake: "Dividing 360 by 60 (the interior complement computed wrongly)."
	},
	{
		id: "geo-h6",
		topic: "Geometry",
		subtopic: "Solid Geometry",
		difficulty: "hard",
		q: "A cone has radius 3 and height 4. What is its volume?",
		options: [
			"12π",
			"16π",
			"36π",
			"48π"
		],
		answer: 0,
		explanation: "V = (1/3)πr²h = (1/3)π(9)(4) = 12π.",
		concepts: ["Cone volume = 1/3 of cylinder"],
		mistake: "Dropping the 1/3 factor (36π) or using the slant height."
	},
	{
		id: "geo-h7",
		topic: "Geometry",
		subtopic: "Coordinate Geometry",
		difficulty: "hard",
		q: "What is the distance of the point (3, −4) from the origin?",
		options: [
			"3",
			"4",
			"5",
			"7"
		],
		answer: 2,
		explanation: "d = √(3² + (−4)²) = √25 = 5.",
		concepts: ["Distance from origin", "3-4-5 right triangle"],
		mistake: "Adding coordinates as if both positive (7) or ignoring the square on −4."
	},
	{
		id: "geo-h8",
		topic: "Geometry",
		subtopic: "Quadrilaterals",
		difficulty: "hard",
		q: "A rectangle has a perimeter of 36 and its length is twice its width. What is its area?",
		options: [
			"54",
			"64",
			"72",
			"80"
		],
		answer: 2,
		explanation: "2(l + w) = 36 → l + w = 18. With l = 2w: 3w = 18 → w = 6, l = 12. Area = 72.",
		concepts: ["Perimeter-to-area reasoning"],
		mistake: "Solving l + w = 36 (forgetting the factor of 2) → l = 24, w = 12, area 288."
	}
];
//#endregion
//#region src/data/questions/wordProblems.js
const questions$2 = [
	{
		id: "wrd-e1",
		topic: "Word Problems",
		subtopic: "Money & Cost",
		difficulty: "easy",
		q: "A pen costs Tk 15 and a book costs Tk 45. What is the total cost of 3 pens and 2 books?",
		options: [
			"Tk 105",
			"Tk 120",
			"Tk 135",
			"Tk 150"
		],
		answer: 2,
		explanation: "3 × 15 + 2 × 45 = 45 + 90 = 135.",
		concepts: ["Setting up cost expressions"],
		mistake: "Multiplying 3 × 45 and 2 × 15 (swapping the quantities)."
	},
	{
		id: "wrd-e2",
		topic: "Word Problems",
		subtopic: "Speed & Distance",
		difficulty: "easy",
		q: "A man walks at 4 km/h for 90 minutes. How far does he walk?",
		options: [
			"4 km",
			"5 km",
			"6 km",
			"7.5 km"
		],
		answer: 2,
		explanation: "Time = 1.5 h. Distance = 4 × 1.5 = 6 km.",
		concepts: ["Distance = speed × time", "Unit conversion of minutes"],
		mistake: "Using 90 as hours (4 × 90) or forgetting to convert minutes."
	},
	{
		id: "wrd-e3",
		topic: "Word Problems",
		subtopic: "Profit & Loss",
		difficulty: "easy",
		q: "An item bought for Tk 200 is sold for Tk 250. What is the profit percent?",
		options: [
			"20%",
			"25%",
			"30%",
			"50%"
		],
		answer: 1,
		explanation: "Profit = 50. Profit% = 50/200 × 100 = 25%.",
		concepts: ["Profit percent is on cost price"],
		mistake: "Computing profit% on selling price: 50/250 = 20%."
	},
	{
		id: "wrd-e4",
		topic: "Word Problems",
		subtopic: "Age Problems",
		difficulty: "easy",
		q: "A father is three times as old as his son, and the sum of their ages is 48. How old is the son?",
		options: [
			"12",
			"14",
			"16",
			"36"
		],
		answer: 0,
		explanation: "s + 3s = 48 → 4s = 48 → s = 12 (father is 36).",
		concepts: ["Age problems with ratios"],
		mistake: "Answering 36 (the father's age)."
	},
	{
		id: "wrd-e5",
		topic: "Word Problems",
		subtopic: "Ratio & Proportion",
		difficulty: "easy",
		q: "18 chocolates are divided between two children in the ratio 2 : 1. How many does the elder child get?",
		options: [
			"6",
			"9",
			"12",
			"15"
		],
		answer: 2,
		explanation: "Parts = 3, each part = 6. Elder (larger share) = 12.",
		concepts: ["Dividing in a ratio"],
		mistake: "Giving the elder child the smaller share (6)."
	},
	{
		id: "wrd-e6",
		topic: "Word Problems",
		subtopic: "Work & Time",
		difficulty: "easy",
		q: "If 1 machine fills a tank in 6 hours, how long will 2 identical machines take working together?",
		options: [
			"2 hours",
			"3 hours",
			"4 hours",
			"12 hours"
		],
		answer: 1,
		explanation: "Two machines double the rate: 6/2 = 3 hours.",
		concepts: ["Inverse proportion in work problems"],
		mistake: "Adding times or answering 12."
	},
	{
		id: "wrd-e7",
		topic: "Word Problems",
		subtopic: "Discount",
		difficulty: "easy",
		q: "An item marked Tk 800 is sold for Tk 680. What is the discount percent?",
		options: [
			"12%",
			"15%",
			"17%",
			"20%"
		],
		answer: 1,
		explanation: "Discount = 120. Discount% = 120/800 × 100 = 15%.",
		concepts: ["Discount percent is on marked price"],
		mistake: "Computing 120/680 (using selling price)."
	},
	{
		id: "wrd-e8",
		topic: "Word Problems",
		subtopic: "Money & Cost",
		difficulty: "easy",
		q: "A person spends 70% of his salary and saves Tk 6,000. What is his salary?",
		options: [
			"Tk 18,000",
			"Tk 20,000",
			"Tk 24,000",
			"Tk 30,000"
		],
		answer: 1,
		explanation: "Savings = 30% of salary = 6,000 → salary = 6,000/0.3 = 20,000.",
		concepts: ["Whole–part percentage relations"],
		mistake: "Computing 6,000 × 0.7 or 6,000/0.7."
	},
	{
		id: "wrd-m1",
		topic: "Word Problems",
		subtopic: "Work & Time",
		difficulty: "medium",
		q: "A can finish a job in 6 days and B in 12 days. Working together, how long will they take?",
		options: [
			"3 days",
			"4 days",
			"4.5 days",
			"9 days"
		],
		answer: 1,
		explanation: "Combined rate = 1/6 + 1/12 = 3/12 = 1/4. Time = 4 days.",
		concepts: ["Work rates add: 1/t = 1/a + 1/b"],
		mistake: "Averaging the times: (6 + 12)/2 = 9 days."
	},
	{
		id: "wrd-m2",
		topic: "Word Problems",
		subtopic: "Work & Time",
		difficulty: "medium",
		q: "A pipe fills a tank in 8 hours, while another pipe empties it in 12 hours. If both are open, how long to fill the empty tank?",
		options: [
			"20 hours",
			"24 hours",
			"28 hours",
			"48 hours"
		],
		answer: 1,
		explanation: "Net rate = 1/8 − 1/12 = 1/24. Time = 24 hours.",
		concepts: ["Opposing rates subtract"],
		mistake: "Adding the rates (1/20) and answering 20 hours."
	},
	{
		id: "wrd-m3",
		topic: "Word Problems",
		subtopic: "Speed & Distance",
		difficulty: "medium",
		q: "A car travels from A to B at 60 km/h and returns at 40 km/h. What is its average speed for the whole trip?",
		options: [
			"45 km/h",
			"48 km/h",
			"50 km/h",
			"52 km/h"
		],
		answer: 1,
		explanation: "Average = 2ab/(a + b) = 2(60)(40)/100 = 48 km/h. (Equal distances, not equal times.)",
		concepts: ["Harmonic mean for equal-distance trips"],
		mistake: "Taking the arithmetic mean: (60 + 40)/2 = 50."
	},
	{
		id: "wrd-m4",
		topic: "Word Problems",
		subtopic: "Age Problems",
		difficulty: "medium",
		q: "In 5 years a mother will be three times as old as her daughter; 5 years ago she was seven times as old. How old is the mother now?",
		options: [
			"35",
			"38",
			"40",
			"45"
		],
		answer: 2,
		explanation: "m + 5 = 3(d + 5) and m − 5 = 7(d − 5). Subtracting: 10 = −4d + 50 → d = 10, m = 40.",
		concepts: ["Setting up two age equations"],
		mistake: "Dropping the ±5 shifts when forming the equations."
	},
	{
		id: "wrd-m5",
		topic: "Word Problems",
		subtopic: "Profit & Loss",
		difficulty: "medium",
		q: "An item costing Tk 400 is marked up 50% and then sold at a 20% discount on the marked price. What is the profit percent?",
		options: [
			"15%",
			"20%",
			"25%",
			"30%"
		],
		answer: 1,
		explanation: "Marked = 600. SP = 600 × 0.8 = 480. Profit% = 80/400 = 20%.",
		concepts: ["Mark-up then discount chain"],
		mistake: "Computing profit on the marked price: 80/600 ≈ 13.3%."
	},
	{
		id: "wrd-m6",
		topic: "Word Problems",
		subtopic: "Work & Time",
		difficulty: "medium",
		q: "A and B together finish a job in 8 days. A alone takes 12 days. How long would B alone take?",
		options: [
			"16 days",
			"20 days",
			"24 days",
			"30 days"
		],
		answer: 2,
		explanation: "1/B = 1/8 − 1/12 = 1/24 → B alone takes 24 days.",
		concepts: ["Subtracting work rates"],
		mistake: "Subtracting days directly: 12 − 8 = 4."
	},
	{
		id: "wrd-m7",
		topic: "Word Problems",
		subtopic: "Speed & Distance",
		difficulty: "medium",
		q: "A train leaves at 60 km/h. Two hours later a second train leaves the same station at 80 km/h on the same track. How long after the second train departs does it catch up?",
		options: [
			"4 hours",
			"5 hours",
			"6 hours",
			"8 hours"
		],
		answer: 2,
		explanation: "Head start = 120 km. Relative speed = 20 km/h. Time = 120/20 = 6 hours.",
		concepts: ["Relative speed in the same direction"],
		mistake: "Dividing 120 by 60 (ignoring relative speed)."
	},
	{
		id: "wrd-m8",
		topic: "Word Problems",
		subtopic: "Money & Cost",
		difficulty: "medium",
		q: "If 5 workers earn Tk 7,500 in a week, how much will 8 workers earn in a week at the same rate?",
		options: [
			"Tk 9,600",
			"Tk 10,500",
			"Tk 11,250",
			"Tk 12,000"
		],
		answer: 3,
		explanation: "Per worker = 1,500. For 8 workers: 8 × 1,500 = 12,000.",
		concepts: ["Direct proportion (unitary method)"],
		mistake: "Using inverse proportion: 7500 × 5/8."
	},
	{
		id: "wrd-m9",
		topic: "Word Problems",
		subtopic: "Percentages",
		difficulty: "medium",
		q: "A town's population of 25,000 rises 10% one year and falls 10% the next. What is the final population?",
		options: [
			"24,750",
			"25,000",
			"25,250",
			"25,500"
		],
		answer: 0,
		explanation: "25,000 × 1.1 × 0.9 = 25,000 × 0.99 = 24,750.",
		concepts: ["Successive percentage change"],
		mistake: "Assuming no net change (25,000)."
	},
	{
		id: "wrd-m10",
		topic: "Word Problems",
		subtopic: "Clocks & Time",
		difficulty: "medium",
		q: "What is the angle between the hands of a clock at 3:30?",
		options: [
			"60°",
			"70°",
			"75°",
			"90°"
		],
		answer: 2,
		explanation: "Minute hand at 180°; hour hand at 90° + 30 × 0.5 = 105°. Angle = 75°.",
		concepts: ["Hour hand moves 0.5°/min, minute hand 6°/min"],
		mistake: "Ignoring the hour hand's half-degree per minute drift."
	},
	{
		"id": "wrd-m11",
		"topic": "Word Problems",
		"subtopic": "Age Problems",
		"difficulty": "medium",
		"q": "A father is four times as old as his son. In 20 years, he will be twice as old as his son. How old is the son now?",
		"options": [
			"8",
			"10",
			"12",
			"20"
		],
		"answer": 1,
		"explanation": "Let the son be s. 4s + 20 = 2(s + 20) → 4s + 20 = 2s + 40 → 2s = 20 → s = 10 (father 40, and 60 = 2 × 30 checks out).",
		"concepts": ["Age problems across a time shift"],
		"mistake": "Forgetting the +20 applies to BOTH ages, or answering the father's age (40)."
	},
	{
		"id": "wrd-m12",
		"topic": "Word Problems",
		"subtopic": "Profit & Loss",
		"difficulty": "medium",
		"q": "A trader sells an item for Tk 720 at a 10% loss. At what price should he sell it to make a 15% profit?",
		"options": [
			"Tk 828",
			"Tk 900",
			"Tk 920",
			"Tk 960"
		],
		"answer": 2,
		"explanation": "CP = 720/0.9 = Tk 800. For 15% profit: SP = 800 × 1.15 = Tk 920.",
		"concepts": ["Recovering cost price from a loss", "Two-step profit problems"],
		"mistake": "Applying +15% to the selling price: 720 × 1.15 = 828."
	},
	{
		id: "wrd-h1",
		topic: "Word Problems",
		subtopic: "Work & Time",
		difficulty: "hard",
		q: "A alone does a job in 12 days, B in 15 days and C in 20 days. Working together, how long do they take?",
		options: [
			"4 days",
			"5 days",
			"6 days",
			"7 days"
		],
		answer: 1,
		explanation: "Rates: 1/12 + 1/15 + 1/20 = 5/60 + 4/60 + 3/60 = 12/60 = 1/5. Time = 5 days.",
		concepts: ["Adding three work rates"],
		mistake: "Arithmetic slips on the common denominator (using 12 as LCM instead of 60)."
	},
	{
		id: "wrd-h2",
		topic: "Word Problems",
		subtopic: "Speed & Distance",
		difficulty: "hard",
		q: "Two trains 200 m and 300 m long travel at 54 km/h and 36 km/h toward each other. How long do they take to completely pass each other?",
		options: [
			"15 s",
			"20 s",
			"25 s",
			"30 s"
		],
		answer: 1,
		explanation: "Relative speed = 90 km/h = 25 m/s. Total length = 500 m. Time = 500/25 = 20 s.",
		concepts: ["Opposite directions: speeds add", "Crossing = sum of lengths"],
		mistake: "Forgetting to convert km/h to m/s (using 90 m/s)."
	},
	{
		id: "wrd-h3",
		topic: "Word Problems",
		subtopic: "Money & Cost",
		difficulty: "hard",
		q: "A man spends 3/5 of his money, then 40% of the remainder, and is left with Tk 1,800. How much did he start with?",
		options: [
			"Tk 6,000",
			"Tk 7,500",
			"Tk 9,000",
			"Tk 10,800"
		],
		answer: 1,
		explanation: "After first spend: 2/5 left. After second: 0.6 × 2/5 = 6/25. So (6/25)M = 1,800 → M = 7,500.",
		concepts: ["Sequential fractions of remainders"],
		mistake: "Taking 40% of the original amount instead of the remainder."
	},
	{
		id: "wrd-h4",
		topic: "Word Problems",
		subtopic: "Work & Time",
		difficulty: "hard",
		q: "A cistern is filled by a pipe in 10 hours, but a leak empties the full cistern in 15 hours. With both open and the cistern empty, how long to fill it?",
		options: [
			"25 hours",
			"30 hours",
			"35 hours",
			"40 hours"
		],
		answer: 1,
		explanation: "Net rate = 1/10 − 1/15 = 1/30. Time = 30 hours.",
		concepts: ["Leak as a negative rate"],
		mistake: "Adding rates or averaging (12.5 h)."
	},
	{
		id: "wrd-h5",
		topic: "Word Problems",
		subtopic: "Partnership",
		difficulty: "hard",
		q: "A invests Tk 20,000 for 12 months and B invests Tk 30,000 for 8 months in a business that earns Tk 18,000 profit. What is B's share?",
		options: [
			"Tk 8,000",
			"Tk 9,000",
			"Tk 10,000",
			"Tk 10,800"
		],
		answer: 1,
		explanation: "Ratio = 20,000 × 12 : 30,000 × 8 = 240,000 : 240,000 = 1 : 1. B gets 9,000.",
		concepts: ["Profit shared in ratio of capital × time"],
		mistake: "Splitting in the ratio of capital only (2 : 3)."
	},
	{
		id: "wrd-h6",
		topic: "Word Problems",
		subtopic: "Speed & Distance",
		difficulty: "hard",
		q: "A car covers 40 km at 80 km/h and then 90 km at 60 km/h. What is its average speed for the whole journey?",
		options: [
			"62 km/h",
			"65 km/h",
			"70 km/h",
			"72 km/h"
		],
		answer: 1,
		explanation: "Times: 40/80 = 0.5 h and 90/60 = 1.5 h. Total = 130 km in 2 h → average = 65 km/h.",
		concepts: ["Average speed = total distance / total time"],
		mistake: "Averaging the two speeds: (80 + 60)/2 = 70 km/h."
	},
	{
		id: "wrd-h7",
		topic: "Word Problems",
		subtopic: "Profit & Loss",
		difficulty: "hard",
		q: "A man sells two watches at Tk 990 each: one at 10% profit and the other at 10% loss. What is his overall result?",
		options: [
			"No profit, no loss",
			"1% loss",
			"1% profit",
			"2% loss"
		],
		answer: 1,
		explanation: "Costs: 990/1.1 = 900 and 990/0.9 = 1,100. Total cost 2,000 vs revenue 1,980 → loss 20/2,000 = 1%.",
		concepts: ["Equal SP with equal ±% always gives a net loss of (x/10)² %"],
		mistake: "Assuming equal +10% and −10% cancel out."
	},
	{
		id: "wrd-h8",
		topic: "Word Problems",
		subtopic: "Work & Time",
		difficulty: "hard",
		q: "A can do a job in 10 days. He works alone for 4 days; then B joins him and together they finish the job in 2 more days. How long would B alone take?",
		options: [
			"8 days",
			"10 days",
			"12 days",
			"15 days"
		],
		answer: 1,
		explanation: "A did 6 days' worth = 6/10 of the job. B did 4/10 in 2 days → B's rate = 1/5 per day → 10 days alone.",
		concepts: ["Partial work before teaming up"],
		mistake: "Ignoring A's first 4 days and computing B from scratch."
	}
];
//#endregion
//#region src/data/questions/setTheory.js
const questions$1 = [
	{
		id: "set-e1",
		topic: "Set Theory",
		subtopic: "Two-Set Venn",
		difficulty: "easy",
		q: "If n(A) = 20, n(B) = 15 and n(A ∩ B) = 5, what is n(A ∪ B)?",
		options: [
			"25",
			"30",
			"35",
			"40"
		],
		answer: 1,
		explanation: "n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = 20 + 15 − 5 = 30.",
		concepts: ["Inclusion–exclusion for two sets"],
		mistake: "Adding without subtracting the intersection (35)."
	},
	{
		id: "set-e2",
		topic: "Set Theory",
		subtopic: "Complement",
		difficulty: "easy",
		q: "In a universal set of 50 elements, n(A ∪ B) = 30. How many elements are in neither A nor B?",
		options: [
			"10",
			"20",
			"25",
			"30"
		],
		answer: 1,
		explanation: "Neither = U − (A ∪ B) = 50 − 30 = 20.",
		concepts: ["Complement of a union"],
		mistake: "Subtracting from 30 instead of from the universal set size."
	},
	{
		id: "set-e3",
		topic: "Set Theory",
		subtopic: "Union & Intersection",
		difficulty: "easy",
		q: "Sets A and B are disjoint with n(A) = 8 and n(B) = 7. What is n(A ∪ B)?",
		options: [
			"1",
			"15",
			"56",
			"56/15"
		],
		answer: 1,
		explanation: "Disjoint sets share no elements: n(A ∪ B) = 8 + 7 = 15.",
		concepts: ["Disjoint sets have empty intersection"],
		mistake: "Subtracting a non-existent intersection."
	},
	{
		id: "set-e4",
		topic: "Set Theory",
		subtopic: "Two-Set Venn",
		difficulty: "easy",
		q: "n(A) = 10, n(B) = 10 and n(A ∪ B) = 18. What is n(A ∩ B)?",
		options: [
			"1",
			"2",
			"8",
			"12"
		],
		answer: 1,
		explanation: "18 = 10 + 10 − n(A ∩ B) → n(A ∩ B) = 2.",
		concepts: ["Rearranging the inclusion–exclusion formula"],
		mistake: "Subtracting from 20 and forgetting the union is 18, not 20."
	},
	{
		id: "set-e5",
		topic: "Set Theory",
		subtopic: "Two-Set Venn",
		difficulty: "easy",
		q: "In a class of 40, 25 like tea, 20 like coffee and 10 like both. How many like neither?",
		options: [
			"5",
			"10",
			"15",
			"20"
		],
		answer: 0,
		explanation: "Like at least one = 25 + 20 − 10 = 35. Neither = 40 − 35 = 5.",
		concepts: ["Inclusion–exclusion then complement"],
		mistake: "Computing 40 − (25 + 20) = −5 without subtracting \"both\"."
	},
	{
		id: "set-e6",
		topic: "Set Theory",
		subtopic: "Subsets & Power Sets",
		difficulty: "easy",
		q: "How many subsets does a set with 3 elements have?",
		options: [
			"6",
			"7",
			"8",
			"9"
		],
		answer: 2,
		explanation: "Number of subsets = 2ⁿ = 2³ = 8.",
		concepts: ["Power set cardinality 2ⁿ"],
		mistake: "Using 3! = 6 (permutations, not subsets)."
	},
	{
		id: "set-e7",
		topic: "Set Theory",
		subtopic: "Union & Intersection",
		difficulty: "easy",
		q: "n(A) = 25, n(B) = 17 and n(A ∩ B) = 6. What is n(A ∪ B)?",
		options: [
			"31",
			"36",
			"42",
			"48"
		],
		answer: 1,
		explanation: "Apply inclusion–exclusion: n(A ∪ B) = 25 + 17 − 6 = 36. The 6 shared elements are counted twice, so subtract them once.",
		concepts: ["Inclusion–exclusion for two sets"],
		mistake: "Adding the intersection instead of subtracting (48)."
	},
	{
		id: "set-e8",
		topic: "Set Theory",
		subtopic: "Sets from Patterns",
		difficulty: "easy",
		q: "How many elements are in the set {2, 4, 6, …, 20} (positive even numbers up to 20)?",
		options: [
			"9",
			"10",
			"11",
			"20"
		],
		answer: 1,
		explanation: "These are 2 × 1 through 2 × 10 → 10 elements.",
		concepts: ["Counting terms in an arithmetic pattern"],
		mistake: "Counting 20 ÷ 2 = 10 but second-guessing to 9 (off-by-one)."
	},
	{
		id: "set-m1",
		topic: "Set Theory",
		subtopic: "Two-Set Venn",
		difficulty: "medium",
		q: "In a group, 25 like tea, 20 like coffee and 8 like both. How many like exactly one of the two?",
		options: [
			"27",
			"29",
			"37",
			"45"
		],
		answer: 1,
		explanation: "Tea only = 17, coffee only = 12. Exactly one = 17 + 12 = 29.",
		concepts: ["Only-regions of a Venn diagram"],
		mistake: "Computing 25 + 20 − 8 = 37 (that is \"at least one\", including both-lovers)."
	},
	{
		id: "set-m2",
		topic: "Set Theory",
		subtopic: "Three-Set Venn",
		difficulty: "medium",
		q: "n(A) = 30, n(B) = 25, n(C) = 20. Each pair intersects in 10 elements and all three in 5. What is n(A ∪ B ∪ C)?",
		options: [
			"45",
			"50",
			"55",
			"75"
		],
		answer: 1,
		explanation: "n(A∪B∪C) = 30 + 25 + 20 − 10 − 10 − 10 + 5 = 50.",
		concepts: ["Three-set inclusion–exclusion"],
		mistake: "Adding the triple intersection more than once, or forgetting it entirely."
	},
	{
		id: "set-m3",
		topic: "Set Theory",
		subtopic: "Two-Set Venn",
		difficulty: "medium",
		q: "Of 200 people surveyed, 120 read magazine A, 100 read magazine B and 40 read both. How many read exactly one magazine?",
		options: [
			"80",
			"100",
			"140",
			"160"
		],
		answer: 2,
		explanation: "Only A = 80, only B = 60. Exactly one = 140.",
		concepts: ["Only-regions vs total counts"],
		mistake: "Answering 160 (people who read at least one) or 180."
	},
	{
		id: "set-m4",
		topic: "Set Theory",
		subtopic: "Two-Set Venn",
		difficulty: "medium",
		q: "In a class of 60, 35 passed math, 30 passed English and 15 passed both. How many passed neither?",
		options: [
			"5",
			"10",
			"15",
			"20"
		],
		answer: 1,
		explanation: "Passed at least one = 35 + 30 − 15 = 50. Neither = 60 − 50 = 10.",
		concepts: ["Inclusion–exclusion with complement"],
		mistake: "Forgetting to subtract the \"both\" overlap."
	},
	{
		id: "set-m5",
		topic: "Set Theory",
		subtopic: "Two-Set Venn",
		difficulty: "medium",
		q: "n(P) = 25, n(Q) = 30 and n(P ∪ Q) = 40. How many elements are in Q only?",
		options: [
			"10",
			"15",
			"20",
			"25"
		],
		answer: 1,
		explanation: "n(P ∩ Q) = 25 + 30 − 40 = 15. Q only = 30 − 15 = 15.",
		concepts: ["Only-region = total − intersection"],
		mistake: "Answering 30 (the whole set) or mixing up P only with Q only."
	},
	{
		id: "set-m6",
		topic: "Set Theory",
		subtopic: "Subsets & Power Sets",
		difficulty: "medium",
		q: "A set has 5 elements. How many of its subsets contain exactly 2 elements?",
		options: [
			"5",
			"10",
			"20",
			"25"
		],
		answer: 1,
		explanation: "C(5, 2) = 5!/(2!·3!) = 10.",
		concepts: ["Combinations for subset counting"],
		mistake: "Using 5 × 4 = 20 (ordered pairs)."
	},
	{
		id: "set-m7",
		topic: "Set Theory",
		subtopic: "Three-Set Venn",
		difficulty: "medium",
		q: "In a class of 60: 30 play cricket, 25 football, 12 hockey; 10 play cricket & football, 5 cricket & hockey, 4 football & hockey; 2 play all three. How many play none?",
		options: [
			"0",
			"10",
			"12",
			"14"
		],
		answer: 1,
		explanation: "Union = 30 + 25 + 12 − 10 − 5 − 4 + 2 = 50. None = 60 − 50 = 10.",
		concepts: ["Three-set inclusion–exclusion, then complement"],
		mistake: "Sign errors on the pairwise intersections."
	},
	{
		id: "set-m8",
		topic: "Set Theory",
		subtopic: "Two-Set Venn",
		difficulty: "medium",
		q: "In a group of 50, everyone speaks at least one of English and French. 30 speak English and 25 speak French. How many speak both?",
		options: [
			"5",
			"10",
			"15",
			"20"
		],
		answer: 0,
		explanation: "n(both) = 30 + 25 − 50 = 5 (using union = 50 since everyone speaks at least one).",
		concepts: ["Using the union to find the intersection"],
		mistake: "Forgetting the union equals the group size here."
	},
	{
		id: "set-m9",
		topic: "Set Theory",
		subtopic: "Two-Set Venn",
		difficulty: "medium",
		q: "Of 100 students, 60 take math and 50 take physics; 20 take neither. How many take both?",
		options: [
			"10",
			"20",
			"30",
			"40"
		],
		answer: 2,
		explanation: "At least one = 100 − 20 = 80. Both = 60 + 50 − 80 = 30.",
		concepts: ["Complement first, then inclusion–exclusion"],
		mistake: "Using union = 100 (forgetting the \"neither\" students)."
	},
	{
		id: "set-m10",
		topic: "Set Theory",
		subtopic: "Subsets & Power Sets",
		difficulty: "medium",
		q: "How many subsets does the set {a, b, c, d} have that contain the element a?",
		options: [
			"4",
			"8",
			"12",
			"16"
		],
		answer: 1,
		explanation: "Fix a; the other 3 elements may be chosen freely: 2³ = 8 subsets.",
		concepts: ["Fix an element, halve the problem"],
		mistake: "Computing 2⁴ = 16 (all subsets, not just those containing a)."
	},
	{
		"id": "set-m11",
		"topic": "Set Theory",
		"subtopic": "Two-Set Venn",
		"difficulty": "medium",
		"q": "In a survey, 40% of people like tea, 50% like coffee and 20% like both. What percent like neither?",
		"options": [
			"10%",
			"20%",
			"30%",
			"70%"
		],
		"answer": 2,
		"explanation": "At least one = 40 + 50 − 20 = 70%. Neither = 100 − 70 = 30%.",
		"concepts": ["Inclusion–exclusion with percentages", "Complement of a union"],
		"mistake": "Answering 10% (adding 40 + 50 and subtracting too much) or 20% (the both-overlap)."
	},
	{
		"id": "set-m12",
		"topic": "Set Theory",
		"subtopic": "Subsets & Power Sets",
		"difficulty": "medium",
		"q": "A set has 4 elements. How many of its subsets contain an odd number of elements?",
		"options": [
			"4",
			"8",
			"10",
			"12"
		],
		"answer": 1,
		"explanation": "Odd sizes: 1 or 3 elements → C(4,1) + C(4,3) = 4 + 4 = 8. (Exactly half of all 2⁴ = 16 subsets.)",
		"concepts": ["Counting subsets by size with combinations", "Half of all subsets have odd size"],
		"mistake": "Counting only the 4 single-element subsets."
	},
	{
		id: "set-h1",
		topic: "Set Theory",
		subtopic: "Three-Set Venn",
		difficulty: "hard",
		q: "In a class of 100 students, 80 study math, 70 study physics and 60 study chemistry. What is the minimum possible number of students studying all three subjects?",
		options: [
			"0",
			"10",
			"30",
			"60"
		],
		answer: 1,
		explanation: "Minimum triple overlap = n(M) + n(P) + n(C) − 2 × n(U) = 80 + 70 + 60 − 200 = 10.",
		concepts: ["Minimum triple-overlap bound: Σn − 2 × (universal set)"],
		mistake: "Using Σn − U = 110, which ignores that each student is counted in two pairwise overlaps."
	},
	{
		id: "set-h2",
		topic: "Set Theory",
		subtopic: "Three-Set Venn",
		difficulty: "hard",
		q: "n(A ∩ B) = 10, n(B ∩ C) = 8, n(A ∩ C) = 6 and n(A ∩ B ∩ C) = 3. How many elements are in exactly two of the three sets?",
		options: [
			"15",
			"21",
			"24",
			"27"
		],
		answer: 0,
		explanation: "Each pairwise figure includes the triple-overlap members, so exactly-two = (10 + 8 + 6) − 3 × 3 = 24 − 9 = 15.",
		concepts: ["Exactly-two = sum of pairwise overlaps − 3 × triple overlap"],
		mistake: "Subtracting the triple overlap only once (giving 21)."
	},
	{
		id: "set-h3",
		topic: "Set Theory",
		subtopic: "Two-Set Venn",
		difficulty: "hard",
		q: "Of 500 people, 300 drink tea, 250 drink coffee and 150 drink both. What is the ratio of tea-only drinkers to coffee-only drinkers?",
		options: [
			"2 : 1",
			"3 : 2",
			"5 : 3",
			"1 : 1"
		],
		answer: 1,
		explanation: "Tea only = 300 − 150 = 150; coffee only = 250 − 150 = 100. Ratio = 150 : 100 = 3 : 2.",
		concepts: ["Only-regions and ratio simplification"],
		mistake: "Using the totals 300 : 250 = 6 : 5."
	},
	{
		id: "set-h4",
		topic: "Set Theory",
		subtopic: "Three-Set Venn",
		difficulty: "hard",
		q: "Three sets each have 40 elements; each pair overlaps in 12 elements and all three in 4. How many elements are in exactly one set?",
		options: [
			"36",
			"48",
			"60",
			"72"
		],
		answer: 2,
		explanation: "Pair-only (two sets) = 12 − 4 = 8 each. Only A = 40 − 8 − 8 − 4 = 20. Exactly one = 3 × 20 = 60.",
		concepts: ["Building only-regions from overlaps"],
		mistake: "Forgetting that each pairwise figure includes the triple-overlap members."
	},
	{
		id: "set-h5",
		topic: "Set Theory",
		subtopic: "Three-Set Venn",
		difficulty: "hard",
		q: "Every student in a class plays at least one of three games: 28 cricket, 30 football, 22 hockey; 12 cricket & football, 9 football & hockey, 8 cricket & hockey, 4 all three. How many students are in the class?",
		options: [
			"50",
			"52",
			"55",
			"58"
		],
		answer: 2,
		explanation: "Union = 28 + 30 + 22 − 12 − 9 − 8 + 4 = 55. Since everyone plays at least one, the class has 55 students.",
		concepts: ["Union when nobody is outside all sets"],
		mistake: "Forgetting to add back the triple intersection (+4)."
	},
	{
		id: "set-h6",
		topic: "Set Theory",
		subtopic: "Two-Set Venn",
		difficulty: "hard",
		q: "60% of people read paper A, 50% read paper B and 30% read both. What percent read neither paper?",
		options: [
			"10%",
			"20%",
			"30%",
			"40%"
		],
		answer: 1,
		explanation: "At least one = 60 + 50 − 30 = 80%. Neither = 100 − 80 = 20%.",
		concepts: ["Percentage-based inclusion–exclusion"],
		mistake: "Answering 30% (reading both) or 10% (forgetting the both-overlap)."
	},
	{
		id: "set-h7",
		topic: "Set Theory",
		subtopic: "Subsets & Power Sets",
		difficulty: "hard",
		q: "How many 3-element subsets of {1, 2, …, 9} contain the element 5?",
		options: [
			"21",
			"28",
			"35",
			"56"
		],
		answer: 1,
		explanation: "Choose the other 2 elements from the remaining 8: C(8, 2) = 28.",
		concepts: ["Combinations with a fixed element"],
		mistake: "Using C(9, 2) = 36 or 2 × C(8, 2)."
	},
	{
		id: "set-h8",
		topic: "Set Theory",
		subtopic: "Three-Set Venn",
		difficulty: "hard",
		q: "n(A ∪ B ∪ C) = 80 and n(A) = n(B) = n(C) = 40. Each pair of sets overlaps in 20 elements. What is n(A ∩ B ∩ C)?",
		options: [
			"0",
			"10",
			"20",
			"40"
		],
		answer: 2,
		explanation: "80 = 40 × 3 − (20 + 20 + 20) + t → 80 = 120 − 60 + t → t = 20.",
		concepts: ["Inclusion–exclusion solved for the triple intersection"],
		mistake: "Sign error: 80 = 120 + 60 + t → t = −100."
	}
];
//#endregion
//#region src/data/questions/probability.js
const questions = [
	{
		id: "pro-e1",
		topic: "Probability",
		subtopic: "Basic Probability",
		difficulty: "easy",
		q: "A fair coin is tossed twice. What is the probability of getting two heads?",
		options: [
			"1/2",
			"1/3",
			"1/4",
			"3/4"
		],
		answer: 2,
		explanation: "Four equally likely outcomes (HH, HT, TH, TT). HH occurs once → 1/4.",
		concepts: ["Sample space enumeration", "Independent events multiply"],
		mistake: "Thinking \"one of them is heads half the time\" and answering 1/2."
	},
	{
		id: "pro-e2",
		topic: "Probability",
		subtopic: "Basic Probability",
		difficulty: "easy",
		q: "A fair die is rolled once. What is the probability of getting an even number?",
		options: [
			"1/6",
			"1/3",
			"1/2",
			"2/3"
		],
		answer: 2,
		explanation: "Even outcomes: 2, 4, 6 → 3 of 6 faces → 1/2.",
		concepts: ["Favorable outcomes ÷ total outcomes"],
		mistake: "Counting 2 and 4 only (2/6 = 1/3)."
	},
	{
		id: "pro-e3",
		topic: "Probability",
		subtopic: "Card Problems",
		difficulty: "easy",
		q: "One card is drawn from a standard 52-card deck. What is the probability that it is a heart?",
		options: [
			"1/13",
			"1/4",
			"1/2",
			"13/39"
		],
		answer: 1,
		explanation: "13 hearts out of 52 cards = 13/52 = 1/4.",
		concepts: ["Standard deck structure (4 suits × 13)"],
		mistake: "Using 1/13 (that is one rank, e.g. aces)."
	},
	{
		id: "pro-e4",
		topic: "Probability",
		subtopic: "Basic Probability",
		difficulty: "easy",
		q: "A bag contains 3 red and 5 blue marbles. One marble is drawn at random. What is the probability it is red?",
		options: [
			"3/5",
			"3/8",
			"5/8",
			"1/2"
		],
		answer: 1,
		explanation: "3 red out of 3 + 5 = 8 marbles → 3/8.",
		concepts: ["Probability from counts"],
		mistake: "Using 3/5 (red over blue instead of red over total)."
	},
	{
		id: "pro-e5",
		topic: "Probability",
		subtopic: "Basic Probability",
		difficulty: "easy",
		q: "What is the probability of an event that is certain to happen?",
		options: [
			"0",
			"0.5",
			"1",
			"100"
		],
		answer: 2,
		explanation: "A certain event has probability 1; an impossible one has probability 0.",
		concepts: ["Range of probability [0, 1]"],
		mistake: "Answering 100 (percent) instead of 1."
	},
	{
		id: "pro-e6",
		topic: "Probability",
		subtopic: "Dice Problems",
		difficulty: "easy",
		q: "Two fair dice are rolled. What is the probability that the sum is 7?",
		options: [
			"1/6",
			"1/9",
			"7/36",
			"1/12"
		],
		answer: 0,
		explanation: "6 of the 36 outcomes sum to 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → 6/36 = 1/6.",
		concepts: ["Sample space of two dice (36 outcomes)"],
		mistake: "Counting only 3 combinations (e.g. missing the reversed pairs) → 1/12."
	},
	{
		id: "pro-e7",
		topic: "Probability",
		subtopic: "Basic Probability",
		difficulty: "easy",
		q: "A coin is tossed once. What is the probability of getting a head or a tail?",
		options: [
			"1/2",
			"1",
			"0",
			"1/4"
		],
		answer: 1,
		explanation: "Both outcomes together cover the whole sample space → probability 1.",
		concepts: ["Mutually exclusive and exhaustive events"],
		mistake: "Adding probabilities as 1/2 + 1/2 but writing 2."
	},
	{
		id: "pro-e8",
		topic: "Probability",
		subtopic: "Basic Probability",
		difficulty: "easy",
		q: "A bag contains 4 green and 6 white balls. One ball is drawn. What is the probability that it is white?",
		options: [
			"2/5",
			"3/5",
			"4/6",
			"6/10 of 4/6"
		],
		answer: 1,
		explanation: "6 white out of 10 balls = 3/5.",
		concepts: ["Probability from counts", "Simplifying fractions"],
		mistake: "Answering 4/6 (green over white)."
	},
	{
		id: "pro-m1",
		topic: "Probability",
		subtopic: "Coin Problems",
		difficulty: "medium",
		q: "Two fair coins are tossed. What is the probability of getting at least one head?",
		options: [
			"1/2",
			"2/3",
			"3/4",
			"1"
		],
		answer: 2,
		explanation: "Complement: no heads = TT with probability 1/4. So P = 1 − 1/4 = 3/4.",
		concepts: ["\"At least one\" via the complement"],
		mistake: "Counting only HH and HT (missing TH) → 1/2."
	},
	{
		id: "pro-m2",
		topic: "Probability",
		subtopic: "Independent Events",
		difficulty: "medium",
		q: "Events A and B are independent with P(A) = 0.5 and P(B) = 0.4. What is P(A and B)?",
		options: [
			"0.2",
			"0.45",
			"0.7",
			"0.9"
		],
		answer: 0,
		explanation: "Independent events multiply: 0.5 × 0.4 = 0.2.",
		concepts: ["Multiplication rule for independent events"],
		mistake: "Adding: 0.5 + 0.4 = 0.9 (that is P(A or B), capped at 0.9 only via inclusion-exclusion)."
	},
	{
		id: "pro-m3",
		topic: "Probability",
		subtopic: "Dice Problems",
		difficulty: "medium",
		q: "A fair die is rolled twice. What is the probability of getting a 6 both times?",
		options: [
			"1/6",
			"1/12",
			"1/18",
			"1/36"
		],
		answer: 3,
		explanation: "Independent rolls: (1/6) × (1/6) = 1/36.",
		concepts: ["Independence across trials"],
		mistake: "Adding the probabilities or multiplying 1/6 × 2."
	},
	{
		id: "pro-m4",
		topic: "Probability",
		subtopic: "Without Replacement",
		difficulty: "medium",
		q: "A bag has 5 red and 4 green balls. Two balls are drawn without replacement. What is the probability both are red?",
		options: [
			"5/18",
			"5/16",
			"25/81",
			"1/2"
		],
		answer: 0,
		explanation: "(5/9) × (4/8) = 20/72 = 5/18.",
		concepts: ["Dependent events without replacement"],
		mistake: "Forgetting the pool shrinks: (5/9) × (5/9) = 25/81."
	},
	{
		id: "pro-m5",
		topic: "Probability",
		subtopic: "Card Problems",
		difficulty: "medium",
		q: "One card is drawn from a standard deck. What is the probability that it is NOT a face card (not J, Q or K)?",
		options: [
			"3/13",
			"10/13",
			"9/13",
			"1/2"
		],
		answer: 1,
		explanation: "Face cards: 12 of 52. Non-face = 40/52 = 10/13.",
		concepts: ["Complement rule", "Deck composition"],
		mistake: "Counting 3 face cards total (per suit confusion) → 49/52."
	},
	{
		id: "pro-m6",
		topic: "Probability",
		subtopic: "Counting & Probability",
		difficulty: "medium",
		q: "An integer from 1 to 100 is chosen at random. What is the probability it is divisible by 4 or by 6?",
		options: [
			"25/100",
			"33/100",
			"41/100",
			"37/100"
		],
		answer: 1,
		explanation: "Multiples of 4: 25. Of 6: 16. Of 12 (both): 8. Count = 25 + 16 − 8 = 33 → 33/100.",
		concepts: ["Inclusion–exclusion in counting"],
		mistake: "Adding 25 + 16 = 41 without subtracting the multiples of 12."
	},
	{
		id: "pro-m7",
		topic: "Probability",
		subtopic: "Combinations",
		difficulty: "medium",
		q: "A committee of 2 is chosen from 3 men and 2 women. What is the probability it contains exactly one woman?",
		options: [
			"1/5",
			"2/5",
			"3/5",
			"4/5"
		],
		answer: 2,
		explanation: "Total pairs: C(5,2) = 10. Favorable: C(3,1) × C(2,1) = 6. P = 6/10 = 3/5.",
		concepts: ["Counting favorable over total with combinations"],
		mistake: "Counting favorable as C(3,1) + C(2,1) = 5."
	},
	{
		id: "pro-m8",
		topic: "Probability",
		subtopic: "Dice Problems",
		difficulty: "medium",
		q: "Two fair dice are rolled. What is the probability that the sum is prime?",
		options: [
			"5/36",
			"1/3",
			"5/12",
			"1/2"
		],
		answer: 2,
		explanation: "Prime sums: 2, 3, 5, 7, 11 → counts 1 + 2 + 4 + 6 + 2 = 15 → 15/36 = 5/12.",
		concepts: ["Enumerating sums of two dice"],
		mistake: "Forgetting sum 11 (2 ways) or including 9 (not prime)."
	},
	{
		id: "pro-m9",
		topic: "Probability",
		subtopic: "Coin Problems",
		difficulty: "medium",
		q: "A fair coin is tossed 3 times. What is the probability of getting exactly 2 heads?",
		options: [
			"1/8",
			"1/4",
			"3/8",
			"1/2"
		],
		answer: 2,
		explanation: "Favorable: HHT, HTH, THH → 3 of 8 outcomes = 3/8.",
		concepts: ["Binomial outcomes", "C(3,2) × (1/2)³"],
		mistake: "Answering 1/2 by thinking \"2 out of 2 tosses\"."
	},
	{
		id: "pro-m10",
		topic: "Probability",
		subtopic: "Card Problems",
		difficulty: "medium",
		q: "One card is drawn from a standard deck. What is the probability that it is a king or a queen?",
		options: [
			"1/13",
			"2/13",
			"1/26",
			"4/13"
		],
		answer: 1,
		explanation: "4 kings + 4 queens = 8/52 = 2/13.",
		concepts: ["Mutually exclusive events add"],
		mistake: "Counting only one suit (2/52) or adding 4/13 twice."
	},
	{
		"id": "pro-m11",
		"topic": "Probability",
		"subtopic": "Dice Problems",
		"difficulty": "medium",
		"q": "Two fair dice are rolled. What is the probability that the product of the two numbers is even?",
		"options": [
			"1/4",
			"1/2",
			"2/3",
			"3/4"
		],
		"answer": 3,
		"explanation": "The product is odd only if BOTH dice are odd: (3/6) × (3/6) = 9/36 = 1/4. So P(even) = 1 − 1/4 = 3/4.",
		"concepts": ["Complement rule", "Independence"],
		"mistake": "Answering 1/2 by reasoning about sums instead of the product."
	},
	{
		"id": "pro-m12",
		"topic": "Probability",
		"subtopic": "Coin Problems",
		"difficulty": "medium",
		"q": "A fair coin is tossed 4 times. What is the probability of getting exactly 3 heads?",
		"options": [
			"1/16",
			"1/4",
			"3/8",
			"1/2"
		],
		"answer": 1,
		"explanation": "Favorable sequences: HHHT, HHTH, HTHH, THHH → C(4,3) = 4 of 16 outcomes → 4/16 = 1/4.",
		"concepts": ["Binomial probability C(n,k)(1/2)ⁿ"],
		"mistake": "Answering 3/8 (the 3-toss answer for exactly 2 heads) or 1/2."
	},
	{
		id: "pro-h1",
		topic: "Probability",
		subtopic: "At Least One",
		difficulty: "hard",
		q: "A fair die is rolled 4 times. What is the probability of getting at least one six?",
		options: [
			"1 − (1/6)⁴",
			"1 − (5/6)⁴ = 671/1296",
			"4/6",
			"(5/6)⁴"
		],
		answer: 1,
		explanation: "P(no six in a roll) = 5/6. P(no six in 4 rolls) = (5/6)⁴ = 625/1296. So P = 1 − 625/1296 = 671/1296.",
		concepts: ["Complement of \"at least one\""],
		mistake: "Using 4 × 1/6 = 2/3 (exceeds correct handling; overlapping events)."
	},
	{
		id: "pro-h2",
		topic: "Probability",
		subtopic: "Card Problems",
		difficulty: "hard",
		q: "Two cards are drawn from a standard deck without replacement. What is the probability that both are aces?",
		options: [
			"1/169",
			"1/221",
			"1/121",
			"4/663"
		],
		answer: 1,
		explanation: "(4/52) × (3/51) = 12/2652 = 1/221.",
		concepts: ["Without replacement", "Fraction simplification"],
		mistake: "With replacement: (4/52)² = 1/169."
	},
	{
		id: "pro-h3",
		topic: "Probability",
		subtopic: "Conditional",
		difficulty: "hard",
		q: "A bag has 5 red and 3 blue balls. A ball is drawn and it is red; it is not replaced. What is the probability that the second ball drawn is also red?",
		options: [
			"4/7",
			"5/8",
			"5/14",
			"4/8"
		],
		answer: 0,
		explanation: "After removing one red: 4 red out of 7 remaining → 4/7.",
		concepts: ["Conditional probability with reduced sample space"],
		mistake: "Using the original total (4/8) instead of 7 remaining."
	},
	{
		id: "pro-h4",
		topic: "Probability",
		subtopic: "Expected Value",
		difficulty: "hard",
		q: "In a game you win Tk 6 if a die shows a 6 and lose Tk 1 for any other result. What is your expected gain per roll?",
		options: [
			"Tk 0",
			"Tk 1/6",
			"Tk 1/2",
			"Tk 5/6"
		],
		answer: 1,
		explanation: "EV = (1/6)(6) + (5/6)(−1) = 1 − 5/6 = 1/6 ≈ Tk 0.17.",
		concepts: ["Expected value = Σ (probability × payoff)"],
		mistake: "Ignoring the negative payoff: (1/6)(6) = 1."
	},
	{
		id: "pro-h5",
		topic: "Probability",
		subtopic: "Arrangements",
		difficulty: "hard",
		q: "Four people stand in a random queue. What is the probability that two specific people are next to each other?",
		options: [
			"1/4",
			"1/3",
			"1/2",
			"2/3"
		],
		answer: 2,
		explanation: "Treat the pair as one block: 3! × 2 = 12 favorable of 4! = 24 total → 1/2.",
		concepts: ["Block method for adjacency"],
		mistake: "Counting 2 favorable orders instead of 12."
	},
	{
		id: "pro-h6",
		topic: "Probability",
		subtopic: "Combinations",
		difficulty: "hard",
		q: "A box has 6 white and 4 black balls. Three balls are drawn at random. What is the probability that exactly one is white?",
		options: [
			"1/5",
			"3/10",
			"1/3",
			"2/5"
		],
		answer: 1,
		explanation: "Total: C(10,3) = 120. Favorable: C(6,1) × C(4,2) = 6 × 6 = 36. P = 36/120 = 3/10.",
		concepts: ["Hypergeometric-style counting"],
		mistake: "Choosing 2 whites instead of 2 blacks: C(6,2)C(4,1)/120."
	},
	{
		id: "pro-h7",
		topic: "Probability",
		subtopic: "Independent Events",
		difficulty: "hard",
		q: "The probability of rain on any given day is 0.3, independent across days. What is the probability of no rain on two consecutive days?",
		options: [
			"0.09",
			"0.21",
			"0.49",
			"0.51"
		],
		answer: 2,
		explanation: "P(no rain) = 0.7 per day. Two independent days: 0.7 × 0.7 = 0.49.",
		concepts: ["Complement + independence"],
		mistake: "Using (0.3)² = 0.09 (the probability it rains both days)."
	},
	{
		id: "pro-h8",
		topic: "Probability",
		subtopic: "Counting & Probability",
		difficulty: "hard",
		q: "An integer from 1 to 20 is chosen at random. What is the probability that it is a multiple of 3 or of 5?",
		options: [
			"2/5",
			"9/20",
			"1/2",
			"11/20"
		],
		answer: 1,
		explanation: "Multiples of 3: 6. Of 5: 4. Of 15 (both): 1. Count = 6 + 4 − 1 = 9 → 9/20.",
		concepts: ["Inclusion–exclusion in counting"],
		mistake: "Answering 10/20 by adding 6 + 4 and missing the shared multiple 15."
	}
];
//#endregion
//#region src/data/questions/index.js
const ALL_QUESTIONS = [
	...questions$5,
	...questions$4,
	...questions$3,
	...questions$2,
	...questions$1,
	...questions
];
const TOPICS = [...new Set(ALL_QUESTIONS.map((q) => q.topic))];
function questionsByTopic(topic) {
	return ALL_QUESTIONS.filter((q) => q.topic === topic);
}
//#endregion
//#region src/utils/questionEngine.js
function makeRng(seed) {
	let a = seed >>> 0;
	return function() {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function shuffle(arr, rng = Math.random) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
function shuffleOptions(q, rng) {
	const order = shuffle([
		0,
		1,
		2,
		3
	], rng);
	return {
		...q,
		options: order.map((i) => q.options[i]),
		answer: order.indexOf(q.answer)
	};
}
function pickByDifficulty(pool, difficulty, count, rng) {
	const group = shuffle(pool.filter((q) => q.difficulty === difficulty), rng);
	if (group.length >= count) return group.slice(0, count);
	const rest = shuffle(pool.filter((q) => q.difficulty !== difficulty), rng);
	return [...group, ...rest.slice(0, count - group.length)];
}
const DIFFICULTY_PROFILES = {
	iba: {
		label: "IBA Standard",
		desc: "No easy questions — tricky mediums & hard only. Closest to the real exam.",
		mix: {
			easy: 0,
			medium: .5,
			hard: .5
		}
	},
	balanced: {
		label: "Balanced",
		desc: "30% easy · 40% medium · 30% hard — even mix across levels.",
		mix: {
			easy: .3,
			medium: .4,
			hard: .3
		}
	},
	foundation: {
		label: "Foundation",
		desc: "Build basics first — 50% easy · 30% medium · 20% hard.",
		mix: {
			easy: .5,
			medium: .3,
			hard: .2
		}
	}
};
function buildPracticeSet(topic, count = 16, seed = Date.now(), profileKey = "iba") {
	const rng = makeRng(seed);
	let pool = questionsByTopic(topic);
	if (pool.length === 0) return [];
	const mix = DIFFICULTY_PROFILES[profileKey]?.mix || DIFFICULTY_PROFILES.iba.mix;
	const nEasy = Math.round(count * mix.easy);
	const nHard = Math.round(count * mix.hard);
	const nMedium = count - nEasy - nHard;
	let picked = [];
	if (nEasy > 0) picked.push(...pickByDifficulty(pool, "easy", nEasy, rng));
	if (nMedium > 0) picked.push(...pickByDifficulty(pool, "medium", nMedium, rng));
	if (nHard > 0) picked.push(...pickByDifficulty(pool, "hard", nHard, rng));
	const seen = /* @__PURE__ */ new Set();
	picked = picked.filter((q) => seen.has(q.id) ? false : (seen.add(q.id), true));
	picked = picked.slice(0, count);
	const rank = {
		easy: 0,
		medium: 1,
		hard: 2
	};
	picked.sort((a, b) => rank[a.difficulty] - rank[b.difficulty]);
	return picked.map((q) => shuffleOptions(q, rng));
}
function buildMockSet(seed = Date.now(), count = 30) {
	const rng = makeRng(seed);
	const nMedium = 20;
	const nHard = count - nMedium;
	const picked = [...pickByDifficulty(ALL_QUESTIONS, "medium", nMedium, rng), ...pickByDifficulty(ALL_QUESTIONS, "hard", nHard, rng)];
	const seen = /* @__PURE__ */ new Set();
	const unique = picked.filter((q) => seen.has(q.id) ? false : (seen.add(q.id), true));
	const mixed = [];
	const buckets = /* @__PURE__ */ new Map();
	for (const q of unique) {
		if (!buckets.has(q.topic)) buckets.set(q.topic, []);
		buckets.get(q.topic).push(q);
	}
	const topicNames = [...buckets.keys()];
	let i = 0;
	while (mixed.length < unique.length) {
		const b = buckets.get(topicNames[i % topicNames.length]);
		if (b.length) mixed.push(b.shift());
		if (b.length === 0) topicNames.splice(i % topicNames.length, 1);
		if (topicNames.length === 0) break;
		i++;
	}
	mixed.push(...unique.filter((q) => !mixed.includes(q)));
	const rank = {
		easy: 0,
		medium: 1,
		hard: 2
	};
	mixed.sort((a, b) => rank[a.difficulty] - rank[b.difficulty]);
	return mixed.map((q) => shuffleOptions(q, rng));
}
//#endregion
//#region .tmp-test/entry.mjs
const errs = [];
const ids = /* @__PURE__ */ new Set();
for (const q of ALL_QUESTIONS) {
	if (ids.has(q.id)) errs.push("dup id " + q.id);
	ids.add(q.id);
	if (q.options.length !== 4 || new Set(q.options).size !== 4) errs.push(q.id + " options");
	if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) errs.push(q.id + " answer");
	if (!q.explanation || q.explanation.length < 20) errs.push(q.id + " thin explanation");
}
console.log("Total:", ALL_QUESTIONS.length, "| per topic:", TOPICS.map((t) => questionsByTopic(t).length).join(","));
for (const key of Object.keys(DIFFICULTY_PROFILES)) {
	const p = buildPracticeSet("Algebra", 16, 42, key);
	const d = {
		easy: 0,
		medium: 0,
		hard: 0
	};
	p.forEach((q) => d[q.difficulty]++);
	console.log(key.padEnd(11), "set:", p.length, "Qs | E/M/H:", d.easy + "/" + d.medium + "/" + d.hard);
	if (key === "iba" && d.easy !== 0) errs.push("iba profile contains easy questions!");
	if (p.length !== 16) errs.push(key + " wrong set size");
}
for (const seed of [
	1,
	7,
	99
]) {
	const m = buildMockSet(seed);
	const d = {
		easy: 0,
		medium: 0,
		hard: 0
	};
	m.forEach((q) => d[q.difficulty]++);
	if (d.easy !== 0) errs.push("mock seed " + seed + " contains easy questions");
	if (m.length !== 30) errs.push("mock size " + m.length);
	if (seed === 1) console.log("Mock E/M/H:", d.easy + "/" + d.medium + "/" + d.hard);
}
console.log(errs.length ? "ERRORS:\n" + errs.join("\n") : "PROFILE + MOCK CHECKS PASSED");
//#endregion
