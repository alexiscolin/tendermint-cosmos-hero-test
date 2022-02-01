<template>
  <NuxtLink :to="to" :target="blank && '_blank'" :rel="rel" :class="[type]">
    <span><slot /></span>
  </NuxtLink>
</template>

<script>
export default {
  name: 'Link',
  props: {
    to: {
      type: String,
      default: '',
    },
    blank: {
      type: Boolean,
      default: false,
    },
    rel: {
      type: String,
      default: 'noopener nofollow noreferrer',
    },
    type: {
      type: String,
      default: 'standard',
      validator(value) {
        return ['standard', 'cta', 'link', 'nav'].includes(value)
      },
    },
  },
}
</script>

<style lang="postcss" scoped>
.nav {
  @apply relative;
}

.nav::after {
  content: '';
  @apply absolute block -bottom-1 left-[10%] w-[80%] h-px bg-whites-1000 scale-x-0 origin-right transition-transform duration-[0.3s] ease-in-out;
}

.nav:hover::after {
  @apply scale-x-100 origin-left;
}

.cta {
  @apply relative overflow-hidden inline-block bg-whites-800 rounded-md text-grays-0 font-medium py-2.5 px-6;
}

.cta > span {
  @apply text-whites-1000 mix-blend-difference;
}

.cta::before {
  content: '';
  @apply absolute bg-grays-0 left-0 top-0 w-full h-full scale-x-0 origin-right transition-transform duration-[0.3s] ease-in-out;
}

.cta:hover::before {
  @apply origin-left scale-100;
}
</style>
