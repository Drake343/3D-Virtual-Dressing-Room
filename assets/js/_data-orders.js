"use strict";

var myOrders = [{
  id: 46985,
  total: 200.37,
  date: 'Aug 17 2019',
  status: 'Shipping',
  completed: 66,
  shippingMethod: 'UPS',
  orderModel: {
    subtotal: 130.25,
    taxes: 7.82,
    shipping: 62.30,
    total: 200.37
  },
  products: [{
    id: 1,
    name: 'Red Seat',
    price: 45.00,
    quantity: 1,
    photoUrl: 'assets/img/products/cosy-red-seat.png'
  }, {
    id: 4,
    name: 'Blue Seat',
    price: 35.00,
    quantity: 1,
    photoUrl: 'assets/img/products/blue-seat.png'
  }, {
    id: 6,
    name: 'Dark Seat',
    price: 50.25,
    quantity: 1,
    photoUrl: 'assets/img/products/dark-seat.jpg'
  }],
  contact: {
    name: 'Janet Smith',
    photoUrl: 'assets/img/avatars/janet.jpg'
  }
}, {
  id: 46878,
  total: 411.52,
  date: 'Jul 5 2019',
  status: 'Preparing',
  completed: 33,
  shippingMethod: 'FedEx',
  orderModel: {
    subtotal: 317.47,
    taxes: 19.04,
    shipping: 75.00,
    total: 411.52
  },
  products: [{
    id: 17,
    name: 'Rabbit Lamp',
    price: 14.49,
    quantity: 2,
    photoUrl: 'assets/img/products/kids2.jpg'
  }, {
    id: 19,
    name: 'Toy Boxes',
    price: 80.00,
    quantity: 1,
    photoUrl: 'assets/img/products/kids4.jpg'
  }, {
    id: 21,
    name: 'Treasure Chest',
    price: 185.00,
    quantity: 1,
    photoUrl: 'assets/img/products/kids7.jpg'
  }, {
    id: 22,
    name: 'Animals Set',
    price: 23.49,
    quantity: 1,
    photoUrl: 'assets/img/products/kids6.jpg'
  }],
  contact: {
    name: 'Mark Korsky',
    photoUrl: 'assets/img/avatars/marc.jpg'
  }
}, {
  id: 42135,
  total: 412.50,
  date: 'Jun 27 2019',
  status: 'Processing',
  completed: 23,
  shippingMethod: 'Ground',
  orderModel: {
    subtotal: 375.00,
    taxes: 22.50,
    shipping: 15.00,
    total: 412.50
  },
  products: [{
    id: 18,
    name: 'White Bed',
    price: 375.00,
    quantity: 1,
    photoUrl: 'assets/img/products/kids3.png'
  }],
  contact: {
    name: 'Lauren Hill',
    photoUrl: 'assets/img/avatars/lauren.png'
  }
}, {
  id: 39456,
  total: 1063.82,
  date: 'Jun 3 2019',
  status: 'Blocked',
  completed: 40,
  shippingMethod: 'Ground',
  orderModel: {
    subtotal: 947.00,
    taxes: 56.82,
    shipping: 60.00,
    total: 1063.82
  },
  products: [{
    id: 29,
    name: 'Styled Lamp',
    price: 178.00,
    quantity: 2,
    photoUrl: 'assets/img/products/access1.jpg'
  }, {
    id: 30,
    name: 'Golden Lamp',
    price: 178.00,
    quantity: 2,
    photoUrl: 'assets/img/products/access2.jpg'
  }, {
    id: 31,
    name: 'Aquarium',
    price: 235.00,
    quantity: 1,
    photoUrl: 'assets/img/products/access3.jpg'
  }],
  contact: {
    name: 'Mark Korsky',
    photoUrl: 'assets/img/avatars/marc.jpg'
  }
}, {
  id: 38246,
  total: 636.32,
  date: 'May 15 2019',
  status: 'Complete',
  completed: 100,
  shippingMethod: 'Ground',
  orderModel: {
    subtotal: 572.00,
    taxes: 34.32,
    shipping: 30.00,
    total: 636.32
  },
  products: [{
    id: 7,
    name: 'TV Furniture',
    price: 430.00,
    quantity: 1,
    photoUrl: 'assets/img/products/house1.png'
  }, {
    id: 25,
    name: 'Gentleman',
    price: 142.00,
    quantity: 1,
    photoUrl: 'assets/img/products/office7.gif'
  }],
  contact: {
    name: 'Janet Smith',
    photoUrl: 'assets/img/avatars/janet.jpg'
  }
}];