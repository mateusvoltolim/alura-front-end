if (!Array.prototype.includes) {
    Array.prototype.includes = function (element) {
        return this.indexOf(element) != -1;
    }
}