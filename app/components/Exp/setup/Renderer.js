import * as THREE from 'three'

export default class Renderer
{
  constructor(_canvas, _sizes, _scene, _camera)
  {
    this.canvas = _canvas
    this.sizes = _sizes
    this.scene = _scene
    this.camera = _camera

    this.setInstance()
  }

  setInstance()
  {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    })
/*
    this.instance.toneMapping = THREE.ACESFilmicToneMapping */

    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.ratio)
  }

  resize()
  {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.ratio)
  }

  update()
  {
    this.instance.render(this.scene, this.camera.instance)
  }
}
