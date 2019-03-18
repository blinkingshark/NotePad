//Data Module ++++++++++++++++++++++++++++++++++++++
var dataModule = (function () {

	//Creating Item Object
	var itemObject = function (Id, Topic, Description) {
		this.id = Id;
		this.topic = Topic;
		this.description = Description;
		this.status = 1;
	};
	//DataHolder
	var data = {
		items: [],
	};

	return {
		expose: function () {
			console.log(data);
		},

		addItem: function (topic, description) {
			var id, newItem;
			if (data.items.length > 0) {
				id = data.items[data.items.length - 1].id + 1;
			}
			else {
				id = 0;
			}


			//Create a new Item
			newItem = new itemObject(id, topic, description);

			//Pushing the item to data holder
			data.items.push(newItem);

			//Returning the object --->Easier for adding item to UI
			return newItem;



		},

		getLastItem: function () {
			return data.items[data.items.length - 1];
		},

		markItem: function (recievedId) {
			if (data.items[recievedId].status === 1) {
				data.items[recievedId].status = -1;

			} else {
				data.items[recievedId].status = 1;
			}
		},

		deleteItem: function (recievedId) {
			var newIDs, indexr;
			//New array containing ids of Real Data Array
			newIDs = data.items.map(function (current) {
				return current.id;
			});
			//Get the indexnumber of the relavent item
			indexr = newIDs.indexOf(recievedId);
			
			//Delete the Item
			if (indexr !== -1) {

				data.items.splice(indexr, 1);
			}
		},

	};


})();


//UI Module ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var uiModule = (function () {

	return {
		getValues: function () {

			return {
				topic: document.getElementById("top__input").value,
				//Decription aswell
			}
		},

		addHTMLElements: function (object) {
			var stringHTML, newHTML;

			stringHTML = '<div><div id="content-%id%"> %topic% <input type="button" value="Done" class="done"><input type="button" value="Delete" class="delete"></div> </div>';
			newHTML = stringHTML.replace('%id%', object.id);
			newHTML = newHTML.replace('%topic%', object.topic);
			document.querySelector('.content').insertAdjacentHTML('beforeend', newHTML);
		},
		deleteElement: function(elementID){
			var el;
			el = document.getElementById(elementID)
			el.parentNode.removeChild(el);
		}




	};


})();



//Global Controller Module  ++++++++++++++++++++++++++++++++++++++++++++++++++++
var globalControllerModule = (function (uiCtr, dtCtr) {


	//Introducting Event Listeners
	var allEventListeners = function () {
		//document.getElementById("top__input").addEventListener('click',addingItems);
		document.addEventListener('keypress', function (event) {
			if (event.keycode === 13 || event.which === 13) {
				addingItems();
			}
		});

		//Strike button Event Listener
		document.querySelector(".content").addEventListener('click', strikeObject);
		//Delete Button Event Listener
		document.querySelector(".content").addEventListener('click', deleteObject);
	};

	//Add Item
	var addingItems = function () {
		console.log("Adding Item Function is Working");

		//1. Adding item to the Data Controller
		//Create an temporty getObject
		var temporyObject = uiCtr.getValues();

		//User input Validation
		if (temporyObject.topic !== "") {
			dataModule.addItem(temporyObject.topic, "Test Description blah blah");

			//2. Addin item to the UI from UI Controller
			uiCtr.addHTMLElements(dtCtr.getLastItem());
		}

		else {
			console.log("Empty String");
		}
	};

	//Make it done
	var strikeObject = function (event) {
		var elementID, splitId, trueId;
		//Checking the button is Done/Undone Button
		if (event.target.classList.contains("done")) {
			document.getElementById(event.target.parentNode.id).classList.toggle('strike');
			//Toggling the value of the button
			if (event.target.value == "Done") {
				event.target.value = "Undone";
			} else {
				event.target.value = "Done";
			}


			elementID = event.target.parentNode.id; //Eg. "content__2"
			console.log(elementID);
			splitId = elementID.split('-');
			trueId = splitId[1];
			dtCtr.markItem(trueId);
		}

	};
	//Delete It
	var deleteObject = function (event) {
		var elementID, splitId, trueId;
		//Checking the button is Done/Undone Button
		if (event.target.classList.contains("delete")) {
			elementID = event.target.parentNode.id; //Eg. "content__2"
			splitId = elementID.split('-');
			trueId = parseInt(splitId[1]);
			dtCtr.deleteItem(trueId);

			//Delete From UI
			uiCtr.deleteElement(elementID);
		}

	};




	return {
		initilize: function () {

			console.log("globalController is working");
			allEventListeners();
		},

	};


})(uiModule, dataModule);
globalControllerModule.initilize();

