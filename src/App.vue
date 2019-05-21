<template>
<div id="app">
  <div class="hidebox">
    <img class="logo" src="https://sevenfigurepublishing.com/wp-content/themes/sevenfigurepublishing/img/logo.svg?v=2.0"></div>
  <div class="col" v-if="!username">
    <h3>
      You can't chat without a name. What's your name?
    </h3>
    <input type="text" placeholder="Name" v-on:keyup.enter="updateUsername">
  </div>
  <div v-else>
    <div class="messageInput">
      <div class="user">
        <h4 style="text-align:center;text-transform:uppercase;">
          From: {{username}}
        </h4>
      </div>
      <textarea id="" cols="60" rows="5" placeholder="New Message" v-on:keyup.enter="sendMessage">
  </textarea>
    </div>
    <div class="col">
      <h3 style="text-align:center;width:100%;margin-top:-20px;">
        To contribute to chat, please write a <br />message and press enter!
      </h3>
    </div>
    <div class="chatbox" id="container">
      <div class="message" ref='messageDisplay' v-for="message in messages">
        <div class="user-name">
          <h3><strong>{{message.username}}</strong></h3>
        </div>
        <div class="quote-bubble">
          <p>{{message.text}}</p>
        </div>
        <div class="user-name-mobile">
          <h3><strong>{{message.username}}</strong></h3>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</template>
<script>
import fire from './fire'
export default {
  name: 'app',
  data() {
    return {
      username: '',
      messages: []
    }
  },
  methods: {
    updateUsername(e) {
      e.preventDefault();
      if (e.target.value) {
        this.username = e.target.value;
      }
    },
    sendMessage(e) {
      e.preventDefault();
      if (e.target.value) {
        const message = {
          username: this.username,
          text: e.target.value
        }
        fire.database().ref('messages').push(message);
        e.target.value = ''
        this.scrollToEnd();
      }
    },
    scrollToEnd: function() {
      var container = this.$el.querySelector("#container");
      container.scrollTop = container.scrollHeight;
    }
  },
  mounted() {
    let vm = this;
    const itemsRef = fire.database().ref('messages');
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let messages = [];
      Object.keys(data).forEach(key => {
        messages.push({
          id: key,
          username: data[key].username,
          text: data[key].text
        });
      });
      vm.messages = messages;
    })
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
}

.messageInput {
  width: 100%;
  position: fixed;
  z-index: 1000;
  display: flex;
  padding-left: 25px;
  padding-right: 25px;
  max-width: 1425px;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  border-top: 1px solid #000;
}

.message {
  display: flex;
}

.user {
  background: #5aa26c;
  width: 25%;
}

.chatbox {
  display: block;
  position: relative;
  height: 1000px;
  width: 100%;
  max-width: 1150px;
  margin: 0 auto;
  overflow-y: scroll;
  padding-bottom: 250px;
}

.col {
  font-size: 20px;
  text-align: center;
  margin: 45px auto;
  display: block;
  max-width: 1025px;
  width: 100%;
  border-radius: 3px;
  position: relative;
  top: 10px;
  z-index: 1000;
}

.card {
  border-radius: 3px;
  background: #ECEFF1;
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  padding-top: 10px;
  padding-bottom: 30px;
  border-radius: 3px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  display: block;
  margin-top: 25px;
  border-radius: 5px;
}

.card p {
  text-align: center;
  width: 100%;
  margin: 0 auto;
}

.card:hover {
  background: #B0BEC5;
  -webkit-box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.card-2 {
  border-radius: 3px;
  background: #B0BEC5;
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  padding-top: 10px;
  padding-bottom: 20px;
  border-radius: 3px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 80%;
  display: flex;
  word-break: normal;
  margin: 20px auto;
}

p {
  display: block;
  margin: 0 auto;
}

.message:nth-child(odd)>.user-name {
  position: absolute;
  top: 20px;
  right: -180px;
  width: 135px;
}

.message:nth-child(even)>.user-name {
  position: absolute;
  top: 20px;
  left: -180px;
  width: 135px;
}

.message:nth-child(odd) {
  position: relative;
  background: #ECEFF1;
  border-radius: .4em;
  width: 450px;
  display: flex;
  word-break: normal;
  padding: 30px 50px;
  margin: 20px auto;
  text-align: right !important;
}

.message:nth-child(odd):after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 2.031em solid transparent;
  border-left-color: #ECEFF1;
  border-right: 0;
  border-bottom: 0;
  margin-top: -1.016em;
  margin-right: -2.031em;
}

.message:nth-child(even) {
  position: relative;
  background: #B0BEC5;
  border-radius: .4em;
  width: 450px;
  display: flex;
  word-break: normal;
  padding: 30px 50px;
  margin: 10px auto;
}

.message:nth-child(even):after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 2.031em solid transparent;
  border-right-color: #B0BEC5;
  border-left: 0;
  border-bottom: 0;
  margin-top: -1.016em;
  margin-left: -2.031em;
}




.card-2 h3 {
  text-align: center;
  width: 100%;
  background: none;
  box-shadow: none;
  padding: 0;
  font-size: 20px;
  text-transform: uppercase;
  color: #000;
  word-break: normal;
}

.card-2 p {
  text-align: center;
  width: 100%;
  margin: 0 auto;
}

.card-2:hover {
  background: #ECEFF1;
  -webkit-box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.user-name-mobile>h3 {
  display: none;
}


p.messages {
  background: #5aa26c;
  color: #fff;
  padding-top: 30px;
  padding-bottom: 30px;
  border-radius: 3px;
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  display: block;
  text-align: center;
  font-size: 30px;
  z-index: 999;
  font-weight: bold;
}

h3 {
  color: #000;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 3px;
  text-align: center;
  width: 100%;
  display: block;
}

h4 {
  font-size: 20px;
  color: #000;
  padding: 10px;
}

.logo {
  max-width: 540px;
  width: 100%;
  display: block;
  margin: 0 auto;
}

p {
  font-size: 20px;
}

textarea {
  height: 50px;
}

input {
  font-size: 20px;
  text-align: center;
  padding: 25px;
  letter-spacing: 2px;
  margin: 0 auto;
  display: block;
  width: 100%;
  max-width: 400px;
  border: 1px solid #000;
}

textarea {
  font-size: 20px;
  text-align: center;
  padding: 25px;
  letter-spacing: 2px;
  margin: 0 auto;
  display: block;
  width: 75%;
  border: 0;
}

@media only screen and (max-width: 1025px) {
  .card-2:last-child {
    position: absolute;
    top: 120px;
    margin: 0 auto;
    background: #ECEFF1;
    -webkit-box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    color: #000;
  }

  .card-2 h3 {
    text-align: center;
    width: 100%;
    background: none;
    box-shadow: none;
    padding: 0;
    font-size: 13px;
    text-transform: uppercase;
    color: #000;
    word-break: normal;
  }

  p {
    font-size: 13px;
  }

  h3 {
    font-size: 13px;
  }

  input,
  textarea {
    font-size: 13px;
  }

  p.messages {
    background: #5aa26c;
    color: #fff;
    padding-top: 30px;
    padding-bottom: 30px;
    border-radius: 3px;
    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    display: block;
    text-align: center;
    font-size: 13px;
    z-index: 999;
    font-weight: bold;
  }

  h4 {
    font-size: 13px;
    color: #000;
    padding: 10px;
  }
}

@media only screen and (max-width: 800px) {
  #app {
    padding: 0px;
  }

  textarea {
    width: 50%;
  }

  .user {
    width: 50%;
  }

  #container {
    max-width: 450px;
  }

  .message:nth-child(odd) {
    position: relative;
    background: #ECEFF1;
    border-radius: .4em;
    width: 200px;
    display: block;
    word-break: break-all;
    padding: 30px 20px;
    margin: 60px auto;
    text-align: right !important;
  }

  .message:nth-child(even) {
    position: relative;
    background: #B0BEC5;
    border-radius: .4em;
    width: 200px;
    display: block;
    word-break: break-all;
    padding: 30px 20px;
    margin: 60px auto;
  }

  .message:nth-child(odd)>.user-name {
    position: relative;
    display: none;
  }

  .message:nth-child(even)>.user-name {
    display: none;
  }

  .user-name-mobile {
    display: block;
    position: absolute;
    bottom: -70px;
    word-break: break-all;
    width: 125px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .user-name-mobile>h3 {
    display: block;
  }
}
</style>
