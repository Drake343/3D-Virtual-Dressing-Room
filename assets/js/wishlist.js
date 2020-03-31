"use strict"; //Init left menu tabs

function initWishlistTabs() {
  $('.is-account-grid .wishlists li').on('click', function () {
    var targetWishlist = $(this).attr('data-target-wishlist');
    $(this).siblings('li').removeClass('is-active');
    $(this).addClass('is-active');
    $('ul.wishlist').addClass('is-hidden');
    $('#' + targetWishlist).removeClass('is-hidden');
  });
} //Get user wishlists


function getWishlists() {
  var cartIcon = feather.icons['shopping-cart'].toSvg();
  var trashIcon = feather.icons['trash-2'].toSvg();
  var userData = JSON.parse(localStorage.getItem('user')); //If not logged in, hide wishlist

  if (!userData.isLoggedIn) {
    $('#wishlist-main, #wishlist-main-placeholder').toggleClass('is-hidden');
  } //Load wishlists
  else if (userData.wishlists.length === 0) {
      $('#wishlist-main, #wishlist-empty-placeholder').toggleClass('is-hidden');
    } else {
      //Empty wishlists menu and Grid
      $('.is-account-grid .menu-card li, #wishlists-container .wishlist-card .wishlist').remove();

      for (var i = 0; i < userData.wishlists.length; i++) {
        if (i == 0) {
          var template = "\n                        <li class=\"is-active\" data-target-wishlist=\"wishlist-" + userData.wishlists[i].id + "\" data-wishlist-id=\"" + userData.wishlists[i].id + "\">\n                            <a>" + userData.wishlists[i].name + "</a>\n                            <div class=\"action-block\">\n                                <span>" + userData.wishlists[i].products.length + " items</span>\n                                <button class=\"remove-button remove-wishlist-action\">\n                                    " + trashIcon + "\n                                </button>\n                            </div>\n                        </li>\n                    ";
          var listContainer = "\n                        <ul id=\"wishlist-" + userData.wishlists[i].id + "\" class=\"wishlist\"></ul>\n                    ";
        } else {
          var template = "\n                        <li data-target-wishlist=\"wishlist-" + userData.wishlists[i].id + "\" data-wishlist-id=\"" + userData.wishlists[i].id + "\">\n                            <a>" + userData.wishlists[i].name + "</a>\n                            <div class=\"action-block\">\n                                <span>" + userData.wishlists[i].products.length + " items</span>\n                                <button class=\"remove-button remove-wishlist-action\">\n                                    " + trashIcon + "\n                                </button>\n                            </div>\n                        </li>\n                    ";
          var listContainer = "\n                        <ul id=\"wishlist-" + userData.wishlists[i].id + "\" class=\"wishlist is-hidden\"></ul>\n                    ";
        }

        $('.is-account-grid .wishlists').append(template);
        $('#wishlists-container .wishlist-card').append(listContainer);
      }

      for (var w = 0; w < userData.wishlists.length; w++) {
        for (var t = 0; t < userData.wishlists[w].products.length; t++) {
          var template = "\n                        <li class=\"wishlist-item product-container\" onclick=\"return true\" data-wishlist-id=\"" + userData.wishlists[w].id + "\"\n                            data-product-id=\"" + userData.wishlists[w].products[t].id + "\">\n                            <div class=\"item-wrapper\">\n                                <!-- Product Image -->\n                                <img src=\"http://via.placeholder.com/500x500/ffffff/999999\" data-demo-src=\"" + userData.wishlists[w].products[t].images[0].url + "\" alt=\"\">\n                                <!-- Product meta -->\n                                <span class=\"product-info\">\n                                    <a class=\"product-name\">" + userData.wishlists[w].products[t].name + "</a>\n                                    <span>" + userData.wishlists[w].products[t].category + "</span>\n                                    <span class=\"product-price is-hidden\"><span>" + userData.wishlists[w].products[t].price + "</span></span>\n                                </span>\n                                <div class=\"action\">\n                                    <!-- actions -->\n                                    <a class=\"add-button whishlist-cart-button pop-button\">\n                                        <div class=\"add-button-inner\">\n                                            " + cartIcon + "\n                                        </div>\n                                    </a>\n                                    <a class=\"remove-button remove-wishlist-item-action\">\n                                        <div class=\"remove-button-inner\">\n                                            " + trashIcon + "\n                                        </div>\n                                    </a>\n                                </div>\n                            </div>\n                        </li>\n                    ";
          $('#wishlist-' + userData.wishlists[w].id).append(template);
        }

        if (w == userData.wishlists.length - 1) {
          initWishlistTabs();
          removeWishlist();
          addToCartFromWishlist();
          initPopButtons();
          removeWishlistItem();
          $('#wishlists-container .wishlist-card .wishlist').each(function () {
            if ($(this).children('li').length) {
              console.log('full array');
            } else {
              console.log('empty array');
              var placeholder = "\n                                <li class=\"placeholder-wrap\">\n                                    <div class=\"placeholder-content\">\n                                        <img src=\"assets/img/illustrations/couch.svg\" alt=\"\">\n                                        <h3>Empty Wishlist</h3>\n                                        <p>This wishlist is still empty. Items will be shown as soon as you add some to it.</p>\n                                    </div>\n                                </li>\n                            ";
              $(this).append(placeholder);
            }
          });
          $('.account-loader').removeClass('is-active');
        }
      }
    }
} //Add a new wishlist


function addWishlist() {
  $('.add-wishlist-action').on('click', function () {
    var $this = $(this);
    var data = JSON.parse(localStorage.getItem('user'));
    var newWishlistName = $this.closest('.modal').find('input').val();
    $this.addClass('is-loading');
    $('.account-loader').addClass('is-active'); //Update wishlist Data

    setTimeout(function () {
      var newWishlist = {
        id: data.wishlists.length,
        name: newWishlistName,
        products: []
      };
      data.wishlists.push(newWishlist);
      localStorage.setItem('user', JSON.stringify(data));
      getWishlists();
      $this.closest('.modal').removeClass('is-active');
    }, 1000); //Simulate loading

    setTimeout(function () {
      $this.removeClass('is-loading');
      $('.account-loader').removeClass('is-active');
      toasts.service.success('', 'fas fa-check', 'New wishlist successfully added', 'bottomRight', 2500);
    }, 1500);
  });
} //Delete an existing wishlist


function removeWishlist() {
  $('.remove-wishlist-action').on('click', function () {
    var $this = $(this);
    var wishlistId = parseInt($this.closest('li').attr('data-wishlist-id'));
    var data = JSON.parse(localStorage.getItem('user'));
    launchAlert('Delete Wishlist?', 'Are you sure you want to delete this wishlist? All items will be removed and this cannot be undone.', 'Delete', 'Cancel', function () {
      $('.account-loader').addClass('is-active'); //Update wishlist Data

      setTimeout(function () {
        data.wishlists = $.grep(data.wishlists, function (e) {
          return e.id != wishlistId;
        });
        localStorage.setItem('user', JSON.stringify(data));
        getWishlists();
      }, 1000); //Simulate loading

      setTimeout(function () {
        $('.cart-loader').removeClass('is-active');
        toasts.service.success('', 'fas fa-check', 'Wishlist successfully deleted', 'bottomRight', 2500);
      }, 1500);
    });
  });
} //Add to cart from a wishlist item


function addToCartFromWishlist() {
  $('.whishlist-cart-button').on('click', function () {
    var $this = $(this);
    $('.cart-loader').addClass('is-active');
    addToCart($this);
    setTimeout(function () {
      toasts.service.success('', 'fas fa-plus', 'Product successfully added to cart', 'bottomRight', 2500);
      getCart();
    }, 800);
  });
} //Remove a wishlist item from its wishlist


function removeWishlistItem() {
  $('.remove-wishlist-item-action').on('click', function () {
    var $this = $(this);
    var productId = parseInt($this.closest('li').attr('data-product-id'));
    var wishlistId = parseInt($this.closest('li').attr('data-wishlist-id'));
    var data = JSON.parse(localStorage.getItem('user'));
    launchAlert('Remove From Wishlist?', 'Are you sure you want to remove this product from the current wishlist? This cannot be undone.', 'Delete', 'Cancel', function () {
      $('.account-loader').addClass('is-active'); //Update wishlist Data

      setTimeout(function () {
        data.wishlists[wishlistId].products = $.grep(data.wishlists[wishlistId].products, function (e) {
          return e.id != productId;
        });
        localStorage.setItem('user', JSON.stringify(data));
        getWishlists();
      }, 1000); //Simulate loading

      setTimeout(function () {
        $('.cart-loader').removeClass('is-active');
        toasts.service.success('', 'fas fa-check', 'Product successfully removed', 'bottomRight', 2500);
      }, 1500);
    });
  });
} //Init wishlist selection in wishlist modal


function initWishlistSelect() {
  //Execution flag
  var onceWishlist = true; //Pop the wishlist modal when needed, and populate its data

  $('.flat-card.product-container .actions .like, .sidebar-whishlist').on('click', function () {
    if ($('#product-page').length) {
      var productId = $('.product-container').attr('data-product-id');
      var productName = $('#product-details-name').text();
      var productPrice = $('#new-price').text();
      var productImg = $('.is-carousel > div:first-child img').attr('src');
      var productCategory = $('#product-category').text();
    } else {
      var productId = $(this).closest('.product-container').attr('data-product-id');
      var productName = $(this).closest('.product-container').find('.product-name').text();
      var productPrice = $(this).closest('.product-container').find('.product-price span:first-child').text();
      var productImg = $(this).closest('.product-container').find('img').attr('src');
      var productCategory = $(this).closest('.category-header').find('.category-title h2').text();
    }

    $('#add-to-wishlist-modal').attr('data-product-id', productId);
    $('#add-to-wishlist-modal').attr('data-product-name', productName);
    $('#add-to-wishlist-modal').attr('data-product-price', productPrice);
    $('#add-to-wishlist-modal').attr('data-product-image', productImg);
    $('#add-to-wishlist-modal').attr('data-product-category', productCategory);
    $('#existing-product-message').addClass('is-hidden');
  }); //select a wishlist in the modal on click

  $('#wishlist-modal-list .list-item').on('click', function () {
    $(this).siblings('.list-item').removeClass('is-active');
    $(this).addClass('is-active');
  }); //Add the previously clicked product to the selected wishlist

  $('.add-to-wishlist-action').on('click', function () {
    var $this = $(this);
    var userData = JSON.parse(localStorage.getItem('user'));
    var targetWishlist = parseInt($('#wishlist-modal-list .list-item.is-active').attr('data-wishlist-id'));
    var productId = parseInt($this.closest('.modal').attr('data-product-id'));
    var productName = $this.closest('.modal').attr('data-product-name');
    var productPrice = $this.closest('.modal').attr('data-product-price');
    var productImage = $this.closest('.modal').attr('data-product-image');
    var productCategory = $this.closest('.modal').attr('data-product-category');
    $this.addClass('is-loading'); //Logic to look for an item inside a given wishlist

    var found = userData.wishlists[targetWishlist].products.some(function (el) {
      return el.id === productId;
    }); //If item not found in the selected wishlist, add it

    if (!found) {
      userData.wishlists[targetWishlist].products.push({
        id: productId,
        name: productName,
        category: productCategory,
        price: productPrice,
        images: [{
          url: productImage
        }]
      });
      localStorage.setItem('user', JSON.stringify(userData));
      setTimeout(function () {
        $this.closest('.modal').removeClass('is-active');
        $this.removeClass('is-loading');
        loadWishlistsInModal();

        if (onceWishlist) {
          toasts.service.success('', 'fas fa-check', 'Product successfully added to wishlist', 'bottomRight', 2500);
          $('#existing-product-message').addClass('is-hidden');
          onceWishlist = true;
        }
      }, 1200);
    } //Else, tell the user that it alrady exists in the wishlist
    else {
        setTimeout(function () {
          $this.removeClass('is-loading');

          if (onceWishlist) {
            $('#existing-product-message').removeClass('is-hidden');
            onceWishlist = false;
          }
        }, 1200);
      }
  });
} //Get wishlists and display them in the add to wishlist modal


function loadWishlistsInModal() {
  var checkIcon = feather.icons.check.toSvg();
  var userData = JSON.parse(localStorage.getItem('user')); //If not logged in, hide wishlist

  if (userData.wishlists.length === 0) {
    $('#wishlist-modal-list, #wishlist-modal-list-placeholder').toggleClass('is-hidden');
  } //Load wishlists
  else {
      //Empty wishlists in modal
      $('#wishlist-modal-list ul li').remove();

      for (var i = 0; i < userData.wishlists.length; i++) {
        if (i == 0) {
          var template = "\n                    <li class=\"list-item is-active\" data-wishlist-id=\"" + userData.wishlists[i].id + "\">\n                        <div class=\"meta\">\n                            <span class=\"name\">" + userData.wishlists[i].name + "</span>\n                            <span class=\"count\"><var>" + userData.wishlists[i].products.length + "</var> Items</span>\n                        </div>\n                        <div class=\"selected-indicator\">\n                            " + checkIcon + "\n                        </div>\n                    </li>\n                ";
        } else {
          var template = "\n                    <li class=\"list-item\" data-wishlist-id=\"" + userData.wishlists[i].id + "\">\n                        <div class=\"meta\">\n                            <span class=\"name\">" + userData.wishlists[i].name + "</span>\n                            <span class=\"count\"><var>" + userData.wishlists[i].products.length + "</var> Items</span>\n                        </div>\n                        <div class=\"selected-indicator\">\n                            " + checkIcon + "\n                        </div>\n                    </li>\n                ";
        }

        $.when($('#wishlist-modal-list ul').append(template)).done(function () {
          initWishlistSelect();
        });
      }
    }
}

$(document).ready(function () {
  if ($('#shop-wishlist').length) {
    getWishlists();
    removeWishlistItem();
  } //Init add wishlist modal if any


  if ($('#new-wishlist').length) {
    addWishlist();
  } //Init add to wishlist modal if any


  if ($('#add-to-wishlist-modal').length) {
    loadWishlistsInModal();
  }
});