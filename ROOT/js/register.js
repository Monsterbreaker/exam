function checkregister() {
    var ID=$("#inputID")
    if(ID.val()==""){
        alert("请输入姓名！");
        ID.focus();
        return;
    }
    var psw=$("#inputPassword")
    if(psw.val()==""){
        alert("请输入密码！");
        psw.focus();
        return;
    }
    var role=$('input:radio[name="role"]:checked');
    if(role.val()==null) {
        alert("请选择你的身份！");
        return;
    }
    $("form").submit();
}