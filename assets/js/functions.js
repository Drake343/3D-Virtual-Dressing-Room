"use strict"; //Change demo images

function changeDemoImages() {
  $('*[data-demo-src]').each(function () {
    var newSrc = $(this).attr('data-demo-src');
    $(this).attr('src', newSrc);
  });
  $('*[data-demo-background]').each(function () {
    var newBg = $(this).attr('data-demo-background');
    $(this).attr('data-background', newBg);
  });
} //Helper to get query string parameters from Url


$.urlParam = function (name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);

  if (results == null) {
    return null;
  }

  return decodeURI(results[1]) || 0;
}; //Init pageloader


function initPageloader() {
  if ($('.pageloader').length) {
    $('.pageloader').toggleClass('is-active');
    $(window).on('load', function () {
      setTimeout(function () {
        $('.pageloader').toggleClass('is-active');
        $('.infraloader').removeClass('is-active');
      }, 700);
    });
  }
} //Init navbar burger


function initNavbarBurger() {
  if ($('.navbar-burger').length) {
    $('.navbar-burger').on("click", function () {
      $(this).toggleClass('is-active');

      if ($('.navbar-menu').hasClass('is-active')) {
        $('.navbar-menu').removeClass('is-active');
      } else {
        $('.navbar-menu').addClass('is-active');
      }
    });
  }
} //Full screen slider


function initFullscreenSlider() {
  if ($('.slider-wrapper').length) {
    $('.fullscreen-slick').slick({
      dots: true,
      infinite: true,
      speed: 500,
      cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: false
    });
  }
} //Init shop sidebar


function initShopSidebar() {
  $('#open-shop').on('click', function () {
    if ($('.cart-quickview, .filters-quickview').hasClass('is-active')) {
      $('.cart-quickview, .filters-quickview').removeClass('is-active');
    }

    if ($('.menu-fab').hasClass('dismissed')) {
      $('.menu-fab').removeClass('dismissed');
    }

    $('.shop-quickview').toggleClass('is-active');
  }); //close shop sidebar

  $('#close-shop-sidebar').on('click', function () {
    $('.shop-quickview, #open-shop').toggleClass('is-active');
  });
} //Init product links (dynamic product details rendering)


function initProductDetailsLinks() {
  $('.product-details-link').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var productId = $this.closest('.product-container, .featured-product').attr('data-product-id');
    var baseUrl = '/product.html';
    var productUrl = baseUrl + "?productId=" + productId;
    console.log(productUrl);
    window.location.href = productUrl;
  });
} //Init order details links (dynamic order details rendering)


function initOrderDetailsLinks() {
  $('.order-details-link').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var orderId = $this.closest('.order-card, .order-long-card').attr('data-order-id');
    var baseUrl = '/order.html';
    var orderUrl = baseUrl + "?orderId=" + orderId;
    console.log(orderUrl);
    window.location.href = orderUrl;
  });
} //Init cart sidebar


function initCartSidebar() {
  //Open
  $('#open-cart').on('click', function () {
    if ($('.shop-quickview, .filters-quickview').hasClass('is-active')) {
      $('.shop-quickview, .filters-quickview').removeClass('is-active');
    }

    if (!$('.menu-fab').hasClass('dismissed')) {
      $('.menu-fab').addClass('dismissed');
    }

    if ($('.cart-quickview').hasClass('is-active')) {
      setTimeout(function () {
        $('.cart-loader').addClass('is-active');
      }, 800);
    } else {
      setTimeout(function () {
        $('.cart-loader').removeClass('is-active');
      }, 800);
    }

    $('.cart-quickview').toggleClass('is-active');
  }); //Close

  $('#close-cart-sidebar').on('click', function () {
    $('.menu-fab').removeClass('dismissed');
    $('.cart-quickview, #open-cart').toggleClass('is-active');
    setTimeout(function () {
      $('.cart-loader').addClass('is-active');
    }, 800);
  });
} //Init filters sidebar


function initFilterSidebar() {
  //Open
  $('#open-filters').on('click', function () {
    if ($('.shop-quickview, .cart-quickview').hasClass('is-active')) {
      $('.shop-quickview, .cart-quickview').removeClass('is-active');
    }

    if (!$('.menu-fab').hasClass('dismissed')) {
      $('.menu-fab').addClass('dismissed');
    }

    $('.filters-quickview').toggleClass('is-active');
  }); //close

  $('#close-filters-sidebar').on('click', function () {
    $('.menu-fab').removeClass('dismissed');
    $('.filters-quickview, #open-filters').toggleClass('is-active');
  }); //Range slider filter

  if ($('.price-range-wrapper').length) {
    var range = $('.input-range'),
        value = $('.range-value');
    value.html('$0' + ' ' + '-' + ' ' + '$' + range.attr('value'));
    range.on('input', function () {
      value.html('$0' + ' ' + '-' + ' ' + '$' + this.value);
    });
  }
} //Init Global Search


function initGlobalSearch() {
  //Open search
  $('#open-search').on('click', function () {
    $('.search-overlay').toggleClass('is-active');
    $(this).addClass('is-opened is-hidden');
    $('#close-search').removeClass('is-hidden');
    setTimeout(function () {
      $('#close-search').removeClass('is-inactive');
    }, 50);
    $('.search-input-wrapper').removeClass('is-hidden');
    setTimeout(function () {
      $('.search-input-wrapper .field').addClass('is-active');
      $('#nephos-search').focus();
    }, 300);
  }); //Close search

  $('#close-search').on('click', function () {
    $('.search-overlay').toggleClass('is-active');
    $(this).addClass('is-inactive is-hidden');
    $('#open-search').removeClass('is-hidden');
    setTimeout(function () {
      $('#open-search').removeClass('is-opened');
    }, 50);
    $('.search-input-wrapper .field').removeClass('is-active');
    setTimeout(function () {
      $('.search-input-wrapper').addClass('is-hidden');
    }, 150);
  });
  $('#nephos-search').on('focus blur input', function (e) {
    if ($(this).val() === '') {
      $('.search-input-wrapper .bar, #clear-search').removeClass('is-active');
    } else {
      $('.search-input-wrapper .bar, #clear-search').addClass('is-active');
    }
  }); //Clear search

  $('#clear-search').on('click', function () {
    $('#nephos-search').val('');
    $('.search-input-wrapper .bar, #clear-search').removeClass('is-active');
  });
} //Init category sidebar


function initCategoriesSidebar() {
  //Sidebar button
  $('.hamburger-btn').on('click', function () {
    $('.menu-toggle .icon-box-toggle').toggleClass('active');
    $('.category-quickview').toggleClass('is-active');
  }); //sidebar behaviour

  $('.icon-menu li a').on('click', function () {
    $('.icon-menu li a.is-active').removeClass('is-active');
    $(this).addClass('is-active');
  });
} //Init Product details carousel


function initProductCarousel() {
  if ($('.is-carousel').length) {
    $('.is-carousel').slick({
      dots: true,
      infinite: true,
      speed: 500,
      cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
      arrows: false
    });
  }
} //Init various actions (to rework)


function initCardActions() {} //Init JS injected background images


function initBackgroundImages() {
  $(".has-background-image").each(function () {
    var bgImage = $(this).attr('data-background');

    if (bgImage !== undefined) {
      $(this).css('background-image', 'url(' + bgImage + ')');
    }
  });
} //Init Dropdowns


function initDropdowns() {
  $('.dropdown-trigger').on('click', function (event) {
    event.stopPropagation();
    $('.dropdown').removeClass('is-active');
    $(this).closest('.dropdown').addClass('is-active');
  }); //Close pop dropdowns on click outside

  $(window).on('click', function (event) {
    if ($('.dropdown').hasClass('is-active')) {
      $('.dropdown').removeClass('is-active');
    }
  });
} //Init Tabs


function initTabs() {
  $('.tabs li').on('click', function () {
    var tab_id = $(this).attr('data-tab');
    $(this).siblings('li').removeClass('is-active');
    $(this).closest('.tabs-wrapper').children('.navtab-content').removeClass('is-active');
    $(this).addClass('is-active');
    $("#" + tab_id).addClass('is-active');
  });
} //Init modals


function initModals() {
  $('.modal-trigger').on('click', function () {
    var modalID = $(this).attr('data-modal');
    $('#' + modalID).toggleClass('is-active').find('.box').addClass('scaleIn');
  });
  $('.modal-delete').on('click', function () {
    $(this).closest('.modal').removeClass('is-active');
  });
} //Init chosen select


function initChosenSelects() {
  if ($('.chosen-select-no-single').length) {
    //Chosen
    var config = {
      '.chosen-select': {
        disable_search_threshold: 10,
        width: "100%"
      },
      '.chosen-select-deselect': {
        allow_single_deselect: true,
        width: "100%"
      },
      '.chosen-select-no-single': {
        disable_search_threshold: 100,
        width: "100%"
      },
      '.chosen-select-no-single.no-search': {
        disable_search_threshold: 10,
        width: "100%"
      },
      '.chosen-select-no-results': {
        no_results_text: 'Oops, nothing found!'
      },
      '.chosen-select-width': {
        width: "95%"
      }
    };

    for (var selector in config) {
      if (config.hasOwnProperty(selector)) {
        $(selector).chosen(config[selector]);
      }
    }
  } //Chosen select init


  if ($('.chosen-select').length) {
    $(".chosen-select").chosen({
      disable_search_threshold: 6,
      width: '100%'
    });
  }
} //Init file inputs


function initFileInputs() {
  var inputs = document.querySelectorAll('.inputfile');
  Array.prototype.forEach.call(inputs, function (input) {
    var label = input.nextElementSibling,
        labelVal = label.innerHTML; //listen to changes

    input.addEventListener('change', function (e) {
      var fileName = '';
      if (this.files && this.files.length > 1) fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);else fileName = e.target.value.split('\\').pop();
      if (fileName) label.querySelector('span').innerHTML = fileName;else label.innerHTML = labelVal;
    });
  });
  var inputField = document.querySelectorAll('.field-input');

  for (var i = 0, len = inputField.length; i < len; i++) {
    customInput(inputField[i]);
  } //Create custom input


  function customInput(el) {
    var fileInput = el.querySelector('[type="file"]');
    var label = el.querySelector('[data-js-label]');

    fileInput.onchange = fileInput.onmouseout = function () {
      if (!fileInput.value) return;
      var value = fileInput.value.replace(/^.*[\\\/]/, '');
      el.className += ' -chosen';
      label.innerText = value;
    };
  }
} //Init popovers


function initPopovers() {
  if ($('.has-popover-top').length) {
    $('.has-popover-top').webuiPopover({
      trigger: 'hover',
      placement: 'top',
      width: 280,
      animation: 'pop'
    });
  }

  if ($('.has-simple-popover').length) {
    $('.has-simple-popover').webuiPopover({
      trigger: 'hover',
      animation: 'pop'
    });
  }
} //Destroy popovers


function destroyPopovers() {
  $('.popover-removed').webuiPopover('destroy');
} //Init animated checkboxes


function initAnimatedCheckboxes() {
  $('.animated-checkbox input').on('change', function () {
    var $this = $(this);

    if ($this.closest('.animated-checkbox').hasClass('is-checked')) {
      $this.closest('.animated-checkbox').addClass('is-unchecked').removeClass('is-checked');
      setTimeout(function () {
        $this.closest('.animated-checkbox').find('.shadow-circle').removeClass('is-opaque');
      }, 600);
    } else {
      $this.closest('.animated-checkbox').find('.shadow-circle').addClass('is-opaque');
      $this.closest('.animated-checkbox').addClass('is-checked');
      setTimeout(function () {
        $this.closest('.animated-checkbox').removeClass('is-unchecked'); //$this.closest('.animated-checkbox').find('.shadow-circle').removeClass('is-opaque');
      }, 600);
    }
  });
} //Check viewport size


function mobileTrue() {
  if (window.matchMedia('(max-width: 767px)').matches) {
    return true;
  } else {
    return false;
  }
} //Optimize popovers based on screen width


function opitimizePopovers() {
  if (window.matchMedia('(max-width: 767px)').matches) {
    $('.has-simple-popover').removeClass('has-simple-popover').addClass('popover-removed');
  } else {
    $('.popover-removed').addClass('has-simple-popover').removeClass('popover-removed');
  }

  $(window).on('resize', function () {
    if (window.matchMedia('(max-width: 767px)').matches) {
      $('.has-simple-popover').removeClass('has-simple-popover').addClass('popover-removed');
    } else {
      $('.popover-removed').addClass('has-simple-popover').removeClass('popover-removed');
    }
  }); //Popover query (for complex popovers)

  if (window.matchMedia('(max-width: 767px)').matches) {
    $('.has-popover-top').removeClass('has-popover-top').addClass('popover-removed');
  } else {
    $('.popover-complex-removed').addClass('has-popover-top').removeClass('popover-complex-removed');
  }

  $(window).on('resize', function () {
    if (window.matchMedia('(max-width: 767px)').matches) {
      $('.has-popover-top').removeClass('has-popover-top').addClass('popover-removed');
    } else {
      $('.popover-complex-removed').addClass('has-popover-top').removeClass('popover-complex-removed');
    }
  });
} //Init mobile mode


function initMobileMode() {
  if ($('#mobile-mode, #sidebar-mode').length) {
    //mobile mode
    $('#mobile-mode, #sidebar-mode').on('click', function () {
      $('.icon-menu li a.is-active').removeClass('is-active');
      $('.mobile-navbar').toggleClass('is-active'); //$('.shop-wrapper').toggleClass('is-mobile-mode');

      $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').toggleClass('is-pushed-mobile');
      $('.pageloader, .infraloader').toggleClass('is-full');
      setTimeout(function () {
        $('.shop-quickview').addClass('is-active');
      }, 200);
    });
    $('#fold-link').on('click', function () {
      $('.icon-menu li a.is-active').removeClass('is-active');
      $('.mobile-navbar').toggleClass('is-active');
      $('.shop-quickview, .cart-quickview, .filters-quickview').removeClass('is-active');
      $('.pageloader, .infraloader').toggleClass('is-full');
      setTimeout(function () {
        $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').toggleClass('is-pushed-mobile');
      }, 200);
    });

    if (window.matchMedia('(max-width: 768px)').matches) {
      $('.mobile-navbar').addClass('is-active'); //$('.shop-wrapper').addClass('is-mobile-mode');

      $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').addClass('is-pushed-mobile');
      $('.pageloader, .infraloader').addClass('is-full');
    } else {
      $('.mobile-navbar').removeClass('is-active');
      $('.shop-wrapper').removeClass('is-mobile-mode');
      $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').removeClass('is-pushed-mobile');
      $('.pageloader, .infraloader').removeClass('is-full');
    } //resize handler


    $(window).on('resize', function () {
      if (window.matchMedia('(max-width: 768px)').matches) {
        $('.mobile-navbar').addClass('is-active'); //$('.shop-wrapper').addClass('is-mobile-mode');

        $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').addClass('is-pushed-mobile');
        $('.pageloader, .infraloader').addClass('is-full');
      } else {
        $('.mobile-navbar').removeClass('is-active'); //$('.shop-wrapper').removeClass('is-mobile-mode');

        $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').removeClass('is-pushed-mobile');
        $('.pageloader, .infraloader').removeClass('is-full');
      }
    });
  }
} //Init animated Pop buttons


function initPopButtons() {
  var rn = function rn(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  };

  $('.pop-button').each(function () {
    var $this = $(this);
    var template = "\n            <div class=\"p1\"></div>\n            <div class=\"p2\"></div>\n            <div class=\"p3\"></div>\n            <div class=\"p4\"></div>\n            <div class=\"p5\"></div>\n            <div class=\"p6\"></div>\n            <div class=\"p7\"></div>\n        ";
    $this.append(template);
    $this.on('mousedown', function () {
      var $this = $(this);
      var p1 = $this.find(".p1");
      var p2 = $this.find(".p2");
      var p3 = $this.find(".p3");
      var p4 = $this.find(".p4");
      var p5 = $this.find(".p5");
      var p6 = $this.find(".p6");
      var p7 = $this.find(".p7");
      p1.animate({
        left: rn(100, 200),
        top: rn(40, 120),
        opacity: "0"
      }, 850, "swing", function () {
        $(this).css({
          left: "50%",
          top: "50%",
          opacity: "1"
        });
      });
      p2.animate({
        left: rn(-10, 40),
        top: rn(40, 150),
        opacity: "0"
      }, 850, "swing", function () {
        $(this).css({
          left: "50%",
          top: "50%",
          opacity: "1"
        });
      });
      p3.animate({
        left: rn(40, 105),
        top: rn(90, 156),
        opacity: "0"
      }, 850, "swing", function () {
        $(this).css({
          left: "50%",
          top: "50%",
          opacity: "1"
        });
      });
      p4.animate({
        left: rn(30, 100),
        top: rn(-10, -65),
        opacity: "0"
      }, 850, "swing", function () {
        $(this).css({
          left: "50%",
          top: "50%",
          opacity: "1"
        });
      });
      p5.animate({
        left: rn(-10, -55),
        top: rn(-10, -45),
        opacity: "0"
      }, 850, "swing", function () {
        $(this).css({
          left: "50%",
          top: "50%",
          opacity: "1"
        });
      });
      p6.animate({
        left: rn(130, 220),
        top: rn(10, -25),
        opacity: "0"
      }, 850, "swing", function () {
        $(this).css({
          left: "50%",
          top: "50%",
          opacity: "1"
        });
      });
      p7.animate({
        left: rn(-10, 30),
        top: rn(-130, -60),
        opacity: "0"
      }, 850, "swing", function () {
        $(this).css({
          left: "50%",
          top: "50%",
          opacity: "1"
        });
      });
    });
  });
} //Closable message


function initClosableMessage() {
  $('.message .close-icon').on('click', function () {
    $(this).closest('.message').addClass('is-hidden');
  });
} //Launch a confirm dialog


function launchAlert(title, message, okLabel, cancelLabel, callback) {
  alertify.confirm('confirm').set({
    transition: 'fade',
    title: title,
    message: message,
    labels: {
      ok: okLabel,
      cancel: cancelLabel
    },
    reverseButtons: true,
    'onok': callback
  }).show();
} //Toast Service


var toasts = {};
toasts.service = {
  info: function info(title, icon, message, position, t) {
    iziToast.show({
      class: 'toast',
      icon: icon,
      title: title,
      message: message,
      titleColor: '#fff',
      messageColor: '#fff',
      iconColor: "#fff",
      backgroundColor: '#0023ff',
      progressBarColor: '#bc7aff',
      position: position,
      transitionIn: 'fadeInDown',
      close: false,
      timeout: t,
      zindex: 99999
    });
  },
  success: function success(title, icon, message, position, t) {
    iziToast.show({
      class: 'toast',
      icon: icon,
      title: title,
      message: message,
      titleColor: '#fff',
      messageColor: '#fff',
      iconColor: "#fff",
      backgroundColor: '#0023ff',
      progressBarColor: '#fafafa',
      position: position,
      transitionIn: 'fadeInDown',
      close: false,
      timeout: t,
      zindex: 99999
    });
  },
  error: function error(title, icon, message, position, t) {
    iziToast.show({
      class: 'toast',
      icon: icon,
      title: title,
      message: message,
      titleColor: '#fff',
      messageColor: '#fff',
      iconColor: "#fff",
      backgroundColor: '#344258',
      progressBarColor: '#fff',
      position: position,
      transitionIn: 'fadeInDown',
      close: false,
      timeout: t,
      zindex: 99999
    });
  }
};

function once(fn, context) {
  var result;
  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }

    return result;
  };
}