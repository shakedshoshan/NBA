

const getUserFromToken = async (token) => {
    try {
        console.log("backend" + token);
        const decoded = await jwt.verify(token, process.env.jwtSecret);
        const userId = decoded; // Assuming 'userId' is the property you want to extract
        return userId;
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        throw new Error("Failed to verify JWT"); // Re-throw error for handling in calling function
    }
  };
  
  export default getUserFromToken;
