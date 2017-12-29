let  express =require( 'express');
let {success} =require( "../../common");


let router = express.Router();

/**POST insert new widget*/
router.post('/insert', function(req, res, next) {
  let widget=req.body; 
  req.app.locals.mongoDispatch({
    type:'widgets.insertOneWidget',
    payload:widget
  }).then(resp=>{    
    res.status(resp.code).json(resp);
  })  
});


/* GET widgetById listing. */
router.get('/:id', function(req, res, next) {
  
  req.app.locals.mongoDispatch({
    type:'widgets.getWidgetById',
    payload:req.params.id
  })

  .then(resp=>{    
     res.status(resp.code).json(resp);     
  })
});

module.exports={
  router
}
