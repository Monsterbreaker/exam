$(function () {
    init();
    loadInfo();
    $('input:radio[name="tab"]').click(function () {
        if ($(this).val() == "info") {
            loadInfo();
        }
        if ($(this).val() == "exams") {

        }
        if ($(this).val() == "papers") {
            loadPaperRecords();
        }
    });
})

function init() {
    $("#searchExam").show();
    $("#examPaper").hide();
    $("#paperRecords").show();
    $("#paper").hide();
}


//我的信息
//加载我的信息
function loadInfo() {
    $.ajax({
        url: "/ser/StudentServlet?method=loadUserInfo",
        type: "GET",
        dataType: 'json',
        success: function (data) {
            if (data != null) {
                $("#username").html(data.sname);
                $("#userID").html(data.sno);
            }
            else {
                $("#username").html("<br>");
                $("#userID").html("<br>");
            }
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })
}

//修改密码
function changepsw() {
    if ($("#oldpsw").length > 0) {
        $("#oldpsw").empty();
        $("#newpsw").empty();
    }
    else {
        var psw = $("<div class=\"psw\">\n" +
            "                                <form id=\"changepsw\" name=\"changepsw\" method=\"post\" action=\"changepsw.jsp\">\n" +
            "                                    <br>\n" +
            "                                    <span>旧密码：</span><input type=\"password\" id=\"oldpsw\">\n" +
            "                                    <br>\n" +
            "                                    <span>新密码：</span><input type=\"password\" id=\"newpsw\">\n" +
            "                                    <button type=\"button\" class=\"btn btn--sm btn--blue\" onclick=\"reserve()\">确认修改</button>\n" +
            "                                </form>\n" +
            "                            </div>");
        $(".userInfo").append(psw);
    }
}

function reserve() {
    var oldpsw = $("#oldpsw");
    if (oldpsw.val() == "") {
        alert("请输入旧密码！");
        oldpsw.focus();
        return;
    }
    var newpsw = $("#newpsw");
    if (newpsw.val() == "") {
        alert("请输入新密码！");
        newpsw.focus();
        return;
    }
    $("#changepsw").submit();
}


//考试
var examChoiceNo = 0;
var examBlanksNo = 0;
var examShortNo = 0;
var examComNo = 0;
var examPno;

function searchExam() {
    var pno = $("#examPno");
    if (pno.val() == "") {
        alert("请输入试卷编号！");
        return;
    }
    var url = "/ser/StudentServlet?method=searchExam&pno=" + pno.val();
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                console.log(data);
                $("#examRecords tbody").empty();
                $("#examRecords tbody").append("<tr>\n" +
                    "                        <td>" + data.pcontent + "</td>\n" +
                    "                        <td>" + data.tno + "</td>\n" +
                    "                        <td>\n" +
                    "                            <button type=\"button\" class=\"btn btn--sm btn--blue\"id='" + data.pno + "' onclick=\"loadExam(id)\">参加考试</button>\n" +
                    "                        </td>\n" +
                    "                    </tr>");

            }
            else {
                alert("您查找的试卷不存在！请核对试卷编号。");
            }

        },
        error: function () {
            alert("请求失败！请重试");
        }

    })

}

function loadExam(pno) {
    examChoiceNo = 0;
    examBlanksNo = 0;
    examShortNo = 0;
    examComNo = 0;
    $.ajax({
        url: "/ser/StudentServlet?method=loadExam&pno=" + pno,
        type: "GET",
        dataType: "json",
        success: function (data) {
            examPno = pno;//把试卷号记录下来，用于提交试卷
            var pInfo=data[0];
            $("#examPaperInfoLabel").html("试卷名称："+pInfo.pcontent);
            $("#examPaperNo").html("试卷编号："+pInfo.pno);
            $("#examTeacher").html("出卷人："+pInfo.tno);
            $("#examTotalPoint").html("总分："+pInfo.grade);
            //添加选择题
            var choiceQA = data[1];
            if (choiceQA.length != 0) {
                $("#createChoiceQuestions_exam").empty();
                for (var i = 0; i < choiceQA.length; i++) {
                    addChoiceExam(choiceQA[i]);
                }
            }
            //添加文字题
            var wordQA = data[2];
            if (wordQA.length != 0) {
                $("#createFillInBlanksQuestions_exam").empty();
                $("#createShortAnswerQuestions_exam").empty();
                $("#createComprehensiveQuestions_exam").empty();
                for (var i = 0; i < wordQA.length; i++) {
                    addWordExam(wordQA[i]);
                }
            }
        },
        error: function () {
            alert("请求失败！请重试");
        }
    });
    $("#searchExam").hide();
    $("#examPaper").show();
}

function closeExam() {
    $("#searchExam").show();
    $("#examPaper").hide();
}

function submitExam() {
    var answer = examToJson();
    $.ajax({
        url: "/ser/StudentServlet?method=submitExam",
        type: "GET",
        data: {"answer": JSON.stringify(answer)},
        dataType: "json",
        success: function (data) {
            alert("提交成功！");
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })
}


//我的试卷
var paperChoiceNo = 0;
var paperBlanksNo = 0;
var paperShortNo = 0;
var paperComNo = 0;

function loadPaperRecords() {
    $("#paper").hide();
    $("#paperRecords tbody").empty();
    $.ajax({
        url: "/ser/StudentServlet?method=loadPaperRecords",
        type: "GET",
        dataType: 'json',
        success: function (data) {
            if (data != null) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    $("#paperRecords tbody").append("<tr>\n" +
                        "                        <td>" + data[i].pcontent + "</td>\n" +
                        "                        <td>" + data[i].tno + "</td>\n" +
                        "                        <td>" + data[i].grade + "</td>\n" +
                        "                        <td>\n" +
                        "                            <button type=\"button\" class=\"btn btn--sm btn--blue\"id='" + data[i].pno + "' onclick=\"lookPaper(id)\">查看试卷</button>\n" +
                        "                        </td>\n" +
                        "                    </tr>");
                }
            }
            else {
            }
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })

}

function lookPaper(pno) {
    paperChoiceNo = 0;
    paperBlanksNo = 0;
    paperShortNo = 0;
    paperComNo = 0;
    $.ajax({
        url: "/ser/StudentServlet?method=lookPaper&pno=" + pno,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            var pInfo=data[0];
            $("#paperInfoLabel").html("试卷名称："+pInfo.pcontent);
            $("#paperNo").html("试卷编号："+pInfo.pno);
            $("#teacher").html("出卷人："+pInfo.tno);
            $("#totalPoint").html("总分："+pInfo.grade);
            console.log(data);
            //添加选择题
            var choiceQ = data[1];
            if (choiceQ.length != 0) {
                $("#createChoiceQuestions").empty();
                for (var i = 0; i < choiceQ.length; i++) {
                    addChoicePaper(choiceQ[i]);
                }
            }
            //添加文字题
            var wordQ = data[2];
            if (wordQ.length != 0) {
                $("#createFillInBlanksQuestions").empty();
                $("#createShortAnswerQuestions").empty();
                $("#createComprehensiveQuestions").empty();
                for (var i = 0; i < wordQ.length; i++) {
                    addWordPaper(wordQ[i]);
                }
            }
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })

    $("#paper").show();
    $("#paperRecords").hide();
}

function closePaper() {
    $("#paperRecords").show();
    $("#paper").hide();
}


function addChoicePaper(data) {
    paperChoiceNo++;
    var choiceQuestion = $("<div class='choiceQuestion_paper'></div>");
    //题目
    var question = $("<span style='float: left'>" + paperChoiceNo + ".</span>" + "<div class='question' style='float: left'>" +
        "<span>" + data.stem + "</span>" +
        "</div><br>"
    );
    var choices = $("<div class='choices'></div>");
    var choiceA = $("<div class='choice'>" +
        "A.<span class='margin-r'>" + data.a + "</span> " +
        "</div>");
    var choiceB = $("<div class='choice'>" +
        "B.<span class='margin-r'>" + data.b + "</span> " +
        "</div>");
    var choiceC = $("<div class='choice'>" +
        "C.<span class='margin-r'>" + data.c + "</span> " +
        "</div>");
    var choiceD = $("<div class='choice'>" +
        "D.<span class='margin-r'>" + data.d + "</span> " +
        "</div>");

    var score = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">分值：</div>" +
        "            <div class=\"score\">" + data.value + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    var myScore = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">我的分数：</div>" +
        "            <div class=\"score\">" + data.score + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");

    var ranswer = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">正确答案：</div>" +
        "            <div class=\"score\" >" + data.ranswer + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    var yanswer = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">你的答案：</div>" +
        "            <div class=\"score\" >" + data.yanswer + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    choices.append(choiceA, choiceB, choiceC, choiceD);
    choiceQuestion.append(question, choices, score, myScore, ranswer, yanswer);
    $("#createChoiceQuestions").append(choiceQuestion);
}

function addWordPaper(data) {
    var ranswer = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">正确答案：</div>" +
        "            <div class=\"score\" >" + data.ranswer + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    var yanswer = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">你的答案：</div>" +
        "            <div class=\"score\" >" + data.yanswer + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    var score = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">分值：</div>" +
        "            <div class=\"score\">" + data.value + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    var myScore = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">我的分数：</div>" +
        "            <div class=\"score\">" + data.score + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    if (data.qtype == 2) {
        //填空题
        paperBlanksNo++;
        var fillInBlanksQuestion = $("<div class='fillInBlanksQuestion'></div>")
        var question = $("<span style='float: left'>" + paperBlanksNo + ".</span>" + "<div class='question' style='float: left'>" +
            "<span>" + data.stem + "</span>" +
            "</div><br>"
        );
        fillInBlanksQuestion.append(question, score, myScore, ranswer, yanswer);
        $("#createFillInBlanksQuestions").append(fillInBlanksQuestion);
        return;
    }
    if (data.qtype == 3) {
        //简答题
        paperShortNo++;
        var shortAnswerQuestion = $("<div class='shortAnswerQuestion'></div>")
        var question = $("<span style='float: left'>" + paperShortNo + ".</span>" + "<div class='question' style='float: left'>" +
            "<span>" + data.stem + "</span>" +
            "</div><br>"
        );

        shortAnswerQuestion.append(question, score, myScore,ranswer, yanswer);
        $("#createShortAnswerQuestions").append(shortAnswerQuestion);
        return;
    }
    if (data.qtype == 4) {
        paperComNo++;
        var comprehensiveQuestion = $("<div class='comprehensiveQuestion'></div>")
        var question = $("<span style='float: left'>" + paperComNo + ".</span>" + "<div class='question' style='float: left' >" +
            "<span>" + data.stem + "</span>" +
            "</div><br>"
        );
        comprehensiveQuestion.append(question, score, myScore,ranswer, yanswer);
        $("#createComprehensiveQuestions").append(comprehensiveQuestion);
        return;
    }
}


function addChoiceExam(data) {
    examChoiceNo++;
    var choiceQuestion = $("<div class='choiceQuestion_exam' name='choiceExam' value='" + data.qno + "'></div>");
    //题目
    var question = $("<span style='float: left'>" + examChoiceNo + ".</span>" + "<div class='question' style='float: left'>" +
        "<span>" + data.stem + "</span>" +
        "<span>（" + data.value + "分）</span>" +
        "</div><br>"
    );
    var choices = $("<div class='choices'></div>");
    var choiceA = $("<div class='choice'>" +
        "<input type='radio' name='choiceQuestion_exam" + examChoiceNo + "'value='A'></input>" +
        "A.<span class='margin-r'>" + data.a + "</span> " +
        "</div>");
    var choiceB = $("<div class='choice'>" +
        "<input type='radio' name='choiceQuestion_exam" + examChoiceNo + "' value='B'></input>" +
        "B.<span class='margin-r'>" + data.b + "</span> " +
        "</div>");
    var choiceC = $("<div class='choice'>" +
        "<input type='radio' name='choiceQuestion_exam " + examChoiceNo + "' value='C'></input>" +
        "C.<span class='margin-r'>" + data.c + "</span> " +
        "</div>");
    var choiceD = $("<div class='choice'>" +
        "<input type='radio' name='choiceQuestion_exam" + examChoiceNo + "' value='D'></input>" +
        "D.<span class='margin-r'>" + data.d + "</span> " +
        "</div>");

    choices.append(choiceA, choiceB, choiceC, choiceD);
    choiceQuestion.append(question, choices);
    $("#createChoiceQuestions_exam").append(choiceQuestion);
}

function addWordExam(data) {
    if (data.qtype == 2) {
        //填空题
        examBlanksNo++;
        var fillInBlanksQuestion = $("<div class='fillInBlanksQuestion' name='blanksExam' value='" + data.qno + "'></div>")
        var question = $("<span style='float: left'>" + examBlanksNo + ".</span>" + "<div class='question' style='float: left'>" +
            "<span>" + data.stem + "（" + data.value + "分）</span>" +
            "</div><br>"
        );
        var yanswer = $("<div>" +
            "    <div class=\"row\">" +
            "        <div class=\"col-md-12\">" +
            "            <div class=\"paperInfoLabel\">你的答案：</div>" +
            "            <div class=\"score\" contenteditable='true' name='blanksAnswerExam' value='" + data.qno + "'></div>" +
            "        </div>" +
            "    </div>" +
            "</div>");
        fillInBlanksQuestion.append(question, yanswer);
        $("#createFillInBlanksQuestions_exam").append(fillInBlanksQuestion);
        return;
    }
    if (data.qtype == 3) {
        //简答题
        examShortNo++;
        var shortAnswerQuestion = $("<div class='shortAnswerQuestion' name='shortExam' value='" + data.qno + "'></div>")
        var question = $("<span style='float: left'>" + examShortNo + ".</span>" + "<div class='question' style='float: left'>" +
            "<span>" + data.stem + "（" + data.value + "分）</span>" +
            "</div><br>"
        );
        var yanswer = $("<div>" +
            "    <div class=\"row\">" +
            "        <div class=\"col-md-12\">" +
            "            <div class=\"paperInfoLabel\">你的答案：</div>" +
            "            <div class=\"score\" contenteditable='true' name='shortAnswerExam' value='" + data.qno + "'></div>" +
            "        </div>" +
            "    </div>" +
            "</div>");
        shortAnswerQuestion.append(question, yanswer);
        $("#createShortAnswerQuestions_exam").append(shortAnswerQuestion);
        return;
    }
    if (data.qtype == 4) {
        examComNo++;
        var comprehensiveQuestion = $("<div class='comprehensiveQuestion' name='comExam' value='" + data.qno + "'></div>")
        var question = $("<span style='float: left'>" + examComNo + ".</span>" + "<div class='question' style='float: left' >" +
            "<span>" + data.stem + "（" + data.value + "分）</span>" +
            "</div><br>"
        );
        var yanswer = $("<div>" +
            "    <div class=\"row\">" +
            "        <div class=\"col-md-12\">" +
            "            <div class=\"paperInfoLabel\">你的答案：</div>" +
            "            <div class=\"score\" contenteditable='true' name='comAnswerExam' value='" + data.qno + "'></div>" +
            "        </div>" +
            "    </div>" +
            "</div>");
        comprehensiveQuestion.append(question, yanswer);
        $("#createComprehensiveQuestions_exam").append(comprehensiveQuestion);
        return;
    }
}

//拿到试卷号 题号 答案 题型
function examToJson() {
    var pqas = [];
    //选择题
    var choiceList = document.getElementsByName("choiceExam");
    for (var i = 0; i < choiceList.length; i++) {
        var pqa = {};
        var qno = choiceList[i].getAttribute("value");
        var answer = $('input:radio[name="choiceQuestion_exam' + (i + 1) + '"]:checked').val();
        pqa.pno = examPno;
        pqa.qno = qno;
        pqa.answer = answer;
        pqa.qtype = 1;
        pqas.push(pqa);
    }
    //填空题
    var blanksList = document.getElementsByName("blanksExam");
    for (var i = 0; i < blanksList.length; i++) {
        var pqa = {};
        var qno = blanksList[i].getAttribute("value");
        var answer = $('div[name="blanksAnswerExam"][value="' + qno + '"]').text();
        pqa.pno = examPno;
        pqa.qno = qno;
        pqa.answer = answer;
        pqa.qtype = 2;
        pqas.push(pqa);
    }
    //简答题
    var blanksList = document.getElementsByName("shortExam");
    for (var i = 0; i < blanksList.length; i++) {
        var pqa = {};
        var qno = blanksList[i].getAttribute("value");
        var answer = $('div[name="shortAnswerExam"][value="' + qno + '"]').text();
        pqa.pno = examPno;
        pqa.qno = qno;
        pqa.answer = answer;
        pqa.qtype = 3;
        pqas.push(pqa);
    }
    //综合题
    var blanksList = document.getElementsByName("comExam");
    for (var i = 0; i < blanksList.length; i++) {
        var pqa = {};
        var qno = blanksList[i].getAttribute("value");
        var answer = $('div[name="comAnswerExam"][value="' + qno + '"]').text();
        pqa.pno = examPno;
        pqa.qno = qno;
        pqa.answer = answer;
        pqa.qtype = 4;
        pqas.push(pqa);
    }
    return pqas;
}


