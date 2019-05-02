import debug from "debug";

const debugConfig = process.env.DEBUG || "";
debug.enable(debugConfig);

export default debug;
