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
		this.Raph = ( typeof Raph != "undefined" ) ? Raph : Raphael( 0, 0, 600, 400);
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
	function manage_shape( code, shape_data )
	{
		//builds raphael shape
		logger("build raph shape");
		var verified_shape_data;

		//check object
		verified_shape_data = check_shape_opts(shape_data);
		//create shape
		this.shapes[code] = this.Raph.circle(verified_shape_data.xx, verified_shape_data.yy, verified_shape_data.r);
		//set up fill
		this.shapes[code].attr("fill", verified_shape_data.fill_color);
		//set up stroke
		this.shapes[code].attr("stroke", verified_shape_data.stroke_color);

		return code;
	}

	/** 
	 * Creates Raphael text based on data passed
	 * @private
	 * @return boolean True = shape created
	 * 
	 */
	function manage_text( code, shape_data )
	{
		//builds raphael shape
		logger("build raph text");
		var verified_shape_data;

		//check object
		verified_shape_data = check_shape_opts(shape_data);

		//create text
		this.shapes[code] = this.Raph.text(verified_shape_data.xx, verified_shape_data.yy, verified_shape_data.out_text);

		//set up color
		this.shapes[code].attr("fill", verified_shape_data.fill_color);
		//set up font family
		this.shapes[code].attr("font-family", verified_shape_data.font_family );
		//set up font size
		this.shapes[code].attr("font-size", verified_shape_data.font_size );
		//set up line weight
		this.shapes[code].attr("font-weight", verified_shape_data.font_weight );

		return code;
	}

	/** 
	 * Creates Raphael line based on data passed
	 * @private
	 * @return boolean True = shape created
	 * 
	 */
	function manage_line( code, shape_data )
	{
		//builds raphael shape
		logger("build raph line");
		var verified_shape_data, line_string, line_points;

		//check object
		verified_shape_data = check_shape_opts(shape_data);
		//line start
		line_string = 'M ' + verified_shape_data.line_start.xx + ' ' + verified_shape_data.line_start.yy;
		//copy line points to local var
		line_points = verified_shape_data.line_points;
		//loop through line points
		for ( point as line_points )
		{
			//add line point
			line_string = line_string + ' l ' + line_points[point]["xx"] + ' ' + line_points[point]["yy"];
		}
		//line end
		line_string = line_string + ' z';
		//create line
		this.shapes[code] = this.Raph.path( line_string );

		this.shapes[code].attr(
		{
			fill: verified_shape_data.fill_color
			, stroke: verified_shape_data.stroke_color
			, 'stroke-width': verified_shape_data.line_weight
		});  

		return code;
	}

	/** 
	 * Checks the options object for defaults/errors
	 * @private
	 * @return Object Returns object with defaults and sanitized data
	 * 
	 */
	function check_shape_opts( options_to_check )
	{
		
		this.dim = { r: 50, xx : 50, yy : 50 };
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