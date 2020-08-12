/*
 *
 ***** The upper part *****
 **********************************************************************************
 *   Bust                    Waist                   Hips                   size  *
 **********************************************************************************
 *   87 - 94      *          75 - 82      *          86 - 93        *        S    *
 *                *                       *                         *             *
 *   95 - 101     *          83 - 90      *          94 - 100       *        M    *
 *                *                       *                         *             *
 *   102 - 108    *          91 - 97      *          101 - 108      *        L    *
 *                *                       *                         *             *
 *   109 - 114    *          98 - 103     *          109 - 113      *        XL   *
 **********************************************************************************
 *
 *
 *
 ****** The lower part *****
 **********************************************************************************
 *   Waist                    Hips                   Inseam                 size  *
 **********************************************************************************
 *   75 - 82      *          86 - 93      *          81             *        S    *
 *                *                       *                         *             *
 *   83 - 90      *          94 - 100     *          82             *        M    *
 *                *                       *                         *             *
 *   91 - 97      *          101 - 108    *          83             *        L    *
 *                *                       *                         *             *
 *   98 - 103     *          109 - 113    *          84             *        XL   *
 **********************************************************************************
 *
 */

// Variable

let radios = document.querySelectorAll('input[type=radio][name="type"]')
let radioGender = document.querySelectorAll('input[type=radio][name="gender"]')
let textInput = document.querySelectorAll('input[type=text]')

let height = document.querySelector('#btn-height')
let bust = document.querySelector('#btn-bust')
let waist = document.querySelector('#btn-waist')
let Hips = document.querySelector('#btn-hips')
let inseam = document.querySelector('#btn-inseam')
let submit = document.querySelector('.submit')

let heightImg = document.querySelector('.human-img .height')
let bustImg = document.querySelector('.human-img .bust')
let waistImg = document.querySelector('.human-img .waist')
let HipsImg = document.querySelector('.human-img .hips')
let inseamImg = document.querySelector('.human-img .inseam')

let popUp = document.querySelector('.modal')
let closeBtn = document.querySelector('.close')
let popupContent = document.querySelector('.modal-content p')
let popupTitle = document.querySelector('.modal-content h4')

let helpBtn = document.querySelectorAll('.show-toolTip')
let unisexPhoto = document.querySelector('.parent .human-img');
let yourSize
let gender


// Hidden and Show input (bust) and (inseam)
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('click', function () {
        if (this.value === 'T-shirts') {
            inseam.setAttribute('disabled', '')
            bust.removeAttribute('disabled')
        } else if (this.value === 'Pants') {
            bust.setAttribute('disabled', '')
            inseam.removeAttribute('disabled')
        }
    })
}

// Calculate Size
function calculateSize() {
    // The upper part
    if (
        bust.value >= 87 && bust.value <= 94 &&
        waist.value >= 75 && waist.value <= 82 &&
        Hips.value >= 86 && Hips.value <= 93) {
            yourSize = 'Small'
            console.log(yourSize)
    } else if (
        bust.value >= 95 && bust.value <= 101 &&
        waist.value >= 83 && waist.value <= 90 &&
        Hips.value >= 94 && Hips.value <= 100) {
            yourSize = 'Medium'
            console.log(yourSize)
    } else if (
        bust.value >= 102 && bust.value <= 108 &&
        waist.value >= 91 && waist.value <= 97 &&
        Hips.value >= 101 && Hips.value <= 108) {
            yourSize = 'Large'
            console.log(yourSize)
    } else if (
        bust.value >= 109 && bust.value <= 114 &&
        waist.value >= 98 && waist.value <= 103 &&
        Hips.value >= 109 && Hips.value <= 113) {
            yourSize = 'X-large'
            console.log(yourSize)
    }

    // The lower part
    else if (
        inseam.value == 81 &&
        waist.value >= 75 && waist.value <= 82 &&
        Hips.value >= 86 && Hips.value <= 93) {
            yourSize = 'Small'
            console.log(yourSize)
    } else if (
        inseam.value == 82 &&
        waist.value >= 83 && waist.value <= 90 &&
        Hips.value >= 94 && Hips.value <= 100) {
        yourSize = 'Medium'
        console.log(yourSize)
    } else if (
        inseam.value == 83 &&
        waist.value >= 91 && waist.value <= 97 &&
        Hips.value >= 101 && Hips.value <= 108) {
        yourSize = 'Large'
        console.log(yourSize)
    } else if (
        inseam.value == 84 &&
        waist.value >= 98 && waist.value <= 103 &&
        Hips.value >= 109 && Hips.value <= 113) {
        yourSize = 'X-large'
        console.log(yourSize)
    }

    else {
        yourSize = 'Please try again'
    }
}

for (let i = 0; i < radioGender.length; i++) {
    radioGender[i].addEventListener('click', function () {
        if (this.value === 'male') {
            gender = "Male";
            
        } else if (this.value === 'female') {
            gender = "Female"
        }
    })
}
function manAvatar() {
    unisexPhoto.style.backgroundImage = "url('assets/img/ui/male.png')";
  }
  function femaleAvatar() {
    unisexPhoto.style.backgroundImage = "url('assets/img/ui/female.png')";
  }
function passingValue() {
    localStorage.setItem('heightValue', height.value)
    localStorage.setItem('bustValue', bust.value)
    localStorage.setItem('waistValue', waist.value)
    localStorage.setItem('HipsValue', Hips.value)
    localStorage.setItem('inseamValue', inseam.value)
    localStorage.setItem('resaultValue', yourSize)
    localStorage.setItem('gender', gender)
}

submit.addEventListener('click', () => {
    calculateSize()
    passingValue()
})


// Change title on Img
height.addEventListener('keyup', () => {
    if (height.value == '') {
        heightImg.textContent = 'Height'
    } else {
        heightImg.style.color = '#23f123'
        heightImg.textContent = height.value
    }
})

bust.addEventListener('keyup', () => {
    if (bust.value == '') {
        bustImg.textContent = 'Bust'
    } else {
        bustImg.style.color = '#23f123'
        bustImg.textContent = bust.value
    }
})

waist.addEventListener('keyup', () => {
    if (waist.value == '') {
        waistImg.textContent = 'Waist'
    } else {
        waistImg.style.color = '#23f123'
        waistImg.textContent = waist.value
    }
})

Hips.addEventListener('keyup', () => {
    if (Hips.value == '') {
        HipsImg.textContent = 'Hips'
    } else {
        HipsImg.style.color = '#23f123'
        HipsImg.textContent = Hips.value
    }
})

inseam.addEventListener('keyup', () => {
    if (inseam.value == '') {
        inseamImg.textContent = 'Inseam'
    } else {
        inseamImg.style.color = '#23f123'
        inseamImg.textContent = inseam.value
    }
})



// Show popUp
for (let i = 0; i < helpBtn.length; i++) {
    helpBtn[i].addEventListener('click', () => {
        if (helpBtn[i].classList.contains('height')) {
            popupTitle.textContent = 'How to measure height'
            popupContent.textContent = 'To measure height, place one end of the measuring tape to the tip of the head, and the other down to the floor. It’s important not to wear shoes! Make sure that you are holding the measuring tape straight and vertical, to the extent that is possible. Otherwise, measure next to the wall.'
        } else if (helpBtn[i].classList.contains('bust')) {
            popupTitle.textContent = 'How to measure Bust'
            popupContent.textContent = 'Measure your bust at the fullest part. The measuring tape has to be parallel to the floor, and fit snugly around the body but without pulling. The circumference below the breast (for women): measure under the breasts, passing the tape under the arms at the widest part.'
        } else if (helpBtn[i].classList.contains('waist')) {
            popupTitle.textContent = 'How to measure waist'
            popupContent.textContent = 'Measure your bust at the fullest part. The measuring tape has to be parallel to the floor, and fit snugly around the body but without pulling. The circumference below the breast (for women): measure under the breasts, passing the tape under the arms at the widest part.'
        } else if (helpBtn[i].classList.contains('hips')) {
            popupTitle.textContent = 'How to measure hips'
            popupContent.textContent = 'The measurement should be taken around the widest points of the hips and buttocks. The measuring tape should fit snugly but without pulling.'
        } else if (helpBtn[i].classList.contains('inseam')) {
            popupTitle.textContent = 'How to measure the inseam'
            popupContent.textContent = 'The inseam is the length between the top inner part of the hip to the lower part of the ankle. The best way to take this measurement is from a pair of pants that fit you really well.'
        }

        popUp.style.display = 'block'
    })
}

closeBtn.addEventListener('click', () => {
    popUp.style.display = 'none'
})

window.onclick = function(event) {
    if (event.target == popUp) {
        popUp.style.display = "none";
    }
}