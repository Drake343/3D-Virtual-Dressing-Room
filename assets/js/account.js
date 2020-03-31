"use strict"; //Shipping address state global variable

var enableShippingAddress = false; //Get account information

function getAccountInfo() {
  var userData = JSON.parse(localStorage.getItem('user')); //If not logged in, hide account

  if (!userData.isLoggedIn) {
    $('#account-main, #account-main-placeholder').toggleClass('is-hidden');
  } //Load account info
  else {
      //Photo
      $('.profile-image').empty();
      var avatar = "\n        <img src=\"http://via.placeholder.com/250x250\" data-demo-src=\"" + userData.photoUrl + "\" alt=\"\">\n    ";
      $('.profile-image').append(avatar); //User Info

      $('#account-first-name').html(userData.firstName);
      $('#account-last-name').html(userData.lastName);
      $('#full-name').html(userData.firstName + ' ' + userData.lastName);
      $('#account-email, #full-email').html(userData.email);

      if (userData.phone !== null) {
        $('#account-phone-number').html(userData.phone);
      } else {
        $('#account-phone-number').html('N/A');
      } //Billing address


      $('#account-billing-address .address1').html(userData.addresses[0].address1);
      $('#account-billing-address .address2').html(userData.addresses[0].address2);
      $('#account-billing-address .city').html(userData.addresses[0].city);
      $('#account-billing-address .postal-code').html(userData.addresses[0].postalCode);
      $('#account-billing-address .state').html(userData.addresses[0].state);
      $('#account-billing-address .country').html(userData.addresses[0].country); //Shipping address (if enabled)

      if (userData.addresses[1].disabled === false) {
        $('#account-shipping-address .address1').html(userData.addresses[1].address1);
        $('#account-shipping-address .address2').html(userData.addresses[1].address2);
        $('#account-shipping-address .city').html(userData.addresses[1].city);
        $('#account-shipping-address .postal-code').html(userData.addresses[1].postalCode);
        $('#account-shipping-address .state').html(userData.addresses[1].state);
        $('#account-shipping-address .country').html(userData.addresses[1].country);
        $('#account-shipping-address').removeClass('is-hidden');
      } //Hide Loader


      $('.account-loader').addClass('is-hidden');
    }
} //Get account edit data


function getEditAccountInfo() {
  var userData = JSON.parse(localStorage.getItem('user')); //If not logged in, hide account

  if (!userData.isLoggedIn) {
    $('#account-edit-main, #account-edit-main-placeholder').toggleClass('is-hidden');
  } //Load account edit info
  else {
      //Photo
      $('.avatar-wrapper .profile-pic').remove();
      var avatar = "\n        <img class=\"profile-pic\" src=\"http://via.placeholder.com/250x250\" data-demo-src=\"" + userData.photoUrl + "\" alt=\"\">\n    ";
      $('.avatar-wrapper').prepend(avatar); //User Info

      $('#edit-first-name').val(userData.firstName);
      $('#edit-last-name').val(userData.lastName);
      $('#edit-email').val(userData.email);
      $('#full-name').html(userData.firstName + ' ' + userData.lastName);
      $('#full-email').html(userData.email);

      if (userData.phone !== null) {
        $('#edit-phone-number').val(userData.phone);
      } else {
        $('#edit-phone-number').val('');
      } //Billing address


      $('#billing-edit-address1').val(userData.addresses[0].address1);
      $('#billing-edit-address2').val(userData.addresses[0].address2);
      $('#billing-edit-city').val(userData.addresses[0].city);
      $('#billing-edit-postal-code').val(userData.addresses[0].postalCode);
      $('#billing-edit-state').val(userData.addresses[0].state);
      $('#billing-edit-country').val(userData.addresses[0].country); //Shipping address

      $('#shipping-edit-address1').val(userData.addresses[1].address1);
      $('#shipping-edit-address2').val(userData.addresses[1].address2);
      $('#shipping-edit-city').val(userData.addresses[1].city);
      $('#shipping-edit-postal-code').val(userData.addresses[1].postalCode);
      $('#shipping-edit-state').val(userData.addresses[1].state);
      $('#shipping-edit-country').val(userData.addresses[1].country);

      if (userData.addresses[1].disabled === false) {
        $('#shipping-switch').trigger('click');
        enableShippingAddress = true;
        $('.profile-info-card .card-body').removeClass('is-disabled');
      } //Hide Loader


      $('.account-loader').addClass('is-hidden');
    }
} //Save user info


function saveAccountInfo() {
  var userData = JSON.parse(localStorage.getItem('user'));
  $('#save-account-button').on('click', function () {
    var $this = $(this);
    $this.addClass('is-loading');
    userData.photoUrl = $('.profile-pic').attr('src');
    userData.firstName = $('#edit-first-name').val();
    userData.lastName = $('#edit-last-name').val();
    userData.email = $('#edit-email').val();
    userData.phone = $('#edit-phone-number').val(); //Billing Address

    userData.addresses[0].address1 = $('#billing-edit-address1').val();
    userData.addresses[0].address2 = $('#billing-edit-address2').val();
    userData.addresses[0].city = $('#billing-edit-city').val();
    userData.addresses[0].postalCode = $('#billing-edit-postal-code').val();
    userData.addresses[0].state = $('#billing-edit-state').val();
    userData.addresses[0].country = $('#billing-edit-country').val(); //Shipping Address

    if (enableShippingAddress) {
      userData.addresses[1].address1 = $('#shipping-edit-address1').val();
      userData.addresses[1].address2 = $('#shipping-edit-address2').val();
      userData.addresses[1].city = $('#shipping-edit-city').val();
      userData.addresses[1].postalCode = $('#shipping-edit-postal-code').val();
      userData.addresses[1].state = $('#shipping-edit-state').val();
      userData.addresses[1].country = $('#shipping-edit-country').val();
      userData.addresses[1].disabled = false;
    } else {
      userData.addresses[1].disabled = true;
    }

    setTimeout(function () {
      localStorage.setItem('user', JSON.stringify(userData));
      $this.removeClass('is-loading');
      toasts.service.success('', 'fas fa-check', 'Changes saved successfully', 'bottomRight', 2500);
    }, 1500);
    setTimeout(function () {
      getUser();
    }, 4000);
  });
} //Fake field validation


function fakeValidation() {
  $('.fake-validation').on('change', function () {
    var $this = $(this);

    if ($this.val().length < 2) {
      $this.closest('.field').addClass('has-error');
      $('#save-account-button').addClass('no-click');
    } else {
      $this.closest('.field').removeClass('has-error');
      $('#save-account-button').removeClass('no-click');
    }
  });
  $('.fake-email-validation').on('change', function () {
    var $this = $(this);

    if (!ValidateEmail($this.val())) {
      $this.closest('.field').addClass('has-error');
      $('#save-account-button').addClass('no-click');
    } else {
      $this.closest('.field').removeClass('has-error');
      $('#save-account-button').removeClass('no-click');
    }
  });
} //Upload profile picture


function uploadProfilePicture() {
  var imgSrc = '';

  function readFile(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $uploadCrop.croppie('bind', {
          url: e.target.result
        }).then(function () {
          imgSrc = e.target.result;
          console.log('jQuery bind complete');
        });
      };

      reader.readAsDataURL(input.files[0]);
    } else {
      swal("Sorry - you're browser doesn't support the FileReader API");
    }
  } //Use croppie plugin


  var $uploadCrop = $('#upload-profile').croppie({
    enableExif: true,
    url: 'assets/img/avatars/altvatar.png',
    viewport: {
      width: 130,
      height: 130,
      type: 'circle'
    },
    boundary: {
      width: '100%',
      height: 300
    }
  }); //Show preview

  function popupResult(result) {
    var html;

    if (result.html) {
      html = result.html;
    }

    if (result.src) {
      html = '<img src="' + result.src + '" />';
      $('.profile-pic').attr('src', result.src);
      $('#submit-profile-picture').removeClass('is-loading');
      $('#upload-crop-modal').removeClass('is-active');
    }
  }

  $('#upload-profile-picture').on('change', function () {
    readFile(this);
    $(this).closest('.modal').find('.profile-uploader-box, .upload-demo-wrap, .profile-reset').toggleClass('is-hidden');
    $('#submit-profile-picture').removeClass('is-disabled');
  }); //Submit

  $('#submit-profile-picture').on('click', function (ev) {
    var $this = $(this);
    $this.addClass('is-loading');
    $uploadCrop.croppie('result', {
      type: 'canvas',
      size: 'viewport'
    }).then(function (resp) {
      popupResult({
        src: resp
      });
    });
  }); //Reset

  $('#profile-upload-reset').on('click', function () {
    $(this).addClass('is-hidden');
    $('.profile-uploader-box, .upload-demo-wrap').toggleClass('is-hidden');
    $('#submit-profile-picture').addClass('is-disabled');
    $('#upload-profile-picture').val('');
  });
} //Countries autocomplete


function initCountryAutocomplete() {
  var accountCountriesOptions = {
    url: "https://restcountries.eu/rest/v2/all",
    getValue: "name",
    template: {
      type: "custom",
      method: function method(value, item) {
        return "<div class=" + 'template-wrapper' + "><img class=" + 'autocpl-country' + " src='" + item.flag + "' /><div class=" + 'entry-text' + ">" + value + "<br><span>" + item.region + "</span></div></div> ";
      }
    },
    highlightPhrase: false,
    list: {
      maxNumberOfElements: 3,
      showAnimation: {
        type: "fade",
        //normal|slide|fade
        time: 400,
        callback: function callback() {}
      },
      match: {
        enabled: true
      }
    }
  };
  $(".country-autocpl").easyAutocomplete(accountCountriesOptions);
}

$(document).ready(function () {
  //If account page
  if ($('#account-page').length) {
    getAccountInfo();
  } //If account edit page


  if ($('#edit-account-page').length) {
    getEditAccountInfo();
    initPopButtons();
    fakeValidation();
    uploadProfilePicture();
    initCountryAutocomplete();
    saveAccountInfo(); //Address switch

    $('#shipping-switch').on('change', function () {
      var userData = JSON.parse(localStorage.getItem('user'));
      $(this).closest('.flat-card').find('.card-body').toggleClass('is-disabled');
      enableShippingAddress = !enableShippingAddress;
      console.log(enableShippingAddress);

      if (enableShippingAddress) {
        $('#shipping-edit-address1').val(userData.addresses[0].address1);
        $('#shipping-edit-address2').val(userData.addresses[0].address2);
        $('#shipping-edit-city').val(userData.addresses[0].city);
        $('#shipping-edit-postal-code').val(userData.addresses[0].postalCode);
        $('#shipping-edit-state').val(userData.addresses[0].state);
        $('#shipping-edit-country').val(userData.addresses[0].country);
      } else {
        $('#shipping-edit-address1').val('');
        $('#shipping-edit-address2').val('');
        $('#shipping-edit-city').val('');
        $('#shipping-edit-postal-code').val('');
        $('#shipping-edit-state').val('');
        $('#shipping-edit-country').val('');
      }
    });
  }
});