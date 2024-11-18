//sellerLoginMW will check for username and password
    // create a new USER model and add a new query function for seller login specifically
    // for which first created a table users in the database (userId, username, password, role)
    // since it is specifically a seller login the role must be seller
    // a checkSellerLogin controller will be responsible for this task ()

    // there should be a login page 
    // if the user does not exist, register the user first and assign them an id. 
    
export function sellerLoginMW(req, res, next){
    const { username, password } = req.body;
    const result = checkSellerLogin(username, password);
}