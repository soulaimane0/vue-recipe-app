import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import fontawesome bars icon
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faX)

export default (app: any) => {
  app.component('fa', FontAwesomeIcon)
}
