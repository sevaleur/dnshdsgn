import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import gsap from 'gsap'

import EventEmitter from "./EventEmitter"

export default class Resources extends EventEmitter
{
  constructor(_sources, _preloader)
  {
    super()

    this.data_points = _sources.length
    this.loaded = 0

    this.data = {
      textures: {},
      models: {}
    }

    this.setLoaders(_sources, _preloader)
  }

  setLoaders(sources, preloader)
  {
    this.loadingManager = new THREE.LoadingManager(
      () =>
      {
        gsap.to(
          preloader.scene.children[0].material.uniforms.u_alpha,
          {
            value: 0.0,
            duration: 1.0,
            delay: 1.0
          }
        )

        gsap.to(
          preloader.loading.style,
          {
            opacity: 0.0,
            duration: 1.0,
            onComplete: () =>
            {
              preloader.loading.remove()

              gsap.fromTo(
                ['.navigation', '.home'],
                {
                  opacity: 0.0
                },
                {
                  opacity: 1.0,
                  duration: 1.0,
                  delay: 1.0
                }
              )
            }
          }
        )
      },
      (url, loaded, total) =>
      {
        const progress = Math.round((loaded / total) * 100)

        preloader.loading.innerHTML = progress
      }
    )

    this.textureLoader = new THREE.TextureLoader(this.loadingManager)
    this.gltfLoader = new GLTFLoader(this.loadingManager)
    this.startLoading(sources)
  }

  startLoading(sources)
  {
    for(const source of sources)
    {
      switch(source.type)
      {
        case 'texture':
          this.textureLoader.load(
            source.path,
            (data) =>
            {
              this.sourceLoaded(source, data)
            }
          )
        break
        case 'gltf':
          this.gltfLoader.load(
            source.path,
            (data) =>
            {
              this.sourceLoaded(source, data)
            }
          )
        break
        default:
        break
      }
    }
  }

  sourceLoaded(source, data)
  {
    this.loaded++

    source.type === 'texture' ?
      this.data.textures[source.name] = data
      : this.data.models[source.name] = data

    if(this.loaded === this.data_points)
      this.trigger('ready')
  }
}
