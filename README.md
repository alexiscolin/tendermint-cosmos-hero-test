# cosmos-heroe-test

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## What was done in 4-hour time

- Nuxt setup
- Threejs animation (basics)
- Page integration
    - Tailwind CSS + PostCSS (utility-first framework -> component friendly)
    - Nuxt components architecture
    - Responsive
- Testing on major browsers & devices

## What was done in extra time

This is out of the initial task scope, however I consider these steps as necessary to deliver actionable work for Tendermint.

- Selection of the scene to recreate in the Cosmos video
- Preparatory work for integration on Figma mock-ups
    - Grid placement
    - Breakpoint review
    - Font rationalization
- Advanced Nuxt logic for modularity (eg header sub-components) across Tendermint websites and its family sites
- Reveal animations & transitions
- Threejs easing on "mousemove" event
- Threejs asset management

## What could have been done with more time/creative assets

- Creative development
    - Animation of the 3D logos of Tendermint and its family companies (need 3D models -> I only found the Ethereum logo on creative commons)
    - For better perfomance, the webgl part should be dispatch across components and shoud run one unique background renderer instead of one renderer by component (here heroe section). But to pursue this logic the developper needs to have all the specification regarding the page/website/websites. This architecture has a potential to be very modular (even outside of Nuxt)
    - Better code organisation in the canvas compoments
    - Creation and animation of the 3D octogonal design representing apps
    - Organic alpha texture creation (atmospheres and clouds simulation) instead of the linear one
    - More visual and animated interactions between blockchains and industries
    - More Easing on threejs animation
    - Fluid typography
    - SEO (og, JSON-lD...)
    - Glowing effect through the planets (postprocessing)
    - Creating stars background in 3D in order to add depth to the scene
    - RAM optimization / loading speed for Threejs (Material creation, loader feedback,dispose of materials on destroy, merge geometries )
    - Animation on mobile (gyroscope)
    - Navigation menu on mobile (not included in the provided mockups)
    - Accessibility state changes
- Message and goal
    - Iteration with the team over the ultimate message to convey visually on the scene
- Typescript (I chose to spend time on the 3D instead)