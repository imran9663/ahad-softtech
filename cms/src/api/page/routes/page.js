module.exports={routes:[{method:'GET',path:'/pages',handler:'page.find',config:{auth:false,policies:[]}},{method:'GET',path:'/pages/:id',handler:'page.findOne',config:{auth:false,policies:[]}}]};
