<template>
  <div><SectionHeroe></SectionHeroe></div>
</template>

<script>
export default {
  name: 'IndexPage',
  transition: 'home',
  head: {
    title: 'Cosmos: The Internet of Blockchains',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Cosmos is an ever-expanding ecosystem of interoperable and sovereign blockchain apps and services, built for a decentralized future.',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
}
</script>
