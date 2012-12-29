
/**
* @module Local Data Storage wrapper tool
*
* @desc Wraps the local storage api. Handles it's own errors. Mainly for internal logging of scripts.
* @author Juan Orozco
* 
*/
function local_data(exptime, debug )
{
/**
	@private 
	@param {boolean} Sets the debug mode, outputs reports to the console.
*/
if ( typeof debug == 'undefined' ) var debug = false;

/**
	@private 
	@param {number} Sets the data expiration time, default is 24 hours in milliseconds.
*/
if ( typeof exptime != 'number' )
{
	var def_exp_time = 24*60*60*1000;//24 hours

	var stored_exp_time = localStorage.getItem("data_exp_time");

	if ( typeof stored_exp_time == "undefined" ) exptime = def_exp_time;
	else exptime = stored_exp_time;
}

/**
	@constructor 
	@desc checks for and sets local storage.
*/
if('localStorage' in window && window['localStorage'] !== null)
{
	var hasStorage = true;
	localStorage.setItem("data_exp_time", exptime );
}
else
{
	logger("local storage not available!");
}

/**
	@private Saves data in localStorage
	@param {string} k. The key name to store data in.
	@param {anything} v. Data to store.
	@return {anything} Stored value.
*/
function set( k, v)
{
	try
	{
		localStorage.setItem(k, v);	
		//updates modify time for this key
		var km = k + '_lastmodified';
		var vm = new Date();
		localStorage.setItem(km, vm);	
		return v;
	}
	catch(e)
	{
		logger( 'Set error: ' + e );
		return e;
	}
	
}

/**
	@private Updates data in localStorage, appends new data as json string.
	@param {string} k. The key name to store data in.
	@param {anything} v. Data to store.
	@return {anything} Stored value.
*/
this.update = function( k, v, m)
{
	if ( typeof m == 'undefined' ) var m = '';
	if ( typeof v == 'undefined' ) var v = '';
	var cv, cvm, exp, now, nv, r;

	try
	{
		cv = get(k);
		cv = ( typeof cv == "undefined" ) ? '' : cv ;
		cvm = get( k + '_lastmodified' );
		exp = get( 'data_exp_time' );
		now = new Date();

		if ( ( (now - cvm) > exp  ) || ( m == '' ) )
		{
			nv = v;
		}
		else
		{
			nv = ( m == 'pre' ) ? v + cv : cv + v;
		}
		r = set( k, nv);
		return r;
	}
	catch(e)
	{
		logger( 'Set error: ' + e );
		return e;
	}
	
}

/**
	@private Gets data in localStorage
	@param {string} The key name to store data in.
	@return {anything} Retrieved value.
*/
function get( k )
{
	try
	{
		var mk = localStorage.getItem( k + '_lastmodified' );
		var now = new Date();
		if ( mk > now + exptime ) 
		{
			localStorage.setItem( k +'_expired', true );
		}
		else
		{
			localStorage.setItem( k +'_expired', false );	
		}
		var v = localStorage.getItem(k);	
		return v;
	}
	catch(e)
	{
		logger( 'Get error: ' + e );
		return e;
	}
}

/**
	@private Returns string to console.
	@param {string} log Data to return to console.
*/
function logger( log )
{
		if ( debug == true )
			console.log( "local_data: " + log );
}

/**
	@method Clears localStorage
	@param {string} check Function must pass the string "confirm"
*/
this.drop = function( check )
{
	if ( check == 'confirm' )
	{
    	try
    	{
    		localStorage.clear();	
    	}
    	catch(e)
    	{
    		logger( 'Clear error: ' + e );
    		return null;
    	}
    }
}
