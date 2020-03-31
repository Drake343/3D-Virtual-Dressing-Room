"use strict"; //Init search results page filter input

function initSearchFilter() {
  $('.nephos-search-filter').focus(function (e) {
    if ($(this).val() === defaultText) $(this).val('');
  }).blur(function (e) {
    if ($(this).val() === '') $(this).val(defaultText);
  }).keyup(function (e) {
    var patterns = $(this).val().toLowerCase().split(' ');
    if (!patterns.length) return;
    $('.search-filter-target').hide().filter(function () {
      var matchText = $(this).find('.search-filter-match').text().toLowerCase();

      for (var i = 0; i < patterns.length; i++) {
        if (matchText.indexOf(patterns[i]) === -1) return false;
      }

      return true;
    }).show();
  });
} //Get and build search results page


function getSearchResults() {
  var plusIcon = feather.icons.plus.toSvg();
  var minusIcon = feather.icons.minus.toSvg();
  var cartIcon = feather.icons['shopping-cart'].toSvg();
  $('#search-results-list .flat-card').remove();
  $.ajax({
    url: 'assets/data/search.json',
    async: true,
    dataType: 'json',
    success: function success(data) {
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        var template = "\n                    <div class=\"flat-card is-auto cart-card search-card search-filter-target product-container\" data-product-id=\"" + data[i].id + "\">\n                        <ul class=\"cart-content\">\n                            <li>\n                                <img src=\"http://via.placeholder.com/500x500/ffffff/999999\"\n                                    data-demo-src=\"" + data[i].images[0].url + "\" alt=\"\">\n                                <span class=\"product-info\">\n                                    <span class=\"search-filter-match product-name\">" + data[i].name + "</span>\n                                    <span class=\"search-filter-match product-category\">" + data[i].category + "</span>\n                                </span>\n                                <span class=\"product-price\">\n                                    <span>Price</span>\n                                    <span>" + parseFloat(data[i].price).toFixed(2) + "</span>\n                                </span>\n\n                                <div data-trigger=\"spinner\" class=\"main-cart-spinner\">\n                                    <input class=\"hidden-spinner\" type=\"hidden\" value=\"1\" data-spin=\"spinner\" data-rule=\"quantity\"\n                                        data-min=\"1\" data-max=\"99\">\n                                    <a class=\"spinner-button is-remove\" href=\"javascript:;\" data-spin=\"down\">\n                                        " + minusIcon + "\n                                    </a>\n                                    <span class=\"spinner-value\">1</span>\n                                    <a class=\"spinner-button is-add\" href=\"javascript:;\" data-spin=\"up\">\n                                        " + plusIcon + "\n                                    </a>\n                                </div>\n\n                                <span class=\"action\">\n                                    <span class=\"action-link is-add add-from-search-action has-simple-popover\" data-content=\"Add to Cart\"\n                                        data-placement=\"top\" onclick=\"return true\">\n                                        <a>" + cartIcon + "</a>\n                                    </span>\n                                </span>\n                            </li>\n                        </ul>\n                    </div>\n                ";
        $('#search-results-list').append(template);

        if (i == data.length - 1) {
          initCartSpinners();
          initAddFromSearchAction();
          initPopovers();
        }
      }
    }
  });
} //Add to cart from search results page


function addToCartFromSearch(trigger) {
  var data = JSON.parse(localStorage.getItem('cart'));
  var $container = trigger.closest('.product-container');
  var productId = parseInt($container.attr('data-product-id'));
  var productName = $container.find('.product-name').text();
  var productCategory = $container.find('.product-category').text();
  var productPrice = parseFloat($container.find('.product-price span:nth-child(2)').text());
  var productImage = $container.find('img').attr('src');
  var productQuantity = parseInt($container.find('.hidden-spinner').val());
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
} //Add to cart user action


function initAddFromSearchAction() {
  $('.product-container .action .add-from-search-action').on('click', function () {
    var $this = $(this);

    if ($('.cart-quickview').hasClass('is-active')) {
      $('.cart-loader').addClass('is-active');
    }

    setTimeout(function () {
      $.when(addToCartFromSearch($this)).done(function () {
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
}

$(document).ready(function () {
  //Search results page
  if ($('#search-results').length) {
    getSearchResults();
    initSearchFilter();
  } //Append link to search result in search overlay


  function initFullSearch() {
    $('#full-search').on('click', function () {
      $('#clear-search').removeClass('is-active');
      $('#nephos-search').closest('.control').addClass('is-loading');
      setTimeout(function () {
        window.location.href = '/search-results.html';
      }, 2200);
    });
  } //Init search overlay autocomplete


  var searchIcon = feather.icons.search.toSvg();
  var searchOptions = {
    url: "assets/data/products.json",
    getValue: "name",
    template: {
      type: "custom",
      method: function method(value, item) {
        return "\n                    <div class=\"nephos-search-template\">\n                        <img class=\"autocpl-product\" src=\"" + item.pic + "\" alt=\"\">\n                        <div class=\"entry-text\">\n                            <span>" + value + "</span>\n                            <span>" + parseFloat(item.price).toFixed(2) + "</span>\n                        </div>\n                    </div>\n                ";
      }
    },
    highlightPhrase: false,
    list: {
      maxNumberOfElements: 5,
      showAnimation: {
        type: "fade",
        //normal|slide|fade
        time: 400,
        callback: function callback() {}
      },
      match: {
        enabled: true
      },
      onShowListEvent: function onShowListEvent() {
        if (!$('#full-search').length) {
          var searchLink = "\n                        <li id=\"full-search\" class=\"full-search\">\n                            <div class=\"eac-item\">\n                                <div class=\"nephos-search-template\">\n                                    <div class=\"icon-wrapper\">\n                                        " + searchIcon + "\n                                    </div>\n                                    <div class=\"entry-text\">\n                                        <span>View All Results</span>\n                                        <small>357 results</small>\n                                    </div>\n                                </div>\n                            </div>\n                        </li>\n                    ";
          $('.search-input-wrapper .easy-autocomplete-container ul').append(searchLink);
          initFullSearch();
        }

        $('.search-input-wrapper .easy-autocomplete-container ul').addClass('opened');
      },
      onHideListEvent: function onHideListEvent() {
        $('.search-input-wrapper .easy-autocomplete-container ul').removeClass('opened');
        $('#full-search').remove();
      }
    }
  };
  $("#nephos-search").easyAutocomplete(searchOptions);
});