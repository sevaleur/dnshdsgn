import gsap from 'gsap'

import each from 'lodash/each'

export default class Page
{
  constructor({ id, element, elements })
  {
    this.id = id
    this.pageSelector = element
    this.pageElements = {
      ...elements,
      images: `[data-src]`
    }
  }

  /*
    CREATE.
  */

  create()
  {
    this.element = document.querySelector(this.pageSelector)
    this.elements = {}

    each(this.pageElements, (entry, key) =>
    {
      if(entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry))
      {
        this.elements[key] = entry
      }
      else
      {
        this.elements[key] = document.querySelectorAll(entry)

        if(this.elements[key].length === 0)
        {
          this.elements[key] = null
        }
        else if(this.elements[key].length === 1)
        {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })
  }

  /*
    EVENTS.
  */

  show()
  {

  }

  hide()
  {
    return new Promise(resolve =>
    {
      this.animateOut = gsap.timeline()

      this.animateOut.to(this.element,
      {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }
}
