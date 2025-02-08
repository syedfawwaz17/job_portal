import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        console.log("Cookies received:", req.cookies); // Debug log

        const token = req.cookies?.token;
        if (!token) {
            console.log("No token found in cookies!");
            return res.status(401).json({
                message: "User authentication failed, please log in again.",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            console.log("Invalid token!");
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decoded.userId;
        console.log("User authenticated:", req.id); // Debug log
        next();
    } catch (error) {
        console.log("Authentication error:", error);
        res.status(500).json({
            message: "Authentication failed due to server error.",
            success: false,
        });
    }
};

export default isAuthenticated;
