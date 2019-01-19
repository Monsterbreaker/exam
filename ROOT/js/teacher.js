var examChoiceNo = 0;
var examBlanksNo = 0;
var examShortNo = 0;
var examComNo = 0;
var examToScorePno;//正在评分的试卷
var examToScoreSno;//正在评分的学生
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
    $("#paper").hide();
    $("#searchExam").show();
}

function checkID(id) {
    var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
    if (!re.test(id)) {
        return false;
    } else {
        return true;
    }
}

/*********************我的信息start*********************/
// 加载教师信息
function loadInfo() {
    $.ajax({
        url: "/ser/TeacherServlet?method=loadUserInfo",
        type: "GET",
        dataType: 'json',
        success: function (data) {
            if (data != null) {
                $("#username").html(data.tname);
                $("#userID").html(data.tno);
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

// 修改姓名
// 显示修改姓名页面
function showModName() {
    if ($("#newName").length > 0) {
        $("#modNamePane").empty();
        console.log("211111")
    } else {
        var name = $("<div class=\"name\">\n" +
            "                                    <span>新名字：</span><input type=\"text\" id=\"newName\">\n" +
            "                                    <button type=\"button\" class=\"btn btn--sm btn--blue\" onclick=\"modName()\">确认修改</button>\n" +
            "                                </div>");
        $("#modNamePane").append(name);
    }
}

// 提交修改姓名请求
function modName() {
    var newName = $("#newName").val();
    if (newName == "") {
        alert("请输入新名字！");
        newName.focus();
        return;
    }
    $.ajax({
        url: "/ser/TeacherServlet?method=modName",
        type: "POST",
        dataType: 'json',
        data: {"name": newName},
        success: function (data) {
            if (data == true) {
                loadInfo();
                alert("修改成功！");
            } else {
                alert("修改失败！请重试！");
            }

        },
        error: function () {
            alert("请求失败！请重试");
        }
    })
}

// 添加学生
// 显示添加学生页面
function showAddStu() {
    if ($("#addStuID").length > 0) {
        $("#addStuPane").empty();
        return;
    } else {
        var name = $("<div class=\"name\">\n" +
            "                                    <span>学生ID：</span><input type=\"text\" id=\"addStuID\">\n" +
            "                                    <button type=\"button\" class=\"btn btn--sm btn--blue\" onclick=\"addStu()\">确认添加</button>\n" +
            "                                </div>");
        $("#addStuPane").append(name);
    }
}

// 提交添加学生的请求
function addStu() {
    var stuID = $("#addStuID").val();
    if (stuID == "") {
        alert("请输入学生ID！");
        stuID.focus();
        return;
    }
   if(!checkID(stuID)){
       alert("输入的学生ID无效！请重新输入。");
       return;
   }
    $.ajax({
        url: "/ser/TeacherServlet?method=addStu",
        type: "POST",
        dataType: 'json',
        data: {"stuID": stuID},
        success: function (data) {
            if (data == true) {
                loadInfo();
                alert("添加学生成功！");
            } else {
                alert("添加学生失败！请重试！");
            }
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })
}
/*********************我的信息end*********************/


/*********************录入试卷start*********************/
// 存放从题库加到试卷的题号，供后面setPaper使用
var choiceListFromBank = [];
var blanksListFromBank = [];
var shortListFromBank = [];
var comListFromBank = [];

//
var choiceQuestions = $("#createChoiceQuestions");
var choiceQuestionNo = 0;

function createChoiceQuestion() {
    choiceQuestionNo++;
    var choiceQuestion = $("<div class='choiceQuestion'></div>");
    //题目
    var question = $("<div class='question' style='float: left' contenteditable='true'>" +
        "<span name='choiceQ_stem' value='" + choiceQuestionNo + "'>编辑题目</span>" +
        "</div><br>"
    );
    var choices = $("<div class='choices'></div>");
    var choiceA = $("<div class='choice'>" +
        "<input type='radio' name='choiceQuestion" + choiceQuestionNo + "' value='A'></input>" +
        "A.<span class='margin-r' contenteditable='true' name='choiceQ_A' value='" + choiceQuestionNo + "'>编辑选项</span> " +
        "</div>");
    var choiceB = $("<div class='choice'>" +
        "<input type='radio' name='choiceQuestion" + choiceQuestionNo + "' value='B'></input>" +
        "B.<span class='margin-r' contenteditable='true' name='choiceQ_B' value='" + choiceQuestionNo + "'>编辑选项</span> " +
        "</div>");
    var choiceC = $("<div class='choice'>" +
        "<input type='radio' name='choiceQuestion" + choiceQuestionNo + "' value='C'></input>" +
        "C.<span class='margin-r' contenteditable='true' name='choiceQ_C' value='" + choiceQuestionNo + "'>编辑选项</span> " +
        "</div>");
    var choiceD = $("<div class='choice'>" +
        "<input type='radio' name='choiceQuestion" + choiceQuestionNo + "' value='D'></input>" +
        "D.<span class='margin-r' contenteditable='true' name='choiceQ_D' value='" + choiceQuestionNo + "'>编辑选项</span> " +
        "</div>");

    var score = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">分值：</div>" +
        "            <div class=\"score\" contenteditable=\"true\" name='choiceQ_score' value='" + choiceQuestionNo + "'></div>" +
        "        </div>" +
        "    </div>" +
        "</div><br>");
    choices.append(choiceA, choiceB, choiceC, choiceD);
    choiceQuestion.append(question, choices, score);
    choiceQuestions.append(choiceQuestion);
};

var fillInBlanksQuestions = $("#createFillInBlanksQuestions");
var fillInBlanksQuestionNo = 0;

function createfillBlanksQuestion() {
    fillInBlanksQuestionNo++;
    var fillInBlanksQuestion = $("<div class='fillInBlanksQuestion'></div>")
    var question = $("<div class='question' style='float: left' contenteditable='true'>" +
        "<span name='blankQ_stem' value='" + fillInBlanksQuestionNo + "'>编辑题目</span>" +
        "</div><br>"
    );
    var answer = $("<div class='question' style='float: left' contenteditable='true'>" +
        "<span name='blankQ_answer' value='" + fillInBlanksQuestionNo + "'>编辑答案</span>" +
        "</div><br>"
    );
    var score = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">分值：</div>" +
        "            <div class=\"score\" contenteditable=\"true\" name='blankQ_score' value='" + fillInBlanksQuestionNo + "'></div>" +
        "        </div>" +
        "    </div>" +
        "</div><br>");
    fillInBlanksQuestion.append(question, answer, score);
    fillInBlanksQuestions.append(fillInBlanksQuestion);
}

var shortAnswerQuestions = $("#createShortAnswerQuestions");
var shortAnswerQuestionNo = 0;

function createShortAnswerQuestion() {
    shortAnswerQuestionNo++;
    var shortAnswerQuestion = $("<div class='shortAnswerQuestion'></div>")
    var question = $("<div class='question' style='float: left' contenteditable='true'>" +
        "<span name='shortQ_stem' value='" + shortAnswerQuestionNo + "'>编辑题目</span>" +
        "</div><br>"
    );
    var answer = $("<div class='question' style='float: left' contenteditable='true'>" +
        "<span name='shortQ_answer' value='" + shortAnswerQuestionNo + "'>编辑答案</span>" +
        "</div><br>"
    );
    var score = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">分值：</div>" +
        "            <div class=\"score\" contenteditable=\"true\" name='shortQ_score' value='" + shortAnswerQuestionNo + "'></div>" +
        "        </div>" +
        "    </div>" +
        "</div><br>");
    shortAnswerQuestion.append(question, answer, score);
    shortAnswerQuestions.append(shortAnswerQuestion);
}

var comprehensiveQuestions = $("#createComprehensiveQuestions");
var comprehensiveQuestionNo = 0;

function createComprehensiveQuestion() {
    comprehensiveQuestionNo++;
    var comprehensiveQuestion = $("<div class='comprehensiveQuestion'></div>")
    var question = $("<div class='question' style='float: left' contenteditable='true'>" +
        "<span name='comQ_stem' value='" + comprehensiveQuestionNo + "'>编辑题目</span>" +
        "</div><br>"
    );
    var answer = $("<div class='question' style='float: left' contenteditable='true'>" +
        "<span name='comQ_answer' value='" + comprehensiveQuestionNo + "'>编辑答案</span>" +
        "</div><br>"
    );
    var score = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">分值：</div>" +
        "            <div class=\"score\" contenteditable=\"true\" name='comQ_score' value='" + comprehensiveQuestionNo + "'></div>" +
        "        </div>" +
        "    </div>" +
        "</div><br>");
    comprehensiveQuestion.append(question, answer, score);
    comprehensiveQuestions.append(comprehensiveQuestion);
}


//组卷（从题库里添加）
function searchQuestionFromBankToChoose(a, b) {
    //查找所有各种类型的试题/老师的各种类型的试题
    var url = "/ser/TeacherServlet?method=searchQuestion&who=" + a + "&qtype=" + b;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                if (b == 1) {
                    $("#questionBank").empty();
                    var choiceQA = data;
                    if (choiceQA.length != 0) {
                        for (var i = 0; i < choiceQA.length; i++) {
                            loadChoiceFromBankToChoose(choiceQA[i]);
                        }
                    }
                } else {
                    //添加文字题
                    $("#questionBank").empty();
                    var wordQA = data;
                    if (wordQA.length != 0) {
                        for (var i = 0; i < wordQA.length; i++) {
                            loadWordFromBankToChoose(wordQA[i]);
                        }
                    }
                }
            }
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })

}

//将题库里的选择题显示出来供选择
function loadChoiceFromBankToChoose(data) {
    var choiceQuestion = $("<div class='choiceQuestion_exam' name='choiceExam' value='" + data.qno + "'></div>");
    //题目
    var question = $("<span style='float: left'>" + data.qno + ".</span>" + "<div class='question' style='float: left'>" +
        "<span name='choiceQuestion' value='" + data.qno + "'>" + data.stem + "</span>" +
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
        "            <div class=\"score\" name='choiceScore' value='" + data.qno + "'>" + data.value + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    var ranswer = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">正确答案：</div>" +
        "            <div class=\"score\" name='choiceAnswer' value='" + data.qno + "'>" + data.ranswer + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    var questionDiv = $("<div class='choiceQuestion_exam'value='" + data.qno + "'></div>");
    var add = $("<button type='button' class='btn btn--sm btn--blue' onclick='addQuestionToExam(" + JSON.stringify(data) + ")'>加入试卷</button>");
    choices.append(choiceA, choiceB, choiceC, choiceD);
    choiceQuestion.append(question, choices, ranswer, score, add);
    $("#questionBank").append(choiceQuestion);
}

//将题库里的文字题显示出来供选择
function loadWordFromBankToChoose(data) {
    var ranswer = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">正确答案：</div>" +
        "            <div class=\"score\" value='" + data.qno + "'>" + data.ranswer + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    var score = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">分值：</div>" +
        "            <div class=\"score\" value='" + data.qno + "'>" + data.value + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    if (data.qtype == 2) {
        //填空题
        var fillInBlanksQuestion = $("<div class='fillInBlanksQuestion' value='" + data.qno + "'></div>")
        var question = $("<span style='float: left' >" + data.qno + ".</span>" + "<div class='question' style='float: left' name='wordQuestion' value='" + data.qno + "'>" + data.stem +
            "</div><br>"
        );
        var add = $("<button type='button' class='btn btn--sm btn--blue' onclick='addQuestionToExam(" + JSON.stringify(data) + ")'>加入试卷</button>");
        fillInBlanksQuestion.append(question, ranswer, score, add);
        $("#questionPaper").append(fillInBlanksQuestion);
        return;
    }
    if (data.qtype == 3) {
        //简答题
        var shortAnswerQuestion = $("<div class='shortAnswerQuestion' value='" + data.qno + "'></div>")
        var question = $("<span style='float: left'>" + data.qno + ".</span>" + "<div class='question' style='float: left' name='wordQuestion' value='" + data.qno + "'>" + data.stem +
            "</div><br>"
        );
        var add = $("<button type='button' class='btn btn--sm btn--blue' onclick='addQuestionToExam(" + JSON.stringify(data) + ")'>加入试卷/button>");
        shortAnswerQuestion.append(question, ranswer, score, add);
        $("#questionPaper").append(shortAnswerQuestion);
        return;
    }
    if (data.qtype == 4) {
        var comprehensiveQuestion = $("<div class='comprehensiveQuestion' value='" + data.qno + "'></div>")
        var question = $("<span style='float: left'>" + data.qno + ".</span>" + "<div class='question' style='float: left' name='wordQuestion' value='" + data.qno + "'>" + data.stem +
            "</div><br>"
        );
        var add = $("<button type='button' class='btn btn--sm btn--blue' onclick='addQuestionToExam(" + JSON.stringify(data) + ")'>加入试卷</button>");
        comprehensiveQuestion.append(question, ranswer, score, add);
        $("#questionBank").append(comprehensiveQuestion);
        return;
    }
}

//将试题库里的题添加到试卷显示出来
function addQuestionToExam(data) {
    if (data.qtype == 1) {
        choiceListFromBank.push(data.qno);
        var choiceQuestion = $("<div class='choiceQuestion_exam' name='choiceExam' value='" + data.qno + "'></div>");
        //题目
        var question = $("<span style='float: left'>" + data.qno + ".</span>" + "<div class='question' style='float: left'>" +
            "<span name='choiceQuestion' value='" + data.qno + "'>" + data.stem + "</span>" +
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
            "            <div class=\"score\" name='choiceScore' value='" + data.qno + "'>" + data.value + "</div>" +
            "        </div>" +
            "    </div>" +
            "</div><br>");
        var ranswer = $("<div>" +
            "    <div class=\"row\">" +
            "        <div class=\"col-md-12\">" +
            "            <div class=\"paperInfoLabel\">正确答案：</div>" +
            "            <div class=\"score\" name='choiceAnswer' value='" + data.qno + "'>" + data.ranswer + "</div>" +
            "        </div>" +
            "    </div>" +
            "</div>");
        choices.append(choiceA, choiceB, choiceC, choiceD);
        choiceQuestion.append(question, choices, ranswer, score);
        choiceQuestions.append(choiceQuestion);

    }
    else if (data.qtype == 2) {
        blanksListFromBank.push(data.qno);
        var ranswer = $("<div>" +
            "    <div class=\"row\">" +
            "        <div class=\"col-md-12\">" +
            "            <div class=\"paperInfoLabel\">正确答案：</div>" +
            "            <div class=\"score\" value='" + data.qno + "'>" + data.ranswer + "</div>" +
            "        </div>" +
            "    </div>" +
            "</div>");
        var score = $("<div>" +
            "    <div class=\"row\">" +
            "        <div class=\"col-md-12\">" +
            "            <div class=\"paperInfoLabel\">分值：</div>" +
            "            <div class=\"score\" value='" + data.qno + "'>" + data.value + "</div>" +
            "        </div>" +
            "    </div>" +
            "</div>");
        var fillInBlanksQuestion = $("<div class='fillInBlanksQuestion' value='" + data.qno + "'></div>")
        var question = $("<span style='float: left' >" + data.qno + ".</span>" + "<div class='question' style='float: left' name='wordQuestion' value='" + data.qno + "'>" + data.stem +
            "</div><br>"
        );
        fillInBlanksQuestion.append(question, ranswer, score);
        fillInBlanksQuestions.append(fillInBlanksQuestion);
    }
    else if (data.qtype == 3) {
        shortListFromBank.push(data.qno);
        var ranswer = $("<div>" +
            "    <div class=\"row\">" +
            "        <div class=\"col-md-12\">" +
            "            <div class=\"paperInfoLabel\">正确答案：</div>" +
            "            <div class=\"score\" value='" + data.qno + "'>" + data.ranswer + "</div>" +
            "        </div>" +
            "    </div>" +
            "</div>");
        var score = $("<div>" +
            "    <div class=\"row\">" +
            "        <div class=\"col-md-12\">" +
            "            <div class=\"paperInfoLabel\">分值：</div>" +
            "            <div class=\"score\" value='" + data.qno + "'>" + data.value + "</div>" +
            "        </div>" +
            "    </div>" +
            "</div>");
        var shortAnswerQuestion = $("<div class='shortAnswerQuestion' value='" + data.qno + "'></div>")
        var question = $("<span style='float: left'>" + data.qno + ".</span>" + "<div class='question' style='float: left' name='wordQuestion' value='" + data.qno + "'>" + data.stem +
            "</div><br>"
        );
        shortAnswerQuestion.append(question, ranswer, score);
        shortAnswerQuestion.append(shortAnswerQuestion);
    } else if (data.qtype = 4) {
        comListFromBank.push(data.qno);
        var ranswer = $("<div>" +
            "    <div class=\"row\">" +
            "        <div class=\"col-md-12\">" +
            "            <div class=\"paperInfoLabel\">正确答案：</div>" +
            "            <div class=\"score\" value='" + data.qno + "'>" + data.ranswer + "</div>" +
            "        </div>" +
            "    </div>" +
            "</div>");
        var score = $("<div>" +
            "    <div class=\"row\">" +
            "        <div class=\"col-md-12\">" +
            "            <div class=\"paperInfoLabel\">分值：</div>" +
            "            <div class=\"score\" value='" + data.qno + "'>" + data.value + "</div>" +
            "        </div>" +
            "    </div>" +
            "</div>");
        var comprehensiveQuestion = $("<div class='comprehensiveQuestion' value='" + data.qno + "'></div>")
        var question = $("<span style='float: left'>" + data.qno + ".</span>" + "<div class='question' style='float: left' name='wordQuestion' value='" + data.qno + "'>" + data.stem +
            "</div><br>"
        );
        comprehensiveQuestion.append(question, ranswer, score);
        comprehensiveQuestions.append(comprehensiveQuestion);
    }
}

//组卷（写入数据库）
function setPaper() {
    var tno = parseInt($("#userID").text());
    var paper = {};
    var info = {};
    var choices = [];
    var words = [];

    //试卷名称
    var pcontent= $("#paperName").text();
    if(pcontent==""){
        alert("请输入试卷名称！");
        $("#paperName").focus();
        return;
    }else {
        info.pcontent=pcontent;
    }

    //新增选择题
    for (var i = 1; i <= choiceQuestionNo; i++) {
        var stem = $('span[name="choiceQ_stem"][value="' + i + '"]').text();
        var answer = $('input:radio[name="choiceQuestion' + i + '"]:checked').val();
        var score = $('div[name="choiceQ_score"][value="' + i + '"]').text();
        var A = $('span[name="choiceQ_A"][value="' + i + '"]').text();
        var B = $('span[name="choiceQ_B"][value="' + i + '"]').text();
        var C = $('span[name="choiceQ_C"][value="' + i + '"]').text();
        var D = $('span[name="choiceQ_D"][value="' + i + '"]').text();
        if(stem==""||answer==null||score==""||A==""||B==""||C==""|D==""){
            alert("您当前有题目未填写完整，请填写后再提交！");
            return;
        }
        var choice = {};
        choice.stem = stem;
        choice.answer = answer;
        choice.grade = parseInt(score);
        choice.a = A;
        choice.b = B;
        choice.c = C;
        choice.d = D;
        choice.qtype = 1;
        choice.tno = tno;
        choice.qno = -1;
        choices.push(choice);
    }
    //从题库增加的选择题
    for (var i = 0; i < choiceListFromBank.length; i++) {
        var choice = {};
        choice.qtype = 1;
        choice.qno = choiceListFromBank[i];
        choices.push(choice);
    }

    //新增的填空题
    for (var i = 1; i <= fillInBlanksQuestionNo; i++) {
        var stem = $('span[name="blankQ_stem"][value="' + i + '"]').text();
        var answer = $('span[name="blankQ_score"][value="' + i + '"]').text();
        var score = $('div[name="blankQ_score"][value="' + i + '"]').text();
        var word = {};
        if(score==""){
            alert("您当前有题目未填写完整，请填写后再提交！");
            return;
        }
        word.stem = stem;
        word.answer = answer;
        word.grade = Number(score);
        word.qtype = 2;
        word.tno = tno;
        word.qno = -1;
        words.push(word);
    }
    //从题库增加的填空题
    for (var i = 0; i < blanksListFromBank.length; i++) {
        var word = {};
        word.qtype = 2;
        word.qno = blanksListFromBank[i];
        words.push(word);
    }

    //新增的简答题
    for (var i = 1; i <= shortAnswerQuestionNo; i++) {
        var stem = $('span[name="shortQ_stem"][value="' + i + '"]').text();
        var answer = $('span[name="shortQ_score"][value="' + i + '"]').text();
        var score = $('div[name="shortQ_score"][value="' + i + '"]').text();
        var word = {};
        if(score==""){
            alert("您当前有题目未填写完整，请填写后再提交！");
            return;
        }
        word.stem = stem;
        word.answer = answer;
        word.grade = Number(score);
        word.qtype = 3;
        word.tno = tno;
        word.qno = -1;
        words.push(word);
    }
    //从题库增加的简答题
    for (var i = 0; i < shortListFromBank.length; i++) {
        var word = {};
        word.qtype = 3;
        word.qno = shortListFromBank[i];
        words.push(word);
    }

    //新增的综合题
    for (var i = 1; i <= comprehensiveQuestionNo; i++) {
        var stem = $('span[name="comQ_stem"][value="' + i + '"]').text();
        var answer = $('span[name="comQ_score"][value="' + i + '"]').text();
        var score = $('div[name="comQ_score"][value="' + i + '"]').text();
        var word = {};
        if(score==""){
            alert("您当前有题目未填写完整，请填写后再提交！");
            return;
        }
        word.stem = stem;
        word.answer = answer;
        word.grade = Number(score);
        word.qtype = 4;
        word.tno = tno;
        word.qno = -1;
        words.push(word);
    }
    console.log(comListFromBank);
    //从题库增加的综合题
    for (var i = 0; i < comListFromBank.length; i++) {
        var word = {};
        word.qtype = 4;
        word.qno = comListFromBank[i];
        words.push(word);
    }

    info.tno = tno;
    paper.info = info;
    paper.choice = choices;
    paper.word = words;
    console.log(paper);

    $.ajax({
        url: "/ser/TeacherServlet?method=setPaper",
        type: "POST",
        dataType: "json",
        data: {"paper": JSON.stringify(paper)},
        success: function (data) {
            alert("添加试卷成功！题号为：" + data);
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })

}
/*********************录入试卷end*********************/






/*********************查看试卷start*********************/
//查看试卷
function searchExam(a) {
    if (a == 0 || a == 1) {
        //查找所有试卷/老师的试卷
        var url = "/ser/TeacherServlet?method=searchExam&who=" + a;
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    console.log(data);
                    if (data == false) {
                        alert("未能找到试卷！");
                    } else {
                        $("#examRecords tbody").empty();
                        for (var i = 0; i < data.length; i++) {
                            $("#examRecords tbody").append("<tr>\n" +
                                "                        <td>" + data[i].pno + "</td>\n" +
                                "                        <td>" + data[i].pcontent + "</td>\n" +
                                "                        <td>" + data[i].tno + "</td>\n" +
                                "                        <td>\n" +
                                "                            <button type=\"button\" class=\"btn btn--sm btn--blue\" onclick=\"lookExam(" + data[i].pno + ")\">查看试卷</button>\n" +
                                "                        </td>\n" +
                                "                        <td>\n" +
                                "                            <button type=\"button\" class=\"btn btn--sm btn--blue\" onclick=\"deleteExam(" + data[i].pno + ")\">删除试卷</button>\n" +
                                "                        </td>\n" +
                                "                    </tr>");
                        }
                    }
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
    else if (a == 2) {
        //根据试卷号查找
        var pno = $("#examPno");
        if (pno.val() == "") {
            alert("请输入试卷号！");
            return;
        } else {
            var url = "/ser/TeacherServlet?method=searchExamByPno&pno=" + pno.val();
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    if (data.tno != 0) {
                        $("#examRecords tbody").empty();
                        $("#examRecords tbody").append("<tr>\n" +
                            "                        <td>" + data.pno + "</td>\n" +
                            "                        <td>" + data.pcontent + "</td>\n" +
                            "                        <td>" + data.tno + "</td>\n" +
                            "                        <td>" + data.grade + "</td>\n" +
                            "                        <td>\n" +
                            "                            <button type=\"button\" class=\"btn btn--sm btn--blue\" onclick=\"lookExam(" + data.pno + ")\">查看试卷</button>\n" +
                            "                        </td>\n" +
                            "                        <td>\n" +
                            "                            <button type=\"button\" class=\"btn btn--sm btn--blue\" onclick=\"deleteExam(" + data.pno + ")\">删除试卷</button>\n" +
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
    }
}

function lookExam(pno) {
    examChoiceNo = 0;
    examBlanksNo = 0;
    examShortNo = 0;
    examComNo = 0;
    $.ajax({
        url: "/ser/TeacherServlet?method=lookExam&pno=" + pno,
        type: "GET",
        dataType: "json",
        success: function (data) {
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

function deleteExam(pno) {
    $.ajax({
        url: "/ser/TeacherServlet?method=deleteExam&pno=" + pno,
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data == 0) {
                alert("删除成功！");
            } else if (data == 1) {
                alert("已有学生参加考试，无法删除！");
            } else if (data == 2) {
                alert("您没有创建过这张试卷！");
            } else {
                alert("删除失败，请重试！");
            }
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })
}

//查看试卷用的
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
    var ranswer = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">正确答案：</div>" +
        "            <div class=\"score\" >" + data.ranswer + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    choices.append(choiceA, choiceB, choiceC, choiceD);
    choiceQuestion.append(question, choices, ranswer, score);
    $("#createChoiceQuestions_exam").append(choiceQuestion);
}

function addWordExam(data) {
    var ranswer = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">正确答案：</div>" +
        "            <div class=\"score\" >" + data.ranswer + "</div>" +
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
    if (data.qtype == 2) {
        //填空题
        examBlanksNo++;
        var fillInBlanksQuestion = $("<div class='fillInBlanksQuestion' name='blanksExam' value='" + data.qno + "'></div>")
        var question = $("<span style='float: left'>" + examBlanksNo + ".</span>" + "<div class='question' style='float: left'>" +
            "<span>" + data.stem + "（" + data.value + "分）</span>" +
            "</div><br>"
        );
        fillInBlanksQuestion.append(question, ranswer, score);
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
        shortAnswerQuestion.append(question, ranswer, score);
        $("#createShortAnswerQuestions_exam").append(shortAnswerQuestion);
        return;
    }
    if (data.qtype == 4) {
        examComNo++;
        var comprehensiveQuestion = $("<div class='comprehensiveQuestion' name='comExam' value='" + data.qno + "'></div>")
        var question = $("<span style='float: left'>" + examComNo + ".</span>" + "<div class='question' style='float: left'>" +
            "<span>" + data.stem + "（" + data.value + "分）</span>" +
            "</div><br>"
        );
        comprehensiveQuestion.append(question, ranswer, score);
        $("#createComprehensiveQuestions_exam").append(comprehensiveQuestion);
        return;
    }
}
/*********************查看试卷end*********************/




/*********************录入试题start*********************/
//录入试题
function addChoiceQuestion() {
    var choice = {};
    var question = $("#addChoiceQuestion_question").text();
    var answer = $('input:radio[name="addchoiceQuestion"]:checked').val();
    if(answer==null){
        alert("请选择选择题答案！");
    }
    var A = $("#addChoiceQuestion_A").text();
    var B = $("#addChoiceQuestion_B").text();
    var C = $("#addChoiceQuestion_C").text();
    var D = $("#addChoiceQuestion_D").text();
    var grade = $("#addChoiceQuestion_grade").text();
    choice.stem = question;
    choice.ranswer = answer;
    choice.a = A;
    choice.b = B;
    choice.c = C;
    choice.d = D;
    choice.grade = grade;
    $.ajax({
        url: "/ser/TeacherServlet?method=addChoiceQuestion",
        type: "POST",
        dataType: "json",
        data: {"choice": JSON.stringify(choice)},
        success: function (data) {
            alert("添加成功！题号为：" + data);
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })

}

function addBlanksQuestion() {
    var word = {};
    var question = $("#addBlanksQuestion_question").text();
    var answer = $("#addBlanksQuestion_answer").text();
    var grade = $("#addBlanksQuestion_grade").text();
    word.stem = question;
    word.ranswer = answer;
    word.grade = grade;
    word.qtype = 2;
    $.ajax({
        url: "/ser/TeacherServlet?method=addWordQuestion",
        type: "POST",
        dataType: "json",
        data: {"choice": JSON.stringify(word)},
        success: function (data) {
            alert("添加成功！题号为：" + data);
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })

}

function addShortQuestion() {
    var word = {};
    var question = $("#addShortQuestion_question").text();
    var answer = $("#addShortQuestion_answer").text();
    var grade = $("#addShortQuestion_grade").text();
    word.stem = question;
    word.ranswer = answer;
    word.grade = grade;
    word.qtype = 3;
    $.ajax({
        url: "/ser/TeacherServlet?method=addWordQuestion",
        type: "POST",
        dataType: "json",
        data: {"choice": JSON.stringify(word)},
        success: function (data) {
            alert("添加成功！题号为：" + data);
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })

}

function addComQuestion() {
    var word = {};
    var question = $("#addComQuestion_question").text();
    var answer = $("#addComQuestion_answer").text();
    var grade = $("#addComQuestion_grade").text();
    word.stem = question;
    word.ranswer = answer;
    word.grade = grade;
    word.qtype = 4;
    $.ajax({
        url: "/ser/TeacherServlet?method=addWordQuestion",
        type: "POST",
        dataType: "json",
        data: {"choice": JSON.stringify(word)},
        success: function (data) {
            alert("添加成功！题号为：" + data);
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })

}
/*********************录入试题end*********************/


/*********************查看试题start*********************/
// 根据题号搜索试题
function searchQuestion(a, b) {
    //查找所有各种类型的试题/老师的各种类型的试题
    var url = "/ser/TeacherServlet?method=searchQuestion&who=" + a + "&qtype=" + b;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data != null) {
                if (b == 1) {
                    var choiceQA = data;
                    $("#questionPaper").empty();
                    if (choiceQA.length != 0) {
                        for (var i = 0; i < choiceQA.length; i++) {
                            addedChoiceQustion(choiceQA[i]);
                        }
                    }
                } else {
                    //添加文字题
                    $("#questionPaper").empty();
                    var wordQA = data;
                    if (wordQA.length != 0) {
                        for (var i = 0; i < wordQA.length; i++) {
                            addedWordPaper(wordQA[i]);
                        }
                    }
                }
            }
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })

}

// 显示搜索的选择题
function addedChoiceQustion(data) {
    var choiceQuestion = $("<div class='choiceQuestion_exam' name='choiceExam' value='" + data.qno + "'></div>");
    //题目
    var question = $("<span style='float: left'>" + data.qno + ".</span>" + "<div class='question' style='float: left' contenteditable='true'>" +
        "<span name='choiceQuestion' value='" + data.qno + "'>" + data.stem + "</span>" +
        "</div><br>"
    );
    var choices = $("<div class='choices'></div>");
    var choiceA = $("<div class='choice'>" +
        "A.<span class='margin-r' contenteditable='true'>" + data.a + "</span> " +
        "</div>");
    var choiceB = $("<div class='choice'>" +
        "B.<span class='margin-r' contenteditable='true'>" + data.b + "</span> " +
        "</div>");
    var choiceC = $("<div class='choice'>" +
        "C.<span class='margin-r' contenteditable='true'>" + data.c + "</span> " +
        "</div>");
    var choiceD = $("<div class='choice'>" +
        "D.<span class='margin-r' contenteditable='true'>" + data.d + "</span> " +
        "</div>");

    var score = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">分值：</div>" +
        "            <div class=\"score\" contenteditable='true' name='choiceScore' value='" + data.qno + "'>" + data.value + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    var ranswer = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">正确答案：</div>" +
        "            <div class=\"score\" contenteditable='true' name='choiceAnswer' value='" + data.qno + "'>" + data.ranswer + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    var mod = $("<button type='button' class='btn btn--sm btn--blue' onclick='modQuestion(" + data.qno + "," + data.qtype + ")'>修改试题</button>");
    var del = $("<button type='button' class='btn btn--sm btn--blue' onclick='deleteQuestion(" + data.qno + "," + data.qtype + ")'>删除试题</button>");
    choices.append(choiceA, choiceB, choiceC, choiceD);
    choiceQuestion.append(question, choices, ranswer, score, mod, del);
    $("#questionPaper").append(choiceQuestion);
}

// 显示搜索的文字题
function addedWordPaper(data) {
    var ranswer = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">正确答案：</div>" +
        "            <div class=\"score\" contenteditable='true' name='wordAnswer' value='" + data.qno + "'>" + data.ranswer + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    var score = $("<div>" +
        "    <div class=\"row\">" +
        "        <div class=\"col-md-12\">" +
        "            <div class=\"paperInfoLabel\">分值：</div>" +
        "            <div class=\"score\" contenteditable='true' name='wordScore' value='" + data.qno + "'>" + data.value + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    if (data.qtype == 2) {
        //填空题
        var fillInBlanksQuestion = $("<div class='fillInBlanksQuestion' name='blanksExam' value='" + data.qno + "'></div>")
        var question = $("<span style='float: left' >" + data.qno + ".</span>" + "<div class='question' style='float: left' contenteditable='true' name='wordQuestion' value='" + data.qno + "'>" + data.stem +
            "</div><br>"
        );
        var mod = $("<button type='button' class='btn btn--sm btn--blue' onclick='modQuestion(" + data.qno + "," + data.qtype + ")'>修改试题</button>");
        var del = $("<button type='button' class='btn btn--sm btn--blue' onclick='deleteQuestion(" + data.qno + "," + data.qtype + ")'>删除试题</button>");
        fillInBlanksQuestion.append(question, ranswer, score, mod, del);
        $("#questionPaper").append(fillInBlanksQuestion);
        return;
    }
    if (data.qtype == 3) {
        //简答题
        var shortAnswerQuestion = $("<div class='shortAnswerQuestion' name='shortExam' value='" + data.qno + "'></div>")
        var question = $("<span style='float: left'>" + data.qno + ".</span>" + "<div class='question' style='float: left' contenteditable='true' name='wordQuestion' value='" + data.qno + "'>" + data.stem +
            "</div><br>"
        );
        var mod = $("<button type='button' class='btn btn--sm btn--blue' onclick='modQuestion(" + data.qno + "," + data.qtype + ")'>修改试题</button>");
        var del = $("<button type='button' class='btn btn--sm btn--blue' onclick='deleteQuestion(" + data.qno + "," + data.qtype + ")'>删除试题</button>");
        shortAnswerQuestion.append(question, ranswer, score, mod, del);
        $("#questionPaper").append(shortAnswerQuestion);
        return;
    }
    if (data.qtype == 4) {
        var comprehensiveQuestion = $("<div class='comprehensiveQuestion' name='comExam' value='" + data.qno + "'></div>")
        var question = $("<span style='float: left'>" + data.qno + ".</span>" + "<div class='question' style='float: left' contenteditable='true' name='wordQuestion' value='" + data.qno + "'>" + data.stem +
            "</div><br>"
        );
        var mod = $("<button type='button' class='btn btn--sm btn--blue' onclick='modQuestion(" + data.qno + "," + data.qtype + ")'>修改试题</button>");
        var del = $("<button type='button' class='btn btn--sm btn--blue' onclick='deleteQuestion(" + data.qno + "," + data.qtype + ")'>删除试题</button>");
        comprehensiveQuestion.append(question, ranswer, score, mod, del);
        $("#questionPaper").append(comprehensiveQuestion);
        return;
    }
}

// 修改选择题
function modQuestion(qno, qtype) {
    var modedQ = {};
    if (qtype == 1) {
        var question = $('div[name="choiceQuestion"][value="' + qno + '"]').text();
        var ranswer = $('div[name="choiceAnswer"][value="' + qno + '"]').text();
        var score = $('div[name="choiceScore"][value="' + qno + '"]').text();
        var A = $('div[name="choiceA"][value="' + qno + '"]').text();
        var B = $('div[name="choiceB"][value="' + qno + '"]').text();
        var C = $('div[name="choiceC"][value="' + qno + '"]').text();
        var D = $('div[name="choiceD"][value="' + qno + '"]').text();
        modedQ.qno = qno;
        modedQ.question = question;
        modedQ.score = score;
        modedQ.ranswer = ranswer;
        modedQ.a = A;
        modedQ.b = B;
        modedQ.c = C;
        modedQ.d = D;
        modedQ.qtype = qtype;
    } else {
        var question = $('div[name="wordQuestion"][value="' + qno + '"]').text();
        var ranswer = $('div[name="wordAnswer"][value="' + qno + '"]').text();
        var score = $('div[name="wordScore"][value="' + qno + '"]').text();
        modedQ.qno = qno;
        modedQ.question = question;
        modedQ.score = score;
        modedQ.ranswer = ranswer;
        modedQ.qtype = qtype;
    }
    $.ajax({
        url: "/ser/TeacherServlet?method=modQuestion&qtype=" + qtype,
        type: "POST",
        dataType: "json",
        data: {"moded": JSON.stringify(modedQ)},
        success: function (data) {
            if (data == 0) {
                alert("修改成功！");
            } else {
                alert("评分失败，请重试！");
            }
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })
}

// 修改文字题
function deleteQuestion(qno, qtype) {
    $.ajax({
        url: "/ser/TeacherServlet?method=deleteQuestion&qno=" + qno + "&qtype=" + qtype,
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data == 0) {
                alert("删除成功！");
            } else if (data == 1) {
                alert("已有学生参加考试，无法删除！");
            } else if (data == 2) {
                alert("您没有创建过这道题目！");
            } else {
                alert("删除失败，请重试！");
            }
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })
}



/*********************评分start*********************/
// 用试卷号搜索要评分的试卷
function searchExamToScore() {
    var pno = $("#examToScorePno");
    if (pno.val() == "") {
        alert("请输入试卷号！");
        return;
    } else {
        var url = "/ser/TeacherServlet?method=searchExamToScoreByPno&pno=" + pno.val();
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    $("#examToScoreRecords tbody").empty();
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].isgrade != 1) {
                            $("#examToScoreRecords tbody").append("<tr>\n" +
                                "                        <td>" + data[i].pno + "</td>\n" +
                                "                        <td>" + data[i].pcontent + "</td>\n" +
                                "                        <td>" + data[i].sno + "</td>\n" +
                                "                        <td>\n" +
                                "                            <button type=\"button\" class=\"btn btn--sm btn--blue\" onclick=\"loadExamToScore(" + data[i].pno + "," + data[i].sno + ")\">评分</button>\n" +
                                "                        </td>\n" +
                                "                    </tr>");
                        }
                    }
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
}

// 显示选择的待评分的试卷
function loadExamToScore(pno, sno) {
    examToScorePno = pno;
    examToScoreSno = sno;
    $.ajax({
        url: "/ser/TeacherServlet?method=lookPaper&pno=" + pno + "&sno=" + sno,
        type: "GET",
        dataType: 'json',
        success: function (data) {
            //添加选择题
            var choiceQ = data[0];
            if (choiceQ.length != 0) {
                $("#ChoiceQuestions").empty();
                for (var i = 0; i < choiceQ.length; i++) {
                    addChoicePaper(choiceQ[i]);
                }
            }
            //添加文字题
            var wordQ = data[1];
            if (wordQ.length != 0) {
                $("#FillInBlanksQuestions").empty();
                $("#ShortAnswerQuestions").empty();
                $("#ComprehensiveQuestions").empty();
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
    $("#searchExamToScore").hide();
}

// 显示待评分试卷的选择题
function addChoicePaper(data) {
    var choiceQuestion = $("<div class='choiceQuestion_paper'></div>");
    //题目
    var question = $("<div class='question' style='float: left'>" +
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
        "            <div class=\"paperInfoLabel\">得分：</div>" +
        "            <div class=\"score\" contenteditable='true' name='CScore' value='" + data.qno + "'>0</div>" +
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
        "            <div class=\"paperInfoLabel\">学生答案：</div>" +
        "            <div class=\"score\" >" + data.yanswer + "</div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
    choices.append(choiceA, choiceB, choiceC, choiceD);
    choiceQuestion.append(question, choices, score, myScore, ranswer, yanswer);
    $("#ChoiceQuestions").append(choiceQuestion);
}

// 显示待评分试卷的文字题
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
        "            <div class=\"paperInfoLabel\">学生答案：</div>" +
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
    if (data.qtype == 2) {
        //填空题
        var fillInBlanksQuestion = $("<div class='fillInBlanksQuestion'></div>")
        var question = $("<div class='question' style='float: left'>" +
            "<span>" + data.stem + "</span>" +
            "</div><br>"
        );
        var myScore = $("<div>" +
            "    <div class=\"row\">" +
            "        <div class=\"col-md-12\">" +
            "            <div class=\"paperInfoLabel\">得分：</div>" +
            "            <div class=\"score\" name='FScore' contenteditable='true' value='" + data.qno + "'>0</div>" +
            "        </div>" +
            "    </div>" +
            "</div>");
        fillInBlanksQuestion.append(question, score, myScore, ranswer, yanswer);
        $("#FillInBlanksQuestions").append(fillInBlanksQuestion);
        return;
    }
    if (data.qtype == 3) {
        //简答题
        var shortAnswerQuestion = $("<div class='shortAnswerQuestion'></div>")
        var question = $("<div class='question' style='float: left'>" +
            "<span>" + data.stem + "</span>" +
            "</div><br>"
        );
        var myScore = $("<div>" +
            "    <div class=\"row\">" +
            "        <div class=\"col-md-12\">" +
            "            <div class=\"paperInfoLabel\">得分：</div>" +
            "            <div class=\"score\" name='SScore' contenteditable='true' value='" + data.qno + "'>0</div>" +
            "        </div>" +
            "    </div>" +
            "</div>");
        shortAnswerQuestion.append(question, score, myScore, ranswer, yanswer);
        $("#ShortAnswerQuestions").append(shortAnswerQuestion);
        return;
    }
    if (data.qtype == 4) {
        var comprehensiveQuestion = $("<div class='comprehensiveQuestion'></div>")
        var question = $("<div class='question' style='float: left' >" +
            "<span>" + data.stem + "</span>" +
            "</div><br>"
        );
        var myScore = $("<div>" +
            "    <div class=\"row\">" +
            "        <div class=\"col-md-12\">" +
            "            <div class=\"paperInfoLabel\">得分：</div>" +
            "            <div class=\"score\" name='ComScore' contenteditable='true' value='" + data.qno + "'>0</div>" +
            "        </div>" +
            "    </div>" +
            "</div>");
        comprehensiveQuestion.append(question, score, myScore, ranswer, yanswer);
        $("#ComprehensiveQuestions").append(comprehensiveQuestion);
        return;
    }
}

// 提交评分请求
function score() {
    var jsonA = [];
    var Cscores = document.getElementsByName('CScore')
    for (var i = 0; i < Cscores.length; i++) {
        var score = Cscores[i].innerHTML;
        var pno = examToScorePno;
        var qno = Cscores[i].getAttribute("value");
        var sno = examToScoreSno;
        var qtype = 1;
        var json = {};
        json.pno = pno;
        json.qno = qno;
        json.sno = sno;
        json.score = score;
        json.qtype = qtype;
        jsonA.push(json);
    }
    var Fscores = document.getElementsByName('FScore')
    for (var i = 0; i < Cscores.length; i++) {
        var score = Fscores[i].innerHTML;
        var pno = examToScorePno;
        var qno = Fscores[i].getAttribute("value");
        var sno = examToScoreSno;
        var qtype = 2;
        var json = {};
        json.pno = pno;
        json.qno = qno;
        json.sno = sno;
        json.score = score;
        json.qtype = qtype;
        jsonA.push(json);
    }
    var Sscores = document.getElementsByName('SScore')
    for (var i = 0; i < Sscores.length; i++) {
        var score = Sscores[i].innerHTML;
        var pno = examToScorePno;
        var qno = Sscores[i].getAttribute("value");
        var sno = examToScoreSno;
        var qtype = 3;
        var json = {};
        json.pno = pno;
        json.qno = qno;
        json.sno = sno;
        json.score = score;
        json.qtype = qtype;
        jsonA.push(json);
    }
    var Comscores = document.getElementsByName('ComScore')
    for (var i = 0; i < Comscores.length; i++) {
        var score = Comscores[i].innerHTML;
        var pno = examToScorePno;
        var qno = Comscores[i].getAttribute("value");
        var sno = examToScoreSno;
        var qtype = 4;
        var json = {};
        json.pno = pno;
        json.qno = qno;
        json.sno = sno;
        json.score = score;
        json.qtype = qtype;
        jsonA.push(json);
    }
    $.ajax({
        url: "/ser/TeacherServlet?method=score",
        type: "POST",
        dataType: "json",
        data: {"score": JSON.stringify(jsonA)},
        success: function (data) {
            if (data == 0) {
                alert("评分成功！");
            } else if (data == 1) {
                alert("已有学生参加考试，无法修改！");
            } else if (data == 2) {
                alert("您没有创建过这道题目！");
            } else {
                alert("删除失败，请重试！");
            }
        },
        error: function () {
            alert("请求失败！请重试");
        }
    })
    $("#paper").hide();
    $("#searchExamToScore").show();
}

/*********************评分end*********************/