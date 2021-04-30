//https://www.youtube.com/watch?v=7-1VZ2wF8pw&list=PLXK0rNPVZK_pKBlp6kO1Rup1BHAe1xexM&index=2


const strengthMeter = document.getElementById("strength-meter")
const passwordInput = document.getElementById("password-input")
const reasonsContainer = document.getElementById("reasons")

passwordInput.addEventListener('input', updateStrengthMeter)

updateStrengthMeter()
function updateStrengthMeter(){
    const weaknesses = calculatePasswordStrength(passwordInput.value)
    let strength = 100
    reasonsContainer.innerHTML = ''
    console.log(weaknesses)
    weaknesses.forEach(weakness => {
        if (weakness == null) return
        strength -= weakness.deduction
        const messageElement = document.createElement('div')
        messageElement.innerText = (weakness.message)
        reasonsContainer.appendChild(messageElement)
    })
    strengthMeter.style.setProperty('--strength', strength)
}

function calculatePasswordStrength(password){
    const weaknesses = []
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(lowercaseWeakness(password))
    weaknesses.push(uppercaseWeakness(password))
    weaknesses.push(numberWeakness(password))
    weaknesses.push(specialCharsWeakness(password))
    weaknesses.push(repeatCharsWeakness(password))
    return weaknesses
}

function lengthWeakness(password){
    const length = password.length
    
    if(length <= 5){
        return {
            message: "Password too short",
            deduction: 40,
        }
    }
    if(length <= 10){
        return {
            message: "Password could be longer",
            deduction: 15,
        }
    }

}

function lowercaseWeakness(password){
    return characterTypeWeakness(password, /[a-z]/g, "lowercase")
}
function uppercaseWeakness(password){
    return characterTypeWeakness(password, /[A-Z]/g, "uppercase")
}
function numberWeakness(password){
    return characterTypeWeakness(password, /[0-9]/g, "number")
}
function specialCharsWeakness(password){
    return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, "special")//Not nums or chars or whitespace
}

function characterTypeWeakness(password, regex, type){
    const matches = password.match(regex) || [] //https://www.youtube.com/watch?v=rhzKDrUiJVk
    if (matches.length == 0){
        return {
            message: `Password doesn't have enough ${type} characters`,
            deduction: 20,
        }
    }
    if (matches.length <= 2){
        return {
            message: `Password could have more ${type} characters`,
            deduction: 5,
        }
    }
}

function repeatCharsWeakness(password){
    const matches = password.match(/(.)\1/g) || [] //anything followed by that same anything //https://www.youtube.com/watch?v=rhzKDrUiJVk
    if (matches.length !== 0){
        return {
            message: `your password repeats`,
            deduction: 5*matches.length,
        }
    }
}