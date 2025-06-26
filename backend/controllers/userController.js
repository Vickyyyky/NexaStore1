import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const registerUser = async (req, res) => {
  console.log("=== REGISTER USER START ===");
  console.log("Request body:", req.body);
  
  try {
    const { name, email, password } = req.body;
    console.log("1. Extracted data:", { name, email, passwordLength: password?.length });

    // Validate input
    if (!name || !email || !password) {
      console.log("2. Validation failed - missing fields");
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    // Check if user already exists
    console.log("3. Checking existing user...");
    const existing = await userModel.findOne({ email });
    console.log("4. Existing user check result:", !!existing);
    
    if (existing) {
      console.log("5. User already exists, returning error");
      return res.status(400).json({ 
        success: false, 
        message: "Email already exists" 
      });
    }

    // Hash password
    console.log("6. Hashing password...");
    const hash = await bcrypt.hash(password, 10);
    console.log("7. Password hashed successfully");

    // Create new user
    console.log("8. Creating new user...");
    const newUser = await userModel.create({ 
      name, 
      email, 
      password: hash 
    });
    console.log("9. User created successfully:", {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email
    });

    // Generate JWT token
    console.log("10. Generating JWT token...");
    const token = jwt.sign(
      { id: newUser._id }, 
      process.env.JWT_SECRET || "SHURULOVESALWAYS", 
      { expiresIn: "7d" }
    );
    console.log("11. Token generated successfully");

    // Prepare response
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role || 'user',
      createdAt: newUser.createdAt
    };

    const responseData = { 
      success: true, 
      message: "User registered successfully",
      token, 
      user: userResponse 
    };

    console.log("12. Sending response:", responseData);
    console.log("=== REGISTER USER SUCCESS ===");
    
    return res.status(201).json(responseData);

  } catch (err) {
    console.error("=== REGISTER USER ERROR ===");
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);
    console.error("Error details:", err);
    
    return res.status(500).json({ 
      success: false, 
      message: "Registration failed", 
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, "SHURULOVESALWAYS", { expiresIn: "7d" });
    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Login failed" });
  }
};

export { loginUser, registerUser };
