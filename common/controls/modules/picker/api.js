import createAPI from '../createApi/index'

export default function addPicker (Vue, Picker) {
  const pickerAPI = createAPI(Vue, Picker, ['select', 'value-change', 'cancel', 'change'])
  pickerAPI.before((data, renderFn, single) => {
    if (single) {
      console.warn('Picker component can not be a singleton.')
    }
  })
}
