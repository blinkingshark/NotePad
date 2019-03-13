//Data Controller
var dataController = (function () {

})();

//UI Controller
var uiController = (function () {

})();

//Global Controller
var globalController = (function (dataCtr, uiCtr) {
    //Add Keyboard Return Key Press Event
    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrAddItem();
        }

    })(dataController, uiController);