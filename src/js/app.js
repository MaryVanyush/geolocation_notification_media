import WidgetChat from "../components/WidgetChat";

const messagesBox = document.querySelector(".messages-box");
const messageInput = document.querySelector(".message-input");
const widgetChat = new WidgetChat(messagesBox, messageInput);
