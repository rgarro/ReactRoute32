import React, { Component } from "react";

/**
 * ReactRoute32  --## Simple Anchor Location Router ##--
 * executes callback on location hash change that matches declared routes.
 * Intenteded to be use as a piece on JavaScript MVC Apps
 *
 * @author Rolando <rgarro@gmail.com>
 */
class ReactRoute32 extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    //true executes routes
    this.settings = {
      //true executes routes from location hash changes, false from clicks
      automatic: true,
      //selector from which we listen clicks when automatic false allow re-execution of same route
      selector: ".nav",
      //manual drive is click based so needs an intentional delay to proper update latest hash
      manualShiftChangeTime: 100
    };
    this.routes = [];

    this.activeHash = "";

    this.lastHash = "";

    //has variables
    this.hasVariables = false;
  }

  init() {
    //intentionally left blank
  }

  hasVariable() {
    if (window.location.hash.split("#").length > 2) {
      this.hasVariables = true;
      return true;
    } else {
      this.hasVariables = false;
      return false;
    }
  }

  //verifies is string is a valid location hash
  isValidHash(hashStr) {
    var testHashRegExp = new RegExp("^#/([0-9a-zA-Z])");
    return testHashRegExp.test(hashStr);
  }

  isValidCallbackfunc(callbackfunc) {
    if (typeof callbackfunc == "function") {
      return true;
    } else {
      return false;
    }
  }

  getHashValue(evt) {
    //return window.location.hash;
    if (typeof evt.newURL != "undefined") {
      return "#" + evt.newURL.split("#")[1];
    } else {
      return this.activeHashFromLocation();
    }
  }

  activeHashFromLocation() {
    return "#" + window.location.hash.split("#")[1];
  }

  hasVariables() {
    if (window.location.hash.split("#").length > 2) {
      this.hasVariables = true;
      return true;
    } else {
      this.hasVariables = false;
      return false;
    }
  }

  isValidVariableString(varstr) {
    return /^\?([0-9a-zA-Z]+=[0-9a-zA-Z])/.test(varstr);
  }

  getVariables() {
    var varstr = "";
    varstr = window.location.hash.split("#")[2];
    var retObj = new Object();
    if (this.isValidVariableString(varstr)) {
      var tmpstr = varstr.slice(1);
      var p = tmpstr.split("&");
      for (var i = 0; i < p.length; i++) {
        var h = p[i].split("=");
        var cmdstr = "retObj." + h[0] + " = '" + h[1] + "';";
        eval(cmdstr);
      }
      return retObj;
    } else {
      alert("Correct variable format is #?name=value sepaired by &.");
    }
  }

  executeCurrent() {
    var pos = 0;
    for (var i = 0; i < this.routes.length; i++) {
      var value = this.routes[pos];
      if (value.hash == this.activeHash) {
        if (this.hasVariable()) {
          var vars = this.getVariables();
          value.callback(vars);
        } else {
          value.callback();
        }
      }
      pos = pos + 1;
    }
  }

  manualDrive() {
    /*$(settings.selector).live("click", function () {
      setTimeout(function () {
        activeHash = methods.activeHashFromLocation();
        methods.executeCurrent();
        }, settings.manualShiftChangeTime);
    });*/
  }

  //variables can be passed after a second # singn on the hash as a query string
  getVariables() {}

  //adds routes
  add(hashRegexpStr, callbackfunc) {
    if (
      this.isValidHash(hashRegexpStr) &&
      this.isValidCallbackfunc(callbackfunc)
    ) {
      this.routes.push({ hash: hashRegexpStr, callback: callbackfunc });
    } else {
      alert(
        "route should be a valid hash string #/example/, callback function pair."
      );
    }
  }

  updateHashExecute() {
    window.onhashchange = function(evt) {
      this.activeHash = this.getHashValue(evt);
      this.executeCurrent();
    }.bind(this);
  }

  //starts driving
  drive() {
    if (this.routes.length > 0) {
      if (this.settings.automatic) {
        //start listening location changes ..
        this.updateHashExecute();
      } else {
        //listen selector click
        this.manualDrive();
      }
      this.activeHash = this.activeHashFromLocation();
      if (this.activeHash.length > 1) {
        //initial verification
        this.executeCurrent();
      }
    } else {
      alert("use add method to add routes");
    }
  }

  again() {
    this.executeCurrent();
  }
}

export default ReactRoute32;
