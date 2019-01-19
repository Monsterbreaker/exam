var jqxhr;
$.ajaxSetup({
    complete:function () {
        if("REDIRECT" == jqxhr.getResponseHeader("REDIRECT")){ //若HEADER中含有REDIRECT说明后端想重定向，
            var win = window;
            while(win != win.top){
                win = win.top;
            }
            win.location.href = jqxhr.getResponseHeader("CONTENTPATH");//将后端重定向的地址取出来,使用win.location.href去实现重定向的要求
        }
    }
})