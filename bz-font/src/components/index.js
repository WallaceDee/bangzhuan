import { Button, Table,FormItem ,Form,Divider,Row,Col,Page } from 'view-design'
import BzHeader from './BzHeader/'
import BzFooter from './BzFooter/'
import Block from './Block/'
import Arrow from './Arrow/'
import Title from './Title/'
import 'view-design/dist/styles/iview.css'
export default {
  install(Vue) {
    Vue.component('Row', Row)
    Vue.component('Col', Col)
    Vue.component('BzHeader', BzHeader)
    Vue.component('BzFooter', BzFooter)
    Vue.component('Button', Button)
    Vue.component('Table', Table)
    Vue.component('Form', Form)
    Vue.component('FormItem', FormItem)
    Vue.component('Divider', Divider)
    Vue.component('Block', Block)
    Vue.component('Arrow', Arrow)
    Vue.component('Title', Title)
    Vue.component('Page', Page)
  }
}
