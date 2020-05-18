const _Gen_COURSE_Ical = require('./modules/GenCOURSEIcal')
//https://benterdev.github.io/MyIcal/export/kcb36.ics
var setterminfo = {
    'FirstDay': "Feb 24 2019", //学期第一个星期天
    'TermTime': "2018-2019-2", //学期
    'Output': "kcb36.ics", //输出文件名称,位于export文件夹内
    'MaxTerm': "20" //最大周数
};

var kbxx = [{ "kcmc": "大学生职业规划与就业指导(2)", "kcbh": "0000042", "jxbmc": "160601,160602,160603,160604,161101,161102,161103,161104,161105,161106", "kcrwdm": "1056319", "jcdm2": "09,10,11", "zcs": "17,15,16", "xq": "4", "jxcdmcs": "吕志和礼堂", "teaxms": "张晓琳" }, { "kcmc": "化工设计", "kcbh": "1100420", "jxbmc": "161101,161102", "kcrwdm": "1056551", "jcdm2": "01,02", "zcs": "7,2,3,4,5,6", "xq": "1", "jxcdmcs": "南主楼239", "teaxms": "彭超" }, { "kcmc": "化工设计", "kcbh": "1100420", "jxbmc": "161101,161102", "kcrwdm": "1056551", "jcdm2": "03,04", "zcs": "3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,2", "xq": "4", "jxcdmcs": "南主楼501", "teaxms": "彭超" }, { "kcmc": "化学反应工程", "kcbh": "1100440", "jxbmc": "161101,161102", "kcrwdm": "1056553", "jcdm2": "09,10", "zcs": "19,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18", "xq": "1", "jxcdmcs": "北主楼703", "teaxms": "姜少华" }, { "kcmc": "化学反应工程", "kcbh": "1100440", "jxbmc": "161101,161102", "kcrwdm": "1056553", "jcdm2": "09,10", "zcs": "19,18", "xq": "4", "jxcdmcs": "北主楼203", "teaxms": "姜少华" }, { "kcmc": "分离工程", "kcbh": "1100450", "jxbmc": "161101,161102", "kcrwdm": "1056555", "jcdm2": "03,04", "zcs": "19,12,13,14,15,16,17,18", "xq": "1", "jxcdmcs": "南主楼417", "teaxms": "吴素平" }, { "kcmc": "分离工程", "kcbh": "1100450", "jxbmc": "161101,161102", "kcrwdm": "1056555", "jcdm2": "03,04", "zcs": "19,12,13,14,15,16,17,18", "xq": "3", "jxcdmcs": "南主楼427", "teaxms": "吴素平" }, { "kcmc": "化工过程分析与合成", "kcbh": "1100500", "jxbmc": "161101,161102", "kcrwdm": "1056559", "jcdm2": "05,06", "zcs": "13,2,3,4,5,6,7,8,9,10,11,12", "xq": "4", "jxcdmcs": "南主楼202", "teaxms": "贺拂" }, { "kcmc": "高分子化学与物理", "kcbh": "1100510", "jxbmc": "161101,161102", "kcrwdm": "1056561", "jcdm2": "03,04", "zcs": "11,2,3,4,5,6,7,8,9,10", "xq": "3", "jxcdmcs": "南主楼457", "teaxms": "贺拂" }, { "kcmc": "高分子化学与物理", "kcbh": "1100510", "jxbmc": "161101,161102", "kcrwdm": "1056561", "jcdm2": "03,04", "zcs": "11,2,3,4,5,6,7,8,9,10", "xq": "5", "jxcdmcs": "南主楼458", "teaxms": "贺拂" }, { "kcmc": "涂料与胶粘剂", "kcbh": "1100540", "jxbmc": "161101,161102,161106", "kcrwdm": "1056563", "jcdm2": "01,02", "zcs": "9,2,3,4,5,6,7,8", "xq": "3", "jxcdmcs": "南主楼212", "teaxms": "卿宁" }, { "kcmc": "涂料与胶粘剂", "kcbh": "1100540", "jxbmc": "161101,161102,161106", "kcrwdm": "1056563", "jcdm2": "05,06", "zcs": "9,2,3,4,5,6,7,8", "xq": "5", "jxcdmcs": "南主楼212", "teaxms": "卿宁" }];

var param = {
    'kbxx': kbxx,
    'FirstDay': setterminfo.FirstDay, //Sunday
    'TermTime': setterminfo.TermTime,
    'Output': setterminfo.Output,
    'MaxTerm': setterminfo.MaxTerm
};

var GenCOURSEIcal = new _Gen_COURSE_Ical(param);

GenCOURSEIcal.WriteIcalHeader();
GenCOURSEIcal.WriteWeekList();
GenCOURSEIcal.WriteCOURSEList();
GenCOURSEIcal.WriteIcalFooter();