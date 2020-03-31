"use strict"; //Get order Id parameter from query string

var orderId = parseInt($.urlParam('orderId')); //Get order json details, passing the Id as parameter

function getOrder(orderId) {
  var userData = JSON.parse(localStorage.getItem('user'));
  $.ajax({
    url: 'assets/data/orders.json',
    async: true,
    dataType: 'json',
    success: function success(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === orderId) {
          console.log('DATA', data[i]); //Populate basic data

          $('#order-details-id var').html(data[i].id);
          $('#order-details-date var').html(data[i].date);
          $('#order-details-avatar').attr('src', 'http://via.placeholder.com/250x250');
          $('#order-details-avatar').attr('data-demo-src', data[i].contact.photoUrl);
          $('#order-details-contact').html(data[i].contact.name); //Payment tile

          if (data[i].paymentStatus === 'Paid') {
            $('#payment-tile').addClass('is-done');
          } else if (data[i].paymentStatus === 'Pending') {
            $('#payment-tile').addClass('has-warning');
          }

          $('#payment-tile span:nth-child(3)').html(data[i].paymentMethod);
          $('#payment-tile span:nth-child(2)').html(data[i].paymentStatus); //Shipping tile

          if (data[i].shippingTrackingId === null) {
            $('#shipping-tile span:nth-child(3)').html('Not shipped yet');
          } else {
            $('#shipping-tile').addClass('is-done');
            $('#shipping-tile span:nth-child(3) a').html(data[i].shippingTrackingId);
          }

          $('#shipping-tile span:nth-child(2)').html(data[i].shippingMethod); //Status tile

          if (data[i].status === 'Complete') {
            $('#status-tile').addClass('is-done');
          }

          $('#status-tile span:nth-child(2)').html(data[i].status); //Shipping Address

          var shippingAddressCode;

          if (userData.addresses[1].disabled === true) {
            shippingAddressCode = 0;
          } else {
            shippingAddressCode = data[i].shippingAddressId;
          }

          $('#shipping-address1').html(userData.addresses[shippingAddressCode].address1);
          $('#shipping-address2').html(userData.addresses[shippingAddressCode].address2);
          $('#shipping-city').html(userData.addresses[shippingAddressCode].city);
          $('#shipping-state').html(userData.addresses[shippingAddressCode].state);
          $('#shipping-postalCode').html(userData.addresses[shippingAddressCode].postalCode);
          $('#shipping-country').html(userData.addresses[shippingAddressCode].country); //Billing Address

          var billingAddressCode = data[i].billingAddressId;
          $('#billing-address1').html(userData.addresses[billingAddressCode].address1);
          $('#billing-address2').html(userData.addresses[billingAddressCode].address2);
          $('#billing-city').html(userData.addresses[billingAddressCode].city);
          $('#billing-state').html(userData.addresses[billingAddressCode].state);
          $('#billing-postalCode').html(userData.addresses[billingAddressCode].postalCode);
          $('#billing-country').html(userData.addresses[billingAddressCode].country); //Totals

          $('#order-subtotal-value').html(data[i].orderModel.subtotal.toFixed(2));
          $('#order-shipping-value').html(data[i].orderModel.shipping.toFixed(2));
          $('#order-tax-value').html(data[i].orderModel.taxes.toFixed(2));
          $('#order-grandtotal-value').html(data[i].orderModel.total.toFixed(2)); //Products

          $('.flex-table .flex-table-item').remove();

          for (var p = 0; p < data[i].products.length; p++) {
            var template = "\n                            <div class=\"flex-table-item product-container\" data-product-id=\"" + data[i].products[p].id + "\">\n                                <div class=\"product\">\n                                    <img src=\"http://via.placeholder.com/250x250\" data-demo-src=\"" + data[i].products[p].photoUrl + "\" alt=\"\">\n                                    <a class=\"product-details-link product-name\">" + data[i].products[p].name + "</a>\n                                </div>\n                                <div class=\"quantity\">\n                                    <span>" + data[i].products[p].quantity + "</span>\n                                </div>\n                                <div class=\"price\">\n                                    <span class=\"has-price\">" + data[i].products[p].price.toFixed(2) + "</span>\n                                </div>\n                                <div class=\"discount\">\n                                    <span class=\"has-price\">0</span>\n                                </div>\n                                <div class=\"total\">\n                                    <span class=\"has-price\">" + (data[i].products[p].price * data[i].products[p].quantity).toFixed(2) + "</span>\n                                </div>\n                            </div>\n                        ";
            $.when($('.flex-table').append(template)).done(function () {
              //Make product links clickable
              initOrderDetailsLinks();
            });
          }
        }
      }
    }
  });
}

$(document).ready(function () {
  if ($('#order-details').length) {
    //Get product details
    getOrder(orderId);
  }
});