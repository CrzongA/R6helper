const mapEntries =
[
    {
        location: "bank",
        levelCount:4,
        lowestLevel:0,
        levels: [
            {index: 0, name: "Basement", background:true, tactical:true},
            {index: 1, name: "1st floor", tactical:true},
            {index: 2, name: "2st floor", tactical:true},
            {index: 3, name: "Roof"}
        ]
        },
    {
        location: "border",
        levelCount: 3,
        lowestLevel: 1,
        levels: [
            {index: 1, name: "1st Floor", background:true, tactical:true},
            {index: 2, name: "2nd Floor", tactical:true},
            {index: 3, name: "Roof"}
        ]
    }
]


export default mapEntries
