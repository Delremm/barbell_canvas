window.onload = init;
function init() {

	var form_plates = function(w){
		var rel_width = 1/40.0;
		var rel_height = 1.0;
		var barbell_w = 20.0;
		var w = w-barbell_w;
		var plates = [
			{color: "#FF0000", weight: 25.0, rel_w:  rel_width, num: 0, rel_h: 1.0},
			{color: "#000099", weight: 20.0, rel_w:  rel_width, num: 0, rel_h: 1.0},
			{ color: "#FFFF00", weight: 15.0, rel_w:  rel_width, num: 0, rel_h: 1.0 },
			{ color: "#00CC00", weight: 10.0, rel_w:  rel_width, num: 0, rel_h: 1.0 },
			{ color: "#CCCCCC", weight: 5.0, rel_w:  rel_width, num: 0, rel_h: 0.5 },
			{ color: "#FF0000", weight: 2.5, rel_w:  rel_width, num: 0, rel_h: 0.4 },
			{ color: "#000099", weight: 2.0, rel_w:  rel_width, num: 0, rel_h: 0.35 },
			{ color: "#FFFF00", weight: 1.5, rel_w:  rel_width, num: 0, rel_h: 0.3 },
			{ color: "#00CC00", weight: 1.0, rel_w:  rel_width, num: 0, rel_h: 0.25 },
			{ color: "#CCCCCC", weight: 0.5, rel_w:  rel_width, num: 0, rel_h: 0.2 },
		];
		for (var k in plates){
			var w_left = 0.0;
			if (k>0){
				for (var i = 0; i<k;i++){
					w_left+=plates[i].num*plates[i].weight*2;
				};
			};
			plates[k].num = Math.floor((w-w_left)/(plates[k].weight*2));
		};
		return plates;
	};
	var drow_plates = function(c_w, c_h, ctx, plates){
		var between_plates = 1/200.0;
		var left_p = c_w/4;
		var right_p = c_w*3/4;
		var plates_shift = 0.0;
		console.log(plates, "plates");
		for (var k in plates){
				for (var i = 0;i<plates[k].num;i++){
					// console.log("plate", plates[k]);
					ctx.fillStyle = plates[k].color;
					console.log(plates_shift);
					console.log(c_w*plates[k].rel_w, "width");
					// ctx.fillRect(left_p-plates_shift, c_h,c_w*plates[k].rel_w,c_h);
					plates_shift += c_w*plates[k].rel_w;
					ctx.fillRect(left_p-plates_shift,c_h*(1-plates[k].rel_h)/2, plates[k].rel_w*c_w,plates[k].rel_h*c_h/2.0);
					ctx.fillRect(left_p-plates_shift,c_h/2.0,plates[k].rel_w*c_w,plates[k].rel_h*c_h/2.0);
					console.log(plates[k].rel_h*c_h/2.0, "h/2");
					ctx.fillStyle = "#ffffff";
					plates_shift += between_plates*c_w;
					ctx.fillRect(left_p-plates_shift,0,between_plates*c_w,plates[k].rel_h*c_h);
4				};
		};
		// ctx.fillStyle = "#ff0000";
		// ctx.fillRect(0,0,30,30);
	};
	var cs = document.getElementsByClassName("barbell");
	for (var key in cs){
		var c = cs[key];
		var c_w = c.getAttribute('width');
		var c_h = c.getAttribute('height');

		var w = c.getAttribute('weight');
		var plates = form_plates(w);

		var ctx = c.getContext("2d");
		ctx.fillStyle = "#999999";
		var bar_thickness = c_h/10;
		ctx.fillRect(0,c_h/2-bar_thickness/2,c_w,bar_thickness);
		drow_plates(c_w, c_h, ctx, plates);
	}
}
