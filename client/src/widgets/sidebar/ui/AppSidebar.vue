<script setup lang="ts">
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  CirclePlus,
  Home,
  Inbox,
  Plus,
  Search,
  Settings,
  User2,
} from 'lucide-vue-next'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/shared/ui/sidebar'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import SettingsPage from '@/pages/settings'
import ProfilePage from '@/pages/profile'
import { Input } from '@/shared/ui/input'

// const items = [
//   {
//     id: 1,
//     title: 'Home',
//     url: '#',
//     icon: Home,
//     badge: 15,
//   },
//   {
//     id: 2,
//     title: 'Inbox',
//     url: '#',
//     icon: Inbox,
//     badge: 2,
//   },
//   {
//     id: 3,
//     title: 'Calendar',
//     url: '#',
//     icon: Calendar,
//     badge: 8,
//   },
//   {
//     id: 4,
//     title: 'Search',
//     url: '#',
//     icon: Search,
//     badge: 19,
//   },
//   {
//     id: 5,
//     title: 'Settings',
//     url: '#',
//     icon: Settings,
//     badge: 24,
//   },
// ]

// const subItems = [
//   {
//     id: 11,
//     title: 'asdfa',
//     url: '#',
//     icon: Home,
//     badge: 15,
//   },
//   {
//     id: 12,
//     title: 'asdfasdfads',
//     url: '#',
//     icon: Inbox,
//     badge: 2,
//   },
//   {
//     id: 13,
//     title: 'wrwer',
//     url: '#',
//     icon: Calendar,
//     badge: 8,
//   },
//   {
//     id: 14,
//     title: 'werwer234',
//     url: '#',
//     icon: Search,
//     badge: 19,
//   },
//   {
//     id: 15,
//     title: 'asdfadsf',
//     url: '#',
//     icon: Settings,
//     badge: 24,
//   },
// ]

const quitApp = async () => {
  localStorage.removeItem('token')
  localStorage.removeItem('auth')
  window.location.reload()
}
</script>

<template>
  <Sidebar class="sidebar">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User2 /> simpledeadly
                <ChevronDown class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              class="w-[--reka-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem @click="quitApp">
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Фичи</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <component :is="CirclePlus" />
                  <span>Добавить задачу</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <component :is="Search" />
                  <span>Поиск</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Приложение</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <RouterLink to="/">
                  <span>Привычки</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <RouterLink to="/">
                  <span>TimeTrack</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <RouterLink to="/">
                  <span>Статистика</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Основное</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <RouterLink to="/">
                  <span>Входящее</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <RouterLink to="/">
                  <span>Сегодня</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <RouterLink to="/">
                  <span>Запланированное</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <RouterLink to="/">
                  <span>Фильтры</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <CollapsibleRoot
        defaultOpen
        class="group/collapsible"
      >
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Избранное
              <ChevronDown
                class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
              />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <RouterLink to="/?type=project">
                    <span>Focuseek</span>
                  </RouterLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </CollapsibleContent>
        </SidebarGroup>
      </CollapsibleRoot>
      <CollapsibleRoot
        defaultOpen
        class="group/collapsible"
      >
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Списки
              <ChevronDown
                class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
              />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <RouterLink to="/">
                    <span>Задачи</span>
                  </RouterLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <RouterLink to="/?type=note">
                    <span>Заметки</span>
                  </RouterLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <RouterLink to="/?type=project">
                    <span>Focuseek</span>
                  </RouterLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </CollapsibleContent>
        </SidebarGroup>
      </CollapsibleRoot>
    </SidebarContent>
    <!-- <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User2 /> simpledeadly
                <ChevronUp class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              class="w-[--reka-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem @click="quitApp">
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter> -->
  </Sidebar>
</template>

<!-- <template>
  <Sidebar>
    <SidebarContent>
      <CollapsibleRoot
        defaultOpen
        class="group/collapsible"
      >
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Help
              <ChevronDown
                class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
              />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarMenu>
              <SidebarMenuItem
                v-for="item in items"
                :key="item.title"
              >
                <SidebarMenuButton asChild>
                  <a :href="item.url">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuBadge>{{ item.badge }}</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </CollapsibleContent>
        </SidebarGroup>
      </CollapsibleRoot>
      <CollapsibleRoot
        :default-open="false"
        class="group/collapsible"
      >
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Other
              <ChevronDown
                class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
              />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarMenu>
              <SidebarMenuItem
                v-for="subItem in subItems"
                :key="subItem.id"
              >
                <SidebarMenuButton asChild>
                  <a :href="subItem.url">
                    <component :is="subItem.icon" />
                    <span>{{ subItem.title }}</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuAction @click="toaster">
                  <Plus />
                </SidebarMenuAction>
              </SidebarMenuItem>
            </SidebarMenu>
          </CollapsibleContent>
        </SidebarGroup>
      </CollapsibleRoot>
      <SidebarGroup>
        <SidebarGroupLabel>Чпоньк</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <CollapsibleRoot
              :default-open="false"
              class="group/collapsible"
              v-for="item in items"
              :key="item.id"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <span>{{ item.title }}</span>
                    </a>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub
                    v-for="subItem in subItems"
                    :key="subItem.id"
                  >
                    <SidebarMenuSubItem>
                      <a href="#">
                        <span>{{ subItem.title }}</span>
                      </a>
                    </SidebarMenuSubItem>
                    <SidebarMenuBadge>{{ subItem.badge }}</SidebarMenuBadge>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </CollapsibleRoot>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem> asdf </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template> -->

<style lang="scss">
.sidebar {
  background: hsl(var(--background));
}
</style>
