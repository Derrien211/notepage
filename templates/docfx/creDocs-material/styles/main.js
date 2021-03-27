// Mermaid
mermaid.initialize({
    theme: 'forest',
    securityLevel: 'loose'
  });
  
$( document ).ready(function() {
    mermaid.init(document.querySelectorAll('code.lang-mermaid'));
});

// CopyButton
// https://www.dannyguo.com/blog/how-to-add-copy-to-clipboard-buttons-to-code-blocks-in-hugo/

function addCopyButtons(clipboard) {
    document.querySelectorAll('pre > code').forEach(function (codeBlock) {

        var className = codeBlock.getAttribute('class');
        console.log(className);

        if (className !== null && className.includes('mermaid')) {
            codeBlock.parentElement.style.backgroundColor = "white";
            return;
        }

        var button = document.createElement('button');
        button.className = 'copy-code-button';
        button.type = 'button';
        button.innerText = '\uD83D\uDCCB Copy';

        button.addEventListener('click', function () {
            clipboard.writeText(codeBlock.innerText).then(function () {
                /* Chrome doesn't seem to blur automatically,
                   leaving the button in a focused state. */
                button.blur();

                button.innerText = 'Copied!';

                setTimeout(function () {
                    button.innerText = '\uD83D\uDCCB Copy';
                }, 2000);
            }, function (error) {
                button.innerText = 'Error';
            });
        });

        var elementToInsert = button;

        /* Test */
        // var codeHeader = document.createElement('div');
        // codeHeader.className = 'codeHeader';

        // var codeLanguage = document.createElement('span');
        // codeLanguage.className = 'language';
        // codeLanguage.textContent = "Testsprache";

        // codeHeader.appendChild(codeLanguage)
        // codeHeader.appendChild(button);

        // elementToInsert = codeHeader;
        /* End Test */

        var pre = codeBlock.parentNode;
        if (pre.parentNode.classList.contains('highlight')) {
            var highlight = pre.parentNode;
            highlight.parentNode.insertBefore(elementToInsert, highlight);
        } else {
            pre.parentNode.insertBefore(elementToInsert, pre);
        }
    });
}

if (navigator && navigator.clipboard) {
    addCopyButtons(navigator.clipboard);
} else {
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.7.0/clipboard-polyfill.promise.js';
    script.integrity = 'sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94=';
    script.crossOrigin = 'anonymous';
    script.onload = function() {
        addCopyButtons(clipboard);
    };

    document.body.appendChild(script);
}

// Use container fluid
var containers = $(".container");
containers.removeClass("container");
containers.addClass("container-fluid");

// Navbar Hamburger
$(function() {
    $(".navbar-toggle").click(function() {
        $(this).toggleClass("change");
    })
})

// Select list to replace affix on small screens
$(function () {
    var navItems = $(".sideaffix .level1 > li");

    if (navItems.length == 0) {
        return;
    }

    var selector = $("<select/>");
    selector.addClass("form-control visible-sm visible-xs");
    var form = $("<form/>");
    form.append(selector);
    form.prependTo("article");

    selector.change(function() {
        window.location = $(this).find("option:selected").val();
    })

    function work(item, level) {
        var link = item.children('a');

        var text = link.text();
        
        for (var i = 0; i < level; ++i) {
            text = '&nbsp;&nbsp;' + text;
        }

        selector.append($('<option/>', {
            'value': link.attr('href'),
            'html': text
        }));

        var nested = item.children('ul');

        if (nested.length > 0) {
            nested.children('li').each(function () {
                work($(this), level + 1);
            });
        }
    }

    navItems.each(function () {
        work($(this), 0);
    });
})