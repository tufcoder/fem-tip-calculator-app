const form = document.querySelector('.tip-container')
const bill = document.getElementById('bill')
const custom = document.getElementById('custom')
const numberOfPeople = document.getElementById('number-of-people')
const tipButtons = document.querySelectorAll('.button-tip')
const errorMessage = document.querySelector('.error-message')
const reset = document.querySelector('button[type=reset]')

let billValue = 0
let tipValue = 0
let numberOfPeopleValue = 0

const handleInputBill = (event) => {
    event.currentTarget.parentElement.classList.remove('error')

    const inputValue = event.currentTarget.value.trim()
    billValue = 0

    if (inputValue !== "") {
        const regex = new RegExp(/^(\d+)((\.|,)?\d{2})?$/)

        if (!regex.test(event.currentTarget.value)) {
            event.currentTarget.parentElement.classList.add('error')
        }
        else {
            event.currentTarget.parentElement.classList.remove('error')
            billValue = inputValue
        }
    }
}

const handleBlur = (event) => {
    event.currentTarget.parentElement.classList.remove('error')
}

const handleInputCustom = (event) => {
    event.currentTarget.parentElement.classList.remove('error')

    const inputValue = event.currentTarget.value.trim()
    tipValue = 0

    if (inputValue !== "") {
        const regex = new RegExp(/^[0-9]$|^[1-9][0-9]$|^(100)$/)

        if (!regex.test(event.currentTarget.value)) {
            event.currentTarget.parentElement.classList.add('error')
        }
        else {
            event.currentTarget.parentElement.classList.remove('error')
            tipValue = inputValue
        }
    }
}

const handleInputNumberOfPeople = (event) => {
    event.currentTarget.parentElement.classList.remove('error', 'border-color-orange')
    errorMessage.classList.add('hidden')

    const inputValue = event.currentTarget.value.trim()
    numberOfPeopleValue = 0

    if (inputValue !== '') {
        const regex = new RegExp(/^[1-9]$|^[1-9][0-9]+$/)

        if (inputValue === '0') {
            errorMessage.classList.remove('hidden')
            event.currentTarget.parentElement.classList.add('border-color-orange')
        }
        else {
            if (!regex.test(event.currentTarget.value)) {
                event.currentTarget.parentElement.classList.add('error')
            }
            else {
                event.currentTarget.parentElement.classList.remove('error')
                numberOfPeopleValue = inputValue
            }
        }
    }
}

const handleTipButton = (event) => {
    event.preventDefault()
    tipValue = 0

    tipButtons.forEach(button => {
        if (button === event.currentTarget && button.nodeName === event.currentTarget.nodeName) {
            button.dataset.active = 'true'
            tipValue = button.value
            form.dispatchEvent(new Event('input'))
        }
        else {
            button.dataset.active = 'false'
            custom.value = ''
        }
    })
}

const handleReset = () => {
    numberOfPeople.parentElement.classList.remove('error', 'border-color-orange')

    errorMessage.classList.add('hidden')

    tipButtons.forEach(button => {
        button.dataset.active = 'false'
    })

    billValue = 0
    tipValue = 0
    numberOfPeopleValue = 0

    form.dispatchEvent(new Event('input'))
}

const handleFormSubmit = (event) => {
    event.preventDefault()
}

const handleFormChange = (event) => {
    event.preventDefault()

    const tipAmount = document.getElementById('tip-amount')
    const tipTotal = document.getElementById('tip-total')

    if (billValue >= 0 && tipValue >= 0 && numberOfPeopleValue > 0) {
        let tipPerPerson = parseFloat(
            billValue * (tipValue / 100) / numberOfPeopleValue
        )

        let totalPerPerson = parseFloat(
            (billValue / numberOfPeopleValue) + tipPerPerson
        )

        tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`
        tipTotal.textContent = `$${totalPerPerson.toFixed(2)}`
    } else {
        tipAmount.textContent = `$0.00`
        tipTotal.textContent = `$0.00`
    }
}

form.addEventListener('submit', handleFormSubmit)
form.addEventListener('input', handleFormChange)

bill.addEventListener('input', handleInputBill)
bill.addEventListener('focus', handleInputBill)
bill.addEventListener('blur', handleBlur)

custom.addEventListener('input', handleInputCustom)
custom.addEventListener('focus', handleInputCustom)
custom.addEventListener('blur', handleBlur)

numberOfPeople.addEventListener('input', handleInputNumberOfPeople)
numberOfPeople.addEventListener('focus', handleInputNumberOfPeople)
numberOfPeople.addEventListener('blur', handleBlur)

tipButtons.forEach(button => {
    button.addEventListener('click', handleTipButton)
})

reset.addEventListener('click', handleReset)
