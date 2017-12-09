import "babel-polyfill";
import * as mongoose from "mongoose";

import { Education } from "./education-model";

module.exports = async (context, cb) => {
    mongoose.connect(context.secrets.MONGODB_URI);

    console.log("Getting education");
    const data = await Education.find();

    const sortedData = data.sort((a, b) => {
        if (a.endDate === undefined) {
            return -1;
        }

        const aStartDate = new Date(a.startDate.year, 0, 1);
        const bStartDate = new Date(b.startDate.year, 0, 1);

        if (aStartDate > bStartDate) {
            return -1;
        } else {
            return 1;
        }
    });

    cb(null, sortedData);
};
