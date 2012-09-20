var editable = require('editable');

module.exports = makeEditable;
function makeEditable(elements) {
    editable.click(elements, function (element) {
        if (element.getAttribute('data-in-edit-mode') == 'true') return;
        element.setAttribute('data-in-edit-mode', 'true');
        edit(element);
    });
}

function edit(element) {
    var value = element.textContent;
    element.innerHTML = '';
    var edit = document.createElement('input');
    edit.type = "text";
    edit.value = value;
    element.appendChild(edit);
    edit.focus();
    editable.blur(edit, function () {
        element.innerHTML = edit.value;
        element.setAttribute('data-in-edit-mode', 'false');
    });
}

makeEditable(document.getElementsByClassName('editable-text'));