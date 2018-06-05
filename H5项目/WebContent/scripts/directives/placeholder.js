/**
 * Created with IntelliJ IDEA.
 * User: mingxianjun
 * Date: 16-5-31
 * Time: 下午5:01
 */
;(function(angular){
    "use strict";
    var app = angular.module('loginApp',[]);
    app.directive('placeholder', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, ele, attr) {
                var id = ele.context.id;
                if(attr.placeholder && !('placeholder' in document.createElement('input'))){
                    $('#'+id).after('<span class="input_span">'+attr.placeholder+'</span>');
                    ele.bind('focus',function(){
                        $('#'+id).siblings('span.input_span').addClass('hide');
                    });
                    ele.bind('blur',function(){
                        if(ele.val() == ''){
                            $('#'+id).siblings('span.input_span').removeClass('hide');
                        }
                    });
                }
            }
        };
    });
})(angular);
