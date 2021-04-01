const strengthMeter = document.getElementById("strength-meter")
const passwordInput = document.getElementById("password-input")
const reasonsContainer = document.getElementById("reasons")

function calculatePasswordStrength(password){
    const weaknesses = []
    weaknesses.push(lengthWeaknesses(password))
    return weaknesses
}

function lengthWeaknesses(password){
    const length = password.length
    15:30min in video
    https://www.youtube.com/watch?v=7-1VZ2wF8pw&list=PLXK0rNPVZK_pKBlp6kO1Rup1BHAe1xexM&index=2
}