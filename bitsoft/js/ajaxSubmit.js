$(function () {
    var optionsContact = {  
        beforeSubmit:  beforeSubmitContact,
        success:       successContact,
        error:         errorContact,
        url:       "/api/contact",
        type:      "post",
        dataType:  "json",
        clearForm: false, 
        resetForm: true,
        timeout:   10000
    };
    
    function beforeSubmitContact(arr, $form, options) {
        
        $form[0][4].disabled = true;
        
        var errFlg = false;
        var errMsg = '';
        if (arr[0].value == '') {
            errMsg = errMsg.concat("・「お名前:」入力してください！</br>");
            errFlg = true;
        }
        var tel = arr[1].value.replace(/[━.*‐.*―.*－.*\-.*ー.*\-]/gi,'');
        if (arr[1].value != '') {
            if (!tel.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)) {
                errMsg = errMsg.concat("・「電話番号:」正しい電話番号を入力してください。</br>");
                errFlg = true;
            }
        }
        var mail = arr[2].value;
        if (mail == '' || mail == null) {
            errMsg = errMsg.concat("・「Eメール:」入力してください！</br>");
            errFlg = true;
        } else {
            var reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/;
            if (!reg.test(mail)) {
                errMsg = errMsg.concat("・「Eメール:」正しいメールアドレスを入力してください。</br>");
                errFlg = true;
            }
        }
        if (arr[3].value == '') {
            errMsg = errMsg.concat("・「メッセージ:」入力してください！</br>");
            errFlg = true;
        }

        if (errFlg) {
            $("#msgContact").attr("class","alert alert-warning text-danger");
            $("#msgContact").html(errMsg);
            $form[0][4].disabled = false;
            return false;
        }
        return true;
    };
    
    function successContact(data, statusText, xhr,  form) {
        $("#msgContact").removeAttr("class");
        if (data.code == '200') {
            $("#msgContact").attr("class","alert alert-success text-success");
            $("#msgContact").html(data.msg);
        } else {
            $("#msgContact").attr("class","alert alert-warning text-danger");
            $("#msgContact").html(data.msg);
        }
        form[0][4].disabled = false;
        console.log(data);
    };
    
    function errorContact(data, statusText, xhr,  form) {
        $("#msgContact").removeAttr("class");
        $("#msgContact").attr("class","alert alert-warning text-danger");
        $("#msgContact").html("システムエラーが発生しました。");

        form[0][4].disabled = false;
        console.log(data);
    };
    
    $("#sendContact").submit(function () {
        $(this).ajaxSubmit(optionsContact);
        return false;
    });
    
    
    var optionsRecruit = {  
        beforeSubmit:  beforeSubmitRecruit,
        success:       successRecruit,
        error:         errorRecruit,
        url:       "/api/recruit",
        type:      "post",
        dataType:  "json",
        clearForm: false, 
        resetForm: true,
        timeout:   10000
    };
    
    
    function beforeSubmitRecruit(arr, $form, options) {
        
        $("#customRecruit")[0].disabled = true;
        
        var errFlg = false;
        var errMsg = '';
        if (arr[0].value == '') {
            errMsg = errMsg.concat("・「お名前:」入力してください！</br>");
            errFlg = true;
        }
        if (arr[1].value == '') {
            errMsg = errMsg.concat("・「フリガナ:」入力してください！</br>");
            errFlg = true;
        } else {
            if (!isZenkakuKana(arr[1].value)) {
                errMsg = errMsg.concat("・「フリガナ:」全角カタガナで入力してください。</br>");
                errFlg = true;
            }
        }
        if (arr[2].value == '') {
            errMsg = errMsg.concat("・「性別:」入力してください！</br>");
            errFlg = true;
        }
        if (arr[3].value == '') {
            errMsg = errMsg.concat("・「生年月日:」入力してください！</br>");
            errFlg = true;
        } else {
            if (!ckDate(arr[3].value)) {
                errMsg = errMsg.concat("・「生年月日:」yyyy/mm/dd形式で入力してください。</br>");
                errFlg = true;
            }
        }
        if (arr[4].value == '') {
            errMsg = errMsg.concat("・「住所:」入力してください！</br>");
            errFlg = true;
        }
        var mail = arr[5].value;
        if (mail == '' || mail == null) {
            errMsg = errMsg.concat("・「Eメール:」入力してください！</br>");
            errFlg = true;
        } else {
            var reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/;
            if (!reg.test(mail)) {
                errMsg = errMsg.concat("・「Eメール:」正しいメールアドレスを入力してください。</br>");
                errFlg = true;
            }
        }
        if (arr[6].value == '') {
            errMsg = errMsg.concat("・「最終学歴:」入力してください！</br>");
            errFlg = true;
        }
        var tel = arr[8].value.replace(/[━.*‐.*―.*－.*\-.*ー.*\-]/gi,'');
        if (arr[8].value != '') {
            if (!tel.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)) {
                errMsg = errMsg.concat("・「電話番号:」正しい電話番号を入力してください。</br>");
                errFlg = true;
            }
        }
        if (arr[9].value == '') {
            errMsg = errMsg.concat("・「自己PR／志望動機:」入力してください！</br>");
            errFlg = true;
        }
        if (errFlg) {
            $("#msgRecruit").parent().attr("class","col-md-12 alert alert-warning text-danger");
            $("#msgRecruit").html(errMsg);
            $("#customRecruit")[0].disabled = false;
            return false;
        }
        return true;
    };
    
    function successRecruit(data, statusText, xhr, form) {
        $("#msgRecruit").removeAttr("class");
        if (data.code == '200') {
            $("#msgRecruit").parent().attr("class","col-md-12 alert alert-success text-success");
            $("#msgRecruit").html(data.msg);
        } else {
            $("#msgRecruit").parent().attr("class","col-md-12 alert alert-warning text-danger");
            $("#msgRecruit").html(data.msg);
        }
        
        form[0][2].parentElement.children[1].innerHTML = '性別:';
        form[0][6].parentElement.children[1].innerHTML = '最終学歴:';
        
        $("#customRecruit")[0].disabled = true;
        console.log(data);
    };
    
    function errorRecruit(data, statusText, xhr,  form) {
        $("#msgRecruit").removeAttr("class");
        $("#msgRecruit").parent().attr("class","col-md-12 alert alert-warning text-danger");
        $("#msgRecruit").html("システムエラーが発生しました。");

        $("#customRecruit")[0].disabled = false;
        console.log(data);
    };
    
    $("#sendRecruit").submit(function () {
        $(this).ajaxSubmit(optionsRecruit);
        return false;
    });
    
    // 全角カナの判定.
    function isZenkakuKana(s) {
        return !!s.match(/^[ァ-ヶー　]*$/);  // 「　」は全角スペースです.
    }
    // yyyy/mm/ddの判定
    function ckDate(strDate) {
        if(!strDate.match(/^\d{4}\/\d{2}\/\d{2}$/)){
            return false;
        }
        var y = strDate.split("/")[0];
        var m = strDate.split("/")[1] - 1;
        var d = strDate.split("/")[2];
        var date = new Date(y,m,d);
        if(date.getFullYear() != y || date.getMonth() != m || date.getDate() != d){
            return false;
        }
        return true;
    }
});