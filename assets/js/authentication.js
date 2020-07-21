"use strict"; //Guest user object

var user = {
  isLoggedIn: false,
  firstName: null,
  lastName: null,
  email: null,
  photoUrl: 'assets/img/avatars/altvatar.png'
}; //Fake account objects

var ahmed = {
  isLoggedIn: true,
  firstName: 'Ahmed',
  lastName: 'Osama',
  email: 'Ahmedosama@gmail.com',
  phone: "01005590109",
  photoUrl: 'assets/img/team/ahmed.jpg',
  wishlists: myWishlists,
  orders: myOrders,
  addresses: elieAddresses
};
var amora = {
  isLoggedIn: true,
  firstName: 'Amora',
  lastName: 'Goda',
  email: 'Amoragoda@gmail.com',
  phone: null,
  photoUrl: 'assets/img/team/amora.png',
  wishlists: myWishlists,
  orders: myOrders,
  addresses: johnAddresses
};
var basem = {
  isLoggedIn: true,
  firstName: 'Basem',
  lastName: 'Ghanem',
  email: 'Basemghanem@gmail.com',
  phone: "01025290097",
  photoUrl: 'assets/img/team/basem.jpeg',
  wishlists: myWishlists,
  orders: myOrders,
  addresses: samanthaAddresses
};
var noura = {
  isLoggedIn: true,
  firstName: 'Noura',
  lastName: 'Gomaa',
  email: 'Nouragomaa@gmail.com',
  phone: null,
  photoUrl: 'assets/img/team/noura.png',
  wishlists: myWishlists,
  orders: myOrders,
  addresses: arthurAddresses
}; 
var omar = {
  isLoggedIn: true,
  firstName: 'Omar',
  lastName: 'Fathy',
  email: 'OmarMFathy219@gmail.com',
  phone: "01026734847",
  photoUrl: 'assets/img/team/omar.jpg',
  wishlists: myWishlists,
  orders: myOrders,
  addresses: arthurAddresses
};
//If no logged in user is found, set the default guest user object

if (JSON.parse(localStorage.getItem('user')) === null) {
  localStorage.setItem('user', JSON.stringify(user));
} //Get logged user info


function getUser() {
  var data = JSON.parse(localStorage.getItem('user')); //Populate user areas

  $('#quickview-avatar').attr('src', data.photoUrl);
  $('#quickview-avatar').attr('data-demo-src', data.photoUrl);
  $('#review-modal .box-header img, #mobile-avatar').attr('src', data.photoUrl);
  $('#review-modal .box-header img, #mobile-avatar').attr('data-demo-src', data.photoUrl);

  if (data.firstName !== null) {
    $('#quickview-username, #mobile-username').html(data.firstName + ' ' + data.lastName);
  } else {
    $('#quickview-username').html('Guest');
    $('#mobile-username').html('Welcome, Guest');
  }

  if (!data.isLoggedIn) {
    $('#logout-link, #mobile-logout-link').addClass('is-hidden');
    $('#login-link, #mobile-login-link, #mobile-register-link').removeClass('is-hidden');
  } else {
    $('#login-link, #mobile-login-link, #mobile-register-link').addClass('is-hidden');
    $('#logout-link, #mobile-logout-link').removeClass('is-hidden');
  }
} //Initialize login / registration forms


function initAuthenticationForms() {
  //Toggle login and registration wrappers
  $('.auth-toggler input').on('change', function () {
    if ($(this).prop('checked')) {
      $('.login-form-wrapper, .registration-form-wrapper').toggleClass('is-hidden');
      $('.reset-form').addClass('is-hidden');
      $('.login-form').removeClass('is-hidden');
      $('#auth-main-title').html('REGISTER');
    } else {
      $('.login-form-wrapper, .registration-form-wrapper').toggleClass('is-hidden');
      $('.reset-form').addClass('is-hidden');
      $('.login-form').removeClass('is-hidden');
      $('#auth-main-title').html('LOGIN');
    }
  }); //Toggle login and reset form

  $('.login-form .forgot-link a').on('click', function () {
    $('.login-form, .reset-form').toggleClass('is-hidden');
    $('#auth-main-title').html('FORGOT PASSWORD');
  });
  $('.reset-form .back-link a').on('click', function () {
    $('.login-form, .reset-form').toggleClass('is-hidden');
    $('#auth-main-title').html('LOGIN');
  });
} //Email regex


function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }

  console.log("You have entered an invalid email address!");
  return false;
} //Input value length check


function ValidateLength(value, length) {
  if (value.length >= length) {
    return true;
  } else {
    console.log("You didn't enter enough characters!");
    return false;
  }
} //Fake login function


function fakeLogin() {
  //Email validation example
  $('#login-email').on('change', function () {
    var $this = $(this);
    var email = $this.val().trim();

    if (!ValidateEmail(email)) {
      $this.closest('.field').addClass('has-error');
    } else {
      $this.closest('.field').removeClass('has-error');
    }
  }); //Password Length validation example

  $('#login-password').on('change', function () {
    var $this = $(this);
    var password = $this.val().trim();

    if (!ValidateLength(password, 8)) {
      $this.closest('.field').addClass('has-error');
    } else {
      $this.closest('.field').removeClass('has-error');
    }
  }); //Login with one of the fake accounts

  $('#login-submit').on('click', function () {
    var redirectOrigin = $.urlParam('origin');
    var $this = $(this);
    var emailValue = $('#login-email').val();
    var passwordValue = $('#login-password').val();
    $this.addClass('is-loading');
    $('.small-auth-loader').addClass('is-active');

    if (emailValue === 'Ahmedosama@gmail.com' && passwordValue === 'Ahmed123') {
      setTimeout(function () {
        $this.removeClass('is-loading');
        var data = ahmed;
        localStorage.setItem('user', JSON.stringify(data));
        toasts.service.success('', 'fas fa-check', 'Successfully logged in', 'bottomRight', 2000);
      }, 1200);
      setTimeout(function () {
        if (redirectOrigin === 'checkout') {
          window.location.href = '/checkout-step1.html';
        } else {
          window.location.href = '/shop.html';
        }
      }, 3200);
    } else if (emailValue === 'Amoragoda@gmail.com' && passwordValue === 'Amora123') {
      setTimeout(function () {
        $this.removeClass('is-loading');
        var data = amora;
        localStorage.setItem('user', JSON.stringify(data));
        toasts.service.success('', 'fas fa-check', 'Successfully logged in', 'bottomRight', 2000);
      }, 1200);
      setTimeout(function () {
        if (redirectOrigin === 'checkout') {
          window.location.href = '/checkout-step1.html';
        } else {
          window.location.href = '/shop.html';
        }
      }, 3200);
    } else if (emailValue === 'Basemghanem@gmail.com' && passwordValue === 'Basem123') {
      setTimeout(function () {
        $this.removeClass('is-loading');
        var data = basem;
        localStorage.setItem('user', JSON.stringify(data));
        toasts.service.success('', 'fas fa-check', 'Successfully logged in', 'bottomRight', 2000);
      }, 1200);
      setTimeout(function () {
        if (redirectOrigin === 'checkout') {
          window.location.href = '/checkout-step1.html';
        } else {
          window.location.href = '/shop.html';
        }
      }, 3200);
    } else if (emailValue === 'OmarMFathy219@gmail.com' && passwordValue === 'Omar123') {
      setTimeout(function () {
        $this.removeClass('is-loading');
        var data = omar;
        localStorage.setItem('user', JSON.stringify(data));
        toasts.service.success('', 'fas fa-check', 'Successfully logged in', 'bottomRight', 2000);
      }, 1200);
      setTimeout(function () {
        if (redirectOrigin === 'checkout') {
          window.location.href = '/checkout-step1.html';
        } else {
          window.location.href = '/shop.html';
        }
      }, 3200);
    } else if (emailValue === 'Nouragomaa@gmail.com' && passwordValue === 'Noura123') {
      setTimeout(function () {
        $this.removeClass('is-loading');
        var data = noura;
        localStorage.setItem('user', JSON.stringify(data));
        toasts.service.success('', 'fas fa-check', 'Successfully logged in', 'bottomRight', 2000);
      }, 1200);
      setTimeout(function () {
        if (redirectOrigin === 'checkout') {
          window.location.href = '/checkout-step1.html';
        } else {
          window.location.href = '/shop.html';
        }
      }, 3200);
    } else {
      setTimeout(function () {
        $this.removeClass('is-loading');
        toasts.service.error('', 'fas fa-meh', 'Couldn\'t find an account matching those credentials', 'bottomRight', 2800);
      }, 800);
    }
  });
} //Logout function


function fakeLogout() {
  $('#logout-link, #mobile-logout-link').on('click', function () {
    $('.small-auth-loader').addClass('is-active');
    localStorage.removeItem('user');
    setTimeout(function () {
      toasts.service.success('', 'fas fa-check', 'Successfully logged out', 'bottomRight', 2000);
    }, 600);
    setTimeout(function () {
      window.location.href = '/home.html';
    }, 2600);
  });
} //Accounts panel (Demo: do not use in production)


function fakeAccountsPanel() {
  //Fake accounts panel
  $('.login-accounts-trigger, .login-accounts-panel .close-button').on('click', function () {
    $('.login-accounts-trigger, .login-accounts-panel').toggleClass('is-active');
  }); //Prepopulate login form on click

  $('.login-accounts-panel .login-block').on('click', function () {
    var email = $(this).find('.fake-email').text();
    var password = $(this).find('.fake-password').text();
    $('#login-email').val(email);
    $('#login-password').val(password);
  }); //Auto open

  setTimeout(function () {
    $('.login-accounts-trigger').trigger('click');
  }, 2500);
} //Redirect logged use to shop if tries to view login or registration


$(window).on('load', function () {
  var url = window.location.href;
  var userData = JSON.parse(localStorage.getItem('user'));

  if (url.indexOf("/authentication.html") > -1) {
    //If logged in, redirect
    if (userData.isLoggedIn) {
      window.location.href = '/shop.html';
    }
  } else {
    console.log('something');
  }
});
$(document).ready(function () {
  initAuthenticationForms();
  getUser();
  fakeLogin();
  fakeLogout();
  fakeAccountsPanel();
});