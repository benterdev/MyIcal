function GetBeginTime(BeginTime) {
    switch (BeginTime) {
        case "01":
            return "081500";
        case "02":
            return "090500";
        case "03":
            return "101000";
        case "04":
            return "110000";
        case "05":
            return "144500";
        case "06":
            return "153500";
        case "07":
            return "163000";
        case "08":
            return "172000";
        case "09":
            return "193000";
        case "10":
            return "202500";
        case "11":
            return "211500";
        case "12":
            return "220500"
    }
}

function GetEndTime(EndTime) {
    switch (EndTime) {
        case "01":
            return "090000";
        case "02":
            return "095000";
        case "03":
            return "105500";
        case "04":
            return "114500";
        case "05":
            return "153000";
        case "06":
            return "162000";
        case "07":
            return "171500";
        case "08":
            return "180500";
        case "09":
            return "201500";
        case "10":
            return "211000";
        case "11":
            return "220000";
        case "12":
            return "225000"
    }
}

function GetClassTime(ClassNums) {
    var Classes = ClassNums.split(",");

    var max = Classes[0];
    for (var i = 1; i < Classes.length; i++) {
        if (parseInt(max) < parseInt(Classes[i])) max = Classes[i];
    }

    var min = Classes[0];
    for (var i = 1; i < Classes.length; i++) {
        if (parseInt(min) > parseInt(Classes[i])) min = Classes[i];
    }

    BeginClassTime = GetBeginTime(min);
    EndClassTime = GetEndTime(max);
    ClassTimeDurian = [BeginClassTime, EndClassTime];
    return ClassTimeDurian;
}

module.exports = GetClassTime;