// raphael plugin

//builds bubble chart/graph from formatted json data



function bubble_graph( Raph, debug )
{
	this.db = new local_data( true );
	//constructor
	function init( Raph, debug )
	{
		if ( typeof debug == "undefined") var debug = false;
		debug = ( typeof debug == "boolean" ) ? debug : false;
	
		//main Raphael object
		this.Raph = Raph;
		//shape storage
		this.shapes = new Array();
	
	}
	
	/**
	 * @private
	 * Utility function.
	 */

	function logger( msg, type )
	{
		var prefix = 'bubble_graph';
		if ( typeof msg == "undefined" ) var msg = 'No message passed to log!';
		if ( typeof type == "undefined" ) var type='console';
		switch (type)
		{
			case "log":
				//appends to the log string in localstorage
				var test = this.db.update( prefix + '_log','-[TS:'+ time_stamp() +'] ' + msg );

			break;
			case "alert":
				alert( msg );
			break;
			default:
				console.log( prefix + ': ' + msg );
			break;
		}
	}

	/** 
	 * Creates Raphael shape based on data passed
	 * @private
	 * @return boolean True = shape created
	 * 
	 */
	function manage_shape( shape_data )
	{
		//builds raphael shape
		logger("build raph shape");
		//TODO


		return true;
	}

	/** 
	 * Creates Raphael text based on data passed
	 * @private
	 * @return boolean True = shape created
	 * 
	 */
	function manage_text( shape_data )
	{
		//builds raphael shape
		logger("build raph text");
		//TODO


		return true;
	}

	/** 
	 * Creates Raphael line based on data passed
	 * @private
	 * @return boolean True = shape created
	 * 
	 */
	function manage_line( shape_data )
	{
		//builds raphael shape
		logger("build raph line");
		//TODO


		return true;
	}

	/** 
	 * Checks the options object for defaults/errors
	 * @private
	 * @return Object Returns object with defaults and sanitized data
	 * 
	 */
	function check_shape_opts( options_to_check )
	{
		
		this.dim = { r: 50, x : 50, y : 50 };
		this.color = { border: "red", fill: "red" };
		this.shape = 'circle';
		this.position = { cx : 50, cy : 50 };

		return options_to_check;
	}

	/** 
	 * Detects collisions between objects
	 * @private
	 * @return boolean/object returns false if no collision,
	 *  otherwise returns object with collision data
	 */
	function check_collision( objects_to_check )
	{
		return false;
	}

	/** 
	 * Reposition shapes evenly
	 * @private
	 * @return boolean returns true when complete.
	 * 
	 */
	function reposition_shapes( objects_to_repos )
	{
		return true;
	}

	/** 
	 * Wrapper for creating bubble on the canvas
	 * @method
	 * @return boolean true = done
	 * 
	 */
	this.create_bubble = function( code, opts )
	{
		//constructor
		var shape_opts, shape_obj, response;

		shape_opts = check_shape_opts.call(this, opts);

		//init
		shape_obj = manage_shape.call(this, shape_opts);

		response = (typeof shape_obj != "object" ) ? false : shape_obj ;

		return response;
	}

	/** 
	 * Connects two objects
	 * @return boolean true = done
	 * 
	 */
	this.connect_bubble = function( objects_to_connect )
	{
		//constructor

	}

	/** 
	 * Updates the attributes of a shape
	 * @return boolean true = done
	 * 
	 */
	this.update_shape = function( code, updated_attrs )
	{
		//constructor

	}

	

	init.call( this, Raph, debug );

}


//TESTING:
var canvas = Raphael( "test", 600, 600 );
var test = new bubble_graph( canvas, true );