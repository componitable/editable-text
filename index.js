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
    editable.emit('begin-edit', element);
    editable.blur(edit, function () {
        element.innerHTML = edit.value;
        element.setAttribute('data-in-edit-mode', 'false');
        if (value != edit.value) {
            editable.emit('update', element, edit.value);
        }
        editable.emit('end-edit', element);
    });
}

makeEditable(document.querySelectorAll('[data-editable="text"]'));