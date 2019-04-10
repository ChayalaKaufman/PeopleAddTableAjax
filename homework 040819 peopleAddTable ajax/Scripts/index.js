$(() => {
    $(".add").on('keyup', function () {
        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const age = $("#age").val();
        $("#add-person").prop('disabled', !firstName || !lastName || !age);
    })
    const addPersonToTable = person => {
        $("#people-table").append(`<tr>
                                        <td>${person.FirstName}</td>
                                        <td>${person.LastName}</td>
                                        <td>${person.Age}</td>
                                        <td><button class="btn btn-danger delete" data-id="${person.Id}">Delete</button>
                                        <td><button class="btn btn-success edit" data-first-name="${person.FirstName}"
                                         data-last-name="${person.LastName}" data-age="${person.Age}" 
                                         data-id="${person.Id}">Edit</button>
                                        </tr>`);
    }

    const fillTable = ppl => {
        $("#people-table").find("tr:gt(0)").remove();
        ppl.forEach(person => addPersonToTable(person));
    }

    $("#add-person").on('click', function () {
        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const age = $("#age").val();

        $.post('/home/addPerson', { firstName, lastName, age }, function (ppl) {
            fillTable(ppl.People);
        })
        $("#first-name").val('');
        $("#last-name").val('');
        $("#age").val('');
    })

    $("#people-table").on('click', '.delete', function () {
        const button = $(this);
        const id = button.data('id');
        $.post('/home/delete', { id }, function (ppl) {
            fillTable(ppl.People);
        })
    })

    $("#people-table").on('click', '.edit', function() {
        const button = $(this);
        const id = button.data('id');

        $("#edit-first-name").val(button.data('first-name'));
        $("#edit-last-name").val(button.data('last-name'));
        $("#edit-age").val(button.data('age'));
        $("#edit-id").val(button.data('id'));
        $("#edit-modal").modal();
    })

    $("#save").on('click', function () {
        const firstName = $("#edit-first-name").val();
        const lastName = $("#edit-last-name").val();
        const age = $("#edit-age").val();
        const id = $("#edit-id").val();
        $("#edit-modal").modal('hide');
        $.post('/home/edit', { firstName, lastName, age, id }, function (ppl) {
            fillTable(ppl.People);
        })

    })
});