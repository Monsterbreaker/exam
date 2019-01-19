<%--
  Created by IntelliJ IDEA.
  User: Monsterbreaker
  Date: 2019/1/1
  Time: 9:12 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>在线考试系统——登录</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../../css/style.css">
    <link rel="stylesheet" type="text/css" href="../../css/register.css">
    <link rel="stylesheet" type="text/css" href="../../css/checkbox.css">
</head>
<body>
<header>
    <h1>在线考试系统</h1>
    <nav>
        <a href="../login/login.jsp">登录</a>
        <a href="register.jsp">注册</a>
    </nav>
</header>
<div class="wrapper">
    <div class="demo form-bg">
        <div class="container">
            <div class="row">
                <div class="col-md-offset-2 col-md-4">
                    <form class="form-horizontal" name="register" method="post" action="<%=request.getContextPath()%>/ser/RegisterServlet">
                        <span class="heading">用户注册</span>
                        <div class="form-group">
                            <input type="text" class="form-control" name="username" id="inputID" placeholder="姓名">
                            <i class="fa fa-user"></i>
                        </div>
                        <div class="form-group help">
                            <input type="password" class="form-control" name="password" id="inputPassword" placeholder="密码">
                            <i class="fa fa-lock"></i>
                        </div>
                        <div class="form-group">
                            <div class="el-radio">
                                <input type="radio" name="role" id="teacher" value="teacher" >
                                <label class="el-radio-style" for="teacher"></label>
                                <span class="margin-r">老师</span>
                            </div>
                            <div class="el-radio">
                                <input type="radio" name="role" id="student" value="student" >
                                <label class="el-radio-style" for="student"></label>
                                <span class="margin-r">学生</span>
                            </div>
                            <a type="submit" class="btn btn-default" onclick="checkregister()">注册</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="../../js/jquery-1.11.0.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="../../js/javascript.js"></script>
<script src="../../js/register.js"></script>
</body>
</html>


