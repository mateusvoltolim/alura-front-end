class DateHelper {

    textToDate(text) {
        return new Date(
            ...text.split('-').map((item, index) => index == 1 ? item - 1 : item)
        );
    }

    dateToText(date) {
        return date.getDate + '/' + date.getMoth() + '/' + date.getFullYear();
    }
}