'use client'

import { useMemo } from 'react'

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
import Link from 'next/link'

import { allPosts } from '@/.contentlayer/generated'
import { markDownTags } from '@/types/mark-down-type'

export default function PostSidebar() {
  const filteredAllPosts = useMemo(() => {
    if (!allPosts) return []

    const convertAllPosts = allPosts.map((i) => ({
      title: i.title,
      tags: i.tags,
      id: i._raw.flattenedPath
    }))

    return convertAllPosts.reduce(
      (acc, cur) => {
        const tag = cur.tags.find((t) => markDownTags.includes(t)) || 'Uncategorized'
        if (!acc[tag]) {
          acc[tag] = []
        }
        acc[tag].push(cur)
        return acc
      },
      {} as Record<string, typeof convertAllPosts>
    )
  }, [])

  return (
    <Sidebar className='left-auto top-14 h-[calc(100%_-_3.5rem)]' variant='floating'>
      <SidebarContent className='overflow-y-auto scrollbar-hide'>
        <SidebarGroup>
          <SidebarMenu>
            {Object.entries(filteredAllPosts).map(([key, value]) => (
              <Collapsible key={key} defaultOpen className='group/collapsible'>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {key}
                      <ChevronDownIcon className='ml-auto group-data-[state=open]/collapsible:hidden' />
                      <ChevronUpIcon className='ml-auto group-data-[state=closed]/collapsible:hidden' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {value
                        ? value.map((item) => (
                            <SidebarMenuSubItem key={item.id} className='min-w-0'>
                              <SidebarMenuSubButton asChild>
                                <Link href={`/post/${item.id}`}>
                                  <span className='truncate'>{item.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))
                        : null}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
