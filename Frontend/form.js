$(document).ready(function() {
    $("form").submit(function(event) {
        var formData = {
            name: $("#user").val(),
            email: $("#date").val(),
        };

        $.ajax({
            type: "GET",
            url: "process.php",
            data: formData,
            dataType: "json",
            encode: true,
        }).done(function(data) {
            console.log(data);
        });

        event.preventDefault();
    });
});