const GeneratorFunction = function* () {}.constructor;

export function isGeneratorFunction(value: any): value is GeneratorFunction {
  return value instanceof GeneratorFunction;
}

const AsyncFunction = async function () {}.constructor;

export function isAsyncFunction(value: any): value is typeof AsyncFunction {
  return value instanceof AsyncFunction;
}
