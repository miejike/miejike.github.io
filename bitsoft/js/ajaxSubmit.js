$(function () {
    var email = 'contact@bitsoft-inc.co.jp';
    var subject = 'ご利用に関するお問い合わせ';
    var subjectEntry = '応募の件';
    
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

        if (errFlg) {
            $("#msgContact").attr("class","alert alert-warning text-danger");
            $("#msgContact").html(errMsg);
            $form[0][4].disabled = false;
            return false;
        }
        return true;
    };
    
    $("#sendContact").submit(function (e) {
        e.preventDefault();
        var arr = $(this).serializeArray();
        // $(this).ajaxSubmit(optionsContact);
        
        if (beforeSubmitContact(arr, $(this))) {
            // メールの本文を構築
            var body = "差出人: " + arr[0].value + "\n\n";
            body += "電話番号: " + arr[1].value + "\n\n";
            body += "メッセージ: " + arr[2].value;

            // メールリンクを作成
            var mailtoLink = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

            // デフォルトのメールクライアントを開く
            window.location.href = mailtoLink;
        };
        return false;
    });
    
    
    function beforeSubmitRecruit(arr) {
        
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
    
    $("#sendRecruit").submit(function (e) {
        e.preventDefault();
        var arr = $(this).serializeArray();

        if (beforeSubmitRecruit(arr)) {
            // メールの本文を構築
            var body = "差出人: " + arr[0].value + "\n\n";
            body += "フリガナ: " + arr[1].value + "\n\n";
            body += "性別: " + arr[2].value + "\n\n";
            body += "生年月日: " + arr[3].value + "\n\n";
            body += "住所: " + arr[4].value + "\n\n";
            body += "Eメール: " + arr[5].value + "\n\n";
            body += "最終学歴: " + arr[6].value + "\n\n";
            if (arr[7].value) { body += "資格・免許: " + arr[7].value + "\n\n"; }
            if (arr[8].value) { body += "電話番号: " + arr[8].value + "\n\n"; }
            body += "自己PR／志望動機: " + arr[9].value;

            // メールリンクを作成
            var mailtoLink = "mailto:" + email + "?subject=" + encodeURIComponent(subjectEntry) + "&body=" + encodeURIComponent(body);

            // デフォルトのメールクライアントを開く
            window.location.href = mailtoLink;
        };
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