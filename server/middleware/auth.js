import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Handle Bearer token format or raw token
    let token = authHeader;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.slice(7); // Remove 'Bearer ' prefix
    }

    try{
        jwt.verify(token, process.env.JWT_SECRET)
        next();
    } catch (error){
        res.status(401).json({success: false, error: "Invalid or missing token"});
    }
}

export default auth;
