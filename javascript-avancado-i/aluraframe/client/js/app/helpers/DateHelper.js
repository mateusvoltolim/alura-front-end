class DateHelper {

    constructor() {
        throw new Error('DateHelper nao pode ser instanciada');
    }

    static textToDate(text) {
        return new Date(
            ...text.split('-').map((item, index) => index == 1 ? item - 1 : item)
        );
    }

    static dateToText(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
}