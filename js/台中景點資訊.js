

new Vue({
   el:"#app",
   data () {
      return {
        info: null,
        infop: null,
        nowarea:"東區"
      }
    },
   methods: {
      listA(e){
         this.nowarea =e.target.value

         
     }
   },
   mounted () {
    axios
    .get('https://jiajia0123.github.io/mywork/api.json')
    .then(response => (this.info = response.data))
    .catch(function (error) { // 请求失败处理
      console.log(error);
    });
    
    
    axios
    .get('https://jiajia0123.github.io/mywork/api2.json')
    .then(response2 => (this.infop = response2.data[10].districts))
    .catch(function (error) { // 请求失败处理
      console.log(error);
    });
          

    }
})

