//$(document).ready(function () {
/* sample test - see if setup is correct */
test("hello test", function () {
    ok(1 == "1", "Pass!");
});
// ----------------------------------------------------------------------------------
/* this tests checks if the configuration object works ok by creating an instance and checking its properties */
test('TableBuilder_ConstructTableConfiguration', function () {

    var t = new PwC_ClientFWK_Tables.TableConfiguration("this is my ID", "this is my name", "this is my CSS");
    ok(t.tableName == 'this is my name', "Pass!");
    ok(t.tableID == 'this is my ID', "Pass!");
    ok(t.tableCSSClass == 'this is my CSS', "Pass!");

});
// ----------------------------------------------------------------------------------
/* this tests checks if the configuration object works ok by creating an instance and checking its properties */
test('TableBuilder_ConstructTableConfiguration_AllowUndefinedOptionalStuff', function () {

    var t = new PwC_ClientFWK_Tables.TableConfiguration("this is my ID", "this is my name", "this is my CSS");
    ok(t.tableName == 'this is my name', "Pass!");
    ok(t.tableID == 'this is my ID', "Pass!");
    ok(t.tableCSSClass == 'this is my CSS', "Pass!");
    ok(t.border === undefined, "Pass!");
    ok(t.additionalStyle === undefined, "Pass!");

});
// ----------------------------------------------------------------------------------
/* tests a simple json interpolation (requires prototype.js) */
test('Test_SimpleTemplatingWithInterpolateJSON', function () {

    var json = { 'src': 'foo/bar.jpg', 'name': 'AAAA' };
    var html = "<div><img src='#{src}' /> #{name}</div>".interpolate(json);
    ok(html === "<div><img src='foo/bar.jpg' /> AAAA</div>", 'Pass!');

});
// ----------------------------------------------------------------------------------
/* tests that an invalid configuration object throws an exception */
test('TableBuilder_UndefineConfigurationObject_MustThrowException', function () {

    var t = new PwC_ClientFWK_Tables.TableConfiguration("this is my ID");
    raises(function () {
        var _ = PwC_ClientFWK_Tables.buildTable(t);
    }, 'Pass!');
});
// ----------------------------------------------------------------------------------
/* tests that an incomplete  configuration object throws an exception */
test('TableBuilder_RealTable_Incomplete_MustThrowException', function () {
    var t = undefined
    raises(function () {
        var _ = PwC_ClientFWK_Tables.buildTable(t);
    }, 'Pass!');
});
// ----------------------------------------------------------------------------------
/* this tests checks if the configuration object works ok by creating an instance and checking its properties */
test('TableBuilder_ShouldReturnCorrectlyFormedTableTag_Inline', function () {
    var t = new PwC_ClientFWK_Tables.TableConfiguration("table1", "table1", "tablecss");
    ok(t.tableName == 'table1', "Pass!");
    ok(t.tableID == 'table1', "Pass!");
    ok(t.tableCSSClass == 'tablecss', "Pass!");
    var htmlOuput,
                template = "<table id='#{tableID}' name='#{tableName}' class='#{tableCSSClass}'>";
    htmlOutput = template.interpolate(t);
    ok(htmlOutput === "<table id='table1' name='table1' class='tablecss'>", "Pass!");
});
// ----------------------------------------------------------------------------------
test('TableBuilder_ShouldReturnCorrectlyFormedTableTag', function () {

    var t = new PwC_ClientFWK_Tables.TableConfiguration("table1", "table1", "tablecss");
    ok(t.tableName == 'table1', "Pass!");
    ok(t.tableID == 'table1', "Pass!");
    ok(t.tableCSSClass == 'tablecss', "Pass!");
    htmlOutput = PwC_ClientFWK_Tables.buildTableTag(t);
    ok(htmlOutput === "<table id='table1' name='table1' class='tablecss'>", "Pass!");

});
// ----------------------------------------------------------------------------------
test('TableBuilder_ShouldReturnCorrectlyFormedTableTag_FullSpec', function () {

    var t = new PwC_ClientFWK_Tables.TableConfiguration("table1", "table1", "tablecss", "1", "font-weight:bold");
    ok(t.tableName == 'table1', "Pass!");
    ok(t.tableID == 'table1', "Pass!");
    ok(t.tableCSSClass == 'tablecss', "Pass!");
    htmlOutput = PwC_ClientFWK_Tables.buildTableTag(t);
    ok(htmlOutput === "<table id='table1' name='table1' class='tablecss' border='1' style='font-weight:bold'>", "Pass!");

});
// ----------------------------------------------------------------------------------
test('ShouldCloseDivTag', function () {
    ok(PwC_ClientFWK_Tables.closeTag('div') === '</div>', 'Pass!');
});
// ----------------------------------------------------------------------------------
test('ShouldCloseTableTag', function () {
    ok(PwC_ClientFWK_Tables.closeTag('table') === '</table>', 'Pass!');
});
// ----------------------------------------------------------------------------------
test('checkConfigurationObject_ShouldBeValidatedOK', function () {
    var t = new PwC_ClientFWK_Tables.TableConfiguration("table1", "table1", "tablecss", "1", "font-weight:bold");
    ok(PwC_ClientFWK_Tables.checkConfigurationObject('buildTableTag', t, ['tableID', 'tableName', 'tableCSSClass']) === true, 'Pass!');
});
// ----------------------------------------------------------------------------------
test('checkConfigurationObject_ShouldRaiseException', function () {
    var t = undefined;
    raises(function () {
        PwC_ClientFWK_Tables.checkConfigurationObject('buildTableTag', t, ['tableID', 'tableName', 'tableCSSClass']) === true, 'Pass!'
    }, 'Pass!');
});
// ----------------------------------------------------------------------------------
test('checkConfigurationObject_ShouldRaiseException_2', function () {
    var t = null;
    raises(function () {
        PwC_ClientFWK_Tables.checkConfigurationObject('buildTableTag', t, ['tableID', 'tableName', 'tableCSSClass']) === true, 'Pass!'
    }, 'Pass!');
});
// ----------------------------------------------------------------------------------
test('checkConfigurationObject_ShouldRaiseException_MissingParam', function () {
    var t = new PwC_ClientFWK_Tables.TableConfiguration("table1", "table1", "tablecss", "1", "font-weight:bold");
    raises(function () {
        PwC_ClientFWK_Tables.checkConfigurationObject('buildTableTag', t, ['tableID', 'xsiuyxis', 'tableCSSClass']) === true, 'Pass!'
    }, 'Pass!');
});
// ----------------------------------------------------------------------------------
test('checkConfigurationObject_ShouldRaiseException_MissingParam_2', function () {
    var t = new PwC_ClientFWK_Tables.TableConfiguration("table1", "table1", "tablecss");
    raises(function () {
        PwC_ClientFWK_Tables.checkConfigurationObject('buildTableTag', t, ['tableID', 'xsiuyxis', 'tableCSSClass']) === true, 'Pass!'
    }, 'Pass!');
});
// ----------------------------------------------------------------------------------
/* this tests checks if the configuration object works ok by creating an instance and checking its properties */
test('TableBuilder_ConstructTableConfiguration', function () {
    var items = [['col1', 'Column 1'], ['col2', 'Column 2'], ['col3', 'Column 3']];
    var t = new PwC_ClientFWK_Tables.TableHeadConfiguration("tableheadID", "tableheadName", "tableheadCSS", null, null, items);
    ok(t.tableHeadID == 'tableheadID', "Pass!");
    ok(t.tableHeadName == 'tableheadName', "Pass!");
    ok(t.tableHeadCSSClass == 'tableheadCSS', "Pass!");
    ok(t.columnNames !== null);
    ok(t.columnNames !== undefined);
});
// ----------------------------------------------------------------------------------
test('TableBuilder_ConstructTableHeadConfiguration', function () {
    var items = [['col1', 'Column 1'], ['col2', 'Column 2'], ['col3', 'Column 3']];
    var t = new PwC_ClientFWK_Tables.TableHeadConfiguration("tableheadID", "tableheadName", "tableheadCSS", null, null, items);
    ok(t.tableHeadID == 'tableheadID', "Pass!");
    ok(t.tableHeadName == 'tableheadName', "Pass!");
    ok(t.tableHeadCSSClass == 'tableheadCSS', "Pass!");
    ok(t.columnNames !== null);
    ok(t.columnNames !== undefined);
    ok("<thead id='tableheadID' name='tableheadName' class='tableheadCSS'><tr><th id='th_col1'>Column 1</th><th id='th_col2'>Column 2</th><th id='th_col3'>Column 3</th></tr></thead>" ===
            PwC_ClientFWK_Tables.buildTableHead(t));
});
// ----------------------------------------------------------------------------------
test('StringBuilder_01', function () {
    var sb = new StringBuilder().append("In Chinese, ").append("garlic reads").append(" suàn");
    ok(sb.toString() === "In Chinese, garlic reads suàn");
});
// ----------------------------------------------------------------------------------
test('StringBuilder_02', function () {
    var sb = new StringBuilder().add("In Chinese, ").add("garlic reads").add(" suàn");
    ok(sb.toString() === "In Chinese, garlic reads suàn");
});
// ----------------------------------------------------------------------------------
test('StringBuilder_03', function () {
    var sb = new StringBuilder().append("should not see this!").clear().append("In Chinese, ").add("garlic reads").add(" suàn");
    ok(sb.toString() === "In Chinese, garlic reads suàn");
});
// ----------------------------------------------------------------------------------
test('TableBuilder_CompleteTable_01', function () {

    var _emptySet = ['', null, undefined];
    var arr = new Array();      // this array will hold configurationcells to pass to the function
    arr.push(CELLCONTROL.CHECKBOX);
    arr.push(CELLCONTROL.TEXTBOX);
    arr.push(CELLCONTROL.IMAGELINK);

    var t = new PwC_ClientFWK_Tables.TableRowConfiguration('tablerow_', 'tablerowclass_', '', null, arr);
    ok(t.tableRowID === 'tablerow_');
    ok(t.tableRowClass === 'tablerowclass_');
    ok(!_.contains(_emptySet, t.cellconfigurations));

    var output = PwC_ClientFWK_Tables.buildTableRow(t);
    trace(output);
});
// ----------------------------------------------------------------------------------

function trace(s) {
    if ('console' in self && 'log' in console) console.log(s)
    // the line below you might want to comment out, so it dies silent
    // but nice for seeing when the console is available or not.
    else alert(s)
}

//});