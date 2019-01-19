<%--
  Created by IntelliJ IDEA.
  User: Monsterbreaker
  Date: 2018/12/31
  Time: 2:35 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<%
    //获取用户名
    String username=request.getParameter("username");
    //获取密码
    String password=request.getParameter("password");
    //获取角色
    String role=request.getParameter("role");
    //判断是否选中记住
%>
<script language="JavaScript">
    alert("<%=username%>");
    window.location.href="../../index.jsp";
</script>
</body>
</html>
