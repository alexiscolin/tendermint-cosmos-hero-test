<template>
  <div class="grid grid-cols-2 items-center">
    <ul class="flex justify-center">
      <li v-for="{ title, path } in routesLinks" :key="title" class="p-1">
        <BaseLink :to="path" type="nav" class="inline-block px-4 font-medium">
          {{ title }}
        </BaseLink>
      </li>
    </ul>
    <div v-if="$slots.navend" class="flex justify-end">
      <slot name="navend" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TmpNavigation',
  props: {
    routesLinks: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
}
</script>
