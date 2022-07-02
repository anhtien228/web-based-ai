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

var calculateContentHeight = function (ta, scanAmount) {
    var origHeight = ta.style.height,
        height = ta.offsetHeight,
        scrollHeight = ta.scrollHeight,
        overflow = ta.style.overflow;
    /// only bother if the ta is bigger than content
    if (height >= scrollHeight) {
        /// check that our browser supports changing dimension
        /// calculations mid-way through a function call...
        ta.style.height = (height + scanAmount) + 'px';
        /// because the scrollbar can cause calculation problems
        ta.style.overflow = 'hidden';
        /// by checking that scrollHeight has updated
        if (scrollHeight < ta.scrollHeight) {
            /// now try and scan the ta's height downwards
            /// until scrollHeight becomes larger than height
            while (ta.offsetHeight >= ta.scrollHeight) {
                ta.style.height = (height -= scanAmount) + 'px';
            }
            /// be more specific to get the exact height
            while (ta.offsetHeight < ta.scrollHeight) {
                ta.style.height = (height++) + 'px';
            }
            /// reset the ta back to it's original height
            ta.style.height = origHeight;
            /// put the overflow back
            ta.style.overflow = overflow;
            return height;
        }
    } else {
        return scrollHeight;
    }
}

var calculateHeight = function () {
    var ta = document.getElementById("input_text"),
        style = (window.getComputedStyle) ?
            window.getComputedStyle(ta) : ta.currentStyle,

        // This will get the line-height only if it is set in the css,
        // otherwise it's "normal"
        taLineHeight = parseInt(style.lineHeight, 10),
        // Get the scroll height of the textarea
        taHeight = calculateContentHeight(ta, taLineHeight),
        // calculate the number of lines
        numberOfLines = Math.ceil(taHeight / taLineHeight);

    $('#cnt-lines').children('p').text(numberOfLines + (numberOfLines > 1 ? " lines" : " line"));
};

calculateHeight();
if (ta.addEventListener) {
    ta.addEventListener("mouseup", calculateHeight, false);
    ta.addEventListener("keyup", calculateHeight, false);
} else if (ta.attachEvent) { // IE
    ta.attachEvent("onmouseup", calculateHeight);
    ta.attachEvent("onkeyup", calculateHeight);
}

setInterval(function (e) {
    var strText = jQuery.trim($('#input_text').val());
    var cntChar = strText.replace(/ /g, '').length;
    var cntWord = strText.split(/\s+/).length;
    var cntLine = strText.split("\n").length;
    var postFix = '';

    if (strText == '') {
        cntWord = 0;
        cntLine = 0;
    }

    //$('#cnt-lines').children('p').text(cntLine + (cntLine > 1 ? " lines" : " line"));
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