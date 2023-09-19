import * as path from "path";
import { PythonShell } from "python-shell";

export const runPython = async <T>(path: string): Promise<T> => {
  const [result] = await PythonShell.run(path);

  return JSON.parse(result) as T;
};

if (require.main) {
  (async () => {
    const results = await runPython(path.resolve(__dirname, "./test.py"));
    console.log(results);
  })();
}
