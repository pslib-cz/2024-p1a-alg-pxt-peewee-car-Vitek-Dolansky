radio.setGroup(23)

let x = 0
let y = 0
let trim = 0
let canDrive = true

function setMotors(leftSpeed: number, rightSpeed: number) {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, leftSpeed)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, rightSpeed)
}

radio.onReceivedString(function(recievedString){
let parts = recievedString.split(",")
if (parts.length === 2) {
    x = parseInt(parts[0])
    y = parseInt(parts[1])
}
})

radio.onReceivedValue(function (name, value) {
    if (name === "drive") {
        canDrive = value === 1
    } else if (name === "trim") {
        trim = value
    }
})

basic.forever(function () {
    if (canDrive) {
        let leftSpeed = x - y - trim
        let rightSpeed = x + y + trim

        if (leftSpeed > 255) leftSpeed = 255
        if (leftSpeed < -255) leftSpeed = -255
        if (rightSpeed > 255) rightSpeed = 255
        if (rightSpeed < -255) rightSpeed = -255

        setMotors(leftSpeed, rightSpeed)
        
        } else {

            PCAmotor.MotorStop(PCAmotor.Motors.M1)
            PCAmotor.MotorStop(PCAmotor.Motors.M4)
        }

        //basic.showNumber(y)

        basic.pause(25)
    }
)
