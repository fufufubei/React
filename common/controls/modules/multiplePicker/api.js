import createAPI from '../../assets/helpers/create-api'
import { warn } from '../../assets/helpers/debug'

export default function addCascadePicker (Vue, CascadePicker) {
  const cascadePickerAPI = createAPI(Vue, CascadePicker, ['select', 'cancel', 'change'])
  cascadePickerAPI.before((data, renderFn, single) => {
    if (single) {
      warn('CascadePicker component can not be a singleton.')
    }
  })
}
