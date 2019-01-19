<%--
  Created by IntelliJ IDEA.
  User: Monsterbreaker
  Date: 2018/12/31
  Time: 7:20 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>在线考试系统——老师</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../../css/style.css">
    <link rel="stylesheet" type="text/css" href="../../css/checkbox.css">
    <link rel="stylesheet" type="text/css" href="../../css/pushy-buttons.css">
    <link rel="stylesheet" type="text/css" href="../../css/paper.css">
    <link rel="stylesheet" type="text/css" href="../../css/teacher.css">
</head>
<body>
<%--<header>--%>
<%--<h1>在线考试系统</h1>--%>
<%--<nav>--%>
<%--<a href="../../index.jsp">首页</a>--%>
<%--<a href="login.jsp">登录</a>--%>
<%--</nav>--%>
<%--</header>--%>
<div class="container pb30">
    <div class="clear-backend">
        <div class="avatar">
            <div>
                <a href="tchIndex.jsp" target="_blank">
                    <img src="../../images/admin.png" alt="">
                </a>
            </div>
        </div>

        <!-- tab-menu -->
        <input type="radio" class="tab-1" name="tab" checked="checked">
        <span>我的信息</span><i class="fa fa-user"></i>

        <input type="radio" class="tab-2" name="tab">
        <span>录入试卷</span><i class="fa fa-files-o"></i>

        <input type="radio" class="tab-3" name="tab">
        <span>查看试卷</span><i class="fa fa-list-ol"></i>

        <input type="radio" class="tab-4" name="tab">
        <span>录入试题</span><i class="fa fa-check"></i>

        <input type="radio" class="tab-5" name="tab">
        <span>查看试题</span><i class="fa fa-file-text"></i>

        <input type="radio" class="tab-6" name="tab">
        <span>评分</span><i class="fa fa-user"></i>


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
                    <a href="<%=request.getContextPath()%>/ser/TeacherServlet?method=logout" title="Log Out">
                        <i class="fa fa-sign-out"></i>
                    </a>
                </li>
                <li>
                    <a href="../../index.jsp" title="Home">
                        <i class="fa fa-home"></i>
                    </a>
                </li>
            </ul>
            <h2>在线考试系统——教师端</h2>
        </div>

        <!-- tab-content -->
        <div class="tab-content">
            <%--我的信息--%>
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
                            <button type="button" class="btn btn--sm btn--blue" onclick="showModName()">修改姓名</button>
                            <div id="modNamePane"></div>
                            <button type="button" class="btn btn--sm btn--blue" onclick="showAddStu()">添加学生</button>
                            <div id="addStuPane"></div>
                        </div>
                    </div>
                </div>
            </section>
                <%--录入试卷--%>
            <section class="tab-item-2">
                <div class="container paperEditor">
                    <div class="row">
                        <div class="col-md-6">新增</div>
                        <div class="col-md-6">从题库选择</div>
                    </div>
                    <div class="row paperNav">
                        <div class="col-md-6">
                            <div class="col-md-2">
                                <button type="button" class="btn btn--sm btn--green" onclick="createChoiceQuestion()">选择题
                                </button>
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn--sm btn--green" onclick="createfillBlanksQuestion()">
                                    填空题
                                </button>
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn--sm btn--green" onclick="createShortAnswerQuestion()">
                                    简答题
                                </button>
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn--sm btn--green"
                                        onclick="createComprehensiveQuestion()">综合题
                                </button>
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn--sm btn--blue"
                                        onclick="setPaper()">保存
                                </button>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="col-md-2">
                                <button type="button" class="btn btn--sm btn--red"
                                        onclick="searchQuestionFromBankToChoose(0,1)">选择题
                                </button>
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn--sm btn--red"
                                        onclick="searchQuestionFromBankToChoose(0,2)">
                                    填空题
                                </button>
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn--sm btn--red"
                                        onclick="searchQuestionFromBankToChoose(0,3)">
                                    简答题
                                </button>
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn--sm btn--red"
                                        onclick="searchQuestionFromBankToChoose(0,4)">综合题
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 paper">
                            <div class="row paperInfo">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="paperInfoLabel">试卷名称：</div>
                                            <div id="paperName" contenteditable="true"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row paperContent">
                                <div class="col-md-12">
                                    <div id="createChoiceQuestions">
                                        <strong>一、选择题</strong>
                                    </div>
                                    <br>
                                    <div id="createFillInBlanksQuestions">
                                        <strong>二、填空题</strong>
                                    </div>
                                    <br>
                                    <div id="createShortAnswerQuestions">
                                        <strong>三、简答题</strong>
                                    </div>
                                    <br>
                                    <div id="createComprehensiveQuestions">
                                        <strong>四、综合题</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-md-offset-5 paper" id="questionBank">
                            <h2 style="border-bottom: 1px solid grey;">题库</h2>
                        </div>
                    </div>
                </div>
            </section>
                <%--查看试卷--%>
            <section class="tab-item-3">
                <div class="searchExam" id="searchExam">
                    <span>试卷编号：</span><input type="text" id="examPno">
                    <button type="button" class="btn btn--sm btn--blue" onclick="searchExam(2)">查找</button>
                    <button type="button" class="btn btn--sm btn--blue" onclick="searchExam(1)">我的试卷</button>
                    <button type="button" class="btn btn--sm btn--blue" onclick="searchExam(0)">全部试卷</button>
                    <br>
                    <table class="respond" id="examRecords">
                        <thead>
                        <tr>
                            <th>试卷编号</th>
                            <th>试卷名称</th>
                            <th>老师</th>
                            <th>总分</th>
                            <th></th>
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
                </div>
            </section>
                <%--录入试题--%>
            <section class="tab-item-4">
                <div class="row">
                    <div class="col-md-2">
                        <strong>选择题</strong>
                        <div class="choiceQuestion" id="addChoiceQuestion">
                            <div class="question" style="float: left" contenteditable="true"
                                 id="addChoiceQuestion_question">编辑题目</div>
                            <br>
                            <div class="choices">
                                <div class="choice"><input type="radio" name="addchoiceQuestion" value="A">A.<span
                                        class="margin-r" contenteditable="true" id="addChoiceQuestion_A">编辑选项</span>
                                </div>
                                <div class="choice"><input type="radio" name="addchoiceQuestion" value="B">B.<span
                                        class="margin-r" contenteditable="true" id="addChoiceQuestion_B">编辑选项</span>
                                </div>
                                <div class="choice"><input type="radio" name="addchoiceQuestion" value="C">C.<span
                                        class="margin-r" contenteditable="true" id="addChoiceQuestion_C">编辑选项</span>
                                </div>
                                <div class="choice"><input type="radio" name="addchoiceQuestion" value="D">D.<span
                                        class="margin-r" contenteditable="true" id="addChoiceQuestion_D">编辑选项</span>
                                </div>
                            </div>
                            <div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="paperInfoLabel">分值：</div>
                                        <div class="score" contenteditable="true" id="addChoiceQuestion_grade">0</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn--sm btn--blue" onclick="addChoiceQuestion()"><i
                                class="fa fa-save fa-2x"></i></button>
                    </div>
                    <div class="col-md-2">
                        <strong>填空题</strong>
                        <div class="fillInBlanksQuestion" id="addBlanksQuestion">
                            <div class="question" style="float: left" contenteditable="true" id="addBlanksQuestion_question">编辑题目</div>
                            <br>
                            <div class="question" style="float: left" contenteditable="true" id="addBlanksQuestion_answer">编辑答案</div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="paperInfoLabel">分值：</div>
                                        <div class="score" contenteditable="true" id="addBlanksQuestion_grade">0</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn--sm btn--blue" onclick="addBlanksQuestion()"><i
                                class="fa fa-save fa-2x"></i></button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <strong>简答题</strong>
                        <div class="shortAnswerQuestion" id="addShortQuestion">
                            <div class="question" style="float: left" contenteditable="true"
                                 id="addShortQuestion_question">编辑题目</div>
                            <br>
                            <div class="question" style="float: left" contenteditable="true"
                                 id="addShortQuestion_snswer">编辑答案</div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="paperInfoLabel">分值：</div>
                                        <div class="score" contenteditable="true" id="addShortQuestion_grade">0</div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn--sm btn--blue" onclick="addShortQuestion()"><i
                                    class="fa fa-save fa-2x"></i></button>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <strong>综合题</strong>
                        <div class="comprehensiveQuestion" id="addComQuestion">
                            <div class="question" style="float: left" contenteditable="true"
                                 id="addComQuestion_question">编辑题目</div>
                            <br>
                            <div class="question" style="float: left" contenteditable="true" id="addComQuestion_answer">编辑答案</div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="paperInfoLabel">分值：</div>
                                        <div class="score" contenteditable="true" id="addComQuestion_grade">0</div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn--sm btn--blue" onclick="addComQuestion()"><i
                                    class="fa fa-save fa-2x"></i></button>
                        </div>
                    </div>
                </div>
            </section>
                <%--查看试卷--%>
            <section class="tab-item-5">
                <div class="searchExam" id="searchQuestion">
                    <button type="button" class="btn btn--sm btn--blue" onclick="searchQuestion(1,1)">我的选择题</button>
                    <button type="button" class="btn btn--sm btn--blue" onclick="searchQuestion(1,2)">我的填空题</button>
                    <button type="button" class="btn btn--sm btn--blue" onclick="searchQuestion(1,3)">我的简答题</button>
                    <button type="button" class="btn btn--sm btn--blue" onclick="searchQuestion(1,4)">我的综合题</button>
                    <br>
                    <button type="button" class="btn btn--sm btn--blue" onclick="searchQuestion(0,1)">全部选择题</button>
                    <button type="button" class="btn btn--sm btn--blue" onclick="searchQuestion(0,2)">全部填空题</button>
                    <button type="button" class="btn btn--sm btn--blue" onclick="searchQuestion(0,3)">全部简答题</button>
                    <button type="button" class="btn btn--sm btn--blue" onclick="searchQuestion(0,4)">全部综合题</button>
                </div>
                <div class="paper" id="questionPaper">
                </div>
            </section>
                <%--评分--%>
            <section class="tab-item-6">
                <div class="searchExam" id="searchExamToScore">
                    <span>试卷编号：</span><input type="text" id="examToScorePno">
                    <button type="button" class="btn btn--sm btn--blue" onclick="searchExamToScore()">查找</button>
                    <br>
                    <table class="respond" id="examToScoreRecords">
                        <thead>
                        <tr>
                            <th>试卷编号</th>
                            <th>试卷名称</th>
                            <th>学生</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="paper" id="paper">
                    <button type="button" class="btn btn--sm btn--blue" onclick="score()">提交评分</button>
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
                            <div id="ChoiceQuestions">

                            </div>
                            <br>
                            <strong>二、填空题</strong>
                            <div id="FillInBlanksQuestions">

                            </div>
                            <br>
                            <strong>三、简答题</strong>
                            <div id="ShortAnswerQuestions">
                            </div>
                            <br>
                            <strong>四、综合题</strong>
                            <div id="ComprehensiveQuestions">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <%--<section class="tab-item-7">--%>
            <%--<h1>Sever</h1>--%>
            <%--</section>--%>
            <%--<section class="tab-item-8">--%>
            <%--<h1>Eight</h1>--%>
            <%--</section>--%>
            <%--<section class="tab-item-9">--%>
            <%--<h1>Nine</h1>--%>
            <%--</section>--%>
            <%--<section class="tab-item-10">--%>
            <%--<h1>Ten</h1>--%>
            <%--</section>--%>
        </div>
    </div>
</div>
<script src="../../js/jquery-1.11.0.min.js" type="text/javascript"></script>
<script>window.jQuery || document.write('<script src="../../js/jquery-1.11.0.min.js"><\/script>')</script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="../../js/paper.js"></script>
<script src="../../js/teacher.js"></script>
<%--<script type="text/javascript" src="../../js/paginator.js"></script>--%>
<%--<script type="text/javascript">--%>
<%--jQuery(document).ready(function($){--%>
<%--for (var i = 1; i <= 150; i++) {--%>
<%--$('.list-group').append('<li class="list-group-item"> Item ' + i + '</li>');--%>
<%--}--%>

<%--$('.list-group').paginathing({--%>
<%--perPage: 5,--%>
<%--limitPagination: 9,--%>
<%--containerClass: 'panel-footer',--%>
<%--pageNumbers: true--%>
<%--})--%>

<%--$('.table tbody').paginathing({--%>
<%--perPage: 2,--%>
<%--insertAfter: '.table',--%>
<%--pageNumbers: true--%>
<%--});--%>
<%--});--%>
<%--</script>--%>
</body>
</html>

<%--<div class="score">--%>
<%--<div class="row">--%>
<%--<div class="col-md-12">--%>
<%--<div class="paperInfoLabel">试卷名称：</div>--%>
<%--<div class="score" contenteditable="true"></div>--%>
<%--</div>--%>
<%--</div>--%>
<%--</div>--%>