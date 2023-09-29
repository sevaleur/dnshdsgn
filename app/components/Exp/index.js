import * as THREE from 'three'

import Sizes from './utils/Sizes'
import Time from './utils/Time'
import Preloader from './utils/Preloader'
import Resources from './utils/Resources'

import _sources from './data/sources'

import Camera from './setup/Camera'
import Renderer from './setup/Renderer'

import World from './World'

export default class Exp
{
  static instance

  constructor(_canvas)
  {
    if(Exp.instance)
      return Exp.instance

    Exp.instance = this

    this.canvas = _canvas

    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.preloader = new Preloader(this.scene)

    this.resources = new Resources(
      _sources,
      this.preloader
    )

    this.camera = new Camera(
      this.sizes.screen,
      this.scene,
      this.canvas
    )

    this.renderer = new Renderer(
      this.canvas,
      this.sizes.screen,
      this.scene,
      this.camera
    )

    this.sizes.on('resize', () => { this.resize() })
    this.time.on('update', () => { this.update() })

    this.resources.on('ready', () => {
      this.world = new World(
        this.resources.data,
        this.scene,
        this.camera
      )
    })
  }

  resize()
  {
    this.camera.resize()
    this.renderer.resize()
  }

  update()
  {
    if(this.world)
      this.world.update()

    this.camera.update()
    this.renderer.update()
  }
}
