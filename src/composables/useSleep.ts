export const useSleep = () => {
  const sleep = async (ms: number) =>
    await new Promise((r) => setTimeout(r, ms))

  return {
    sleep,
  }
}
