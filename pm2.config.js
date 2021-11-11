let config = {
  apps: [
    {
      name: "WATFLEX",
      script: "npm",
      max_memory_restart: "500M",
      out_file: "/dev/null",
      error_file: "/dev/null"
    }
  ]
};

let mode;
const modeList = ["dev", "stg", "prd"];
const proc = process;
proc.argv.map((v, i) => {
  if (v == "--mode") {
    mode = proc.argv[i + 1];
    return;
  }
});

if (modeList.includes(mode)) {
  config.apps[0].args = "run " + mode;
} else {
  console.log("Missing arguments -> --mode [" + modeList.join(",") + "]. One of them must be chosen.");
  process.exit(1);
}

module.exports = config;
