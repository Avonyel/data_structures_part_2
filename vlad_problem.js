// Suppose you have a group of N people. Using the Gregorian calendar and disregarding
// February 29, each person in the group has a birthday between January 1 and December
// 31 (or 0 and 364 if you prefer).
// Of course, it's possible that two or more people will have the same birthday.
// Question: how large must the group be in order for the probability that there are two or
// more people with the same birthday to be 1/2 or higher?
const base = 10;

const birthdayProblem = (oldProb = 1, n = 0) => {
	probabilityNewBirf = oldProb * ((base - n) / base);
	if (probabilityNewBirf < 0.5) return n;

	return (
		birthdayProblem(probabilityNewBirf, n + 1) -
		birthdayProblem(1 - probabilityNewBirf, n)
	);
};
// n is iteration number
// 0th
// 1st iteration 9/10
// 2nd iteration = 1st iteration prob * (total - n)/total - 1-1st iteration prob * total - (n - 1)/total
// 9/10 * 10-2/10 + 1/10 *
// 72/100 - 9/100 = 63/100
// 63/100 * 7/10 - 37/100 * 8/10

console.log(birthdayProblem());
