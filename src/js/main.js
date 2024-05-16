import Alert from './Alert.mjs';
import {  loadHeaderFooter, setSubscript } from './utils.mjs';

loadHeaderFooter();

const alerts = new Alert();
alerts.init();
