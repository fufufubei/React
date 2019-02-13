import createAPI from '../../assets/helpers/create-api'

export default function addDialog(Vue, DatePicker) {
    createAPI(Vue, DatePicker, ['select', 'cancel'], false)
}