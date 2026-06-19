"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractNetworkBuilder = void 0;
const index_1 = require("../index");
const BackpropagationFactory_1 = require("../Layer/Backpropagation/BackpropagationFactory");
class AbstractNetworkBuilder {
    constructor(dimension) {
        this.dimensions = null;
        this.lastLayer = null;
        this.network = null;
        this.dimensions = dimension;
        this.network = new index_1.Network(this.dimensions);
    }
    createLayer(layerClass, callback = null) {
        const layer = new layerClass();
        if (typeof callback === "function") {
            callback(layer);
        }
        if (this.lastLayer === null) {
            this.firstLayerTransition(layer);
        }
        else {
            layer.transition(this.lastLayer);
        }
        layer.configure();
        layer.setBackPropagation(BackpropagationFactory_1.BackpropagationFactory.create(this.lastLayer, layer));
        this.network.addLayer(layer);
        this.lastLayer = layer;
        return this;
    }
    getNetwork() {
        return this.network;
    }
}
exports.AbstractNetworkBuilder = AbstractNetworkBuilder;
