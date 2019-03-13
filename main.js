//Data Controller
var dataController = (function () {

    var data = {
        allItems: []
    };

    return{
        addData: function(value){
            data.allItems.push(value);
        },        
        getData: function(){
            console.log(data);
        }
    };

})();

//UI Controller
var uiController = (function () {
    var DOMStrings = {
        inputElement: '.top__pannel__input'
    };

    return{
        //Expose DOMElements to the public
        getDOMElement: function(){
            return DOMStrings;
        }
    }

})();

//Global Controller
var globalController = (function (dataCtr, uiCtr) {
    //Add Keyboard Return Key Press Event
    document.addEventListener('keypress', function(event){
        if(event.keyCode ===13 || event.which ===13){
            fetchInputs(); 
        }
    });
    //DOM element for global controller
    var DOM = uiCtr.getDOMElement();

    var fetchInputs = function(){
    //Fetch the input value
    var input = document.querySelector(DOM.inputElement).value;

    //Input Data
    dataCtr.addData(input);
    };

})(dataController, uiController);