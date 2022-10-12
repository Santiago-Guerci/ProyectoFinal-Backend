import Yargs from "yargs";
const args = Yargs(process.argv.slice(2)).default({
  port: 8080,
  mode: "fork",
}).argv;

export default {
  port: args.port,
  mode: args.mode,
};
