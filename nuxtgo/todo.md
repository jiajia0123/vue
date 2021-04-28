# TODO LIST

- [x] ~~_使用 style scoped_~~ [2021-04-12]

- [x] ~~_使用 scss_~~ [2021-04-12]

- [x] ~~_id 命名，CSS 選擇器_~~ [2021-04-12]

- [x] ~~_v-for 加 key_~~ [2021-04-13]

- [x] ~~_v-for、v-if 不要同時使用_~~ [2021-04-13]

- [x] ~~_使用 json-server API 服務 每筆資料選擇時就抓一次 API_~~ [2021-04-13]

- [x] ~~_參考 https://typescript.nuxtjs.org/zh-Hant/cookbook/components 將專案改成 Class API 的寫法，請安裝 nuxt-property-decorator 取代 vue-property-decorator_~~ [2021-04-16]

- [x] ~~_資料改成呼叫 json-server API 取得_~~ [2021-04-19]

- [x] ~~_下拉式選單 v-model 綁定資料 ID_~~ [2021-04-16]

* [x] ~~_新增景點增刪修功能_~~ [2021-04-19]

* [x] ~~_學習 git flow 流程，並使用該流程開發專案_~~ [2021-04-23]

- [x] ~~_[feature/nuxt-axios] 將專案內的 axios 改成使用 https://axios.nuxtjs.org/_~~ [2021-04-20]

- [x] ~~_[feature/vue-loading-overlay] 新增等待 API 時的讀取畫面，使用 https://github.com/ankurk91/vue-loading-overlay 套件，樣式自訂_~~ [2021-04-23]

- [x] ~~_[feature/vee-validate] 新增表單驗證功能，使用 https://vee-validate.logaretm.com/v3 套件，驗證規則自訂，輸入文字時及按提交鈕時驗證，錯誤提示顯示在該輸入框下方。_~~ [2021-04-22]

- [x] ~~_[feature/component] 將新增表單及各個卡片封裝成 component 並在 index.vue 引入使用。_~~ [2021-04-21]

- [X] ~~*[feature/env] 研究 .env 檔，新增 API_URL=https://localhost:7000/*~~ [2021-04-26]

- [X] ~~*[feature/axios-instance] 新增一個 axios 實例，baseUrl 為 .vue 檔的 API_URL，並在專案內使用新的 axios 實例呼叫 API*~~ [2021-04-26]

- [X] ~~*[feature/vue-notification] http://vue-notification.yev.io/錯誤提示*~~ [2021-04-26]

- [X] ~~*將 component 內的 props 類別宣告方式 ?: 都改成 !:*~~ [2021-04-27]

- [X] ~~*參考 https://i18n.nuxtjs.org/ 及 https://kazupon.github.io/vue-i18n/ 將專案改成中英模式，並可切換語系*~~ [2021-04-28]

- [X] ~~*在專案內新增 .env.example 檔案作為 .env 的範本*~~ [2021-04-27]

- [X] ~~*將 loading 變成全螢幕方式使用，並將 vue-loading-overlay 封裝成 plugin，在每個 component 內可以直接使用*~~ [2021-04-27]

- [X] ~~*所有呼叫 API 的行為都需要顯示 loading 畫面*~~ [2021-04-27]

- [X] ~~*將所有 interface 或 type 型別放進專案根目錄內的 @types 資料夾內集中管理*~~ [2021-04-27]

- [X] ~~*專案內所有變數及方法名稱改成 "小駝峰式命名法"*~~ [2021-04-27]

- [X] ~~*將 vee-validate 封裝成 plugin，並統一管理驗證規則*~~ [2021-04-27]

- [X] ~~*代碼整理，並移除不必要的檔案及代碼*~~ [2021-04-27]

- [X] ~~*import component 時名稱使用 "大駝峰式命名法"*~~ [2021-04-27]

- [X] ~~*iinterceptors攔截器"*~~ [2021-04-28]




1.iso什麼意思
{
        code: 'zw-tw',
        iso: 'zw-tw22',
        name: '繁',
      },


2.錯誤
.filter((i) => i.code !== this.$i18n.locale)




3.$tc
{{ $tc('re', 2) }}

4.interfcre type差別


5.錯誤 成功 提示訊息
