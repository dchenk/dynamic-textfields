"use strict";

// Create a DynamicTextFields object using the "new" operator, with the only
// argument passed in being the ID of an element that will contain all of the
// text fields you will want registered and styled.
function DynamicTextFields(containerID) {

	if (!containerID) {
		console.log("ERROR: You must pass in the ID of the containing element");
		return;
	}

	this.container = document.getElementById(containerID);

	this.resetStyle = function(evt) {
		if (evt.target.value.trim() === "") {
			if (evt.target.classList.contains("required")) {
				evt.target.classList.add("not-set");
			} else {
				this.classList.remove("notempty");
			}
		} else {
			if (evt.target.classList.contains("required")) {
				evt.target.classList.remove("not-set");
			}
			this.classList.add("notempty");
		}
	}

	this.resetAllStyles = function() {
		let els = this.container.getElementsByClassName("dyn-textfield-input");
		for (let i = 0; i < els.length; i++) {
			if (els[i].value === "") {
				els[i].classList.remove("notempty");
			} else {
				els[i].classList.add("notempty");
			}
		}
	}

	this.registerAll = function() {
		let fs = this.container.getElementsByClassName("dyn-textfield-input");
		if (fs.length === 0) {
			return;
		}
		for (let i = 0; i < fs.length; i++) {
			fs[i].addEventListener("change", this.resetStyle);
		}
	}

	this.deregisterAll = function() {
		let els = this.container.getElementsByClassName("dyn-textfield-input");
		for (let i = 0; i < els.length; i++) {
			els[i].removeEventListener("change", this.resetStyle);
		}
	}

	// registerRefresher registers a listener on a text field that, when changed, affects the the value
	// of another text field (making the affected field needed a style reset). Register a refresher
	// to ensure that the input being set programmatically will appear correctly based on whether it's empty.
	this.registerRefresher = function(toListenID, toRefreshID) {
		let r = document.getElementById(toRefreshID);
		document.getElementById(toListenID).addEventListener("input", this.resetStyle.bind(r));
	}

}

export default DynamicTextFields;
