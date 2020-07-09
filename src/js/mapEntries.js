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
            {index: 1, name: "1st Floor", background:true, tactical:true},
            {index: 2, name: "2nd Floor", tactical:true},
            {index: 3, name: "Roof"}
        ]
    }
]


export default mapEntries
