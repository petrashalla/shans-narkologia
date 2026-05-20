/* Swipers */
const advantagesSwiper = new Swiper(".advantages__swiper", {
	slidesPerView: 1.05,
	spaceBetween: 10,
	pagination: {
		el: ".advantages__swiper-pagination",
	},
	breakpoints: {
		580: {
			slidesPerView: 2.1,
			spaceBetween: 14,
		},
	},
});

const doctorsSwiper = new Swiper(".doctors__swiper", {
	slidesPerView: 1.05,
	spaceBetween: 10,
	navigation: {
		nextEl: ".doctors__swiper-button-next",
		prevEl: ".doctors__swiper-button-prev",
	},
	pagination: {
		el: ".doctors__swiper-pagination",
	},
	breakpoints: {
		1024: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
		580: {
			slidesPerView: 2.1,
			spaceBetween: 10,
		},
	},
});

const reviewsSwiper = new Swiper(".reviews__swiper", {
	slidesPerView: 1.05,
	spaceBetween: 10,
	navigation: {
		nextEl: ".reviews__swiper-button-next",
		prevEl: ".reviews__swiper-button-prev",
	},
	pagination: {
		el: ".reviews__swiper-pagination",
	},
	breakpoints: {
		580: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
	},
});

const licensesSwiper = new Swiper(".licenses__swiper", {
	slidesPerView: 1.05,
	spaceBetween: 10,
	navigation: {
		nextEl: ".licenses__swiper-button-next",
		prevEl: ".licenses__swiper-button-prev",
	},
	pagination: {
		el: ".licenses__swiper-pagination",
	},
	breakpoints: {
		1200: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
		900: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		580: {
			slidesPerView: 2.1,
			spaceBetween: 10,
		},
	},
});

const approachSwiper = new Swiper(".approach__swiper", {
	slidesPerView: 1.05,
	spaceBetween: 10,
	pagination: {
		el: ".approach__swiper-pagination",
	},
	breakpoints: {
		580: {
			slidesPerView: 2.1,
			spaceBetween: 14,
		},
	},
});

const gallerySwiper = new Swiper(".gallery__swiper", {
	slidesPerView: 1.05,
	spaceBetween: 10,
	navigation: {
		nextEl: ".gallery__swiper-button-next",
		prevEl: ".gallery__swiper-button-prev",
	},
	pagination: {
		el: ".gallery__swiper-pagination",
	},
	breakpoints: {
		1200: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
		500: {
			slidesPerView: 2.1,
			spaceBetween: 10,
		},
	},
});

const waySwiper = new Swiper(".way__swiper", {
	slidesPerView: 1,
	spaceBetween: 10,
	navigation: {
		nextEl: ".way__swiper-button-next",
		prevEl: ".way__swiper-button-prev",
	},
	pagination: {
		el: ".way__swiper-pagination",
	},
	scrollbar: {
		el: ".way__swiper-scrollbar",
	},
	breakpoints: {
		768: {
			slidesPerView: 1,
			spaceBetween: 33,
			mousewheel: true,
			direction: "vertical",
			pagination: {
				el: ".way__swiper-pagination",
				type: "progressbar",
			},
		},
	},
	on: {
		init(swiper) {
			updateHorizontalProgress(swiper);
		},
		slideChange(swiper) {
			updateHorizontalProgress(swiper);
		},
		progress(swiper) {
			updateHorizontalProgress(swiper);
		},
		breakpoint(swiper) {
			updateHorizontalProgress(swiper);
		},
	},
});

function updateHorizontalProgress(swiper) {
	const pagination = swiper.pagination.el;
	if (!pagination) return;

	const fill = pagination.querySelector(".swiper-pagination-progressbar-fill");
	if (!fill) return;

	const total = swiper.slides.length;
	const current = swiper.activeIndex + 1;

	const progress = current / total;

	pagination.classList.remove("swiper-pagination-vertical");
	pagination.classList.add("swiper-pagination-horizontal");

	fill.style.transform = `translate3d(0, 0, 0) scaleX(${progress}) scaleY(1)`;
	fill.style.transformOrigin = "left center";
}

const intro4Swiper = new Swiper(".intro4Swiper", {
	slidesPerView: 1,
	spaceBetween: 10,
	navigation: {
		nextEl: ".intro__swiper-button-next",
		prevEl: ".intro__swiper-button-prev",
	},
	pagination: {
		el: ".intro__swiper-pagination",
		type: "fraction",
	},
	scrollbar: {
		el: ".intro__swiper-scrollbar",
	},
	breakpoints: {
		920: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		550: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
	},
});

const specialSwiper = new Swiper(".special__swiper", {
	slidesPerView: 1.05,
	spaceBetween: 10,
	pagination: {
		el: ".special__swiper-pagination",
	},
	breakpoints: {
		1200: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
		580: {
			slidesPerView: 2.1,
			spaceBetween: 10,
		},
	},
});

const servicesAdventagesSwiper = new Swiper(".services-adventages__swiper", {
	slidesPerView: 1.05,
	spaceBetween: 10,
	pagination: {
		el: ".services-adventages__swiper-pagination",
	},
	breakpoints: {
		1200: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
		500: {
			slidesPerView: 2.1,
			spaceBetween: 10,
		},
	},
});

const historySwiper = new Swiper(".history__swiper", {
	slidesPerView: 1.05,
	pagination: {
		el: ".history__swiper-pagination",
	},
	navigation: {
		nextEl: ".history__swiper-button-next",
		prevEl: ".history__swiper-button-prev",
	},
	breakpoints: {
		1200: {
			slidesPerView: 2.3,
		},
		540: {
			slidesPerView: 2.1,
		},
	},
});

/* End swipers */
