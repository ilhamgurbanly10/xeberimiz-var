
function flashGallery(el, settings = {
	autoplay: false,
	autoplaySpeed: "normal",
	modalPlaySpeed: "fast",
	speed: "normal",
	dots: true,
	listIndexes: true,
	infinite: false,
	arrows: true
}) {

	// default-values
	if (settings.autoplay == undefined) settings.autoplay = false;
	if (settings.autoplaySpeed == undefined) settings.autoplaySpeed = "normal";
	if (settings.modalPlaySpeed == undefined) settings.modalPlaySpeed = "fast";
	if (settings.speed == undefined) settings.speed = "normal";
	if (settings.dots == undefined) settings.dots = true;
	if (settings.listIndexes == undefined) settings.listIndexes = true;
	if (settings.infinite == undefined) settings.infinite = false;
	if (settings.arrows == undefined) settings.arrows = true;

	// elements-and-values
	el = flashSelector(el);
	const galleryCon = el.querySelector('.fl-gallery-con');
	const galleryList = el.querySelector('.fl-gallery-list');
	const images = el.querySelectorAll('.fl-gallery-item');
	var otherImages = [];
	const lengthInList = 9;
	const otherImagesLength = images.length - lengthInList;
	const otherImagesListLength = otherImagesLength / lengthInList;
	const imagesLength = el.querySelector('.fl-gallery-images-length');
	const listIndexes = el.querySelector('.fl-gallery-list-indexes');
	const thisListIndex = el.querySelector('.fl-gallery-this-list-index');
	const totalListIndexes = el.querySelector('.fl-gallery-total-list-indexes');
	
	// writing-images-length-to-html
	imagesLength.innerHTML = images.length;

	// writing-list-indexes-to-html
	const listLength = Math.ceil(images.length / lengthInList);

	if (settings.listIndexes &&  images.length > lengthInList) 
		totalListIndexes.innerHTML = listLength;
	else if (settings.listIndexes && images.length <= lengthInList) {
		totalListIndexes.innerHTML = "1";
		listIndexes.classList.add('fl-disabled')
	}

	// functions
	function getOtherImages() {

		for (var i = 0; i < otherImagesLength; i++) { otherImages[i] = images[lengthInList + i]; }

	}	

	function removeOtherImages() {

		for (var i = lengthInList; i < images.length; i++) { images[i].remove(); }

	} 

	function addOtherImages() {

		 for (var i = 0, listContainers = [], lists = []; i < otherImagesListLength; i++) {
		 	
		 	// creating-and-adding-lists
			listContainers[i] = flashCreateElement("DIV","", {
				class: "fl-gallery-list-con",
			}, galleryCon, "last-child");

			lists[i] = flashCreateElement("UL","", {
				class: "fl-gallery-list",
			}, listContainers[i], "last-child");

			// adding-other-images-to-lists

			for (var x = 0; x < lengthInList; x++) {

				if (otherImages[x] != undefined)
					lists[i].appendChild(otherImages[x].cloneNode(true));

				if (x == lengthInList - 1) 
					otherImages.splice(0, lengthInList);

			}

		 }

	}

	function writeListIndex(x) { if (settings.listIndexes) thisListIndex.innerHTML = x + 1; }

	// change-values
	galleryCon.style.transform = "translateX(0)";

	// using-functions
	getOtherImages();
	removeOtherImages();
	addOtherImages();
	dragElement(galleryCon); 

	// elements-and-values
	const elements = el.querySelectorAll('.fl-gallery-list-con');
	const prevBtn = el.querySelector('.fl-gallery-prev');
	const nextBtn = el.querySelector('.fl-gallery-next');
	var index = 1;
	var lastIndex = elements.length - 1;
	var prevIndex = lastIndex;
	var myFunction;
	const dotsCon = el.querySelector('.fl-gallery-dots-list');
	var dots = [];
	const prevDot = el.querySelector('.fl-gallery-prev-dot');
	const nextDot = el.querySelector('.fl-gallery-next-dot');
	const dotsLimit = 3;
	
	// active-next-dot
	if (listLength > dotsLimit) nextDot.classList.add('fl-active');

	// // adding-functions
	if (!settings.infinite) prevBtn.setAttribute('disabled', '');

	if (otherImagesLength < 1) {

		index = 0;

		prevBtn.setAttribute('disabled','');
		nextBtn.setAttribute('disabled','');

	} else {

		prevBtn.addEventListener('click', prev);
		nextBtn.addEventListener('click', next);

	}

	if (!settings.arrows) {

		prevBtn.style.display = "none";
		nextBtn.style.display = "none";

	}

	if (settings.dots) {
		prevDot.addEventListener('click', prev);
		nextDot.addEventListener('click', next);
	}	

	// determining-the-speed
	switch (settings.speed) {
	  case "very-fast":
	    settings.speed = 0.3;
	    break;
	  case "fast":
	    settings.speed = 0.5;
	    break;
	  case "normal":
	    settings.speed = 1;
	    break;
	  case "slow":
	    settings.speed = 1.5;
	    break;
	  case "very-slow":
	    settings.speed = 2;
	    break;
	}

	galleryCon.style.transitionDuration = ""+settings.speed+"s";

	// determining-the-autoplay-speed
	switch (settings.autoplaySpeed) {
	  case "very-fast":
	    settings.autoplaySpeed = 3000;
	    break;
	  case "fast":
	    settings.autoplaySpeed = 4000;
	    break;
	  case "normal":
	    settings.autoplaySpeed = 8000;
	    break;
	  case "slow":
	    settings.autoplaySpeed = 12000;
	    break;
	  case "very-slow":
	    settings.autoplaySpeed = 13000;
	    break;
	}

	// determining-the-modal-play-speed
	switch (settings.modalPlaySpeed) {
	  case "very-fast":
	    settings.modalPlaySpeed = 3000;
	    break;
	  case "fast":
	    settings.modalPlaySpeed = 4000;
	    break;
	  case "normal":
	    settings.modalPlaySpeed = 8000;
	    break;
	  case "slow":
	    settings.modalPlaySpeed = 12000;
	    break;
	  case "very-slow":
	    settings.modalPlaySpeed = 13000;
	    break;
	}

	// functions
	function play() {

		myFunction = setInterval(function() {

			const size = index * 100 + "%";
			galleryCon.style.transform = "translateX(-"+size+")";

			activeDot(index);
			writeListIndex(index);
			activeDotArrows(index);

			if (!settings.infinite) {

				if (index == lastIndex) nextBtn.setAttribute('disabled', '');
				else nextBtn.removeAttribute('disabled');

				prevBtn.removeAttribute('disabled');
				
			}

			if (index == 0) prevIndex = lastIndex;
			else prevIndex = index - 1;
			if (index == lastIndex) index = 0;
			else index += 1;

		}, settings.autoplaySpeed)
	}

	function stop() { clearInterval(myFunction); }

	function prev() {

		const size = prevIndex * 100 + "%";
		galleryCon.style.transform = "translateX(-"+size+")";

		activeDot(prevIndex);
		writeListIndex(prevIndex);
		activeDotArrows(prevIndex);

		if (!settings.infinite) {

			if (prevIndex == 0) this.setAttribute('disabled', '');
			else this.removeAttribute('disabled');

			nextBtn.removeAttribute('disabled');
			
		}

		if (prevIndex == lastIndex)  index = 0; 
		else index = prevIndex + 1;

		if (prevIndex == 0) prevIndex = lastIndex;
		else prevIndex -= 1;	

		if(settings.autoplay && otherImagesLength >= 1) {
			stop();
			play();
		}	

	}

	function next() {
		
		const size = index * 100 + "%";
		galleryCon.style.transform = "translateX(-"+size+")";

		activeDot(index);
		writeListIndex(index);
		activeDotArrows(index);

		if (!settings.infinite) {

			if (index == lastIndex) this.setAttribute('disabled', '');
			else this.removeAttribute('disabled');

			prevBtn.removeAttribute('disabled');
			
		}

		if (index == 0) prevIndex = lastIndex;
		else prevIndex = index - 1;
		if (index == lastIndex) index = 0;
		else index += 1;

		if(settings.autoplay && otherImagesLength >= 1) {
			stop();
			play();
		}	

	}

	function addModalImages() {

		const modalImagesMainCon = el.querySelector('.fl-gallery-modal-img-main-con');
		
		for (var i = 0, imageContainers = []; i < images.length; i++) {
		 	
			imageContainers[i] = flashCreateElement("DIV","", {
				class: "fl-gallery-modal-img-con",
				draggable: "false"
			}, modalImagesMainCon, "last-child");

			flashCreateElement("IMG","", {
				class: "fl-gallery-modal-img",
				src: ""+images[i].querySelector('.fl-gallery-img').src+"",
				draggable: "false"
			}, imageContainers[i], "last-child");

		 }

	}

	function addDots()  {

		if (!settings.dots || otherImagesLength < 1) return;

		for (var i = 0; i < otherImagesListLength + 1; i++) {

			dots[i] = flashCreateElement("button","", {
				type: "button",
				class: "fl-gallery-dot",
				index: ""+i+""
			}, dotsCon, "last-child");

			dots[i].addEventListener('click', slideWithDot);

		}

		dots[0].classList.add('fl-active');

	}

	function slideWithDot() {

		const myIndex = Number(this.getAttribute('index'));

		const size = myIndex * 100 + "%";
		galleryCon.style.transform = "translateX(-"+size+")";

		activeDot(myIndex);
		writeListIndex(myIndex);
		activeDotArrows(myIndex);

		if (!settings.infinite) {

			if (myIndex == 0) prevBtn.setAttribute('disabled', '');
			else prevBtn.removeAttribute('disabled');

			if (myIndex == lastIndex) nextBtn.setAttribute('disabled', '');
			else nextBtn.removeAttribute('disabled');
			
		}

		if (myIndex == 0) prevIndex = lastIndex;
		else prevIndex = myIndex - 1;
		if (myIndex == lastIndex) index = 0;
		else index = myIndex + 1;

		if(settings.autoplay && otherImagesLength >= 1) {
			stop();
			play();
		}	

	}

	function activeDot(z) {

		if (!settings.dots || otherImagesLength < 1) return;

		flashRemoveClass(dots, "fl-active", dots[z]);

		const limit = listLength - dotsLimit;

		if (z > 2 && z <= limit)
			dots[0].style.marginLeft = "-" + z * 2 + "vw";
		else if (z < dotsLimit) 
			dots[0].style.marginLeft = "0px";
		else if (z > limit) 
			dots[0].style.marginLeft = "-" + limit * 2 + "vw";

	}

	function activeDotArrows(index) {

		if (!settings.dots) return;

		const length = listLength - dotsLimit;
		index += 1;

		// prev-dot
		if (index > dotsLimit) prevDot.classList.add('fl-active');
		else prevDot.classList.remove('fl-active')

		// next-dot
		if (index > length) nextDot.classList.remove('fl-active')
		else nextDot.classList.add('fl-active')

	}
	
	function dragElement(elmnt) {

		var defaultPos = 0, defaultTranslateX, lastClientX;

		elmnt.onmousedown = dragMouseDown;
		elmnt.ontouchstart = dragMouseDown;

		function dragMouseDown(e) {

			defaultTranslateX = elmnt.style.transform;
			defaultTranslateX = defaultTranslateX.slice(11, defaultTranslateX.length - 1);

			e = e || window.event;

			defaultPos = e.clientX || e.touches[0].clientX;
			
			document.onmouseup = closeDragElement;
			document.ontouchend = closeDragElement;

			document.onmousemove = elementDrag;
			document.ontouchmove = elementDrag;

		}

		function elementDrag(e) {

			e = e || window.event;
			pos = e.clientX || e.touches[0].clientX;
			pos -= defaultPos;
			elmnt.style.transform = "translateX(calc("+defaultTranslateX+" + "+pos+"px)"; 
			lastClientX = e.clientX || e.touches[0].clientX;

		}

		function closeDragElement(e) {

			e = e || window.event;

			if (lastClientX != null) {

				if (lastClientX < defaultPos - 80) { 
					if (index == 0) elmnt.style.transform = "translateX("+defaultTranslateX+")";
					else nextBtn.click();
				}

				else if (lastClientX > defaultPos + 80) { 
					if (prevIndex == lastIndex) elmnt.style.transform = "translateX(0)";
					else prevBtn.click();
				}

				else elmnt.style.transform = "translateX("+defaultTranslateX+")";

			}	

			document.onmouseup = null;
			document.ontouchend = null;
			document.onmousemove = null;
			document.ontouchmove = null;
			lastClientX = null;

		}

	}

	// using-functions
	if (settings.autoplay && otherImagesLength >= 1) play();
	if (settings.dots) addDots();

	addModalImages();
	flashGalleryModalContainer(el, settings.speed, settings.modalPlaySpeed, settings.infinite);

}



// flash-gallery-modal-container 

function flashGalleryModalContainer(el, speed, playSpeed, infinite) {

	// elements-and-values
	const galleryModalCon = el.querySelector('.fl-gallery-modal-con');
	const elements = el.querySelectorAll('.fl-gallery-modal-img-con');
	const imgMainCon = el.querySelector('.fl-gallery-modal-img-main-con');
	const playBtn = el.querySelector('.fl-gallery-play');
	const pauseBtn = el.querySelector('.fl-gallery-pause');
	const prevBtn = el.querySelector('.fl-gallery-modal-prev');
	const nextBtn = el.querySelector('.fl-gallery-modal-next');
	const closeBtn = el.querySelector('.fl-gallery-modal-close-btn');
	var index = 1;
	var lastIndex = elements.length - 1;
	var prevIndex = lastIndex;
	var myFunction;
	var isPlaying = false;
	const buttons = document.querySelectorAll('.fl-gallery-modal-btn');
	const buttonsLength = buttons.length;
	const topList = el.querySelector('.fl-gallery-top-list');
	const topListToggler = el.querySelector('.fl-gallery-top-list-toggler');
	const topListLine = el.querySelector('.fl-gallery-top-list-line');
	const zoomCon = el.querySelector('.fl-gallery-zoom-con');
	const zoomImg = el.querySelector('.fl-gallery-zoom-img');
	const zoomInBtn = el.querySelector('.fl-gallery-zoom-in-btn');
	const zoomOutBtn = el.querySelector('.fl-gallery-zoom-out-btn');
	const zoomCloseBtn = el.querySelector('.fl-gallery-zoom-close-btn');
	const downloadBtn = el.querySelector('.fl-gallery-download-btn');
	var zoomIndex = 1;
	var zoomPrevIndex;
	var zoomConIsOpen = false;
	

	const thisImgIndex = el.querySelector('.fl-gallery-modal-this-img-index');
	const totalImgIndexes = el.querySelector('.fl-gallery-modal-total-img-indexes');

	// avoiding-errors
	if (buttons[0] == undefined) return;

	// determining-the-speed
	imgMainCon.style.transitionDuration = ""+speed+"s";
	topListLine.style.animationDuration = ""+playSpeed / 1000+"s";

	// writing-image-numbers-to-html
	thisImgIndex.innerHTML = index;
	totalImgIndexes.innerHTML = elements.length;

	// adding-functions
	playBtn.addEventListener('click', play);
	pauseBtn.addEventListener('click', pause);
	prevBtn.addEventListener('click', prev);
	nextBtn.addEventListener('click', next);
	closeBtn.addEventListener('click', close);
	zoomInBtn.addEventListener('click', zoomIn);
	zoomOutBtn.addEventListener('click', zoomOut);
	zoomCloseBtn.addEventListener('click', closeZoom);
	closeBtn.addEventListener('click', closeZoom);
	downloadBtn.addEventListener('click', downloadImg);
	topListToggler.addEventListener('click', toggleTopList);

	for (var i = 0; i < buttonsLength; i++) {

		buttons[i].addEventListener('click', show);	 

	}
	
	// change-values
	imgMainCon.style.transform = "translateX(0)";

	// using-functions
	flashPreventDefaultLinks(buttons);
	flashSetIndexAsAttribute(buttons);
	dragElement(imgMainCon);

	// functions
	function dragElement(elmnt) {

		var defaultPos = 0, defaultTranslateX, lastClientX;

		elmnt.onmousedown = dragMouseDown;
		elmnt.ontouchstart = dragMouseDown;

		function dragMouseDown(e) {

			defaultTranslateX = elmnt.style.transform;
			defaultTranslateX = defaultTranslateX.slice(11, defaultTranslateX.length - 1);

			e = e || window.event;

			defaultPos = e.clientX || e.touches[0].clientX;
			
			document.onmouseup = closeDragElement;
			document.ontouchend = closeDragElement;

			document.onmousemove = elementDrag;
			document.ontouchmove = elementDrag;

		}

		function elementDrag(e) {

			e = e || window.event;
			
			pos = e.clientX || e.touches[0].clientX;
			pos -= defaultPos;
			elmnt.style.transform = "translateX(calc("+defaultTranslateX+" + "+pos+"px)"; 
			lastClientX = e.clientX || e.touches[0].clientX;

		}

		function closeDragElement(e) {

			e = e || window.event;

			if (lastClientX != null) {

				if (lastClientX < defaultPos - 80) { 
					if (index == 0) elmnt.style.transform = "translateX("+defaultTranslateX+")";
					else nextBtn.click();
				}

				else if (lastClientX > defaultPos + 80) { 
					if (prevIndex == lastIndex) elmnt.style.transform = "translateX(0)";
					else prevBtn.click();
				}

				else elmnt.style.transform = "translateX("+defaultTranslateX+")";

			}	

			document.onmouseup = null;
			document.ontouchend = null;
			document.onmousemove = null;
			document.ontouchmove = null;
			lastClientX = null;

		}

	}

	function toggleTopList() {

		topList.classList.toggle('fl-show');
		this.querySelector('i').classList.toggle('fa-bars');

	} 

	function downloadImg() {

		if (index == 0) var imgRoot = elements[lastIndex].querySelector('.fl-gallery-modal-img').src;
		else var imgRoot = elements[index - 1].querySelector('.fl-gallery-modal-img').src;

		this.href = ""+imgRoot+"";
	}

	function zoomIn() {

		zoomCon.classList.add('fl-show');
		if (!zoomConIsOpen) setZoomImg();
		zoomConIsOpen = true;

		flashAddClassAndRemoveOthers(zoomImg, 'fl-zoom-'+zoomIndex+'', ['fl-zoom-1','fl-zoom-2','fl-zoom-3','fl-zoom-4','fl-zoom-5','fl-zoom-6',])
		
		if(zoomIndex == 2) zoomOutBtn.removeAttribute('disabled');

		zoomPrevIndex = zoomIndex - 1;

		if(zoomIndex == 6) zoomInBtn.setAttribute('disabled', '');
		else zoomIndex += 1; 

	}

	function zoomOut() {

		flashAddClassAndRemoveOthers(zoomImg, 'fl-zoom-'+zoomPrevIndex+'', ['fl-zoom-1','fl-zoom-2','fl-zoom-3','fl-zoom-4','fl-zoom-5','fl-zoom-6'])
		
		zoomInBtn.removeAttribute('disabled');

		zoomIndex = zoomPrevIndex + 1;

		if(zoomPrevIndex == 1) zoomOutBtn.setAttribute('disabled', '');
		else zoomPrevIndex -= 1;

	}

	function closeZoom() {

		zoomCon.classList.remove('fl-show');
		zoomIndex = 1;
		flashRemoveClasses(zoomImg, ['fl-zoom-1','fl-zoom-2','fl-zoom-3','fl-zoom-4','fl-zoom-5','fl-zoom-6']);
		zoomInBtn.removeAttribute('disabled');
		zoomOutBtn.setAttribute('disabled', '');
		zoomConIsOpen = false;

	}

	function setZoomImg() {

		if (index == 0) var imgRoot = elements[lastIndex].querySelector('.fl-gallery-modal-img').src;
		else var imgRoot = elements[index - 1].querySelector('.fl-gallery-modal-img').src;
		zoomImg.src = imgRoot;

	}

	function selectImg(btn) {

		const imgIndex = btn.getAttribute('index');
		index = Number(imgIndex);

		const size = index * 100 + "%";
		imgMainCon.style.transform = "translateX(-"+size+")";

		if (!infinite) {

			if(index == 0) { 
				prevBtn.setAttribute('disabled','');
			    nextBtn.removeAttribute('disabled');
			}	

			else if (index == lastIndex) { 
				nextBtn.setAttribute('disabled','');
				prevBtn.removeAttribute('disabled');
			}

			else { 
				nextBtn.removeAttribute('disabled');
				prevBtn.removeAttribute('disabled');
			}

		}	
		
		if (index == 0) prevIndex = lastIndex;
		else prevIndex = index - 1;
		if (index == lastIndex) index = 0;
		else index += 1;

		setImgIndex();

		if(isPlaying) {
			pause();
			setTimeout( function() { play(); }, 1);
		}	

	}

	function show() { 

		galleryModalCon.classList.add('fl-show'); selectImg(this); 
		document.addEventListener('keydown', activeKeyboardArrows);

	}

	function close() { 

		galleryModalCon.classList.remove('fl-show'); 
		document.removeEventListener('keydown', activeKeyboardArrows);

	}

	function activeKeyboardArrows(e) {

		if (e.keyCode == 37) prevBtn.click();
		else if (e.keyCode == 39) nextBtn.click();

	}
	
	function play() {

		topListLine.classList.add('fl-show');

		myFunction = setInterval(function() {

			if (!infinite) {

				if (index == lastIndex) nextBtn.setAttribute('disabled', '');
				else nextBtn.removeAttribute('disabled');

				prevBtn.removeAttribute('disabled');
			
			}

			const size = index * 100 + "%";
			imgMainCon.style.transform = "translateX(-"+size+")";

			if (index == 0) prevIndex = lastIndex;
			else prevIndex = index - 1;
			if (index == lastIndex) index = 0;
			else index += 1;

			setImgIndex();

			

		}, playSpeed);

		if(!isPlaying) {

			playBtn.setAttribute('disabled','');
			pauseBtn.removeAttribute('disabled');

		}

		isPlaying = true;
		
	}

	function pause() {

		clearInterval(myFunction);
		topListLine.classList.remove('fl-show');

		if(isPlaying) {

			playBtn.removeAttribute('disabled');
			pauseBtn.setAttribute('disabled','');

		}

		isPlaying =  false;
		
	}

	function prev() {

		const size = prevIndex * 100 + "%";
		imgMainCon.style.transform = "translateX(-"+size+")";

		if (!infinite) {

			if (prevIndex == 0) this.setAttribute('disabled', '');
			else this.removeAttribute('disabled');

			nextBtn.removeAttribute('disabled');
			
		}
		
		if (prevIndex == lastIndex)  index = 0; 
		else index = prevIndex + 1;

		if (prevIndex == 0) prevIndex = lastIndex;
		else prevIndex -= 1;

		setImgIndex();

		if(isPlaying) {
			pause();
			setTimeout( function() { play(); }, 1);
		}	

	}

	function next() {
		
		const size = index * 100 + "%";
		imgMainCon.style.transform = "translateX(-"+size+")";

		if (!infinite) {

			if (index == lastIndex) this.setAttribute('disabled', '');
			else this.removeAttribute('disabled');

			prevBtn.removeAttribute('disabled');
			
		}
		
		if (index == 0) prevIndex = lastIndex;
		else prevIndex = index - 1;
		if (index == lastIndex) index = 0;
		else index += 1;

		setImgIndex();

		if(isPlaying) {
			pause();
			setTimeout( function() { play(); }, 1);
			
		}	
	}

	function setImgIndex() {

		if (index == 0) thisImgIndex.innerHTML = elements.length;
		else thisImgIndex.innerHTML = index;

	}

}

// the-end-of-flash-gallery-modal-container 


