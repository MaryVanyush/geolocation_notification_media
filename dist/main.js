/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/isValidCoordinates.js
function isValidCoordinates(input) {
  const regex = /^(\[)?(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)(\])?$/;
  const match = input.match(regex);
  if (!match) {
    return {
      error: "Некорректный формат координат"
    };
  }
  const latitude = parseFloat(match[2]);
  const longitude = parseFloat(match[4]);
  return {
    latitude,
    longitude
  };
}
;// CONCATENATED MODULE: ./src/js/formatTime.js
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
;// CONCATENATED MODULE: ./src/components/WidgetChat.js


class WidgetChat {
  constructor(messagesBox, messageInput) {
    this.messagesBox = messagesBox;
    this.messageInput = messageInput;
    this.messages = [];
    this.blob = null;
    this.recordAudioBtn = null;
    this.recordVideoBtn = null;
    this.recordSend = null;
    this.recordCancel = null;
    this.videoWindow = null;
    this.timer = null;
    this.onEventInput = this.onEventInput.bind(this);
    this.init = this.init.bind(this);
    this.showModal = this.showModal.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.toGeolocate = this.toGeolocate.bind(this);
    this.toRecordVideo = this.toRecordVideo.bind(this);
    this.toRecordAudio = this.toRecordAudio.bind(this);
    this.init();
    this.onEventInput();
  }
  init() {
    const inputBox = this.messageInput.closest(".message-input-box");
    this.recordAudioBtn = inputBox.querySelector(".record-audio");
    this.recordVideoBtn = inputBox.querySelector(".record-video");
    this.recordSend = inputBox.querySelector(".record-send");
    this.recordCancel = inputBox.querySelector(".record-cancel");
    this.videoWindow = this.messagesBox.querySelector(".video-window");
    this.timer = inputBox.querySelector(".timer");
  }
  onEventInput() {
    this.messageInput.addEventListener("keyup", event => {
      event.preventDefault();
      if (event.code !== "Enter") return;
      if (!this.messageInput.value) return;
      this.toGeolocate("text");
    });
    this.recordVideoBtn.addEventListener("click", this.toRecordVideo);
    this.recordAudioBtn.addEventListener("click", this.toRecordAudio);
  }
  async toRecordAudio() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      this.recordAudioBtn.classList.add("hide");
      this.recordVideoBtn.classList.add("hide");
      this.recordSend.classList.remove("hide");
      this.recordCancel.classList.remove("hide");
      this.timer.classList.remove("hide");
      let seconds = 0;
      const timer = setInterval(() => {
        seconds++;
        this.timer.textContent = formatTime(seconds);
      }, 1000);
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.start();
      recorder.addEventListener("dataavailable", event => {
        chunks.push(event.data);
      });
      recorder.addEventListener("stop", () => {
        this.blob = new Blob(chunks);
      });
      const sendRecord = () => {
        recorder.stop();
        clearInterval(timer);
        this.timer.textContent = formatTime(0);
        stream.getTracks().forEach(trac => trac.stop());
        this.toGeolocate("audio");
        this.recordAudioBtn.classList.remove("hide");
        this.recordVideoBtn.classList.remove("hide");
        this.recordSend.classList.add("hide");
        this.recordCancel.classList.add("hide");
        this.timer.classList.add("hide");
        this.recordSend.removeEventListener("click", sendRecord);
      };
      const cancelRecord = () => {
        recorder.stop();
        clearInterval(timer);
        this.timer.textContent = formatTime(0);
        stream.getTracks().forEach(trac => trac.stop());
        this.recordAudioBtn.classList.remove("hide");
        this.recordVideoBtn.classList.remove("hide");
        this.recordSend.classList.add("hide");
        this.recordCancel.classList.add("hide");
        this.timer.classList.add("hide");
        this.recordSend.removeEventListener("click", sendRecord);
        this.recordCancel.removeEventListener("click", cancelRecord);
      };
      this.recordSend.addEventListener("click", sendRecord);
      this.recordCancel.addEventListener("click", cancelRecord);
    } catch (error) {
      this.medalErrorInfo = document.querySelector(".modal-error-media");
      this.medalErrorInfo.classList.remove("hide");
      const medalErrorInfoBtn = this.medalErrorInfo.querySelector(".error-media-button");
      medalErrorInfoBtn.addEventListener("click", () => {
        event.preventDefault();
        this.medalErrorInfo.classList.add("hide");
        return;
      });
    }
  }
  async toRecordVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      this.recordAudioBtn.classList.add("hide");
      this.recordVideoBtn.classList.add("hide");
      this.recordSend.classList.remove("hide");
      this.recordCancel.classList.remove("hide");
      this.timer.classList.remove("hide");
      this.videoWindow.classList.remove("hide");
      this.videoWindow.srcObject = stream;
      this.videoWindow.addEventListener("canplay", () => {
        this.videoWindow.play();
      });
      let seconds = 0;
      const timer = setInterval(() => {
        seconds++;
        this.timer.textContent = formatTime(seconds);
      }, 1000);
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.start();
      recorder.addEventListener("dataavailable", event => {
        chunks.push(event.data);
      });
      recorder.addEventListener("stop", () => {
        this.blob = new Blob(chunks);
      });
      const sendRecord = () => {
        recorder.stop();
        clearInterval(timer);
        this.timer.textContent = formatTime(0);
        stream.getTracks().forEach(trac => trac.stop());
        this.toGeolocate("video");
        this.videoWindow.classList.add("hide");
        this.recordAudioBtn.classList.remove("hide");
        this.recordVideoBtn.classList.remove("hide");
        this.recordSend.classList.add("hide");
        this.recordCancel.classList.add("hide");
        this.timer.classList.add("hide");
        this.recordSend.removeEventListener("click", sendRecord);
      };
      const cancelRecord = () => {
        recorder.stop();
        clearInterval(timer);
        this.timer.textContent = formatTime(0);
        stream.getTracks().forEach(trac => trac.stop());
        this.videoWindow.classList.add("hide");
        this.recordAudioBtn.classList.remove("hide");
        this.recordVideoBtn.classList.remove("hide");
        this.recordSend.classList.add("hide");
        this.recordCancel.classList.add("hide");
        this.timer.classList.add("hide");
        this.recordSend.removeEventListener("click", sendRecord);
        this.recordCancel.removeEventListener("click", cancelRecord);
      };
      this.recordSend.addEventListener("click", sendRecord);
      this.recordCancel.addEventListener("click", cancelRecord);
    } catch (error) {
      this.medalErrorInfo = document.querySelector(".modal-error-media");
      this.medalErrorInfo.classList.remove("hide");
      const medalErrorInfoBtn = this.medalErrorInfo.querySelector(".error-media-button");
      medalErrorInfoBtn.addEventListener("click", () => {
        event.preventDefault();
        this.medalErrorInfo.classList.add("hide");
        return;
      });
    }
  }
  addMessage(data, geoData) {
    const message = this.createMessage(data, geoData);
    this.messagesBox.prepend(message);
  }
  renderMessage(obj) {
    const messageBox = document.createElement("div");
    messageBox.classList = "message";
    const container = document.createElement("div");
    let message = null;
    if (obj.type === "text") {
      message = document.createElement("div");
      message.classList = "message-text";
      message.textContent = obj.value;
    }
    if (obj.type === "audio") {
      message = document.createElement("audio");
      message.classList = "message-audio";
      message.controls = "controls";
      message.src = URL.createObjectURL(obj.value);
    }
    if (obj.type === "video") {
      message = document.createElement("video");
      message.classList = "message-video";
      message.controls = "controls";
      message.src = URL.createObjectURL(obj.value);
    }
    const messageGeo = document.createElement("div");
    messageGeo.classList = "message-geo";
    messageGeo.textContent = obj.geo;
    const iconGeo = document.createElement("img");
    iconGeo.classList = "geo-icon";
    iconGeo.src = "/f7ad747cb80c8253b76c.png";
    messageGeo.appendChild(iconGeo);
    container.appendChild(message);
    container.appendChild(messageGeo);
    const dateMessage = document.createElement("div");
    dateMessage.classList = "message-data";
    dateMessage.textContent = obj.date;
    messageBox.appendChild(container);
    messageBox.appendChild(dateMessage);
    return messageBox;
  }
  createMessage(data, geoData) {
    const messageObj = {};
    if (data.text) {
      messageObj.type = "text";
      messageObj.value = data.text;
    }
    if (data.audio) {
      messageObj.type = "audio";
      messageObj.value = this.blob;
    }
    if (data.video) {
      messageObj.type = "video";
      messageObj.value = this.blob;
    }
    messageObj.geo = geoData;
    messageObj.date = this.getDate();
    this.messages.push(messageObj);
    const message = this.renderMessage(messageObj);
    return message;
  }
  getDate() {
    const formattedDate = new Date().toLocaleString("ru-RU", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false
    }).split(",").join("");
    return formattedDate;
  }
  toGeolocate(typeOfMessage) {
    this.modalGeolocate = document.querySelector(".modal-geolocate");
    const errorMessage = this.modalGeolocate.querySelector(".error");
    if (!errorMessage.classList.contains("hide")) {
      errorMessage.classList.add("hide");
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(data => {
        const {
          latitude,
          longitude
        } = data.coords;
        const geoData = `[${latitude}, ${longitude}]`;
        if (typeOfMessage === "text") {
          this.addMessage({
            text: this.messageInput.value
          }, geoData);
          this.messageInput.value = "";
        }
        if (typeOfMessage === "audio") {
          this.addMessage({
            audio: this.blob
          }, geoData);
        }
        if (typeOfMessage === "video") {
          this.addMessage({
            video: this.blob
          }, geoData);
        }
        return;
      }, err => {
        if (err.message === "User denied Geolocation") ;
        this.showModal(typeOfMessage);
        return;
      }, {
        enableHighAccuracy: true
      });
    }
  }
  showModal(typeOfMessage) {
    const errorMessage = this.modalGeolocate.querySelector(".error");
    this.modalGeolocate.classList.remove("hide");
    const geoData = this.modalGeolocate.querySelector(".geolocate-coordinates");
    const geoSubmit = this.modalGeolocate.querySelector(".submit");
    const cancel = this.modalGeolocate.querySelector(".cancel");
    cancel.addEventListener("click", () => {
      event.preventDefault();
      geoData.value = "";
      this.modalGeolocate.classList.add("hide");
      return;
    });
    const enterGeo = () => {
      event.preventDefault();
      const validCoords = isValidCoordinates(geoData.value);
      if (validCoords.error) {
        errorMessage.classList.remove("hide");
        return;
      }
      if (typeOfMessage === "text") {
        this.addMessage({
          text: this.messageInput.value
        }, `[${validCoords.latitude}, ${validCoords.longitude}]`);
        this.messageInput.value = "";
      }
      if (typeOfMessage === "audio") {
        this.addMessage({
          audio: this.blob
        }, `[${validCoords.latitude}, ${validCoords.longitude}]`);
      }
      if (typeOfMessage === "video") {
        this.addMessage({
          video: this.blob
        }, `[${validCoords.latitude}, ${validCoords.longitude}]`);
      }
      geoData.value = "";
      this.modalGeolocate.classList.add("hide");
      geoSubmit.removeEventListener("click", enterGeo);
      return;
    };
    geoSubmit.addEventListener("click", enterGeo);
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const messagesBox = document.querySelector(".messages-box");
const messageInput = document.querySelector(".message-input");
const widgetChat = new WidgetChat(messagesBox, messageInput);
window.addEventListener("beforeunload", () => {
  widgetChat.messages.forEach(message => {
    if (message.type === "audio" || message.type === "video") {
      const reader = new FileReader();
      reader.readAsArrayBuffer(message.value);
      reader.onload = () => {
        message.value = reader.result;
        console.log(message.value);
        localStorage.setItem("savedMessages", JSON.stringify(widgetChat.messages));
      };
    } else {
      localStorage.setItem("savedMessages", JSON.stringify(widgetChat.messages));
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const savedMessages = JSON.parse(localStorage.getItem("savedMessages"));
  console.log(savedMessages);
  if (savedMessages) {
    savedMessages.forEach(message => {
      if (message.type === "audio" || message.type === "video") {
        console.log(message.value);
        const blob = new Blob([message.value]);
        message.value = URL.createObjectURL(blob);
      }
      widgetChat.messages.push(message);
      widgetChat.messagesBox.prepend(widgetChat.renderMessage(message));
    });
  }
});
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;
//# sourceMappingURL=main.js.map