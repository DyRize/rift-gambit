import * as React from 'react';
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from 'lucide-react';

import SidebarNavigationLeagues from '@molecules/sidebar-items/sidebar-navigation/sidebar-navigation-leagues/SidebarNavigationLeagues';
import { NavProjects } from '@/src/components/nav-projects';
import SidebarUserDropdown from '@molecules/sidebar-items/sidebar-user-dropdown/SidebarUserDropdown';
import SidebarAppLogo from '@molecules/sidebar-items/sidebar-app-logo/SidebarAppLogo';
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/src/components/ui/sidebar';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'LEC',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

type SidebarProps = React.ComponentPropsWithRef<typeof SidebarRoot>;

const Sidebar = ({ ...props }: SidebarProps) => {
  return (
    <SidebarRoot collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarAppLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigationLeagues />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserDropdown />
      </SidebarFooter>
      <SidebarRail />
    </SidebarRoot>
  );
};

export default Sidebar;
