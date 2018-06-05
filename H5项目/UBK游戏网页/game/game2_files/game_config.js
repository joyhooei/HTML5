var game_version = "v11";
function getPreloadFile(filepath, ext, querykey) {
    var queryVal = window.getQueryStringByKey(querykey);
    if (queryVal && queryVal != "") {
        return filepath + "_" + queryVal + "." + ext;
    }
    return filepath + "." + ext;
}
var game_preload_list = [getPreloadFile("launcher/egret_loader", "js", "loaderVar"),
    getPreloadFile("launcher/game-min", "js", "codeVer")];
