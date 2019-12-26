class DateHelper {

    constructor() {
        throw new Error('DateHelper nao pode ser instanciada');
    }

    static textToDate(text) {
        if (!/\d{2}\/\d{2}\/\d{4}/.test(text)) {
            throw new Error('Data deve estar no formato dd/mm/aaaa');
        }
        return new Date(
            ...text.split('/').reverse().map((item, index) => index == 1 ? item - 1 : item)
        );
    }

    static dateToText(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
}