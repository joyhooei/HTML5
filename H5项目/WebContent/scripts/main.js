'use strict';
var mainApp=angular.module('mainApp',['ui.router','oc.lazyLoad'])
    .config(function($stateProvider,$urlRouterProvider,$uiViewScrollProvider){
            $uiViewScrollProvider.useAnchorScroll();//用于改变state时跳至顶部
            $urlRouterProvider.when("", "/total");
            $urlRouterProvider.otherwise("/total");
            $stateProvider.state("total", {
                url: "/total",templateUrl: "views/total.html",
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/totalCtr.js');
                    }]
                }
            }).state("accountInfo", {
                url: "/accountInfo",templateUrl: "views/accountInfo.html",
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/accountInfoCtr.js');
                    }]
                }
            });
    });

mainApp.controller('userCtr',function($scope,httpAJAX){
    $scope.userName=utils.getCookie('market_user_email');
    //加载产品列表
    httpAJAX.post('getAppNameList',{page:1},function(msg){
       $scope.appList=msg.data;
       if(msg.data.length == 0){
    	   //初始化
           $('#select_app a').text('没有产品');
           $('#select_app a').attr('value','0');
           utils.setCookie('market_app_id','0');
           utils.setCookie('market_app_name','没有产品');
       } else {
    	   //初始化
           $('#select_app a').text(msg.data[0].appName);
           $('#select_app a').attr('value',msg.data[0].appid);
           utils.setCookie('market_app_id',msg.data[0].appid);
           utils.setCookie('market_app_name',msg.data[0].appName);
       }
    });
});

mainApp.controller('navListCtr',function($scope,$location){
    $scope.isActive=function(route){
        return route === $location.path();
    }
});

// ajax service
mainApp.service('httpAJAX',function($http){
    this.post=function(url,parame,call){
        url=utils.ajaxDomain+url;
        $('.loading_img').show();
        var mj=new MxjAlert();
        return $http.post(url,parame).success(function(msg){
            $('.loading_img').hide();
            if(msg.retcode == '-1'){
                var ma = new MxjAlert({'okFn':function(){
                    utils.logout();
                }});
                ma.show('登录过期，请重新登录');
            }else if(msg.retcode == 0){
                call && call(msg);
            }else if(msg.retcode == -3){
                call && call(msg);
            }
        }).error(function(){
            $('.loading_img').hide();
            mj.show('请求服务器失败，请联系系统管理员');
        });
    }
});
