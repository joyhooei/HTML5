/**
 * Created by mingxianjun on 2015-11-30.
 */
;(function($){
    var mxjalert=function(settings){
        if(!settings){
            settings={};
        }
        var self=this;
        this.settings={okBtn:'确定',okFn:function(){},cancelFn:function(){}};
        $.extend(this.settings,settings);
        this.bodyNode=$(document.body);
        this.mxjMask=$('<div id="mxjalert-mask">');
        this.mxjBox=$('<div id="mxjalert-box">');
        this.resizeFlag=true;
        this.renderHtml();
        this.mxjBoxMsg=this.mxjBox.find('div.mxjalert-msg');
        this.mxjBoxOkBtn=this.mxjBox.find('button.mxjalert-ok-btn');
        this.mxjBoxCancelBtn=this.mxjBox.find('button.mxjalert-cancel-btn');
        if(this.mxjBoxOkBtn){
            var _this=this;
            this.mxjBoxOkBtn.click(function(){
                _this.settings.okFn();
                _this.resetBox();
            });
        }
        if(this.mxjBoxCancelBtn){
            var _this=this;
            this.mxjBoxCancelBtn.click(function(){
                _this.settings.cancelFn();
                _this.resetBox();
            });
        }
        this.show=function(msg,align){
            if(msg && msg!= this.settings.msg){
                this.settings.msg=msg;
            }
            if(align){
                this.mxjBoxMsg.css('textAlign',align);
            }
            this.mxjBoxMsg.html(this.settings.msg);
            this.showBox();
        };
        $(window).resize(function(){
            if(self.resizeFlag){
                self.resizeFlag=false;
                self.changeBox();
            }
        });
    };
    mxjalert.prototype={
        renderHtml:function(){
            this.bodyNode.find('#mxjalert-mask,#mxjalert-box').remove();
            var okBtn='',cancelBtn='';
            if(this.settings.okBtn){
                okBtn='<button class="mxjalert-btn mxjalert-ok-btn">'+this.settings.okBtn+'</button>';
            }
            if(this.settings.cancelBtn){
                cancelBtn='<button class="mxjalert-btn mxjalert-cancel-btn" style="margin-left: 25px;">'+this.settings.cancelBtn+'</button>';
            }
            var str='<div class="mxjalert-msg"></div>'+
                '<div class="mxjalert-btn-box clearfix">'+okBtn+cancelBtn+'</div>';
            this.mxjBox.append(str);
            this.bodyNode.append(this.mxjMask,this.mxjBox);
        },
        showBox:function(){
            var self=this;
            this.mxjMask.show();
            var winWidth =$(window).width(),
                winHeight=$(window).height();
            this.mxjBox.css({
                top:-(self.mxjBox.height())+'px',
                left:(winWidth-self.mxjBox.width())/2+'px'
            });
            this.mxjBox.show().animate({
                top:(winHeight-self.mxjBox.height())/2+'px'
            },300);
        },
        changeBox:function(){
            var self=this;
            var winWidth =$(window).width(),
                winHeight=$(window).height();
            this.mxjBox.css({
                top:(winHeight-self.mxjBox.height())/2+'px',
                left:(winWidth-self.mxjBox.width())/2+'px'
            });
            self.resizeFlag=true;
        },
        resetBox:function(){
            this.mxjMask.hide();
            this.mxjBox.hide().css({
                top:0,
                left:0
            });
        }
    };
    window['MxjAlert']=mxjalert;
})(jQuery);