
// navbar-search

navbarSearch();

function navbarSearch() {

	// elements-and-values
	const con = document.querySelector('.fl-navbar-search-parent-in-big-screen');

	// avoiding-errors
	if (con == undefined) return;

	const form = con.querySelector('.fl-navbar-search');
	const input = form.querySelector('.fl-navbar-search-input');
	const showResults = form.getAttribute('show-results');
	const results = con.querySelector('.fl-navbar-results-of-search');
	const submit = form.querySelector('.fl-navbar-search-submit');
	const reset = form.querySelector('.fl-navbar-search-reset');

	// adding-functions
	if (showResults == "true") { 

		input.addEventListener('keyup', toggle);
		input.addEventListener('focusin', show);
		input.addEventListener('focusout', hide);

	} else {

		input.addEventListener('keyup', enableDisableButtons);
		
	}

	reset.addEventListener('click', disableButtons);
	
	
	// functions
	function toggle() {

		if (this.value != "") {

			results.classList.add('fl-show');
			enableSubmit();
			enableReset();

		} else { 

			hide();
			disableSubmit();
			disableReset();

		}	

	}

	function show() {

		if (this.value != "") { 

			results.classList.add('fl-show');
			enableSubmit();
			enableReset();

		}	


	}

	function hide() { results.classList.remove('fl-show'); }

	function enableSubmit() { submit.removeAttribute('disabled'); }

	function disableSubmit() { submit.setAttribute('disabled',''); }

	function enableReset() { reset.removeAttribute('disabled'); }

	function disableReset() { reset.setAttribute('disabled',''); }

	function disableButtons() {

		submit.setAttribute('disabled','');
		reset.setAttribute('disabled','');
		input.value = "";

	}

	function enableDisableButtons() {

		if (this.value != "") {

			enableSubmit();
			enableReset();

		} else { 

			disableSubmit();
			disableReset();

		}

	}

}

// navbar-search