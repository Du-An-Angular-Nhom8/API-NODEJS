import User from "../model/user"
import { signinSchema, validateSingup } from "../schema/auth"
import bcryct from "bcryptjs"
import jwt from "jsonwebtoken"
export const singup = async (req, res) => {
    try {
        const userExit = await User.findOne({ email: req.body.email });
        if (userExit) {
            return res.status(400).json({
                message: "Email da ton tai"
            })
        }
        const { error } = validateSingup.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message)
            return res.status(400).json({
                message: errors
            })
        }
        const hashedPassword = await bcryct.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            image: req.body.image,
            password: hashedPassword,
        });

        const accessToken = jwt.sign({ _id: user._id }, "boquan", { expiresIn: "1d" });
        // const data = await User.create(req.body)
        return res.status(200).json({
            message: "Dang ky thanh cong",
            accessToken,
            user
        })
    } catch (err) {
        return res.status(404).json({ message: err })
    }
}

//sign in
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                messages: errors,
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Bạn chưa đăng ký tài khoản",
            });
        }

        const isMatch = await bcryct.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng",
            });
        }

        const accessToken = jwt.sign({ _id: user._id }, "banThayDat", { expiresIn: "1d" });

        return res.status(201).json({
            message: "Dang nhap thanh cong",
            accessToken,
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const getAllUser = async function (req, res) {
    try {
        const user = await User.find();
        if (user.length === 0) {
            return res.status(400).json({ message: 'Không có user' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.json({
            message: error.message,
        });
    }
}


// GetOneUser
export const GetOneUser = async function (req, res) {
    try {
        const id = req.params.id
        // const { data } = await axios.get('http://localhost:3000/products/' + id)
        const data = await User.findById(id)
        if (data.length === 0) {
            return res.status(200).json({ message: "rong" })
        }
        return res.json(data)
    } catch (err) {
        return res.status(500).json({ message: "loi api" })
    }


}


