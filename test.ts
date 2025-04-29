const names: string[] =  [];
names.push("Bogdan");
//console.log(names);

const car: {type: string, model: string, year: number } = {
	type: "Audi",
	model: "r8",
	year: 2001
};

console.log(car);

for (const [key, value] of Object.entries(car)) {
	console.log(`${key}: ${value}`);
}

