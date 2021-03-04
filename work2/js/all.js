
//待辦清單
new Vue({
    el:'#todo',
    data:{
        list:"",
        arr:[]
    },
    methods:{
        add(){
            if(this.list.trim()  !== ""){
                this.arr.push(this.list);
                const string=JSON.stringify(this.arr);
                localStorage.setItem("dolistss",string)
                this.list=''
            }
           
        }, 
        removeall(){
            this.arr=[];
            const string=JSON.stringify(this.arr);
            localStorage.setItem("dolistss",string)
        },
        remove(idx){
            this.arr.splice(idx,1);
            const string=JSON.stringify(this.arr);
            localStorage.setItem("dolistss",string)
        }
    },
    mounted () {
        if(JSON.parse(localStorage.getItem('dolistss')) !== null){
            this.arr =JSON.parse(localStorage.getItem('dolistss'))
        }
        
    }
})








// https://vue-lessons-api.herokuapp.com/
// POST / 上傳圖片
// GET /:id 取得課程
// PUT /:id 更新課程
// POST /login 測試使用者登入
// GET /exists/:username 取得使用者是否存在


const API='https://vue-lessons-api.herokuapp.com'

Vue.component('login-form',{
    data(){
        return{
            username:'',
            userpss:'',
            loginer:'',
            error:'',
            stat:false,
        }
    },
    watch:{
        username(){
            this.error=''
        },
        userpss(){
            this.error=''
        }
    },
    methods: {
        send(){
            this.stat = true
            axios.post(`${API}/login`,{
                username:this.username,
                password:this.userpss
            })
            .then(responese=>{
                this.stat = false
                if(responese.data.success){
                    this.loginer = responese.data.name
                }else{
                    this.error="你的帳號密碼錯誤"
                }
               console.log(responese.data); 
            })
            console.log(123);
        }
    },
    template:`

    <div>
    <h1 v-if="loginer">恭喜{{loginer}}登入成功</h1>
    <form @submit.prevent="send" v-else>
    帳號<input type="text" v-model="username" :disabled="stat"><br>
    密碼<input type="password" v-model="userpss" :disabled="stat"><br>
    <button type="submit" :disabled="stat">登入</button>
    <p v-if='error'>{{error}}</p>
    </form>
    </div> 


    
    `
})



Vue.component('login-check',{
    data(){
        return{
            name:'',
            exit:''

        }
    },
    watch:{
        name(){
            this.newact()
        }
    },
    computed:{
        errtxx(){
            if(this.exit === true){
                return "✘這帳號有人使用過了哦!"
            }else if(this.exit === false){
                return "✔很好，這帳號沒有人使用過"
            }
            
        }
    },
    methods: {
        send2(){
           
            axios.get(`${API}/exists/${this.name}`)
            .then(responese=>{
               
                this.exit =responese.data.exists
                
            })

        }
    },
    template:`
    <div>註冊帳號
    <input type="text" v-model="name"><br>
   {{errtxx}}
   
</div>
    `,
    created(){ //創建時使用
         this.newact=_.debounce(this.send2,200)
    }
})



//  created(){
// this.新事件名稱=_.debounce(this.舊事件名稱,秒數) //可以延遲觸發動作 搭配watch
// }




new Vue({
    el:"#app17", 
    data:{
       
    }
}) 