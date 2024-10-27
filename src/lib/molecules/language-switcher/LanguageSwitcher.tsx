import * as React from 'react';
import { ChevronsUpDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useLocale } from 'use-intl';
import Image from 'next/image';
import { useIsMobile } from '@hooks/use-mobile';
import { Button } from '@components/ui/button';

export const availableLanguages = [
  {
    code: 'fr',
    locale: 'fr',
    name: 'Français',
  },
  {
    code: 'gb-eng',
    locale: 'en',
    name: 'English',
  },
];

export function LanguageSwitcher() {
  const t = useTranslations('example');
  const isMobile = useIsMobile();

  const router = useRouter();
  const locale = useLocale();

  const activeLanguage =
    availableLanguages.find((lang) => lang.locale === locale) ?? availableLanguages[0];

  const handleChangeLanguage = (lng: string) => {
    router.push(`/${lng}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          variant="ghost"
          className="p-2 hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          aria-label="Dropdown trigger"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg border text-sidebar-primary-foreground">
            <Image
              src={`https://flagcdn.com/${activeLanguage.code}.svg`}
              width={20}
              height={20}
              alt={activeLanguage.name}
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{activeLanguage.name}</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        side={isMobile ? 'bottom' : 'right'}
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          {t('Langues disponibles')}
        </DropdownMenuLabel>
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.name}
            onClick={() => handleChangeLanguage(language.locale)}
            className="gap-2 p-2"
          >
            <div className="flex size-6 items-center justify-center rounded-sm border">
              <Image
                src={`https://flagcdn.com/${language.code}.svg`}
                width={15}
                height={15}
                alt={language.name}
              />
            </div>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
