Players = new Meteor.Collection("players");
Result = new Meteor.Collection("result");

Meteor.publish("players",function(){
	return Players.find({ lines: { $lt: 5 } });
});
Meteor.publish("result",function(){
	return Result.find();
});

Meteor.methods({
	'addPlayer':function(name,score){
		var number = Players.find().count() + 1;
		var player = {
			name:name,
			score:score,
			number:number,
			lines: 0,
			min: 41
		}
		Players.insert(player);
		Result.remove({});
	},
	'submit':function(id,amount){
		//If the score is less then the min, inc a line
		if(amount<Players.findOne({_id:id}).min){
			Players.update({_id:id},{$inc:{lines: 1}});
		};
		//Checks if the player is out
		if(Players.findOne({_id:id}).lines>4){
			var exitPlayer = Players.findOne({_id:id});
			console.log(exitPlayer.name);
			var player = {
				name:exitPlayer.name,
				position: Players.find().count()
			
			};
			Result.insert(player)
			Players.remove({_id:id});

			//If there is only one player left, remove from playerlist and insert in resultlist
			if(Players.find().count()<2){
				exitPlayer = Players.findOne();
				player = {
					name:exitPlayer.name,
					position: Players.find().count()
				};
				Result.insert(player)
				//Players.remove({});
				Players.update({},{$set:{winner: "Har vunnet!"}},{ multi: true });
			};
		};
		if(Players.findOne()){
			//Sets the score
			Players.update({_id:id},{$set:{score: amount}});
			//Sets the min amout on each player
			Players.update({},{$set:{min: amount+1}},{ multi: true });
		};
		

		//If there are less than two players, update the winner field.
		//if(Players.find({ lines: { $lt: 5 } }).count()<2){
		//	Players.update({},{$set:{winner: "Har vunnet!"}},{ multi: true });
		//};
	},
	'reset':function(){
		Players.remove({});
		Result.remove({});

	}

})