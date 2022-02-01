<template>
  <component :is="tag" v-bind="$attrs">
    <slot> </slot>
  </component>
</template>

<script>
export default {
  name: 'Icon',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'span',
    },
  },
}
</script>
