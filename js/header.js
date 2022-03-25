// navbar

window.addEventListener('scroll', navbarFromTop);
window.addEventListener('load', navbarFromTop);

function navbarFromTop() {

	// elements-and-values
	const navbar = document.querySelector('.fl-navbar');

	// funtions
	function fromTop() {

		navbar.classList.add('navbar-hide');
		setTimeout(function() {
			navbar.classList.add('navbar-from-top');
		}, 10);

	}

	function defaultCase() {

		navbar.classList.remove('navbar-hide');
		navbar.classList.remove('navbar-from-top');
			
	}	

	// using-functions
	if (document.documentElement.scrollTop > 2) fromTop();
	else defaultCase();

}

// the-end-of-navbar