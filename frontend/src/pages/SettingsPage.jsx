import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

function SettingsPage() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-fit h-screen pb-10 container mx-auto px-4 mt-10 ">
      <div>
        <h1 className="text-xl mb-4">Choose a theme</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 justify-center items-center">
          {THEMES.map((theme) => (
            <div
              data-theme={theme}
              className="cursor-pointer  border border-gray-300 p-2"
              onClick={() => setTheme(theme)}
            >
              <span className="">{theme}</span>
              <div className="grid grid-cols-4 gap-1 mt-2">
                <div className=" bg-primary h-4"></div>
                <div className=" bg-secondary h-4"></div>
                <div className=" bg-accent h-4"></div>
                <div className=" bg-neutral h-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
