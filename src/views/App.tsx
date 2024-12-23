import { useEffect } from "react";
import { Header } from "components/Header";
import { InstallPwaButton } from "components/InstallPwaButton";
import Calculator from "./Calculator";
import styles from "./App.module.css";

function App() {
  const isPWA = window.matchMedia("(display-mode: standalone)").matches;

  useEffect(() => {
    document.title = "BrewCalc";
    const updateFavicon = (dark: boolean) => {
      const link = document.getElementById("favicon") as HTMLLinkElement;
      if (link) link.href = dark ? "favicon-dark.ico" : "favicon.ico";
    };
    const usesDarkMode =
      window.matchMedia("(prefers-color-scheme: dark)").matches || false;
    updateFavicon(usesDarkMode);
  }, []);

  return (
    <div className={styles.container}>
      {!isPWA && (
        <Header
          title="BrewCalc"
          description="A simple coffee ratio calculator"
          rightAction={<InstallPwaButton />}
        />
      )}
      <div className={styles.wrapper}>
        <Calculator />
        <div className={styles.footer}>
          Made with ♥ by{" "}
          <a
            href="https://mathiaslindholm.com/"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
          >
            Mathias Lindholm
          </a>{" "}
          &{" "}
          <a
            href="https://aapokojo.com/"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
          >
            Aapo Kojo
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
