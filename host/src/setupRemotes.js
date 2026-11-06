import { registerRemotes } from "@module-federation/runtime-tools";

export async function setupRemotes() {
  const res = await fetch("/remotes.json");
  const urls = await res.json();
  registerRemotes(
    Object.entries(urls).map(([name, entry]) => ({ name, entry }))
  );
}