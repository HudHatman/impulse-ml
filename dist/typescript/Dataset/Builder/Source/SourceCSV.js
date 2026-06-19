"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceCSV = void 0;
const AbstractSource_1 = require("./AbstractSource");
const Math_1 = require("../../../Math");
const csvtojson_1 = __importDefault(require("csvtojson"));
const Dataset_1 = require("../../Dataset");
class SourceCSV extends AbstractSource_1.AbstractSource {
    constructor(data) {
        super();
        this.data = null;
        this.data = data;
    }
    static fromLocalFile(path) {
        return new Promise((resolve) => {
            (0, csvtojson_1.default)({
                noheader: true,
                trim: true,
                output: "csv",
            })
                .fromFile(path)
                .then((arr) => {
                resolve(new SourceCSV(arr));
            });
        });
    }
    parse() {
        const numberOfExamples = this.data.length;
        const exampleSize = this.data[0]?.length;
        const data = [];
        for (let i = 0; i < numberOfExamples; i += 1) {
            this.data[i].forEach((value) => {
                data.push(Number(value));
            });
        }
        return Dataset_1.Dataset.fromMatrix(new Math_1.CalcMatrix2D(exampleSize, numberOfExamples).allocate().set(data));
    }
}
exports.SourceCSV = SourceCSV;
