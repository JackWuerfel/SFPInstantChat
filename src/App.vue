<template>
<div id="app">
<div class="hidebox">    <img class="logo" src="https://sevenfigurepublishing.com/wp-content/themes/sevenfigurepublishing/img/logo.svg?v=2.0"></div>
  <div class="col" v-if="!username">

    <h3>
      You can't chat without a name. What's your name?
    </h3>
    <input type="text" placeholder="Name" v-on:keyup.enter="updateUsername">
  </div>
  <div v-else>

    <div class="col">
      <div class="card" style="margin-top:50px;">
        <h3 style="text-align:center;width:100%;margin-top:-20px;">
          To contribute to chat, please write a <br />message and press enter!
        </h3>
        <h4 style="text-align:center;width:100%;text-transform:uppercase;">
          From: {{username}}
        </h4>
        <textarea name="" id="" cols="30" rows="10" placeholder="New Message" v-on:keyup.enter="sendMessage">
      </textarea>
      </div>
    </div>
    <div class="chatbox">
      <p class="messages">
        Messages:
      </p>
        <div class="card-2" ref='messageDisplay' v-for="message in messages">
          <h3><strong>{{message.username}}</strong></h3>
          <p>{{message.text}}</p>
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
      }
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

.chatbox{
  display: block;
  position: relative;
  height: 1000px;
  max-width: 1025px;
  width: 100%;
  margin: 0 auto;
  overflow: scroll;
}

.col {
  font-size: 20px;
  text-align: center;
  margin: 45px auto;
  display: block;
  max-width: 1025px;
  width: 100%;
  border-radius: 3px;
  background-color: #fff;
  position: relative;
  top:10px;
  z-index: 1000;
}

.card-2:last-child {
  position: absolute;
  top:120px;

  background: #ECEFF1;
  -webkit-box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
          color: #000;
          width: 100%;
          max-width: 100%;
            margin: 0 auto;
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
  width: 100%;
  display: block;
  max-width: 720px;
  margin: 145px auto;
  word-break: normal;
}
.card-2 h3{
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
  top:0px;
  display: block;
  text-align: center;
  font-size: 30px;
  z-index: 999;
  font-weight:bold;
}

h3 {
  background: #5aa26c;
  color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 3px;
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
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
  height: 100px;
}

input,
textarea {
  font-size: 20px;
  margin: 20px;
  text-align: center;
  padding: 25px;
  letter-spacing: 2px;
  border: 1px solid #000;
  margin: 0 auto;
  display: block;
  width: 100%;
  max-width: 400px;
}

@media only screen and (max-width: 1025px){
  .card-2:last-child {
    position: absolute;
    top:120px;
    margin: 0 auto;
    background: #ECEFF1;
    -webkit-box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
            color: #000;
  }
  .card-2 h3{
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
h3{
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
  top:0px;
  display: block;
  text-align: center;
  font-size: 13px;
  z-index: 999;
  font-weight:bold;
}
h4 {
  font-size: 13px;
  color: #000;
  padding: 10px;
}
}
@media only screen and (max-width: 800px) {
input,
textarea {
  font-size: 13px;
  margin: 0px auto;
  text-align: center;
  padding: 10px;
  letter-spacing: 2px;
  border: 1px solid #000;
  margin: 0 auto;
  display: block;
  width: 100%;
  max-width: 200px;
}
}
</style>
