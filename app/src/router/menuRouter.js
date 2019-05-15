import Home from "../view/menu/index";
import Cjyl from "../view/menu/cjyl";
import Cjlr from "../view/menu/cjlr";
import Dgyl from "../view/menu/dgyl";
import Dglr from "../view/menu/dglr";
import Wjyl from "../view/menu/wjyl";
import Wjlr from "../view/menu/wjlr";
import Ckzy from "../view/menu/ckzy";
import Bzzy from "../view/menu/bzzy";
import Jsgl from "../view/menu/jsgl";
import Ckjd from "../view/menu/ckjd";
import Lrjd from "../view/menu/lrjd";
import Ckjl from "../view/menu/ckjl";
import Tjjl from "../view/menu/tjjl";
import Mstj from "../view/menu/mstj";
import Tjms from "../view/menu/tjms";
import Jytj from "../view/menu/jytj";
import Jylr from "../view/menu/jylr";
import Ckgl from "../view/menu/ckgl";
import Tjgl from "../view/menu/tjgl";
import Ckjs from "../view/menu/ckjs";
import Tjjs from "../view/menu/tjjs";
import Xslb from "../view/menu/xslb";
import Tjxs from "../view/menu/tjxs";
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
    path:"/breakrule",
    component:Wjyl
},{
    path:"/entringrule",
    component:Wjlr
},{
    path:"/homework",
    component:Ckzy
},{
    path:"/homeworkin",
    component:Bzzy
},{
    path:"/review",
    component:Ckjd
},{
    path:"/reviewin",
    component:Lrjd
},{
    path:"/resume",
    component:Ckjl
},{
    path:"/resumein",
    component:Tjjl
},{
    path:"/face",
    component:Mstj
},{
    path:"/facein",
    component:Tjms
},{
    path:"/work",
    component:Jytj
},{
    path:"/workin",
    component:Jylr
},{
    path:"/adminlist",
    component:Ckgl
},{
    path:"/adminin",
    component:Tjgl
},{
    path:"/teacherlist",
    component:Ckjs
},{
    path:"/teacherin",
    component:Tjjs
},{
    path:"/studentlist",
    component:Xslb
},{
    path:"/studentin",
    component:Tjxs
},{
    path:"/rankList",
    component:Jsgl
}]