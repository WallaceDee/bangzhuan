import { Button,ColorPicker,Tabs,TabPane,Table,Card,InputNumber,Form,FormItem,Input,Notice,Menu,MenuItem,MenuGroup,Submenu ,Icon ,Row,Col ,Upload ,Breadcrumb,BreadcrumbItem,Divider,Drawer,Switch,Poptip,Modal,RadioGroup,Radio,Page,Select,Option } from 'view-design'
import 'view-design/dist/styles/iview.css'
export default {
  install(Vue) {
    Vue.component('Button', Button)
    Vue.component('ColorPicker', ColorPicker)
    Vue.component('Table', Table)
    Vue.component('Tabs', Tabs)
    Vue.component('TabPane', TabPane)
    Vue.component('Card', Card)
    Vue.component('InputNumber', InputNumber)
    Vue.component('Form', Form)
    Vue.component('FormItem', FormItem)
    Vue.component('Input', Input)
    Vue.component('Menu', Menu)
    Vue.component('MenuItem', MenuItem)
    Vue.component('MenuGroup', MenuGroup)
    Vue.component('Submenu', Submenu)
    Vue.component('Icon', Icon)
    Vue.component('Row', Row)
    Vue.component('Col', Col)
    Vue.component('Upload', Upload)
    Vue.component('Breadcrumb', Breadcrumb)
    Vue.component('BreadcrumbItem', BreadcrumbItem)
    Vue.component('Divider', Divider)
    Vue.component('Drawer', Drawer)
    Vue.component('iSwitch', Switch)
    Vue.component('Poptip', Poptip)
    Vue.component('RadioGroup', RadioGroup)
    Vue.component('Radio', Radio)
    Vue.component('Modal', Modal)
    Vue.component('Page', Page)
    Vue.component('Select', Select)
    Vue.component('Option', Option)
    Vue.prototype.$Notice = Notice
    Vue.prototype.$Modal = Modal
  }
}
