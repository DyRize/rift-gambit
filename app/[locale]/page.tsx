import DarkModeToggle from '@molecules/toggles/dark-mode-toggle/DarkModeToggle';
import LanguageSwitcher from '@molecules/language-switcher/LanguageSwitcher';

const Home = () => {
  return (
    <main className="flex min-h-screen">
      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-center border-4 border-red-500 bg-yellow-300">
        <h1 className="text-2xl">Header</h1>
      </header>

      <aside className="fixed left-0 z-40 flex h-full w-[20%] items-center justify-center border-4 border-red-500 bg-yellow-300">
        <h1 className="text-2xl">Sidebar</h1>
      </aside>

      <div className="ml-[20%] mt-16 grid h-full w-full grid-cols-5">
        <div className="col-span-4 flex flex-col items-center justify-center border-4 border-red-500 bg-yellow-300">
          <h1 className="text-2xl">Main Content</h1>
          <DarkModeToggle />
          <LanguageSwitcher />
        </div>
        <div className="flex flex-col items-center justify-center border-4 border-red-500 bg-yellow-300">
          <h1 className="text-2xl">Content Sidebar</h1>
        </div>
      </div>

      <footer className="fixed bottom-0 z-50 flex h-16 w-full items-center justify-center border-4 border-red-500 bg-yellow-300">
        <h1 className="text-2xl">Footer</h1>
      </footer>
    </main>
  );
};

export default Home;
