'use client';

import { ChevronRight } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@components/ui/sidebar';
import { $Enums, League } from '@prisma/client';
import Region = $Enums.Region;
import SplitPhase = $Enums.SplitPhase;
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const leaguesMock: ReadonlyArray<League> = [
  {
    id: '1',
    name: 'League of Legends EMEA Championship',
    tag: 'LEC',
    region: Region.EUROPE,
    currentPhase: SplitPhase.REGULAR_SEASON,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Ligue Française de League of Legends',
    tag: 'LFL',
    region: Region.EUROPE,
    currentPhase: SplitPhase.REGULAR_SEASON,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const SidebarNavigationLeagues = () => {
  const t = useTranslations('sidebar-navigation-leagues');

  const leaguesSubItems = [
    {
      title: t('Calendrier des matchs'),
      url: '#',
    },
    {
      title: t('Classement'),
      url: '#',
    },
    {
      title: t('Équipes'),
      url: '#',
    },
    {
      title: t('Statistiques'),
      url: '#',
    },
    {
      title: t('Tableau des scores'),
      url: '#',
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Leagues</SidebarGroupLabel>
      <SidebarMenu>
        {leaguesMock.map((league) => (
          <Collapsible
            key={league.tag}
            asChild
            defaultOpen={league.tag === leaguesMock[0].tag}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={league.tag}>
                  <Image
                    src={`/images/leagues/${league.tag.toLowerCase()}.png`}
                    alt={'LEC'}
                    width={30}
                    height={30}
                  />
                  <span>{league.tag}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {leaguesSubItems?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default SidebarNavigationLeagues;
