// Импорт модуля с функцией для проверки строки
const isHasJavaScriptString = require('./is_js_string');
console.log(isHasJavaScriptString('Привет Javascript'))


// Базовый класс печи


class Oven {
    #maxTempLimit;

    constructor(maxTempLimit) {
        this.#maxTempLimit = this.#validateTemperature(maxTempLimit);
    }

    get maxTemperature() {
        return this.#maxTempLimit;
    }

    set maxTemperature(value) {
        this.#maxTempLimit = this.#validateTemperature(value);
    }

    #validateTemperature(value) {
        return Math.min(value, 15);
    }
}


// Улучшенная печь


class ImprovedOven extends Oven {
    #currentTemp = 0;
    #heatingInterval = null;
    #coolingInterval = null;

    _logger(message) {
        console.log(message);
    }

    _heat() {
        this.#currentTemp++;
        this._logger(`Температура печи: ${this.#currentTemp}`);

        if (this.#currentTemp === this.maxTemperature) {
            this._logger('Печь достигла максимальной температуры. Полный нагрев.');
            this.turnOff();
        }
    }

    _cooling() {
        this.#currentTemp--;

        this._logger(`Температура печи: ${this.#currentTemp}`);
        if (this.#currentTemp === 0) {
            this._logger('Печь остыла.');
            clearInterval(this.#coolingInterval);
        }
    }

    turnOn() {
        this._logger('Печь включена. Начало работы.');

        this.#heatingInterval = setInterval(() => this._heat(), 500);
    }

    turnOff() {
        this._logger('Печь выключена.');

        clearInterval(this.#heatingInterval);

        this.#coolingInterval = setInterval(() => this._cooling(), 500);
    }
}

const initFirstOver = new Oven(12);
console.log('Максимальная температура первой печи:', initFirstOver.maxTemperature);

const initSecondOver = new Oven(20);
console.log('Максимальная температура второй печи:', initSecondOver.maxTemperature);

const improvedOven = new ImprovedOven(10);
console.log('Максимальная температура печи:', improvedOven.maxTemperature);
improvedOven.turnOn();