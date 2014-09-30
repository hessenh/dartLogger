Meteor.subscribe("players")
Meteor.subscribe("result");

Players = new Meteor.Collection("players");
Result = new Meteor.Collection("result");
var turn = 1;
var startOffset = 50;
var deltaOffset = 100;

Template.players.playerList = function(){
   if(Players.find().count()==0){
        turn = 1;
    };
    return Players.find({});
};
Template.add_player.playerList = function(){
    return Players.find({});
};

Template.result.resultList = function(){
  return Result.find({},{sort:{position:1}});
};


Template.add_player.events = {

   'keypress #inputName': function(event) {
        if (event.charCode == 13) { 
  			  var name = $('#inputName').val();
          Meteor.call('addPlayer',name,0); 
    		  $('#inputName').val("");
          if(Players.findOne()){
            Session.set("selected_player",Players.findOne({number: 1})._id);
          }
          
          
    	}
  },//Identisk til den over
  'click #addNameButton': function () {
          var name = $('#inputName').val();
          Meteor.call('addPlayer',name,0); 
          $('#inputName').val("");
          if(Players.findOne()){
            Session.set("selected_player",Players.findOne({number: 1})._id);
          }
        
  },
  'click #resetButton': function(){
    Meteor.call('reset');
    Router.go('add_player');
    turn = 1;
  }
}

Template.players.events = {
	'keypress #inputScore': function (event) {
    if (event.charCode == 13) { 
		  var score = $('#inputScore').val();
		  var id = Players.findOne({number: turn})._id;
		  Meteor.call('submit',id,parseInt(score));

      //Remove values, keyboard and scroll to the top
      $('#inputScore').val("");
      $('#inputScore').blur();
      var delta = startOffset + turn*deltaOffset;
      console.log(delta);
      $("html, body").animate({ scrollTop: delta }, 600);
       
       //Turns to the next player
      turn = turn +1;
      if(turn>Players.find().count()){
        turn = 1;
      }

      //Changes the selected player
      Session.set("selected_player",Players.findOne({number: turn})._id);
    };

  },//Identisk til den over
  'click #inputScoreButton': function () {
      var score = $('#inputScore').val();
      var id = Players.findOne({number: turn})._id;
      Meteor.call('submit',id,parseInt(score));

      //Remove values, keyboard and scroll to the top
      $('#inputScore').val("");
      $('#inputScore').blur();
      var delta = startOffset + turn*deltaOffset;
      console.log(delta);
      $("html, body").animate({ scrollTop: delta }, 600);
       
       //Turns to the next player
      turn = turn +1;
      if(turn>Players.find().count()){
        turn = 1;
      }

      //Changes the selected player
      Session.set("selected_player",Players.findOne({number: turn})._id);
  },




  'click #resetButton': function(){
  	Meteor.call('reset');
  	Router.go('add_player');
    turn = 1;
  }
}


Template.player.selected = function () {

    if(Session.get("selected_player")==this._id){
      return "selected";
    }
    else{
      return "";
   
    };
 };