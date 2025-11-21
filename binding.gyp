{
  "targets": [
    {
      "target_name": "node_native_memory",
      "sources": [
        "src/cpp/native/native_device.cpp",
        "src/cpp/native/native_memory.cpp",
        "src/cpp/native/native_module.cpp",
        "src/cpp/native/native_function.cpp",
        "src/cpp/device.cpp",
        "src/cpp/memory.cpp",
        "src/cpp/function.cpp",
        "src/cpp/module.cpp",
        "src/cpp/bindings.cpp"
      ],
      'conditions': [
        [ 'OS=="linux"',
          {
             'libraries': ['-fopenmp', '-lpthread'],
             'include_dirs': ['/usr/local/include', "/usr/include/node", "<!@(node -p \"require('node-addon-api').include\")"],
              'library_dirs': ['/usr/local/lib'],
             "defines": [ "NAPI_VERSION=6" ],
             "cflags_cc": [
                "-fopenmp"
             ],
             "ldflags": [
                "-fopenmp"
             ]
          }
        ],
      ]
    }
  ]
}
