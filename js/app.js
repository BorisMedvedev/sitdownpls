let burger = document.querySelector('.burger'),
    navMain = document.querySelector('.nav_main'),
    navMainItems = document.querySelectorAll('.nav-main__item'),
    navExtra = document.querySelector('.nav_extra'),
    navExtraItems = document.querySelectorAll('.nav-extra__item'),
    burgerLine1 = document.querySelector('.burger__line1'),
    burgerLine2 = document.querySelector('.burger__line2'),
    burgerLine3 = document.querySelector('.burger__line3'),
    tLineMain = gsap.timeline({paused: true}),
    tLineExtra = gsap.timeline({paused: true}),
    burgerFlag = true,
    mediaWidth = 1023;

tLineMain.set(burger, {zIndex: 12})
          .set(navMain, {display: 'block'})
          .to(navMain, {opacity: 1, y: 0, duration: .3})
          .to(burgerLine2, {opacity: 0, x: -20, duration: .2}, "-=.2")
          .set(burgerLine2, {display: 'none'})
          .to(burgerLine1, {top: '50%', rotate: 45, duration: .2}, "-=.2")
          .to(burgerLine3, {top: '50%', rotate: -45, duration: .2}, "-=.2")
          .to(navMain, {backgroundPosition: 'right 72px bottom 60px', duration: .4}, "-=.2")
          .to(navMainItems[0], {opacity: 1, y: 0, duration: .2}, "-=.1")
          .to(navMainItems[1], {opacity: 1, y: 0, duration: .2}, "-=.15")
          .to(navMainItems[2], {opacity: 1, y: 0, duration: .2}, "-=.15")
          .to(navMainItems[3], {opacity: 1, y: 0, duration: .2})
          .to(navMainItems[4], {opacity: 1, y: 0, duration: .2}, "-=.15")
          .to(navMainItems[5], {opacity: 1, y: 0, duration: .2}, "-=.15")

tLineExtra.set(navExtra, {display: 'block'}, "-=0.4")
            .to(navExtra, {opacity: 1, y: 0, duration: .3}, "-=.3")
            .to(navExtraItems[0], {opacity: 1, y: 0, duration: .2}, "-=.1")
            .to(navExtraItems[1], {opacity: 1, y: 0, duration: .2}, "-=.1")
            .to(navExtraItems[2], {opacity: 1, y: 0, duration: .2}, "-=.1")
            .to(navExtraItems[3], {opacity: 1, y: 0, duration: .2})


const btnReset = () => {
  burgerLine1.removeAttribute('style');
  burgerLine2.removeAttribute('style');
  burgerLine3.removeAttribute('style');
}

const btnActive = () => {
  burgerLine1.style.transform = 'rotate(45deg)';
  burgerLine1.style.top = '50%';
  burgerLine2.style.opacity = 0;
  burgerLine2.style.transform  = 'translateY(-50%) translateX(-20px)';
  burgerLine2.style.display = 'none';
  burgerLine3.style.transform  = 'rotate(-45deg)';
  burgerLine3.style.top = '50%';
}

const navMainReset = () => {
  navMainItems.forEach((item) => {
    item.style.opacity = 1;
    item.style.transform = 'none';
  })
  navMain.style.transform = 'none';
  navMain.style.display = 'block';
  navMain.style.opacity = 1;
  navMain.style.backgroundPosition = 'right 72px bottom 60px';
}

const navMainHidden = () => {
  navMainItems.forEach((item) => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(50px)';
  })
  navMain.style.transform = 'translateY(50px)';
  navMain.style.display = 'none';
  navMain.style.opacity = 0;
  navMain.style.backgroundPosition = 'right 72px bottom -150px';
}

const navExtraReset = () => {
  navExtraItems.forEach((item) => {
    item.style.opacity = 1;
    item.style.transform = 'none';
  })
  navExtra.style.transform = 'none';
  navExtra.style.display = 'block';
  navExtra.style.opacity = 1;
}

const navExtraHidden = () => {
  navExtraItems.forEach((item) => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(50px)';
  })
  navExtra.style.transform = 'translateY(50px)';
  navExtra.style.display = 'none';
  navExtra.style.opacity = 0;
}

burger.onclick = () => {
  let x = document.documentElement.clientWidth;

  if (x > 580) {
    if (burgerFlag === true) {
      tLineMain.play();
      navMain.classList.add('nav_active');
      navExtra.classList.add('nav_active');
      burgerFlag = !burgerFlag;
    } else {
      tLineMain.reverse();
      navMain.classList.remove('nav_active');
      navExtra.classList.remove('nav_active');
      burgerFlag = !burgerFlag;
    }
  } else {
    if (burgerFlag === true) {
      tLineMain.play();
      tLineExtra.play();
      navMain.classList.add('nav_active');
      navExtra.classList.add('nav_active');
      burgerFlag = !burgerFlag;
    } else {
      tLineExtra.reverse();
      tLineMain.reverse();
      navMain.classList.remove('nav_active');
      navExtra.classList.remove('nav_active');
      burgerFlag = !burgerFlag;
    }
  }
}

const propertiesController = () => {
  navMain.style.display = 'block';
  navExtra.style.display = 'block';

  let x = document.documentElement.clientWidth,
      headerH = document.querySelector('.header').offsetHeight,
      navMainHeight = navMain.offsetHeight;

  if (x > mediaWidth) {
    navMainReset();
    btnReset();
    navExtraReset();
  } else if (x <= 580) {
    navExtra.style.top = (headerH - 201 + navMainHeight) + 'px';
    navMain.style.top = (headerH - 201) + 'px';
    if (navMain.classList.contains('nav_active') === false) {
      navMainHidden();
      btnReset();
      navExtraHidden();
    } else {
      navMainReset();
      btnActive();
      navExtraReset();
    }
  } else {
    navMain.style.top = '108px';
    if (navMain.classList.contains('nav_active') === false) {
      navMainHidden();
      btnReset();
      navExtraReset();
    } else {
      navMainReset();
      btnActive();
      navExtraReset();
    }
  }
}

propertiesController();

window.onresize = () => {

  propertiesController();

  if (window.location.pathname === '/catalog.html') {
    let x = document.documentElement.clientWidth;

    if (x > 1200) {
      document.querySelectorAll('.catalog-left__dropdown').forEach(item => {
        item.classList.remove('catalog-left__dropdown_active');
        item.removeAttribute('style');
      })
      document.querySelectorAll('.catalog-left__btn').forEach(item => {
        item.classList.remove('catalog-left__btn_active');
        item.removeAttribute('style');
      })
    } else {
      document.querySelectorAll('.catalog-left__dropdown').forEach(dropdown => {
        dropdown.classList.remove('catalog-left__dropdown_active');
        gsap.to(dropdown, {height: 0, duration: .1})
        gsap.to(dropdown, {opacity: 0, duration: .1})
        gsap.to(dropdown, {display: 'none', duration: .1})
      })
    }

    document.querySelector('.catalog__left').style.top = (document.querySelector('.catalog__top').offsetHeight + 17) + 'px';

    setCatalogSlidesOrder();
  }
}

if (window.location.pathname === '/catalog.html') {
  let catalogCategoryContainer = document.querySelector('.catalog-category__checkbox-container'),
      catalogDiscountContainer = document.querySelector('.catalog-discount__checkbox-container'),
      catalogColorContainer = document.querySelector('.catalog-color__checkbox-container'),
      catalogCategoryArr = document.querySelectorAll('label[data-filter="category"]'),
      catalogDiscountArr = document.querySelectorAll('label[data-filter="discount"]'),
      catalogColorArr = document.querySelectorAll('label[data-filter="color"]'),
      tLineCategoryCheckboxes = gsap.timeline({paused: true}),
      tLineDiscountCheckboxes = gsap.timeline({paused: true}),
      tLineColorCheckboxes = gsap.timeline({paused: true}),
      count = 9;

  let tLineGenerator = (arr, container, tLine) => {

    if (arr.length > count) {

      tLine.fromTo(container, {height: container.offsetHeight}, {height: 279, duration: .5})

      for (let i = 9; i < arr.length; i++) {
        tLine.to(arr[i], {opacity: 0, duration: .5}, "-=.5")
            .set(arr[i], {display: 'none'})
      }

      let button = document.createElement('button');

      button.classList.add('btn');
      button.classList.add('catalog-left__btn-showmore');
      button.dataset.filter = arr[0].dataset.filter;
      button.dataset.count = arr.length - count;
      container.parentElement.append(button);
      document.querySelector(`button[data-filter="${arr[0].dataset.filter}"]`).innerHTML = `+ ещё ${arr.length - count}`;

      tLine.play();
    }
  }

  tLineGenerator(catalogCategoryArr, catalogCategoryContainer, tLineCategoryCheckboxes);
  tLineGenerator(catalogDiscountArr, catalogDiscountContainer, tLineDiscountCheckboxes);
  tLineGenerator(catalogColorArr, catalogColorContainer, tLineColorCheckboxes);

  document.querySelectorAll('.catalog-left__btn-showmore').forEach(item => {
    item.onclick = () => {
      if (event.currentTarget.innerHTML === 'Свернуть') {
        if (event.currentTarget.dataset.filter === 'category') {
          tLineCategoryCheckboxes.play();
        } else if (event.currentTarget.dataset.filter === 'discount') {
          tLineDiscountCheckboxes.play();
        } else if (event.currentTarget.dataset.filter === 'color') {
          tLineColorCheckboxes.play();
        }
        event.currentTarget.innerHTML = `+ ещё ${event.currentTarget.dataset.count}`;
      } else {
        if (event.currentTarget.dataset.filter === 'category') {
          tLineCategoryCheckboxes.reverse();
        } else if (event.currentTarget.dataset.filter === 'discount') {
          tLineDiscountCheckboxes.reverse();
        } else if (event.currentTarget.dataset.filter === 'color') {
          tLineColorCheckboxes.reverse();
        }
        event.currentTarget.innerHTML = 'Свернуть';
      }
    }
  })

  document.querySelectorAll('.catalog-left__dropdown').forEach(dropdown => {
    let x = document.documentElement.clientWidth;

    if (x <= 1200) {
      dropdown.classList.remove('catalog-left__dropdown_active');
      gsap.to(dropdown, {height: 0})
      gsap.to(dropdown, {opacity: 0})
      gsap.to(dropdown, {display: 'none'})
    }
  })

  document.querySelectorAll('.catalog-left__btn').forEach(item => {
    item.onclick = () => {
      let path = event.currentTarget.dataset.path;

      event.currentTarget.classList.toggle('catalog-left__btn_active');

      document.querySelectorAll('.catalog-left__dropdown').forEach(dropdown => {
        let target = dropdown.dataset.target;
        if (target === path) {
          dropdown.classList.toggle('catalog-left__dropdown_active');
          if (dropdown.classList.contains('catalog-left__dropdown_active') === true) {
            gsap.to(dropdown, {display: 'block'})
            gsap.to(dropdown, {opacity: 1, duration: .5})
            gsap.to(dropdown, {height: 'auto', duration: .5})
          } else {
            gsap.to(dropdown, {height: 0, duration: .5})
            gsap.to(dropdown, {opacity: 0, duration: .5})
            gsap.to(dropdown, {display: 'none'})
          }
        }
      })
    }
  })
}

if (window.location.pathname === '/catalog.html') {
  let markerCategoryContainer = document.querySelector('.catalog-markers__category-container'),
      markerPriceContainer = document.querySelector('.catalog-markers__price-container'),
      markerDiscountContainer = document.querySelector('.catalog-markers__discount-container'),
      markerColorContainer = document.querySelector('.catalog-markers__color-container');

  let markerRemove = () => {
    document.querySelectorAll('.catalog-markers__btn').forEach(item => {
      item.onclick = (active) => {
        document.querySelectorAll('.catalog__checkbox-label').forEach(label => {
          if (label.getAttribute('aria-label') === active.currentTarget.parentElement.getAttribute('aria-label')) {
            label.querySelector('input[type="checkbox"]').checked = false;
          }
        })
        active.currentTarget.parentElement.remove();
        console.log(markerCategoryContainer.childNodes.length);
        if (markerCategoryContainer.childNodes.length === 0) {
          markerCategoryContainer.style.marginRight = 0;
        } else {
          markerCategoryContainer.style.marginRight = '20px';
        }
        if (markerPriceContainer.childNodes.length === 0) {
          markerPriceContainer.style.marginRight = 0;
        } else {
          markerPriceContainer.style.marginRight = '20px';
        }
        if (markerDiscountContainer.childNodes.length === 0) {
          markerDiscountContainer.style.marginRight = 0;
        } else {
          markerDiscountContainer.style.marginRight = '20px';
        }
        if (markerColorContainer.childNodes.length === 0) {
          markerColorContainer.style.marginRight = 0;
        } else {
          markerColorContainer.style.marginRight = '20px';
        }

        document.querySelector('.catalog__left').style.top = (document.querySelector('.catalog__top').offsetHeight + 17) + 'px';
      }
    })
  }

  let markerAdd = (item) => {
    if (item.dataset.filter === 'category') {
      if (item.querySelector('input[type="checkbox"]').checked === true) {
        let div = document.createElement('div');
        div.classList.add('catalog-markers__marker');
        div.classList.add('catalog-markers__category');
        div.setAttribute('aria-label', item.getAttribute('aria-label'));
        markerCategoryContainer.append(div);
        div.innerHTML = `${item.getAttribute('aria-label')}
                          <button class="btn catalog-markers__btn" aria-label="Убрать фильтр">
                            <svg class="catalog-markers__icon" width="24" height="24">
                              <use xlink:href="img/sprite.svg#close"></use>
                            </svg>
                          </button>`;
        markerCategoryContainer.style.marginRight = '20px';
      } else {
        document.querySelectorAll('.catalog-markers__category').forEach(category => {
          if (category.getAttribute('aria-label') === item.getAttribute('aria-label')) {
            category.remove();
          }
        })
        if (markerCategoryContainer.childNodes.length === 0) {
          markerCategoryContainer.style.marginRight = 0;
        }
      }
    } else if (item.dataset.filter === 'discount') {
      if (item.querySelector('input[type="checkbox"]').checked === true) {
        if (document.querySelector('.catalog-markers__discount') === null) {
          let div = document.createElement('div');
          div.classList.add('catalog-markers__marker');
          div.classList.add('catalog-markers__discount');
          div.setAttribute('aria-label', item.getAttribute('aria-label'));
          markerDiscountContainer.append(div);
          div.innerHTML = `${item.getAttribute('aria-label')}
                            <button class="btn catalog-markers__btn" aria-label="Убрать фильтр">
                              <svg class="catalog-markers__icon" width="24" height="24">
                                <use xlink:href="img/sprite.svg#close"></use>
                              </svg>
                            </button>`;
        }
        else {
          document.querySelector('.catalog-markers__discount').setAttribute('aria-label', item.getAttribute('aria-label'));
          document.querySelector('.catalog-markers__discount').innerHTML = `${item.getAttribute('aria-label')}
                            <button class="btn catalog-markers__btn" aria-label="Убрать фильтр">
                              <svg class="catalog-markers__icon" width="24" height="24">
                                <use xlink:href="img/sprite.svg#close"></use>
                              </svg>
                            </button>`;
        }
        markerDiscountContainer.style.marginRight = '20px';
        document.querySelectorAll('.catalog__checkbox-label').forEach(label => {
          if (label.parentElement.classList.contains('catalog-discount__checkbox-container') === true && label.querySelector('input[type="checkbox"]').checked === true && (label.getAttribute('aria-label') !== item.getAttribute('aria-label'))) {
            label.querySelector('input[type="checkbox"]').checked = false;

          }
        })
      } else {
        document.querySelectorAll('.catalog-markers__discount').forEach(discount => {
          if (discount.getAttribute('aria-label') === item.getAttribute('aria-label')) {
            discount.remove();
          }
        })
        if (markerDiscountContainer.childNodes.length === 0) {
          markerDiscountContainer.style.marginRight = 0;
        }
      }
    } else if (item.dataset.filter === 'color') {
      if (item.querySelector('input[type="checkbox"]').checked === true) {
        let div = document.createElement('div');
        div.classList.add('catalog-markers__marker');
        div.classList.add('catalog-markers__color');
        div.setAttribute('aria-label', item.getAttribute('aria-label'));
        markerColorContainer.append(div);
        div.innerHTML = `${item.getAttribute('aria-label')}
                          <button class="btn catalog-markers__btn" aria-label="Убрать фильтр">
                            <svg class="catalog-markers__icon" width="24" height="24">
                              <use xlink:href="img/sprite.svg#close"></use>
                            </svg>
                          </button>`;
        markerColorContainer.style.marginRight = '20px';
      } else {
        document.querySelectorAll('.catalog-markers__color').forEach(color => {
          if (color.getAttribute('aria-label') === item.getAttribute('aria-label')) {
            color.remove();
          }
        })
        if (markerColorContainer.childNodes.length === 0) {
          markerColorContainer.style.marginRight = 0;
        }
      }
    }
  }

  document.querySelectorAll('.catalog__checkbox-label').forEach(item => {
    markerAdd(item);

    item.onclick = (active) => {
      markerAdd(active.currentTarget);

      document.querySelector('.catalog__left').style.top = (document.querySelector('.catalog__top').offsetHeight + 17) + 'px';
    }
  })

  $('.catalog__markers').on("DOMNodeInserted", function (event) {
    markerRemove();

    document.querySelector('.catalog__left').style.top = (document.querySelector('.catalog__top').offsetHeight + 17) + 'px';
  })

  markerRemove();
}

if (window.location.pathname === '/catalog.html') {
  let markerPriceAdd = (priceTo) => {
    if (document.querySelector('.catalog-markers__price') === null) {
      let catalogMarker = document.createElement('div');
      catalogMarker.classList.add('catalog-markers__marker');
      catalogMarker.classList.add('catalog-markers__price');
      document.querySelector('.catalog-markers__price-container').append(catalogMarker);
      document.querySelector('.catalog-markers__price-container').style.marginRight = '20px';
    }

    document.querySelector('.catalog-markers__price').innerHTML = `До ${priceTo}
    <button class="btn catalog-markers__btn">
      <svg class="catalog-markers__icon" width="24" height="24">
        <use xlink:href="img/sprite.svg#close"></use>
      </svg>
    </button>`;
  }

  $( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 200000,
      values: [ 2000, 150000 ],
      slide: function( event, ui ) {
        $( ".catalog-price-min__input" ).val(ui.values[ 0 ]);
        $( ".catalog-price-max__input" ).val(ui.values[ 1 ]);
        $('.catalog-price-min__input').val(String($('.catalog-price-min__input').val().replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
        $('.catalog-price-max__input').val(String($('.catalog-price-max__input').val().replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " "));

        markerPriceAdd($('.catalog-price-max__input').val());
      }
    });
    $( ".catalog-price-min__input" ).val($( "#slider-range" ).slider( "values", 0 ));
    $( ".catalog-price-max__input" ).val($( "#slider-range" ).slider( "values", 1 ));
    $('.catalog-price-min__input').val(String($('.catalog-price-min__input').val().replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    $('.catalog-price-max__input').val(String($('.catalog-price-max__input').val().replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " "));

    markerPriceAdd($('.catalog-price-max__input').val());

    document.querySelectorAll('.ui-slider-handle').forEach(item => {
      item.onfocus = () => {
        document.querySelector('.ui-widget-header').style.background = '#7033AC';
      }

      item.onblur = () => {
        document.querySelector('.ui-widget-header').style.background = '#A65CF0';
      }
    })
  } );

  document.querySelector('.catalog-price-min__input').oninput = () => {
    $('.catalog-price-min__input').val(String($('.catalog-price-min__input').val().replace(/\B(?=(\d{3})+(?!\d))/g, " ")).replace(/[^0-9.]/g,''));
    if (/^(0|-?[1-9]\d{0,5})$/.test($( ".catalog-price-min__input" ).val())) {
      if ($( ".catalog-price-min__input" ).val() > $( "#slider-range" ).slider( "values", 1)) {
        $( ".catalog-price-min__input" ).val($( "#slider-range" ).slider( "values", 1))
      }
    } else {
      $( ".catalog-price-min__input" ).val($( "#slider-range" ).slider( "option", "min" ));
    }
    $( "#slider-range" ).slider( "values", 0, $( ".catalog-price-min__input" ).val() );
    $('.catalog-price-min__input').val(String($('.catalog-price-min__input').val().replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
  }

  document.querySelector('.catalog-price-max__input').oninput = () => {
    $('.catalog-price-max__input').val(String($('.catalog-price-max__input').val().replace(/\B(?=(\d{3})+(?!\d))/g, " ")).replace(/[^0-9.]/g,''));
    if (/^(0|-?[1-9]\d{0,5})$/.test($( ".catalog-price-max__input" ).val())) {
      if ($( ".catalog-price-max__input" ).val() < $( "#slider-range" ).slider( "values", 0)) {
        $( ".catalog-price-max__input" ).val($( "#slider-range" ).slider( "values", 0))
      }
    } else {
      $( ".catalog-price-max__input" ).val($( "#slider-range" ).slider( "option", "max" ));
    }
    $( "#slider-range" ).slider( "values", 1, $( ".catalog-price-max__input" ).val() );
    $('.catalog-price-max__input').val(String($('.catalog-price-max__input').val().replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " "));

    markerPriceAdd($('.catalog-price-max__input').val());
  }
}

const catalogSwiper = new Swiper('.catalog__swiper', {
  spaceBetween: 16,
  slidesPerGroup: 2,
  slidesPerView: 2,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '" aria-label="Слайд ' + (index + 1) + '">' + (index + 1) + '</span>';
    },
  },
  grid: {
    rows: 3,
  },
  breakpoints: {
    461: {
      spaceBetween: 32,
      slidesPerGroup: 2,
      slidesPerView: 2,
    },
    1024: {
      spaceBetween: 32,
      slidesPerGroup: 3,
      slidesPerView: 3,
      grid: {
        rows: 3,
      },
    }
  },
});

let setCatalogSlidesOrder = () => {

  let x = document.documentElement.clientWidth,
      slidesArr = document.querySelectorAll('.catalog__slide'),
      row = 1,
      plus = 0,
      order = 0;

  if (x > 1023) {
    for (let i = 0; i < slidesArr.length; i++) {
      if (row === 1) {
        slidesArr[i].style.order = order + plus;
        order += 3;
        if ((i + 1) % 3 === 0) {
          row = 2;
          order = 1;
        }
      } else if (row === 2) {
        slidesArr[i].style.order = order + plus;
        order += 3;
        if ((i + 1) % 3 === 0) {
          row = 3;
          order = 2;
        }
      } else if (row === 3) {
        slidesArr[i].style.order = order + plus;
        order += 3;
        if ((i + 1) % 3 === 0) {
          row = 1;
          order = 0;
          plus += 9;
        }
      }
    }
  } else {
    for (let i = 0; i < slidesArr.length; i++) {
      if (row === 1) {
        slidesArr[i].style.order = order + plus;
        if ((i + 1) % 3 === 1) {
          order += 3;
        } else if ((i + 1) % 3 === 2) {
          order -= 2;
        } else if ((i + 1) % 3 === 0) {
          row = 2;
          order = 4;
        }
      } else if (row === 2) {
        slidesArr[i].style.order = order + plus;
        if ((i + 1) % 3 === 1) {
          order -= 2;
        } else if ((i + 1) % 3 === 2) {
          order += 3;
        } else if ((i + 1) % 3 === 0) {
          row = 1;
          order = 0;
          plus += 6;
        }
      }
    }

    if (x > 460) {
      slidesArr[2].style.order = 4;
      slidesArr[3].style.order = 1;
    }
  }
}

if (window.location.pathname === '/catalog.html') {
  setCatalogSlidesOrder();
}

if (window.location.pathname === '/index.html') {

  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999) 999-99-99");

  im.mask(selector);

  new JustValidate('.contacts__form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 15,
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
      mail: {
        required: true,
        email: true
      },
    },
    messages: {
      name: {
        required: 'Заполните это поле',
        minLength: 'Введите от 2 до 15 символов',
        maxLength: 'Введите от 2 до 15 символов',
      },
      tel: {
        required: 'Заполните это поле',
        function: 'Введите полный номер'
      },
      mail: {
        required: 'Заполните это поле',
        email: 'Введите корректный e-mail'
      },
    },
    colorWrong: '#FF6972',

    submitHandler: function (form, values, ajax) {
      ajax({
          url: '/mail.php',
          method: 'POST',
          data: values,
          async: true,
          callback: function (response) {
              alert('Ваша заявка успешно отправлена!')
          },
          error: function (response) {
              alert('Ошибка отправки!')
          }
      });
    },
  });
}

if (window.location.pathname === '/index.html') {
  tippy('#myButton1', {
    content: "Реплицированные с зарубежных источников, исследования формируют глобальную сеть.",
    maxWidth: 157,
    theme: 'black',
    hideOnClick: false,
    interactive: true,
    interactiveBorder: 2,
    interactiveDebounce: 150,
  });
}

const element = document.querySelector('.header__select');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
});
let ariaLabel = element.getAttribute('aria-label');
element.closest('.choices').setAttribute('aria-label', ariaLabel);

let dropdownBtn = document.querySelector('.header-region__btn'),
    dropdownBtnText = document.querySelector('.header-region-btn__text'),
    dropdownFlag = true,
    dropdownItems = document.querySelectorAll('.header-region-dropdown-item__btn'),
    dropdownOpen = gsap.timeline({paused: true});

dropdownOpen.set(".header-region__dropdown", {display: 'block'})
            .to(".header-region__icon_arrow", {rotate: 90, duration: .3})
            .fromTo(".header-region__dropdown", {y: 50, opacity: 0}, {y: 0, opacity: 1/* , zIndex: 8 */}, "-=0.4");

dropdownBtn.onclick = () => {
  if (dropdownFlag === true) {
    event.currentTarget.classList.add('header-region__btn_active');
    dropdownOpen.play();
    dropdownFlag = !dropdownFlag;
  } else {
    event.currentTarget.classList.remove('header-region__btn_active');
    dropdownOpen.reverse();
    dropdownFlag = !dropdownFlag;
  }
}

dropdownItems.forEach(item => {
  item.onclick = () => {
    let clickedInnerText = event.currentTarget.innerText,
        activeInnerText = dropdownBtnText.innerText;

    dropdownBtnText.innerText = clickedInnerText;
    dropdownBtnText.dataset.region = clickedInnerText;
    event.currentTarget.innerText = activeInnerText;
    event.currentTarget.dataset.region = activeInnerText;
    event.currentTarget.setAttribute('aria-label', activeInnerText);
    dropdownBtn.classList.remove('header-region__btn_active');
    dropdownOpen.reverse();
    dropdownFlag = !dropdownFlag;
  }
})

const simpleBar = new SimpleBar(document.querySelector('.header-region-dropdown__list'), {
  scrollbarMinSize: 20,
  scrollbarMaxSize: 28,
});


const heroSwiper = new Swiper('.hero__swiper', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});


let input = document.querySelectorAll('.form__input'),
    placeholder = document.querySelectorAll('.placeholder');

input.forEach((item) => {
  item.onfocus = () => {
    let path = event.currentTarget.dataset.path;
    placeholder.forEach((active) => {
      let target = active.dataset.target,
          placeholderWidth = active.offsetWidth;
      if (path.localeCompare(target) === 0) {
        active.style.transform = `translate(-${placeholderWidth * 0.18}px, -16px) scale(60%)`;
      }
    })
  };
  item.onblur = () =>  {
    let curTarget = event.currentTarget,
        path = curTarget.dataset.path;
    placeholder.forEach((active) => {
      let target = active.dataset.target,
      placeholderWidth = active.offsetWidth;
      if (path.localeCompare(target) === 0) {
        if (curTarget.value !== "") {
          active.style.transform = `translate(-${placeholderWidth * 0.18}px, -16px) scale(60%)`;
        } else {
          active.style.transform = 'none';
        }
      }
    })
  };
})

if (window.location.pathname === '/product-card.html') {

  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999) 999-99-99");

  im.mask(selector);

  new JustValidate('.product__form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 15,
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
    },
    messages: {
      name: {
        required: 'Заполните это поле',
        minLength: 'Введите от 2 до 15 символов',
        maxLength: 'Введите от 2 до 15 символов',
      },
      tel: {
        required: 'Заполните это поле',
        function: 'Введите полный номер'
      },
    },
    colorWrong: '#FF6972',

    submitHandler: function (form, values, ajax) {
      ajax({
          url: '/mail.php',
          method: 'POST',
          data: values,
          async: true,
          callback: function (response) {
            document.querySelector('.product__form').classList.remove('product__modal_display');
            document.querySelector('.product__form').classList.remove('product__modal_visible');

            document.querySelector('.product__success').classList.add('product__modal_display');
            setTimeout(() => {
              document.querySelector('.product__success').classList.add('product__modal_visible');
            }, 200)
            productBtnOpen.scrollIntoView({block: "center", behavior: "smooth"});
          },
          error: function (response) {
              alert('Ошибка отправки!')
          }
      });
    },
  });
}

if (window.location.pathname === '/product-card.html') {
  let productForm = document.querySelector('.product__form'),
      productBtnOpen = document.querySelector('.product-buy__btn_buy'),
      productBtnCloseArr = document.querySelectorAll('.product-modal__btn-close');

  productBtnOpen.onclick = () => {
    document.body.classList.add('no-scroll');
    productForm.classList.add('product__modal_display');
    setTimeout(() => {
      productForm.classList.add('product__modal_visible');
    }, 200)
    document.querySelector('.product-form__input').scrollIntoView({block: "center", behavior: "smooth"});
  }

  productBtnCloseArr.forEach(item => {
    item.onclick = () => {
      let dataClose = event.currentTarget.dataset.close;

      document.body.classList.remove('no-scroll');
      document.querySelector(`.product__${dataClose}`).classList.remove('product__modal_visible');
      setTimeout(() => {
        document.querySelector(`.product__${dataClose}`).classList.remove('product__modal_display');
      }, 200)
    }
  })
}

if (window.location.pathname === '/product-card.html') {
  const productSimpleBar = new SimpleBar(document.querySelector('.product__preview'), {
    scrollbarMinSize: 20,
    scrollbarMaxSize: 28,
  });
}

if (window.location.pathname === '/product-card.html') {
  let productBig = document.querySelector('.product__big'),
      productSlider = document.querySelector('.product__slider'),
      productPreviewArr = document.querySelectorAll('.product-preview__img'),
      productBigImg = document.querySelector('.product-big__img'),
      productBigSrc = productBigImg.getAttribute('src'),
      productSliderPreviewArr = document.querySelectorAll('.product-slider__img_preview'),
      productSliderBigImg = document.querySelector('.product-slider-big__img'),
      productSliderBigSrc = productBigImg.getAttribute('src');

  productBig.onclick = () => {
    productSliderBigImg.setAttribute('src', productSliderBigSrc);
    document.body.classList.add('no-scroll');
    productSlider.classList.add('product__modal_display');
    setTimeout(() => {
      productSlider.classList.add('product__modal_visible');
    }, 200)
    document.querySelector('.product-slider__big').scrollIntoView({block: "center", behavior: "smooth"});
  }

  productPreviewArr.forEach(item => {
    item.onclick = () => {
      let src = event.currentTarget.dataset.src;
      if (productBigImg.getAttribute('src') === src) {
        productBigImg.setAttribute('src', productBigSrc);
      } else {
        productBigImg.setAttribute('src', src);
      }
    }
  })

  productSliderPreviewArr.forEach(item => {
    item.onclick = () => {
      let src = event.currentTarget.dataset.src;
      if (productSliderBigImg.getAttribute('src') === src) {
        productSliderBigImg.setAttribute('src', productSliderBigSrc);
      } else {
        productSliderBigImg.setAttribute('src', src);
      }
    }
  })
}

const productSwiper = new Swiper('.product-slider__swiper', {
  spaceBetween: 63,
  slidesPerGroup: 1,
  slidesPerView: 1,
  breakpoints: {
    581: {
      spaceBetween: 78,
      slidesPerGroup: 1,
      slidesPerView: 2,
    },
    1023: {
      spaceBetween: 78,
      slidesPerGroup: 3,
      slidesPerView: 3,
    },
    1201: {
      spaceBetween: 78,
      slidesPerGroup: 4,
      slidesPerView: 4,
    }
  },

  navigation: {
    nextEl: '.product-slider__btn_next',
    prevEl: '.product-slider__btn_prev',
  }
});



if (window.location.pathname === '/index.html') {
  let ratingBtnShowMore = document.querySelector('.rating__btn_more'),
      ratingCards = document.querySelectorAll('.rating__item');

  ratingBtnShowMore.onclick = () => {
    ratingBtnShowMore.style.display = 'none';
    ratingCards.forEach(item => {
      item.style.display = 'block';
    })
  }
}

const similarSwiper = new Swiper('.similar__swiper', {
  spaceBetween: 16,
  slidesPerGroup: 2,
  slidesPerView: 2,
  breakpoints: {
    461: {
      spaceBetween: 32,
      slidesPerGroup: 2,
      slidesPerView: 2,
    },
    1023: {
      spaceBetween: 32,
      slidesPerGroup: 3,
      slidesPerView: 3,
    },
    1200: {
      spaceBetween: 32,
      slidesPerGroup: 4,
      slidesPerView: 4,
    }
  },

  navigation: {
    nextEl: '.similar__btn_next',
    prevEl: '.similar__btn_prev',
  }
});

const specialsSwiper = new Swiper('.special__swiper', {
  // Optional parameters
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 32,
  slidesPerView: 'auto',
  breakpoints: {
    581: {
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerGroup: 3,
    }
  },

  navigation: {
    nextEl: '.special__btn_next',
    prevEl: '.special__btn_prev',
  }
});

const usefulSwiper = new Swiper('.useful__swiper', {
  // Optional parameters
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 32,
  breakpoints: {
    581: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1200: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },

  navigation: {
    nextEl: '.useful__btn_next',
    prevEl: '.useful__btn_prev',
  }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1cmdlci5qcyIsImNhdGFsb2ctY2hlY2tib3gtc2hvd21vcmUuanMiLCJjYXRhbG9nLWZpbHRlci1tYXJrZXJzLmpzIiwiY2F0YWxvZy1qcXVlcnktcmFuZ2UtaW5pdC5qcyIsImNhdGFsb2ctc3dpcGVyLWluaXQuanMiLCJjb250YWN0cy1qdXN0dmFsaWRhdGUtaW5pdC5qcyIsImNvbnRhY3RzLXRpcHB5LWluaXQuanMiLCJoZWFkZXItY2hvaWNlcy1pbml0LmpzIiwiaGVhZGVyLWRyb3Bkb3duLmpzIiwiaGVhZGVyLXNpbXBsZWJhci1pbml0LmpzIiwiaGVyby1zd2lwZXItaW5pdC5qcyIsImlucHV0LXBsYWNlaG9sZGVycy5qcyIsInByb2R1Y3QtanVzdHZhbGlkYXRlLWluaXQuanMiLCJwcm9kdWN0LW1vZGFsLmpzIiwicHJvZHVjdC1zaW1wbGViYXItaW5pdC5qcyIsInByb2R1Y3Qtc2xpZGVyLmpzIiwicHJvZHVjdC1zd2lwZXItaW5pdC5qcyIsInJhdGluZy1zaG93bW9yZS5qcyIsInNpbWlsYXItc3dpcGVyLWluaXQuanMiLCJzcGVjaWFsLXN3aXBlci1pbml0LmpzIiwidXNlZnVsLXN3aXBlci1pbml0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXJnZXInKSxcclxuICAgIG5hdk1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X21haW4nKSxcclxuICAgIG5hdk1haW5JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uYXYtbWFpbl9faXRlbScpLFxyXG4gICAgbmF2RXh0cmEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X2V4dHJhJyksXHJcbiAgICBuYXZFeHRyYUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdi1leHRyYV9faXRlbScpLFxyXG4gICAgYnVyZ2VyTGluZTEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnVyZ2VyX19saW5lMScpLFxyXG4gICAgYnVyZ2VyTGluZTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnVyZ2VyX19saW5lMicpLFxyXG4gICAgYnVyZ2VyTGluZTMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnVyZ2VyX19saW5lMycpLFxyXG4gICAgdExpbmVNYWluID0gZ3NhcC50aW1lbGluZSh7cGF1c2VkOiB0cnVlfSksXHJcbiAgICB0TGluZUV4dHJhID0gZ3NhcC50aW1lbGluZSh7cGF1c2VkOiB0cnVlfSksXHJcbiAgICBidXJnZXJGbGFnID0gdHJ1ZSxcclxuICAgIG1lZGlhV2lkdGggPSAxMDIzO1xyXG5cclxudExpbmVNYWluLnNldChidXJnZXIsIHt6SW5kZXg6IDEyfSlcclxuICAgICAgICAgIC5zZXQobmF2TWFpbiwge2Rpc3BsYXk6ICdibG9jayd9KVxyXG4gICAgICAgICAgLnRvKG5hdk1haW4sIHtvcGFjaXR5OiAxLCB5OiAwLCBkdXJhdGlvbjogLjN9KVxyXG4gICAgICAgICAgLnRvKGJ1cmdlckxpbmUyLCB7b3BhY2l0eTogMCwgeDogLTIwLCBkdXJhdGlvbjogLjJ9LCBcIi09LjJcIilcclxuICAgICAgICAgIC5zZXQoYnVyZ2VyTGluZTIsIHtkaXNwbGF5OiAnbm9uZSd9KVxyXG4gICAgICAgICAgLnRvKGJ1cmdlckxpbmUxLCB7dG9wOiAnNTAlJywgcm90YXRlOiA0NSwgZHVyYXRpb246IC4yfSwgXCItPS4yXCIpXHJcbiAgICAgICAgICAudG8oYnVyZ2VyTGluZTMsIHt0b3A6ICc1MCUnLCByb3RhdGU6IC00NSwgZHVyYXRpb246IC4yfSwgXCItPS4yXCIpXHJcbiAgICAgICAgICAudG8obmF2TWFpbiwge2JhY2tncm91bmRQb3NpdGlvbjogJ3JpZ2h0IDcycHggYm90dG9tIDYwcHgnLCBkdXJhdGlvbjogLjR9LCBcIi09LjJcIilcclxuICAgICAgICAgIC50byhuYXZNYWluSXRlbXNbMF0sIHtvcGFjaXR5OiAxLCB5OiAwLCBkdXJhdGlvbjogLjJ9LCBcIi09LjFcIilcclxuICAgICAgICAgIC50byhuYXZNYWluSXRlbXNbMV0sIHtvcGFjaXR5OiAxLCB5OiAwLCBkdXJhdGlvbjogLjJ9LCBcIi09LjE1XCIpXHJcbiAgICAgICAgICAudG8obmF2TWFpbkl0ZW1zWzJdLCB7b3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IC4yfSwgXCItPS4xNVwiKVxyXG4gICAgICAgICAgLnRvKG5hdk1haW5JdGVtc1szXSwge29wYWNpdHk6IDEsIHk6IDAsIGR1cmF0aW9uOiAuMn0pXHJcbiAgICAgICAgICAudG8obmF2TWFpbkl0ZW1zWzRdLCB7b3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IC4yfSwgXCItPS4xNVwiKVxyXG4gICAgICAgICAgLnRvKG5hdk1haW5JdGVtc1s1XSwge29wYWNpdHk6IDEsIHk6IDAsIGR1cmF0aW9uOiAuMn0sIFwiLT0uMTVcIilcclxuXHJcbnRMaW5lRXh0cmEuc2V0KG5hdkV4dHJhLCB7ZGlzcGxheTogJ2Jsb2NrJ30sIFwiLT0wLjRcIilcclxuICAgICAgICAgICAgLnRvKG5hdkV4dHJhLCB7b3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IC4zfSwgXCItPS4zXCIpXHJcbiAgICAgICAgICAgIC50byhuYXZFeHRyYUl0ZW1zWzBdLCB7b3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IC4yfSwgXCItPS4xXCIpXHJcbiAgICAgICAgICAgIC50byhuYXZFeHRyYUl0ZW1zWzFdLCB7b3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IC4yfSwgXCItPS4xXCIpXHJcbiAgICAgICAgICAgIC50byhuYXZFeHRyYUl0ZW1zWzJdLCB7b3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IC4yfSwgXCItPS4xXCIpXHJcbiAgICAgICAgICAgIC50byhuYXZFeHRyYUl0ZW1zWzNdLCB7b3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IC4yfSlcclxuXHJcblxyXG5jb25zdCBidG5SZXNldCA9ICgpID0+IHtcclxuICBidXJnZXJMaW5lMS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgYnVyZ2VyTGluZTIucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG4gIGJ1cmdlckxpbmUzLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxufVxyXG5cclxuY29uc3QgYnRuQWN0aXZlID0gKCkgPT4ge1xyXG4gIGJ1cmdlckxpbmUxLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGUoNDVkZWcpJztcclxuICBidXJnZXJMaW5lMS5zdHlsZS50b3AgPSAnNTAlJztcclxuICBidXJnZXJMaW5lMi5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICBidXJnZXJMaW5lMi5zdHlsZS50cmFuc2Zvcm0gID0gJ3RyYW5zbGF0ZVkoLTUwJSkgdHJhbnNsYXRlWCgtMjBweCknO1xyXG4gIGJ1cmdlckxpbmUyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgYnVyZ2VyTGluZTMuc3R5bGUudHJhbnNmb3JtICA9ICdyb3RhdGUoLTQ1ZGVnKSc7XHJcbiAgYnVyZ2VyTGluZTMuc3R5bGUudG9wID0gJzUwJSc7XHJcbn1cclxuXHJcbmNvbnN0IG5hdk1haW5SZXNldCA9ICgpID0+IHtcclxuICBuYXZNYWluSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgaXRlbS5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgIGl0ZW0uc3R5bGUudHJhbnNmb3JtID0gJ25vbmUnO1xyXG4gIH0pXHJcbiAgbmF2TWFpbi5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSc7XHJcbiAgbmF2TWFpbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICBuYXZNYWluLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gIG5hdk1haW4uc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ3JpZ2h0IDcycHggYm90dG9tIDYwcHgnO1xyXG59XHJcblxyXG5jb25zdCBuYXZNYWluSGlkZGVuID0gKCkgPT4ge1xyXG4gIG5hdk1haW5JdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICBpdGVtLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgaXRlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSg1MHB4KSc7XHJcbiAgfSlcclxuICBuYXZNYWluLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKDUwcHgpJztcclxuICBuYXZNYWluLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgbmF2TWFpbi5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICBuYXZNYWluLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICdyaWdodCA3MnB4IGJvdHRvbSAtMTUwcHgnO1xyXG59XHJcblxyXG5jb25zdCBuYXZFeHRyYVJlc2V0ID0gKCkgPT4ge1xyXG4gIG5hdkV4dHJhSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgaXRlbS5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgIGl0ZW0uc3R5bGUudHJhbnNmb3JtID0gJ25vbmUnO1xyXG4gIH0pXHJcbiAgbmF2RXh0cmEuc3R5bGUudHJhbnNmb3JtID0gJ25vbmUnO1xyXG4gIG5hdkV4dHJhLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIG5hdkV4dHJhLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG59XHJcblxyXG5jb25zdCBuYXZFeHRyYUhpZGRlbiA9ICgpID0+IHtcclxuICBuYXZFeHRyYUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgIGl0ZW0uc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICBpdGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKDUwcHgpJztcclxuICB9KVxyXG4gIG5hdkV4dHJhLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKDUwcHgpJztcclxuICBuYXZFeHRyYS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIG5hdkV4dHJhLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG59XHJcblxyXG5idXJnZXIub25jbGljayA9ICgpID0+IHtcclxuICBsZXQgeCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuXHJcbiAgaWYgKHggPiA1ODApIHtcclxuICAgIGlmIChidXJnZXJGbGFnID09PSB0cnVlKSB7XHJcbiAgICAgIHRMaW5lTWFpbi5wbGF5KCk7XHJcbiAgICAgIG5hdk1haW4uY2xhc3NMaXN0LmFkZCgnbmF2X2FjdGl2ZScpO1xyXG4gICAgICBuYXZFeHRyYS5jbGFzc0xpc3QuYWRkKCduYXZfYWN0aXZlJyk7XHJcbiAgICAgIGJ1cmdlckZsYWcgPSAhYnVyZ2VyRmxhZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRMaW5lTWFpbi5yZXZlcnNlKCk7XHJcbiAgICAgIG5hdk1haW4uY2xhc3NMaXN0LnJlbW92ZSgnbmF2X2FjdGl2ZScpO1xyXG4gICAgICBuYXZFeHRyYS5jbGFzc0xpc3QucmVtb3ZlKCduYXZfYWN0aXZlJyk7XHJcbiAgICAgIGJ1cmdlckZsYWcgPSAhYnVyZ2VyRmxhZztcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGJ1cmdlckZsYWcgPT09IHRydWUpIHtcclxuICAgICAgdExpbmVNYWluLnBsYXkoKTtcclxuICAgICAgdExpbmVFeHRyYS5wbGF5KCk7XHJcbiAgICAgIG5hdk1haW4uY2xhc3NMaXN0LmFkZCgnbmF2X2FjdGl2ZScpO1xyXG4gICAgICBuYXZFeHRyYS5jbGFzc0xpc3QuYWRkKCduYXZfYWN0aXZlJyk7XHJcbiAgICAgIGJ1cmdlckZsYWcgPSAhYnVyZ2VyRmxhZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRMaW5lRXh0cmEucmV2ZXJzZSgpO1xyXG4gICAgICB0TGluZU1haW4ucmV2ZXJzZSgpO1xyXG4gICAgICBuYXZNYWluLmNsYXNzTGlzdC5yZW1vdmUoJ25hdl9hY3RpdmUnKTtcclxuICAgICAgbmF2RXh0cmEuY2xhc3NMaXN0LnJlbW92ZSgnbmF2X2FjdGl2ZScpO1xyXG4gICAgICBidXJnZXJGbGFnID0gIWJ1cmdlckZsYWc7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBwcm9wZXJ0aWVzQ29udHJvbGxlciA9ICgpID0+IHtcclxuICBuYXZNYWluLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIG5hdkV4dHJhLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICBsZXQgeCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCxcclxuICAgICAgaGVhZGVySCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKS5vZmZzZXRIZWlnaHQsXHJcbiAgICAgIG5hdk1haW5IZWlnaHQgPSBuYXZNYWluLm9mZnNldEhlaWdodDtcclxuXHJcbiAgaWYgKHggPiBtZWRpYVdpZHRoKSB7XHJcbiAgICBuYXZNYWluUmVzZXQoKTtcclxuICAgIGJ0blJlc2V0KCk7XHJcbiAgICBuYXZFeHRyYVJlc2V0KCk7XHJcbiAgfSBlbHNlIGlmICh4IDw9IDU4MCkge1xyXG4gICAgbmF2RXh0cmEuc3R5bGUudG9wID0gKGhlYWRlckggLSAyMDEgKyBuYXZNYWluSGVpZ2h0KSArICdweCc7XHJcbiAgICBuYXZNYWluLnN0eWxlLnRvcCA9IChoZWFkZXJIIC0gMjAxKSArICdweCc7XHJcbiAgICBpZiAobmF2TWFpbi5jbGFzc0xpc3QuY29udGFpbnMoJ25hdl9hY3RpdmUnKSA9PT0gZmFsc2UpIHtcclxuICAgICAgbmF2TWFpbkhpZGRlbigpO1xyXG4gICAgICBidG5SZXNldCgpO1xyXG4gICAgICBuYXZFeHRyYUhpZGRlbigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmF2TWFpblJlc2V0KCk7XHJcbiAgICAgIGJ0bkFjdGl2ZSgpO1xyXG4gICAgICBuYXZFeHRyYVJlc2V0KCk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIG5hdk1haW4uc3R5bGUudG9wID0gJzEwOHB4JztcclxuICAgIGlmIChuYXZNYWluLmNsYXNzTGlzdC5jb250YWlucygnbmF2X2FjdGl2ZScpID09PSBmYWxzZSkge1xyXG4gICAgICBuYXZNYWluSGlkZGVuKCk7XHJcbiAgICAgIGJ0blJlc2V0KCk7XHJcbiAgICAgIG5hdkV4dHJhUmVzZXQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5hdk1haW5SZXNldCgpO1xyXG4gICAgICBidG5BY3RpdmUoKTtcclxuICAgICAgbmF2RXh0cmFSZXNldCgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxucHJvcGVydGllc0NvbnRyb2xsZXIoKTtcclxuXHJcbndpbmRvdy5vbnJlc2l6ZSA9ICgpID0+IHtcclxuXHJcbiAgcHJvcGVydGllc0NvbnRyb2xsZXIoKTtcclxuXHJcbiAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9jYXRhbG9nLmh0bWwnKSB7XHJcbiAgICBsZXQgeCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuXHJcbiAgICBpZiAoeCA+IDEyMDApIHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhdGFsb2ctbGVmdF9fZHJvcGRvd24nKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnY2F0YWxvZy1sZWZ0X19kcm9wZG93bl9hY3RpdmUnKTtcclxuICAgICAgICBpdGVtLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgICAgfSlcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhdGFsb2ctbGVmdF9fYnRuJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NhdGFsb2ctbGVmdF9fYnRuX2FjdGl2ZScpO1xyXG4gICAgICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhdGFsb2ctbGVmdF9fZHJvcGRvd24nKS5mb3JFYWNoKGRyb3Bkb3duID0+IHtcclxuICAgICAgICBkcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdjYXRhbG9nLWxlZnRfX2Ryb3Bkb3duX2FjdGl2ZScpO1xyXG4gICAgICAgIGdzYXAudG8oZHJvcGRvd24sIHtoZWlnaHQ6IDAsIGR1cmF0aW9uOiAuMX0pXHJcbiAgICAgICAgZ3NhcC50byhkcm9wZG93biwge29wYWNpdHk6IDAsIGR1cmF0aW9uOiAuMX0pXHJcbiAgICAgICAgZ3NhcC50byhkcm9wZG93biwge2Rpc3BsYXk6ICdub25lJywgZHVyYXRpb246IC4xfSlcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ19fbGVmdCcpLnN0eWxlLnRvcCA9IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ19fdG9wJykub2Zmc2V0SGVpZ2h0ICsgMTcpICsgJ3B4JztcclxuXHJcbiAgICBzZXRDYXRhbG9nU2xpZGVzT3JkZXIoKTtcclxuICB9XHJcbn1cclxuIiwiaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9jYXRhbG9nLmh0bWwnKSB7XHJcbiAgbGV0IGNhdGFsb2dDYXRlZ29yeUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRhbG9nLWNhdGVnb3J5X19jaGVja2JveC1jb250YWluZXInKSxcclxuICAgICAgY2F0YWxvZ0Rpc2NvdW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2ctZGlzY291bnRfX2NoZWNrYm94LWNvbnRhaW5lcicpLFxyXG4gICAgICBjYXRhbG9nQ29sb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZy1jb2xvcl9fY2hlY2tib3gtY29udGFpbmVyJyksXHJcbiAgICAgIGNhdGFsb2dDYXRlZ29yeUFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xhYmVsW2RhdGEtZmlsdGVyPVwiY2F0ZWdvcnlcIl0nKSxcclxuICAgICAgY2F0YWxvZ0Rpc2NvdW50QXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGFiZWxbZGF0YS1maWx0ZXI9XCJkaXNjb3VudFwiXScpLFxyXG4gICAgICBjYXRhbG9nQ29sb3JBcnIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsYWJlbFtkYXRhLWZpbHRlcj1cImNvbG9yXCJdJyksXHJcbiAgICAgIHRMaW5lQ2F0ZWdvcnlDaGVja2JveGVzID0gZ3NhcC50aW1lbGluZSh7cGF1c2VkOiB0cnVlfSksXHJcbiAgICAgIHRMaW5lRGlzY291bnRDaGVja2JveGVzID0gZ3NhcC50aW1lbGluZSh7cGF1c2VkOiB0cnVlfSksXHJcbiAgICAgIHRMaW5lQ29sb3JDaGVja2JveGVzID0gZ3NhcC50aW1lbGluZSh7cGF1c2VkOiB0cnVlfSksXHJcbiAgICAgIGNvdW50ID0gOTtcclxuXHJcbiAgbGV0IHRMaW5lR2VuZXJhdG9yID0gKGFyciwgY29udGFpbmVyLCB0TGluZSkgPT4ge1xyXG5cclxuICAgIGlmIChhcnIubGVuZ3RoID4gY291bnQpIHtcclxuXHJcbiAgICAgIHRMaW5lLmZyb21Ubyhjb250YWluZXIsIHtoZWlnaHQ6IGNvbnRhaW5lci5vZmZzZXRIZWlnaHR9LCB7aGVpZ2h0OiAyNzksIGR1cmF0aW9uOiAuNX0pXHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gOTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRMaW5lLnRvKGFycltpXSwge29wYWNpdHk6IDAsIGR1cmF0aW9uOiAuNX0sIFwiLT0uNVwiKVxyXG4gICAgICAgICAgICAuc2V0KGFycltpXSwge2Rpc3BsYXk6ICdub25lJ30pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nKTtcclxuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NhdGFsb2ctbGVmdF9fYnRuLXNob3dtb3JlJyk7XHJcbiAgICAgIGJ1dHRvbi5kYXRhc2V0LmZpbHRlciA9IGFyclswXS5kYXRhc2V0LmZpbHRlcjtcclxuICAgICAgYnV0dG9uLmRhdGFzZXQuY291bnQgPSBhcnIubGVuZ3RoIC0gY291bnQ7XHJcbiAgICAgIGNvbnRhaW5lci5wYXJlbnRFbGVtZW50LmFwcGVuZChidXR0b24pO1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBidXR0b25bZGF0YS1maWx0ZXI9XCIke2FyclswXS5kYXRhc2V0LmZpbHRlcn1cIl1gKS5pbm5lckhUTUwgPSBgKyDQtdGJ0ZEgJHthcnIubGVuZ3RoIC0gY291bnR9YDtcclxuXHJcbiAgICAgIHRMaW5lLnBsYXkoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRMaW5lR2VuZXJhdG9yKGNhdGFsb2dDYXRlZ29yeUFyciwgY2F0YWxvZ0NhdGVnb3J5Q29udGFpbmVyLCB0TGluZUNhdGVnb3J5Q2hlY2tib3hlcyk7XHJcbiAgdExpbmVHZW5lcmF0b3IoY2F0YWxvZ0Rpc2NvdW50QXJyLCBjYXRhbG9nRGlzY291bnRDb250YWluZXIsIHRMaW5lRGlzY291bnRDaGVja2JveGVzKTtcclxuICB0TGluZUdlbmVyYXRvcihjYXRhbG9nQ29sb3JBcnIsIGNhdGFsb2dDb2xvckNvbnRhaW5lciwgdExpbmVDb2xvckNoZWNrYm94ZXMpO1xyXG5cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0YWxvZy1sZWZ0X19idG4tc2hvd21vcmUnKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgaXRlbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQuY3VycmVudFRhcmdldC5pbm5lckhUTUwgPT09ICfQodCy0LXRgNC90YPRgtGMJykge1xyXG4gICAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsdGVyID09PSAnY2F0ZWdvcnknKSB7XHJcbiAgICAgICAgICB0TGluZUNhdGVnb3J5Q2hlY2tib3hlcy5wbGF5KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsdGVyID09PSAnZGlzY291bnQnKSB7XHJcbiAgICAgICAgICB0TGluZURpc2NvdW50Q2hlY2tib3hlcy5wbGF5KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsdGVyID09PSAnY29sb3InKSB7XHJcbiAgICAgICAgICB0TGluZUNvbG9yQ2hlY2tib3hlcy5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuaW5uZXJIVE1MID0gYCsg0LXRidGRICR7ZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvdW50fWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWx0ZXIgPT09ICdjYXRlZ29yeScpIHtcclxuICAgICAgICAgIHRMaW5lQ2F0ZWdvcnlDaGVja2JveGVzLnJldmVyc2UoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWx0ZXIgPT09ICdkaXNjb3VudCcpIHtcclxuICAgICAgICAgIHRMaW5lRGlzY291bnRDaGVja2JveGVzLnJldmVyc2UoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWx0ZXIgPT09ICdjb2xvcicpIHtcclxuICAgICAgICAgIHRMaW5lQ29sb3JDaGVja2JveGVzLnJldmVyc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5pbm5lckhUTUwgPSAn0KHQstC10YDQvdGD0YLRjCc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG5cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0YWxvZy1sZWZ0X19kcm9wZG93bicpLmZvckVhY2goZHJvcGRvd24gPT4ge1xyXG4gICAgbGV0IHggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XHJcblxyXG4gICAgaWYgKHggPD0gMTIwMCkge1xyXG4gICAgICBkcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdjYXRhbG9nLWxlZnRfX2Ryb3Bkb3duX2FjdGl2ZScpO1xyXG4gICAgICBnc2FwLnRvKGRyb3Bkb3duLCB7aGVpZ2h0OiAwfSlcclxuICAgICAgZ3NhcC50byhkcm9wZG93biwge29wYWNpdHk6IDB9KVxyXG4gICAgICBnc2FwLnRvKGRyb3Bkb3duLCB7ZGlzcGxheTogJ25vbmUnfSlcclxuICAgIH1cclxuICB9KVxyXG5cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0YWxvZy1sZWZ0X19idG4nKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgaXRlbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBsZXQgcGF0aCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5wYXRoO1xyXG5cclxuICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdjYXRhbG9nLWxlZnRfX2J0bl9hY3RpdmUnKTtcclxuXHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRhbG9nLWxlZnRfX2Ryb3Bkb3duJykuZm9yRWFjaChkcm9wZG93biA9PiB7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGRyb3Bkb3duLmRhdGFzZXQudGFyZ2V0O1xyXG4gICAgICAgIGlmICh0YXJnZXQgPT09IHBhdGgpIHtcclxuICAgICAgICAgIGRyb3Bkb3duLmNsYXNzTGlzdC50b2dnbGUoJ2NhdGFsb2ctbGVmdF9fZHJvcGRvd25fYWN0aXZlJyk7XHJcbiAgICAgICAgICBpZiAoZHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXRhbG9nLWxlZnRfX2Ryb3Bkb3duX2FjdGl2ZScpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGdzYXAudG8oZHJvcGRvd24sIHtkaXNwbGF5OiAnYmxvY2snfSlcclxuICAgICAgICAgICAgZ3NhcC50byhkcm9wZG93biwge29wYWNpdHk6IDEsIGR1cmF0aW9uOiAuNX0pXHJcbiAgICAgICAgICAgIGdzYXAudG8oZHJvcGRvd24sIHtoZWlnaHQ6ICdhdXRvJywgZHVyYXRpb246IC41fSlcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdzYXAudG8oZHJvcGRvd24sIHtoZWlnaHQ6IDAsIGR1cmF0aW9uOiAuNX0pXHJcbiAgICAgICAgICAgIGdzYXAudG8oZHJvcGRvd24sIHtvcGFjaXR5OiAwLCBkdXJhdGlvbjogLjV9KVxyXG4gICAgICAgICAgICBnc2FwLnRvKGRyb3Bkb3duLCB7ZGlzcGxheTogJ25vbmUnfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG4iLCJpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnL2NhdGFsb2cuaHRtbCcpIHtcclxuICBsZXQgbWFya2VyQ2F0ZWdvcnlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZy1tYXJrZXJzX19jYXRlZ29yeS1jb250YWluZXInKSxcclxuICAgICAgbWFya2VyUHJpY2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZy1tYXJrZXJzX19wcmljZS1jb250YWluZXInKSxcclxuICAgICAgbWFya2VyRGlzY291bnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZy1tYXJrZXJzX19kaXNjb3VudC1jb250YWluZXInKSxcclxuICAgICAgbWFya2VyQ29sb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZy1tYXJrZXJzX19jb2xvci1jb250YWluZXInKTtcclxuXHJcbiAgbGV0IG1hcmtlclJlbW92ZSA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRhbG9nLW1hcmtlcnNfX2J0bicpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIGl0ZW0ub25jbGljayA9IChhY3RpdmUpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0YWxvZ19fY2hlY2tib3gtbGFiZWwnKS5mb3JFYWNoKGxhYmVsID0+IHtcclxuICAgICAgICAgIGlmIChsYWJlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSA9PT0gYWN0aXZlLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSkge1xyXG4gICAgICAgICAgICBsYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBhY3RpdmUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1hcmtlckNhdGVnb3J5Q29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoKTtcclxuICAgICAgICBpZiAobWFya2VyQ2F0ZWdvcnlDb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIG1hcmtlckNhdGVnb3J5Q29udGFpbmVyLnN0eWxlLm1hcmdpblJpZ2h0ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbWFya2VyQ2F0ZWdvcnlDb250YWluZXIuc3R5bGUubWFyZ2luUmlnaHQgPSAnMjBweCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXJrZXJQcmljZUNvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgbWFya2VyUHJpY2VDb250YWluZXIuc3R5bGUubWFyZ2luUmlnaHQgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtYXJrZXJQcmljZUNvbnRhaW5lci5zdHlsZS5tYXJnaW5SaWdodCA9ICcyMHB4JztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1hcmtlckRpc2NvdW50Q29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICBtYXJrZXJEaXNjb3VudENvbnRhaW5lci5zdHlsZS5tYXJnaW5SaWdodCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG1hcmtlckRpc2NvdW50Q29udGFpbmVyLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzIwcHgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWFya2VyQ29sb3JDb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIG1hcmtlckNvbG9yQ29udGFpbmVyLnN0eWxlLm1hcmdpblJpZ2h0ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbWFya2VyQ29sb3JDb250YWluZXIuc3R5bGUubWFyZ2luUmlnaHQgPSAnMjBweCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ19fbGVmdCcpLnN0eWxlLnRvcCA9IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ19fdG9wJykub2Zmc2V0SGVpZ2h0ICsgMTcpICsgJ3B4JztcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGxldCBtYXJrZXJBZGQgPSAoaXRlbSkgPT4ge1xyXG4gICAgaWYgKGl0ZW0uZGF0YXNldC5maWx0ZXIgPT09ICdjYXRlZ29yeScpIHtcclxuICAgICAgaWYgKGl0ZW0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuY2hlY2tlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2F0YWxvZy1tYXJrZXJzX19tYXJrZXInKTtcclxuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2F0YWxvZy1tYXJrZXJzX19jYXRlZ29yeScpO1xyXG4gICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBpdGVtLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpKTtcclxuICAgICAgICBtYXJrZXJDYXRlZ29yeUNvbnRhaW5lci5hcHBlbmQoZGl2KTtcclxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gYCR7aXRlbS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGNhdGFsb2ctbWFya2Vyc19fYnRuXCIgYXJpYS1sYWJlbD1cItCj0LHRgNCw0YLRjCDRhNC40LvRjNGC0YBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJjYXRhbG9nLW1hcmtlcnNfX2ljb25cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjY2xvc2VcIj48L3VzZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPmA7XHJcbiAgICAgICAgbWFya2VyQ2F0ZWdvcnlDb250YWluZXIuc3R5bGUubWFyZ2luUmlnaHQgPSAnMjBweCc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhdGFsb2ctbWFya2Vyc19fY2F0ZWdvcnknKS5mb3JFYWNoKGNhdGVnb3J5ID0+IHtcclxuICAgICAgICAgIGlmIChjYXRlZ29yeS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSA9PT0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSkge1xyXG4gICAgICAgICAgICBjYXRlZ29yeS5yZW1vdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChtYXJrZXJDYXRlZ29yeUNvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgbWFya2VyQ2F0ZWdvcnlDb250YWluZXIuc3R5bGUubWFyZ2luUmlnaHQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChpdGVtLmRhdGFzZXQuZmlsdGVyID09PSAnZGlzY291bnQnKSB7XHJcbiAgICAgIGlmIChpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmNoZWNrZWQgPT09IHRydWUpIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2ctbWFya2Vyc19fZGlzY291bnQnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NhdGFsb2ctbWFya2Vyc19fbWFya2VyJyk7XHJcbiAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2F0YWxvZy1tYXJrZXJzX19kaXNjb3VudCcpO1xyXG4gICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGl0ZW0uZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykpO1xyXG4gICAgICAgICAgbWFya2VyRGlzY291bnRDb250YWluZXIuYXBwZW5kKGRpdik7XHJcbiAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gYCR7aXRlbS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gY2F0YWxvZy1tYXJrZXJzX19idG5cIiBhcmlhLWxhYmVsPVwi0KPQsdGA0LDRgtGMINGE0LjQu9GM0YLRgFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiY2F0YWxvZy1tYXJrZXJzX19pY29uXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjY2xvc2VcIj48L3VzZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRhbG9nLW1hcmtlcnNfX2Rpc2NvdW50Jykuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgaXRlbS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSk7XHJcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZy1tYXJrZXJzX19kaXNjb3VudCcpLmlubmVySFRNTCA9IGAke2l0ZW0uZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGNhdGFsb2ctbWFya2Vyc19fYnRuXCIgYXJpYS1sYWJlbD1cItCj0LHRgNCw0YLRjCDRhNC40LvRjNGC0YBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImNhdGFsb2ctbWFya2Vyc19faWNvblwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI2Nsb3NlXCI+PC91c2U+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWFya2VyRGlzY291bnRDb250YWluZXIuc3R5bGUubWFyZ2luUmlnaHQgPSAnMjBweCc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhdGFsb2dfX2NoZWNrYm94LWxhYmVsJykuZm9yRWFjaChsYWJlbCA9PiB7XHJcbiAgICAgICAgICBpZiAobGFiZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhdGFsb2ctZGlzY291bnRfX2NoZWNrYm94LWNvbnRhaW5lcicpID09PSB0cnVlICYmIGxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmNoZWNrZWQgPT09IHRydWUgJiYgKGxhYmVsLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpICE9PSBpdGVtLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpKSkge1xyXG4gICAgICAgICAgICBsYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5jaGVja2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhdGFsb2ctbWFya2Vyc19fZGlzY291bnQnKS5mb3JFYWNoKGRpc2NvdW50ID0+IHtcclxuICAgICAgICAgIGlmIChkaXNjb3VudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSA9PT0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSkge1xyXG4gICAgICAgICAgICBkaXNjb3VudC5yZW1vdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChtYXJrZXJEaXNjb3VudENvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgbWFya2VyRGlzY291bnRDb250YWluZXIuc3R5bGUubWFyZ2luUmlnaHQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChpdGVtLmRhdGFzZXQuZmlsdGVyID09PSAnY29sb3InKSB7XHJcbiAgICAgIGlmIChpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmNoZWNrZWQgPT09IHRydWUpIHtcclxuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NhdGFsb2ctbWFya2Vyc19fbWFya2VyJyk7XHJcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NhdGFsb2ctbWFya2Vyc19fY29sb3InKTtcclxuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgaXRlbS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSk7XHJcbiAgICAgICAgbWFya2VyQ29sb3JDb250YWluZXIuYXBwZW5kKGRpdik7XHJcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IGAke2l0ZW0uZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBjYXRhbG9nLW1hcmtlcnNfX2J0blwiIGFyaWEtbGFiZWw9XCLQo9Cx0YDQsNGC0Ywg0YTQuNC70YzRgtGAXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiY2F0YWxvZy1tYXJrZXJzX19pY29uXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI2Nsb3NlXCI+PC91c2U+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5gO1xyXG4gICAgICAgIG1hcmtlckNvbG9yQ29udGFpbmVyLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzIwcHgnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRhbG9nLW1hcmtlcnNfX2NvbG9yJykuZm9yRWFjaChjb2xvciA9PiB7XHJcbiAgICAgICAgICBpZiAoY29sb3IuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykgPT09IGl0ZW0uZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykpIHtcclxuICAgICAgICAgICAgY29sb3IucmVtb3ZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAobWFya2VyQ29sb3JDb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIG1hcmtlckNvbG9yQ29udGFpbmVyLnN0eWxlLm1hcmdpblJpZ2h0ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRhbG9nX19jaGVja2JveC1sYWJlbCcpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBtYXJrZXJBZGQoaXRlbSk7XHJcblxyXG4gICAgaXRlbS5vbmNsaWNrID0gKGFjdGl2ZSkgPT4ge1xyXG4gICAgICBtYXJrZXJBZGQoYWN0aXZlLmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2dfX2xlZnQnKS5zdHlsZS50b3AgPSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2dfX3RvcCcpLm9mZnNldEhlaWdodCArIDE3KSArICdweCc7XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgJCgnLmNhdGFsb2dfX21hcmtlcnMnKS5vbihcIkRPTU5vZGVJbnNlcnRlZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIG1hcmtlclJlbW92ZSgpO1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRhbG9nX19sZWZ0Jykuc3R5bGUudG9wID0gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRhbG9nX190b3AnKS5vZmZzZXRIZWlnaHQgKyAxNykgKyAncHgnO1xyXG4gIH0pXHJcblxyXG4gIG1hcmtlclJlbW92ZSgpO1xyXG59XHJcbiIsImlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvY2F0YWxvZy5odG1sJykge1xyXG4gIGxldCBtYXJrZXJQcmljZUFkZCA9IChwcmljZVRvKSA9PiB7XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2ctbWFya2Vyc19fcHJpY2UnKSA9PT0gbnVsbCkge1xyXG4gICAgICBsZXQgY2F0YWxvZ01hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBjYXRhbG9nTWFya2VyLmNsYXNzTGlzdC5hZGQoJ2NhdGFsb2ctbWFya2Vyc19fbWFya2VyJyk7XHJcbiAgICAgIGNhdGFsb2dNYXJrZXIuY2xhc3NMaXN0LmFkZCgnY2F0YWxvZy1tYXJrZXJzX19wcmljZScpO1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZy1tYXJrZXJzX19wcmljZS1jb250YWluZXInKS5hcHBlbmQoY2F0YWxvZ01hcmtlcik7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRhbG9nLW1hcmtlcnNfX3ByaWNlLWNvbnRhaW5lcicpLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzIwcHgnO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRhbG9nLW1hcmtlcnNfX3ByaWNlJykuaW5uZXJIVE1MID0gYNCU0L4gJHtwcmljZVRvfVxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBjYXRhbG9nLW1hcmtlcnNfX2J0blwiPlxyXG4gICAgICA8c3ZnIGNsYXNzPVwiY2F0YWxvZy1tYXJrZXJzX19pY29uXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XHJcbiAgICAgICAgPHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjY2xvc2VcIj48L3VzZT5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L2J1dHRvbj5gO1xyXG4gIH1cclxuXHJcbiAgJCggZnVuY3Rpb24oKSB7XHJcbiAgICAkKCBcIiNzbGlkZXItcmFuZ2VcIiApLnNsaWRlcih7XHJcbiAgICAgIHJhbmdlOiB0cnVlLFxyXG4gICAgICBtaW46IDAsXHJcbiAgICAgIG1heDogMjAwMDAwLFxyXG4gICAgICB2YWx1ZXM6IFsgMjAwMCwgMTUwMDAwIF0sXHJcbiAgICAgIHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICQoIFwiLmNhdGFsb2ctcHJpY2UtbWluX19pbnB1dFwiICkudmFsKHVpLnZhbHVlc1sgMCBdKTtcclxuICAgICAgICAkKCBcIi5jYXRhbG9nLXByaWNlLW1heF9faW5wdXRcIiApLnZhbCh1aS52YWx1ZXNbIDEgXSk7XHJcbiAgICAgICAgJCgnLmNhdGFsb2ctcHJpY2UtbWluX19pbnB1dCcpLnZhbChTdHJpbmcoJCgnLmNhdGFsb2ctcHJpY2UtbWluX19pbnB1dCcpLnZhbCgpLnJlcGxhY2UoL1teMC05Ll0vZywnJykpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiIFwiKSk7XHJcbiAgICAgICAgJCgnLmNhdGFsb2ctcHJpY2UtbWF4X19pbnB1dCcpLnZhbChTdHJpbmcoJCgnLmNhdGFsb2ctcHJpY2UtbWF4X19pbnB1dCcpLnZhbCgpLnJlcGxhY2UoL1teMC05Ll0vZywnJykpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiIFwiKSk7XHJcblxyXG4gICAgICAgIG1hcmtlclByaWNlQWRkKCQoJy5jYXRhbG9nLXByaWNlLW1heF9faW5wdXQnKS52YWwoKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJCggXCIuY2F0YWxvZy1wcmljZS1taW5fX2lucHV0XCIgKS52YWwoJCggXCIjc2xpZGVyLXJhbmdlXCIgKS5zbGlkZXIoIFwidmFsdWVzXCIsIDAgKSk7XHJcbiAgICAkKCBcIi5jYXRhbG9nLXByaWNlLW1heF9faW5wdXRcIiApLnZhbCgkKCBcIiNzbGlkZXItcmFuZ2VcIiApLnNsaWRlciggXCJ2YWx1ZXNcIiwgMSApKTtcclxuICAgICQoJy5jYXRhbG9nLXByaWNlLW1pbl9faW5wdXQnKS52YWwoU3RyaW5nKCQoJy5jYXRhbG9nLXByaWNlLW1pbl9faW5wdXQnKS52YWwoKS5yZXBsYWNlKC9bXjAtOS5dL2csJycpKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIiBcIikpO1xyXG4gICAgJCgnLmNhdGFsb2ctcHJpY2UtbWF4X19pbnB1dCcpLnZhbChTdHJpbmcoJCgnLmNhdGFsb2ctcHJpY2UtbWF4X19pbnB1dCcpLnZhbCgpLnJlcGxhY2UoL1teMC05Ll0vZywnJykpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiIFwiKSk7XHJcblxyXG4gICAgbWFya2VyUHJpY2VBZGQoJCgnLmNhdGFsb2ctcHJpY2UtbWF4X19pbnB1dCcpLnZhbCgpKTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudWktc2xpZGVyLWhhbmRsZScpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIGl0ZW0ub25mb2N1cyA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudWktd2lkZ2V0LWhlYWRlcicpLnN0eWxlLmJhY2tncm91bmQgPSAnIzcwMzNBQyc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGl0ZW0ub25ibHVyID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51aS13aWRnZXQtaGVhZGVyJykuc3R5bGUuYmFja2dyb3VuZCA9ICcjQTY1Q0YwJztcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9ICk7XHJcblxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRhbG9nLXByaWNlLW1pbl9faW5wdXQnKS5vbmlucHV0ID0gKCkgPT4ge1xyXG4gICAgJCgnLmNhdGFsb2ctcHJpY2UtbWluX19pbnB1dCcpLnZhbChTdHJpbmcoJCgnLmNhdGFsb2ctcHJpY2UtbWluX19pbnB1dCcpLnZhbCgpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiIFwiKSkucmVwbGFjZSgvW14wLTkuXS9nLCcnKSk7XHJcbiAgICBpZiAoL14oMHwtP1sxLTldXFxkezAsNX0pJC8udGVzdCgkKCBcIi5jYXRhbG9nLXByaWNlLW1pbl9faW5wdXRcIiApLnZhbCgpKSkge1xyXG4gICAgICBpZiAoJCggXCIuY2F0YWxvZy1wcmljZS1taW5fX2lucHV0XCIgKS52YWwoKSA+ICQoIFwiI3NsaWRlci1yYW5nZVwiICkuc2xpZGVyKCBcInZhbHVlc1wiLCAxKSkge1xyXG4gICAgICAgICQoIFwiLmNhdGFsb2ctcHJpY2UtbWluX19pbnB1dFwiICkudmFsKCQoIFwiI3NsaWRlci1yYW5nZVwiICkuc2xpZGVyKCBcInZhbHVlc1wiLCAxKSlcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJCggXCIuY2F0YWxvZy1wcmljZS1taW5fX2lucHV0XCIgKS52YWwoJCggXCIjc2xpZGVyLXJhbmdlXCIgKS5zbGlkZXIoIFwib3B0aW9uXCIsIFwibWluXCIgKSk7XHJcbiAgICB9XHJcbiAgICAkKCBcIiNzbGlkZXItcmFuZ2VcIiApLnNsaWRlciggXCJ2YWx1ZXNcIiwgMCwgJCggXCIuY2F0YWxvZy1wcmljZS1taW5fX2lucHV0XCIgKS52YWwoKSApO1xyXG4gICAgJCgnLmNhdGFsb2ctcHJpY2UtbWluX19pbnB1dCcpLnZhbChTdHJpbmcoJCgnLmNhdGFsb2ctcHJpY2UtbWluX19pbnB1dCcpLnZhbCgpLnJlcGxhY2UoL1teMC05Ll0vZywnJykpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiIFwiKSk7XHJcbiAgfVxyXG5cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZy1wcmljZS1tYXhfX2lucHV0Jykub25pbnB1dCA9ICgpID0+IHtcclxuICAgICQoJy5jYXRhbG9nLXByaWNlLW1heF9faW5wdXQnKS52YWwoU3RyaW5nKCQoJy5jYXRhbG9nLXByaWNlLW1heF9faW5wdXQnKS52YWwoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIiBcIikpLnJlcGxhY2UoL1teMC05Ll0vZywnJykpO1xyXG4gICAgaWYgKC9eKDB8LT9bMS05XVxcZHswLDV9KSQvLnRlc3QoJCggXCIuY2F0YWxvZy1wcmljZS1tYXhfX2lucHV0XCIgKS52YWwoKSkpIHtcclxuICAgICAgaWYgKCQoIFwiLmNhdGFsb2ctcHJpY2UtbWF4X19pbnB1dFwiICkudmFsKCkgPCAkKCBcIiNzbGlkZXItcmFuZ2VcIiApLnNsaWRlciggXCJ2YWx1ZXNcIiwgMCkpIHtcclxuICAgICAgICAkKCBcIi5jYXRhbG9nLXByaWNlLW1heF9faW5wdXRcIiApLnZhbCgkKCBcIiNzbGlkZXItcmFuZ2VcIiApLnNsaWRlciggXCJ2YWx1ZXNcIiwgMCkpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoIFwiLmNhdGFsb2ctcHJpY2UtbWF4X19pbnB1dFwiICkudmFsKCQoIFwiI3NsaWRlci1yYW5nZVwiICkuc2xpZGVyKCBcIm9wdGlvblwiLCBcIm1heFwiICkpO1xyXG4gICAgfVxyXG4gICAgJCggXCIjc2xpZGVyLXJhbmdlXCIgKS5zbGlkZXIoIFwidmFsdWVzXCIsIDEsICQoIFwiLmNhdGFsb2ctcHJpY2UtbWF4X19pbnB1dFwiICkudmFsKCkgKTtcclxuICAgICQoJy5jYXRhbG9nLXByaWNlLW1heF9faW5wdXQnKS52YWwoU3RyaW5nKCQoJy5jYXRhbG9nLXByaWNlLW1heF9faW5wdXQnKS52YWwoKS5yZXBsYWNlKC9bXjAtOS5dL2csJycpKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIiBcIikpO1xyXG5cclxuICAgIG1hcmtlclByaWNlQWRkKCQoJy5jYXRhbG9nLXByaWNlLW1heF9faW5wdXQnKS52YWwoKSk7XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IGNhdGFsb2dTd2lwZXIgPSBuZXcgU3dpcGVyKCcuY2F0YWxvZ19fc3dpcGVyJywge1xyXG4gIHNwYWNlQmV0d2VlbjogMTYsXHJcbiAgc2xpZGVzUGVyR3JvdXA6IDIsXHJcbiAgc2xpZGVzUGVyVmlldzogMixcclxuICBwYWdpbmF0aW9uOiB7XHJcbiAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICByZW5kZXJCdWxsZXQ6IGZ1bmN0aW9uIChpbmRleCwgY2xhc3NOYW1lKSB7XHJcbiAgICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCInICsgY2xhc3NOYW1lICsgJ1wiIGFyaWEtbGFiZWw9XCLQodC70LDQudC0ICcgKyAoaW5kZXggKyAxKSArICdcIj4nICsgKGluZGV4ICsgMSkgKyAnPC9zcGFuPic7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZ3JpZDoge1xyXG4gICAgcm93czogMyxcclxuICB9LFxyXG4gIGJyZWFrcG9pbnRzOiB7XHJcbiAgICA0NjE6IHtcclxuICAgICAgc3BhY2VCZXR3ZWVuOiAzMixcclxuICAgICAgc2xpZGVzUGVyR3JvdXA6IDIsXHJcbiAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICB9LFxyXG4gICAgMTAyNDoge1xyXG4gICAgICBzcGFjZUJldHdlZW46IDMyLFxyXG4gICAgICBzbGlkZXNQZXJHcm91cDogMyxcclxuICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgICAgZ3JpZDoge1xyXG4gICAgICAgIHJvd3M6IDMsXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5sZXQgc2V0Q2F0YWxvZ1NsaWRlc09yZGVyID0gKCkgPT4ge1xyXG5cclxuICBsZXQgeCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCxcclxuICAgICAgc2xpZGVzQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhdGFsb2dfX3NsaWRlJyksXHJcbiAgICAgIHJvdyA9IDEsXHJcbiAgICAgIHBsdXMgPSAwLFxyXG4gICAgICBvcmRlciA9IDA7XHJcblxyXG4gIGlmICh4ID4gMTAyMykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHJvdyA9PT0gMSkge1xyXG4gICAgICAgIHNsaWRlc0FycltpXS5zdHlsZS5vcmRlciA9IG9yZGVyICsgcGx1cztcclxuICAgICAgICBvcmRlciArPSAzO1xyXG4gICAgICAgIGlmICgoaSArIDEpICUgMyA9PT0gMCkge1xyXG4gICAgICAgICAgcm93ID0gMjtcclxuICAgICAgICAgIG9yZGVyID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAocm93ID09PSAyKSB7XHJcbiAgICAgICAgc2xpZGVzQXJyW2ldLnN0eWxlLm9yZGVyID0gb3JkZXIgKyBwbHVzO1xyXG4gICAgICAgIG9yZGVyICs9IDM7XHJcbiAgICAgICAgaWYgKChpICsgMSkgJSAzID09PSAwKSB7XHJcbiAgICAgICAgICByb3cgPSAzO1xyXG4gICAgICAgICAgb3JkZXIgPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChyb3cgPT09IDMpIHtcclxuICAgICAgICBzbGlkZXNBcnJbaV0uc3R5bGUub3JkZXIgPSBvcmRlciArIHBsdXM7XHJcbiAgICAgICAgb3JkZXIgKz0gMztcclxuICAgICAgICBpZiAoKGkgKyAxKSAlIDMgPT09IDApIHtcclxuICAgICAgICAgIHJvdyA9IDE7XHJcbiAgICAgICAgICBvcmRlciA9IDA7XHJcbiAgICAgICAgICBwbHVzICs9IDk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChyb3cgPT09IDEpIHtcclxuICAgICAgICBzbGlkZXNBcnJbaV0uc3R5bGUub3JkZXIgPSBvcmRlciArIHBsdXM7XHJcbiAgICAgICAgaWYgKChpICsgMSkgJSAzID09PSAxKSB7XHJcbiAgICAgICAgICBvcmRlciArPSAzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKGkgKyAxKSAlIDMgPT09IDIpIHtcclxuICAgICAgICAgIG9yZGVyIC09IDI7XHJcbiAgICAgICAgfSBlbHNlIGlmICgoaSArIDEpICUgMyA9PT0gMCkge1xyXG4gICAgICAgICAgcm93ID0gMjtcclxuICAgICAgICAgIG9yZGVyID0gNDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAocm93ID09PSAyKSB7XHJcbiAgICAgICAgc2xpZGVzQXJyW2ldLnN0eWxlLm9yZGVyID0gb3JkZXIgKyBwbHVzO1xyXG4gICAgICAgIGlmICgoaSArIDEpICUgMyA9PT0gMSkge1xyXG4gICAgICAgICAgb3JkZXIgLT0gMjtcclxuICAgICAgICB9IGVsc2UgaWYgKChpICsgMSkgJSAzID09PSAyKSB7XHJcbiAgICAgICAgICBvcmRlciArPSAzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKGkgKyAxKSAlIDMgPT09IDApIHtcclxuICAgICAgICAgIHJvdyA9IDE7XHJcbiAgICAgICAgICBvcmRlciA9IDA7XHJcbiAgICAgICAgICBwbHVzICs9IDY7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHggPiA0NjApIHtcclxuICAgICAgc2xpZGVzQXJyWzJdLnN0eWxlLm9yZGVyID0gNDtcclxuICAgICAgc2xpZGVzQXJyWzNdLnN0eWxlLm9yZGVyID0gMTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvY2F0YWxvZy5odG1sJykge1xyXG4gIHNldENhdGFsb2dTbGlkZXNPcmRlcigpO1xyXG59XHJcbiIsImlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvaW5kZXguaHRtbCcpIHtcclxuXHJcbiAgdmFyIHNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9J3RlbCddXCIpO1xyXG4gIHZhciBpbSA9IG5ldyBJbnB1dG1hc2soXCIrNyAoOTk5KSA5OTktOTktOTlcIik7XHJcblxyXG4gIGltLm1hc2soc2VsZWN0b3IpO1xyXG5cclxuICBuZXcgSnVzdFZhbGlkYXRlKCcuY29udGFjdHNfX2Zvcm0nLCB7XHJcbiAgICBydWxlczoge1xyXG4gICAgICBuYW1lOiB7XHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgIG1heExlbmd0aDogMTUsXHJcbiAgICAgIH0sXHJcbiAgICAgIHRlbDoge1xyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIGZ1bmN0aW9uOiAobmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHBob25lID0gc2VsZWN0b3IuaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKVxyXG4gICAgICAgICAgcmV0dXJuIE51bWJlcihwaG9uZSkgJiYgcGhvbmUubGVuZ3RoID09PSAxMFxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbWFpbDoge1xyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIGVtYWlsOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgbWVzc2FnZXM6IHtcclxuICAgICAgbmFtZToge1xyXG4gICAgICAgIHJlcXVpcmVkOiAn0JfQsNC/0L7Qu9C90LjRgtC1INGN0YLQviDQv9C+0LvQtScsXHJcbiAgICAgICAgbWluTGVuZ3RoOiAn0JLQstC10LTQuNGC0LUg0L7RgiAyINC00L4gMTUg0YHQuNC80LLQvtC70L7QsicsXHJcbiAgICAgICAgbWF4TGVuZ3RoOiAn0JLQstC10LTQuNGC0LUg0L7RgiAyINC00L4gMTUg0YHQuNC80LLQvtC70L7QsicsXHJcbiAgICAgIH0sXHJcbiAgICAgIHRlbDoge1xyXG4gICAgICAgIHJlcXVpcmVkOiAn0JfQsNC/0L7Qu9C90LjRgtC1INGN0YLQviDQv9C+0LvQtScsXHJcbiAgICAgICAgZnVuY3Rpb246ICfQktCy0LXQtNC40YLQtSDQv9C+0LvQvdGL0Lkg0L3QvtC80LXRgCdcclxuICAgICAgfSxcclxuICAgICAgbWFpbDoge1xyXG4gICAgICAgIHJlcXVpcmVkOiAn0JfQsNC/0L7Qu9C90LjRgtC1INGN0YLQviDQv9C+0LvQtScsXHJcbiAgICAgICAgZW1haWw6ICfQktCy0LXQtNC40YLQtSDQutC+0YDRgNC10LrRgtC90YvQuSBlLW1haWwnXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgY29sb3JXcm9uZzogJyNGRjY5NzInLFxyXG5cclxuICAgIHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uIChmb3JtLCB2YWx1ZXMsIGFqYXgpIHtcclxuICAgICAgYWpheCh7XHJcbiAgICAgICAgICB1cmw6ICcvbWFpbC5waHAnLFxyXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICBkYXRhOiB2YWx1ZXMsXHJcbiAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICBhbGVydCgn0JLQsNGI0LAg0LfQsNGP0LLQutCwINGD0YHQv9C10YjQvdC+INC+0YLQv9GA0LDQstC70LXQvdCwIScpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KCfQntGI0LjQsdC60LAg0L7RgtC/0YDQsNCy0LrQuCEnKVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuIiwiaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9pbmRleC5odG1sJykge1xyXG4gIHRpcHB5KCcjbXlCdXR0b24xJywge1xyXG4gICAgY29udGVudDogXCLQoNC10L/Qu9C40YbQuNGA0L7QstCw0L3QvdGL0LUg0YEg0LfQsNGA0YPQsdC10LbQvdGL0YUg0LjRgdGC0L7Rh9C90LjQutC+0LIsINC40YHRgdC70LXQtNC+0LLQsNC90LjRjyDRhNC+0YDQvNC40YDRg9GO0YIg0LPQu9C+0LHQsNC70YzQvdGD0Y4g0YHQtdGC0YwuXCIsXHJcbiAgICBtYXhXaWR0aDogMTU3LFxyXG4gICAgdGhlbWU6ICdibGFjaycsXHJcbiAgICBoaWRlT25DbGljazogZmFsc2UsXHJcbiAgICBpbnRlcmFjdGl2ZTogdHJ1ZSxcclxuICAgIGludGVyYWN0aXZlQm9yZGVyOiAyLFxyXG4gICAgaW50ZXJhY3RpdmVEZWJvdW5jZTogMTUwLFxyXG4gIH0pO1xyXG59XHJcbiIsImNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19zZWxlY3QnKTtcclxuY29uc3QgY2hvaWNlcyA9IG5ldyBDaG9pY2VzKGVsZW1lbnQsIHtcclxuICBzZWFyY2hFbmFibGVkOiBmYWxzZSxcclxuICBpdGVtU2VsZWN0VGV4dDogJycsXHJcbiAgc2hvdWxkU29ydDogZmFsc2UsXHJcbn0pO1xyXG5sZXQgYXJpYUxhYmVsID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKTtcclxuZWxlbWVudC5jbG9zZXN0KCcuY2hvaWNlcycpLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGFyaWFMYWJlbCk7XHJcbiIsImxldCBkcm9wZG93bkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXItcmVnaW9uX19idG4nKSxcclxuICAgIGRyb3Bkb3duQnRuVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXItcmVnaW9uLWJ0bl9fdGV4dCcpLFxyXG4gICAgZHJvcGRvd25GbGFnID0gdHJ1ZSxcclxuICAgIGRyb3Bkb3duSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGVhZGVyLXJlZ2lvbi1kcm9wZG93bi1pdGVtX19idG4nKSxcclxuICAgIGRyb3Bkb3duT3BlbiA9IGdzYXAudGltZWxpbmUoe3BhdXNlZDogdHJ1ZX0pO1xyXG5cclxuZHJvcGRvd25PcGVuLnNldChcIi5oZWFkZXItcmVnaW9uX19kcm9wZG93blwiLCB7ZGlzcGxheTogJ2Jsb2NrJ30pXHJcbiAgICAgICAgICAgIC50byhcIi5oZWFkZXItcmVnaW9uX19pY29uX2Fycm93XCIsIHtyb3RhdGU6IDkwLCBkdXJhdGlvbjogLjN9KVxyXG4gICAgICAgICAgICAuZnJvbVRvKFwiLmhlYWRlci1yZWdpb25fX2Ryb3Bkb3duXCIsIHt5OiA1MCwgb3BhY2l0eTogMH0sIHt5OiAwLCBvcGFjaXR5OiAxLyogLCB6SW5kZXg6IDggKi99LCBcIi09MC40XCIpO1xyXG5cclxuZHJvcGRvd25CdG4ub25jbGljayA9ICgpID0+IHtcclxuICBpZiAoZHJvcGRvd25GbGFnID09PSB0cnVlKSB7XHJcbiAgICBldmVudC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hlYWRlci1yZWdpb25fX2J0bl9hY3RpdmUnKTtcclxuICAgIGRyb3Bkb3duT3Blbi5wbGF5KCk7XHJcbiAgICBkcm9wZG93bkZsYWcgPSAhZHJvcGRvd25GbGFnO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBldmVudC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlci1yZWdpb25fX2J0bl9hY3RpdmUnKTtcclxuICAgIGRyb3Bkb3duT3Blbi5yZXZlcnNlKCk7XHJcbiAgICBkcm9wZG93bkZsYWcgPSAhZHJvcGRvd25GbGFnO1xyXG4gIH1cclxufVxyXG5cclxuZHJvcGRvd25JdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gIGl0ZW0ub25jbGljayA9ICgpID0+IHtcclxuICAgIGxldCBjbGlja2VkSW5uZXJUZXh0ID0gZXZlbnQuY3VycmVudFRhcmdldC5pbm5lclRleHQsXHJcbiAgICAgICAgYWN0aXZlSW5uZXJUZXh0ID0gZHJvcGRvd25CdG5UZXh0LmlubmVyVGV4dDtcclxuXHJcbiAgICBkcm9wZG93bkJ0blRleHQuaW5uZXJUZXh0ID0gY2xpY2tlZElubmVyVGV4dDtcclxuICAgIGRyb3Bkb3duQnRuVGV4dC5kYXRhc2V0LnJlZ2lvbiA9IGNsaWNrZWRJbm5lclRleHQ7XHJcbiAgICBldmVudC5jdXJyZW50VGFyZ2V0LmlubmVyVGV4dCA9IGFjdGl2ZUlubmVyVGV4dDtcclxuICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5yZWdpb24gPSBhY3RpdmVJbm5lclRleHQ7XHJcbiAgICBldmVudC5jdXJyZW50VGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGFjdGl2ZUlubmVyVGV4dCk7XHJcbiAgICBkcm9wZG93bkJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoZWFkZXItcmVnaW9uX19idG5fYWN0aXZlJyk7XHJcbiAgICBkcm9wZG93bk9wZW4ucmV2ZXJzZSgpO1xyXG4gICAgZHJvcGRvd25GbGFnID0gIWRyb3Bkb3duRmxhZztcclxuICB9XHJcbn0pXHJcbiIsImNvbnN0IHNpbXBsZUJhciA9IG5ldyBTaW1wbGVCYXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1yZWdpb24tZHJvcGRvd25fX2xpc3QnKSwge1xyXG4gIHNjcm9sbGJhck1pblNpemU6IDIwLFxyXG4gIHNjcm9sbGJhck1heFNpemU6IDI4LFxyXG59KTtcclxuXHJcbiIsImNvbnN0IGhlcm9Td2lwZXIgPSBuZXcgU3dpcGVyKCcuaGVyb19fc3dpcGVyJywge1xyXG4gIC8vIE9wdGlvbmFsIHBhcmFtZXRlcnNcclxuICBsb29wOiB0cnVlLFxyXG5cclxuICAvLyBJZiB3ZSBuZWVkIHBhZ2luYXRpb25cclxuICBwYWdpbmF0aW9uOiB7XHJcbiAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgfSxcclxufSk7XHJcblxyXG4iLCJsZXQgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybV9faW5wdXQnKSxcclxuICAgIHBsYWNlaG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYWNlaG9sZGVyJyk7XHJcblxyXG5pbnB1dC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgaXRlbS5vbmZvY3VzID0gKCkgPT4ge1xyXG4gICAgbGV0IHBhdGggPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQucGF0aDtcclxuICAgIHBsYWNlaG9sZGVyLmZvckVhY2goKGFjdGl2ZSkgPT4ge1xyXG4gICAgICBsZXQgdGFyZ2V0ID0gYWN0aXZlLmRhdGFzZXQudGFyZ2V0LFxyXG4gICAgICAgICAgcGxhY2Vob2xkZXJXaWR0aCA9IGFjdGl2ZS5vZmZzZXRXaWR0aDtcclxuICAgICAgaWYgKHBhdGgubG9jYWxlQ29tcGFyZSh0YXJnZXQpID09PSAwKSB7XHJcbiAgICAgICAgYWN0aXZlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoLSR7cGxhY2Vob2xkZXJXaWR0aCAqIDAuMTh9cHgsIC0xNnB4KSBzY2FsZSg2MCUpYDtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9O1xyXG4gIGl0ZW0ub25ibHVyID0gKCkgPT4gIHtcclxuICAgIGxldCBjdXJUYXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0LFxyXG4gICAgICAgIHBhdGggPSBjdXJUYXJnZXQuZGF0YXNldC5wYXRoO1xyXG4gICAgcGxhY2Vob2xkZXIuZm9yRWFjaCgoYWN0aXZlKSA9PiB7XHJcbiAgICAgIGxldCB0YXJnZXQgPSBhY3RpdmUuZGF0YXNldC50YXJnZXQsXHJcbiAgICAgIHBsYWNlaG9sZGVyV2lkdGggPSBhY3RpdmUub2Zmc2V0V2lkdGg7XHJcbiAgICAgIGlmIChwYXRoLmxvY2FsZUNvbXBhcmUodGFyZ2V0KSA9PT0gMCkge1xyXG4gICAgICAgIGlmIChjdXJUYXJnZXQudmFsdWUgIT09IFwiXCIpIHtcclxuICAgICAgICAgIGFjdGl2ZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKC0ke3BsYWNlaG9sZGVyV2lkdGggKiAwLjE4fXB4LCAtMTZweCkgc2NhbGUoNjAlKWA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFjdGl2ZS5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH07XHJcbn0pXHJcbiIsImlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvcHJvZHVjdC1jYXJkLmh0bWwnKSB7XHJcblxyXG4gIHZhciBzZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPSd0ZWwnXVwiKTtcclxuICB2YXIgaW0gPSBuZXcgSW5wdXRtYXNrKFwiKzcgKDk5OSkgOTk5LTk5LTk5XCIpO1xyXG5cclxuICBpbS5tYXNrKHNlbGVjdG9yKTtcclxuXHJcbiAgbmV3IEp1c3RWYWxpZGF0ZSgnLnByb2R1Y3RfX2Zvcm0nLCB7XHJcbiAgICBydWxlczoge1xyXG4gICAgICBuYW1lOiB7XHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgIG1heExlbmd0aDogMTUsXHJcbiAgICAgIH0sXHJcbiAgICAgIHRlbDoge1xyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIGZ1bmN0aW9uOiAobmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHBob25lID0gc2VsZWN0b3IuaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKVxyXG4gICAgICAgICAgcmV0dXJuIE51bWJlcihwaG9uZSkgJiYgcGhvbmUubGVuZ3RoID09PSAxMFxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBtZXNzYWdlczoge1xyXG4gICAgICBuYW1lOiB7XHJcbiAgICAgICAgcmVxdWlyZWQ6ICfQl9Cw0L/QvtC70L3QuNGC0LUg0Y3RgtC+INC/0L7Qu9C1JyxcclxuICAgICAgICBtaW5MZW5ndGg6ICfQktCy0LXQtNC40YLQtSDQvtGCIDIg0LTQviAxNSDRgdC40LzQstC+0LvQvtCyJyxcclxuICAgICAgICBtYXhMZW5ndGg6ICfQktCy0LXQtNC40YLQtSDQvtGCIDIg0LTQviAxNSDRgdC40LzQstC+0LvQvtCyJyxcclxuICAgICAgfSxcclxuICAgICAgdGVsOiB7XHJcbiAgICAgICAgcmVxdWlyZWQ6ICfQl9Cw0L/QvtC70L3QuNGC0LUg0Y3RgtC+INC/0L7Qu9C1JyxcclxuICAgICAgICBmdW5jdGlvbjogJ9CS0LLQtdC00LjRgtC1INC/0L7Qu9C90YvQuSDQvdC+0LzQtdGAJ1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNvbG9yV3Jvbmc6ICcjRkY2OTcyJyxcclxuXHJcbiAgICBzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbiAoZm9ybSwgdmFsdWVzLCBhamF4KSB7XHJcbiAgICAgIGFqYXgoe1xyXG4gICAgICAgICAgdXJsOiAnL21haWwucGhwJyxcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgZGF0YTogdmFsdWVzLFxyXG4gICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19mb3JtJykuY2xhc3NMaXN0LnJlbW92ZSgncHJvZHVjdF9fbW9kYWxfZGlzcGxheScpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9fZm9ybScpLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2R1Y3RfX21vZGFsX3Zpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19zdWNjZXNzJykuY2xhc3NMaXN0LmFkZCgncHJvZHVjdF9fbW9kYWxfZGlzcGxheScpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9fc3VjY2VzcycpLmNsYXNzTGlzdC5hZGQoJ3Byb2R1Y3RfX21vZGFsX3Zpc2libGUnKTtcclxuICAgICAgICAgICAgfSwgMjAwKVxyXG4gICAgICAgICAgICBwcm9kdWN0QnRuT3Blbi5zY3JvbGxJbnRvVmlldyh7YmxvY2s6IFwiY2VudGVyXCIsIGJlaGF2aW9yOiBcInNtb290aFwifSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgIGFsZXJ0KCfQntGI0LjQsdC60LAg0L7RgtC/0YDQsNCy0LrQuCEnKVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuIiwiaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9wcm9kdWN0LWNhcmQuaHRtbCcpIHtcclxuICBsZXQgcHJvZHVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9fZm9ybScpLFxyXG4gICAgICBwcm9kdWN0QnRuT3BlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LWJ1eV9fYnRuX2J1eScpLFxyXG4gICAgICBwcm9kdWN0QnRuQ2xvc2VBcnIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1tb2RhbF9fYnRuLWNsb3NlJyk7XHJcblxyXG4gIHByb2R1Y3RCdG5PcGVuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ25vLXNjcm9sbCcpO1xyXG4gICAgcHJvZHVjdEZvcm0uY2xhc3NMaXN0LmFkZCgncHJvZHVjdF9fbW9kYWxfZGlzcGxheScpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHByb2R1Y3RGb3JtLmNsYXNzTGlzdC5hZGQoJ3Byb2R1Y3RfX21vZGFsX3Zpc2libGUnKTtcclxuICAgIH0sIDIwMClcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LWZvcm1fX2lucHV0Jykuc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiBcImNlbnRlclwiLCBiZWhhdmlvcjogXCJzbW9vdGhcIn0pO1xyXG4gIH1cclxuXHJcbiAgcHJvZHVjdEJ0bkNsb3NlQXJyLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpdGVtLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGxldCBkYXRhQ2xvc2UgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY2xvc2U7XHJcblxyXG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXNjcm9sbCcpO1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucHJvZHVjdF9fJHtkYXRhQ2xvc2V9YCkuY2xhc3NMaXN0LnJlbW92ZSgncHJvZHVjdF9fbW9kYWxfdmlzaWJsZScpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucHJvZHVjdF9fJHtkYXRhQ2xvc2V9YCkuY2xhc3NMaXN0LnJlbW92ZSgncHJvZHVjdF9fbW9kYWxfZGlzcGxheScpO1xyXG4gICAgICB9LCAyMDApXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG4iLCJpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnL3Byb2R1Y3QtY2FyZC5odG1sJykge1xyXG4gIGNvbnN0IHByb2R1Y3RTaW1wbGVCYXIgPSBuZXcgU2ltcGxlQmFyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19wcmV2aWV3JyksIHtcclxuICAgIHNjcm9sbGJhck1pblNpemU6IDIwLFxyXG4gICAgc2Nyb2xsYmFyTWF4U2l6ZTogMjgsXHJcbiAgfSk7XHJcbn1cclxuIiwiaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9wcm9kdWN0LWNhcmQuaHRtbCcpIHtcclxuICBsZXQgcHJvZHVjdEJpZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19iaWcnKSxcclxuICAgICAgcHJvZHVjdFNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19zbGlkZXInKSxcclxuICAgICAgcHJvZHVjdFByZXZpZXdBcnIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1wcmV2aWV3X19pbWcnKSxcclxuICAgICAgcHJvZHVjdEJpZ0ltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LWJpZ19faW1nJyksXHJcbiAgICAgIHByb2R1Y3RCaWdTcmMgPSBwcm9kdWN0QmlnSW1nLmdldEF0dHJpYnV0ZSgnc3JjJyksXHJcbiAgICAgIHByb2R1Y3RTbGlkZXJQcmV2aWV3QXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3Qtc2xpZGVyX19pbWdfcHJldmlldycpLFxyXG4gICAgICBwcm9kdWN0U2xpZGVyQmlnSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3Qtc2xpZGVyLWJpZ19faW1nJyksXHJcbiAgICAgIHByb2R1Y3RTbGlkZXJCaWdTcmMgPSBwcm9kdWN0QmlnSW1nLmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcblxyXG4gIHByb2R1Y3RCaWcub25jbGljayA9ICgpID0+IHtcclxuICAgIHByb2R1Y3RTbGlkZXJCaWdJbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBwcm9kdWN0U2xpZGVyQmlnU3JjKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbm8tc2Nyb2xsJyk7XHJcbiAgICBwcm9kdWN0U2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3Byb2R1Y3RfX21vZGFsX2Rpc3BsYXknKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBwcm9kdWN0U2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3Byb2R1Y3RfX21vZGFsX3Zpc2libGUnKTtcclxuICAgIH0sIDIwMClcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXNsaWRlcl9fYmlnJykuc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiBcImNlbnRlclwiLCBiZWhhdmlvcjogXCJzbW9vdGhcIn0pO1xyXG4gIH1cclxuXHJcbiAgcHJvZHVjdFByZXZpZXdBcnIuZm9yRWFjaChpdGVtID0+IHtcclxuICAgIGl0ZW0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgbGV0IHNyYyA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5zcmM7XHJcbiAgICAgIGlmIChwcm9kdWN0QmlnSW1nLmdldEF0dHJpYnV0ZSgnc3JjJykgPT09IHNyYykge1xyXG4gICAgICAgIHByb2R1Y3RCaWdJbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBwcm9kdWN0QmlnU3JjKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9kdWN0QmlnSW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIHByb2R1Y3RTbGlkZXJQcmV2aWV3QXJyLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpdGVtLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGxldCBzcmMgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuc3JjO1xyXG4gICAgICBpZiAocHJvZHVjdFNsaWRlckJpZ0ltZy5nZXRBdHRyaWJ1dGUoJ3NyYycpID09PSBzcmMpIHtcclxuICAgICAgICBwcm9kdWN0U2xpZGVyQmlnSW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgcHJvZHVjdFNsaWRlckJpZ1NyYyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJvZHVjdFNsaWRlckJpZ0ltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcbiIsImNvbnN0IHByb2R1Y3RTd2lwZXIgPSBuZXcgU3dpcGVyKCcucHJvZHVjdC1zbGlkZXJfX3N3aXBlcicsIHtcclxuICBzcGFjZUJldHdlZW46IDYzLFxyXG4gIHNsaWRlc1Blckdyb3VwOiAxLFxyXG4gIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgYnJlYWtwb2ludHM6IHtcclxuICAgIDU4MToge1xyXG4gICAgICBzcGFjZUJldHdlZW46IDc4LFxyXG4gICAgICBzbGlkZXNQZXJHcm91cDogMSxcclxuICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgIH0sXHJcbiAgICAxMDIzOiB7XHJcbiAgICAgIHNwYWNlQmV0d2VlbjogNzgsXHJcbiAgICAgIHNsaWRlc1Blckdyb3VwOiAzLFxyXG4gICAgICBzbGlkZXNQZXJWaWV3OiAzLFxyXG4gICAgfSxcclxuICAgIDEyMDE6IHtcclxuICAgICAgc3BhY2VCZXR3ZWVuOiA3OCxcclxuICAgICAgc2xpZGVzUGVyR3JvdXA6IDQsXHJcbiAgICAgIHNsaWRlc1BlclZpZXc6IDQsXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbmF2aWdhdGlvbjoge1xyXG4gICAgbmV4dEVsOiAnLnByb2R1Y3Qtc2xpZGVyX19idG5fbmV4dCcsXHJcbiAgICBwcmV2RWw6ICcucHJvZHVjdC1zbGlkZXJfX2J0bl9wcmV2JyxcclxuICB9XHJcbn0pO1xyXG5cclxuXHJcbiIsImlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvaW5kZXguaHRtbCcpIHtcclxuICBsZXQgcmF0aW5nQnRuU2hvd01vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmF0aW5nX19idG5fbW9yZScpLFxyXG4gICAgICByYXRpbmdDYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yYXRpbmdfX2l0ZW0nKTtcclxuXHJcbiAgcmF0aW5nQnRuU2hvd01vcmUub25jbGljayA9ICgpID0+IHtcclxuICAgIHJhdGluZ0J0blNob3dNb3JlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICByYXRpbmdDYXJkcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIiwiY29uc3Qgc2ltaWxhclN3aXBlciA9IG5ldyBTd2lwZXIoJy5zaW1pbGFyX19zd2lwZXInLCB7XHJcbiAgc3BhY2VCZXR3ZWVuOiAxNixcclxuICBzbGlkZXNQZXJHcm91cDogMixcclxuICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gIGJyZWFrcG9pbnRzOiB7XHJcbiAgICA0NjE6IHtcclxuICAgICAgc3BhY2VCZXR3ZWVuOiAzMixcclxuICAgICAgc2xpZGVzUGVyR3JvdXA6IDIsXHJcbiAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICB9LFxyXG4gICAgMTAyMzoge1xyXG4gICAgICBzcGFjZUJldHdlZW46IDMyLFxyXG4gICAgICBzbGlkZXNQZXJHcm91cDogMyxcclxuICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgIH0sXHJcbiAgICAxMjAwOiB7XHJcbiAgICAgIHNwYWNlQmV0d2VlbjogMzIsXHJcbiAgICAgIHNsaWRlc1Blckdyb3VwOiA0LFxyXG4gICAgICBzbGlkZXNQZXJWaWV3OiA0LFxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG5hdmlnYXRpb246IHtcclxuICAgIG5leHRFbDogJy5zaW1pbGFyX19idG5fbmV4dCcsXHJcbiAgICBwcmV2RWw6ICcuc2ltaWxhcl9fYnRuX3ByZXYnLFxyXG4gIH1cclxufSk7XHJcbiIsImNvbnN0IHNwZWNpYWxzU3dpcGVyID0gbmV3IFN3aXBlcignLnNwZWNpYWxfX3N3aXBlcicsIHtcclxuICAvLyBPcHRpb25hbCBwYXJhbWV0ZXJzXHJcbiAgc2xpZGVzUGVyVmlldzogMSxcclxuICBzbGlkZXNQZXJHcm91cDogMSxcclxuICBzcGFjZUJldHdlZW46IDMyLFxyXG4gIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICBicmVha3BvaW50czoge1xyXG4gICAgNTgxOiB7XHJcbiAgICAgIHNsaWRlc1Blckdyb3VwOiAyLFxyXG4gICAgfSxcclxuICAgIDEwMjQ6IHtcclxuICAgICAgc2xpZGVzUGVyR3JvdXA6IDMsXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbmF2aWdhdGlvbjoge1xyXG4gICAgbmV4dEVsOiAnLnNwZWNpYWxfX2J0bl9uZXh0JyxcclxuICAgIHByZXZFbDogJy5zcGVjaWFsX19idG5fcHJldicsXHJcbiAgfVxyXG59KTtcclxuIiwiY29uc3QgdXNlZnVsU3dpcGVyID0gbmV3IFN3aXBlcignLnVzZWZ1bF9fc3dpcGVyJywge1xyXG4gIC8vIE9wdGlvbmFsIHBhcmFtZXRlcnNcclxuICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gIHNsaWRlc1Blckdyb3VwOiAxLFxyXG4gIHNwYWNlQmV0d2VlbjogMzIsXHJcbiAgYnJlYWtwb2ludHM6IHtcclxuICAgIDU4MToge1xyXG4gICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICBzbGlkZXNQZXJHcm91cDogMixcclxuICAgIH0sXHJcbiAgICAxMDI0OiB7XHJcbiAgICAgIHNsaWRlc1BlclZpZXc6IDMsXHJcbiAgICAgIHNsaWRlc1Blckdyb3VwOiAzLFxyXG4gICAgfSxcclxuICAgIDEyMDA6IHtcclxuICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgc2xpZGVzUGVyR3JvdXA6IDIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIG5hdmlnYXRpb246IHtcclxuICAgIG5leHRFbDogJy51c2VmdWxfX2J0bl9uZXh0JyxcclxuICAgIHByZXZFbDogJy51c2VmdWxfX2J0bl9wcmV2JyxcclxuICB9XHJcbn0pO1xyXG4iXX0=
