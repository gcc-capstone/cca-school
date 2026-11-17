// Home page: pings /health and reports the result.

interface HealthResponse {
  status: string;
}

const button = document.querySelector<HTMLButtonElement>("#health-check");
const result = document.querySelector<HTMLParagraphElement>("#health-result");

async function checkHealth(): Promise<void> {
  if (!button || !result) return;

  button.disabled = true;
  result.textContent = "Checking…";
  const started = performance.now();

  try {
    const response = await fetch("/health", { headers: { Accept: "application/json" } });
    const body = (await response.json()) as HealthResponse;
    const elapsed = Math.round(performance.now() - started);
    result.textContent =
      response.ok && body.status === "ok"
        ? `✓ Server responded in ${elapsed} ms`
        : `Server answered with status ${response.status}`;
  } catch {
    result.textContent = "Could not reach the server.";
  } finally {
    button.disabled = false;
  }
}

button?.addEventListener("click", () => void checkHealth());
