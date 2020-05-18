const _Gen_COURSE_Ical = require('./modules/GenCOURSEIcal')
//https://benterdev.github.io/MyIcal/export/kcb36.ics
var setterminfo = {
    'FirstDay': "Sept 01 2019", //学期第一个星期天
    'TermTime': "2019-2020-1", //学期
    'Output': "kcb47.ics", //输出文件名称,位于export文件夹内
    'MaxTerm': "20" //最大周数
};

var kbxx = [{"kcmc":"形势与政策(5)","kcbh":"1400065","jxbmc":"160712,160714,161101,161102","kcrwdm":"1069714","jcdm2":"03,04","zcs":"6,9,8,7","xq":"3","jxcdmcs":"北主楼805","teaxms":"潘立伟"},{"kcmc":"化工热力学","kcbh":"1100430","jxbmc":"171106","kcrwdm":"1070635","jcdm2":"05,06","zcs":"1,8,7,6,5,4,3,2","xq":"1","jxcdmcs":"南主楼543","teaxms":"贺拂"},{"kcmc":"化工热力学","kcbh":"1100430","jxbmc":"171106","kcrwdm":"1070635","jcdm2":"03,04","zcs":"1,8,7,6,5,4,3,2","xq":"3","jxcdmcs":"南主楼505","teaxms":"贺拂"},{"kcmc":"专业实验","kcbh":"1100460","jxbmc":"161101","kcrwdm":"1070710","jcdm2":"01,02,03,04,05,06,07","zcs":"8","xq":"1","jxcdmcs":"德胜楼702","teaxms":"朱忠智"},{"kcmc":"专业实验","kcbh":"1100460","jxbmc":"161101","kcrwdm":"1070710","jcdm2":"01,02,03,04,05,06,07,08","zcs":"6,7","xq":"1","jxcdmcs":"德胜楼702","teaxms":"朱忠智"},{"kcmc":"专业实验","kcbh":"1100460","jxbmc":"161101","kcrwdm":"1070710","jcdm2":"01,02,03,04,05,06,07,08,09","zcs":"4","xq":"3","jxcdmcs":"德胜楼702","teaxms":"朱忠智"}];
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