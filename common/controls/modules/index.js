import { Pop, Picker, timePicker, DatePicker, CascadePicker, Dialog, Loading, Toast, Scroll } from "./module.js"

function install(Vue) {
    if (install.installed) {
        return
    }
    install.installed = true;
    const Components = [
        Pop,
        Picker,
        timePicker,
        CascadePicker,
        DatePicker,
        Dialog,
        Loading,
        Toast,
        Scroll
    ];
    Components.forEach((component) => {
        component.install(Vue);
    })
}
const contronls = {
    version: '1.6.1',
    install
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(install);
}
export default contronls