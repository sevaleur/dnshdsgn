import Page from 'classes/Page'

export default class Home extends Page
{
  constructor()
  {
    super({
      id: 'home',
      element: '.home',
      elements: {
        title: '.home__title',
        title_text: '.home__title__text'
      }
    })
  }

  /*
    CREATE.
  */

  create()
  {
    super.create()
  }

  /*
    EVENTS.
  */

  show()
  {
    super.show()
  }

  hide()
  {
    super.hide()
  }
}
