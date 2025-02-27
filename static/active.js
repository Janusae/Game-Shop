// snow fall
(function () {

// SnowVolume will change the density of the snowflakes
var SnowVolume = 800;
var elem = document.querySelector('.snow');
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var width = elem.clientWidth;
var height = elem.clientHeight;
var i = 0;
var active = false;

function onResize() {
	width = elem.clientWidth;
	height = elem.clientHeight;
	canvas.width = width;
	canvas.height = height;
	ctx.fillStyle = '#FFF';

	var wasActive = active;
	active = width > 700;

	if (!wasActive && active)
		requestAnimFrame(update);
}

var Snowflake = function () {
	this.x = 0;
	this.y = 0;
	this.vy = 0;
	this.vx = 0;
	this.r = 0;

	this.reset();
}

Snowflake.prototype.reset = function() {
	this.x = Math.random() * width;
	this.y = Math.random() * -height;
	this.vy = 1 + Math.random() * 3;
	this.vx = 0.5 - Math.random();
	this.r = 1 + Math.random() * 2;
	this.o = 0.5 + Math.random() * 0.5;
}

canvas.style.position = 'absolute';
canvas.style.left = canvas.style.top = '0';

var snowflakes = [], snowflake;
for (i = 0; i < SnowVolume; i++) {
	snowflake = new Snowflake();
	snowflake.reset();
	snowflakes.push(snowflake);
}

function update() {

	ctx.clearRect(0, 0, width, height);

	if (!active)
		return;

	for (i = 0; i < SnowVolume; i++) {
		snowflake = snowflakes[i];
		snowflake.y += snowflake.vy;
		snowflake.x += snowflake.vx;

		ctx.globalAlpha = snowflake.o;
		ctx.beginPath();
		ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fill();

		if (snowflake.y > height) {
			snowflake.reset();
		}
	}

	requestAnimFrame(update);
}

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	function( callback ){
		window.setTimeout(callback, 5000 / 60);
	};
})();

onResize();
window.addEventListener('resize', onResize, false);

elem.appendChild(canvas);
})();




$(window).on('load', function(){
	Main.init();
	Main.setParallaxHeight();
	$('#loader').fadeOut();
});
$(window).on('resize', function(){
	Main.setParallaxHeight();
	Main.setElementsHeight();
});
var Main = (function($){
	return {
		//inits
		init: function(){
			Main.events();
			Main.setElementsHeight();
			Main.setParallaxHeight();
			Main.countdownInit();
		},
		//events
		events: function(){
			$(document).on('click','#submit_form_btn',function(e){
				e.preventDefault();
				var v			= true,
				firstName 	= $("#form_first_name").val()
				lastName 	= $("#form_last_name").val()
				email 		= $("#form_valid_email").val()
				message 	= $("#form_message").val();
				if(firstName == ''){
					v = false;
					$("#form_first_name").attr('style','border:1px solid #FF0000');
				}
				if(lastName == ''){
					v = false;
					$("#form_last_name").attr('style','border:1px solid #FF0000');
				}
				if(Main.isEmail(email) === false){
					v = false;
					$("#form_valid_email").attr('style','border:1px solid #FF0000');
				}
				if(message == ''){
					v = false;
					$("#form_message").attr('style','border:1px solid #FF0000');
				}

				if(v){
					Main.sendEmail(firstName, lastName, email, message);
				}
			});
		},
		//functions
		setParallaxHeight: function(){
			var height = $(window).height();
			$('#christmas_scene .layer-photo').css('height', height);
		},
		sendEmail:function(firstName, lastName, email, message){
			$.ajax({
				url: 'sendmail.php',
				type: 'post',
				data: { "firstName": firstName, "lastName": lastName, "email": email, "message":message },
				success: function(response){
					$(".mail-container").addClass('hidden');
					$("#form_success_msg").parent().removeClass('hidden');
					$("#form_success_msg").html(response);
				},
				error: function( jqXhr, textStatus, errorThrown ){
					console.log( errorThrown );
				}
			});
		},
		isEmail: function(email) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(email);
		},
		setElementsHeight: function(){
			var height = $(window).height();

			if( height <= 400){
				var width = $(window).height() / 2;
			}else if( height <= 500 ){
				var width = $(window).height() / 3.5;
			}else if( height <= 700 ){
				var width = $(window).height() / 3;
			}else if( height <= 800 )
			var width = $(window).height() / 2.8;
			else{
				var width = $(window).height() / 2.5;
			}
			$('#christmas_tree').css({ 'width' : width,
				'margin-left' : -(width/2)
			});
			$('#mail_pole').css('margin-left', -(width/1.2));
			$('#mail_pole img').css('width', width/3);
		},
		countdownInit: function(){
			$('#countdown_container').countdown('2019/12/25', function(event) {
				$(this).html(event.strftime('<div class="col-md-3 col-xs-3 countdown-globe">%D<div class="col-md-12 padding-none">Days</div></div>\
					<div class="col-md-3 col-xs-3 countdown-globe">%H<div class="col-md-12 padding-none">Hours</div></div>\
					<div class="col-md-3 col-xs-3 countdown-globe">%M<div class="col-md-12 padding-none">Minutes</div></div>\
					<div class="col-md-3 col-xs-3 countdown-globe">%S<div class="col-md-12 padding-none">Seconds</div></div>'));
			});
		}
	}
})($);




/**
 * jQuery || Zepto Parallax Plugin
 * @author Matthew Wagerfield - @wagerfield
 * @description Creates a parallax effect between an array of layers,
 *              driving the motion from the gyroscope output of a smartdevice.
 *              If no gyroscope is available, the cursor position is used.
 */
 ;(function($, window, document, undefined) {

// Strict Mode
'use strict';

// Constants
var NAME = 'parallax';
var MAGIC_NUMBER = 30;
var DEFAULTS = {
	relativeInput: false,
	clipRelativeInput: false,
	calibrationThreshold: 100,
	calibrationDelay: 500,
	supportDelay: 500,
	calibrateX: false,
	calibrateY: true,
	invertX: true,
	invertY: true,
	limitX: false,
	limitY: false,
	scalarX: 10.0,
	scalarY: 10.0,
	frictionX: 0.1,
	frictionY: 0.1,
	originX: 0.5,
	originY: 0.5
};

function Plugin(element, options) {

// DOM Context
this.element = element;

// Selections
this.$context = $(element).data('api', this);
this.$layers = this.$context.find('.layer');

// Data Extraction
var data = {
	calibrateX: this.$context.data('calibrate-x') || null,
	calibrateY: this.$context.data('calibrate-y') || null,
	invertX: this.$context.data('invert-x') || null,
	invertY: this.$context.data('invert-y') || null,
	limitX: parseFloat(this.$context.data('limit-x')) || null,
	limitY: parseFloat(this.$context.data('limit-y')) || null,
	scalarX: parseFloat(this.$context.data('scalar-x')) || null,
	scalarY: parseFloat(this.$context.data('scalar-y')) || null,
	frictionX: parseFloat(this.$context.data('friction-x')) || null,
	frictionY: parseFloat(this.$context.data('friction-y')) || null,
	originX: parseFloat(this.$context.data('origin-x')) || null,
	originY: parseFloat(this.$context.data('origin-y')) || null
};

// Delete Null Data Values
for (var key in data) {
	if (data[key] === null) delete data[key];
}

// Compose Settings Object
$.extend(this, DEFAULTS, options, data);

// States
this.calibrationTimer = null;
this.calibrationFlag = true;
this.enabled = false;
this.depths = [];
this.raf = null;

// Element Bounds
this.bounds = null;
this.ex = 0;
this.ey = 0;
this.ew = 0;
this.eh = 0;

// Element Center
this.ecx = 0;
this.ecy = 0;

// Element Range
this.erx = 0;
this.ery = 0;

// Calibration
this.cx = 0;
this.cy = 0;

// Input
this.ix = 0;
this.iy = 0;

// Motion
this.mx = 0;
this.my = 0;

// Velocity
this.vx = 0;
this.vy = 0;

// Callbacks
this.onMouseMove = this.onMouseMove.bind(this);
this.onScrollMove = this.onScrollMove.bind(this);
this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
this.onOrientationTimer = this.onOrientationTimer.bind(this);
this.onCalibrationTimer = this.onCalibrationTimer.bind(this);
this.onAnimationFrame = this.onAnimationFrame.bind(this);
this.onWindowResize = this.onWindowResize.bind(this);

// Initialise
this.initialise();
}

Plugin.prototype.transformSupport = function(value) {
	var element = document.createElement('div');
	var propertySupport = false;
	var propertyValue = null;
	var featureSupport = false;
	var cssProperty = null;
	var jsProperty = null;
	for (var i = 0, l = this.vendors.length; i < l; i++) {
		if (this.vendors[i] !== null) {
			cssProperty = this.vendors[i][0] + 'transform';
			jsProperty = this.vendors[i][1] + 'Transform';
		} else {
			cssProperty = 'transform';
			jsProperty = 'transform';
		}
		if (element.style[jsProperty] !== undefined) {
			propertySupport = true;
			break;
		}
	}
	switch(value) {
		case '2D':
		featureSupport = propertySupport;
		break;
		case '3D':
		if (propertySupport) {
			var body = document.body || document.createElement('body');
			var documentElement = document.documentElement;
			var documentOverflow = documentElement.style.overflow;
			if (!document.body) {
				documentElement.style.overflow = 'hidden';
				documentElement.appendChild(body);
				body.style.overflow = 'hidden';
				body.style.background = '';
			}
			body.appendChild(element);
			element.style[jsProperty] = 'translate3d(1px,1px,1px)';
			propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty);
			featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== "none";
			documentElement.style.overflow = documentOverflow;
			body.removeChild(element);
		}
		break;
	}
	return featureSupport;
};

Plugin.prototype.ww = null;
Plugin.prototype.wh = null;
Plugin.prototype.wcx = null;
Plugin.prototype.wcy = null;
Plugin.prototype.wrx = null;
Plugin.prototype.wry = null;
Plugin.prototype.portrait = null;
Plugin.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
Plugin.prototype.vendors = [null,['-webkit-','webkit'],['-moz-','Moz'],['-o-','O'],['-ms-','ms']];
Plugin.prototype.motionSupport = !!window.DeviceMotionEvent;
Plugin.prototype.orientationSupport = !!window.DeviceOrientationEvent;
Plugin.prototype.orientationStatus = 0;
Plugin.prototype.transform2DSupport = Plugin.prototype.transformSupport('2D');
Plugin.prototype.transform3DSupport = Plugin.prototype.transformSupport('3D');
Plugin.prototype.propertyCache = {};

Plugin.prototype.initialise = function() {

// Configure Styles
if (this.$context.css('position') === 'static') {
	this.$context.css({
		position:'relative'
	});
}

// Hardware Accelerate Context
this.accelerate(this.$context);

// Setup
this.updateLayers();
this.updateDimensions();
this.enable();
this.queueCalibration(this.calibrationDelay);
};

Plugin.prototype.updateLayers = function() {

// Cache Layer Elements
this.$layers = this.$context.find('.layer');
this.depths = [];

// Configure Layer Styles
this.$layers.css({
	position:'absolute',
	display:'block',
	left: 0,
	top: 0
});
this.$layers.first().css({
	position:'relative'
});

// Hardware Accelerate Layers
this.accelerate(this.$layers);

// Cache Depths
this.$layers.each($.proxy(function(index, element) {
	this.depths.push($(element).data('depth') || 0);
}, this));
};

Plugin.prototype.updateDimensions = function() {
	this.ww = window.innerWidth;
	this.wh = window.innerHeight;
	this.wcx = this.ww * this.originX;
	this.wcy = this.wh * this.originY;
	this.wrx = Math.max(this.wcx, this.ww - this.wcx);
	this.wry = Math.max(this.wcy, this.wh - this.wcy);
};

Plugin.prototype.updateBounds = function() {
	this.bounds = this.element.getBoundingClientRect();
	this.ex = this.bounds.left;
	this.ey = this.bounds.top;
	this.ew = this.bounds.width;
	this.eh = this.bounds.height;
	this.ecx = this.ew * this.originX;
	this.ecy = this.eh * this.originY;
	this.erx = Math.max(this.ecx, this.ew - this.ecx);
	this.ery = Math.max(this.ecy, this.eh - this.ecy);
};

Plugin.prototype.queueCalibration = function(delay) {
	clearTimeout(this.calibrationTimer);
	this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay);
};

Plugin.prototype.enable = function() {
	if (!this.enabled) {
		this.enabled = true;
		if (this.orientationSupport) {
			this.portrait = null;
			window.addEventListener('deviceorientation', this.onDeviceOrientation);
			setTimeout(this.onOrientationTimer, this.supportDelay);
		} else {
			this.cx = 0;
			this.cy = 0;
			this.portrait = false;
			window.addEventListener('mousemove', this.onMouseMove);
//window.addEventListener('scroll', this.onScrollMove);
}
window.addEventListener('resize', this.onWindowResize);
this.raf = requestAnimationFrame(this.onAnimationFrame);
}
};

Plugin.prototype.disable = function() {
	if (this.enabled) {
		this.enabled = false;
		if (this.orientationSupport) {
			window.removeEventListener('deviceorientation', this.onDeviceOrientation);
		} else {
			window.removeEventListener('mousemove', this.onMouseMove);
//window.addEventListener('scroll', this.onScrollMove);
}
window.removeEventListener('resize', this.onWindowResize);
cancelAnimationFrame(this.raf);
}
};

Plugin.prototype.calibrate = function(x, y) {
	this.calibrateX = x === undefined ? this.calibrateX : x;
	this.calibrateY = y === undefined ? this.calibrateY : y;
};

Plugin.prototype.invert = function(x, y) {
	this.invertX = x === undefined ? this.invertX : x;
	this.invertY = y === undefined ? this.invertY : y;
};

Plugin.prototype.friction = function(x, y) {
	this.frictionX = x === undefined ? this.frictionX : x;
	this.frictionY = y === undefined ? this.frictionY : y;
};

Plugin.prototype.scalar = function(x, y) {
	this.scalarX = x === undefined ? this.scalarX : x;
	this.scalarY = y === undefined ? this.scalarY : y;
};

Plugin.prototype.limit = function(x, y) {
	this.limitX = x === undefined ? this.limitX : x;
	this.limitY = y === undefined ? this.limitY : y;
};

Plugin.prototype.origin = function(x, y) {
	this.originX = x === undefined ? this.originX : x;
	this.originY = y === undefined ? this.originY : y;
};

Plugin.prototype.clamp = function(value, min, max) {
	value = Math.max(value, min);
	value = Math.min(value, max);
	return value;
};

Plugin.prototype.css = function(element, property, value) {
	var jsProperty = this.propertyCache[property];
	if (!jsProperty) {
		for (var i = 0, l = this.vendors.length; i < l; i++) {
			if (this.vendors[i] !== null) {
				jsProperty = $.camelCase(this.vendors[i][1] + '-' + property);
			} else {
				jsProperty = property;
			}
			if (element.style[jsProperty] !== undefined) {
				this.propertyCache[property] = jsProperty;
				break;
			}
		}
	}
	element.style[jsProperty] = value;
};

Plugin.prototype.accelerate = function($element) {
	for (var i = 0, l = $element.length; i < l; i++) {
		var element = $element[i];
		this.css(element, 'transform', 'translate3d(0,0,0)');
		this.css(element, 'transform-style', 'preserve-3d');
		this.css(element, 'backface-visibility', 'hidden');
	}
};

Plugin.prototype.setPosition = function(element, x, y) {
	x += 'px';
	y += 'px';
	if (this.transform3DSupport) {
		this.css(element, 'transform', 'translate3d('+x+','+y+',0)');
	} else if (this.transform2DSupport) {
		this.css(element, 'transform', 'translate('+x+','+y+')');
	} else {
		element.style.left = x;
		element.style.top = y;
	}
};

Plugin.prototype.onOrientationTimer = function(event) {
	if (this.orientationSupport && this.orientationStatus === 0) {
		this.disable();
		this.orientationSupport = false;
		this.enable();
	}
};

Plugin.prototype.onCalibrationTimer = function(event) {
	this.calibrationFlag = true;
};

Plugin.prototype.onWindowResize = function(event) {
	this.updateDimensions();
};

Plugin.prototype.onAnimationFrame = function() {
	this.updateBounds();
	var dx = this.ix - this.cx;
	var dy = this.iy - this.cy;
	if ((Math.abs(dx) > this.calibrationThreshold) || (Math.abs(dy) > this.calibrationThreshold)) {
		this.queueCalibration(0);
	}
	if (this.portrait) {
		this.mx = this.calibrateX ? dy : this.iy;
		this.my = this.calibrateY ? dx : this.ix;
	} else {
		this.mx = this.calibrateX ? dx : this.ix;
		this.my = this.calibrateY ? dy : this.iy;
	}
	this.mx *= this.ew * (this.scalarX / 100);
	this.my *= this.eh * (this.scalarY / 100);
	if (!isNaN(parseFloat(this.limitX))) {
		this.mx = this.clamp(this.mx, -this.limitX, this.limitX);
	}
	if (!isNaN(parseFloat(this.limitY))) {
		this.my = this.clamp(this.my, -this.limitY, this.limitY);
	}
	this.vx += (this.mx - this.vx) * this.frictionX;
	this.vy += (this.my - this.vy) * this.frictionY;
	for (var i = 0, l = this.$layers.length; i < l; i++) {
		var depth = this.depths[i];
		var layer = this.$layers[i];
		var xOffset = this.vx * depth * (this.invertX ? -1 : 1);
		var yOffset = this.vy * depth * (this.invertY ? -1 : 1);
		this.setPosition(layer, xOffset, yOffset);
	}
	this.raf = requestAnimationFrame(this.onAnimationFrame);
};

Plugin.prototype.onDeviceOrientation = function(event) {

// Validate environment and event properties.
if (!this.desktop && event.beta !== null && event.gamma !== null) {

// Set orientation status.
this.orientationStatus = 1;

// Extract Rotation
var x = (event.beta  || 0) / MAGIC_NUMBER; //  -90 :: 90
var y = (event.gamma || 0) / MAGIC_NUMBER; // -180 :: 180

// Detect Orientation Change
var portrait = window.innerHeight > window.innerWidth;
if (this.portrait !== portrait) {
	this.portrait = portrait;
	this.calibrationFlag = true;
}

// Set Calibration
if (this.calibrationFlag) {
	this.calibrationFlag = false;
	this.cx = x;
	this.cy = y;
}

// Set Input
this.ix = x;
this.iy = y;
}
};

Plugin.prototype.onMouseMove = function(event) {

// Cache mouse coordinates.
var clientX = event.clientX;
var clientY = event.clientY;

// Calculate Mouse Input
if (!this.orientationSupport && this.relativeInput) {

// Clip mouse coordinates inside element bounds.
if (this.clipRelativeInput) {
	clientX = Math.max(clientX, this.ex);
	clientX = Math.min(clientX, this.ex + this.ew);
	clientY = Math.max(clientY, this.ey);
	clientY = Math.min(clientY, this.ey + this.eh);
}

// Calculate input relative to the element.
this.ix = (clientX - this.ex - this.ecx) / this.erx;
this.iy = (clientY - this.ey - this.ecy) / this.ery;

} else {

// Calculate input relative to the window.
this.ix = (clientX - this.wcx) / this.wrx;
this.iy = (clientY - this.wcy) / this.wry;
}
};
// AICI
Plugin.prototype.onScrollMove = function(event) {
//topDistance = this.pageYOffset;
// Cache mouse coordinates.
var clientX = 1;
var clientY = - pageYOffset * 5;

console.log(clientX);
// Calculate Mouse Input
if (!this.orientationSupport && this.relativeInput) {

// Clip mouse coordinates inside element bounds.
if (this.clipRelativeInput) {
	clientX = Math.max(clientX, this.ex);
	clientX = Math.min(clientX, this.ex + this.ew);
	clientY = Math.max(clientY, this.ey);
	clientY = Math.min(clientY, this.ey + this.eh);
}

// Calculate input relative to the element.
this.ix = (clientX - this.ex - this.ecx) / this.erx;
this.iy = (clientY - this.ey - this.ecy) / this.ery;

} else {

	console.log(this.ix);
// Calculate input relative to the window.
this.ix = (clientX - this.wcx) / this.wrx;
this.iy = (clientY - this.wcy) / this.wry;
}
};

var API = {
	enable: Plugin.prototype.enable,
	disable: Plugin.prototype.disable,
	updateLayers: Plugin.prototype.updateLayers,
	calibrate: Plugin.prototype.calibrate,
	friction: Plugin.prototype.friction,
	invert: Plugin.prototype.invert,
	scalar: Plugin.prototype.scalar,
	limit: Plugin.prototype.limit,
	origin: Plugin.prototype.origin
};

$.fn[NAME] = function (value) {
	var args = arguments;
	return this.each(function () {
		var $this = $(this);
		var plugin = $this.data(NAME);
		if (!plugin) {
			plugin = new Plugin(this, value);
			$this.data(NAME, plugin);
		}
		if (API[value]) {
			plugin[value].apply(plugin, Array.prototype.slice.call(args, 1));
		}
	});
};

})(window.jQuery || window.Zepto, window, document);

/**
* Request Animation Frame Polyfill.
* @author Tino Zijdel
* @author Paul Irish
* @see https://gist.github.com/paulirish/1579671
*/
;(function() {

	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];

	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}

}());



// Parallax Init
$('#christmas_scene').parallax({
	scalarX: 5,
	scalarY: 15,
	invertY: false
});