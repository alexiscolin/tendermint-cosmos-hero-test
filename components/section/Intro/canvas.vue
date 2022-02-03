<template>
  <div ref="canvas" class="dom-gl"></div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'
import { throttle, shadeColor } from '@/assets/js/utils'

// material outside of export -> improve perf
const bitcoinMat = new THREE.MeshStandardMaterial({
  color: '#FFF',
  transparent: true,
  alphaTest: 0.5,
})
const cosmosMat = new THREE.MeshStandardMaterial({
  color: '#4151FA',
  transparent: true,
  side: THREE.DoubleSide,
  alphaTest: 0.5,
})
const msgMat = new THREE.MeshStandardMaterial({
  color: '#FFF',
})
const pathMat = new THREE.MeshStandardMaterial({
  color: 0x2e38ae,
  transparent: true,
})

export default {
  name: 'SectionIntroCanvas',
  data() {
    return {
      canvas: '',
      scene: '',
      camera: '',
      renderer: '',
      planetes: [],
      messages: [],
      cosmos: new THREE.Group(),
      clock: '',
      loader: null,
      loadingManager: null,
      cursor: new THREE.Vector2(0, 0),
      cursorTarget: new THREE.Vector2(),
      easing: 0.15,
      camPos: {
        x: 2,
        y: 2.6,
        z: 2,
      },
    }
  },

  mounted() {
    // loader manager
    this.loadingManager = new THREE.LoadingManager(
      // Loaded
      () => {
        // Wait a little
        window.setTimeout(() => {
          // Animate overlay
          gsap.to(this.cosmos.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1.5,
          })
        }, 400)
      },

      // Progress
      (itemUrl, itemsLoaded, itemsTotal) => {
        // should be done here (feedback is important)
      }
    )
    this.loader = new GLTFLoader(this.loadingManager)

    // init Scene
    this.init()

    // Light (ambiant & point & direct -> better for perf during animation)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    this.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 0.25, 0)
    this.scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0x0000ff, 1)
    this.scene.add(pointLight)

    // Texture (alpha)
    const alphaMap = new THREE.TextureLoader(this.loadingManager).load(
      'imgs/three/patternFull.png'
    )
    bitcoinMat.alphaMap = cosmosMat.alphaMap = alphaMap
    bitcoinMat.alphaMap.magFilter = THREE.NearestFilter
    bitcoinMat.alphaMap.wrapT = THREE.RepeatWrapping
    bitcoinMat.alphaMap.repeat.y = 1

    // set cosmos universe tiny (for reveal)
    this.cosmos.scale.set(0, 0, 0)

    // set Cosmos planete
    const tdCosmos = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 32, 32),
      cosmosMat
    )
    this.cosmos.add(tdCosmos)
    this.loader.load('imgs/three/cosmos_logo_like/scene.gltf', (gltf) => {
      gltf.scene.children[0].scale.set(0.0005, 0.0005, 0.0005)
      gltf.scene.children[0].rotation.y = Math.PI * 0.8
      gltf.scene.children[0].rotation.x = Math.PI * 0.7
      this.cosmos.add(gltf.scene.children[0])
    })

    // set ethereum planete
    const etherOpt = {
      radius: 2.2,
      offset: 10,
    }
    const { path: etherPath, mesh: ethereum } = this.planeteFactory(
      etherOpt,
      bitcoinMat,
      'imgs/three/ethereum_logo/scene.gltf'
    )

    this.cosmos.add(etherPath)
    this.cosmos.add(ethereum)

    // set bitcoin planet (need a proper model)
    const bitcoinOpt = {
      radius: 1.2,
      offset: 0.3,
    }
    const { path: bitcoinPath, mesh: bitcoin } = this.planeteFactory(
      bitcoinOpt,
      bitcoinMat,
      'imgs/three/ethereum_logo/scene.gltf'
    )
    this.cosmos.add(bitcoinPath)
    this.cosmos.add(bitcoin)

    // set dodge planete (need a proper model)
    const DodgeOpt = {
      radius: 2.2,
      offset: 8,
    }
    const { mesh: dodge } = this.planeteFactory(
      DodgeOpt,
      bitcoinMat,
      'imgs/three/ethereum_logo/scene.gltf',
      false
    )

    this.cosmos.add(dodge)

    // empty paths
    const path = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.003, 12, 100, Math.PI * 2),
      pathMat
    )
    const path2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.8, 0.003, 12, 100, Math.PI * 2),
      pathMat
    )
    path.rotation.x = path2.rotation.x = Math.PI * 0.5
    this.cosmos.add(path)
    this.cosmos.add(path2)

    // messages dots
    const msgOpts = [
      {
        radius: 1.6,
        reverse: false,
        offset: 0,
        speed: 1,
        color: 'FFFFFF',
        offsetOp: 0,
        count: 3,
      },
    ]
    msgOpts.push({ ...msgOpts[0], offsetOp: (Math.PI * 2) / 3 })
    msgOpts.push({ ...msgOpts[0], offsetOp: ((Math.PI * 2) / 3) * 2 })
    msgOpts.push({ ...msgOpts[0], radius: 2.2, reverse: true })
    msgOpts.push({ ...msgOpts[3], offsetOp: (Math.PI * 2) / 3 })
    msgOpts.push({ ...msgOpts[3], offsetOp: ((Math.PI * 2) / 3) * 2 })

    const createMsg = (count, opts) => {
      Array.from(Array(count).keys()).forEach((el, i) => {
        opts.offset = opts.offsetOp + i - i * 0.87
        opts.color = shadeColor('#4151FA', i * 40)
        this.messageFactory(opts, msgMat)
      })
    }

    msgOpts.forEach((opt, i) => {
      createMsg(opt.count, opt)
    })

    // rendering cosmos from the scene
    this.cosmos.position.y = 0.02
    this.cosmos.position.x = -0.5
    this.scene.add(this.cosmos)
    this.renderer.render(this.scene, this.camera)

    // start to animate
    this.clock = new THREE.Clock()
    this.animate()

    // events init
    window.addEventListener('mousemove', this.setCursor)
    window.addEventListener('resize', this.resize)
  },

  destroyed() {
    window.removeEventListener('mousemove', this.setCursor)
    window.removeEventListener('resize', this.resize)
  },

  methods: {
    init() {
      // scene init
      this.scene = new THREE.Scene()

      // camera init
      this.camera = new THREE.PerspectiveCamera(
        70,
        this.$refs.canvas.clientWidth / this.$refs.canvas.clientHeight,
        0.1,
        100
      )
      this.camera.position.z = this.camPos.z
      this.camera.position.y = this.camPos.y
      this.camera.position.x = this.camPos.x
      this.camera.lookAt(0, 0, 0)
      this.scene.add(this.camera)

      // renderer init
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
      })
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.renderer.setClearColor(0x000000, 0.0)

      // sizing init
      this.setSize(this.$refs.canvas)

      // add the canvas to the DOM
      this.canvas = this.renderer.domElement
      this.$refs.canvas.appendChild(this.canvas)

      // first renderer
      this.render()
    },

    messageFactory(opt, mat) {
      const msgMat = mat.clone()
      msgMat.color.setHex(`0x${opt.color}`)

      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 32, 32),
        msgMat
      )
      mesh.position.x = opt.radius
      this.messages.push({
        mesh,
        ...opt,
      })
      this.cosmos.add(mesh)
    },

    planeteFactory(opt, mat, coreModel, renderPath = true) {
      const group = new THREE.Group()

      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), mat)
      let path = null
      if (renderPath) {
        path = new THREE.Mesh(
          new THREE.TorusGeometry(opt.radius, 0.007, 12, 100, Math.PI * 2),
          pathMat
        )
        path.rotation.x = Math.PI * 0.5
        path.renderOrder = 999 // to display the core inside alpha -> our planet neet to be rendered after
      }

      mesh.renderOrder = 99 // to display the core inside alpha -> our planet neet to be rendered after

      group.add(mesh)

      mesh.rotation.z = Math.PI * (Math.random() * (0.2 - -0.2) + -0.2) // planet rotation

      this.planetes.push({
        mesh: group,
        path,
        ...opt,
      })

      // load logo
      this.loader.load(coreModel, (gltf) => {
        gltf.scene.children[0].scale.set(0.1, 0.1, 0.1)
        gltf.scene.children[0].position.y = -0.05
        group.add(gltf.scene.children[0])
      })

      return { mesh: group, path }
    },
    animate() {
      // avoid loosing fps
      const elapsedTime = this.clock.getElapsedTime()

      // Update objects
      this.planetes.forEach((planete) => {
        planete.mesh.children[0].material.alphaMap.offset.y = elapsedTime * 0.15
        planete.mesh.position.set(
          Math.cos(planete.offset + elapsedTime * 0.5 + Math.PI * 0.5) *
            planete.radius,
          0,
          Math.sin(planete.offset + elapsedTime * 0.5 + Math.PI * 0.5) *
            planete.radius
        )

        planete.mesh.rotation.y = elapsedTime * Math.PI * 0.2
      })

      this.messages.forEach((msg) => {
        const offset = msg.reverse
          ? msg.offset - elapsedTime * msg.speed
          : msg.offset + elapsedTime * msg.speed
        msg.mesh.position.set(
          Math.cos(offset + Math.PI) * msg.radius,
          0,
          Math.sin(offset + Math.PI) * msg.radius
        )
      })

      // Update camera
      this.cosmos.rotation.x +=
        (this.cursor.x - this.cosmos.rotation.x + 0.3) * this.easing
      this.cosmos.rotation.z +=
        (this.cursor.y - this.cosmos.rotation.z + 0.4) * this.easing
      this.camera.lookAt(0, 0, 0)

      // render animation on canvas
      this.render()
      window.requestAnimationFrame(this.animate)
    },

    render() {
      this.renderer.render(this.scene, this.camera)
    },

    setCursor(e) {
      this.cursor.x = (e.clientX / document.body.clientWidth - 0.5) / 4
      this.cursor.y = (e.clientY / document.body.clientHeight - 0.5) / 4
    },

    setSize(
      container = this.$refs.canvas,
      camera = this.camera,
      renderer = this.renderer
    ) {
      // update the camera & rendering size
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()

      renderer.setSize(container.clientWidth, container.clientHeight)
    },
    resize() {
      // resize the canvas & give it a frame to apply the resize transform
      throttle(() => {
        this.setSize()
        this.render()
      }, 50)()
    },
  },
}
</script>

<style lang="postcss" scoped>
.dom-gl {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-repeat: no-repeat;
  background-position: -10% 0;
  background-image: radial-gradient(
    ellipse at 46% 47%,
    #006eff98 0%,
    rgba(14 22 60 / 50%) 30%,
    rgba(14 22 60/ 0%) 60%
  );
}
</style>
