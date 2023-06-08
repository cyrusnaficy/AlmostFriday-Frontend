import moment from 'moment';

export class DateHandler {

    constructor(date) {
        this.date = date;
    }

    async calculateAge() {
        const today = new Date();
        const [month, day, year] = this.date.split("/");

        const birthDate = new Date(year, month - 1, day);
        let age = today.getFullYear() - birthDate.getFullYear();

        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        if(age >= 13) {
            return true;
        } else {
            return false;
        }
    }

    async isValidAge() {
        return moment(this.date, "MM/DD/YYYY", true).isValid();
    }

}