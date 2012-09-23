var emitter = require('emitter');
var editable = require('editable');

module.exports = makeEditable;
function makeEditable(elements) {
    editable.click(elements, function (element) {
        if (element.getAttribute('data-in-edit-mode') == 'true') return;
        element.setAttribute('data-in-edit-mode', 'true');
        edit(element);
    });
}
emitter(makeEditable);

function edit(element) {
    emit('pre-begin-edit', element);
    var value = element.textContent;
    element.innerHTML = '';
    var edit = document.createElement('input');
    edit.type = "text";
    edit.value = value;
    element.appendChild(edit);
    edit.focus();
    editable.blur(edit, function () {
        emit('pre-end-edit', element);
        element.innerHTML = edit.value;
        element.setAttribute('data-in-edit-mode', 'false');
        if (value != edit.value) {
            emit('update', element, edit.value);
        }
        emit('post-end-edit', element);
    });
    emit('post-begin-edit', element);
}

function emit() {
    module.exports.emit.apply(module.exports, arguments);
    editable.emit.apply(editable, arguments);
}