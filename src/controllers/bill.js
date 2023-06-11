
import Bill from '../model/bill'

export const addBill = async (req, res) => {
    try {
        // Lấy thông tin hóa đơn từ request body
        const body = req.body;

        // Kiểm tra và validate dữ liệu đầu vào nếu cần thiết

        // Tạo một instance của model "Bill" với thông tin hóa đơn


        // Lưu thông tin hóa đơn vào cơ sở dữ liệu
        const data = await Bill.create(body)

        // Trả về phản hồi thành công
        return res.status(200).json({ message: 'Hóa đơn đã được thêm thành công',data});
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm hóa đơn' });
    }
};
