/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

egret_h5.startGame = function () {
    var  context = egret.MainContext.instance;
    context.touchContext = new egret.HTML5TouchContext();
    context.deviceContext = new egret.HTML5DeviceContext();
    context.netContext = new egret.HTML5NetContext();

    var findHrefParms = function(key){
        var url = location.href;

        if (url.indexOf('?') > -1) {
            var arr = url.split('?')[1].split('&');
            for (var i = 0; i < arr.length; i ++) {
                var arr2 = arr[i].split('=');
                if (arr2[0] == key) {
                    return arr2[1];
                }
            }
        }
        return null;
    }

    var full = findHrefParms("fullscreen");

    egret.StageDelegate.getInstance().setDesignSize(640, 960);
    context.stage = new egret.Stage();
    var scaleMode =  egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE ? egret.StageScaleMode.SHOW_ALL : egret.StageScaleMode.SHOW_ALL;
    if(full == "1"){
        scaleMode = egret.StageScaleMode.NO_BORDER;
    }
    context.stage.scaleMode = scaleMode;

    //WebGL是egret的Beta特性，默认关闭
    var rendererType = 0;
    if (rendererType == 1) {// egret.WebGLUtils.checkCanUseWebGL()) {
        context.rendererContext = new egret.WebGLRenderer();
    }
    else {
        context.rendererContext = new egret.HTML5CanvasRenderer();
    }

    egret.MainContext.instance.rendererContext.texture_scale_factor = 1;
    context.run();

    var rootClass;
    if(document_class){
        rootClass = egret.getDefinitionByName(document_class);
    }
    if(rootClass) {
        var rootContainer = new rootClass();
        if(rootContainer instanceof egret.DisplayObjectContainer){
            context.stage.addChild(rootContainer);
        }
        else{
            throw new Error("文档类必须是egret.DisplayObjectContainer的子类!");
        }
    }
    else{
        throw new Error("找不到文档类！");
    }

    //处理屏幕大小改变
    var resizeTimer = null;
    var doResize = function () {
        context.stage.changeSize();
        resizeTimer = null;

        if((typeof doAction) != "undefined"){
            doAction("loading_resize");
        }
    };
    window.onresize = function () {
        if (resizeTimer == null) {
            resizeTimer = setTimeout(doResize, 500);
        }
        changeMaskStatus();
    };

    var changeMaskStatus = function(){
        var ua = navigator.userAgent.toLowerCase();
        var ldimg=document.getElementById("loadingDiv");

        if (ua.indexOf("android") >= 0) {
            if (Math.abs(window.orientation) == 0 || Math.abs(window.orientation) == 180) {
                ldimg.style.display = "none";
                global_lock = false;
                egret.MainContext.instance.stage.touchEnabled = true;
            }else {
                //if(!ingame && full!="1"){
                //    ldimg.style.display = "block";
                //}
                ldimg.style.display = "block";
                global_lock = true;
                egret.MainContext.instance.stage.touchEnabled = false;
            }
            return;
        }

        if(!window.orientation){
            //if(window.outerWidth > window.outerHeight){
            //    ldimg.style.display = "block";
            //}else{
            //    ldimg.style.display = "none";
            //}
            return;
        }
        if (window.orientation%180 != 0) {
            ldimg.style.display = "block";
            global_lock = true;
            egret.MainContext.instance.stage.touchEnabled = false;
        }else {
            ldimg.style.display = "none";
            global_lock = false;
            egret.MainContext.instance.stage.touchEnabled = true;
        }
        return;

        if(Math.abs(window.orientation) == 90){
            var temp = window.innerWidth;
            if(temp < window.innerHeight){
                temp = window.innerHeight;
            }

            maskDiv = document.createElement("DIV");
            maskDiv.style.zIndex = "9999";
            maskDiv.style.width = "100%";
            maskDiv.style.height = temp + "px";
            maskDiv.style.background = "#666666";
            document.body.appendChild(this.div);

            global_lock = true;
            egret.MainContext.instance.stage.touchEnabled = false;
        }
        else{
            if(maskDiv){
                document.body.removeChild(maskDiv);
            }
            global_lock = false;
            egret.MainContext.instance.stage.touchEnabled = true;
        }
    }

    changeMaskStatus();
};

var global_lock = false;

var maskDiv;

var stopTouch = function() {
    document.body.addEventListener('touchmove', function(e) {
        if (global_lock) {
            e.stopPropagation();
            e.preventDefault();
        }
    });
}

stopTouch();