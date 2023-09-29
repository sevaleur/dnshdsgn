import * as THREE from 'three'

export default class Asset
{
  constructor(name, object, mat, _data)
  {
    this.name = name

    this.obj = object.scene.children[0]
    this.obj.material = mat

    this.createAsset(_data)
  }

  /*
    CREATE.
  */

  createAsset(_data)
  {
    _data.textures[this.name].flipY = false
    _data.textures[this.name].colorSpace = THREE.SRGBColorSpace

    this.obj.material.map = _data.textures[this.name]
  }

  /*
    EVENTS.
  */

  hide()
  {

  }

  show()
  {

  }

  update()
  {

  }
}
