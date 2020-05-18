var fs = require('fs');
var NumberToChinese = require('./NumberToChinese');

var kblst = [];
var courselst = [];
var wklst = [];

function padZero(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

var time = new Date();
var datestamp = (time.getFullYear()) + (padZero((time.getMonth() + 1), 2) + padZero(("0" + time.getDate()).slice(-2), 2));
var timestamp = String((padZero(time.getHours(), 2)) + String(padZero(time.getMinutes()), 2)) + String(padZero(time.getSeconds(), 2));

function GenCOURSElist(kbxx, FirstDay) {
    for (var i = 0; i < kbxx.length; i++) {
        var kbitem = {
            'id': i,
            'Course': kbxx[i].kcmc,
            'Teacher': kbxx[i].teaxms,
            'ShortPosition': kbxx[i].pjxcdmcs,
            'Position': kbxx[i].jxcdmcs,
            'Day': parseInt(kbxx[i].xq),
            'Class': kbxx[i].jcdm2,
            'Week': kbxx[i].zcs
        };
        kblst.push(kbitem);

        var coursewk = kbxx[i].zcs.split(",");

        for (var j = 0; j < coursewk.length; j++) {
            var cld = ((7 * coursewk[j]) + parseInt(kbxx[i].xq) - 7);
            var courseitem = {
                'Course': kbxx[i].kcmc,
                'Teacher': kbxx[i].teaxms,
                'ShortPosition': kbxx[i].pjxcdmcs,
                'Position': kbxx[i].jxcdmcs,
                'Date': GetClassDate(cld, FirstDay).datestamp,
                'Durian': GetClassTime(kbxx[i].jcdm2)
            };
            courselst.push(courseitem);
        };
    }
    var CourseItems = {
        'kbItem': kbitem,
        'kcItem': courselst
    }
    return CourseItems;
}

var GetClassDate = require('./AddDate');
var GetClassTime = require('./GetClassTime');


class GenCOURSEIcal {
    constructor(param) {
        this.FirstDay = param.FirstDay;
        this.TermTime = param.TermTime;
        this.Output = param.Output;
        this.kbxx = param.kbxx
        this.initDay = GetClassDate(0, param.FirstDay).datestamp,
            this.MaxTerm = param.MaxTerm
    };

    WriteIcalHeader() {
        var ICalHearder = "BEGIN:VCALENDAR\r\n";
        ICalHearder += "PRODID:-//DongWeiZhi//benterdev@outlook.com//CN\r\n";
        ICalHearder += "VERSION:2.0\r\n";
        ICalHearder += "CALSCALE:GREGORIAN\r\n";
        ICalHearder += "METHOD:PUBLISH\r\n";
        ICalHearder += "X-WR-CALNAME:课程：" + this.TermTime + "课程表\r\n";
        ICalHearder += "X-WR-TIMEZONE:Asia/Shanghai\r\n";
        ICalHearder += "X-WR-CALDESC:" + this.TermTime + "课程表。\r\n";
        fs.writeFile("./export/" + this.Output, ICalHearder, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        console.log("Header writen!");
    }

    WriteCOURSEList() {
        var kbxx = this.kbxx
        for (var k = 0; k < kbxx.length; k++) {
            kbxx[k].pjxcdmcs = kbxx[k].jxcdmcs
            kbxx[k].pjxcdmcs = kbxx[k].pjxcdmcs.replace("南主楼", "南·");
            kbxx[k].pjxcdmcs = kbxx[k].pjxcdmcs.replace("北主楼", "北·");
            kbxx[k].pjxcdmcs = kbxx[k].pjxcdmcs.replace("德胜楼", "德·");
            kbxx[k].pjxcdmcs = kbxx[k].pjxcdmcs.replace("综合实验大楼", "综实·");
            kbxx[k].pjxcdmcs = kbxx[k].pjxcdmcs.replace("马兰芳教学楼", "马教·");
            kbxx[k].pjxcdmcs = kbxx[k].pjxcdmcs.replace("黄浩川教学楼", "黄教·");
            kbxx[k].pjxcdmcs = kbxx[k].pjxcdmcs.replace("继续教育学院", "继教·");
            kbxx[k].pjxcdmcs = kbxx[k].pjxcdmcs.replace("吕志和礼堂", "吕·礼堂");
        };
        var kclist = GenCOURSElist(kbxx, this.FirstDay);
        for (var i = 0; i < kclist.kcItem.length; i++) {
            var ICalEvent = "BEGIN:VEVENT\r\n";
            ICalEvent += "CLASS:PUBLIC\r\n";
            ICalEvent += "CREATED:" + this.initDay + "T000000Z\r\n";
            ICalEvent += "LAST-MODIFIED:" + datestamp + "T" + timestamp + "Z\r\n";
            ICalEvent += "UID:" + kclist.kcItem[i].Date + kclist.kcItem[i].Durian[0] + "@benterdev.course\r\n";
            ICalEvent += "DTSTART:" + kclist.kcItem[i].Date + "T" + kclist.kcItem[i].Durian[0] + "\r\n";
            ICalEvent += "DTEND:" + kclist.kcItem[i].Date + "T" + kclist.kcItem[i].Durian[1] + "\r\n";
            ICalEvent += "STATUS:CONFIRMED\r\n";
            ICalEvent += "LOCATION:" + kclist.kcItem[i].Position + "\r\n";
            ICalEvent += "SUMMARY:" + kclist.kcItem[i].ShortPosition + "/" + kclist.kcItem[i].Course + "/" + kclist.kcItem[i].Teacher + "\r\n";
            ICalEvent += "END:VEVENT\r\n";
            fs.appendFile("./export/" + this.Output, ICalEvent, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
            console.log("Class " + i + " writen!");
        }
    }

    WriteWeekList() {
        for (var i = 1; i <= parseInt(this.MaxTerm); i++) {
            var bday = (i * 7 - 7);
            var lday = (i * 7);
            var weekitem = {
                'weekid': i,
                'weeknum': "第" + NumberToChinese(i) + "周",
                'start': GetClassDate(bday, this.FirstDay).datestamp,
                'end': GetClassDate(lday, this.FirstDay).datestamp
            };
            wklst.push(weekitem);
        }
        for (var i = 0; i < wklst.length; i++) {
            var ICalWkNum = "BEGIN:VEVENT\r\n";
            ICalWkNum += "CLASS:PUBLIC\r\n";
            ICalWkNum += "CREATED:" + this.initDay + "T000000Z\r\n";
            ICalWkNum += "UID:" + wklst[i].start + "@benterdev.course.wklist\r\n";
            ICalWkNum += "DTSTART;VALUE=DATE:" + wklst[i].start + "\r\n";
            ICalWkNum += "DTEND;VALUE=DATE:" + wklst[i].end + "\r\n";
            ICalWkNum += "SUMMARY:" + wklst[i].weeknum + "\r\n";
            ICalWkNum += "END:VEVENT\r\n";
            fs.appendFile("./export/" + this.Output, ICalWkNum, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
            console.log("Week " + wklst[i].weekid + " writen!");
        }
    }

    WriteIcalFooter() {
        fs.appendFile("./export/" + this.Output, "END:VCALENDAR\r\n", function (err) {
            if (err) {
                return console.log(err);
            }
        });
        console.log("End" + " writen!");
    }

}

module.exports = GenCOURSEIcal;