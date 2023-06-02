
import express from "express"
import mongoose from "mongoose";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://admin:admin@cluster0.hhw8z47.mongodb.net/nameDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
}).then(() => {
    console.info('Connect database successfully'); // check cais nafy để biết là nó connect với thằng database chưa đừng dùng cái cú dùng cái cũ mày đéo biết là nó con nect thanh công hay không
})
    .catch((error) => {
        console.info(error);
    });; // nameDatabase là tên database admin là user sau : là pass muốn thêm acc thì thêm trong thằng database access

export const viteNodeApp = app