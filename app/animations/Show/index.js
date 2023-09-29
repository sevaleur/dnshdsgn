import Splitting from "splitting"
import gsap from 'gsap'

export default class Show
{
  constructor(_element)
  {
    this.element = _element

    gsap.set(this.element, { opacity: 0 })

    Splitting({
      target: this.element,
      by: 'chars'
    })
  }

  init()
  {
    this.chars = this.element.querySelectorAll('.char')
    this.show()
  }

  show()
  {
    gsap.set(
      this.chars,
      {
        opacity: 0,
        x: -50
      }
    )

    gsap.to(
      this.chars,
      {
        opacity: 1.0,
        x: 0,
        stagger: 0.1,
        ease: 'power.inOut',
        duration: 2.0,
        delay: 1.0,
      })
  }

  hide()
  {
    gsap.to(
      this.chars,
      {
        opacity: 0.0,
        x: -50,
        stagger: 0.1,
        ease: 'power.inOut',
        duration: 2.0,
      })
  }
}
