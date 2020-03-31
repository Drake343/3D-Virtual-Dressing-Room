"use strict";

$(document).ready(function () {
  "use strict"; //Elements selection

  $('.is-element-card .view-element a').on("click", function () {
    var scrollSpeed = 500;
    var element_id = $(this).attr('data-element');
    $('#elements-title, #elements-selection').addClass('is-hidden');
    $('.elements-back').removeClass('is-hidden');
    $("#" + element_id).removeClass('is-hidden');
    $("#" + element_id + "-title").removeClass('is-hidden'); //Back to top to start with the beginning of content

    $('html, body').animate({
      scrollTop: 0
    }, scrollSpeed);
    return false;
  }); //Back to elements selection

  $('.elements-back').on("click", function () {
    $(this).addClass('is-hidden');
    $('.is-element, .element-title').addClass('is-hidden');
    $('#elements-title, #elements-selection').removeClass('is-hidden');
  }); //Adding animation classes to cards

  $('.is-element, .element-title, #elements-title').addClass('animated preFadeInUp fadeInUp');
  $('.elements-back, #elements-selection').addClass('animated preFadeInLeft fadeInLeft'); //Validation inputs toggle

  $('#toggle-validation').on('click', function () {
    $('#success-input').toggleClass('has-success');
    $('#warning-input').toggleClass('has-warning');
    $('#error-input').toggleClass('has-error');
  }); // Iterate over each native select tot turn it into a custom select

  $('select.native').each(function () {
    // Cache the number of options
    var $this = $(this),
        numberOfOptions = $(this).children('option').length; // Hides the select element

    $this.addClass('s-hidden'); // Wrap the select element in a div

    $this.wrap('<div class="select"></div>'); // Insert a styled div to sit over the top of the hidden select element

    $this.after('<div class="styledSelect"></div>'); // Cache the styled div

    var $styledSelect = $this.next('div.styledSelect'); // Show the first select option in the styled div

    $styledSelect.text($this.children('option').eq(0).text()); // Insert an unordered list after the styled div and also cache the list

    var $list = $('<ul />', {
      'class': 'options'
    }).insertAfter($styledSelect); // Insert a list item into the unordered list for each select option

    for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val()
      }).appendTo($list);
    } // Cache the list items


    var $listItems = $list.children('li'); // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)

    $styledSelect.on('click', function (e) {
      e.stopPropagation();
      $('div.styledSelect.active').each(function () {
        $(this).removeClass('active').next('ul.options').hide();
      });
      $(this).toggleClass('active').next('ul.options').toggle();
    }); // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
    // Updates the select element to have the value of the equivalent option

    $listItems.on('click', function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $list.hide();
      /* alert($this.val()); Uncomment this for demonstration! */
    }); // Hides the unordered list when clicking outside of it

    $(document).on('click', function () {
      $styledSelect.removeClass('active');
      $list.hide();
    });
  }); //Basic autocomplete

  if ($('#basic-autocpl, #icon-autocpl').length) {
    var options = {
      url: "assets/data/persons.json",
      getValue: function getValue(element) {
        return element.name;
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
        }
      }
    };
    $("#basic-autocpl, #icon-autocpl").easyAutocomplete(options);
  } //Description autocomplete


  if ($('#desc-autocpl').length) {
    var options = {
      url: "assets/data/persons.json",
      getValue: function getValue(element) {
        return element.name;
      },
      template: {
        type: "description",
        fields: {
          description: "position"
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
        }
      }
    };
    $("#desc-autocpl").easyAutocomplete(options);
  } //Users autocomplete


  if ($('#users-autocpl').length) {
    var usersOptions = {
      url: "assets/data/persons.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><img class=" + 'autocpl-avatar' + " src='" + item.pic + "' /><div class=" + 'entry-text' + ">" + value + "<br><span>" + item.email + "</span></div></div> ";
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
    $("#users-autocpl").easyAutocomplete(usersOptions);
  } //Products autocomplete


  if ($('#products-autocpl').length) {
    var productsOptions = {
      url: "assets/data/products.json",
      getValue: "name",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><img class=" + 'autocpl-product' + " src='" + item.pic + "' /><div class=" + 'entry-text' + ">" + value + "<br><span>" + item.sku + "</span></div></div> ";
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
    $("#products-autocpl").easyAutocomplete(productsOptions);
  } //Orders autocomplete


  if ($('#orders-autocpl').length) {
    var ordersOptions = {
      url: "assets/data/orders.json",
      getValue: "status",
      template: {
        type: "custom",
        method: function method(value, item) {
          return "<div class=" + 'template-wrapper' + "><img class=" + 'autocpl-product' + " src='" + item.products[0].photoUrl + "' /><div class=" + 'entry-text' + ">" + value + "<br><span>ORDER-" + item.id + "</span></div></div> ";
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
    $("#orders-autocpl").easyAutocomplete(ordersOptions);
  } //Spinner


  $(".basic-spinner").InputSpinner({
    // button text/icons
    decrementButton: "<i data-feather=" + 'minus-circle' + "></i>",
    incrementButton: "<i data-feather=" + 'plus-circle' + "></i>",
    // class of input group
    groupClass: "spinner-control",
    // button class
    buttonsClass: "spinner-button",
    // text alignment
    textAlign: "center",
    // delay in milliseconds
    autoDelay: 500,
    // interval in milliseconds
    autoInterval: 100,
    // boost after these steps
    boostThreshold: 15,
    // boost multiplier
    boostMultiplier: 2,
    // detects the local from `navigator.language`, if null
    locale: null
  }); //datepicker

  $('[data-toggle="datepicker"]').datepicker();
});