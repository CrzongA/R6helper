const mapEntries =
[
    {
        location: "bank",
        levelCount:4,
        lowestLevel:0,
        tacticalLevelCount:3,
        tacticalLowestLevel:0,
        bgMapDimension:{width:2560, height:1440},
        bgOffset:{x:674, y:178},
        orgMapDimension:{width:1175, height:1032},
        tacMapDimension:{width:2309, height:1732},
        levels: [
            {index: 0, name: "Basement", short: "B",background:true, tactical:true},
            {index: 1, name: "1st floor", short: "1", tactical:true},
            {index: 2, name: "2st floor", short: "2", tactical:true},
            {index: 3, name: "Roof", short: "R"}
        ]
        },
    {
        location: "border",
        levelCount: 3,
        lowestLevel: 1,
        tacticalLevelCount:2,
        tacticalLowestLevel:1,
        bgMapDimension: {width: 2560, height: 1440},
        bgOffset: {x:915, y:185},
        orgMapDimension: {width:786, height: 753},
        tacMapDimension: {width: 2309, height: 1732},
        levels: [
            {index: 1, name: "1st Floor", short: "1" , background:true, tactical:true},
            {index: 2, name: "2nd Floor", short: "2" , tactical:true},
            {index: 3, name: "Roof", short: "R"}
        ]
    },
	{
        location: "bartlett",
        levelCount: 3,
        lowestLevel: 1,
        bgMapDimension: {width: 2560, height: 1440},
        bgOffset: {x:250, y:824},
        orgMapDimension: {width:1236, height: 845},
        levels: [
            {index: 1, name: "1st Floor", background:true},
            {index: 2, name: "2nd Floor"},
            {index: 3, name: "Roof"}
        ]
    },
	{
        location: "chalet",
        levelCount: 4,
        lowestLevel: 0,
        tacticalLevelCount:3,
        tacticalLowestLevel:1,
        bgMapDimension: {width: 2560, height: 1440},
        bgOffset: {x:933, y:159},
        orgMapDimension: {width:1069, height: 1066},
        tacMapDimension: {width: 5000, height: 3750},
        levels: [
            {index: 0, name: "Basement", short: "B",background:true, tactical:true},
            {index: 1, name: "1st floor", short: "1", tactical:true},
            {index: 2, name: "2st floor", short: "2", tactical:true},
            {index: 3, name: "Roof", short: "R"}
        ]
    },
	{
        location: "club",
        levelCount: 4,
        lowestLevel: 0,
        tacticalLevelCount:3,
        tacticalLowestLevel:1,
        bgMapDimension: {width: 3680, height: 2070},
        bgOffset: {x:1939, y:626},
        orgMapDimension: {width:844, height: 791},
        tacMapDimension: {width: 5000, height: 3750},
        levels: [
            {index: 0, name: "Basement", short: "B",background:true, tactical:true},
            {index: 1, name: "1st floor", short: "1", tactical:true},
            {index: 2, name: "2st floor", short: "2", tactical:true},
            {index: 3, name: "Roof", short: "R"}
        ]
    },
	{
        location: "coastline",
        levelCount: 3,
        lowestLevel: 1,
        tacticalLevelCount:2,
        tacticalLowestLevel:1,
        bgMapDimension: {width: 2560, height: 1440},
        bgOffset: {x:895, y:474},
        orgMapDimension: {width:756, height: 784},
        tacMapDimension: {width: 5000, height: 3750},
        levels: [
            {index: 1, name: "1st Floor", short: "1" , background:true, tactical:true},
            {index: 2, name: "2nd Floor", short: "2" , tactical:true},
            {index: 3, name: "Roof", short: "R"}
        ]
    },
	{
        location: "consulate",
        levelCount: 4,
        lowestLevel: 0,
        tacticalLevelCount:3,
        tacticalLowestLevel:1,
        bgMapDimension: {width: 2560, height: 1440},
        bgOffset: {x:823, y:433},
        orgMapDimension: {width:1039, height: 694},
        tacMapDimension: {width: 5000, height: 3750},
        levels: [
            {index: 0, name: "Basement", short: "B",background:true, tactical:true},
            {index: 1, name: "1st floor", short: "1", tactical:true},
            {index: 2, name: "2nd floor", short: "2", tactical:true},
            {index: 3, name: "Roof", short: "R"}
        ]
    },
	{
        location: "favela",
        levelCount: 4,
        lowestLevel: 0,
        tacticalLevelCount:3,
        tacticalLowestLevel:1,
        bgMapDimension: {width: 2560, height: 1440},
        bgOffset: {x:504, y:304},
        orgMapDimension: {width:1260, height: 1013},
        tacMapDimension: {width: 5000, height: 3750},
        levels: [
            {index: 1, name: "1st floor", short: "B",background:true, tactical:true},
            {index: 2, name: "2nd floor", short: "1", tactical:true},
            {index: 3, name: "3rd floor", short: "2", tactical:true},
            {index: 4, name: "Roof", short: "R"}
        ]
    },
	{
        location: "hereford",
        levelCount: 5,
        lowestLevel: 0,
        bgMapDimension: {width: 1556, height: 1332},
        orgMapDimension: {width: 454, height: 432},
        levels: [
            {index: 0,top: -1433, left: -2221, name: "Basement", short: "B",background:true},
            {index: 1,top: 1195, left: 1971, name: "1st floor", short: "1"},
            {index: 2,top: 1150, left: 1971, name: "2nd floor", short: "2"},
            {index: 3,top: 1149, left: 1971 ,name: "3rd floor", short: "3"},
			{index: 4,top: 1149, left: 1971 ,name: "Roof", short: "R"}
        ]
    },
	{
        location: "house",
        levelCount: 4,
        lowestLevel: 0,
        bgMapDimension: {width: 2560, height: 1440},
        orgMapDimension: {width: 700, height: 520},
        levels: [
            {index: 0, name: "Basement", short: "B",background:true},
            {index: 1,top: 464, left: 893, name: "1st floor", short: "1"},
            {index: 2,top: 464, left: 893, name: "2nd floor", short: "2"},
			{index: 3,top: 464, left: 893, name: "Roof", short: "R"}
        ]
    },
	{
        location: "kafe",
        levelCount: 5,
        lowestLevel: -1,
        bgMapDimension: {width: 3535, height: 1988},
        orgMapDimension: {width: 808, height: 456},
        levels: [
            {index: 0, name: "subBasement", short: "SB",background:true},
            {index: 1,top: 1004, left: 2213 ,name: "basement", short: "B",tactical:true},
            {index: 2,top: 997, left: 2215 ,name: "1st floor", short: "1",tactical:true},
            {index: 3,top: 983, left: 2215 ,name: "2nd floor", short: "2",tactical:true},
			{index: 4,top: 983, left: 2215 ,name: "Roof", short: "R"}
        ]
    },
    {
        location: "kanal",
        levelCount: 5,
        lowestLevel: 0,
        bgMapDimension: {width: 1784, height: 1004},
        orgMapDimension: {width: 751, height: 572 },
        levels: [
            {index: 0,top: -525, left: -815, name: "Basement", short: "B",background:true,tactical:true},
            {index: 1,top: 1097, left: 1566, name: "1st floor", short: "1",tactical:true},
            {index: 2,top: 1131, left: 1521, name: "2nd floor", short: "2",tactical:true,},
            {index: 3,top: 1160, left: 1550, name: "3rd floor", short: "3",tactical:true,},
            {index: 4,top: 1162, left: 1542, name: "Roof", short: "R"}
        ]
    },
    {
        location: "oregon",
        levelCount: 5,
        lowestLevel: 0,
        bgMapDimension: {width: 1784, height: 1004},
        orgMapDimension: {width: 751, height: 572 },
        levels: [
            {index: 0,top: -525, left: -815, name: "Basement", short: "B",background:true,tactical:true},
            {index: 1,top: 1097, left: 1566, name: "1st floor", short: "1",tactical:true},
            {index: 2,top: 1131, left: 1521, name: "2nd floor", short: "2",tactical:true,},
            {index: 3,top: 1160, left: 1550, name: "3rd floor", short: "3",tactical:true,},
			{index: 4,top: 1162, left: 1542, name: "Roof", short: "R"}
        ]
    },
	{
        location: "outback",
        levelCount: 3,
        lowestLevel: 1,
        bgMapDimension: {width: 3977, height: 2237},
        orgMapDimension: {width: 669, height: 611},
        levels: [
            {index: 0,top: -1118, left: -2538, name: "",background:true},
            {index: 1,top: 1729, left: 3207, name: "1st floor", short: "1"},
            {index: 2,top: 1733, left: 3210, name: "2nd floor", short: "2"},
			{index: 3,top: 1742, left: 3218, name: "Roof", short: "R"}
        ]
    },
	{
        location: "plane",
        levelCount: 4,
        lowestLevel: 1,
        bgMapDimension: {width: 2560, height: 1440},
        orgMapDimension: {width: 1538, height: 1440},
        levels: [
            {index: 0,top: -715, left: -1275, name: "1st floor", short: "1",background:true},
            {index: 1,top: 2155, left: 2813, name: "2nd floor", short: "2"},
            {index: 2,top: 2155, left: 2813, name: "3rd floor", short: "3"},
			{index: 3,top: 2155, left: 2813, name: "Roof", short: "R"}
        ]
    },

	{
        location: "skyscrapper",
        levelCount: 3,
        lowestLevel: 1,
        bgMapDimension: {width: 2560, height: 1440},
        orgMapDimension: {width:1616, height: 1218},
        levels: [
            {index: 1, top: -715, left: -1275, name: "1st Floor", short: "1" , background:true},
            {index: 2, top: 1933, left: 2891, name: "2nd Floor", short: "2"},
            {index: 3, top: 1933, left: 2891, name: "Roof", short: "R"}
        ]
    },
	{
        location: "themepark",
        levelCount: 3,
        lowestLevel: 1,
        bgMapDimension: {width: 2432, height: 1698},
        orgMapDimension: {width:746, height:513},
        levels: [
            {index: 1, top: -806, left: -984,name: "",background:true},
            {index: 2, top: 1497, left: 1552,name: "1st floor", short: "1", tactical:true},
            {index: 3, top: 1326, left: 1764,name: "2nd floor", short: "2", tactical:true},
            {index: 4, top: 1340, left: 1786,name: "Roof", short: "R"}
        ]
    },
	{
        location: "tower",
        levelCount: 4,
        lowestLevel: 1,
        bgMapDimension: {width: 2560, height: 1440},
        orgMapDimension: {width:1418, height:1440},
        levels: [
            {index: 1, top: -715, left: -1275,name: "1st floor", short: "1",background:true,tactical:true},
            {index: 2, top: 2155, left: 2693,name: "2nd floor", short: "2", tactical:true},
            {index: 3, top: 2155, left: 3674,name: "3rd floor", short: "3"},
            {index: 4, top: 2155, left: 3674,name: "Roof", short: "R"}
        ]
    },
	{
        location: "oregon",
        levelCount: 5,
        lowestLevel: 1,
        bgMapDimension: {width: 2560, height: 1440},
        orgMapDimension: {width: 1821, height: 561 },
        levels: [
            {index: 1,top: -717, left: -1275, name: "1st floor", short: "1",background:true},
            {index: 2,top: 1278, left: 3096, name: "2nd floor", short: "2"},
            {index: 3,top: 1278, left: 3096, name: "3rd floor", short: "3"},
            {index: 4,top: 1278, left: 3096, name: "4th floor", short: "4"},
			{index: 5,top: 1278, left: 3096, name: "Roof", short: "R"}
        ]
    },
    {
        location: "villa",
        levelCount: 4,
        lowestLevel: 0,
        bgMapDimension: {width: 2560, height: 1440},
        orgMapDimension: {width: 646, height: 777},
        levels: [
            {index: 0, top: -720, left: -1280, name: "Basement", short: "B", background: true, tactical: true},
            {index: 1, top: 1497, left: 1926, name: "1st floor", short: "1", tactical: true,},
            {index: 2, top: 1515, left: 1926, name: "2nd floor", short: "2", tactical: true},
            {index: 3, top: 1515, left: 1926, name: "Roof", short: "R"}
        ]
    }
]


export default mapEntries
