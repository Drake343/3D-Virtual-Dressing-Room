"use strict"; //Empty cart object initialization

var cart = {}; //Populate default cart object

cart.items = 0;
cart.total = 0.00;
cart.products = []; //If user cart is null

if (JSON.parse(localStorage.getItem('cart')) === null) {
  localStorage.setItem('cart', JSON.stringify(cart));
} //Init cart sidebar spinners


function initSpinners() {
  $('.sidebar-spinner').spinner('changing', function (e, newVal, oldVal) {
    var $this = $(this);
    $this.closest('.quantity').find('.spinner-value').html(newVal);
    $this.closest('li').find('.item-price span').html(newVal);
    $('.cart-quickview .view-cart-button').addClass('is-hidden');
    $('.cart-quickview .update-cart-button').removeClass('is-hidden');
  });
} //Init cart page spinners


function initCartSpinners() {
  $('.main-cart-spinner').spinner('changing', function (e, newVal, oldVal) {
    var $this = $(this);
    $this.closest('li').find('.spinner-value').html(newVal);
    $('#init-checkout').addClass('is-hidden');
    $('#update-cart-page').removeClass('is-hidden');
  });
} //Update cart sidebar (when products are added, updated or removed)


function updateCartSidebar() {
  var cartObject = {};
  var productsCount = $('.cart-quickview .product-container').length;
  cartObject.products = [];
  cartObject.items = productsCount;
  $('.cart-quickview .product-container').each(function () {
    var $this = $(this);
    var productId = parseInt($this.attr('data-product-id'));
    var productName = $this.find('.item-name').text();
    var productPrice = parseFloat($this.find('.item-price').text());
    var productQuantity = parseInt($this.find('.quantity input').val());
    var productImage = $this.find('img').attr('src');
    cartObject.products.push({
      id: productId,
      name: productName,
      quantity: productQuantity,
      price: productPrice,
      images: [{
        url: productImage
      }]
    });
  });
  localStorage.setItem('cart', JSON.stringify(cartObject));
  console.log(cartObject);
} //Reusable add to cart function


function addToCart(trigger) {
  var data = JSON.parse(localStorage.getItem('cart'));
  var $container = trigger.closest('.product-container');
  var productId = parseInt($container.attr('data-product-id'));
  var productName = $container.find('.product-name').text();
  var productCategory = $container.attr('data-product-category');
  var productPrice = parseFloat($container.find('.product-price span:first-child').text());
  var productImage = $container.find('img').attr('src');
  var productQuantity = 1;
  var found = data.products.some(function (el) {
    return parseInt(el.id) === productId;
  });

  if (!found) {
    console.log('Product does not exist in cart');
    data.items = parseInt(data.items) + 1;
    data.products.push({
      id: productId,
      name: productName,
      quantity: productQuantity,
      category: productCategory,
      price: productPrice,
      images: [{
        url: productImage
      }]
    });
    localStorage.setItem('cart', JSON.stringify(data));
  } else {
    console.log('Product exists in cart');

    for (var i = 0; i < data.products.length; i++) {
      if (parseInt(data.products[i].id) === productId) {
        data.products[i].quantity = parseInt(data.products[i].quantity + 1);
        localStorage.setItem('cart', JSON.stringify(data));
      }
    }
  }
} //Get shopping cart sidebar


function getCart() {
  var plusIcon = feather.icons.plus.toSvg();
  var minusIcon = feather.icons.minus.toSvg();
  var closeIcon = feather.icons.x.toSvg();
  var data = JSON.parse(localStorage.getItem('cart'));
  var cartTotal = 0.00; //Populate cart sidebar

  $('.cart-loader').addClass('is-active');
  $('.cart-quickview .cart-body ul').empty();

  if (data.products.length > 0) {
    $('.cart-quickview .empty-cart').addClass('is-hidden');

    for (var i = 0; i < data.products.length; i++) {
      cartTotal = parseFloat(cartTotal) + parseFloat(data.products[i].price) * parseInt(data.products[i].quantity);
      var template = "\n                <li class=\"clearfix product-container\" data-product-id=\"" + data.products[i].id + "\">\n                    <img src=\"http://via.placeholder.com/250x250\" data-demo-src=\"" + data.products[i].images[0].url + "\"  alt=\"\" />\n                    <span class=\"item-meta\">\n                        <span class=\"item-name\">" + data.products[i].name + "</span>\n                        <span class=\"item-price\">\n                            <var>" + parseFloat(data.products[i].price).toFixed(2) + "</var> x <span>" + data.products[i].quantity + "</span>\n                        </span>\n                    </span>\n                    <span class=\"quantity\">\n                        <div id=\"spinner-" + data.products[i].id + "\" data-trigger=\"spinner\" class=\"sidebar-spinner\">\n                            <input class=\"hidden-spinner\" type=\"hidden\" value=\"" + data.products[i].quantity + "\" data-spin=\"spinner\"\n                                data-rule=\"quantity\" data-min=\"1\" data-max=\"99\">\n                            <a class=\"spinner-button is-remove\" href=\"javascript:;\" data-spin=\"down\">\n                                " + minusIcon + "\n                            </a>\n                            <span class=\"spinner-value\">" + data.products[i].quantity + "</span>\n                            <a class=\"spinner-button is-add\" href=\"javascript:;\" data-spin=\"up\">\n                                " + plusIcon + "\n                            </a>\n                        </div>\n                    </span>\n\n                    <span class=\"remove-item remove-from-cart-action has-simple-popover\" data-content=\"Remove from Cart\" data-placement=\"top\" onclick=\"return false\">\n                        " + closeIcon + "\n                    </span>\n                </li>\n            ";
      $('.cart-quickview .cart-body ul').append(template);

      if (i == data.products.length - 1) {
        data.total = cartTotal;
        $('#quickview-cart-count var').html(data.items);
        localStorage.setItem('cart', JSON.stringify(data));
        $('.cart-quickview .cart-total').html(parseFloat(cartTotal).toFixed(2));
        initSpinners(); //Check viewport size

        if (!mobileTrue) {
          initPopovers();
        }

        removeFromCart();
      }
    }

    $('#cart-dot').removeClass('is-hidden');
    $('#mobile-cart-count').html(data.items);
    setTimeout(function () {
      $('.cart-loader').removeClass('is-active');
    }, 800);
  } else {
    $('#cart-dot').addClass('is-hidden');
    $('.cart-quickview .empty-cart').removeClass('is-hidden');
    cartTotal = 0.00;
    data.total = cartTotal;
    $('#mobile-cart-count').html('0');
    localStorage.setItem('cart', JSON.stringify(data));
    $('.cart-quickview .cart-total').html(parseFloat(cartTotal).toFixed(2));
  }
} //Reusable remove from cart function


function removeFromCart() {
  $('.remove-from-cart-action').on('click', function () {
    var $this = $(this);
    var productId = parseInt($this.closest('.product-container').attr('data-product-id'));
    var data = JSON.parse(localStorage.getItem('cart'));
    $('.cart-loader').addClass('is-active'); //Update cart Data

    setTimeout(function () {
      data.products = $.grep(data.products, function (e) {
        return e.id != productId;
      });
      data.items = data.products.length;
      localStorage.setItem('cart', JSON.stringify(data));
      $('.webui-popover').removeClass('in').addClass('pop-out');
      getCart();
    }, 300); //Simulate loading

    setTimeout(function () {
      $('.cart-loader').removeClass('is-active');
      toasts.service.success('', 'fas fa-check', 'Product successfully removed from cart', 'bottomRight', 2500);
    }, 800);
  });
} //Disable cart sidebar (when on cart page or checkout)


function disableCartSidebar() {
  $('#open-cart').off();
  $('#open-cart').on('click', function () {
    if ($('.checkout-wrapper').length) {
      toasts.service.error('', 'fas fa-comment-alt', 'Cart sidebar is disabled during checkout', 'bottomRight', 2500);
    } else {
      toasts.service.error('', 'fas fa-comment-alt', 'Cart sidebar is disabled on cart page', 'bottomRight', 2500);
    }
  });
} //Get cart data for cart page


function getCartPage() {
  var plusIcon = feather.icons.plus.toSvg();
  var minusIcon = feather.icons.minus.toSvg();
  var removeIcon = feather.icons['trash-2'].toSvg();
  var data = JSON.parse(localStorage.getItem('cart'));
  var cartSubtotal = 0.00;
  var taxRate = 0.06; // 6% tax rate
  //Populate cart page

  $('.account-loader').addClass('is-active');
  $('#cart-page-products').empty();

  if (data.products.length > 0) {
    $('#cart-main-placeholder').addClass('is-hidden');
    $('.is-account-grid').removeClass('is-hidden');

    for (var i = 0; i < data.products.length; i++) {
      cartSubtotal = parseFloat(cartSubtotal) + parseFloat(data.products[i].price) * parseInt(data.products[i].quantity);
      var template = "\n                <div class=\"flat-card is-auto cart-card product-container\" data-product-id=\"" + data.products[i].id + "\">\n                    <ul class=\"cart-content\">\n                        <li>\n                            <img src=\"http://via.placeholder.com/500x500/ffffff/999999\"\n                                data-demo-src=\"" + data.products[i].images[0].url + "\" alt=\"\">\n                            <span class=\"product-info\">\n                                <span>" + data.products[i].name + "</span>\n                                <span>" + data.products[i].category + "</span>\n                            </span>\n                            <span class=\"product-price\">\n                                <span>Price</span>\n                                <span>" + parseFloat(data.products[i].price).toFixed(2) + "</span>\n                            </span>\n\n                            <div data-trigger=\"spinner\" class=\"main-cart-spinner\">\n                                <input class=\"hidden-spinner\" type=\"hidden\" value=\"" + data.products[i].quantity + "\" data-spin=\"spinner\" data-rule=\"quantity\"\n                                    data-min=\"1\" data-max=\"99\">\n                                <a class=\"spinner-button is-remove\" href=\"javascript:;\" data-spin=\"down\">\n                                    " + minusIcon + "\n                                </a>\n                                <span class=\"spinner-value\">" + data.products[i].quantity + "</span>\n                                <a class=\"spinner-button is-add\" href=\"javascript:;\" data-spin=\"up\">\n                                    " + plusIcon + "\n                                </a>\n                            </div>\n\n                            <span class=\"action\">\n                                <span class=\"action-link is-remove remove-from-cartpage-action has-simple-popover\" data-content=\"Remove from Cart\"\n                                    data-placement=\"top\" onclick=\"return false\">\n                                    <a href=\"#\">" + removeIcon + "</a>\n                                </span>\n                            </span>\n                        </li>\n                    </ul>\n                </div>\n            ";
      $('#cart-page-products').append(template);

      if (i == data.products.length - 1) {
        data.total = cartSubtotal;
        $('#cart-page-count').html(data.items);
        localStorage.setItem('cart', JSON.stringify(data));
        $('#cart-summary-subtotal').html(parseFloat(cartSubtotal).toFixed(2));
        $('#cart-summary-taxes').html(parseFloat(cartSubtotal * taxRate).toFixed(2));
        $('#cart-summary-total').html(parseFloat(cartSubtotal * taxRate + cartSubtotal).toFixed(2));
        initCartSpinners(); //Check viewport size

        if (!mobileTrue) {
          initPopovers();
        }

        removeFromCartPage();
      }
    }

    $('#cart-dot').removeClass('is-hidden');
    setTimeout(function () {
      $('.cart-loader').removeClass('is-active');
    }, 800);
  } else {
    $('.is-account-grid').addClass('is-hidden');
    $('#cart-main-placeholder').removeClass('is-hidden');
    cartSubtotal = 0.00;
    data.total = cartSubtotal;
    localStorage.setItem('cart', JSON.stringify(data));
    $('#cart-page-count').html('0');
    $('#cart-summary-subtotal').html(parseFloat(cartSubtotal).toFixed(2));
    $('#cart-summary-taxes').html(parseFloat(cartSubtotal * taxRate).toFixed(2));
    $('#cart-summary-total').html(parseFloat(cartSubtotal * taxRate + cartSubtotal).toFixed(2));
  }
} //Update cart page when update button is clicked


function updateCartPage() {
  var cartObject = {};
  var productsCount = $('#cart-page-products .product-container').length;
  cartObject.products = [];
  cartObject.items = productsCount;
  $('#cart-page-products .product-container').each(function () {
    var $this = $(this);
    var productId = parseInt($this.attr('data-product-id'));
    var productName = $this.find('.product-info span:first-child').text();
    var productCategory = $this.find('.product-info span:nth-child(2)').text();
    var productPrice = parseFloat($this.find('.product-price span:nth-child(2)').text());
    var productQuantity = parseInt($this.find('.main-cart-spinner input').val());
    var productImage = $this.find('img').attr('src');
    cartObject.products.push({
      id: productId,
      name: productName,
      category: productCategory,
      quantity: productQuantity,
      price: productPrice,
      images: [{
        url: productImage
      }]
    });
  });
  localStorage.setItem('cart', JSON.stringify(cartObject));
  console.log(cartObject);
} //Remove product from cart page


function removeFromCartPage() {
  $('.remove-from-cartpage-action').on('click', function () {
    var $this = $(this);
    var productId = parseInt($this.closest('.product-container').attr('data-product-id'));
    var data = JSON.parse(localStorage.getItem('cart'));
    $('.account-loader').addClass('is-active'); //Update cart Data

    setTimeout(function () {
      data.products = $.grep(data.products, function (e) {
        return e.id != productId;
      });
      data.items = data.products.length;
      localStorage.setItem('cart', JSON.stringify(data));
      $('.webui-popover').removeClass('in').addClass('pop-out');
      getCartPage();
      getCart();
    }, 300); //Simulate loading

    setTimeout(function () {
      $('.account-loader').removeClass('is-active');
      toasts.service.success('', 'fas fa-check', 'Product successfully removed from cart', 'bottomRight', 2500);
    }, 800);
  });
} //Build proto checkout object and pass it to checkout


function initCheckout() {
  $('#init-checkout').on('click', function () {
    if (JSON.parse(localStorage.getItem('cart')) !== null) {
      localStorage.removeItem('checkout');
    }

    var cartData = JSON.parse(localStorage.getItem('cart'));
    var userData = JSON.parse(localStorage.getItem('user'));
    var $this = $(this);
    var checkoutObject = {};
    $this.addClass('is-loading');
    checkoutObject.items = cartData.products;
    checkoutObject.count = cartData.items;
    checkoutObject.subtotal = parseFloat($('#cart-summary-subtotal').text());
    checkoutObject.taxes = parseFloat($('#cart-summary-taxes').text());
    checkoutObject.shipping = 0.00;
    checkoutObject.total = parseFloat($('#cart-summary-total').text());
    checkoutObject.step = 1;
    checkoutObject.username = userData.firstName + ' ' + userData.lastName;
    checkoutObject.avatar = userData.photoUrl;
    checkoutObject.orderNotes = '';
    localStorage.setItem('checkout', JSON.stringify(checkoutObject));

    if (!userData.isLoggedIn) {
      setTimeout(function () {
        window.location.href = '/authentication.html?origin=checkout';
      }, 1200);
    } else {
      setTimeout(function () {
        window.location.href = '/checkout-step1.html';
      }, 1200);
    }
  });
}

$(document).ready(function () {
  //Update cart button
  $('.update-cart-button').on('click', function () {
    var $this = $(this);
    $this.addClass('is-loading');
    $('.cart-loader').addClass('is-active');
    setTimeout(function () {
      updateCartSidebar();
      getCart();
    }, 300);
    setTimeout(function () {
      $this.removeClass('is-loading').addClass('is-hidden');
      $('.cart-quickview .view-cart-button').removeClass('is-hidden');
      $('.cart-loader').removeClass('is-active');
      toasts.service.success('', 'fas fa-check', 'cart updated successfully', 'bottomRight', 2500);
    }, 800);
  }); //Products Grid implementation

  if ($('#shop-grid').length) {
    //Add to cart
    $('.product-container .actions .add').off().on('click', function () {
      var $this = $(this);

      if ($('.cart-quickview').hasClass('is-active')) {
        $('.cart-loader').addClass('is-active');
      }

      setTimeout(function () {
        $.when(addToCart($this)).done(function () {
          getCart();
        });
      }, 300);
      setTimeout(function () {
        if ($('.cart-quickview').hasClass('is-active')) {
          $('.cart-loader').removeClass('is-active');
        }

        toasts.service.success('', 'fas fa-plus', 'Product successfully added to cart', 'bottomRight', 2500);
      }, 800);
    });
  } //Products List implementation


  if ($('#shop-list').length) {
    //Add to cart
    $('.product-container .actions .add').on('click', function () {
      var $this = $(this);

      if ($('.cart-quickview').hasClass('is-active')) {
        $('.cart-loader').addClass('is-active');
      }

      setTimeout(function () {
        $.when(addToCart($this)).done(function () {
          getCart();
        });
      }, 300);
      setTimeout(function () {
        if ($('.cart-quickview').hasClass('is-active')) {
          $('.cart-loader').removeClass('is-active');
        }

        toasts.service.success('', 'fas fa-plus', 'Product successfully added to cart', 'bottomRight', 2500);
      }, 800);
    });
  } //If cart page


  if ($('#cart-page').length) {
    disableCartSidebar();
    getCartPage();
    setTimeout(function () {
      $('.account-loader').removeClass('is-active');
    }, 1200); //Init checkout button

    initCheckout(); //Update cart page

    $('#update-cart-page').on('click', function () {
      var $this = $(this);
      $this.addClass('is-loading');
      $('.account-loader').addClass('is-active');
      setTimeout(function () {
        updateCartPage();
        getCartPage();
      }, 300);
      setTimeout(function () {
        $this.removeClass('is-loading').addClass('is-hidden');
        $('#init-checkout').removeClass('is-hidden');
        $('.account-loader').removeClass('is-active');
        toasts.service.success('', 'fas fa-check', 'cart updated successfully', 'bottomRight', 2500);
      }, 800);
    }); //Add to cart from recently viewed

    $('.product-container .actions .add').on('click', function () {
      var $this = $(this);
      $('.account-loader').addClass('is-active');
      setTimeout(function () {
        $.when(addToCart($this)).done(function () {
          getCartPage();
          getCart();
        });
      }, 300);
      setTimeout(function () {
        $('.account-loader').removeClass('is-active');
        toasts.service.success('', 'fas fa-plus', 'Product successfully added to cart', 'bottomRight', 2500);
      }, 800);
    });
  }
});