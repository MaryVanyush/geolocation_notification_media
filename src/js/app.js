import WidgetChat from "../components/WidgetChat";

const messagesBox = document.querySelector(".messages-box");
const messageInput = document.querySelector(".message-input");
const widgetChat = new WidgetChat(messagesBox, messageInput);

window.addEventListener("beforeunload", () => {
  widgetChat.messages.forEach((message) => {
    if (message.type === "audio" || message.type === "video") {
      const reader = new FileReader();
      reader.readAsArrayBuffer(message.value);
      reader.onload = () => {
        message.value = reader.result;
        console.log(message.value);
        localStorage.setItem(
          "savedMessages",
          JSON.stringify(widgetChat.messages),
        );
      };
    } else {
      localStorage.setItem(
        "savedMessages",
        JSON.stringify(widgetChat.messages),
      );
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const savedMessages = JSON.parse(localStorage.getItem("savedMessages"));
  console.log(savedMessages);
  if (savedMessages) {
    savedMessages.forEach((message) => {
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
