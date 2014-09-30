Router.map(function() {
	this.route('players',
		{path:'/'});
	this.route('add_player');
  	this.route('players');
  	this.route('result');
});

Router.configure({
	layoutTemplate: 'layout'
});