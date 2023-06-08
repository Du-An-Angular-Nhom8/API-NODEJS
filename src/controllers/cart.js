import User from "../model/user"
import Cart from "../model/cart"
import jwt from "jsonwebtoken"
// Controller để thêm sản phẩm vào cart của người dùng khi có token
export const addToCart = async (req, res) => {
    try {
        // Xác thực token và lấy thông tin người dùng
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new Error("Bạn chưa đăng nhập");
        }
        const decoded = jwt.verify(token, "boquan");
        const userId = decoded._id;

        // Kiểm tra xem người dùng đã có cart hay chưa
        let user = await User.findById(userId);
        let cart;
        if (!user.cart) {
            // Nếu người dùng chưa có cart, tạo một cart mới
            cart = new Cart({ userId, products: [] });
            user.cart = cart._id;
            await user.save();
        } else {
            // Nếu người dùng đã có cart, lấy cart hiện có
            cart = await Cart.findById(user.cart);
            //   await cart.save()
        }
        console.log(cart);
        // Thêm sản phẩm vào cart
        const productId = req.body._id;

        cart.products.push(productId);

        await cart.save();

        return res.status(200).json({ message: 'Sản phẩm đã được thêm vào cart' });
    } catch (err) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm sản phẩm vào cart' });
    }
};