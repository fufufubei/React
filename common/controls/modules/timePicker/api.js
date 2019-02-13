import createAPI from '../createApi/index'

export default function addTimePicker (Vue, TimePicker) {
  const timePickerAPI = createAPI(Vue, TimePicker, ['select', 'cancel', 'change'])
  timePickerAPI.before((data, renderFn, single) => {
    if (single) {
      console.warn('TimePicker component can not be a singleton.')
    }
  })
}
