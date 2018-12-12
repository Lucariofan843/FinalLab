<!--For the Final Project you will be releasing your Lab 10 code to the Internet and exploring the capabilities of Firebase.
Using the vue-cli, you will deploy your web application to Firebase hosting.
You will also start a new GitHub repository to store your code.-->

<!--In addition to using the Firebase hosting, use Firebase's Firestore Cloud Firestore  |  Firebase service
to save, read, and delete Cards from a Firestore collection.
https://firebase.google.com/docs/firestore/-->

<!--Rubric-->

<!--/20: Code correctly setup in a GitHub repository in your GitHub account.
Cloning the repository to a fresh folder and running npm install && npm run serve should work without a problem.-->

<!--/20: Production version of website is deployed to Firebase correctly-->

<!--/20: Code follows general coding conventions
(I.e., using appropriate variable and function names, files are placed in correct locations, etc).-->

<!--/10: Components are used effectively.-->

<!--/10: Web app is responsive, usable interface on mobile and desktop-->

<!--/5: Interface is styled well with CSS and inline styles when appropriate-->

<!--/5: Card saving to Firestore works correctly.-->

<!--/5: Card Inventory screen reads Cards from Firestore and automatically updates when new cards are added,
even if they are added on another computer.-->

<!--/5: Card deletion from Firestore works correctly.-->
<!--Turning it in-->

<!--Paste your web app's url and your GitHub repository's url into the appropriate fields.
 The code in your GitHub repository url will be used for grading.-->


<template>
  <div id="app">
    <nav>
      <ul>
        <li><a @click="createCards" :class="{active: currentScreen1}">Create Cards</a></li>
        <li><a @click="cardAlbum" :class="{active: currentScreen2}">Album</a></li>
      </ul>
    </nav>
    <div id="screenOne" v-show="currentScreen1">
    <CardCreator @save-card="saveCard"/>
    </div>
    <div id="screenTwo" v-show="currentScreen2">
        <transition-group name="album" class="album">
      <CardSlot v-for="card in cards" :id="card.id" :card-date="card.dateSaved" @discard-card="discardCard" :key="card.id">
       <div class="card" :style="{backgroundColor: card.color}" >
        <div class="id"><i :class="card.icon"></i>{{card.id}}</div>
          <div class="name">{{card.name}}</div>
        <img :src="card.imgLink">
        <p>{{card.details}}</p>
           {{card.dateSaved}}
      </div>
    </CardSlot>
    </transition-group>
  </div>
  </div>
</template>

<script>
    import CardCreator from '@/components/CardCreator';
    import CardSlot from '@/components/CardSlot';
    import db from '@/components/FBDB';

export default {
  name: 'app',
  data: function (){
      return {
        cards: [],
        currentScreen1: true,
        currentScreen2: false,
        card: {
            id: '',
            name: '',
            icon: '',
            imgLink: '',
            details: '',
            color: '',
          }
      };
  },

  created(){
      db.collection("sets").onSnapshot((querySnapshot) => {
          this.cards = [];
          querySnapshot.forEach((doc) => {
              let card = doc.data();
              card.id = doc.id;
              this.cards.push(card);
          });
      });
  },

  components: {
      CardSlot,
      CardCreator
  },
  methods: {
      saveCard(card) {
          if (this.cards.find(x => x.id === card.id)) {
              alert('Card with that ID already exists. Please enter a different ID and try again.');
          } else if (! card.id && card.name){
              alert('ID and Name fields have not been filled. Please enter those fields and try again.');
          } else if (!card.id) {
              alert('ID is missing. Please enter ID and try again.');
          } else if (!card.name) {
              alert('Name is missing. Please enter Name and try again.');
          }
           else {
              card.dateSaved = new Date().toString();
               db.collection("sets").add(card);
          }
      },
      discardCard(id) {
        db.collection('sets').doc(id).delete();
      },
      createCards () {
          this.currentScreen1 = true;
          this.currentScreen2 = false;
      },

      cardAlbum () {
          this.currentScreen1 = false;
          this.currentScreen2 = true;
      }
  }
};
</script>

<style>
    @import '~normalize.css';
    nav ul {
        list-style-type: none;
        overflow: hidden;
        margin: 0;
        padding: 0;
        background-color: silver;
}

    li {
        float: left;
    }
    li a {
        display: block;
        text-align: center;
        padding: 10px 12px;
        text-decoration: none;
    }

    li a:hover {
        background-color: black;
        color: white;
    }

    li a.active {
        background-color: gold;
    }

    li a.active:hover {
        color: blue;
    }

    .album {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        position: relative;
    }

    .card {
        display: grid;
        grid-template-areas:
                'name id'
                'pic pic'
                'details details';
        grid-template-rows: auto 1fr auto;
        height: 25rem;
        width: 20rem;
        border-radius: .4rem;
        border-style: solid;
        border-width: .2rem;
        padding: .5rem;

    }
     .id {
        grid-area: id;
        background-color: rgba(255, 255, 255, .75);
         display: flex;
    }

    img {
        grid-area: pic;
        height: 100%;
        width: 100%;
        display: flex;
    }

    .name {
        grid-area: name;
        background-color: rgba(255, 255, 255, .75);
        display: flex;

    }

    p {
        grid-area: details;
        background-color: rgba(255, 255, 255, .75);
        padding-bottom: 1rem;
        display: flex;
    }

    .album-enter-active, .album-leave-active {
        transition: all 1s;
    }

    .album-enter, .album-leave-to {
        opacity: 0;
        transform: translateX(-150%) rotateZ(-120deg);
    }

    .album-move {
        transition: transform 1.5s;
    }

    .album-leave-active {
        position: absolute;
    }

    @media only screen and (min-width: 769px) {
        .album {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        .card{
            height: 40rem;
            width: 35rem;
        }
    }
</style>
