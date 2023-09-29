import * as THREE from 'three'
import gsap from 'gsap'

import Asset from './Asset'

export default class World
{
  constructor(_data, _scene, _camera)
  {
    this.camera = _camera
    this.scene = _scene

    this.createAssets(_data)
    this.createScene()
    this.show()
  }

  /*
    CREATE.
  */

  createAssets(_data)
  {
    this.assets = []
    this.material = new THREE.MeshBasicMaterial({ map: null, transparent: true })
    this._pos = new THREE.Vector3()

    for(const [k, v] of Object.entries(_data.models))
    {
      let mat = this.material.clone()

      if(k === 'kay_bojesen')
        this._pos = v.scene.children[0].position.clone()

      this.assets.push(
        new Asset(
          k,
          v,
          mat,
          _data
        )
      )
    }
  }

  createScene()
  {
    this.home = new THREE.Group()
    this.assets.forEach(a =>
    {
      if(a.name === 'nd104')
      {
        a.obj.position.copy(this._pos)
        a.obj.position.y = 0
      }
      this.home.add(a.obj)
    })
    this.scene.add(this.home)
    this.createMovement()
  }

  createMovement()
  {
    window.addEventListener('mousemove', (e) =>
    {
      gsap.to(
        this.home.rotation,
        {
          y: (e.clientX / window.innerWidth * 2 - 1) * 0.05,
          x: -(e.clientY / window.innerHeight * 2 - 1) * 0.02,
          duration: 2.0
        }
      )
    })
  }

  /*
    EVENTS.
  */

  hide(obj)
  {
    gsap.fromTo(
      obj.material,
      {
        opacity: 1.0
      },
      {
        opacity: 0.0,
        duration: 1.0,
        delay: 0.2,
        ease: 'power.inOut',
        onComplete: () =>
        {
          console.log(obj)
        }
      }
    )
  }

  show()
  {
    this.assets.forEach(a =>
    {
      gsap.fromTo(
        a.obj.material,
        {
          opacity: 0.0
        },
        {
          opacity: 1.0,
          duration: 1.0,
          delay: 0.2,
          ease: 'power2.inOut'
        }
      )
    })
  }

  update()
  {

  }
}
