import { AppDiagnosticSheet } from "@/components/app-diagnostic-sheet";
import { isElectronRuntime } from "@/desktop/host";
import { useAppDiagnosticStore } from "@/diagnostics/store";
import { resolveAppVersionLabel } from "@/utils/app-version";

export function AppDiagnosticHost() {
  const visible = useAppDiagnosticStore((state) => state.visible);
  const close = useAppDiagnosticStore((state) => state.close);

  return (
    <AppDiagnosticSheet
      visible={visible}
      onClose={close}
      appVersion={resolveAppVersionLabel()}
      isDesktopApp={isElectronRuntime()}
    />
  );
}
