// post请求，在header中设置tokenId，async默认为true
function post(options) {
    $.ajax({
        type: 'post',
        url: options.url,
        async: !(options.async === false),
        data: JSON.stringify(options.data),
        contentType:'application/json; charset=utf-8',
        dataType: 'json',
        beforeSend: function(xhr) {
            // 在header中设置tokenId
            xhr.setRequestHeader('tokenId', getToken());
        },
        success: options.success,
        error: options.error
    });
}

// 获得token
function getToken() {
    return localStorage.getItem('TokenId');
    // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjF9.oysuGdVVQmzzgrsedO1UL7tutgYIJtYzv8Z1tXIZDik"
}
function  setToken(TokenId) {
    localStorage.setItem("TokenId",TokenId)
}

function  setRecordId(recordId) {
    localStorage.setItem("RecordId",recordId)
}
function getRecordId() {
    return localStorage.getItem('RecordId');
}

function showErrorPage() {
    
}

// 表格上一页 下一页
function pagination(options) {
    var PageNo = (options.PageNo ? options.PageNo : 1),
        PageSize = (options.PageSize ? options.PageSize : 5);
    if (options.flag) {
        if (PageNo>1) PageNo = PageNo - 1;
    } else {
        if (Math.ceil(options.TotalNum / PageSize) != PageNo)  PageNo = parseInt(PageNo) + 1;
    }
    options.PageNo = PageNo;
    options.PageSize = PageSize;
    return options;
}