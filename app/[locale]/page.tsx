'use client';

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
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@components/ui/sidebar';
import { Separator } from '@components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { LanguageSwitcher } from '@molecules/language-switcher/LanguageSwitcher';
import * as React from 'react';
import Sidebar from '@organisms/sidebar/Sidebar';

const mockLEC: Omit<League, 'id' | 'createdAt' | 'updatedAt'> = {
  name: 'League of Legends EMEA Championship',
  tag: 'LEC',
  region: $Enums.Region.EUROPE,
  currentPhase: $Enums.SplitPhase.REGULAR_SEASON,
};

const mockLFL: Omit<League, 'id' | 'createdAt' | 'updatedAt'> = {
  name: 'Ligue Française de League of Legends',
  tag: 'LFL',
  region: $Enums.Region.EUROPE,
  currentPhase: $Enums.SplitPhase.REGULAR_SEASON,
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
    <main>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex w-full items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb className="grow">
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Testing page</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div>
                <LanguageSwitcher />
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
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
                            <Button
                              variant="outline"
                              onClick={() => updateLeague(league)}
                            >
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
          </div>
          <div className="bottom-0 flex w-full items-center justify-center border border-primary bg-primary/20">
            Footer
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
};

export default Home;
