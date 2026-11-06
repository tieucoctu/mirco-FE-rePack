import { lazy, Suspense, useMemo, useState } from "react";
import { loadRemote } from "@module-federation/runtime-tools";
import ErrorBoundary from "./ErrorBoundary";

function createRemoteComponent(id) {
  return lazy(async () => {
    const mod = await loadRemote(id);
    if (!mod) throw new Error(`Không tải được module: ${id}`);
    return mod;
  });
}

export default function Remote({ id, name }) {
  const [attempt, setAttempt] = useState(0);
  const Component = useMemo(() => createRemoteComponent(id), [id, attempt]);

  const fallback = (
    <div style={{ padding: 8, border: "1px dashed red" }}>
      <p>Không tải được phần "{name}".</p>
      <button onClick={() => setAttempt((a) => a + 1)}>Thử lại</button>
    </div>
  );

  return (
    <ErrorBoundary key={attempt} name={name} fallback={fallback}>
      <Suspense fallback={<p>Đang tải {name}...</p>}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}