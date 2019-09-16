/**
 * 計劃數據
 */
var ganttData = [
	{
		id: "a1", name: "同发港", series: [
			{ id:'1p1',name: "1#", blocks:[
			                      {id:'1001',name:'SHIP_1',desc:'SHIP_1_DESC',start: '2017-2-8 8:30', end: '2017-2-8 12:20',clazz:'s1'}
			                           ]},
			{ id:'1p2',name: "2#", blocks:[{id:'1002',name:'SHIP_2',desc:'SHIP_2_DESC',start: '2017-2-9 11:00', end: '2017-2-9 23:50',clazz:'s2'},
			                      ] },
            { id:'1p3',name: "3#", blocks:[{id:'1003',name:'SHIP_3',desc:'SHIP_2_DESC',start: '2017-2-8 19:00', end: '2017-2-9 1:50'},
			          			                      ] }
		]
	},
	{
		id: "a2", name: "無棣港", series: [
			{ id:'2p1',name: "1#", blocks:[
			                           {id:'2001',name:'SHIP_1',desc:'SHIP_1_DESC',start: '2017-2-8 10:30', end: '2017-2-8 14:20'}
			                           ]},
			{ id:'2p2',name: "2#", blocks:[{id:'2002',name:'SHIP_2',desc:'SHIP_2_DESC',start: '2017-2-9 1:00', end: '2017-2-9 12:50'},
			                      ] }
		]
	},
	{
		id: "a3", name: "創業港", series: [
			{ id:'3p1',name: "1#", blocks:[
			                           {id:'3001',name:'SHIP_1',desc:'SHIP_1_DESC',start: '2017-2-8 8:0', end: '2017-2-8 9:20'}
			                           ]},
			{ id:'3p2',name: "2#", blocks:[{id:'3002',name:'SHIP_2',desc:'SHIP_2_DESC',start: '2017-2-8 9:30', end: '2017-2-8 20:50'},
			                      ] },
            { id:'3p3',name: "3#", blocks:[{id:'3003',name:'SHIP_3',desc:'SHIP_2_DESC',start: '2017-2-8 19:00', end: '2017-2-9 1:50'},
			          			                      ] }
		]
	}
];

/**
 * 自定義數據
 */
var banData = {
		series:[{
			id:'J001',
			name:'J001_name',
			title:'禁航期',
			clazz:'ban',
			start: '2017-2-8 14:30', 
			end: '2017-2-8 18:00'},
			{
				id:'J002',
				name:'J002_name',
				title:'大霧影響作業',
				clazz:'ban2',
				start: '2017-2-9 3:30', 
				end: '2017-2-9 8:10'}
		]
} 

/**
 * 實際數據
 */
var factGanttData = [
             	{
             		id: 1, name: "同发港", series: [
             			{ name: "1#", blocks:[
             			                      {id:'1001',name:'SHIP_1',desc:'船SHIP_1由於機械原因計劃推遲兩小時十分鐘',start: '2017-2-8 9:30', end: '2017-2-8 13:20',clazz:'s1'}
             			                           ]},
                         { name: "3#", blocks:[{id:'1003',name:'SHIP_3',desc:'SHIP_2_DESC#',start: '2017-2-8 19:00', end: '2017-2-9 2:30'},
             			          			                      ] }
             		]
             	}
             ];

var line_data = {
		series:[{ id:'1',name: "now", title:'当前时间',time:'2017-2-8 20:30',color:'#000'},
      			{ id:'2',name: "start", title:'低潮时间',time:'2017-2-8 10:30',color:'blue'},
      			{ id:'3',name: "end", title:'高潮时间',time:'2017-2-8 22:30',color:'blue'}
		]
} 
