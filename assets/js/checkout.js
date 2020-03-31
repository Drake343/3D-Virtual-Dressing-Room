"use strict"; //Get checkout summary for checkout sidebar

function getCheckoutSidebar() {
  var userData = JSON.parse(localStorage.getItem('user'));
  var checkout = JSON.parse(localStorage.getItem('checkout')); //Populate data

  $('#checkout-avatar').attr('src', 'http://via.placeholder.com/250x250');
  $('#checkout-avatar').attr('data-demo-src', checkout.avatar);
  $('#checkout-username').html(checkout.username); //Shipping address

  if (!userData.addresses[1].disabled) {
    $('#shipping-address1').html(userData.addresses[1].address1);
    $('#shipping-address2').html(userData.addresses[1].address2);
    $('#shipping-city').html(userData.addresses[1].city);
    $('#shipping-state').html(userData.addresses[1].state);
    $('#shipping-postalCode').html(userData.addresses[1].postalCode);
    $('#shipping-country').html(userData.addresses[1].country);
  } else {
    $('#shipping-address1').html(userData.addresses[0].address1);
    $('#shipping-address2').html(userData.addresses[0].address2);
    $('#shipping-city').html(userData.addresses[0].city);
    $('#shipping-state').html(userData.addresses[0].state);
    $('#shipping-postalCode').html(userData.addresses[0].postalCode);
    $('#shipping-country').html(userData.addresses[0].country);
  } //Totals


  $('#checkout-subtotal-value').html(parseFloat(checkout.subtotal).toFixed(2));
  $('#checkout-shipping-value').html(parseFloat(checkout.shipping).toFixed(2));
  $('#checkout-tax-value').html(parseFloat(checkout.taxes).toFixed(2));
  $('#checkout-grandtotal-value').html(parseFloat(checkout.total).toFixed(2));
} //Get step 1 info


function getCheckoutStep1() {
  var checkout = JSON.parse(localStorage.getItem('checkout')); //Remove existing

  $('.flex-table .flex-table-item').remove(); //Loop products

  for (var p = 0; p < checkout.items.length; p++) {
    var template = "\n            <div class=\"flex-table-item product-container\" data-product-id=\"" + checkout.items[p].id + "\">\n                <div class=\"product\">\n                    <img src=\"http://via.placeholder.com/250x250\" data-demo-src=\"" + checkout.items[p].images[0].url + "\" alt=\"\">\n                    <a class=\"product-name\">" + checkout.items[p].name + "</a>\n                </div>\n                <div class=\"quantity\">\n                    <span>" + checkout.items[p].quantity + "</span>\n                </div>\n                <div class=\"price\">\n                    <span class=\"has-price\">" + checkout.items[p].price.toFixed(2) + "</span>\n                </div>\n                <div class=\"discount\">\n                    <span class=\"has-price\">0</span>\n                </div>\n                <div class=\"total\">\n                    <span class=\"has-price\">" + (checkout.items[p].price * checkout.items[p].quantity).toFixed(2) + "</span>\n                </div>\n            </div>\n        ";
    $.when($('.flex-table').append(template)).done(function () {});
  }
} //Get step 2 info


function getCheckoutStep2() {
  var userData = JSON.parse(localStorage.getItem('user')); //Disable address toggle if no shipping address is configured

  if (userData.addresses[1].disabled === true) {
    $('#shipping-switch').closest('label').addClass('is-vhidden');
  }
} //Get step 4 info


function getCheckoutStep4() {
  var checkout = JSON.parse(localStorage.getItem('checkout')); //Shipping

  $('#summary-shipping-icon').attr('src', checkout.shippingMethod.icon);
  $('#summary-shipping-name').html(checkout.shippingMethod.name);
  $('#summary-shipping-description').html(checkout.shippingMethod.description); //Payment

  $('#summary-payment-icon').attr('src', checkout.paymentMethod.icon);
  $('#summary-payment-name').html(checkout.paymentMethod.name);
  $('#summary-payment-description').html(checkout.paymentMethod.description);
} //Finalize checkout and convert to order


function convertCheckoutToOrder() {
  var userData = JSON.parse(localStorage.getItem('user'));
  var checkout = JSON.parse(localStorage.getItem('checkout'));
  var orderProducts = [];

  function formatDate(date) {
    var monthsList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthsList[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear();
  }

  ;
  var orderDate = formatDate(new Date());

  for (var p = 0; p < checkout.items.length; p++) {
    var orderItem = {
      id: checkout.items[p].id,
      name: checkout.items[p].name,
      price: checkout.items[p].price,
      quantity: checkout.items[p].quantity,
      photoUrl: checkout.items[p].images[0].url
    };
    orderProducts.push(orderItem);
  }

  var newOrder = {
    id: parseInt(userData.orders[0].id) + 1,
    total: checkout.total,
    date: orderDate,
    status: 'New',
    completed: 12,
    shippingMethod: checkout.shippingMethod.name,
    orderModel: {
      subtotal: parseFloat(checkout.subtotal).toFixed(2),
      taxes: parseFloat(checkout.taxes).toFixed(2),
      shipping: parseFloat(checkout.shipping).toFixed(2),
      total: parseFloat(checkout.total).toFixed(2)
    },
    //products: checkout.items,
    products: orderProducts,
    contact: {
      name: 'Janet Smith',
      photoUrl: 'assets/img/avatars/janet.jpg'
    }
  };
  userData.orders.unshift(newOrder);
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.removeItem('checkout');
}

$(document).ready(function () {
  //Shipping methods
  $('.shipping-methods-grid input').on('change', function () {
    var $this = $(this);
    var checkout = JSON.parse(localStorage.getItem('checkout'));
    var rate = parseFloat($this.closest('.method-card').attr('data-shipping-rate')).toFixed(2);
    var items = parseInt(checkout.count);
    var shippingRate = (rate * items).toFixed(2);
    var newTotal = (parseFloat(checkout.total) + parseFloat(shippingRate)).toFixed(2);
    $('#checkout-shipping-value').html(shippingRate);
    $('#checkout-grandtotal-value').html(newTotal);
    $('.shipping-methods-grid .method-card').removeClass('is-selected');
    $this.closest('.method-card').addClass('is-selected');
  }); //Payment methods

  $('#payment-methods-main input').on('change', function () {
    var targetMethod = $(this).attr('data-value-id');
    $(this).closest('.method-card').addClass('is-selected');
    setTimeout(function () {
      $('.checkout-payment-methods').addClass('is-hidden');
      $('#payment-methods-' + targetMethod).removeClass('is-hidden');
    }, 300);
  });
  $('.checkout-payment-methods .payment-back').on('click', function () {
    $('.checkout-payment-methods').addClass('is-hidden');
    $('.checkout-payment-methods .method-card').removeClass('is-selected');
    $('#payment-methods-main').removeClass('is-hidden').find('input').prop('checked', false);
    $('.payment-disclaimer .animated-checkbox.is-checked input').prop('checked', false);
    $('.payment-disclaimer .animated-checkbox.is-checked .shadow-circle').removeClass('is-opaque');
    $('.payment-disclaimer .animated-checkbox.is-checked').removeClass('is-checked is-unchecked');
    $('#checkout-next').addClass('no-click');
  });
  $('.payment-disclaimer input').on('change', function () {
    console.log('changed');

    if (!$(this).prop('checked')) {
      $('#checkout-next').addClass('no-click');
    } else {
      $('#checkout-next').removeClass('no-click');
    }
  }); //If checkout

  if ($('.checkout-wrapper').length) {
    var currentStep = parseInt($('.checkout-wrapper').attr('data-checkout-step'));
    var checkout = JSON.parse(localStorage.getItem('checkout'));
    var userData = JSON.parse(localStorage.getItem('user'));
    disableCartSidebar(); //If a user is logged

    if (userData.isLoggedIn) {
      //If checkout data is null, show a modal
      if (checkout === null || checkout === undefined) {
        setTimeout(function () {
          $('.checkout-blocked-modal').addClass('is-active');
          setTimeout(function () {
            $('.checkout-blocked-modal .box').addClass('scaled');
          }, 600);
        }, 1500);
      } //User is logged and some checkout data is available
      else {
          //Redirect to the correct checkout object step
          if (checkout.step !== currentStep) {
            window.location.href = "/checkout-step" + checkout.step + ".html";
          } //If checkout step1


          if ($('#checkout-1').length) {
            getCheckoutSidebar();
            getCheckoutStep1();
          } else if ($('#checkout-2').length) {
            getCheckoutSidebar();
            getCheckoutStep2();
          } else if ($('#checkout-3').length) {
            getCheckoutSidebar();
          } else if ($('#checkout-4').length) {
            getCheckoutSidebar();
            getCheckoutStep1(); //Can be reused here to get products

            getCheckoutStep4();
          } else if ($('#checkout-5').length) {
            getCheckoutSidebar();
            var cart = JSON.parse(localStorage.getItem('cart'));
            cart.products = [];
            cart.items = 0;
            cart.total = 0.00;
            localStorage.setItem('cart', JSON.stringify(cart));
            setTimeout(function () {
              $('.success-card').removeClass('is-hidden');
              getCart();
            }, 2000);
          }
        }
    } //If not
    else {
        setTimeout(function () {
          $('.checkout-unauth-modal').addClass('is-active');
          setTimeout(function () {
            $('.checkout-unauth-modal .box').addClass('scaled');
          }, 600);
        }, 1500);
      }
  } //Checkout button


  $('#checkout-next').on('click', function () {
    var checkout = JSON.parse(localStorage.getItem('checkout'));
    var $this = $(this);
    $this.addClass('is-loading'); //Handle step 1

    if ($('#checkout-1').length) {
      checkout.step = parseInt(checkout.step) + 1;
      localStorage.setItem('checkout', JSON.stringify(checkout));
      setTimeout(function () {
        window.location.href = '/checkout-step2.html';
        $this.removeClass('is-loading');
      }, 1000);
    } //Handle step 2
    else if ($('#checkout-2').length) {
        var shippingMethod = {};

        if ($('.method-card.is-selected').length === 0) {
          toasts.service.error('', 'fa fa-close', 'Please select a shipping method', 'bottomRight', 2500);
          setTimeout(function () {
            $this.removeClass('is-loading');
          }, 1000);
        } else {
          checkout.step = parseInt(checkout.step) + 1;
          localStorage.setItem('checkout', JSON.stringify(checkout));
          shippingMethod.icon = $('.method-card.is-selected').find('img').attr('src');
          shippingMethod.name = $('.method-card.is-selected').find('h3').text();
          shippingMethod.description = $('.method-card.is-selected').find('p').text();
          checkout.shippingMethod = shippingMethod;
          checkout.shipping = parseFloat($('#checkout-shipping-value').text()).toFixed(2);
          checkout.total = (parseFloat(checkout.total) + parseFloat(checkout.shipping)).toFixed(2);
          localStorage.setItem('checkout', JSON.stringify(checkout));
          setTimeout(function () {
            window.location.href = '/checkout-step3.html';
            $this.removeClass('is-loading');
          }, 1000);
        }
      } //Handle step 3
      else if ($('#checkout-3').length) {
          var paymentMethod = {};

          if ($('.method-card.is-selected').length === 0) {
            toasts.service.error('', 'fa fa-close', 'Please select a payment method', 'bottomRight', 2500);
            setTimeout(function () {
              $this.removeClass('is-loading');
            }, 1000);
          } else {
            checkout.step = parseInt(checkout.step) + 1;
            localStorage.setItem('checkout', JSON.stringify(checkout));
            paymentMethod.icon = $('.method-card.is-selected').find('img').attr('src');
            paymentMethod.name = $('.method-card.is-selected').find('h3').text();
            paymentMethod.description = $('.method-card.is-selected').find('p').text();
            checkout.paymentMethod = paymentMethod;
            localStorage.setItem('checkout', JSON.stringify(checkout));
            setTimeout(function () {
              window.location.href = '/checkout-step4.html';
              $this.removeClass('is-loading');
            }, 1000);
          }
        } //Handle step 4
        else if ($('#checkout-4').length) {
            checkout.step = parseInt(checkout.step) + 1;
            localStorage.setItem('checkout', JSON.stringify(checkout));
            var checkout = JSON.parse(localStorage.getItem('checkout'));
            var orderNotes = $('#checkout-notes').val();
            checkout.orderNotes = orderNotes;
            localStorage.setItem('checkout', JSON.stringify(checkout));
            setTimeout(function () {
              window.location.href = '/checkout-step5.html';
              $this.removeClass('is-loading');
            }, 1000);
          }
  }); //Checkout back button

  $('.checkout-back').on('click', function (e) {
    var checkout = JSON.parse(localStorage.getItem('checkout'));
    var $this = $(this);
    $this.addClass('is-loading');

    if ($this.attr('data-checkout-step') !== undefined) {
      e.preventDefault();
      checkout.step = parseInt(checkout.step) - 1;
      localStorage.setItem('checkout', JSON.stringify(checkout)); //Back from step 2 to step 1

      if ($('#checkout-2').length) {
        setTimeout(function () {
          window.location.href = '/checkout-step1.html';
          $this.removeClass('is-loading');
        }, 1000);
      } //Back from step 3 to step 2
      else if ($('#checkout-3').length) {
          checkout.total = (parseFloat(checkout.total) - parseFloat(checkout.shipping)).toFixed(2);
          checkout.shipping = 0.00.toFixed(2);
          localStorage.setItem('checkout', JSON.stringify(checkout));
          setTimeout(function () {
            window.location.href = '/checkout-step2.html';
            $this.removeClass('is-loading');
          }, 1000);
        } //Back from step 4 to step 3
        else if ($('#checkout-4').length) {
            setTimeout(function () {
              window.location.href = '/checkout-step3.html';
              $this.removeClass('is-loading');
            }, 1000);
          }
    }
  }); //End Checkout

  $('#end-checkout-button').on('click', function () {
    var $this = $(this);
    $this.addClass('is-loading');
    convertCheckoutToOrder();
    setTimeout(function () {
      window.location.href = '/orders.html';
    }, 1200);
  }); //Credit card

  if ($('#credit-card').length) {
    var card = new Card({
      form: '.active form',
      container: '.card-wrapper'
    });
  } //Checkout mobile mode


  if ($('.action-bar').length) {
    //Js Media Query
    if (window.matchMedia('(max-width: 768px)').matches) {
      $('.action-bar').addClass('is-mobile');
      $('.shop-wrapper').addClass('is-mobile-mode');
      $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').addClass('is-pushed-mobile');
      $('.pageloader, .infraloader').addClass('is-full');
    } else {
      $('.shop-wrapper').removeClass('is-mobile-mode');
      $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').removeClass('is-pushed-mobile');
      $('.pageloader, .infraloader').removeClass('is-full');
    } //resize handler


    $(window).on('resize', function () {
      if (window.matchMedia('(max-width: 768px)').matches) {
        $('.action-bar').addClass('is-mobile');
        $('.shop-wrapper').addClass('is-mobile-mode');
        $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').addClass('is-pushed-mobile');
        $('.pageloader, .infraloader').addClass('is-full');
      } else {
        $('.shop-wrapper').removeClass('is-mobile-mode');
        $('.main-sidebar, .shop-quickview, .cart-quickview, .filters-quickview').removeClass('is-pushed-mobile');
        $('.pageloader, .infraloader').removeClass('is-full');
      }
    });
  }
});