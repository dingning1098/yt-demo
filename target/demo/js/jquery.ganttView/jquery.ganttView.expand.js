/**
 * 增加禁航區
 * @param div
 * @param opt
 * @param data
 */
function addContainers(div,opt,data,con_clazz) {
	div = jQuery(".ganttview-slide-container",div);
	var height = opt.cellHeight+1;
	var cellWidth = opt.cellWidth;
	var scale = opt.scale;
	//計算右側行數
	var data_num = 0;
	
	data_num = $(".ganttview-vtheader .ganttview-vtheader-series-name").length;
	
	var h = height*data_num;
	var con_clazz_ = "ganttview-bans ";
	if(con_clazz != undefined){
		con_clazz_ += con_clazz;
	}
	var bansDiv = jQuery("<div>", { "class": con_clazz_ });
	
	
	var ban_data = {};
	if(data)
		ban_data = data;
	else
		ban_data = opt.data.data.blocks;
	
	var ban_data_length = ban_data.length;
	
	for(var i = 0;i<ban_data_length;i++){
		var ban = ban_data[i];
		
		var id = ban.id;
		var name = ban.name;
		id = id +"_"+name;
    	var start = ban.start;
    	var end = ban.end;
    	var clazz = ban.clazz;
    	if(clazz != undefined){
    		clazz = "ganttview-bans-container "+clazz;
    	}
    	var w = 0;
    	var m_l = 0;
    	var size = DateUtils.daysBetween(start, end,scale);
		var offset = DateUtils.offSet(opt.start, start,scale);
		
		if(size < 0){
			alert("請檢查起始結束時間")
			return;
		}
		
		w = (size * cellWidth);
    	
        var ban_container = jQuery("<div>", {
            "class": clazz,
            "css": {
                "height": h + "px",
                "float":'left',
                "width": w + "px",
                "margin-left": ((offset * cellWidth)) + "px"
            }
        });
        
        var title_length = ban.title.length;
        
        var ban = jQuery("<div>", {
        	"id":id,
            "class": "ganttview-ban",
            "title": ban.title,
            'css':{
            	"line-height":h + "px",
            	'font-size':h/(title_length+data_num) + "px"
            }
        }).text(ban.title);
        
        ban.appendTo(ban_container);
        ban_container.appendTo(bansDiv);
	}
	
    div.append(bansDiv);
}

function clearBlocks(div,id){
	div = jQuery(".ganttview-blocks",div);
	if(id != undefined){
		jQuery("#"+id).remove();
	}else{
		div.remove();
	}
}

function clearContainers(div,id){
	div = jQuery(".ganttview-bans ",div);
	if(id != undefined){
		jQuery("#"+id).parent().remove();
	}else{
		div.remove();
	}
}

/**
 * 添加實際發生情況
 * 
 * 根據block屬性查找到block，複製block 
 * @param div
 * @param opt
 * @param data
 * @param con_clazz
 */
function addFactBlocks(opts,data) {
	var start = opts.start;
	var scale = opts.scale;
	var cellWidth = opts.cellWidth;
	var cellHeight = opts.cellHeight;
	
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].series.length; j++) {
        	for(var z = 0;z < data[i].series[j].blocks.length;z++){
        		var series = data[i].series[j];
                var bk = series.blocks[z];
                var size = DateUtils.daysBetween(bk.start, bk.end,scale);
                
                var name = bk.name;
                var clazz = "ganttview-block ganttview-block-fact ";
                if(bk.clazz != undefined){
                	clazz += bk.clazz;
                }
				var offset = DateUtils.offSet(start, bk.start,scale);
				var id = bk.id;
				var block_id = id+"_"+name;
				var block_id_fact = block_id +"_fact";
				
				
				var block = jQuery("#"+block_id_fact);
				
				if(block == undefined || block.length <1){
					block = jQuery("#"+block_id).clone();
					block.attr("id",block_id_fact);
				}
				
				block.attr("class",clazz);
				block.attr("title",bk.desc);
                //顯示顏色
				block.css({
                    "width": ((size * cellWidth)-3) + "px",
                    "height":cellHeight-10 + "px",
                    "background-color":data[i].series[j].color,
                    "margin-left": ((offset * cellWidth)) + "px"
                });
				
				var blockData = { id: bk.id, name: bk.name,start:bk.start,end:bk.end,desc:bk.desc};
	        	jQuery.extend(blockData, series);
	        	block.data("block-data", blockData);
				
				
				block_text_clazz = "ganttview-block-text-fact";
				
				
				jQuery(".ganttview-block-text", block).attr("class",block_text_clazz);
                
                block.appendTo($("#"+block_id).parent())
        	}
        	
        }
    }
}

function clearFactBlocks(div,id){
	div = jQuery(".ganttview-block-fact",div);
	if(id != undefined){
		jQuery("#"+id).remove();
	}else{
		div.remove();
	}
}


/**
 * 添加线
 * @param div
 * @param opt
 * @param data
 */
function addVline(div,opt,data){
	div = jQuery(".ganttview-slide-container",div);
	var height = opt.cellHeight+1;
	var cellWidth = opt.cellWidth;
	var scale = opt.scale;
	if(data == undefined){
		data = opt.data.data.lines;
	}
	
	//計算右側行數
	var data_num = data.length;
	var rows_num = 0;
	
	rows_num = $(".ganttview-vtheader .ganttview-vtheader-series-name").length;
	
	var h = height*rows_num;
	var con_clazz_ = "ganttview-lines ";
	
	var bansDiv = jQuery(".ganttview-lines",div);
	
	if(bansDiv == undefined || bansDiv.length<1)
		bansDiv = jQuery("<div>", { "class": con_clazz_ });
	
	var ban_data = data;
	var ban_data_length = ban_data.length;
	
	for(var i = 0;i<ban_data_length;i++){
		var ban = ban_data[i];
    	var start = opt.start;
    	var end = ban.time;
    	
    	var m_l = 0;
		var offset = DateUtils.offSet(start, end,scale);
        var title = ban.title;
        var color = ban.color;
        var id = ban.name;
        var clazz = ban.clazz;
        var ban = jQuery("#"+id);
        if(ban == undefined || ban.length <1){
        	ban = jQuery("<div>", {
            	"id":id,
        		"title":title+end,
        		"class":clazz
            });
        }
        ban.css({
                    "height": h + "px",
                    "float":'left',
                    "width": "2px",
                    "position":'absolute',
                    "margin-left": ((offset * cellWidth)) + "px"
                });
        var ban_span = jQuery("<span>").text(title+end);
       
        
        ban.appendTo(bansDiv);
        
	}
	div.append(bansDiv);
	
}

/**
 * 删除线
 * @param div
 * @param id
 */
function clearLine(div,id){
	div = jQuery(".ganttview-lines ",div);
	if(id != undefined){
		jQuery("#"+id).remove();
	}else{
		div.remove();
	}
	
}

function addBlocks(div, opts,data) {
	if(data == undefined)
		data = opts.data;
	var cellWidth = opts.cellWidth;
	var cellHeight = opts.cellHeight;
	var start = opts.start;
	var scale = opts.scale;
	
    
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].series.length; j++) {
        	for(var z = 0;z < data[i].series[j].blocks.length;z++){
        		var rows_id = data[i].id+"_"+data[i].series[j].id;
        		var series = data[i].series[j];
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
                if (data[i].series[j].color) {
                    block.css("background-color", data[i].series[j].color);
                }
                block.append(jQuery("<div>", { "class": "ganttview-block-text" }).text(name));
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

function addUnplan(div,opt,data) {
	div = jQuery(".ganttview",div);
	var bansDiv = jQuery(".ganttview-unplans",div);
	
	if(bansDiv == undefined || bansDiv.length<1)
		bansDiv = jQuery("<div>", { "class": "unplans" });
	var ban_data = {};
	if(data)
		ban_data = data;
	else
		ban_data = opt.data.data.unPlans;
	
	var ban_data_length = ban_data.length;
	
	for(var i = 0;i<ban_data_length;i++){
		var ban = ban_data[i];
		
		var id = ban.id;
		var name = ban.name;
		id = id +"_"+name;
    	
    	var clazz = ban.clazz;
    	if(clazz != undefined){
    		clazz = "ganttview-unplan-container "+clazz;
    	}
    	
		var w = 100;
    	
        var ban_container = jQuery("<div>", {
            "class": clazz,
            "css": {
                "float":'left',
                "width": w + "px"
            }
        });
        
        
        var ban = jQuery("<div>", {
        	"id":id,
            "class": "ganttview-unplan"
        }).text(name);
        
        ban.appendTo(ban_container);
        ban_container.appendTo(bansDiv);
	}
	
    div.append(bansDiv);
}