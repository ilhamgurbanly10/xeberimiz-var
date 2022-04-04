// navbar

changeNavbar();

function changeNavbar() {
	
	const navbar = document.querySelector('.fl-navbar');

	function change() {

		if (document.documentElement.scrollTop > 10) navbar.classList.add('navbar-is-changed');
		else navbar.classList.remove('navbar-is-changed');

	}	

	window.addEventListener('scroll', change);
	window.addEventListener('load', change);

}

// the-end-of-navbar