radio.setGroup(23)

let x = 0
let y = 0
let trim = 0

function setMotors(leftSpeed: number, rightSpeed: number) {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, leftSpeed)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, rightSpeed)
}

radio.onReceivedValue(function (name, value) {
    if (name === "x") {
        x = value
    } else if (name === "y") {
        y = value
    }
})

basic.forever(function () {
    let leftSpeed = x - y
    let rightSpeed = x + y

    if (leftSpeed > 255) leftSpeed = 255
    if (leftSpeed < -255) leftSpeed = -255
    if (rightSpeed > 255) rightSpeed = 255
    if (rightSpeed < -255) rightSpeed = -255

    setMotors(leftSpeed, rightSpeed)

    //basic.showNumber(y)

    basic.pause(30)
})
