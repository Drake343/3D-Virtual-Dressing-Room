let showHeight = document.querySelector('.height-value')
let showBust = document.querySelector('.bust-value')
let showWaist = document.querySelector('.waist-value')
let showHips = document.querySelector('.hips-value')
let showInseam = document.querySelector('.inseam-value')

let finalySize = document.querySelector('.size-value')

let primaryButton = document.querySelector('.primaryButton')

showHeight.textContent = localStorage.getItem('heightValue')
showBust.textContent = localStorage.getItem('bustValue')
showWaist.textContent = localStorage.getItem('waistValue')
showHips.textContent = localStorage.getItem('HipsValue')
showInseam.textContent = localStorage.getItem('inseamValue')
finalySize.textContent = localStorage.getItem('resaultValue')