'use client';

import DarkModeToggle from '@molecules/toggles/dark-mode-toggle/DarkModeToggle';
import LanguageSwitcher from '@molecules/language-switcher/LanguageSwitcher';
import { Button } from '@components/ui/button';
import { $Enums, League } from '@prisma/client';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

const mockLEC: Omit<League, 'id'> = {
  name: 'League of Legends EMEA Championship',
  tag: 'LEC',
  region: $Enums.Region.EUROPE,
};

const mockLFL: Omit<League, 'id'> = {
  name: 'Ligue Française de League of Legends',
  tag: 'LFL',
  region: $Enums.Region.EUROPE,
};

const Home = () => {
  const [leagues, setLeagues] = useState<ReadonlyArray<League>>([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch(`/api/league`, {
          next: { revalidate: 3600 },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch leagues: ${response.status}`);
        }

        const data = (await response.json()) as ReadonlyArray<League>;
        setLeagues(data);
      } catch (error: any) {
        // Todo : Implement logger
      }
    };

    fetchLeagues().then();
  }, []);

  // Todo : Implement logger & toasts
  const createLeague = async () => {
    try {
      const apiUrl = '/api/league/create';

      const requestData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockLEC),
      };

      const response = await fetch(apiUrl, requestData);

      if (!response.ok) {
        throw new Error(`Failed to Create League: ${response.statusText}`);
      }

      window.location.reload();
    } catch (error) {
      // Todo : Implement logger
    }
  };

  const deleteLeague = async (league: League) => {
    const confirmed = confirm(`Voulez-vous supprimer la league : ${league.tag}?`);
    if (!confirmed) return;

    try {
      const apiUrl = `/api/league/${league.id}/delete`;

      const requestData = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(apiUrl, requestData);

      if (!response.ok) {
        throw new Error(`Failed to delete ${league.name} - ${response.statusText}`);
      }

      window.location.reload();
    } catch (error) {
      // Todo : Implement logger
    }
  };

  const updateLeague = async (league: League) => {
    try {
      const apiUrl = `/api/league/${league.id}/update`;

      const requestData = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: league.id,
          ...mockLFL,
        }),
      };

      const response = await fetch(apiUrl, requestData);

      if (!response.ok) {
        throw new Error(`Failed to update ${league.name} - ${response.statusText}`);
      }

      window.location.reload();
    } catch (error) {
      // Todo : Implement logger
    }
  };

  return (
    <main className="flex min-h-screen">
      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-center border-4 border-red-500 bg-yellow-300">
        <h1 className="text-2xl">Header</h1>
      </header>

      <aside className="fixed left-0 z-40 flex h-full w-[20%] items-center justify-center border-4 border-red-500 bg-yellow-300">
        <h1 className="text-2xl">Sidebar</h1>
      </aside>

      <div className="ml-[20%] mt-16">
        <div className="grid h-full grid-cols-5">
          <div className="col-span-4 flex h-full flex-col items-center justify-start gap-10">
            <h1 className="text-2xl">Main Content</h1>

            <div>
              <DarkModeToggle />
              <LanguageSwitcher />
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-2xl">Gestion d&apos;une League (LEC)</span>
              <Button variant="default" onClick={createLeague}>
                Ajout
              </Button>
            </div>

            <Table className="table-auto">
              <TableCaption>Leagues</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Tag</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leagues.length > 0 ? (
                  leagues.map((league: League) => {
                    return (
                      <TableRow key={league.id}>
                        <TableCell>{league.name}</TableCell>
                        <TableCell>{league.tag}</TableCell>
                        <TableCell>{league.region}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" onClick={() => updateLeague(league)}>
                            <Pencil1Icon />
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => deleteLeague(league)}
                          >
                            <TrashIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No Leagues available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col items-center justify-center border-4 border-red-500 bg-yellow-300">
            <h1 className="text-2xl">Content Sidebar</h1>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 z-50 flex h-16 w-full items-center justify-center border-4 border-red-500 bg-yellow-300">
        <h1 className="text-2xl">Footer</h1>
      </footer>
    </main>
  );
};

export default Home;
