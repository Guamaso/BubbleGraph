// raphael plugin

//builds bubble chart/graph from formatted json data



function Bubble_Graph(Raph, debug)
{
	var defaults = '';
	//constructor
	function init( Raph, debug )
	{
		module_info = {"version":"2.4.0"};

		defaults = {};
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

		//text
		defaults.out_text = '';
		defaults.text_color = '#ffffff';

		//fill_color, stroke_color, line_weight
		defaults.fill_color = "#333333";
		defaults.stroke_color = "#444444";
		defaults.line_weight = "2px";

		//font_family, font_size, font_weight
		defaults.font_family = "";//use CSS default
		defaults.font_size = "10px";
		defaults.font_weight = "500";

		//line_start.xx, line_start.yy, line_points[]
		defaults.line_start = {};
		defaults.line_start.xx = 0;
		defaults.line_start.yy = 0;
		//defaults.line_points[] = ["xx":0,"yy":0];

		this.defaults = defaults;
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
				console.log( prefix + ':' );
				console.log( msg );
				console.log( '/' + prefix );

			break;
			case "alert":
				alert( msg );
			break;
			default:
                //TODO: Should do nothing, but does same as LOG for now...
				console.log( prefix + ':' );
				console.log( msg );
				console.log( '/' + prefix );
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
		logger(shape_data.out_text);
		//create text
		this.shapes[code] = this.Raph.text(shape_data.xx, shape_data.yy, shape_data.out_text);

		//set up color
		this.shapes[code].attr("fill", shape_data.text_color);
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
		line_string = 'M' + shape_data.line_start.xx + ',' + shape_data.line_start.yy;
		//copy line points to local var
		line_points = shape_data.line_points;
		//loop through line points
		for ( point in line_points )
		{
			//add line point
			line_string = line_string + 'L' + line_points[point]["xx"] + ',' + line_points[point]["yy"];
		}
		//line end
		line_string = line_string + 'Z';
		logger(line_string);
		//create line
		this.shapes[code] = this.Raph.path( line_string ).toBack();

		this.shapes[code].attr(
		{
			"fill" : "none"
			, "stroke" : shape_data.attrs.stroke_color
			, 'stroke-width': shape_data.attrs.line_weight
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
		var checked_opts;
		defaults = defaults;
		if ( typeof options_to_check.shape_type == "undefined" )
		{
			options_to_check.shape_type	 = {};
		}
		checked_opts = {};
		//check shape type
		checked_opts.shape_type = ( options_to_check.shape_type.length == 0 ) ? defaults.shape_type : options_to_check.shape_type;
		//xx,yy,r,cx,cy
		checked_opts.xx = ( options_to_check.hasOwnProperty("xx") ) ? options_to_check.xx : defaults.xx;
		checked_opts.yy = ( options_to_check.hasOwnProperty("yy") ) ? options_to_check.yy : defaults.yy;
		checked_opts.cx = ( options_to_check.hasOwnProperty("cx") ) ? options_to_check.cx : defaults.cx;
		checked_opts.cy = ( options_to_check.hasOwnProperty("cy") ) ? options_to_check.cy : defaults.cy;
		checked_opts.r = ( options_to_check.hasOwnProperty("r") ) ? options_to_check.r : defaults.r;

		//text
		checked_opts.out_text = ( options_to_check.hasOwnProperty("out_text") ) ? options_to_check.out_text : defaults.out_text;
		checked_opts.text_color = ( options_to_check.hasOwnProperty("text_color") ) ? options_to_check.text_color : defaults.text_color;

		//fill_color, stroke_color, line_weight
		checked_opts.fill_color = ( options_to_check.hasOwnProperty("fill_color") ) ? options_to_check.fill_color : defaults.fill_color;
		checked_opts.stroke_color = ( options_to_check.hasOwnProperty("stroke_color") ) ? options_to_check.stroke_color : defaults.stroke_color;
		checked_opts.line_weight = ( options_to_check.hasOwnProperty("line_weight") ) ? options_to_check.line_weight : defaults.line_weight;

		//font_family, font_size, font_weight
		checked_opts.font_family = ( options_to_check.hasOwnProperty("font_family") ) ? options_to_check.font_family : defaults.font_family;
		checked_opts.font_size = ( options_to_check.hasOwnProperty("font_size") ) ? options_to_check.font_size : defaults.font_size;
		checked_opts.font_weight = ( options_to_check.hasOwnProperty("font_weight") ) ? options_to_check.font_weight : defaults.font_weight;
		//line_start.xx, line_start.yy, line_points[]
		if ( options_to_check.hasOwnProperty("line_start") )
		{
			checked_opts.line_start = {};
			checked_opts.line_start.xx = ( options_to_check.line_start.hasOwnProperty("xx") ) ? options_to_check.line_start.xx : defaults.line_start.xx;
			checked_opts.line_start.yy = ( options_to_check.line_start.hasOwnProperty("yy") ) ? options_to_check.line_start.yy : defaults.line_start.yy;
		}
		else
		{
			checked_opts.line_start = defaults.line_start;
		}
		checked_opts.line_points = ( options_to_check.hasOwnProperty("line_points") ) ? options_to_check.line_points : defaults.line_points;

		return checked_opts;
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

		logger("Done creating shape.");
		return response;
	}

	/** 
	 * Connects two objects
	 * @return boolean true = done
	 * 
	 */
	this.connect_bubble = function()
	{
		var parent_obj, cur_child, cur_set, points_obj, line_code, opts, attrs, args, children_list, objects_to_connect;
		//determine arguments
		args = Array.prototype.slice.call(arguments);
		//verify some args were passed
		if ( args.length > 0 )
		{
			//check if object
			if (typeof args[0] == "object" )
			{
				objects_to_connect = args[0];
			}
			else
			{
				//passed strings, process data
				if ( typeof args[1] == "object" )
				{
					children_list = ( args.hasOwnProperty(1) ) ? args[1] : {} ;
				}
				else if ( typeof args[1] == "string" )
				{
					children_list = new Array();
					children_list.push(( args.hasOwnProperty(1) ) ? args[1] : {} );
				}
				
				attrs = ( args.hasOwnProperty(2) ) ? args[2] : {} ;
				attrs = check_shape_opts( attrs );

				//create object
				objects_to_connect = 
				{
					"sets" :
					[
						{
							"parent" : args[0]
							, "children" : children_list
							, "attrs" : attrs
						}
					]
				};

			}
		}
		else return false;

		//process object
		for(set in objects_to_connect.sets)
		{
			points_obj = {};

			//@todo
			//Each set will have it's own hierarchal attributes. Then, each "connection" will also have it's own attributes
			//This allows fine control over attributes of objects.
			//points_obj.attrs = (objects_to_connect.hasOwnProperty("attrs") ) ? objects_to_connect.attrs : defaults ;

			cur_set = objects_to_connect.sets[set];
			//get parent object
			parent_obj = this.shapes[cur_set["parent"]];
			
			//get first center pt, save pts to object
			points_obj.line_start = {};
			points_obj.line_start.xx = parent_obj.attr("x");
			points_obj.line_start.yy = parent_obj.attr("y");

			points_obj.line_points = [];
			attrs = (cur_set.hasOwnProperty("attrs") ) ? cur_set.attrs : {} ;
			points_obj.attrs = check_shape_opts( attrs );

			//process array
			for(child in cur_set["children"])
			{
				logger(cur_set["children"][child]);
				cur_child = this.shapes[cur_set["children"][child]];

				line_code = cur_set["parent"] + "_to_" + cur_set["children"][child];

				//get children center pts, save pts to object
				opts = { "xx" : cur_child.attr("x"), "yy" : cur_child.attr("y") };
				points_obj.line_points.push( opts );
				
				//@TODO make sure line weight is not greater than shape diameter/width

				//create line(s)
				MEH = manage_line.call(this, line_code, points_obj);
				points_obj.line_points.length = 0;
			
			}
			

			//clear
			cur_set = null;
			parent_obj = null;
			children_obj = null;

		}
		logger("Done creating shape(s).");

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
