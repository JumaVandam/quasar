import { h, computed, getCurrentInstance } from 'vue'

import { createComponent } from '../../utils/private/create.js'
import useDark, { useDarkProps } from '../../composables/private/use-dark.js'
import { hSlot } from '../../utils/private/render.js'

export default createComponent({
  name: 'QList',

  props: {
    ...useDarkProps,

    bordered: Boolean,
    dense: Boolean,
    separator: Boolean,
    padding: Boolean,

    tag: {
      type: String,
      default: 'div'
    }
  },

  setup (props, { slots }) {
    const vm = getCurrentInstance()
    const isDark = useDark(props, vm.proxy.$q)

    const classes = computed(() =>
      'q-list'
      + (props.bordered === true ? ' q-list--bordered' : '')
      + (props.dense === true ? ' q-list--dense' : '')
      + (props.separator === true ? ' q-list--separator' : '')
      + (isDark.value === true ? ' q-list--dark' : '')
      + (props.padding === true ? ' q-list--padding' : '')
    )

    return () => h(props.tag, { class: classes.value, role: 'list' }, hSlot(slots.default))
  }
})
