<template>
  <div id="app">
    <div class="wrapper" v-show="!isPrint">
      <div class="menu">
        <div class="search-bar">
          <input class="input-word" v-model="queryWord" placeholder="단어를 입력하세요" @keyup.enter="submit">
          <div v-on:click="submit">
            <svg fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon-search">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </div>
        </div>
        
        <div class="action-bar">
          <!--<div class="action sort">-->
          <!--  <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">-->
          <!--    <path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm.75.75h22.5v22.5H.75z" fill="none"/>-->
          <!--    <path d="M14.94 4.66h-4.72l2.36-2.36zm-4.69 14.71h4.66l-2.33 2.33zM6.1 6.27L1.6 17.73h1.84l.92-2.45h5.11l.92 2.45h1.84L7.74 6.27H6.1zm-1.13 7.37l1.94-5.18 1.94 5.18H4.97zm10.76 2.5h6.12v1.59h-8.53v-1.29l5.92-8.56h-5.88v-1.6h8.3v1.26l-5.93 8.6z"/>-->
          <!--  </svg>-->
          <!--  <p>정렬</p>-->
          <!--</div>-->
          
          <div class="action print" v-on:click="printAll()">
            <svg height="24" viewBox="0 0 24 24" width="24" x="0px" xmlns="http://www.w3.org/2000/svg" >
              <g id="XMLID_1_">
              	<path d="M0,0h24v24H0V0z" fill="none"/>
              	<g id="XMLID_2_">
              		<rect height="2" id="XMLID_3_" width="12" x="4" y="10"/>
              		<rect height="2" id="XMLID_4_" width="12" x="4" y="6"/>
              		<rect height="2" id="XMLID_5_" width="8" x="4" y="14"/>
              		<polygon id="XMLID_6_" points="14,14 14,20 19,17   "/>
              	</g>
              </g>
            </svg>
            <p>문제생성</p>
          </div>
          
          <div class="action share" v-on:click="save()">

            <svg  height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
            </svg>
            
            <p>저장하기</p>
          </div>
          
          <!--<div class="action move">-->
          <!--  <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">-->
          <!--    <path d="M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z"/>-->
          <!--    <path d="M0 0h24v24H0V0z" fill="none"/>-->
          <!--  </svg>-->
          <!--  <p>이동</p>-->
          <!--</div>-->
          
          <!--<div class="action delete">-->
          <!--  <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">-->
          <!--    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>-->
          <!--    <path d="M0 0h24v24H0z" fill="none"/>-->
          <!--  </svg>-->
          <!--  <p>삭제</p>-->
          <!--</div>-->
        </div>
      </div>
      
      <transition name="fade">
        <div v-show="isError" v-on:click="isError = false" class="error-message">
          <svg fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" class="error">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          </svg>
          {{errMsg}}
          <svg fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" class="error-close">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
          </div>
      </transition>
      
      <transition name="fade">
        <div class="modal" v-show="saved">
          <p id="copy-area">{{savedURL}}</p>
          <div class="flex-container">
            <div class="action btn-copy" v-on:click="copy()">
              <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
              <p>복사하기</p>
            </div>
            <div class=" action btn-close" v-on:click="saved = false"><svg fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" class="error-close">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
              <p>닫기</p>
            </div>
            
          </div>
        </div>
      </transition>
      
      
      <div class="word-wrapper">
        <ul class="word-container">
          <li v-for="w in wordList" class="word-elem" v-bind:key="w.word" v-bind:class="{fetching: w.fetching}" v-on:click="remove(w)">
            {{ w.word }}
          </li>
        </ul>
      </div>
      
      
      
      
      
    </div>
    <div v-if="isPrint">
      <div v-on:click="isPrint = false" class="close-print">
        <svg fill="#FFC107" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" class="error-close">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>  
      </div>
      <print-page v-bind:probsMarkup="probsMarkup"></print-page>
    </div>
    <div class="footer" v-show="!isPrint">
        &copy; COPYRIGHT 2018 <a href="https://saeh.io">SAEH.IO</a>
    </div>
    
    
  </div>
  
</template>

<script>
  import PrintPage from './components/PrintPage.vue';

  export default {
    name: 'app',
    components: {
      'print-page': PrintPage
    },
    data() {
      return {
        wordList: [],
        queryWord: "",
        errMsg: "",
        isError: false,
        isPrint: false,
        probsMarkup: "",
        fetching: 0,
        savedURL: "",
        saved: false
      };
    },
    methods: {
      submit: function() {
        if (this.queryWord === "") return;
        const baseURI = 'https://us-central1-saeh-io.cloudfunctions.net/engdic?word=';
        let word = this.queryWord.toLowerCase();
        let query = baseURI + word;
        this.queryWord = "";
        if (word === "" || word.replace(/[a-z]/g, "") !== "") {
          this.searchError(word, true);
        }
        else {
          let temp = { word: word, fetching: true };
          this.wordList.push(temp);
          this.fetching.add(temp);
          this.$http.get(query)
            .then((result) => {
              if (result.data[1] === "400") {
                this.removeFailed(this.wordList, temp);
                this.searchError(result.data[0], false);
              }
              else {
                temp.fetching = false;
                this.swapProps(temp, result.data);
              }
              this.fetching.delete(temp);
            });
        }
      },
      searchError: function(word, isFormatProblem, arrRef) {
        this.isError = true;
        if (isFormatProblem) {
          this.errMsg = "단어를 다시 확인해주세요 \'" + word + "\'";
          setTimeout(() => { this.isError = false; }, 2000);
        }
        else {
          this.errMsg = "지원하지 않는 단어입니다 \'" + word + "\'";
          setTimeout(() => { this.isError = false; }, 2000);
        }
      },
      swapProps: function(A, B) {
        A.word = B.word;
        A.meaning = B.meaning;
        A.examplesKR = B.examplesKR;
        A.examplesEN = B.examplesEN;
        A.type = B.type;
      },
      removeFailed: function(arr, A) {
        let index = arr.indexOf(A);
        if (index > -1) {
          arr.splice(index, 1);
        }
      },
      printAll: function() {
        if (this.fetching.size != 0) {
          return;
        }
        if (this.wordList.length >= 4) {
          this.probsMarkup = this.print(this.wordList);
          this.isPrint = true;
        }
      },
      remove: function(word) {
        if (!word.fetching) {
          this.removeFailed(this.wordList, word);
        }
      },
      save: function() {
        if (this.fetching.size != 0) {
          return;
        }
        this.savedURL = "저장중입니다";
        this.saved = true;
        this.$http.post('https://us-central1-saeh-io.cloudfunctions.net/save', {
            words: this.wordList.map(x => x.word)
          })
          .then(function(response) {
            this.savedURL = "https://saeh.io/words/#" + response.data;

          }.bind(this));
      },
      copy: function() {
        this.copyTextToClipboard(this.savedURL);
        this.saved = false;
      },
      copyTextToClipboard: function(text) {
        var textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';

        textArea.style.padding = 0;

        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';

        textArea.style.background = 'transparent';


        textArea.value = text;

        document.body.appendChild(textArea);

        textArea.select();

        try {
          document.execCommand('copy');
        }
        catch (err) {
          console.log(err);
        }

        document.body.removeChild(textArea);
      }

    },
    created() {
      this.fetching = new Set();

      let savedURL = this.loadSaved();
      if (savedURL) {
        this.$http.get("https://us-central1-saeh-io.cloudfunctions.net/load?ref=" + savedURL).then(
          (result) => {
            let wordList = result.data.words;
            for (let i = 0; i < wordList.length; i++) {
              this.queryWord = wordList[i];
              this.submit();
            }
          }
        );
      }
      else {
        let wordList = ["apple", "banana", "grape", "strawberry", "blackberry", "cherry", "mango", "orange", "kiwi"];
        for (let i = 0; i < wordList.length; i++) {
          this.queryWord = wordList[i];
          this.submit();
        }
      }
    }
  };
</script>
<!--270*48-->
<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .error-message {
    position: absolute;
    display: flex;
    align-items: center;
    background: #F44336;
    color: white;
    padding: 0 20px 0 20px;
    cursor: pointer;
    margin-top: 20px;
    height: 60px;
    width: 100%;
    left: 0px;
    top: 67px;
  }

  .wrapper {
    position: relative;
    max-width: 700px;
    margin: 250px auto 0 auto;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    /*padding: 20px;*/
    background: #FFF;
  }

  svg.error {
    margin-right: 10px;
  }

  svg.error-close {
    margin-left: auto;
  }

  .icon-search {
    color: #FFA000;
    height: 2rem;
    width: 2rem;
  }


  .menu {
    display: flex;
    flex-wrap: nowrap;
    background: #40C4FF;
    padding: 20px;
  }

  .search-bar {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    flex-grow: 1;
    position: relative;
  }

  .search-bar>div:nth-child(1) {}

  .search-bar>div:nth-child(2) {
    width: 0px;
    position: relative;
    height: 2rem;
    cursor: pointer;
    right: 40px;
  }

  .input-word {
    display: block;
    margin: 0;
    padding: 0.8rem 1.6rem;
    color: #FFF;
    font-weight: 500;
    width: 100%;
    font-family: inherit;
    font-size: 16px;
    line-height: 1.8;
    background: #00B0FF;
    border: none;
    /*border-radius: 0.4rem;*/
    -webkit-transition: -webkit-box-shadow 300ms;
    transition: -webkit-box-shadow 300ms;
    transition: box-shadow 300ms;
    transition: box-shadow 300ms, -webkit-box-shadow 300ms;
  }

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: white;
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
    color: white;
  }

  :-ms-input-placeholder {
    /* IE 10+ */
    color: white;
  }

  :-moz-placeholder {
    /* Firefox 18- */
    color: white;
  }

  .input-word:focus {
    outline: none;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }


  .action-bar {
    display: flex;
    flex-wrap: nowrap;
  }

  .action {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    margin-left: 10px;
    background: #00B0FF;
    cursor: pointer;
  }

  .action>svg {
    fill: white;
  }

  .action:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    background: #212121;
  }

  .action>p {
    margin: 0;
    font-weight: 300;
    color: white;
    font-size: 0.8rem;
  }


  .word-wrapper {
    min-height: 250px;
    /*margin-top: 26px;*/
    padding: 20px;
  }

  /*.word-wrapper::-webkit-scrollbar-track {*/

  /*  background-color: #FFD54F;*/

  /*}*/

  .word-wrapper::-webkit-scrollbar {
    width: 0px;
  }

  /*.word-wrapper::-webkit-scrollbar-thumb {*/

  /*  background-color: #555;*/

  /*}*/

  .word-container {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
  }

  .word-elem {
    font-size: 16px;
    list-style: none;
    margin: 0 10px 10px 0;
    padding: 10px;
    /*background: #2196f3;*/
    /*color: white;*/
    background: #B3E5FC;
    color: #01579B;
    font-weight: 400;
    letter-spacing: 1px;
    cursor: pointer;
  }

  .fetching {
    background: #BBB !important;
  }

  .word-elem:hover {
    background: #B0BEC5;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }

  .close-print {
    display: flex;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 50px auto 0 auto;
    cursor: pointer;
    background: #424242;
  }

  .close-print>svg {
    margin: 0 auto;
  }

  .close-print:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    background: #212121;
  }

  .flex-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }


  /*.btn-close {*/

  /*  color: white;*/

  /*  padding: 5px;*/

  /*  border: 1px solid #EEEEEE;*/

  /*  cursor: pointer;*/

  /*  margin-left: 20px;*/

  /*}*/

  /*.btn-copy {*/

  /*  padding: 5px;*/

  /*  border: 1px solid #EEEEEE;*/

  /*  cursor: pointer;*/

  /*  margin-left: 20px;*/

  /*}*/

  .btn-close>svg,
  .btn-copy>svg {
    margin: 0 auto;
  }


  .modal {
    padding: 10px;
    color: white;
    position: absolute;
    text-align: center;
    width: 80%;
    top: 50%;
    transform: translateY(-60px);
    left: 10%;
    padding: 10px 10px 10px 10px;
    margin: 0 auto;
    background: white;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }

  .modal>p {
    border: 1px solid #212121;
    margin: 14px auto;
    width: max-content;
    color: black;
    padding: 10px;
  }

  .footer {
    padding: 20px;
    
    color: #01579B;
    text-align: center;
  }

  .footer>a {
    text-decoration: none;
    font-weight: 600;
    color: #01579B;
  }

  @media screen and (max-width: 599px) {
    .body {
      position: relative;
    }

    .wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 92%;
      margin: 0;
    }

    .footer {
      position: absolute;
      top: 92%;
      left: 0;
      width: 100%;
      height: 8%;
      margin: 0;
      background: #B3E5FC;
    }

  }
</style>
