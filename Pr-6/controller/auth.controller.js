exports.loginPage = async(req, res) =>{
    try {
        return res.render("login");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
},

exports.dashBordpage = async(req, res) =>{
    try {
        return res.render("dashBoard");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}
