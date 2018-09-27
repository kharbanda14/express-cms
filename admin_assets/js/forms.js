var fields = [];
$(document).ready(function () {

    $('#addTextField').click(function () {
        let index = getIndex();
        $('#formFieldshere').append(getTextField(index))
    })
    $('#saveMenu').click(async function () {

        let data = $('#fieldsForm').serialize();
        let http = new FetchApi();
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        console.log(await http.post('/admin_ajax/submit_form', data, headers));

    })
})

function getIndex() {
    return $('.formFields').length;
}

function updateFieldName(el) {
    $(el).parent().parent().parent().find('.eachFieldName').text(el.value);
}

function toggleCardBody(el) {
    $(el).parent().find('.card-body').slideToggle();
}

function getTextField(index = 0) {
    return `
       <div class="card formFields">
    <div class="card-header" onclick="toggleCardBody(this)">
        <span class="eachFieldName">Text</span>
    </div>
    <div class="card-body">
        <div class="form-group" >
            <label for="field_name">
                Field Name (No Spaces)
            </label>
            <input type="text" onchange="updateFieldName(this)" name="form_fields[${index}][name]" class="form-control">
        </div>
        <div class="form-group">
            <label for="field_name">
                Validation
            </label>
            <input type="text" name="form_fields[${index}][validate]" class="form-control">
        </div>
        <div class="form-group">
            <label for="field_name">
                Minimum Length
            </label>
            <input type="number" name="form_fields[${index}][min_length]" class="form-control">
        </div>
        <div class="form-group">
            <label for="field_name">
                Max Length
            </label>
            <input type="number" name="form_fields[${index}][max_length]" class="form-control">
        </div>
        <input type="hidden" name="form_fields[${index}][type]" value="text" class="form-control">
    </div>
</div>
    `;
}