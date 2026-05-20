Fancybox.bind("[data-fancybox]", {
	// Your custom options
});

// animation
const animationItems = document.querySelectorAll(".animation-item");
if (animationItems.length > 0) {
	function onEntry(e) {
		e.forEach((e) => {
			e.isIntersecting && e.target.classList.add("animation-active");
		});
	}
	let options = {
			threshold: [0.5],
		},
		observer = new IntersectionObserver(onEntry, options);
	for (let e of animationItems) observer.observe(e);
}
// end animation

/* hide header */
let scrollWidthFunc = () => {
	let scrollWidth = window.innerWidth - document.body.clientWidth;
	document.querySelector("html").style.paddingRight = scrollWidth + "px";
	document.querySelector("header").style.paddingRight = scrollWidth + "px";
};
const scrollTop = document.querySelector(".scroll-top");
if (scrollTop)
	scrollTop.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});

document.addEventListener("DOMContentLoaded", function () {
	/* burger menu */
	const burgerMenu = document.querySelector(".burger");
	if (burgerMenu) {
		const headerMobile = document.querySelector(".header__menu");
		burgerMenu.addEventListener("click", () => {
			if (burgerMenu.classList.contains("active")) {
				document.body.classList.remove("burger-lock");
			} else {
				document.body.classList.add("burger-lock");
			}
			headerMobile.classList.toggle("active");
			burgerMenu.classList.toggle("active");

			document.querySelector("html").classList.toggle("burger-lock");
		});
	}
	/* end burger menu */

	/* mobile menu */
	// Функция пересчёта полной высоты (с учётом вложенных списков)
	function getFullHeight(element) {
		let clone = element.cloneNode(true);
		clone.style.maxHeight = "none";
		clone.style.height = "auto";
		clone.style.opacity = "0";
		clone.style.position = "absolute";
		clone.style.pointerEvents = "none";
		document.body.appendChild(clone);
		let height = clone.scrollHeight;
		document.body.removeChild(clone);
		return height;
	}

	const navButtons = document.querySelectorAll(".header__nav-item");
	// Первый уровень аккордеона
	navButtons.forEach((btn) => {
		const sublist = btn.querySelector(".header__nav-sublist");
		const arrow = btn.querySelector(".header__nav-arrow");

		arrow?.addEventListener("click", (e) => {
			if (window.innerWidth >= 1024) return;
			if (sublist.contains(e.target)) return;

			btn.classList.toggle("active");

			if (btn.classList.contains("active")) {
				sublist.style.maxHeight = getFullHeight(sublist) + "px";
			} else {
				sublist.style.maxHeight = null;
			}
		});

		// Второй уровень аккордеона
		const arrows = sublist?.querySelectorAll(".header__nav-arrow");
		arrows?.forEach((arrow) => {
			const link = arrow.previousElementSibling;
			const subsublist = arrow.nextElementSibling;

			arrow.addEventListener("click", (e) => {
				e.stopPropagation();
				arrow.classList.toggle("active");
				link.classList.toggle("active");

				if (arrow.classList.contains("active")) {
					subsublist.style.maxHeight = subsublist.scrollHeight + "px";
				} else {
					subsublist.style.maxHeight = null;
				}

				// пересчитать высоту родителя с учётом всех элементов
				sublist.style.maxHeight = getFullHeight(sublist) + "px";
			});
		});
	});
	/* end mobile menu */

	// Popups
	function popupClose(popupActive) {
		popupActive.classList.remove("open");
		setTimeout(() => {
			if (!popupActive.classList.contains("open")) {
				popupActive.classList.remove("active");
			}
		}, 400);
		document.body.classList.remove("lock");
		document.querySelector("html").style.paddingRight = 0;
		document.querySelector("html").classList.remove("lock");
		document.querySelector("header").removeAttribute("style");
	}
	const popupOpenBtns = document.querySelectorAll(".popup-btn");
	const popups = document.querySelectorAll(".popup");
	const originalTitlePopup2 = document.querySelector(".original-title").innerHTML;
	const closePopupBtns = document.querySelectorAll(".close-popup-btn");
	closePopupBtns.forEach(function (el) {
		el.addEventListener("click", function (e) {
			popupClose(e.target.closest(".popup"));
		});
	});
	popupOpenBtns.forEach(function (el) {
		el.addEventListener("click", function (e) {
			e.preventDefault();
			const path = e.currentTarget.dataset.path;
			const currentPopup = document.querySelector(`[data-target="${path}"]`);
			if (currentPopup) {
				popups.forEach(function (popup) {
					popupClose(popup);
					popup.addEventListener("click", function (e) {
						if (!e.target.closest(".popup__content")) {
							popupClose(e.target.closest(".popup"));
						}
					});
				});
				currentPopup.classList.add("active");
				setTimeout(() => {
					currentPopup.classList.add("open");
				}, 10);
				if (currentPopup.getAttribute("data-target") == "popup-change") {
					let originaTitle = currentPopup.querySelector(".original-title");
					if (el.classList.contains("change-item__btn")) {
						if (el.classList.contains("doctor__btn-js")) {
							let currentItem = el.closest(".change-item");
							let currentTitile = currentItem.querySelector(".change-item__title");
							originaTitle.innerHTML = "Записаться на приём к врачу: " + currentTitile.innerHTML;
						} else {
							if (el.classList.contains("change-item__btn_current")) {
								originaTitle.textContent = el.textContent;
							} else {
								let currentItem = el.closest(".change-item");
								let currentTitile = currentItem.querySelector(".change-item__title");
								originaTitle.innerHTML = currentTitile.innerHTML;
							}
						}
					} else {
						originaTitle.innerHTML = originalTitlePopup2;
					}
				}

				if (currentPopup.getAttribute("data-target") == "popup-jobs") {
					let currentItems = el.closest(".jobs__items");
					let originalText = currentPopup.querySelector(".jobs__inner_original");
					if (originalText && currentItems.querySelector(".jobs__inner")) {
						originalText.innerHTML = currentItems.querySelector(".jobs__inner").innerHTML;
					}
				}
				e.stopPropagation();
				scrollWidthFunc();
				document.querySelector("html").classList.add("lock");
			}
		});
	});
	// end popups

	/* yandex map */
	const map = document.querySelectorAll("#map");
	if (map.length > 0) {
		function onEntryMap(e) {
			e.forEach((e) => {
				e.isIntersecting && loadMap() && initMap();
			});
		}
		let options = {
				threshold: [0.5],
			},
			observer = new IntersectionObserver(onEntryMap, options);
		for (let e of map) observer.observe(e);
	}
	function loadMap() {
		if (!document.querySelector('[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]')) {
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
			script.onload = initMap;
			document.head.appendChild(script);
		}
	}
	function initMap() {
		ymaps.ready(function () {
			const myMap = new ymaps.Map("map", {
				center: [47.231129, 39.728721],
				zoom: 15,
				controls: [],
			});
			const myPlacemark = new ymaps.Placemark(
				[47.231129, 39.728721],
				{
					hintContent: "Ростов-на-Дону, ул. Красноармейская, д. 227",
					balloonContent: "Ростов-на-Дону, ул. Красноармейская, д. 227",
				},
				{
					iconLayout: "default#image",
					iconImageHref: "assets/img/icons/map-pin.png",
					iconImageSize: [40, 40],
					iconImageOffset: [-20, -20],
				},
			);
			myMap.geoObjects.add(myPlacemark);
			myMap.behaviors.disable(["scrollZoom"]);
		});
	}
	/* end yandex map */


	/* search  */
    const searchBlocks = document.querySelectorAll('.search-wrapper');
    searchBlocks.forEach((block) => {
        const input = block.querySelector('.search-input');
        const resultBlock = block.querySelector('.search-result');
        const resultMessage = block.querySelector('.search-result-message');
        const popularBlock = block.querySelector('.search-popular');
        const items = [...block.querySelectorAll('.search-result .search-name')];

        if (!input || !resultBlock || !resultMessage || !items.length) return;

        const normalizeText = (text) => {
            return text.toLowerCase().trim();
        };

        input.addEventListener('input', () => {
            const value = normalizeText(input.value);

            if (!value) {
                resultBlock.classList.add('none');
                resultMessage.classList.add('none');
                popularBlock?.classList.remove('none');

                items.forEach((item) => {
                    item.closest('li').classList.remove('none');
                });

                return;
            }

            let hasResult = false;

            items.forEach((item) => {
                const cityName = normalizeText(item.textContent);
                const listItem = item.closest('li');

                if (cityName.includes(value)) {
                    listItem.classList.remove('none');
                    hasResult = true;
                } else {
                    listItem.classList.add('none');
                }
            });

            resultBlock.classList.remove('none');

            if (hasResult) {
                resultMessage.classList.add('none');
                popularBlock?.classList.add('none');
            } else {
                resultMessage.classList.remove('none');
                //popularBlock?.classList.remove('none');
            }
        });
    });
	/* end search */

	/*  accordion  */
	const acc = document.getElementsByClassName("accordion");
	for (let i = 0; i < acc.length; i++) {
		if (acc[i]) {
			acc[i].addEventListener("click", function () {
				const accContent = this.querySelector(".accordion__content") || this.parentElement.querySelector(".accordion__content");
				if (accContent.classList.contains("active")) {
					accContent.classList.remove("active");
					this.classList.remove("active");
					accContent.style.maxHeight = "0";
				} else {
					accContent.classList.add("active");
					this.classList.add("active");

					const contentHeight = accContent.scrollHeight;
					accContent.style.maxHeight = `${contentHeight}px`;
				}
			});
		}
	}
	/*  end accordion   */

	/*  tab  */
	const showTab = (elTabBtn) => {
		const elTab = elTabBtn.closest(".tab");
		if (elTabBtn.classList.contains("active")) {
			return;
		}
		const targetId = elTabBtn.dataset.id;
		const elTabPanes = elTab.querySelectorAll(`.tab-content[data-id="${targetId}"]`);

		const elTabBtnActive = elTab.querySelector(".tab-btn.active");
		if (elTabBtnActive) {
			elTabBtnActive.classList.remove("active");
		}

		const elTabPaneShow = elTab.querySelectorAll(".tab-content.active");
		elTabPaneShow.forEach((pane) => pane.classList.remove("active"));

		elTabBtn.classList.add("active");
		elTabPanes.forEach((pane) => pane.classList.add("active"));
	};

	const tabButtons = document.querySelectorAll(".tab-btn");
	tabButtons.forEach((btn) => {
		if (btn) {
			btn.addEventListener("click", function (e) {
				showTab(this);
			});
		}
	});
	/*  end tab */

	/* фильтрация карточек */
	document.querySelectorAll(".filter").forEach((filter) => {
		const buttonsWrap = filter.querySelector(".filter-btns");
		const buttons = [...filter.querySelectorAll(".filter-btn")];
		const select = filter.querySelector(".filter-select");
		const cards = [...filter.querySelectorAll(".filter-card")];
		const media = window.matchMedia("(max-width: 768px)");

		const isMobile = () => media.matches;

		const setDropdownHeight = () => {
			if (!buttonsWrap) return;

			buttonsWrap.classList.add("is-measuring");
			buttonsWrap.style.setProperty("--filter-dropdown-height", `${buttonsWrap.scrollHeight}px`);
			buttonsWrap.classList.remove("is-measuring");
		};

		const closeDropdown = () => {
			buttonsWrap?.classList.remove("is-open");
		};

		const moveActiveButtonToTop = () => {
			if (!buttonsWrap || !isMobile()) return;

			const activeButton = buttonsWrap.querySelector(".filter-btn.active");

			if (activeButton) {
				buttonsWrap.prepend(activeButton);
				setDropdownHeight();
			}
		};

		const filterCards = (activeId, activeButton = null) => {
			buttons.forEach((button) => {
				button.classList.toggle("active", button === activeButton);
			});

			cards.forEach((card) => {
				const isVisible = activeId === "all" || card.dataset.id === activeId;
				card.classList.toggle("is-hidden", !isVisible);
			});

			moveActiveButtonToTop();
		};

		buttons.forEach((button) => {
			button.addEventListener("click", (event) => {
				const isActive = button.classList.contains("active");

				if (isMobile() && isActive) {
					event.preventDefault();
					setDropdownHeight();
					buttonsWrap.classList.toggle("is-open");
					return;
				}

				filterCards(button.dataset.id, button);
				closeDropdown();

				renderCardsFilter();
			});
		});

		select?.addEventListener("change", () => {
			const activeId = select.selectedOptions[0].dataset.id;
			filterCards(activeId);
		});

		media.addEventListener("change", () => {
			closeDropdown();
			moveActiveButtonToTop();
		});

		moveActiveButtonToTop();
	});
	/* end фильтрация карточек */


	/* discount time */
	const counterStocks = document.querySelectorAll(".stock-date-js");
	counterStocks.forEach((counterStock) => {
		if (counterStock) {
			const counterStocksParts = counterStock.querySelectorAll("span");
			const fullCycleSeconds = 24 * 60 * 60;

			function formatTimePart(value) {
				return value.toString().padStart(2, "0");
			}

			function timeStocks() {
				const now = new Date();
				const midnight = new Date(now);
				midnight.setHours(24, 0, 0, 0);
				const secondsLeft = Math.floor((midnight - now) / 1000);
				const hours = Math.floor(secondsLeft / 3600);
				const minutes = Math.floor((secondsLeft % 3600) / 60);
				const seconds = secondsLeft % 60;

				if (counterStocksParts.length >= 3) {
					counterStocksParts[0].textContent = formatTimePart(hours);
					counterStocksParts[1].textContent = formatTimePart(minutes);
					counterStocksParts[2].textContent = formatTimePart(seconds);
					return;
				}
				counterStock.textContent = `${formatTimePart(hours)} : ${formatTimePart(minutes)} : ${formatTimePart(seconds)}`;
			}

			timeStocks();

			setInterval(function () {
				timeStocks();
			}, 1000);
		}
	});
	/* end discount time */


	/*  btn more  */
	const moreBtns = document.querySelectorAll(".btn-more");
	moreBtns.forEach((moreBtn) => {
		if (moreBtn) {
			const moreContent = moreBtn.previousElementSibling;

			if (moreContent.scrollHeight <= moreContent.clientHeight) {
				moreBtn.style.display = "none";
			} else {
				const textBtn = moreBtn.innerHTML;
				moreBtn.addEventListener("click", function () {
					const heightMoreContent = moreContent.style.maxHeight;
					this.classList.toggle("active");

					if (moreContent.style.maxHeight) {
						moreContent.style.maxHeight = null;
						this.textContent = textBtn;
					} else {
						moreContent.style.maxHeight = moreContent.scrollHeight + "px";
						this.textContent = "Свернуть";
					}
				});
			}
		}
	});
	/*  end btn more  */


	/* Кнопка Показать еще */
	document.querySelectorAll(".show-more-cards").forEach((cardsWrap) => {
		const SHOW_MORE_STEP = cardsWrap.dataset.count ? parseInt(cardsWrap.dataset.count, 10) : 6;
		const root = cardsWrap.parentElement;
		const button = root ? root.querySelector(".show-more-btn") : null;
		const cards = [...cardsWrap.children];

		console.log(SHOW_MORE_STEP);
		console.log(root);
		console.log(button);
		console.log(cards);

		if (!button || !cards.length) return;

		let visibleCount = Math.min(SHOW_MORE_STEP, cards.length);

		const render = () => {
			cards.forEach((card, index) => {
				card.hidden = index >= visibleCount;
			});

			if (cards.length <= SHOW_MORE_STEP) {
				button.hidden = true;
				return;
			}

			button.hidden = false;
			button.querySelector("span").textContent = visibleCount >= cards.length ? "Скрыть" : "Показать еще";
			visibleCount >= cards.length ? button.classList.add("end") : button.classList.remove("end");
		};

		button.addEventListener("click", () => {
			if (visibleCount >= cards.length) {
				visibleCount = SHOW_MORE_STEP;
			} else {
				visibleCount = Math.min(visibleCount + SHOW_MORE_STEP, cards.length);
			}
			render();
		});
		render();
	});
	/* end Показать еще */


	/* форма Проверьте симптомы */
	const form = document.querySelector("#symptomChecker");
	if (form) {
		const steps = [...form.querySelectorAll(".symptoms__step")];
		let currentStep = 0;

		const showStep = (index) => {
			steps.forEach((step, i) => {
				step.classList.toggle("active", i === index);
			});
		};

		const isStepValid = () => {
			const currentInputs = steps[currentStep].querySelectorAll("input[required]");
			return [...currentInputs].every((input) => {
				if (input.type === "radio") {
					return steps[currentStep].querySelector(`input[name="${input.name}"]:checked`);
				}
				if (input.type === "checkbox") {
					return input.checked;
				}
				return input.checkValidity();
			});
		};

		form.addEventListener("click", (event) => {
			const nextBtn = event.target.closest(".step-next");
			const prevBtn = event.target.closest(".step-prev");
			if (nextBtn) {
				if (!isStepValid()) {
					form.reportValidity();
					return;
				}
				if (currentStep < steps.length - 1) {
					currentStep++;
					showStep(currentStep);
				}
			}
			if (prevBtn) {
				if (currentStep > 0) {
					currentStep--;
					showStep(currentStep);
				}
			}
		});

		showStep(currentStep);
	}
	/* end форма Проверьте симптомы */


	/* navigation */
	const articleNavigation = document.querySelector(".navigation");
	if (articleNavigation) {
		const jsScrollBlockList = document.querySelectorAll(".text-block h1, .text-block h2, .text-block h3, .text-block h4");

		if (jsScrollBlockList.length > 0) {
			for (let i = 0; i < jsScrollBlockList.length; i += 1) {
				const jsScrollBlock = jsScrollBlockList[i];
				const titleBlock = jsScrollBlock.textContent;
				const articleNavigationList = document.querySelector(".navigation__list");
				const articleNavigationItem = document.createElement("li");
				const articleNavigationLink = document.createElement("a");
				if (jsScrollBlock.tagName == "H1") {
					articleNavigationItem.classList.add("nav-title-h1");
				}
				articleNavigationItem.classList.add("navigation__item");
				if (jsScrollBlock.tagName == "H2") {
					articleNavigationItem.classList.add("nav-title-h2");
				} else if (jsScrollBlock.tagName == "H3") {
					articleNavigationItem.classList.add("nav-title-h3");
				} else if (jsScrollBlock.tagName == "H4") {
					articleNavigationItem.classList.add("nav-title-h4");
				} else if (jsScrollBlock.tagName == "H5") {
					articleNavigationItem.classList.add("nav-title-h5");
				} else if (jsScrollBlock.tagName == "H6") {
					articleNavigationItem.classList.add("nav-title-h6");
				}
				articleNavigationLink.classList.add("navigation__link");
				jsScrollBlock.setAttribute("id", `${i}`);
				articleNavigationLink.setAttribute("href", `$${i}`);
				articleNavigationLink.textContent = " " + titleBlock;
				articleNavigationItem.append(articleNavigationLink);
				articleNavigationList.append(articleNavigationItem);
			}
			document.querySelectorAll('a[href^="$"').forEach((link) => {
				link.addEventListener("click", function (e) {
					e.preventDefault();
					let href = this.getAttribute("href").substring(1);
					const scrollTarget = document.getElementById(href);
					const topOffset = 280;
					const elementPosition = scrollTarget.getBoundingClientRect().top;
					const offsetPosition = elementPosition - topOffset;
					window.scrollBy({
						top: offsetPosition,
						behavior: "smooth",
					});
				});
			});
		} else {
			if (articleNavigation.querySelector(".navigation")) {
				articleNavigation.querySelector(".navigation").remove();
			}
		}
	}
	/* end navigation */


	/* пагинация на статьях */
	const cards = document.querySelectorAll(".pagination-card");
	const pagination = document.querySelector(".pagination");
	
	const CARDS_PER_PAGE = 9;
	
	let currentFilter = "all";
	let currentPage = 1;
	
	function getFilteredCards() {
		return [...cards].filter(card => {
			return currentFilter === "all"
				? !card.classList.contains("is-hidden")
				: card.dataset.id === currentFilter && !card.classList.contains("is-hidden");
		});
	}
	
	function renderPagination(filteredCards) {
		if (!pagination) return;
		const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);
		pagination.innerHTML = "";
		if (totalPages <= 1) return;
	
		// Кнопка назад
		const prevBtn = document.createElement("button");
		prevBtn.className = "pagination-btn prev";
		prevBtn.disabled = currentPage === 1;
		prevBtn.addEventListener("click", () => {
			currentPage--;
			renderCards();
		});
		pagination.append(prevBtn);
	
		// Номера страниц
		for (let i = 1; i <= totalPages; i++) {
			const pageBtn = document.createElement("button");
			pageBtn.className = `
				pagination-number
				${i === currentPage ? "active" : ""}
			`;
			pageBtn.textContent = i;
			pageBtn.addEventListener("click", () => {
				currentPage = i;
				renderCards();
			});
			pagination.append(pageBtn);
		}
	
		// Кнопка вперед
		const nextBtn = document.createElement("button");
		nextBtn.className = "pagination-btn next";
		nextBtn.disabled = currentPage === totalPages;
		nextBtn.addEventListener("click", () => {
			currentPage++;
			renderCards();
		});
		pagination.append(nextBtn);
	}
	
	function renderCards() {
		const filteredCards = getFilteredCards();
		cards.forEach(card => {
			card.classList.add('pagination-hidden');
		});
	
		const start = (currentPage - 1) * CARDS_PER_PAGE;
		const end = start + CARDS_PER_PAGE;
	
		filteredCards.slice(start, end).forEach(card => {
			card.classList.remove('pagination-hidden');
		});
		renderPagination(filteredCards);
	}
	
	function renderCardsFilter() {
		currentPage = 1;
		renderCards();
	}
	renderCards();
	/* end пагинация */


	/* range for calculator */
	const rangeWrap = document.querySelectorAll('.range-wrap');
	rangeWrap.forEach((wrap) => {
		const slider = wrap.querySelector('.range-input');
		const output = wrap.querySelector('.range-output');

		if (!slider || !output) return;

		const handleInput = (el) => {
			const min = Number(el.min) || 0;
			const max = Number(el.max) || 60;
			const pct = ((el.value - min) / (max - min)) * 100;

			el.style.setProperty('--range-pct', `${pct}%`);
			output.value = el.value;
		};

		slider.addEventListener('input', (e) => handleInput(e.target));

		handleInput(slider);
	});
	/* end range for calculator */


	/* -- COOKIE POLICY START -- */
	const cookiePolicy = document.getElementById('cookie');
	if (cookiePolicy) {
	const agreeBtn = cookiePolicy.querySelector('.cookie__agree');
	const closeBtn = cookiePolicy.querySelector('.cookie__close');
	const toggleBtn = cookiePolicy.querySelector('.cookie__toggle');

	const hasConsent = document.cookie.indexOf('cookie-policyz=en') !== -1;

	const updateCookieOffset = function () {
		const isVisible =
		cookiePolicy.style.display !== 'none' &&
		cookiePolicy.classList.contains('is-active');

		if (!isVisible) {
		document.documentElement.style.setProperty('--cookie-offset', '0px');
		return;
		}

		const cookieHeight = cookiePolicy.offsetHeight || 0;
		const extraGap = 10;

		document.documentElement.style.setProperty('--cookie-offset', (cookieHeight + extraGap) + 'px');
	};

	const acceptCookiePolicy = function () {
		cookiePolicy.classList.remove('is-active');
		document.documentElement.style.setProperty('--cookie-offset', '0px');

		setTimeout(function () {
		cookiePolicy.style.display = 'none';
		document.documentElement.style.setProperty('--cookie-offset', '0px');
		}, 300);

		document.cookie = 'cookie-policyz=en; path=/; max-age=31536000';
	};

	if (!hasConsent) {
		cookiePolicy.style.display = '';
		cookiePolicy.classList.add('is-active');

		setTimeout(function () {
		updateCookieOffset();
		}, 50);
	} else {
		cookiePolicy.style.display = 'none';
		document.documentElement.style.setProperty('--cookie-offset', '0px');
	}

	if (agreeBtn) {
		agreeBtn.addEventListener('click', function (e) {
		e.preventDefault();
		acceptCookiePolicy();
		});
	}

	if (closeBtn) {
		closeBtn.addEventListener('click', function (e) {
		e.preventDefault();
		acceptCookiePolicy();
		});
	}

	if (toggleBtn) {
		toggleBtn.addEventListener('click', function (e) {
		e.preventDefault();

		cookiePolicy.classList.toggle('is-expanded');
		toggleBtn.textContent = cookiePolicy.classList.contains('is-expanded')
			? 'Скрыть'
			: 'Подробнее';

		setTimeout(function () {
			updateCookieOffset();
		}, 50);
		});
	}

	window.addEventListener('resize', function () {
		updateCookieOffset();
	});

	window.addEventListener('load', function () {
		updateCookieOffset();
	});
	}
	/* -- COOKIE POLICY END -- */


	/* Калькулятор */
	const calculator = document.querySelector('.calculator');
	if (calculator) {
	  const items = calculator.querySelectorAll('.calculator__item');
	  const resultList = calculator.querySelector('.calculator__result-list');
	  const resultSum = calculator.querySelector('.calculator__result-sum');
	
	  const formatPrice = (num) => {
		return new Intl.NumberFormat('ru-RU').format(num) + ' ₽';
	  };
	
	  const getPrice = (text) => {
		return Number(text.replace(/[^\d]/g, ''));
	  };
	
	  const updateCalculator = () => {
		let total = 0;
		resultList.innerHTML = '';
	
		items.forEach((item) => {
		  const name = item.querySelector('.calculator__item-name')?.textContent.trim();
		  const priceText = item.querySelector('.calculator__item-price')?.textContent.trim();
		  const checkbox = item.querySelector('input[type="checkbox"]');
		  const range = item.querySelector('.range-input');
	
		  if (!name || !priceText) return;
	
		  const price = getPrice(priceText);
	
		  if (checkbox && checkbox.checked) {
			total += price;
	
			resultList.insertAdjacentHTML('beforeend', `
			  <li class="calculator__result-item">
				<p class="calculator__result-name">${name}</p>
				<p class="calculator__result-price">${formatPrice(price)}</p>
			  </li>
			`);
		  }
	
		  if (range && Number(range.value) > 0) {
			const days = Number(range.value);
			const sum = price * days;
	
			total += sum;
	
			resultList.insertAdjacentHTML('beforeend', `
			  <li class="calculator__result-item">
				<p class="calculator__result-name">${name} (${days} дн.)</p>
				<p class="calculator__result-price">${formatPrice(sum)}</p>
			  </li>
			`);
		  }
		});
	
		resultSum.textContent = formatPrice(total);
	  };
	
	  items.forEach((item) => {
		const checkbox = item.querySelector('input[type="checkbox"]');
		const range = item.querySelector('.range-input');
		const output = item.querySelector('.range-output');
	
		if (checkbox) {
		  checkbox.addEventListener('change', updateCalculator);
		}
	
		if (range) {
		  const updateRange = () => {
			const min = Number(range.min) || 0;
			const max = Number(range.max) || 100;
			const value = Number(range.value);
			const pct = ((value - min) / (max - min)) * 100;
	
			range.style.setProperty('--range-pct', pct + '%');
	
			if (output) {
			  output.value = value;
			  output.textContent = value;
			}
	
			updateCalculator();
		  };
	
		  range.addEventListener('input', updateRange);
		  updateRange();
		}
	  });
	
	  updateCalculator();
	}
	/* end Калькулятор */
});


