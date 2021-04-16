import axios from "axios";
export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject("AAxios_POST", txt2 => console.log("你好嗎"+txt2));
  inject("AAxios", txt => axios.get(txt));
};
