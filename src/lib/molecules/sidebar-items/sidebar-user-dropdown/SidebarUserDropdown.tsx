'use client';

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
  Settings,
  Sparkles,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@components/ui/sidebar';
import DarkModeToggle from '@molecules/toggles/dark-mode-toggle/DarkModeToggle';
import { AvatarIcon } from '@radix-ui/react-icons';
import { User } from '@prisma/client';
import { useTranslations } from 'next-intl';

// Todo: Replace this with actual user data
const userMock: User = {
  id: '1',
  username: 'DyRize',
  email: 'dylanrize25@gmail.com',
  password: 'password',
  role: 'USER',
  createdAt: new Date(),
  updatedAt: new Date(),
};

type SidebarUserDropdownProps = {
  user?: User;
};

const SidebarUserDropdown = ({ user = userMock }: SidebarUserDropdownProps) => {
  const { isMobile } = useSidebar();
  const t = useTranslations('sidebar-user-dropdown');

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/* Todo: Implements Avatars later */}
                <AvatarFallback className="rounded-lg">
                  <AvatarIcon />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.username}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* Todo: Implements Avatars later */}
                  <AvatarFallback className="rounded-lg">
                    <AvatarIcon />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.username}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                {t('Passer à la version pro')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <DarkModeToggle>{t('Mode sombre')}</DarkModeToggle>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                {t('Mon compte')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                {t('Paramètres')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                {t('Notifications')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              {t('Déconnexion')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarUserDropdown;
