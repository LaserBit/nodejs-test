var disp = 0;
var disp2 = 0;
var ans = 0;
var num = 0;
var operator = "";
var formula = "";

function push(val) {
    if (0 <= val && val <= 9) {
        num = parseInt(val)
        if (operator == "") {
            disp = disp * 10 + num;
            document.calculator.disp.value = disp;
        } else {
            disp2 = disp2 * 10 + num;
            document.calculator.disp.value = disp2;
        }
    } else if (val == "C") {
        disp = 0; disp2 = 0; ans = 0; num = 0; operator = "";
        document.calculator.disp.value = "0";
    } else if (val == "±") {
        if (operator == "") {
            disp = disp * (-1);
            document.calculator.disp.value = disp;
        }
        else {
            disp2 = disp2 * (-1);
            document.calculator.disp.value = disp2;
        }
    } else {
            operator = val;
    }
}

function calculate() {
    switch (operator) {
        case "+":
            ans = parseInt(disp) + parseInt(disp2);
            formula = disp + "+" + disp2 + "=" + ans;
            break;
        case "-":
            ans = parseInt(disp) - parseInt(disp2);
            formula = disp + "-" + disp2 + "=" + ans;
            break;
        case "×":
            ans = parseInt(disp) * parseInt(disp2);
            formula = disp + "×" + disp2 + "=" + ans;
            break;
        case "÷":
            ans = parseInt(disp) / parseInt(disp2);
            formula = disp + "÷" + disp2 + "=" + ans;
            break;
        default:
            break;
    }

    // jsonの準備
    var json = {
        "formula": formula
    };

    // XMLHttpRequestオブジェクトの生成
    var xhr = new XMLHttpRequest();

    // methodとurlを指定
    xhr.open("POST", "/calculation");

    // イベントリスナを設定
    xhr.addEventListener("progress", function(){}); // 通信中
    xhr.addEventListener("load", function(){}); // 通信成功
    xhr.addEventListener("error", function(){}); // 通信失敗
    xhr.addEventListener("abort", function(){}); // 通信をキャンセル

    // Content-Typeを設定
    xhr.setRequestHeader("Content-Type", "application/json");

    // 送信
    xhr.send(JSON.stringify(json));
    
    document.calculator.disp.value = ans;
    disp = 0; disp2 = 0; ans = 0; num = 0; operator = "", formula = "";
}
