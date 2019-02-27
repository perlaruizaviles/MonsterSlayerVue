new Vue({
  el: '#app',
  data: {
    playerHealt:  100,
    monsterHelt: 100,
    isRunning: false,
    turns: []
  },
  methods: {
    playBall: function(){
      this.playerHealt =  100,
      this.monsterHelt = 100,
      this.isRunning = true,
      this.turns = []
    },
    attack: function(){
      var damage = this.calculateDamage(3,10);
      this.monsterHelt -= damage
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster for " + damage
      });
      if (this.checkWin()){
        return
      }
      this.monsterAttacks();
    },
    specialAttack: function (){
      var damage =  this.calculateDamage(10,10);
      this.monsterHelt -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player special hits monster for " + damage
      });
      if (this.checkWin()){
        return
      }
      this.monsterAttacks();
    },
    heal: function (){
      if (this.playerHealt <= 90){
        this.playerHealt += 10;
      }else{
        this.playerHealt = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Player heals for 10"
      });
      this.monsterAttacks();
    },
    giveUp: function(){
      if (confirm('You Lost, new game?')){
        this.playBall();
      }else{
        this.isRunning = false;
      }
    },
    monsterAttacks: function(){
      var damage =  this.calculateDamage(5,10);
      this.playerHealt -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits monster for " + damage
      });
      this.checkWin();
    },
    calculateDamage: function (min, max){
      return Math.max( Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function(){
      if (this.monsterHelt <= 0){
        if (confirm('You won, new game?')){
          this.playBall();
        }else{
          this.isRunning = false;
        }
        return true;
      }else if (this.playerHealt <= 0) {
        if ( confirm('You lost, new game?')){
          this.playBall();
        }else{
          this.isRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});
