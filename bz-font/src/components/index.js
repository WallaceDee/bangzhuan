import { Button, Table,FormItem ,Form,Divider,Row,Col,Page,Modal,Card,Input,Spin } from 'view-design'
import BzHeader from './BzHeader/'
import BzFooter from './BzFooter/'
import Block from './Block/'
import Arrow from './Arrow/'
import Title from './Title/'
import Previewer from './Previewer/'
import '../assets/less/theme.less'
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
    Vue.component('Modal', Modal)
    Vue.component('Card', Card)
    Vue.component('Input', Input)
    Vue.component('Spin', Spin)
    Vue.component('Previewer', Previewer)
    Vue.prototype.$Modal = Modal
  }
}
