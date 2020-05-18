var solar2lunar = require('./modules/solarTOlunar');
var GetDate = require('./modules/AddDate')
var fs = require('fs');

function padZero(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

var time = new Date();
var nowdatestamp = (time.getFullYear()) + (padZero((time.getMonth() + 1), 2) + padZero(("0" + time.getDate()).slice(-2), 2));
var nowtimestamp = String((padZero(time.getHours(), 2)) + String(padZero(time.getMinutes()), 2)) + String(padZero(time.getSeconds(), 2));

class _Export_Ical {
    constructor(OutFile) {
        this.Output = OutFile;
    };

    WriteHeader() {
        var ICalHearder = "BEGIN:VCALENDAR\r\n";
        ICalHearder += "PRODID:-//DongWeiZhi//benterdev@outlook.com//CN\r\n";
        ICalHearder += "VERSION:2.0\r\n";
        ICalHearder += "CALSCALE:GREGORIAN\r\n";
        ICalHearder += "METHOD:PUBLISH\r\n";
        ICalHearder += "X-WR-CALNAME:阴历\r\n";
        ICalHearder += "X-WR-TIMEZONE:Asia/Shanghai\r\n";
        ICalHearder += "X-WR-CALDESC:含有农历的日历\r\n";
        fs.writeFile("./export/" + this.Output, ICalHearder, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        console.log("Header writen!");
    }

    WriteList(param) {

        var begdatestamp = (String(param.s_year)) + (padZero(String(param.s_month), 2) + padZero((param.s_day), 2));
        var enddatestamp = (String(param.se_year)) + (padZero(String(param.se_month), 2) + padZero((param.se_day), 2));
        var ICalEvent = "BEGIN:VEVENT\r\n";
        ICalEvent += "CLASS:PUBLIC\r\n";
        ICalEvent += "CREATED:20181212T000000Z\r\n";
        ICalEvent += "LAST-MODIFIED:" + nowdatestamp + "T" + nowtimestamp + "Z\r\n";
        ICalEvent += "UID:" + begdatestamp + "@benterdev.calendar.lunar\r\n";
        ICalEvent += "DTSTART;VALUE=DATE:" + begdatestamp + "\r\n";
        ICalEvent += "DTEND;VALUE=DATE:" + enddatestamp + "\r\n";
        ICalEvent += "STATUS:CONFIRMED\r\n";
        ICalEvent += "SUMMARY:" + param.l_month + param.l_day + "(" + param.l_year + ")" + "\r\n";
        ICalEvent += "END:VEVENT\r\n";
        fs.appendFile("./export/" + this.Output, ICalEvent, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        if (param.l_term) {
            var ICalEvent = "BEGIN:VEVENT\r\n";
            ICalEvent += "CLASS:PUBLIC\r\n";
            ICalEvent += "CREATED:20181212T000000Z\r\n";
            ICalEvent += "LAST-MODIFIED:" + nowdatestamp + "T" + nowtimestamp + "Z\r\n";
            ICalEvent += "UID:" + begdatestamp + "@benterdev.calendar.term\r\n";
            ICalEvent += "DTSTART;VALUE=DATE:" + begdatestamp + "\r\n";
            ICalEvent += "DTEND;VALUE=DATE:" + enddatestamp + "\r\n";
            ICalEvent += "STATUS:CONFIRMED\r\n";
            ICalEvent += "SUMMARY:" + param.l_term + "\r\n";
            ICalEvent += "END:VEVENT\r\n";
            fs.appendFile("./export/" + this.Output, ICalEvent, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
        console.log("Day " + i + " writen!");


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
//https://benterdev.github.io/MyIcal/export/lcal.ics
var genCal = new _Export_Ical("lcal.ics");
genCal.WriteHeader();

for (var i = -3; i < 180; i++) {
    var stamp = GetDate(i);
    var estamp = GetDate((i + 1));
    var details = solar2lunar(stamp.year, stamp.month, stamp.day);
    var edetails = solar2lunar(estamp.year, estamp.month, estamp.day);
    var datedetails = {
        's_year': details.cYear,
        's_month': details.cMonth,
        's_day': details.cDay,
        'se_year': edetails.cYear,
        'se_month': edetails.cMonth,
        'se_day': edetails.cDay,
        'l_year': details.Animal,
        'l_month': details.IMonthCn,
        'l_day': details.IDayCn,
        'l_term': details.Term
    }
    genCal.WriteList(datedetails);
}

genCal.WriteIcalFooter();