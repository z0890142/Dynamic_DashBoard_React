let onChange = null
export default class Helper {
    ////元件傳送參數給paramscontrol
    static ComponentToControlListener = (handler) => {
        onChange = handler
    }
    static ComponentToControlAdd = (data,index) => {
        onChange(data)
    }
    ////paramscontrol傳送參數給元件
    static ControlToComponentListener = (handler) => {
        onChange = handler
    }
    static ControlToComponentAdd = (text) => {
        onChange(text)
    }


    static setComponentSize=(Propwidth,Propheight,Divwidth,Divheight)=>{

        let width=Divwidth*(parseInt(Propwidth)/100)
        let height=Divheight*(parseInt(Propheight)/100)
        return {width:width,height:height}
    }

    static percentageToNum =(PropData,RefWidth,RefHeight,Divwidth,Divheight)=>{

        let width=(parseInt(RefWidth.replace("px",""))/Divwidth)*100
        let height=(parseInt(RefHeight.replace("px",""))/Divheight)*100

        PropData.width=Math.floor(width).toString()
        PropData.height=Math.floor(height).toString()
        return PropData
    }


    static PositionPercentageToNum =(PropData,latestPosition,Divwidth,Divheight)=>{

        PropData.x=(latestPosition.x/Divwidth)
        PropData.y=( latestPosition.y/Divheight)
        return PropData
    }
}