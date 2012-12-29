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
	
		this.Raph = Raph;
	
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
	function create_shape( shape_data )
	{
		//builds raphael shape
		logger("build raph shape");
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
	this.create_bubble = function( opts )
	{
		//constructor
		this.dim = { r: 50, x : 50, y : 50 };
		this.color = { border: "red", fill: "red" };
		this.shape = 'circle';
		this.position = { cx : 50, cy : 50 };




		//init
		create_shape.call(this, opts);
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

	init.call( this, Raph, debug );

}


//TESTING:
var canvas = Raphael( "test", 600, 600 );
var test = new bubble_graph( canvas, true );