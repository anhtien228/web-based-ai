// ======= INPUT FIELD (FORM CONTROL) VALIDATION =======
var runOnce = false;
var short_summary = '';
var long_summary = '';

(function () {
    'use strict'
    const forms = document.querySelectorAll('.requires-validation')
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()

// ======= RESET INPUT FIELD WHEN USER CLICKED AT IT (HAS RAN ONCE) =======
$(function () {
    $('#input_text').on("input", function () {
        if (runOnce == true) {
            $(".progress-icon").hide();
            $("#load-noti").hide();
            $(".summarize-button").fadeIn();
        }
    });
});

$('#short_button').on("click", function () {
    var outputField = document.getElementById("output_text");
    outputField.innerHTML = short_summary;
});
$('#long_button').on("click", function () {
    var outputField = document.getElementById("output_text");
    outputField.innerHTML = long_summary;
});

setInterval(function (e) {
    var strText = jQuery.trim($('#input_text').val());
    var cntChar = strText.replace(/ /g, '').length;
    var cntWord = strText.split(/\s+/).length;
    var cntPar = strText.split("\n").length;
    var postFix = '';

    if (strText == '') {
        cntWord = 0;
        cntLine = 0;
    }

    //$('#cnt-paras').children('p').text(cntPar + (cntPar > 1 ? " pars" : " par"));
    $('#cnt-words').children('p').text(cntWord + (cntWord > 1 ? " words" : " word"));
    $('#cnt-chars').children('p').text(cntChar + (cntChar > 1 ? " chars" : " char"));
}, 100);

// ======= COMMUNICATE WITH FLSAK BACK END TO RUN ML TASK =======
$(document).on('submit', '#input_form', function (e) {
    var outputField = document.getElementById("output_text");
    var data = { "input_text": $("#input_text").val() };
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/summarize',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {
            $("#check").attr('checked', false);
            $("#input_text").attr("readonly", true);
            $(".summarize-button").hide();
            $(".progress-icon").fadeIn();
            $("#load-noti").fadeIn();
        },
        success: function (response) {
            $("#check").attr('checked', true);
            $("#input_text").attr("readonly", false);
            $("#load-noti").text("Completed")
            short_summary = response.short;
            long_summary = response.long;
            outputField.innerHTML = short_summary;
        },
        complete: function () {
            runOnce = true;
        },
    })
});