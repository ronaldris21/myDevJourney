import ImportData from "../DataImport.js";
import { MultimediaModel } from "../Models/MultimediaModel.js";
import productRoute from "./ProductRoutes.js";
import userRouter from "./UserRoutes.js";
import orderRouter from "./orderRoutes.js";
import RouterImage from "./ImagesRoutes.js";

function routes(app){
    
    // ROUTES
    app.use("/api/import", ImportData);
    app.use("/api/products", productRoute);
    app.use("/api/users", userRouter);
    app.use("/api/orders", orderRouter);
    app.use("/api/images", RouterImage);

    //TODO: borrar o dejar??
    app.get("/api/config/paypal", (req, res) => {
        res.send(process.env.PAYPAL_CLIENT_ID);
    });



    

}
export default routes;