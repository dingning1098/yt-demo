/*
jQuery.ganttView v.0.8.8
Copyright (c) 2010 JC Grubbs - jc.grubbs@devmynd.com
MIT License Applies
*/

/*
Options
-----------------
showWeekends: boolean
data: object
cellWidth: number
cellHeight: number
slideWidth: number
dataUrl: string
behavior: {
	clickable: boolean,
	draggable: boolean,
	resizable: boolean,
	onClick: function,
	onDrag: function,
	onResize: function
}
*/

(function (jQuery) {
	
    jQuery.fn.ganttView = function () {
    	
    	var args = Array.prototype.slice.call(arguments);
    	
    	if (args.length == 1 && typeof(args[0]) == "object") {
        	build.call(this, args[0]);
    	}
    	
    	if (args.length == 2 && typeof(args[0]) == "string") {
    		handleMethod.call(this, args[0], args[1]);
    	}
    };
    
    function build(options) {
    	var els = this;
        var defaults = {
            showWeekends: true,
            cellWidth: 31,
            cellHeight: 31,
            slideWidth: 400,
            vHeaderWidth: 100,
            scale : "days",//显示单位 months days hours
            behavior: {
            	clickable: true,
            	draggable: true,
            	resizable: true
            }
        };
        
        var opts = jQuery.extend(true, defaults, options);
//        $.data(this, 'gantt_view').options = opts;
        if (opts.data) {
			build();
		} else if (opts.dataUrl) {
			jQuery.getJSON(opts.dataUrl, function (data) { opts.data = data; build(); });
		}
		
		function build() {
//			console.log(opts.data)
			//起始结束
			var startEnd = DateUtils.getBoundaryDatesFromData(opts);
			opts.start = startEnd[0];
			opts.end = startEnd[1];
			
	        els.each(function () {

	            var container = jQuery(this);
	            var div = jQuery("<div>", { "class": "ganttview" });
	            new Chart(div, opts).render();
				container.append(div);
				
				var w = jQuery("div.ganttview-vtheader", container).outerWidth() +
					jQuery("div.ganttview-slide-container", container).outerWidth();
	            container.css("width", (w + 2) + "px");
	            
	            new Behavior(container, opts).apply();
	            
	            
	            
	            
	        });
		}
    }

	function handleMethod(method, value) {
		
		if (method == "setSlideWidth") {
			var div = $("div.ganttview", this);
			div.each(function () {
				var vtWidth = $("div.ganttview-vtheader", div).outerWidth();
				$(div).width(vtWidth + value + 1);
				$("div.ganttview-slide-container", this).width(value);
			});
		}
		
	}
	

	var Chart = function(div, opts) {
		
		function render() {
			addVtHeader(div, opts);

            var slideDiv = jQuery("<div>", {
                "class": "ganttview-slide-container",
                "css": { "width": opts.slideWidth + "px" }
            });
			
            dates = getDates(opts);
            addHzHeader(slideDiv, dates, opts);
            addGrid(slideDiv, dates,opts);
            
            
            addBlockContainers(slideDiv, opts,opts.data.data.portPlans);
            
            addBlocks(slideDiv, opts);
            div.append(slideDiv);
            applyLastClass(div.parent());
		}
		
		
		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		// Creates a 3 dimensional array [year][month][day] of every day 
		// between the given start and end dates
        function getDates(opts) {
        	//
        	var scale = opts.scale;
        	var start = new Date(opts.data.data.start);
        	var end = new Date(opts.data.data.end);
        	
        	var dates = [];
        	if(scale == 'hours'){
        		dates[start.getMonth()] = [];
    			dates[start.getMonth()][start.getDate()] = [start]
    			var last = start;
    			while (last.compareTo(end) == -1) {
    				var next = last.clone().addHours(1);
    				if (!dates[next.getMonth()]) { dates[next.getMonth()] = []; }
    				if (!dates[next.getMonth()][next.getDate()]) { 
    					dates[next.getMonth()][next.getDate()] = []; 
    				}
    				dates[next.getMonth()][next.getDate()].push(next);
    				last = next;
    			}
        	}else{
        		dates[start.getFullYear()] = [];
    			dates[start.getFullYear()][start.getMonth()] = [start]
    			var last = start;
    			while (last.compareTo(end) == -1) {
    				var next = last.clone().addDays(1);
    				if (!dates[next.getFullYear()]) { dates[next.getFullYear()] = []; }
    				if (!dates[next.getFullYear()][next.getMonth()]) { 
    					dates[next.getFullYear()][next.getMonth()] = []; 
    				}
    				dates[next.getFullYear()][next.getMonth()].push(next);
    				last = next;
    			}
        	}
			return dates;
        }

        function builder(div,opts) {
			addVtHeader(div, opts);

            var slideDiv = jQuery("<div>", {
                "class": "ganttview-slide-container",
                "css": { "width": opts.slideWidth + "px" }
            });
			
            dates = getDates(opts);
            addHzHeader(slideDiv, dates, opts);
            addGrid(slideDiv, dates,opts);
            
            
            addBlockContainers(slideDiv, opts.data.data.portPlans);
            //addBlockContainers(slideDiv, opts.data.data.portFacts);
            
            addBlocks(slideDiv, opts);
            div.append(slideDiv);
            applyLastClass(div.parent());
		}
        
        /**
         * 創建左側列表
         */
        function addVtHeader(div,opts) {
        	var data = opts.data.data.portPlans;
        	var cellHeight = opts.cellHeight;
        	
            var headerDiv = jQuery("<div>", { "class": "ganttview-vtheader" });
            for (var i = 0; i < data.length; i++) {
                var itemDiv = jQuery("<div>", { "class": "ganttview-vtheader-item" });
                itemDiv.append(jQuery("<div>", {
                	"id":data[i].id,
                    "class": "ganttview-vtheader-item-name",
                    "css": { "height": (data[i].series.length * (cellHeight-1)) + "px" }
                }).append(data[i].name));
                var seriesDiv = jQuery("<div>", { "class": "ganttview-vtheader-series" });
                for (var j = 0; j < data[i].series.length; j++) {
                    seriesDiv.append(jQuery("<div>", { id:data[i].series[j].id,"class": "ganttview-vtheader-series-name","css": { "height": cellHeight-1 + "px" } })
						.append(data[i].series[j].name));
                }
                itemDiv.append(seriesDiv);
                headerDiv.append(itemDiv);
            }
            div.append(headerDiv);
        }

        /**
         * 計算數組長度
         */
        function arrLength(arr){
        	var i = 0;
        	for(var m in arr){
        		if(m.length>0){
        			i++;
        		}
        	}
        	return i;
        }
        
        /**
         * 創建右側頭表
         */
        function addHzHeader(div, dates,opts) {
        	var cellWidth = opts.cellWidth;
        	var cellHeight = opts.cellHeight;
        	var scale = opts.scale;
        	
            var headerDiv = jQuery("<div>", { "class": "ganttview-hzheader" });
            var monthsDiv = jQuery("<div>", { "class": "ganttview-hzheader-months" });
            var daysDiv = jQuery("<div>", { "class": "ganttview-hzheader-days" });
            var totalW = 0;
			for (var y in dates) {
				for (var m in dates[y]) {
					var w = dates[y][m].length * cellWidth;
					totalW = totalW + w;
					if(scale == 'hours'){
						monthsDiv.append(jQuery("<div>", {
							"class": "ganttview-hzheader-month",
							"css": { "width": (w - 1) + "px" }
						}).append(m));
					}else{
						monthsDiv.append(jQuery("<div>", {
							"class": "ganttview-hzheader-month",
							"css": { "width": (w - 1) + "px" }
						}).append(monthNames[m] + "/" + y));
					}
					
					for (var d in dates[y][m]) {
						if(scale == 'hours'){
							if(typeof dates[y][m][d]!= 'function'){
								daysDiv.append(jQuery("<div>", { "class": "ganttview-hzheader-day","css":{width:cellWidth-1+"px"} })
										.append(dates[y][m][d].getHours()));
							}
							
						}else{
							daysDiv.append(jQuery("<div>", { "class": "ganttview-hzheader-day","css":{width:cellWidth-1+"px"} })
									.append(dates[y][m][d].getDate()));
						}
						
					}
				}
			}
            monthsDiv.css("width", totalW + "px");
            daysDiv.css("width", totalW + "px");
            headerDiv.append(monthsDiv).append(daysDiv);
            div.append(headerDiv);
            
            /**
             * 重新设置宽度
             */
            
			var vtWidth = $("div.ganttview-vtheader", div).outerWidth();
            var gridWidth = $("div.ganttview-hzheader-months",div).outerWidth();
            var width_all = vtWidth + gridWidth + 1;
            if(width_all>opts.slideWidth){
            	width_all = opts.slideWidth;
            }
            $(div).width(width_all);
            
        }

        /**
         * 創建圖表背景
         */
        function addGrid(div, dates,opts) {
        	var data = opts.data.data.portPlans;
        	var cellWidth = opts.cellWidth;
        	var cellHeight = opts.cellHeight;
        	var showWeekends = opts.showWeekends;
            var gridDiv = jQuery("<div>", { "class": "ganttview-grid" });
            var rowDiv = jQuery("<div>", { "class": "ganttview-grid-row" });
			for (var y in dates) {
				for (var m in dates[y]) {
					for (var d in dates[y][m]) {
						var cellDiv = jQuery("<div>", { "class": "ganttview-grid-row-cell","css":{width:cellWidth-1+"px",height:cellHeight-1+"px"} });
						if (DateUtils.isWeekend(dates[y][m][d]) && showWeekends) { 
							cellDiv.addClass("ganttview-weekend"); 
						}
						rowDiv.append(cellDiv);
					}
				}
			}
            var w = jQuery("div.ganttview-grid-row-cell", rowDiv).length * cellWidth;
            rowDiv.css("width", w + "px");
            gridDiv.css("width", w + "px");
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].series.length; j++) {
                    gridDiv.append(rowDiv.clone());
                }
            }
            div.append(gridDiv);
        }
        
        

        function addBlockContainers(div, opts,data) {
        	var d = opts.data;
        	if(data && data != undefined)
        		d = data;
        	var cellHeight = opts.cellHeight;
        	var blocksDiv = jQuery("<div>", { "class": "ganttview-blocks" });
            if(d != undefined)
            for (var i = 0; i < d.length; i++) {
                for (var j = 0; j < d[i].series.length; j++) {
                	var id = d[i].id+"_"+d[i].series[j].id
                    blocksDiv.append(jQuery("<div>", { "id":id,"class": "ganttview-block-container","height":cellHeight+"px"}));
                }
            }
            div.append(blocksDiv);
        }

        /**
         * 显示模块
         * 修改此模块，可以显示多段
         */
        function addBlocks(div, opts,data) {
        	if(data == undefined)
        		data = opts.data.data;
        	var cellWidth = opts.cellWidth;
        	var cellHeight = opts.cellHeight;
        	var start = opts.start;
        	var scale = opts.scale;
        	var plan_data = data.portPlans;
        	
        	
        	
            for (var i = 0; i < plan_data.length; i++) {
                for (var j = 0; j < plan_data[i].series.length; j++) {
                	for(var z = 0;z < plan_data[i].series[j].blocks.length;z++){
                		var rows_id = plan_data[i].id+"_"+plan_data[i].series[j].id;
                		var series = plan_data[i].series[j];
                        var bk = series.blocks[z];
                        var size = DateUtils.daysBetween(bk.start, bk.end,scale);
                        
                        var name = bk.name;
                        var clazz = "ganttview-block ";
                        if(bk.clazz != undefined){
                        	clazz += bk.clazz;
                        }
    					var offset = DateUtils.offSet(start, bk.start,scale);
    					var id = bk.id;
    					var block_id = id+"_"+name;
    					var block = jQuery("#"+block_id);
    					if(block == undefined || block.length<1){
    						block = jQuery("<div>", {
        						"id":block_id,
                                "class": clazz,
                                "title": bk.desc
                            });
    					}
    					block.css({
                                "width": ((size * cellWidth)-3) + "px",
                                "height":cellHeight-3 + "px",
                                "margin-left": ((offset * cellWidth)) + "px"
                            });
                        addBlockData(block, bk, series);
                        //顯示顏色
                        if (plan_data[i].series[j].color) {
                            block.css("background-color", data[i].portPlans.series[j].color);
                        }
                        block.append(jQuery("<div>", { "class": "ganttview-block-text" }).html(bk.desc));
                        
                        jQuery("#"+rows_id,div).append(block);
                	}
                	
                }
                
                
            }
        }
        
        function addBlockData(block, data, series) {
        	// This allows custom attributes to be added to the series data objects
        	// and makes them available to the 'data' argument of click, resize, and drag handlers
        	var blockData = { id: data.id, name: data.name,start:data.start,end:data.end,desc:data.desc};
        	jQuery.extend(blockData, series);
        	block.data("block-data", blockData);
        }

        function applyLastClass(div) {
            jQuery("div.ganttview-grid-row div.ganttview-grid-row-cell:last-child", div).addClass("last");
            jQuery("div.ganttview-hzheader-days div.ganttview-hzheader-day:last-child", div).addClass("last");
            jQuery("div.ganttview-hzheader-months div.ganttview-hzheader-month:last-child", div).addClass("last");
        }
		
		return {
			render: render
		};
	}

	var Behavior = function (div, opts) {
		
		function apply() {
			
			if (opts.behavior.clickable) { 
            	bindBlockClick(div, opts.behavior.onClick); 
        	}
        	
            if (opts.behavior.resizable) { 
            	bindBlockResize(div, opts.cellWidth, opts.start, opts.behavior.onResize,opts.scale); 
        	}
            
            if (opts.behavior.draggable) { 
            	bindBlockDrag(div, opts.cellWidth, opts.start, opts.behavior.onDrag,opts.scale); 
        	}
            
            
            onAfterShowData(div,opts);
    			
		}

		function onAfterShowData(div,opts) {
			if (opts.onAfterShowData) { opts.onAfterShowData(div,opts); }
        }
		
        function bindBlockClick(div, callback) {
            jQuery("div.ganttview-block", div).live("click", function () {
                if (callback) { callback(jQuery(this).data("block-data")); }
            });
        }
        
        function bindBlockResize(div, cellWidth, startDate, callback,scale) {
        	jQuery("div.ganttview-block", div).resizable({
        		grid: cellWidth, 
        		handles: "e,w",
        		stop: function () {
        			var block = jQuery(this);
        			updateDataAndPosition(div, block, cellWidth, startDate,scale);
        			if (callback) { callback(block.data("block-data")); }
        		}
        	});
        }
        
        function bindBlockDrag(div, cellWidth, startDate, callback,scale) {
        	jQuery("div.ganttview-block", div).draggable({
        		axis: "x", 
        		grid: [cellWidth, cellWidth],
        		stop: function () {
        			var block = jQuery(this);
        			updateDataAndPosition(div, block, cellWidth, startDate,scale);
        			if (callback) { callback(block.data("block-data")); }
        		}
        	});
        }
        
        /**
         * 更新位置和數據
         */
        function updateDataAndPosition(div, block, cellWidth, startDate,scale) {
        	var container = jQuery("div.ganttview-slide-container", div);
        	var scroll = container.scrollLeft();
			var offset = block.offset().left - container.offset().left - 1 + scroll;
			
			// Set new start date
			var daysFromStart = Math.round(offset / cellWidth);
			var newStart = startDate.clone().addDays(daysFromStart);
			block.data("block-data").start = newStart;

			// Set new end date
        	var width = block.outerWidth();
			var numberOfDays = width / cellWidth - 1;
			block.data("block-data").end = newStart.clone().addDays(numberOfDays);
			jQuery(block).attr("title",numberOfDays + 1);
			
			// Remove top and left properties to avoid incorrect block positioning,
        	// set position to relative to keep blocks relative to scrollbar when scrolling
			//
//			block.css("top", "").css("left", "").css("position", "relative").css("margin-left", offset + "px");
			block.css("top", "").css("left", "").css("margin-left", offset + "px");
        }
        
        return {
        	apply: apply	
        };
	}

})(jQuery);

var ArrayUtils = {
		
        contains: function (arr, obj) {
            var has = false;
            for (var i = 0; i < arr.length; i++) { if (arr[i] == obj) { has = true; } }
            return has;
        }
    };

var DateUtils = {
    	
        daysBetween: function (start, end,scale) {
            if (!start || !end) { return 0; }
            start = Date.parse(start); 
            end = Date.parse(end);
            
            var date_diff = end.getTime() - start.getTime();   //时间差的毫秒数  
            var count = 0;
            
            
            if("hours" == scale){
            	count= parseInt(date_diff) / parseInt(3600*1000);
        	}else{
        		//计算出相差天数  
                count = (parseInt(date_diff) / parseInt(24*3600*1000))+1;
        	}
            count = Math.round(parseFloat(count)*100)/100
            return count;
        },
        offSet: function (start,end,scale) {
        	if (!start || !end) { return 0; }
            start = Date.parse(start); 
            end = Date.parse(end);
            if("hours" == scale){
            	count= parseInt(end.getTime()-start.getTime()) / parseInt(3600*1000);
            }else{
            	count= parseInt(end.getTime()-start.getTime()) / parseInt(24*3600*1000);
            }
            return count;
        },
        isWeekend: function (date) {
        	if(typeof date!= 'function'){
        		return date.getDay() % 6 == 0;
        	}else{
        		return;
        	}
        },

        /**
         * 获取第一天 最后一天
         * 修改成获取开始时间和结束时间
         * 
         */
		getBoundaryDatesFromData: function (opts) {
			var minDays = Math.floor((opts.slideWidth / opts.cellWidth)  + 5);
			var data = opts.data;
			var scale = opts.scale;
			var minStart = new Date(); maxEnd = new Date();
			/*
			for (var i = 0; i < data.length; i++) {
				for (var j = 0; j < data[i].series.length; j++) {
					for(var z = 0;z < data[i].series[j].blocks.length;z++){
						var start = Date.parse(data[i].series[j].blocks[z].start);
						var end = Date.parse(data[i].series[j].blocks[z].end)
						if (i == 0 && j == 0 && z == 0) { minStart = start; maxEnd = end; }
						if (minStart-start > 0) { minStart = start; }
						if (maxEnd-end < 0) { maxEnd = end; }
					}
					
				}
			}*/
			minStart = new Date(opts.data.data.start ) ;
			maxEnd = new Date(opts.data.data.end);
			
			return [minStart, maxEnd];
		}
    };