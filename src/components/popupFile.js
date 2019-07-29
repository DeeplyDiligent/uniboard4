import React, { Component } from "react";
import tingle from "tingle.js";
import "tingle.js/src/tingle.css";
import $ from 'jquery';
/*global chrome*/
class Popup {
  constructor() {}
  newModal() {
    this.modal =  new tingle.modal({
      footer: true,
      stickyFooter: true,
      closeMethods: ["overlay", "button", "escape"],
      closeLabel: "Close"
    });
    this.modal.setContent(`Loading`);
    this.modal.open();
  }
  newWebsitePopup(webAddress, type) {
    this.newModal();
    $.ajax({
      url: webAddress,
      context: document.body
    }).done((dataBack) => {
        this.extractRelevantHtml(dataBack, type)
    });
  }

  extractRelevantHtml = (html, type) => {
    switch(type){
        case "Folder":
            html =  $(html).find("#region-main").html()
            this.showPopup(html)
            break
    }
  }
  
  showPopup = (html) => {
    this.modal.setContent(`<iframe class="w-full h-128" srcdoc='${html}' />`);
    this.modal.addFooterBtn("Close", "tingle-btn tingle-btn--primary", function() {
      this.modal.close();
    });
    this.modal.addFooterBtn(
      "Open in New Tab",
      "tingle-btn tingle-btn--primary",
      function() {
        this.modal.close();
      }
    );
  }
}
const popup = new Popup();
export default popup;
