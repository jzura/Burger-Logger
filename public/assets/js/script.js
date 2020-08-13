$(document).ready(() => {

    // on clicking submit an event is triggered to save burger name and reloads page
    $(document).on("click", ".burger-submit-btn", (event) => {
        event.preventDefault();
        const providedBurgerName = $("#burger-name").val().trim();
        if (providedBurgerName && providedBurgerName.length) {
            const newBurger = {
                burger_name: providedBurgerName,
                devoured: 0
            };
            $.ajax("/api/burgers", {
                type: "POST",
                data: newBurger
            }).then(() => location.reload())
                .catch(error => console.log(error));
        } else {
            $("#burger-modal-status").modal();
        }
    });

    // click devour button to mark burger as eaten
    $(document).on("click", ".devour-button", (event) => {
        const id = $(event.target).data("id");
        const newDevoured = $(event.target).data("devoured")
        const newDevourState = {
            devoured: newDevoured
        };
        $.ajax(`/api/burgers/${id}`, {
            type: "PUT",
            data: newDevourState
        }).then(() => location.reload())
            .catch(error => console.log(error));
    });

});