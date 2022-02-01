<template>
  <div>
    <div
      ref="loader"
      class="fixed top-0 left-0 w-full h-full bg-whites-1000 z-50"
    ></div>
    <div class="bg-black min-h-screen">
      <TheHeader />
      <main class="w-full">
        <Nuxt />
      </main>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
export default {
  mounted() {
    gsap.to(this.$refs.loader, { autoAlpha: 0, duration: 1, delay: 0.4 })
  },
}
</script>
