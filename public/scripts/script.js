function hexToRgb(hex) {
    if(hex.charAt(0) === '#') {
        hex = hex.substr(1)
    }
    if(hex.length < 2 || hex.length == 4 || hex.length == 5 || hex.length > 6 || hex.search(/[g-z]/ig) !== -1) {
        alert('Insira um código de cor válido')
    }

    const values = hex.split('')
    let red, green, blue

    if(hex.length == 2) {
        red = parseInt(values[0].toString() + values[0].toString(), 16)
        green = red
        blue = red
    } else if(hex.length == 3) {
        red = parseInt(values[0].toString() + values[0].toString(), 16)
        green = parseInt(values[1].toString() + values[1].toString(), 16)
        blue = parseInt(values[2].toString() + values[2].toString(), 16)
    } else if(hex.length == 6) {
        red = parseInt(values[0].toString() + values[1].toString(), 16)
        green = parseInt(values[2].toString() + values[3].toString(), 16)
        blue = parseInt(values[4].toString() + values[5].toString(), 16)
    }

    const rgb = `${red},${green},${blue}`
    return rgb
}

var timer //variável que será usada para parar o loop do background
function loopBackground(color, timeOfIncrement, redValue, greenValue, blueValue) {
    const body = document.getElementsByTagName("body")[0]

    let red = Number(color.split(',')[0])
    let green = Number(color.split(',')[1])
    let blue = Number(color.split(',')[2])

    red > 255 ? red -= 255 : red
    green > 255 ? green -= 255 : green
    blue > 255 ? blue -= 255 : blue

    let newColor = `${red + redValue},${green + greenValue},${blue + blueValue}`
    body.style.background = `rgb(${newColor})`
    
    timer = setTimeout(() => {
        loopBackground(newColor, timeOfIncrement, redValue, greenValue, blueValue)
    }, timeOfIncrement * 1000)
}

function exec() {
    let color = hexToRgb(document.querySelector("#hex").value)
    const timeOfIncrement = document.querySelector("#increment").value
    const redValue = Number(document.querySelector("#red-value").value)
    const greenValue = Number(document.querySelector("#green-value").value)
    const blueValue = Number(document.querySelector("#blue-value").value)
    const body = document.getElementsByTagName("body")[0]
    const button = document.querySelector("#start-stop")

    if(button.dataset.exec === 'true') {
        body.style.background = `rgb(${color})`
        button.textContent = 'Ok, enough'
        button.dataset.exec = 'false'

        setTimeout(() => {
            loopBackground(color, timeOfIncrement, redValue, greenValue, blueValue, false)
        }, timeOfIncrement * 1000)
    } else {
        body.style.background = '#fff'
        clearTimeout(timer)
        
        button.textContent = 'See it happen!'
        button.dataset.exec = 'true'
    }
    
}