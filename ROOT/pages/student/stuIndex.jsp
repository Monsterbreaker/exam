<%@ page import="java.util.ArrayList" %><%--
  Created by IntelliJ IDEA.
  User: Monsterbreaker
  Date: 2019/1/1
  Time: 10:49 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>在线考试系统——学生</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../../css/style.css">
    <link rel="stylesheet" type="text/css" href="../../css/checkbox.css">
    <link rel="stylesheet" type="text/css" href="../../css/pushy-buttons.css">
    <link rel="stylesheet" type="text/css" href="../../css/paper.css">
    <link rel="stylesheet" type="text/css" href="../../css/student.css">
</head>
<body>
<div class="container pb30">
    <div class="clear-backend">
        <div class="avatar">
            <div>
                <a href="stuIndex.jsp" target="_blank">
                    <img src="../../images/admin.png" alt="">
                </a>
            </div>
        </div>

        <!-- tab-menu -->
        <input type="radio" class="tab-1" name="tab" checked="checked" value="info">
        <span>我的信息</span><i class="fa fa-user"></i>

        <input type="radio" class="tab-2" name="tab" value="exams">
        <span>参加考试</span><i class="fa fa-file-text"></i>


        <input type="radio" onclick="" class="tab-3" name="tab" value="papers">
        <span>我的试卷</span><i class="fa fa-files-o"></i>

        <%--<input type="radio" class="tab-4" name="tab">--%>
        <%--<span>评卷</span><i class="fa fa-check"></i>--%>

        <%--<input type="radio" class="tab-5" name="tab">--%>
        <%--<span>我评过的试卷</span><i class="fa fa-file-text"></i>--%>

        <%--<input type="radio" class="tab-6" name="tab">--%>
        <%--<span>我的信息</span><i class="fa fa-user"></i>--%>

        <span></span><i></i>

        <span></span><i></i>

        <span></span><i></i>

        <span></span><i></i>

        <span></span><i></i>

        <span></span><i></i>

        <span></span><i></i>

        <%--<input type="radio" class="tab-7" name="tab">--%>
        <%--<span>Photos</span><i class="fa fa-photo"></i>--%>

        <%--<input type="radio" class="tab-8" name="tab">--%>
        <%--<span>Analysis</span><i class="fa fa-line-chart"></i>--%>

        <%--<input type="radio" class="tab-9" name="tab">--%>
        <%--<span>Links</span><i class="fa fa-link"></i>--%>

        <%--<input type="radio" class="tab-10" name="tab">--%>
        <%--<span>Settings</span><i class="fa fa-cog"></i>--%>

        <!-- tab-top-bar -->
        <div class="top-bar">
            <ul>
                <li>
                    <a href="<%=request.getContextPath()%>/ser/StudentServlet?method=logout" title="Log Out">
                        <i class="fa fa-sign-out"></i>
                    </a>
                </li>
                <li>
                    <a href="../../index.jsp" title="Home">
                        <i class="fa fa-home"></i>
                    </a>
                </li>
            </ul>
            <h2>在线考试系统——学生端</h2>
        </div>

        <!-- tab-content -->
        <div class="tab-content">
            <section class="tab-item-1">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 userInfo">
                            <div class="username">
                                <div class="infoLabel">姓名:</div>
                                <div id="username"></div>
                            </div>
                            <div class="userID">
                                <div class="infoLabel">账号:</div>
                                <div id="userID"></div>
                            </div>
                            <button type="button" class="btn btn--sm btn--blue" onclick="changepsw()">修改密码</button>
                            <%--<div class="psw">--%>
                            <%--<form id="changepsw" name="changepsw" method="post" action="changepsw.jsp">--%>
                            <%--<br>--%>
                            <%--<span>旧密码：</span><input type="password" id="oldpsw">--%>
                            <%--<br>--%>
                            <%--<span>新密码：</span><input type="password" id="newpsw">--%>
                            <%--<button type="button" class="btn btn--sm btn--blue" onclick="reserve()">确认修改</button>--%>
                            <%--</form>--%>
                            <%--</div>--%>
                        </div>
                    </div>
                </div>
            </section>
            <section class="tab-item-2">
                <div class="searchExam" id="searchExam">
                    <span>试卷编号：</span><input type="text" id="examPno">
                    <button type="button" class="btn btn--sm btn--blue" onclick="searchExam()">查找</button>
                    <br>
                    <table class="respond" id="examRecords">
                        <thead>
                        <tr>
                            <th>试卷名称</th>
                            <th>老师</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="paper" id="examPaper">
                    <button type="button" class="btn btn--sm btn--blue" onclick="closeExam()"><i
                            class="fa fa-times fa-2x"></i></button>
                    <div class="row paperInfo">
                        <div class="col-md-12">
                            <div id="examPaperInfoLabel">试卷名称：</div>
                            <div id="examPaperNo">试卷编号：</div>
                            <div id="examTeacher">出卷人：</div>
                            <div id="examTotalPoint">总分：</div>
                        </div>
                    </div>
                    <div class="row paperContent">
                        <div class="col-md-12">
                            <strong>一、选择题</strong>
                            <div id="createChoiceQuestions_exam">
                            </div>
                            <br>
                            <strong>二、填空题</strong>
                            <div id="createFillInBlanksQuestions_exam">
                            </div>
                            <br>
                            <strong>三、简答题</strong>
                            <div id="createShortAnswerQuestions_exam">
                            </div>
                            <br>
                            <strong>四、综合题</strong>
                            <div id="createComprehensiveQuestions_exam">
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn--sm btn--blue" onclick="submitExam()"><i
                            class="fa fa-floppy-o fa-2x"></i></button>
                </div>
            </section>
            <section class="tab-item-3">
                <%--<%Student.setPaperArrayList();%>--%>
                <table class="respond" id="paperRecords">
                    <thead>
                    <tr>
                        <th>试卷名称</th>
                        <th>老师</th>
                        <th>分数</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <%--<tr>--%>
                    <%--<td>Airi Satou</td>--%>
                    <%--<td>Accountant</td>--%>
                    <%--<td>Tokyo</td>--%>
                    <%--<td>--%>
                    <%--<button type="button" class="btn btn--sm btn--blue" id="1"onclick="lookPaper(id)">查看试卷</button>--%>
                    <%--</td>--%>
                    <%--</tr>--%>
                    </tbody>
                </table>
                <div class="paper" id="paper">
                    <button type="button" class="btn btn--sm btn--blue" onclick="closePaper()"><i
                            class="fa fa-times fa-2x"></i></button>
                    <div class="row paperInfo">
                        <div class="col-md-12">
                            <div id="paperInfoLabel">试卷名称：</div>
                            <div id="paperNo">试卷编号：</div>
                            <div id="teacher">出卷人：</div>
                            <div id="totalPoint">总分：</div>
                        </div>
                    </div>
                    <div class="row paperContent">
                        <div class="col-md-12">
                            <strong>一、选择题</strong>
                            <div id="createChoiceQuestions">

                            </div>
                            <br>
                            <strong>二、填空题</strong>
                            <div id="createFillInBlanksQuestions">

                            </div>
                            <br>
                            <strong>三、简答题</strong>
                            <div id="createShortAnswerQuestions">
                            </div>
                            <br>
                            <strong>四、综合题</strong>
                            <div id="createComprehensiveQuestions">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="tab-item-4">
                <h1>Four</h1>
            </section>
            <section class="tab-item-5">
                <h1>Five</h1>
            </section>
            <section class="tab-item-6">
                <h1>Six</h1>
            </section>
            <section class="tab-item-7">
                <h1>Sever</h1>
            </section>
            <section class="tab-item-8">
                <h1>Eight</h1>
            </section>
            <section class="tab-item-9">
                <h1>Nine</h1>
            </section>
            <section class="tab-item-10">
                <h1>Ten</h1>
            </section>
        </div>
    </div>
</div>
<script src="http://cdn.bootcss.com/jquery/1.11.0/jquery.min.js" type="text/javascript"></script>
<script>window.jQuery || document.write('<script src="../../js/jquery-1.11.0.min.js"><\/script>')</script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="../../js/paper.js"></script>
<script src="../../js/student.js"></script>
</body>
</html>
