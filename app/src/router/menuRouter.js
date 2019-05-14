import Home from "../view/menu/index";
import Cjyl from "../view/menu/cjyl";
import Cjlr from "../view/menu/cjlr";
import Dgyl from "../view/menu/dgyl";
import Dglr from "../view/menu/dglr";
import Jsgl from "../view/menu/jsgl";
export default [{
    path:"/",
    component:Home
},{
    path:"/resultpreview",
    component:Cjyl
},{
    path:"/resultentering",
    component:Cjlr
},{
    path:"/step/:id",
    component:Dgyl
},{
    path:"/entringstep/:id",
    component:Dglr
},{
    path:"/rankList",
    component:Jsgl
}]