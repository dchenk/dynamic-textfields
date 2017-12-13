"use strict";

// containerID is the ID of the element that contains the input elements
function DynamicTextFields(containerID) {

	this.container = document.getElementById(containerID)

	this.resetStyle = function(evt) {
		if (evt.target.value.trim() === "") {
			if (evt.target.classList.contains("required")) {
				evt.target.classList.add("not-set")
			} else {
				this.classList.remove("notempty")
			}
		} else {
			if (evt.target.classList.contains("required")) {
				evt.target.classList.remove("not-set")
			}
			this.classList.add("notempty")
		}
	}

	this.resetAllStyles = function() {
		var els = this.container.getElementsByClassName("dyn-textfield-input");
		for (var i = 0; i < els.length; i++) {
			if (els[i].value === "") {
				els[i].classList.remove("notempty")
			} else {
				els[i].classList.add("notempty")
			}
		}
	}

	this.registerAll = function() {
		var els = this.container.getElementsByClassName("dyn-textfield-input");
		for (var i = 0; i < els.length; i++) {
			els[i].addEventListener("change", this.resetStyle)
		}
	}

	this.deregisterAll = function() {
		var els = this.container.getElementsByClassName("dyn-textfield-input");
		for (var i = 0; i < els.length; i++) {
			els[i].removeEventListener("change", this.resetStyle)
		}
	}

	// registerRefresher registers a listener on an input that dynamically sets the value of another input.
	// This listener ensures that the input being set programmatically will have correct styles.
	this.registerRefresher = function(toListenID, toRefreshID) {
		var r = document.getElementById(toRefreshID)
		document.getElementById(toListenID).addEventListener("input", this.resetStyle.bind(r))
	}

}

export default DynamicTextFields;
