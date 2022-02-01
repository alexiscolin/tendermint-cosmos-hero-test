<template>
  <header role="banner" class="fixed w-full z-40">
    <nav
      aria-labelledby="header-navigation"
      class="container grid grid-cols-6 items-center text-0.5"
    >
      <BaseLink to="/" class="col-span-2 py-10">
        <BaseIconCosmos />
      </BaseLink>
      <TheHeaderNav
        id="mainNavigation"
        :routes-links="routesLinks"
        class="col-span-4 hidden sm:grid grid-cols-4"
      >
        <template #navend>
          <BaseLink to="#" title="Start now" type="cta" blank
            >Start Now</BaseLink
          >
        </template>
      </TheHeaderNav>

      <BaseIcon
        tag="button"
        aria-controls="mainNavigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
        class="sm:hidden col-start-6 justify-self-end"
      >
        <BaseIconBurger />
      </BaseIcon>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      // Could come from any Headless CMS / content module / API / static data or whatever from a `Fetch` func
      routesLinks: [
        {
          id: 1,
          title: 'Learn',
          path: '#',
        },
        {
          id: 2,
          title: 'Build',
          path: '#',
        },
        {
          id: 3,
          title: 'Explore',
          path: '#',
        },
      ],
    }
  },
}
</script>
