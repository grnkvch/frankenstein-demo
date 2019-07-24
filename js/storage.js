var STORAGE_KEY = "frankenstein";

export default {
  fetch: function() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    var event = new CustomEvent("store-update", { detail: { todos } });
    document.dispatchEvent(event);
  },
  generateid: function(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
};
