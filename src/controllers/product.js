import Product from '../model/product'
import { ProductJoi } from '../schema/product'
export const CreateProduct = async (req, res) => {
    const query = req.query
    console.log(query)
    try {
        const body = req.body;
        const { error } = ProductJoi.validate(body)
        if (error) {
            const errors = error.details.map((errItem) => errItem.message)
            return res.status(400).json({
                message: errors
            });
        }
        // const { data } = await axios.post("http://localhost:3000/products", body);
        const product = await Product.create(body)
        // await Category.findByIdAndUpdate(product.categoryId, {
        //     $addToSet: {
        //         products: product._id
        //     }
        // });
        if (!product) {
            return res.status(400).json({ message: "Thêm sản phẩm thất bại" });
        }
        return res.json({
            message: "Thêm sản phẩm thành công",
            product
        });
    } catch (err) {
        return res.json(err.message)
    }
};
export const RemoveProduct = async (req, res) => {
    const id = req.params.id
    console.log(id)
    // const { data } = await axios.delete("http://localhost:3000/products/" + req.params.id);
    const data = await Product.findOneAndDelete({ _id: id })
    res.json({
        message: "XOA sản phẩm thành công",
        data

    })
}