const path = require('path');
const os = require('os');
const process = require('process'); // W nowszych Node.js wymagane

// Ścieżka do Twojego skompilowanego modułu
const addonPath = path.resolve(__dirname, './build/Release/node_native_memory.node');

// Kontener na eksporty modułu
const addon = { exports: {} };

// KROK 4: Ładowanie z wymuszeniem RTLD_GLOBAL
// To jest kluczowe dla działania OpenMP wewnątrz addonu!
process.dlopen(addon, addonPath, os.constants.dlopen.RTLD_NOW | os.constants.dlopen.RTLD_GLOBAL);

// Teraz możesz używać addonu
const native = addon.exports;

module.exports = {native};
