"use strict"; //Get and populate orders grid

function getOrdersGrid() {
  var userData = JSON.parse(localStorage.getItem('user'));
  var primaryColor;
  var modifierClass;
  var icon;
  var truckIcon = feather.icons.truck.toSvg();
  var clockIcon = feather.icons.clock.toSvg();
  var checkIcon = feather.icons.check.toSvg();
  var packageIcon = feather.icons.package.toSvg();
  var ccIcon = feather.icons['credit-card'].toSvg();
  var blockedIcon = feather.icons['alert-octagon'].toSvg(); //If not logged in, hide account

  if (!userData.isLoggedIn) {
    $('#orders-main, #orders-main-placeholder').toggleClass('is-hidden');
  } else if (userData.orders.length === 0) {
    $('#orders-main, #orders-empty-placeholder').toggleClass('is-hidden');
  } //Load orders
  else {
      //Remove orders
      $('#orders-main .column').remove(); //Loop orders

      for (var i = 0; i < userData.orders.length; i++) {
        //Apply status color
        if (userData.orders[i].status === 'New') {
          primaryColor = '#00b289';
          modifierClass = 'is-success';
          icon = packageIcon;
        } else if (userData.orders[i].status === 'Shipping') {
          primaryColor = '#0023ff';
          modifierClass = 'is-primary';
          icon = truckIcon;
        } else if (userData.orders[i].status === 'Complete') {
          primaryColor = '#0023ff';
          modifierClass = 'is-primary';
          icon = checkIcon;
        } else if (userData.orders[i].status === 'Preparing') {
          primaryColor = '#00b289';
          modifierClass = 'is-success';
          icon = packageIcon;
        } else if (userData.orders[i].status === 'Processing') {
          primaryColor = '#eda514';
          modifierClass = 'is-warning';
          icon = ccIcon;
        } else if (userData.orders[i].status === 'Blocked') {
          primaryColor = '#FF7273';
          modifierClass = 'is-danger';
          icon = blockedIcon;
        }

        var template = "\n                <div class=\"column is-4\">\n                    <div class=\"flat-card order-card has-popover-top\" data-order-id=\"" + userData.orders[i].id + "\">\n                        <div class=\"order-info\">\n                            <span><a class=\"order-details-link\" onclick=\"return true\">ORDER-" + userData.orders[i].id + "</a></span>\n                            <span class=\"tag " + modifierClass + "\">" + userData.orders[i].status + "</span>\n                        </div>\n                        <!-- Progress Circle -->\n                        <div class=\"circle-chart-wrapper\">\n                            <svg class=\"circle-chart\" viewbox=\"0 0 33.83098862 33.83098862\" width=\"140\" height=\"140\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <circle class=\"circle-chart-background\" stroke=\"#efefef\" stroke-width=\"2\" fill=\"none\" cx=\"16.91549431\" cy=\"16.91549431\" r=\"15.91549431\" />\n                                <circle class=\"circle-chart-circle\" stroke=\"" + primaryColor + "\" stroke-width=\"2\" stroke-dasharray=\"" + userData.orders[i].completed + ",100\" stroke-linecap=\"round\" fill=\"none\" cx=\"16.91549431\" cy=\"16.91549431\" r=\"15.91549431\" />\n                            </svg>\n                            <!-- Icon -->\n                            <div class=\"chart-icon\">\n                                " + icon + "\n                            </div>\n                            <!-- Label -->\n                            <div class=\"ring-title has-text-centered\">\n                                <span>" + userData.orders[i].completed + "% Complete</span>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"webui-popover-content\">\n                        <!-- Popover Block -->\n                        <div class=\"popover-flex-block\">\n                            <img class=\"staff-avatar\" src=\"http://via.placeholder.com/250x250\" data-demo-src=\"" + userData.orders[i].contact.photoUrl + "\" alt=\"\">\n                            <div class=\"content-block\">\n                                <label>Order handled by</label>\n                                <span>" + userData.orders[i].contact.name + "</span>\n                            </div>\n                        </div>\n                        <!-- Popover Block -->\n                        <div class=\"popover-flex-block\">\n                            <div class=\"icon-block\">\n                                " + clockIcon + "\n                            </div>\n                            <div class=\"content-block\">\n                                <label>Ordered on</label>\n                                <span>" + userData.orders[i].date + "</span>\n                            </div>\n                        </div>\n                        <!-- Popover Block -->\n                        <div class=\"popover-flex-block\">\n                            <div class=\"icon-block\">\n                                " + ccIcon + "\n                            </div>\n                            <div class=\"content-block\">\n                                <label>Order Total</label>\n                                <span>" + userData.orders[i].total + "</span>\n                            </div>\n                        </div>\n                        <!-- Popover Block -->\n                        <div class=\"popover-flex-block\">\n                            <div class=\"icon-block\">\n                                " + truckIcon + "\n                            </div>\n                            <div class=\"content-block\">\n                                <label>Shipping Method</label>\n                                <span>" + userData.orders[i].shippingMethod + "</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            ";
        $.when($('#orders-main').append(template)).done(function () {
          initPopovers(); //Hide Loader

          $('.account-loader').addClass('is-hidden'); //Init Order details

          initOrderDetailsLinks();
        });
      }
    }
} //Get and populate orders List


function getOrdersList() {
  var userData = JSON.parse(localStorage.getItem('user'));
  var primaryColor;
  var modifierClass;
  var icon;
  var truckIcon = feather.icons.truck.toSvg();
  var clockIcon = feather.icons.clock.toSvg();
  var checkIcon = feather.icons.check.toSvg();
  var packageIcon = feather.icons.package.toSvg();
  var ccIcon = feather.icons['credit-card'].toSvg();
  var blockedIcon = feather.icons['alert-octagon'].toSvg();
  var supportIcon = feather.icons['life-buoy'].toSvg(); //If not logged in, hide account

  if (!userData.isLoggedIn) {
    $('#orders-main, #orders-main-placeholder').toggleClass('is-hidden');
  } else if (userData.orders.length === 0) {
    $('#orders-main, #orders-empty-placeholder').toggleClass('is-hidden');
  } //Load orders
  else {
      //Remove orders
      $('#orders-main .order-long-card').remove(); //Loop orders

      for (var i = 0; i < userData.orders.length; i++) {
        //Apply status color
        if (userData.orders[i].status === 'Shipping') {
          primaryColor = '#0023ff';
          modifierClass = 'is-primary';
          icon = truckIcon;
        } else if (userData.orders[i].status === 'Complete') {
          primaryColor = '#0023ff';
          modifierClass = 'is-primary';
          icon = checkIcon;
        } else if (userData.orders[i].status === 'Preparing') {
          primaryColor = '#00b289';
          modifierClass = 'is-success';
          icon = packageIcon;
        } else if (userData.orders[i].status === 'Processing') {
          primaryColor = '#eda514';
          modifierClass = 'is-warning';
          icon = ccIcon;
        } else if (userData.orders[i].status === 'Blocked') {
          primaryColor = '#FF7273';
          modifierClass = 'is-danger';
          icon = blockedIcon;
        }

        var template = "\n                <div class=\"order-long-card\" data-order-id=\"" + userData.orders[i].id + "\">\n                    <div class=\"left-side\">\n                        <div class=\"order-header\">\n                            <h3>ORDER " + userData.orders[i].id + "</h3>\n                            <span class=\"date\">" + userData.orders[i].date + "</span>\n                            <span class=\"tag is-primary\">" + userData.orders[i].status + "</span>\n                            <span class=\"order-total\">" + userData.orders[i].total + "</span>\n                        </div>\n                        <div class=\"ordered-products has-slimscroll\">\n                            <!--Loader-->\n                            <div class=\"products-loader is-active\">\n                                <div class=\"loader is-loading\"></div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"right-side\">\n                        <img class=\"side-bg\" src=\"assets/img/logo/nephos-greyscale.svg\" alt=\"\">\n                        <div class=\"meta-header\">\n                            <img src=\"http://via.placeholder.com/250x250\" data-demo-src=\"" + userData.orders[i].contact.photoUrl + "\" alt=\"\">\n                            <div class=\"inner-meta\">\n                                <span>Handled by</span>\n                                <span>" + userData.orders[i].contact.name + "</span>\n                            </div>\n                            <a class=\"support\">\n                                " + supportIcon + "\n                            </a>\n                        </div>\n\n                        <div class=\"meta-actions\">\n                            <a class=\"button is-rounded is-fullwidth primary-button raised order-details-link\">Order Details</a>\n                            <a class=\"button is-rounded is-fullwidth grey-button rounded\">Invoice</a>\n                        </div>\n                    </div>\n                </div>\n            ";
        $.when($('#orders-main .column.is-12').append(template)).done(function () {
          //Hide Loader
          $('.account-loader').addClass('is-hidden');
        });
      } //Load products for each order


      loadOrdersListProducts(); //Init Order details

      initOrderDetailsLinks();
    }
} //Populate inner product lists in order lists


function loadOrdersListProducts() {
  var userData = JSON.parse(localStorage.getItem('user'));
  $('.order-long-card').each(function () {
    var $this = $(this);
    var orderId = parseInt($this.attr('data-order-id'));
    var $container = $this.find('.ordered-products');
    var products;

    for (var i = 0; i < userData.orders.length; i++) {
      if (userData.orders[i].id == orderId) {
        products = userData.orders[i].products;
      }
    }

    for (var p = 0; p < products.length; p++) {
      var template = "\n                        <div class=\"ordered-product\">\n                            <img src=\"http://via.placeholder.com/250x250\" data-demo-src=\"" + products[p].photoUrl + "\" alt=\"\">\n                            <div class=\"product-meta\">\n                                <span class=\"name\">" + products[p].name + "</span>\n                                <span class=\"price\">\n                                    <span>" + parseFloat(products[p].price).toFixed(2) + "</span>\n                                    <span>x <var>" + products[p].quantity + "</var></span>\n                                </span>\n                            </div>\n                            <div class=\"product-subtotal\">\n                                <span>Total</span>\n                                <span>" + (parseFloat(products[p].price) * parseFloat(products[p].quantity)).toFixed(2) + "</span>\n                            </div>\n                        </div>\n                    ";
      $.when($container.append(template)).done(function () {
        $this.find('.products-loader').removeClass('is-active');
      });
    }
  });
}

$(document).ready(function () {
  //If orders grid page
  if ($('#orders-grid').length) {
    getOrdersGrid();
  } //If orders list page


  if ($('#orders-list').length) {
    getOrdersList();
  }
});