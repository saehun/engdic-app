<template>
  <div id="app">
    <input v-model="queryWord" placeholder="SEARCH" @keyup.enter="submit">
    <button v-on:click="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
    <ul>
      <li v-for="w in wordList" v-on:click="select(w)" class="a-word" v-bind:key="w.word">
        {{ w.word }}
      </li>
    </ul>
    <div class="word-detail">
      <h2>{{ selectedWord.word }}</h2>
      <span>{{selectedWord.type}}</span>. <span>{{selectedWord.meaning}}</span>
      <ul>
        <li v-for="(value, index) in selectedWord.examplesEN">
          <p class="exampleEN">{{value}}</p>
          <p class="exampleKR">{{selectedWord.examplesKR[index]}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        wordList: [],
        queryWord: "",
        selectedWord: {
          word: "",
          type: "",
          meaning: "",
          examplesEN: ["", "", "", "", ""],
          examplesKR: ["", "", "", "", ""]
        }
      };
    },
    methods: {
      submit: function() {
        const baseURI = 'https://us-central1-saeh-io.cloudfunctions.net/engdic?word=';
        let query = baseURI + this.queryWord.toLowerCase();
        this.queryWord = "";

        this.$http.get(query)
          .then((result) => {
            if (result.data.type == "nsy") {
              console.log("Not supported yet");
            }
            else {
              console.log(result.data);
              this.wordList.push(result.data);
            }
          });
      },
      select: function(word) {
        console.log(word);
        this.selectedWord = word;
      }
    },
    created() {
      let wordList = ["apple", "banana", "grape", "strawberry", "blackberry", "cherry", "mango", "orange", "kiwi"];
      for (let i = 0; i < wordList.length; i++) {
        this.queryWord = wordList[i];
        this.submit();
      }
    }
  };
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li.a-word {
    display: inline-block;
    margin: 0 10px;
    cursor: pointer;
    padding: 5px;
  }

  li.a-word:hover {
    background: #DDDDDD;
  }

  .word-detail p {
    margin: 1rem 0 0 0;
  }

  p.exampleKR {
    color: #AAAAAA;
    margin: 0 0 1rem 0;
  }

  a {
    color: #42b983;
  }
</style>
