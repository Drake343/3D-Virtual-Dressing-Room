"use strict"; //Get product Id parameter from query string

var productId = parseInt($.urlParam('productId')); //Init Product details spinner

function initProductSpinner() {
  $('.details-spinner').spinner('changing', function (e, newVal, oldVal) {
    var $this = $(this);
    $this.closest('.product-quantity').find('.spinner-value').html(newVal);
  });
} //Get related products


function getRelatedProducts() {
  $('.featured-product').each(function () {
    var $this = $(this);
    var productId = parseInt($this.attr('data-product-id'));
    $.ajax({
      url: 'assets/data/products.json',
      async: true,
      dataType: 'json',
      success: function success(products) {
        for (var i = 0; i < products.length; i++) {
          if (products[i].id === productId) {
            $this.closest('.product-container').attr('data-product-id', products[i].id);
            $this.find('img').attr('src', products[i].pic);
            $this.find('img').attr('data-demo-src', products[i].pic);
            $this.find('.product-name').html(products[i].name);
            $this.find('.product-description').html(products[i].tagline);
          }
        }
      }
    });
  });
} //Get product page


function getProductPage(productId) {
  $.ajax({
    url: 'assets/data/products.json',
    async: true,
    dataType: 'json',
    success: function success(products) {
      for (var i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
          //Populate basic info
          $('.product-container').attr('data-product-id', products[i].id);
          $('#details-add-to-cart').attr('data-product-id', products[i].id);
          $('#product-category').html(products[i].category);
          $('.category-icon').addClass('is-hidden');
          $('#product-details-name, #panel-product-name').html(products[i].name);
          $('#product-details-shortDesc').html(products[i].shortDesc);
          $('#product-details-sku, #panel-product-sku').html(products[i].sku);
          $('#' + products[i].category.toLowerCase().split(' ').join('') + '-icon').removeClass('is-hidden');

          if (products[i].discounted === true) {
            $('#new-price').html(products[i].price.toFixed(2));
            $('#old-price').removeClass('is-hidden').html(products[i].oldPrice.toFixed(2));
          } else {
            $('#old-price').addClass('is-hidden');
            $('#new-price').html(products[i].price.toFixed(2));
          }

          if (products[i].inventoryQty > 0) {
            $('#panel-product-availability').html('Available');
          } else {
            $('#panel-product-availability').html('Sold Out');
          }

          $('#panel-product-vendor').html(products[i].vendor);
          $('#panel-product-dimensions').html(products[i].dimensions);
          $('#panel-product-weight').html(products[i].weight);
          $('#panel-product-shipping-delay').html(products[i].shippingTime); //Related products

          $('#related-product-0').attr('data-product-id', products[i].related[0].id);
          $('#related-product-1').attr('data-product-id', products[i].related[1].id);
          $('#related-product-2').attr('data-product-id', products[i].related[2].id); //Empty carousel before loading images

          $('#product-view .is-carousel').empty(); //Images

          for (var p = 0; p < products[i].images.length; p++) {
            var template = "\n                            <div>\n                                <img src=\"http://via.placeholder.com/500x500/ffffff/999999\" data-demo-src=\"" + products[i].images[p].url + "\" data-action=\"zoom\" alt=\"\">\n                            </div>\n                        ";
            $.when($('#product-view .is-carousel').append(template)).done(function () {
              initProductCarousel();
              initProductSpinner();
              getRelatedProducts();
            });
          }
        }
      }
    }
  });
} //Add to cart from product details


function addToCartDetails(trigger) {
  var data = JSON.parse(localStorage.getItem('cart'));
  console.log(data);
  var $container = trigger.closest('.product-container');
  var productId = parseInt(trigger.attr('data-product-id'));
  var productName = $('#product-details-name').text();
  var productCategory = $('#product-category').text();
  var productPrice = parseFloat($('#new-price').text());
  var productImage = $('.is-carousel > div:first-child img').attr('src');
  var productQuantity = parseInt($('.details-spinner input').val());
  var found = data.products.some(function (el) {
    return el.id === productId;
  });

  if (!found) {
    console.log('Product does not exist in cart');
    data.items = data.items + 1;
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
        data.products[i].quantity = parseInt(data.products[i].quantity + productQuantity);
        localStorage.setItem('cart', JSON.stringify(data));
      }
    }
  }
} //Handle various UI interactions


function initProductPageUI() {
  //Product panel
  $('.product-action').on('click', function () {
    $('.product-action.is-active').removeClass('is-active');
    $(this).addClass('is-active');
  }); //show product

  $('#show-product').on('click', function () {
    $('#meta-view, #ratings-view').addClass('is-hidden');
    $('#product-view').removeClass('is-hidden');
  }); //show meta

  $('#show-meta').on('click', function () {
    $('#product-view, #ratings-view').addClass('is-hidden');
    $('#meta-view').removeClass('is-hidden');
  }); //show ratings

  $('#show-ratings').on('click', function () {
    $('#meta-view, #product-view').addClass('is-hidden');
    $('#ratings-view').removeClass('is-hidden');
  });
}

$(document).ready(function () {
  //If Product page
  if ($('#product-page').length) {
    //Init page UI
    initProductPageUI(); //Get product details

    getProductPage(productId); //Add to cart

    $('#details-add-to-cart').on('click', function () {
      var $this = $(this);
      $this.addClass('is-loading');

      if ($('.cart-quickview').hasClass('is-active')) {
        $('.cart-loader').addClass('is-active');
      }

      setTimeout(function () {
        $.when(addToCartDetails($this)).done(function () {
          getCart();
        });
      }, 300);
      setTimeout(function () {
        if ($('.cart-quickview').hasClass('is-active')) {
          $('.cart-loader').removeClass('is-active');
        }

        toasts.service.success('', 'fas fa-plus', 'Product successfully added to cart', 'bottomRight', 2500);
        $this.removeClass('is-loading');
      }, 800);
    }); //Show sidebar wishlist button

    $('#sidebar-wishlist-button').removeClass('is-hidden');
  }
});