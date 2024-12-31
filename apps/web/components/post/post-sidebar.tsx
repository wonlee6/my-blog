import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@workspace/ui/components/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@workspace/ui/components/sidebar'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

export default function PostSidebar() {
  return (
    <Sidebar className='left-auto top-14'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible key={item.title} defaultOpen={index === 1} className='group/collapsible'>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{' '}
                      <ChevronDownIcon className='ml-auto group-data-[state=open]/collapsible:hidden' />
                      <ChevronUpIcon className='ml-auto group-data-[state=closed]/collapsible:hidden' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild isActive={item.isActive}>
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

const data = {
  navMain: [
    {
      title: 'Getting Started',
      url: '#',
      items: [
        {
          title: 'Installation',
          url: '#'
        },
        {
          title: 'Project Structure',
          url: '#'
        }
      ]
    },
    {
      title: 'Building Your Application',
      url: '#',
      items: [
        {
          title: 'Routing',
          url: '#'
        },
        {
          title: 'Data Fetching',
          url: '#',
          isActive: true
        },
        {
          title: 'Rendering',
          url: '#'
        },
        {
          title: 'Caching',
          url: '#'
        },
        {
          title: 'Styling',
          url: '#'
        },
        {
          title: 'Optimizing',
          url: '#'
        },
        {
          title: 'Configuring',
          url: '#'
        },
        {
          title: 'Testing',
          url: '#'
        },
        {
          title: 'Authentication',
          url: '#'
        },
        {
          title: 'Deploying',
          url: '#'
        },
        {
          title: 'Upgrading',
          url: '#'
        },
        {
          title: 'Examples',
          url: '#'
        }
      ]
    },
    {
      title: 'API Reference',
      url: '#',
      items: [
        {
          title: 'Components',
          url: '#'
        },
        {
          title: 'File Conventions',
          url: '#'
        },
        {
          title: 'Functions',
          url: '#'
        },
        {
          title: 'next.config.js Options',
          url: '#'
        },
        {
          title: 'CLI',
          url: '#'
        },
        {
          title: 'Edge Runtime',
          url: '#'
        }
      ]
    },
    {
      title: 'Architecture',
      url: '#',
      items: [
        {
          title: 'Accessibility',
          url: '#'
        },
        {
          title: 'Fast Refresh',
          url: '#'
        },
        {
          title: 'Next.js Compiler',
          url: '#'
        },
        {
          title: 'Supported Browsers',
          url: '#'
        },
        {
          title: 'Turbopack',
          url: '#'
        }
      ]
    },
    {
      title: 'Community',
      url: '#',
      items: [
        {
          title: 'Contribution Guide',
          url: '#'
        }
      ]
    }
  ]
}
