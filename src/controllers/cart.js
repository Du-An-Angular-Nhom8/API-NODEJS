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

        // Thêm sản phẩm vào cart

        const productId = req.body._id;

        cart.products.push(productId);
        // console.log(cart);
        await cart.save();

        return res.status(200).json({ message: 'Sản phẩm đã được thêm vào cart' });
    } catch (err) {
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm sản phẩm vào cart' });
    }
};

export const GetOneCart = async (req, res) => {
    try {
        // Lấy ID của giỏ hàng từ request params hoặc body, tùy theo cách bạn truyền dữ liệu
        const cartId = req.params.id;

        // Thực hiện các thao tác để lấy thông tin của giỏ hàng từ cơ sở dữ liệu
        // Ví dụ, sử dụng một model hoặc service để tìm giỏ hàng dựa trên cartId
        const cart = await Cart.findById(cartId);

        if (!cart) {
            // Nếu không tìm thấy giỏ hàng, trả về lỗi hoặc thông báo không tìm thấy giỏ hàng
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Trả về thông tin của giỏ hàng trong response
        return res.json(cart);
    } catch (error) {
        // Xử lý lỗi nếu có
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        // Lấy thông tin người dùng từ token
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new Error("Bạn chưa đăng nhập");
        }
        const decoded = jwt.verify(token, "boquan");
        const userId = decoded._id;

        // Lấy thông tin cart của người dùng
        const user = await User.findById(userId);
        if (!user.cart) {
            throw new Error("Cart không tồn tại");
        }
        const cart = await Cart.findById(user.cart);
        if (!cart) {
            throw new Error("Cart không tồn tại");
        }

        // Lấy id của sản phẩm muốn xóa
        const productId = req.params._id;

        // Tìm vị trí của sản phẩm trong mảng products
        // const productIndex = cart.products.findIndex(item =>
        //     item.product.equals(productId)
        // );

        // if (productIndex !== -1) {
        // Xóa sản phẩm khỏi mảng products
        cart.products.splice(productId, 1);
        // }

        await cart.save();

        return res.status(200).json({ message: "Sản phẩm đã được xóa khỏi cart" });
    } catch (err) {
        return res
            .status(500)
            .json({ error: "Đã xảy ra lỗi khi xóa sản phẩm khỏi cart" });
    }
};