<template>
  <section class="heroe">
    <div
      class="container relative min-h-screen grid grid-cols-12 grid-rows-1 items-center text-center sm:text-left"
    >
      <div class="heroe-illu">
        <div id="heroe-canvas" class="heroe-illu_content">
          <SectionHeroeCanvas />
        </div>
      </div>

      <div
        class="relative top-1/4 sm:top-0 col-start-1 col-end-13 sm:col-end-10 xl:col-end-7 z-10"
      >
        <div
          ref="upTitle"
          class="uppercase text-whites-500 text-0.5 m:text-0 pb-4"
        >
          Welcome to Cosmos
        </div>
        <h1
          ref="title"
          class="font-bold l:font-extrabold text-3 sm:text-4 m:text-5 l:text-6 pb-4"
        >
          The Internet of Blockchains
        </h1>
        <p
          ref="content"
          class="m:font-light m:text-1 leading-relaxed m:leading-[2.0625rem] sm:pr-[15%] l:pr-[30%]"
        >
          Cosmos is an ever-expanding ecosystem of interconnected apps and
          services, an Interchain built for a decentralized future.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap'
export default {
  mounted() {
    gsap.from([this.$refs.upTitle, this.$refs.title, this.$refs.content], {
      y: 50,
      opacity: 0,
      duration: 2,
      ease: 'expo.out',
      stagger: 0.2,
      delay: 0.7,
    })

    gsap.from('.heroe', {
      '--scale-size': 2,
      duration: 2.4,
      ease: 'expo.out',
      delay: 0.5,
    })
  },
}
</script>

<style lang="postcss" scoped>
.heroe {
  position: relative;
  overflow: hidden;

  --illu-content-size-old: 100%;
  --illu-content-size: var(--illu-content-size-old);

  @media (min-width: 36rem) {
    /* Need a way to merge with tailwind screen size to avoid DRY */
    --illu-content-size-old: 95vh;
    --illu-content-size: min(70vw, var(--illu-content-size-old));
  }

  --illu-content-x: -5vw;
  --scale-size: 1;
}

.heroe::before {
  content: '';
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(var(--scale-size));
  @apply bg-cover bg-center bg-repeat;
}

.avif .heroe::before {
  background-image: url('/imgs/header-bg/header-bg.avif');
}

.webp .heroe::before {
  background-image: url('/imgs/header-bg/header-bg.webp');
}

.old .heroe::before {
  background-image: url('/imgs/header-bg/header-bg.jpg');
  background-image: image-set(
    url('/imgs/header-bg/header-bg.jpg') 1x,
    url('/imgs/header-bg/header-bg@2x.jpg') 2x
  );
}

.heroe-illu {
  @apply absolute w-full sm:w-auto px-6 sm:px-0 sm:right-[var(--illu-content-x)] mt-5 sm:m-0 sm:absolute top-20 sm:top-1/2 sm:-translate-y-1/2 z-0 z-0;
}

.heroe-illu_content {
  @apply relative pb-[100%] sm:pb-0 w-[var(--illu-content-size-old)] w-[var(--illu-content-size)] h-[var(--illu-content-size-old)] h-[var(--illu-content-size)];
}

.heroe-illu_content::v-deep .dom-gl {
  @apply bg-[length:var(--illu-content-size)_var(--illu-content-size)];
}
</style>
