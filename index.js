var emitter = require('emitter');
var editable = require('editable');

module.exports = makeEditable;
function makeEditable(elements, options) {
    options = options || {};
    editable.click(elements, function (element) {
        if (element.getAttribute('data-in-edit-mode') == 'true') return;
        element.setAttribute('data-in-edit-mode', 'true');
        edit(element, options);
    });
}
emitter(makeEditable);

function edit(element, options) {
    var dimensions;
    if (options.maintainSize === true) {
        dimensions = editable.dimensions(element);
    }
    emit('pre-begin-edit', element);
    var value = element.textContent;
    element.innerHTML = '';
    var edit = document.createElement('input');
    edit.type = "text";
    edit.value = value;
    element.appendChild(edit);
    if (options.maintainSize === true) {
        dimensions = editable.transformDimensions(edit);
        edit.style.width = dimensions.width + 'px';
        edit.style.height = dimensions.height + 'px';
    }
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