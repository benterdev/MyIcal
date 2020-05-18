var lunar2solar = require('./modules/lunarTOsolar');
var solar2lunar = require('./modules/solarTOlunar');
var Number2Chs = require('./modules/NumberToChinese')
var AddDate = require('./modules/AddDate')
var fs = require('fs');

var FileName = "anny.ics";
var Anniversaries = [
    //暂时无法使用年份
    //[ 名   称     , 年 份 ,月份   , 日期  ,农(l)/公(s)历,提前提醒日   ],
    ["我生日"       ,       , "2"   , "2"   , "s"       , "1,3"     ],
    ["我生日"       ,       , "12"  , "25"  , "l"       , "1,3"     ],
    ["文婷生日"     ,       , "11"  , "19"  , "l"       , "1,3"     ],
    ["春晓生日"     ,       , "2"   , "17"  , "l"       , "1,3"     ],
    ["上豪生日"     ,       , "9"   , "19"  , "l"       , "1,3"     ],
    ["妈生日"       ,       , "5"   , "24"  , "l"       , "1,3"     ],
    ["爸生日"       ,       , "10"  , "18"  , "l"       , "1,3"     ],
    //[             ,       ,       ,       , "s"       ,          ],
];

//获得当前时间
var nowtime = new Date();

function padZero(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}
var datestamp = (nowtime.getFullYear()) + (padZero((nowtime.getMonth() + 1), 2) + padZero(("0" + nowtime.getDate()).slice(-2), 2));
var timestamp = String((padZero(nowtime.getHours(), 2)) + String(padZero(nowtime.getMinutes()), 2)) + String(padZero(nowtime.getSeconds(), 2));

nowdate = solar2lunar(nowtime.getFullYear(), (nowtime.getMonth() + 1), nowtime.getDate());

var reminders = [];
for (var i = 0; i < Anniversaries.length; i++) {
    for (var r = -2; r < 5; r++) {
        var Zr_item = {
            'pid': i,
            'Name': Anniversaries[i][0],
            'Year': Anniversaries[i][1],
            'Month': Anniversaries[i][2],
            'Day': Anniversaries[i][3],
            'Type': Anniversaries[i][4],
            'RDays': 0,
            'r': r
        }
        reminders.push(Zr_item);
        Anniversaries[i][5].split(",").forEach(function (item) {
            var itemName = Number2Chs(item) + "天后：" + Anniversaries[i][0];
            var Ann_item = {
                'pid': i,
                'Name': itemName,
                'Year': Anniversaries[i][1],
                'Month': Anniversaries[i][2],
                'Day': Anniversaries[i][3],
                'Type': Anniversaries[i][4],
                'RDays': item,
                'r': r
            }
            reminders.push(Ann_item);
        });
    }
}

function GetDaysUp(param) {
    if (param.Type === "l") {
        var ADate = lunar2solar((parseInt(nowdate.lYear) + param.r), param.Month, parseInt(param.Day));
        var _BGDate = new Date();
        _BGDate.setFullYear(ADate.cYear, (parseInt(ADate.cMonth) - 1), parseInt(ADate.cDay));
        var bgDate = AddDate((0 - parseInt(param.RDays)), _BGDate);
        var edDate = AddDate((1 - parseInt(param.RDays)), _BGDate);
    };
    if (param.Type === "s") {
        var ADate = solar2lunar((parseInt(nowdate.cYear) + param.r), param.Month, parseInt(param.Day));
        var _BGDate = new Date();
        _BGDate.setFullYear(ADate.cYear, (parseInt(ADate.cMonth) - 1), parseInt(ADate.cDay));
        var bgDate = AddDate((0 - parseInt(param.RDays)), _BGDate);
        var edDate = AddDate((1 - parseInt(param.RDays)), _BGDate);
    };
    if (param.Year) {
        var STR = {
            'Name': param.Name + "(" + Number2Chs(DYear) + ")",
            'BDateStamp': bgDate.datestamp,
            'EDateStamp': edDate.datestamp,
            'pid': param.pid
        }
    } else {
        var STR = {
            'Name': param.Name,
            'BDateStamp': bgDate.datestamp,
            'EDateStamp': edDate.datestamp,
            'pid': param.pid
        }
    }
    return STR;
}

class _Gen_ANNI_Ical {
    constructor(FileName) {
        this.Output = FileName;
        this.initDay = AddDate(0).datestamp
    }

    WriteHeader() {
        var ICalHearder = "BEGIN:VCALENDAR\r\n";
        ICalHearder += "PRODID:-//DongWeiZhi//benterdev@outlook.com//CN\r\n";
        ICalHearder += "VERSION:2.0\r\n";
        ICalHearder += "CALSCALE:GREGORIAN\r\n";
        ICalHearder += "METHOD:PUBLISH\r\n";
        ICalHearder += "X-WR-CALNAME:日历：纪念日\r\n";
        ICalHearder += "X-WR-TIMEZONE:Asia/Shanghai\r\n";
        ICalHearder += "X-WR-CALDESC:纪念日日历。\r\n";
        fs.writeFile("./export/" + this.Output, ICalHearder, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        console.log("Header writen!");
    };

    WriteBodies(param) {
        for (var q = 0; q < param.length; q++) {
            var ICalEvent = "BEGIN:VEVENT\r\n";
            ICalEvent += "CLASS:PUBLIC\r\n";
            ICalEvent += "CREATED:" + this.initDay + "T000000Z\r\n";
            ICalEvent += "LAST-MODIFIED:" + datestamp + "T" + timestamp + "Z\r\n";
            ICalEvent += "UID:" + param[q].BDateStamp + "x" +param[q].pid + "@benterdev.anny\r\n";
            ICalEvent += "DTSTART;VALUE=DATE:" + param[q].BDateStamp + "\r\n";
            ICalEvent += "DTEND;VALUE=DATE:" + param[q].EDateStamp + "\r\n";
            ICalEvent += "STATUS:CONFIRMED\r\n";
            ICalEvent += "SUMMARY:" + param[q].Name + "\r\n";
            ICalEvent += "END:VEVENT\r\n";
            fs.appendFile("./export/" + this.Output, ICalEvent, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        };
        console.log(param.length + " Event(s) be written!")
    };

    WriteFooter() {
        fs.appendFile("./export/" + this.Output, "END:VCALENDAR", function (err) {
            if (err) {
                return console.log(err);
            }
        });
        console.log("End writen!");
    };

};

var dlist = [];

for (var p = 0; p < reminders.length; p++) {
    dlist.push(GetDaysUp(reminders[p]));
}

var GenANNIcal = new _Gen_ANNI_Ical(FileName);

GenANNIcal.WriteHeader();
GenANNIcal.WriteBodies(dlist);
GenANNIcal.WriteFooter();