import "babel-polyfill";
import * as mongoose from "mongoose";

import { Education } from "./education-model";

module.exports = async (context, cb) => {
    mongoose.connect(context.secrets.MONGODB_URI);

    console.log("Getting education");
    const data = await Education.find();

    cb(null, data);
};
