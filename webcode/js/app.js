

    /*settings override */
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };

    var doc = document;
    doc.getNode = doc.querySelector;
    var shim = doc.getNode('.shim-modal-deleteRow');
    var shimSettings = doc.getNode('.shim-modal-settings');
    var reciptWindow = doc.getNode('.recipt-settings');

    /* constants */


    var itemTarg = doc.getNode('.recipt-body ul');
    var baseTax = localStorage.getItem('lmsDiscountCalcTaxRate') || 0;
    var baseDisc = localStorage.getItem('lmsDiscountCalcDiscRate') || 0;
    var hasTouch = function () { return "ontouchstart" in window; }();
    var myScroll2;


    // static markup behavior

    var inputGroup = doc.querySelectorAll('input.picker-input-input');


    //behavior for updating the view when tax is changed
    var updateTax = function () {

        doc.getNode('.taxControl-input').addEventListener('blur', function () { baseTax = removeFormat(this.value); myList.render(); myList.saveIt() }, this);
        doc.getNode('.totalDiscount-input').addEventListener('blur', function () { baseDisc = removeFormat(this.value); myList.render(); myList.saveIt() }, this);


    }();





    //utilitiy classes
    var formatCurrency = function (num) {
        num = isNaN(num) || num === '' || num === null ? 0.00 : num;
        return parseFloat(num).toFixed(2);
    };

    var removeFormat = function (num) {
        num = num.replace("$", "");
        num = num.replace("%", "");
        num = isNaN(num) || num === '' || num === null ? 0 : num;
        return parseFloat(num)
    };




    //build the options lists

    var buildOptions = function (config) {
        var options = config.options;
        var target = config.target;

        var template = _.template('<li>{{listOptions}}</li>');
        var builtString = '';

        _.each(options, function (lOtions) {

            builtString += template({ listOptions: lOtions });


        });


        return builtString

    };


    /*add change events for each of the drop downs */

    var myEventOptions = doc.querySelectorAll(".picker-select")
    _.each(myEventOptions, function (myOption) {

      //  myOption.addEventListener("focus", function (e) { document.activeElement.blur(); window.scrollTo(0, 0); });

        myOption.addEventListener("change", function (e) {
            console.log(this);
            console.log(this.value);
            console.log(this.getAttribute('data-relate'));

            if (this.value !== 'Select') {
                doc.getNode("." + this.getAttribute('data-relate')).value = this.value;

                if (this.getAttribute('data-relate') == 'item-input') {
                    console.log('update called');
                    updateOtherSelects(this.value);
                }
            }
            //

        }, this);


    });


    var updateOtherSelects = function (e) {


        var repArr = valueSwitch(e);
        console.log(repArr)

        var template = _.template('<option>{{optionBuild}}</option>');
        var cutOptions = '';
        var colorOptions = '';
        _.each(repArr.cut, function (cut) { cutOptions += template({ optionBuild: cut }); });

        _.each(repArr.color, function (color) { colorOptions += template({ optionBuild: color }); });

        doc.getNode('.picker-cut').innerHTML = cutOptions;
        doc.getNode('.picker-color').innerHTML = colorOptions;

    };


    var valueSwitch = function (a) {

        switch (a) {
            case 'Select':
                cutOptions = ["Select", "Short", "Long", "Cropped", "Other"];
                colorOptions = ["Select", "Black", "White", "Other"];
                break;
            case 'Other':
                cutOptions = ["Select", "Short", "Long", "Cropped", "Other"];
                colorOptions = ["Select", "Black", "White", "Other"];
                break;
            case 'Shirt':
                cutOptions = ["Select", "T-shirt", "Tank top", "Long sleeve", "Sweater", "Other"];
                colorOptions = ["Select", "Black", "White", "Blue", "Green", "Pink", "Purple", "Red", "Brown", "Other"];
                break;
            case 'Pants':
                cutOptions = ["Select", "Jeans", "Shorts", "Capri", "Other"];
                colorOptions = ["Select", "Khaki", "Black", "Denim", "Brown", "Gray", "Other"];
                break;
            case 'Blouse':
                cutOptions = ["Select", "Long sleeve", "Short sleeve", "Other"];
                colorOptions = ["Select", "White", "Blue", "Pink", "Print", "Other"];
                break;
            case 'Dress':
                cutOptions = ["Select", "Casual", "Special occasion", "Other"];
                colorOptions = ["Select", "Black", "Blue", "Red", "Print", "Other"];
                break;

            case 'Skirt':
                cutOptions = ["Select", "Pencil", "A-line", "Mini", "Other"];
                colorOptions = ["Select", "Blue", "Denim", "Black", "Gray", "Brown", "Other"];
                break;

            case 'Shoes':
                cutOptions = ["Select", "Tennis", "Sandle", "Dress shoe", "Casual", "Other"];
                colorOptions = ["Select", "Black", "Brown", "White", "Other"];
                break;

            case 'Accessories':
                cutOptions = ["Select", "Jewelry", "Hair", "Belt", "Other"];
                colorOptions = ["Select", "Gold", "Silver", "Black", "Brown", "Other"];
                break;

        }

        return { cut: cutOptions, color: colorOptions }





    };




    var deleteRowSetup = function (e) {

        console.log(e.srcElement);

        shim.className += ' active';
        setTimeout(function () { shim.className += ' start-anmi' }, 200);




    };

    //create the positioning element

    //	var newEl = document.createElement('div');
    //	newEl.className += ' picker-positioner'; 
    //	document.body.appendChild(newEl);
    //	



    //	var findPos = function(obj){
    //	
    //				var curleft = curtop = 0;
    //				
    //				if (obj.offsetParent) {
    //					do {
    //						curleft += obj.offsetLeft;
    //						curtop += obj.offsetTop;
    //					}
    //					while (obj = obj.offsetParent);
    //					return [curleft, curtop];
    //				};
    //			};


    //	var createpop = function(e){
    //		//console.log('test')
    //		//console.log(e.srcElement);
    //		//console.log(findPos(e.srcElement));
    //		
    //		var myPosition = findPos(e.srcElement);
    //		
    //		doc.getNode('.picker-positioner').style.top = myPosition[0]+'px';
    //		doc.getNode('.picker-positioner').style.left = myPosition[1]+'px';
    //		doc.getNode('.picker-positioner').style.display = 'block';
    //		
    //		//e.srcElement
    //		
    //		//console.log(doc.getNode('.picker-positioner').style.top);
    //	};


    //	var clickerCollection = doc.querySelectorAll('.picker-pick');
    //	_.each(clickerCollection, function(cc){
    //	console.log(cc.attributes[1].nodeValue);
    //	cc.addEventListener('click', createpop, this);
    //	});

    //console.log('buildOptions$$$$$$$$$$$$$$$$$$4')
    //console.log(buildOptions({options:['1','2','3'],target:'test'}));



    //		function check(e){ 
    //			//console.log('testtesttest');
    //			var target = (e && e.target) || (event && event.srcElement); 
    //			var obj = doc.getNode('.picker-positioner'); 
    //			if(checkParent(target) == true && e.srcElement !== doc.getNode('.picker-pick')){
    //				obj.style.display = 'none';
    //				
    //			}
    //			
    //	} 
    //	function checkParent(t){ 
    //		while(t.parentNode){ 
    //		if(t==doc.getNode('.picker-positioner')){ 
    //		return false 
    //		} 
    //		t=t.parentNode 
    //		} 
    //		return true 
    //	} 
    //	
    //	
    //	doc.addEventListener('click', check, false);














    //add the events for focus behavior
    var addEvents = function (inputN) {
        inputN.addEventListener('focus', function () {
            this.parentNode.className += ' picker-input-focus';
            //so it can scroll;

            if (!this.getAttribute('data-clickinput')) {

                doc.getNode('.container').className += ' pageScroll-ready';
            };



            var that = this;

            //only need this if its android take out for windws 8
         //   if (this.getAttribute('data-scrollPosition')) {
             //   window.scrollTo(0, this.getAttribute('data-scrollPosition'));
          //  }

            setTimeout(function () { that.select(); }, 30);
            //setTimeout(function(){that.value = '';}, 30);

        }, false);


        //trying to get a faster responce to the taps
        //inputN.addEventListener('touchstart', function(e){ console.log(e);e.target.parentNode.className += ' picker-input-focus';	 } );
    };

    //remove the events for focus behavior
    var removeEvents = function (inputN) {
        inputN.addEventListener('blur', function () {
            //window.scrollTo(0,0);
            this.parentNode.className = this.parentNode.className.replace(/(?:^|\s)picker-input-focus(?!\S)/, '');
            //remove scroll
            doc.getNode('.container').className = doc.getNode('.container').className.replace(/(?:^|\s)pageScroll-ready(?!\S)/, '');

            //format the text
            if (this.getAttribute('data-format') == 'money') {

                this.value = '$' + formatCurrency(removeFormat(this.value));
            }
            if (this.getAttribute('data-format') == 'percent') {

                this.value = removeFormat(this.value) + '%';
            }
        }, false);

    };

    //set the events
    _.each(inputGroup, addEvents, this);
    _.each(inputGroup, removeEvents, this);





    //console.log('inputGroup');
    //console.log(inputGroup);


    //model
    var listItemsModel = Backbone.Model.extend({
        defaults: {
            "price": "0.00",
            "percent": "0",
            "title": "new item"

        },

        getFormated: function (attrRec) {

            //more formatting to here, make a request that gets back the evalued total



            return this.get(attrRec)

        },

        validate: function (attributes) {

            console.log('validateor working');
            console.log(attributes);
            if (attributes.price < 0 || isNaN(attributes.price) == true) {
                //console.log('turning up in the if');
                //console.log(this.attributes);
                this.attributes.price = 0;
            }
            if (attributes.discount < 0 || isNaN(attributes.discount) == true) {
                //console.log('turning up in the if');
                //console.log(this.attributes);
                this.attributes.discount = 0;
            }

            if (attributes.title.trim() == '' || attributes.title == 'select') {
                //console.log('in this iff');
                this.attributes.title = 'new item';
            }
        },

    });

    //collection

    var listItemCollectionSet = Backbone.Collection.extend({
        model: listItemsModel
    });


    //[ {title: 'red sweater'}, {title: 'blue jeans'} ]

    var localStoare = JSON.parse(localStorage.getItem('lmsDiscountCalc'));

    //console.log('localStoare');
    //console.log(localStoare);

    var listItemCollection = new listItemCollectionSet(localStoare);


    //console.log('listItemCollection.toJSON()#################');
    //console.log(listItemCollection.toJSON());







    //view

    var ListView = Backbone.View.extend({
        el: itemTarg,

        collection: listItemCollection,

        initialize: function () {
            _.bindAll(this, 'render', 'alertMe', 'saveIt'); //anything that you want to maintain access to the this but be in the bind

            //set up origional local storage 

            this.collection.bind('remove', this.render);
            this.collection.bind('add', this.render);
            //this.collection.bind('remove', function(){console.log('@@@@@@@@@@@@@@@@@@@@@@')})
            this.render(); // not all views are self-rendering. This one is.
            //scroll for list


            //don't need iScrool for windows 8 implimentation, much smoother without
          //  var myScroll = new iScroll('wrapper');
            //myScroll2 = new iScroll('picklists');	
        },


        saveIt: function () {

            localStorage.setItem('lmsDiscountCalc', JSON.stringify(this.collection.toJSON()));
            localStorage.setItem('lmsDiscountCalcTaxRate', baseTax);
            localStorage.setItem('lmsDiscountCalcDiscRate', baseDisc);
            //console.log(JSON.stringify(this.collection.toJSON()))
        },


        alertMe: function () {

            //console.log('alert in log');
            var template = _.template('<li class="receipt-list-item"><div class="receipt-list-item-wrapper"  data-cid="{{cid}}"><div class="receipt-list-item-name"> {{ name }}</div><div class="receipt-list-item-price">${{ price }}</div></div></li>');

            var totalTemplate = _.template('<div class="receipt-total receipt-total-subTotal"><div class="receipt-total-total">SubTotal:</div> <div class="receipt-total receipt-total-amount">${{subTotal}}</div></div><div class="receipt-total receipt-total-discount"><div class="receipt-total-total">total Discount({{baseDisc}}%):</div><div class="receipt-total receipt-total-amout"> ${{totalDiscount}}</div></div><div class="receipt-total receipt-total-tax"><div class="receipt-total-total">Sales Tax({{baseTax}}%):</div><div class="receipt-total-amount"> ${{tax}}</div></div><div class="receipt-total receipt-total-total"><div class="receipt-total-total">Total:</div><div class="receipt-total-amount"> ${{tally}}</div></div>');

            //var settingsTemplate = _.template('<div class="receipt--settings-current">current tax rate:{{taxRate}}</div>');

            var results = '';
            var myTally = 0;

            _.each(this.collection.models, function (myColletion) {

                results += template({ name: myColletion.getFormated('title'), price: formatCurrency(myColletion.getFormated('price')), cid: myColletion.cid });
                myTally += Number(myColletion.getFormated('price'));

            });

            //figure tax
            var totalDis = myTally * baseDisc * .01;
            var myTax = (myTally - totalDis) * baseTax * .01;

            var finalTally = myTally - totalDis + myTax;

            var myTotalTemplate = totalTemplate({ tally: formatCurrency(finalTally), tax: formatCurrency(myTax), subTotal: formatCurrency(myTally), baseTax: baseTax, baseDisc: baseDisc, totalDiscount: formatCurrency(totalDis) });

            //var mySettingsTemplate = settingsTemplate({taxRate:baseTax});

            //TODO: this should be one inject, not two, need to pull some markup out and inject it back in each time


            this.el.innerHTML = results;
            doc.getNode('.recipt-total').innerHTML = myTotalTemplate;
            doc.getNode('.taxControl-input').value = baseTax + '%';
            doc.getNode('.totalDiscount-input').value = baseDisc + '%';
            return results

        },
        //;


        attachEvents: function () {


            var group = doc.querySelectorAll('.receipt-list-item');


            _.each(group, function (lines) {

                document.body.style.webkitTouchCallout = 'none';


                //console.log(lines);
                var startPos = 0;
                var endPos = 0;
                var startTime = '';
                var myTimer;

                var hasTouch = function () { return "ontouchstart" in window; }();

                //console.log(hasTouch);


                //lines.addEventListener('mousedown',function(e){ doc.getNode('.recipt-settings-controlText').innerHTML = e.clientX}, false);
                //lines.addEventListener('mouseup',function(e){ doc.getNode('.recipt-settings-controlText').innerHTML = e.clientX}, false)	;



                //set the listener for deleteting item






                lines.addEventListener(hasTouch ? 'touchstart' : 'click', function (e) {
                    e.target.parentNode.className += " pressed";

                    e.preventDefault();
                    myTimer = setTimeout(function () {
                        startTime = 'time to fire'
                        deleteRowSetup(e);
                        e.target.parentNode.className = e.target.parentNode.className.replace(/(?:^|\s)pressed(?!\S)/, '');
                        //console.log('e.target.innerHTML@@@@@@@@@@@@@@');
                        //console.log(e.target.parentNode.getAttribute('data-cid'));
                        var cidKey = e.target.parentNode.getAttribute('data-cid');
                        doc.getNode('[data-deleteAction]').setAttribute('data-cidKey', cidKey);


                        doc.getNode('.deleteItemDescript').innerHTML = '\"' + e.target.innerHTML + '\"';



                            var targetCon = doc.getNode('.pic-container');
                            targetCon.innerText = '';

                         var itemImage = doc.createElement('img');


                         if (listItemCollection.getByCid(cidKey).attributes.image !== null) {
                            
                            itemImage.src = "data:image/jpeg;base64," + listItemCollection.getByCid(cidKey).attributes.image;
                            targetCon.appendChild(itemImage);

                        }

                         


                    }, 500);
                    //doc.getNode('.recipt-settings-controlText').innerHTML = startPos;


                }, false);


                lines.addEventListener(hasTouch ? 'touchmove' : 'mouseup', function (e) {
                    console.log('should stop timer');
                    e.target.parentNode.className = e.target.parentNode.className.replace(/(?:^|\s)pressed(?!\S)/, '');
                    // endPos = hasTouch?e.touches[0].clientX:e.clientX;

                    //var moveSize =	Math.abs(startPos - endPos);

                    //if(moveSize > 150){

                    //

                    //}
                    clearTimeout(myTimer);
                    // doc.getNode('.recipt-settings-controlText').innerHTML = startTime
                }, false);


                //maybe this isn't needed

                lines.addEventListener('touchend', function (e) {

                    e.target.parentNode.className = e.target.parentNode.className.replace(/(?:^|\s)pressed(?!\S)/, '');
                    clearTimeout(myTimer);
                }, false);
            });









        },







        render: function () {


            var myData = this.collection.models;




            var results = this.alertMe();

            //console.log(results);

            // this.el.innerHTML = results ;


            this.attachEvents();

            this.saveIt();





        }


    });


    var myList = new ListView();

    /*build out the title and then add it to list */

    var prepDescription = function () {

        var descript = doc.getNode('.color-input').value + ' ';

        descript += doc.getNode('.cut-input').value + ' ';

        descript += doc.getNode('.item-input').value;

        var price = removeFormat(doc.getNode('.price-input').value);

        var discount = doc.getNode('.discount-input').value;

        var endPrice = price - price * removeFormat(discount) * .01;

        //console.log(endPrice);

  //      if (currentImgeData == null) currentImgeData = '';

        myList.collection.add({ title: descript, price: endPrice, image: currentImgeData })


    };



    var clearFields = function () {
        //.matchesSelector('[data-clearable="true"]')



        _.each(doc.querySelectorAll('.picker-input-input[data-clearable="true"]'), function (el) {

            el.value = '';

        }, this);

        currentImgeData = null;

        doc.getNode('.price-input').value = '$0';
        doc.getNode('.discount-input').value = '0%';
    };



    var fireListAdd = function () {

        prepDescription();
        clearFields();


    };



    /*we need to add the listener so that the button adds to the collection  */
    doc.getNode(".addButton-button").addEventListener(hasTouch ? 'touchend' : 'click', fireListAdd, false);



    //function to close the shim, called at the end of all three listeners
    var closeShim = function (e) {
        console.log(e);
        e.target.className += " pressed";
        setTimeout(function () {
            shim.className = shim.className.replace(/(?:^|\s)active start-anmi(?!\S)/, '');
            e.target.className = e.target.className.replace(/(?:^|\s)pressed(?!\S)/, '');
        }, 400)
    };


    //add listener to button so it closes and deletes only once 
    doc.getNode('.shim-selection-list-delteItem').addEventListener(hasTouch ? 'touchend' : 'mousedown', function (e) {
        if (e.target.getAttribute('data-deleteAction') == 'delete') {

            listItemCollection.remove(e.target.getAttribute('data-cidkey'));
            myList.saveIt();
        }
        e.stopPropagation();
        closeShim(e);

    });



    //add listener for shim to close itself and one to stop the content from closing
    doc.getNode('.shim-deleteTarg').addEventListener(hasTouch ? 'touchend' : 'click', function (e) { e.preventDefault(); e.stopPropagation(); });
    doc.getNode('.shim-deleteTarg').addEventListener('touchstart', function (e) { e.preventDefault(); e.stopPropagation(); });
    doc.getNode('.shim-content-settings').addEventListener(hasTouch ? 'touchend' : 'click', function (e) { e.preventDefault(); e.stopPropagation(); });
    doc.getNode('.shim-content-settings').addEventListener('touchstart', function (e) { e.preventDefault(); e.stopPropagation(); });
    //doc.getNode('.shim-content-settings').addEventListener('click', function(e){e.preventDefault(); e.stopPropagation();	});




    //this is to handel the touchstart on the input fields
    doc.getNode('.taxPicker-input-wrapper').addEventListener('touchend', function (e) { if (e.target.childNodes[0]) { e.target.childNodes[0].focus() } else { e.target.focus() }; e.stopPropagation() }, false);
    doc.getNode('.totalDiscount-input-wrapper').addEventListener('touchend', function (e) { if (e.target.childNodes[0]) { e.target.childNodes[0].focus() } else { e.target.focus() }; e.stopPropagation() }, false);

    //doc.getNode('.taxControl-input').addEventListener('touchend', function(e){e.target.focus();	e.stopPropagation()}, true );
    //doc.getNode('.totalDiscount-input').addEventListener('touchend', function(e){e.target.focus();	e.stopPropagation()}, true );




    shim.addEventListener(hasTouch ? 'touchend' : 'click', closeShim, false);
    //TODO:  add listener back to no button to close the same content, seperate the function out of the event above

    //add listener for shim to close itself and one to not let settings close it
    doc.getNode('.shim-content-settings').addEventListener(hasTouch ? 'touchend' : 'click', function (e) { e.stopPropagation(); });
    shimSettings.addEventListener(hasTouch ? 'touchend' : 'click', function () { shimSettings.className = shimSettings.className.replace(/(?:^|\s)active start-anmi(?!\S)/, ''); }, false);


    //doc.getNode('.recipt-settings-controle').addEventListener(hasTouch?'touchstart':'click', function(e){e.preventDefault()});
    document.addEventListener(hasTouch ? 'touchstart' : 'mousedown', function (e) {
        //console.log(doc.getNode('.picker-input-focus'));
        if (doc.getNode('.picker-input-focus')) {
            doc.getNode('.picker-input-focus').className = doc.getNode('.picker-input-focus').className.replace(/(?:^|\s)picker-input-focus(?!\S)/, '');
            //remove scroll
            doc.getNode('.container').className = doc.getNode('.container').className.replace(/(?:^|\s)pageScroll-ready(?!\S)/, '');
            //to blur current elemtn as well
            //console.log(e);
            //console.log(e.target.nodeName.toLowerCase())
            if (e.target.nodeName.toLowerCase() !== 'input') {
                document.activeElement.blur()
            }
        }
    });


    //add listener to open and close the controls			
    doc.getNode('.recipt-total').addEventListener(hasTouch ? 'touchend' : 'click', function () {


        //	if(reciptWindow.getAttribute('data-showcontrol') == 'true'){
        //
        //		reciptWindow.className = reciptWindow.className.replace( /(?:^|\s)control-state-showing(?!\S)/ , '' );
        //		reciptWindow.setAttribute('data-showcontrol', 'false') ;
        //		
        //	}else{
        //		reciptWindow.className += ' control-state-showing';	
        //		reciptWindow.setAttribute('data-showcontrol', 'true') ;	
        //		
        //	}
        shimSettings.className += ' active';
        setTimeout(function () { shimSettings.className += ' start-anmi' }, 200);



    }, false);

    //add enter key press to blur element

    doc.addEventListener('keypress', function () { if (window.event.keyCode == 13) { document.activeElement.blur(); window.scrollTo(0, 0); } });



    //add button touch down and up effect
    var addButtonNode = doc.getNode('.addButton-button');
    addButtonNode.addEventListener('touchstart', function (e) { addButtonNode.className += " pressed" }, false)
    addButtonNode.addEventListener('touchmove', function (e) { addButtonNode.className = addButtonNode.className.replace(/(?:^|\s)pressed(?!\S)/, ''); })
    addButtonNode.addEventListener('touchend', function (e) { addButtonNode.className = addButtonNode.className.replace(/(?:^|\s)pressed(?!\S)/, ''); })




    var currentImgeData = null;
    document.getElementById('takePic').addEventListener('click', function (e) {



           navigator.camera.getPicture(
               function (imageData) {
                   console.log('success')
                   currentImgeData = imageData;
               },
               function (message) { console.log(message) },
               {
                   quality: 25,
                   destinationType: Camera.DestinationType.DATA_URL
               }
               );
    });