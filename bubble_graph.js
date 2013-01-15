// raphael plugin

//builds bubble chart/graph from formatted json data



function bubble_graph( Raph, debug )
{
	this.db = new local_data( true );

	//constructor
	function init( Raph, debug )
	{
		var defaults;
		if ( typeof debug == "undefined") var debug = false;
		debug = ( typeof debug == "boolean" ) ? debug : false;
	
		//main Raphael object
		this.Raph = ( typeof Raph != "undefined" ) ? Raph : Raphael( 0, 0, 600, 400);
		//shape storage
		this.shapes = new Array();

		//defaults
		this.defaults = {};
		//xx,yy,r,cx,cy
		defaults.xx = 0;
		defaults.yy = 0;

		defaults.r = 0;
		defaults.cx = 0;
		defaults.cy = 0;

		//fill_color, stroke_color, line_weight
		defaults.fill_color = "#444444";
		defaults.stroke_color = "#444444";
		defaults.line_weight = "12em";

		//font_family, font_size, font_weight
		defaults.font_family = "sans-serif";
		defaults.font_size = "12px";
		defaults.font_weight = "500";

		//line_start.xx, line_start.yy, line_points[]
		defaults.line_start.xx = 0;
		defaults.line_start.xx = 0;
		//defaults.line_points[] = ["xx":0,"yy":0];
	
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
	 * @private
	 * @name check_shape_attr
	 * @param code (string) Shape object code
	 * @param attr_name (string) Attribute name
	 * @return Check status of shape
	 */
	 function check_shape_attr( code, attr_name )
	 {
	 	var cur_obj, value_in_array;
	 	//@todo test in all newer browsers
	 	value_in_array = this.shapes.indexOf(code);
	 	//return attr status
	 	if ( value_in_array != -1 )
	 	{
	 		cur_obj = this.shapes[code];

	 		cur_attr = (cur_obj.hasOwnProperty(attr_name) ) ? cur_obj[attr_name] : null;
	 	}
	 	else
	 	{
	 		cur_attr = null;
	 	}

	 	return cur_attr;
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
		//create shape
		this.shapes[code] = this.Raph.circle(shape_data.xx, shape_data.yy, shape_data.r);
		//set up fill
		this.shapes[code].attr("fill", shape_data.fill_color);
		//set up stroke
		this.shapes[code].attr("stroke", shape_data.stroke_color);

		return this.shapes[code];
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

		//create text
		this.shapes[code] = this.Raph.text(shape_data.xx, shape_data.yy, shape_data.out_text);

		//set up color
		this.shapes[code].attr("fill", shape_data.fill_color);
		//set up font family
		this.shapes[code].attr("font-family", shape_data.font_family );
		//set up font size
		this.shapes[code].attr("font-size", shape_data.font_size );
		//set up line weight
		this.shapes[code].attr("font-weight", shape_data.font_weight );

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
		var line_string, line_points;

		//line start
		line_string = 'M ' + shape_data.line_start.xx + ' ' + shape_data.line_start.yy;
		//copy line points to local var
		line_points = shape_data.line_points;
		//loop through line points
		for ( point in line_points )
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
			fill: shape_data.fill_color
			, stroke: shape_data.stroke_color
			, 'stroke-width': shape_data.line_weight
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
		//primary check
		if ( typeof options_to_check != "object" ) var options_to_check = {};
		var checked_opts, defaults;
		defaults = this.defaults;

		//check shape type
		checked_opts.shape_type = ( options_to_check.shape_type.length == 0 ) ? defaults.shape_type : options_to_check.shape_type;
		//xx,yy,r,cx,cy
		checked_opts.xx = ( options_to_check.xx.length == 0 ) ? defaults.xx : options_to_check.xx;
		checked_opts.yy = ( options_to_check.yy.length == 0 ) ? defaults.yy : options_to_check.yy;
		checked_opts.cx = ( options_to_check.cx.length == 0 ) ? defaults.cx : options_to_check.cx;
		checked_opts.cy = ( options_to_check.cx.length == 0 ) ? defaults.cy : options_to_check.cx;
		checked_opts.r = ( options_to_check.r.length == 0 ) ? defaults.r : options_to_check.r;

		//fill_color, stroke_color, line_weight
		checked_opts.fill_color = ( options_to_check.fill_color.length == 0 ) ? defaults.fill_color : options_to_check.fill_color;
		checked_opts.stroke_color = ( options_to_check.stroke_color.length == 0 ) ? defaults.stroke_color : options_to_check.stroke_color;
		checked_opts.line_weight = ( options_to_check.line_weight.length == 0 ) ? defaults.line_weight : options_to_check.line_weight;

		//font_family, font_size, font_weight
		checked_opts.font_family = ( options_to_check.font_family.length == 0 ) ? defaults.font_family : options_to_check.font_family;
		checked_opts.font_size = ( options_to_check.font_size.length == 0 ) ? defaults.font_size : options_to_check.font_size;
		checked_opts.font_weight = ( options_to_check.font_weight.length == 0 ) ? defaults.font_weight : options_to_check.font_weight;
		//line_start.xx, line_start.yy, line_points[]
		if ( options_to_check.line_start.length == 0 )
		{
			checked_opts.line_start = defaults.line_start;
		}
		else
		{
			checked_opts.line_start.xx = ( options_to_check.line_start.xx.length == 0 ) ? defaults.line_start.xx : options_to_check.line_start.xx;
			checked_opts.line_start.yy = ( options_to_check.line_start.yy.length == 0 ) ? defaults.line_start.yy : options_to_check.line_start.yy;
		}
		checked_opts.line_points = ( options_to_check.line_points.length == 0 ) ? defaults.line_points : options_to_check.line_points;

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

		shape_opts = check_shape_opts( opts );

		//init
		shape_obj = manage_shape.call(this, code, shape_opts);

		//create text
		shape_obj = manage_text.call(this, code, shape_opts);		

		//@todo attempt at returning error
		//not sure if I like this...
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
		//get shape objects
		/*
		object example

		{
			"sets":
			[
				{
					"parent":"MEH"
					, "children":["A","B","C"]
				}
			]
		}

		*/
		var parent_obj, children_obj, this_set, points_obj;
		for(set in objects_to_connect)
		{
			this_set = objects_to_connect[set];
			//get parent object
			parent_obj = this.shapes[this_set["parent"]];

			//get first center pt, save pts to object
			points_obj.parent_shape.cx = parent_obj.attr("cx");
			points_obj.parent_shape.cy = parent_obj.attr("cy");

			//get children points
			for(child in this_set["children"])
			{
				children_obj.push(this.shapes[this_set["children"][child]]);	

				//get children center pts, save pts to object

				//make sure line weight is not greater than shape diameter/width

				//create line(s)
				MEH = manage_line.call(this, CODE_NAME, LINE_POINTS);
			
			}
			

			//clear
			this_set = null;
			parent_obj = null;
			children_obj = null;

		}

		return true;
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