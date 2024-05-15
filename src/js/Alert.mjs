import { renderWithTemplate, getData, qs } from './utils.mjs';

export default class Alert {
    constructor(path = '../json/alerts.json') {
        this.alertdata = {};
        this.path = path;
    }

    async init() {
        this.alertdata = await getData(this.path);
        if (this.alertdata.Alerts.length > 0) {
            const alertSection = document.createElement('section');
            alertSection.classList.add('alert-list');
            const mainElement = qs('main');
            mainElement.prepend(alertSection);

            const combinedAlertsTemplate = (data) => {
                return data.map(alert => alertTemplate(alert)).join('');
            };

            renderWithTemplate(combinedAlertsTemplate(this.alertdata.Alerts), alertSection, []);
        }
    }
}

function alertTemplate(alert) {
    return `<p style='background-color: ${alert.background}; color: ${alert.color};'>${alert.message}</p>`;
}
