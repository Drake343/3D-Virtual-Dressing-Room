let showGender = document.querySelector('.gender-value')
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
showGender.textContent = localStorage.getItem('gender')
finalySize.textContent = localStorage.getItem('resaultValue')

primaryButton.addEventListener('click', () => {

    // =============== Male ===============

    if (showGender.textContent === 'Male') {

        // The Lower of Mens

        if (showBust.textContent === '' && finalySize.textContent === 'Small') {
            /************************************ Add Small T-shirt ***********************************************/
            window.open('s.html')
        } else if (showBust.textContent === '' && finalySize.textContent === 'Medium') {
            /************************************ Add Medium T-shirt ***********************************************/
            window.open('m.html')
        } else if (showBust.textContent === '' && finalySize.textContent === 'Large') {
            /************************************ Add Large T-shirt ***********************************************/
            window.open('l.html')
        } else if (showBust.textContent === '' && finalySize.textContent === 'X-large') {
            /************************************ Add X-large T-shirt ***********************************************/
            window.open('https://egypt.souq.com/eg-en/andora-straight-leg-side-pocket-ankle-length-jeans-for-men-black-44-73044245/i/')
        }

        // The Upper part of Mens

        if (showInseam.textContent === '' && finalySize.textContent === 'Small') {
            /************************************ Add Small Pants ***********************************************/
            window.open('small-men.html')
        } else if (showInseam.textContent === '' && finalySize.textContent === 'Medium') {
            /************************************ Add Medium Pants ***********************************************/
            window.open('medium-men.html')
        } else if (showInseam.textContent === '' && finalySize.textContent === 'Large') {
            /************************************ Add Large Pants ***********************************************/
            window.open('large-men.html')
        } else if (showInseam.textContent === '' && finalySize.textContent === 'X-large') {
            /************************************ Add X-large Pants ***********************************************/
            window.open('xlarge-men.html')
        }


        // =============== Female ===============

    } else if (showGender.textContent === 'Female') {

        // The Lower part of Female

        if (showBust.textContent === '' && finalySize.textContent === 'Small') {
            /************************************ Add Small T-shirt ***********************************************/
            window.open('small-female.html')
        } else if (showBust.textContent === '' && finalySize.textContent === 'Medium') {
            /************************************ Add Medium T-shirt ***********************************************/
            window.open('medium-female.html')
        } else if (showBust.textContent === '' && finalySize.textContent === 'Large') {
            /************************************ Add Large T-shirt ***********************************************/
            window.open('large-female.html')
        } else if (showBust.textContent === '' && finalySize.textContent === 'X-large') {
            /************************************ Add X-large T-shirt ***********************************************/
            window.open('xlarge-female.html')
        }

        // The Upper part of Female

        if (showInseam.textContent === '' && finalySize.textContent === 'Small') {
            /************************************ Add Small Pants ***********************************************/
            window.open('small-female.html')
        } else if (showInseam.textContent === '' && finalySize.textContent === 'Medium') {
            /************************************ Add Medium Pants ***********************************************/
            window.open('medium-female.html')
        } else if (showInseam.textContent === '' && finalySize.textContent === 'Large') {
            /************************************ Add Large Pants ***********************************************/
            window.open('large-female.html')
        } else if (showInseam.textContent === '' && finalySize.textContent === 'X-large') {
            /************************************ Add X-large Pants ***********************************************/
            window.open('xlarge-female.html')
        }
    }
})