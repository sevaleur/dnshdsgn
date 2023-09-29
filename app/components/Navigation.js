import Page from "classes/Page"

export default class Navigation extends Page
{
  constructor()
  {
    super({
      id: 'navigation',
      element: 'nav.navigation',
      elements:
      {
        title: '.navigation__logo__text',
        connect: '.navigation__connect__link__text'
      }
    })
  }

  create()
  {
    super.create()
  }

  show()
  {
    super.show()
  }

  hide()
  {
    super.hide()
  }
}
