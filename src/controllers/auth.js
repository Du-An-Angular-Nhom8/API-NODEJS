import User from "../model/user"
import { signinSchema, validateSingup } from "../schema/auth"
import bcryct from "bcryptjs"
import jwt from "jsonwebtoken"
import Cart from "../model/cart"
export const signup = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        const { error } = validateSingup.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ message: errors });
        }

        const hashedPassword = await bcryct.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            image: req.body.image,
            password: hashedPassword,
        });

        // Tạo cart mới cho user
        const cart = new Cart({ userId: user._id });
        await cart.save();

        // Gán cartId cho user
        user.cart = cart._id;
        await user.save();

        const accessToken = jwt.sign({ _id: user._id }, "boquan", { expiresIn: "1d" });

        return res.status(200).json({
            message: "Đăng ký thành công",
            accessToken,
            user
        });
    } catch (err) {
        return res.status(404).json({ message: err });
    }
};

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

        const accessToken = jwt.sign({ _id: user._id }, "boquan", { expiresIn: "1d" });

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

export const RemoveUser = async (req, res) => {
    const id = req.params.id
    console.log(id)
    // const { data } = await axios.delete("http://localhost:3000/products/" + req.params.id);
    const data = await User.findOneAndDelete({ _id: id })
    res.json({
        message: "Xoá user thành công",
        data

    })
}


