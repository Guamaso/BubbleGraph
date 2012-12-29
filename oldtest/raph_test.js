//build raphael test
//vars
 var json_url = 'http://juanorozco.com/sandbox/raph_test/raph_list.json';
$(document).ready(function(){
	//set the JSON
	$.get(
		json_url 
		,  function(resp)
		{ 
			//ini the graph
			var ele = 'test';
		
			init_R( ele, resp );
		}
	);

});





function init_R( ele, JSON )
{
	//bootstraps process
	//for now (because we have no collision detection)
	// just use the first node of the JSON.
	var i = 0;
	response = $.parseJSON( JSON );
	//ini the canvas
	var hit_list = new Raphael( ele, 600, 300);
	var docket_data = response.nodes[0];
	var docket = new R_Docket(hit_list, docket_data );
	docket.init();

}


function R_Node( R_obj )
{
	if (typeof R_obj != "undefined")
	{
		this.json_data = ( typeof data != "undefined" ) ? data : {};
		this.R_obj = R_obj;

		this.init = function( data )
		{
			this.circle = data ;
			console.log("circle loaded.");
			this.build( data );
		}

		//this is a main node
		this.build = function()
		{
			//build node
			if (typeof this.paper_obj == "undefined" )
			{
				this.paper_obj = this.R_obj.circle( this.circle.cx, this.circle.cy, this.circle.r );	
			}
			
		}

		this.update = function()
		{
			//updates the node
			console.log("updating");
		}

		this.attr = function( obj )
		{
			if ( typeof obj != "undefined" )
			{
				var resp = this.paper_obj.attr( obj );
				return resp;
			}
			else return null;
		}

		this.add_text = function( text )
		{
			var center = this.paper_obj.attr(["cx","cy"]);
			var t = this.R_obj.text(center.cx, center.cy, text );

		}
		return true;
	} else return false
}

function R_Docket( R_obj, data )
{
	if (typeof R_obj != "undefined")
	{
		this.d_data = ( typeof data != "undefined" ) ? data : {};
		this.R_obj = R_obj;

		this.init = function()
		{
			//add the node class, i'm sure there's a better way of extending classes...
			//but I'm lazy right now and this is a prototype.
			this.R_Node = new R_Node(this.R_obj);
			console.log("Loading.");
			this.build();
		}

		this.build = function()
		{
			//builds new DOCKET NODE
			this.R_Node.init({ cx : 200, cy: 200, r:80 });
			//adds text
			this.R_Node.add_text( 'Docket ' + this.d_data.meta.title );
			//processes hit data
			this.process_hits();

			this.users = {};
			//build user nodes
			foreach( this.d_Data.users as user )
			{
				//create user object
				this.users[user.name] = new R_User();
			}
		}

		this.process_hits = function()
		{
			//process hits JSON node
			var hits = this.d_data.hits.total_hits;
			var width = this.R_obj.width;
			//meh... not sure exactly what the factor SHOULD be...
			//var factor = (width / this.d_data.length ) / 100;
			var factor = (( width / 2)  / 1 ) * 0.005;
			var new_radius = hits * factor;

			this.R_Node.attr({"r" : new_radius});
		}
		return true;
	}
	else return false;

}

function R_User()
{
	this.init = function()
	{
		//init

	}
	this.build = function()
	{
		//builds new USER node
		this.R_Node.init({cx});
	}

	//should extend R_Node
	this.process_hits = function()
	{
		//process hits JSON node
	}

	this.process_user_resp = function()
	{
		//process the users response
	}
}




