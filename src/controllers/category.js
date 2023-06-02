
import Category from '../model/category'
import { CategoryJoi } from '../schema/category';
//them 
export const CreateCategory = async (req, res) => {
    const query = req.query
    console.log(query)
    try {
        const body = req.body;
        const { error } = CategoryJoi.validate(body)
        if (error) {
            const errors = error.details.map((errItem) => errItem.message)
            return res.status(400).json({
                message: errors
            });
        }
        // const { data } = await axios.post("http://localhost:3000/products", body);
        const data = await Category.create(body)
        if (!data) {
            return res.status(400).json({ message: "Thêm danh muc thất bại" });
        }
        return res.json({
            message: "Thêm danh muc thành công",
            data
        });
    } catch (err) {
        return res.json({ message: "loi Api", err })
    }
};







//update
export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const category = await Category.findOneAndUpdate({ _id: id }, body, { new: true });
        if (!category) {
            return res.status(400).json({ message: "Cập nhật thất bại" });
        }
        return res.json({
            message: "Cập nhật thành công",
            category,
        });
    } catch (error) {
        return res.json({
            message: error.message,
        });
    }
};