/**
 * 
 * @param {req} req req
 * @param {res} res res
 * @param {string} renderhere render hbs name
 * @param {JSON} additional put additional option in render
 * @param {boolean} isAccess is stranger accessable to this route?
 */
exports.partialConfig = function(req, res, renderhere, additional={}, isAccess=false){
    var location = req.originalUrl.replace(/\//gi, ' in ')
    
    if (req.user) {
        basic = {
            isLoggedIn:true,
            title:location,
            name:req.user.name,
        }
    }
    else {
        basic = {
            isLoggedIn:false,
            title:location,
            name:"",
        }
        if (!isAccess){ 
            res.redirect("/")
            return null 
        }
    }
    
    if (additional) newObj = Object.assign(basic, additional)
    res.render(renderhere, newObj)
}
