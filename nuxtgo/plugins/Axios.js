import axios from "axios";

export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject("Axios", {
    Get(txt) {
      axios.get(txt);
    }
  });
};
