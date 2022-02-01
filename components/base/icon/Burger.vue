<template>
  <div class="ico-burger"><span></span></div>
</template>

<style lang="postcss" scoped>
.ico-burger {
  @apply relative h-6 w-6;

  ::before,
  ::after {
    content: '';
    position: absolute;
    top: 25%;
    left: 0;
    display: block;
    width: 100%;
    height: 1px;
    @apply bg-whites-1000;
  }

  ::after {
    top: 75%;
  }
}
</style>
