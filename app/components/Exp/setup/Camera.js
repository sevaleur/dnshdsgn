import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Camera
{
  constructor(_sizes, _scene, _canvas)
  {
    this.sizes = _sizes
    this.scene = _scene
    this.canvas = _canvas

    this.createInstance()
  }

  /*
    CREATE.
  */

  createInstance()
  {
    this.instance = new THREE.PerspectiveCamera(
      20,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    )

    this.instance.setFocalLength(100.0)
    this.instance.position.set(-2.5, 1, 25)

    this.scene.add(this.instance)
  }

  /*
    EVENTS.
  */

  resize()
  {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update()
  {

  }
}
