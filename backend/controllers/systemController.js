// 📥 Fetch Core System Performance Telemetry Metrics
exports.getSystemStatus = async (req, res) => {
  try {
    res.status(200).json({ 
      success: true, 
      stats: [ 
        { label: "Tech Products Listed", value: "2,450+", sub: "Verified Inventory" }, 
        { label: "Hardware Nodes Active", value: "14,842", sub: "Global Network" }, 
        { label: "Order Delivery Latency", value: "0.02ms", sub: "Instant Allocation" } 
      ], 
      systemLayers: [ 
        { title: "01 // Premium Hardware Procurement Matrix", description: "We source cutting-edge custom components, including high-performance GPUs, custom liquid cooling rigs, next-generation mechanical switches, and high-frequency storage arrays from verified global hardware manufacturers." }, 
        { title: "02 // Atomic Product Verification Engine", description: "Every listing on our platform undergoes automated configuration checking. We verify serial keys, model metrics, and electronic benchmarks before hardware dispatching, guaranteeing absolute component safety." }, 
        { title: "03 // Distributed Shipping & Supply Infrastructure", description: "Operating across global logistics nodes, our checkout architecture connects your cart demands directly with regional hardware fulfillment hubs, bringing delivery dispatch waiting intervals down to record lows." } 
      ] 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Telemetry matrix tracking failed", error: error.message });
  }
};
