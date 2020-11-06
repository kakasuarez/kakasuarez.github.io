const setAge = () => {
	const ageEl = document.getElementById("age");
	const birthYear = 2005;
	const currentYear = new Date().getFullYear();
	ageEl.innerText = currentYear - birthYear;
};

window.onload = setAge;
