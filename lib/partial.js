// exports.partialConfig = (req, res) => {
//     isLoggined: true,
//     title: req.originalUrl.replace("/", "in "),
//     name: req.user.name,
// }


exports.partialConfig = function(req, res, renderhere, isLoggedIn=true, additional={}){
    var location = req.originalUrl.replace("/","in ")
    basic = {
        isLoggedIn:isLoggedIn,
        title:location,
        name:req.user.name,
    }
    if (additional) newObj = Object.assign(basic, additional)
    res.render(renderhere, newObj)
    
}