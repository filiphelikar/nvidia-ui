import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  runNvidiaSmi: () => ipcRenderer.invoke("nvidia-smi"),
});
