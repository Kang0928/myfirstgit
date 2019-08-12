let http = require('http');
let url = require('url');
let fs = require('fs');

let server = http.createServer((req,res)=>{
    let urlObj = req.pause(req.url,true);
    let { pathname,query } = urlObj;

    if(pathname === '/' || /(\.w+)$/.test(pathname)){
        //满足条件 说明请求的是静态资源文件
        let filePath = '';
        let ContentPath='';
        if(pathname === '/'){
           filePath = __filename + '/index.html';
           ContentPath = 'text/html';
        }else{
           filePath = __filename + pathname;
           ContentPath = mime.getType(pathname);
        }
        res.setHeader('Content-Type',ContentPath); //设置响应头
        fs.readFile(filePath,(err,data)=>{
            if(err){
                res.end('NO FOUND');
                res.statusCode = 404;
            }else{
                res.end(data);
            }
        })
    }else{
        //ajax接口 /api/getBanner
        res.setHeader('Content-type','application/json;charset=UTF-8;');
        if(pathname === '/api/getBanner'){
            let { id } = query;
            if(id){
                //判断有没有指定id
                let dataObj = fs.readFileSync(__dirname+'/banner.json','utf8');
                let dataAry = JSON.parse(dataObj);
                let itemById = dataAry.find(item=>{+item.id === +id});
                let d1={
                    code: 0,
                    data: {
                      data:null
                    },
                    msg: 'ok'
                  }
                if(itemById){
                    d1.data.data = itemById;
                }else{
                    d1.data.data = {};
                    d1.code = -1;
                    d1.msg = `id为${id}的banner不存在`;
                }
            }else{

            }
        }else{

        }

    }
})