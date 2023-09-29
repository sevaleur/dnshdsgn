import * as THREE from 'three'

import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

export default class Preloader
{
  constructor(_scene)
  {
    this.scene = _scene
    this.loading = document.querySelector('.loading')

    this.createOverlay()
  }

  createOverlay()
  {
    const overlay_geo = new THREE.PlaneGeometry(2, 2, 1, 1)

    const overlay_mat = new THREE.ShaderMaterial({
      uniforms:
      {
        u_alpha: { value: 1.0 }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true
    })

    const overlay = new THREE.Mesh(overlay_geo, overlay_mat)

    this.scene.add(overlay)
  }
}
