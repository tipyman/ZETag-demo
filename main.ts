input.onButtonPressed(Button.A, function () {
    power.lowPowerEnable(LowPowerEnable.Prevent)
    para_array = [
    (count >> 16 ) & 0xff,
    (count >> 8) & 0xff,
    count & 0xff,
    3,
    255,
    input.temperature(),
    input.lightLevel(),
    input.soundLevel()
    ]
    pins.digitalWritePin(DigitalPin.P2, 1)
    basic.pause(10)
    ZETag.Send_data(para_array, para_array.length)
    count += 1
    basic.showIcon(IconNames.Yes)
    basic.pause(250)
    basic.clearScreen()
    basic.pause(250)
    pins.digitalWritePin(DigitalPin.P2, 1)
    power.lowPowerEnable(LowPowerEnable.Allow)
    power.lowPowerRequest()
})
input.onButtonPressed(Button.B, function () {
    power.lowPowerEnable(LowPowerEnable.Prevent)
    count100 = 1
    pins.digitalWritePin(DigitalPin.P2, 1)
    basic.pause(10)
    for (let index = 0; index < 100; index++) {
        para_array = [count100]
        ZETag.Send_data(para_array, para_array.length)
        basic.showNumber(Math.idiv(count100, 10))
        basic.pause(500)
        count100 += 1
    }
    basic.clearScreen()
    pins.digitalWritePin(DigitalPin.P2, 1)
    power.lowPowerEnable(LowPowerEnable.Allow)
    power.lowPowerRequest()
})
let NoiseLevel = 0
let NoiseLevel_t = 0
let count100 = 0
let para_array: number[] = []
basic.clearScreen()
pins.digitalWritePin(DigitalPin.P2, 1)
led.setBrightness(64)
power.fullPowerOn(FullPowerSource.A)
power.fullPowerOn(FullPowerSource.B)
serial.redirect(
SerialPin.P0,
SerialPin.P1,
BaudRate.BaudRate115200
)
pins.digitalWritePin(DigitalPin.P2, 1)
basic.pause(30)
ZETag.Set_TX_Power(8)
ZETag.Set_channel_spacing(100)
ZETag.Set_Frequency(922080000, 6, 2)
para_array = [15, 0, 1]
ZETag.Send_data(para_array, para_array.length)
basic.pause(500)
pins.digitalWritePin(DigitalPin.P2, 1)
let count = 1
let T15min = 1
power.lowPowerRequest()
power.fullPowerEvery(60000, function () {
    power.lowPowerEnable(LowPowerEnable.Prevent)
    if (T15min < 15) {
        NoiseLevel_t = input.soundLevel()
        if (NoiseLevel_t > NoiseLevel) {
            NoiseLevel = NoiseLevel_t
        }
        T15min += 1
    } else {
        para_array = [
        (count >> 16 ) & 0xff,
        (count >> 8) & 0xff,
        count & 0xff,
        1,
        255,
        input.temperature(),
        input.lightLevel(),
        NoiseLevel
        ]
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.pause(10)
        ZETag.Send_data(para_array, para_array.length)
        count += 1
        NoiseLevel = 0
        T15min = 1
        basic.showIcon(IconNames.Heart)
        basic.pause(250)
        basic.clearScreen()
        basic.pause(250)
        pins.digitalWritePin(DigitalPin.P2, 1)
    }
    power.lowPowerEnable(LowPowerEnable.Allow)
    power.lowPowerRequest()
})
