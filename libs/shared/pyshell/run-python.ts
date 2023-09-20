import * as path from "path";
import { PythonShell } from "python-shell";

export const runPython = async <T>(path: string, arg: any = ""): Promise<T> => {
  const [result] = await PythonShell.run(path, { args: [JSON.stringify(arg)] });

  return JSON.parse(result) as T;
};

if (require.main) {
  (async () => {
    const then = performance.now();
    console.log("Evaluating python request");
    const results = await runPython(path.resolve(__dirname, "./test.py"));
    console.log(results);
    const now = performance.now();

    console.log("Took", now - then, "ms");
  })();
}
