import Exp from 'components/Exp'

import Home from 'pages/home'
import Navigation from 'components/Navigation'

export default class App
{
  constructor()
  {
    this.createContent()
    this.createCanvas()
    this.createPages()
  }

  /*
    CREATE.
  */

  createContent()
  {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createCanvas()
  {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)

    this.exp = new Exp(
      this.canvas
    )
  }

  createPages()
  {
    this.pages = {
      home: new Home()
    }

    this.navigation = new Navigation()
    this.navigation.create()
    this.navigation.show()

    this.page = this.pages[this.template]
    this.page.create()
    this.page.show()
  }
}

new App()
