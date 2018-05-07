var disp = 0;
var disp2 = 0;
var ans = 0;
var num = 0;
var operator = "";

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
        if (val == "=") {
            //ans = parseInt(disp) operator parseInt(disp2);
            switch (operator) {
                case "+":
                    ans = parseInt(disp) + parseInt(disp2);
                    break;
                case "-":
                    ans = parseInt(disp) - parseInt(disp2);
                    break;
                case "×":
                    ans = parseInt(disp) * parseInt(disp2);
                    break;
                case "÷":
                    ans = parseInt(disp) / parseInt(disp2);
                    break;
                default:
                    break;
            }
            document.calculator.disp.value = ans;
            disp = 0; disp2 = 0; ans = 0; num = 0; operator = "";
        } else {
            operator = val;
        }
    }
}
