<script setup lang="ts">
import { ref } from 'vue'
import { MainLayout } from '@/shared/ui/layouts/main-layout'
import { AppNavbar } from '@/widgets/navbar'
import { RouterView } from 'vue-router'
import { Toaster } from '@/shared/ui/sonner'
import { isAuthenticated } from './auth'
import { ArrowRightSquare } from 'lucide-vue-next'
import SettingsPage from '@/pages/settings'
import ProfilePage from '@/pages/profile'
import Loader from '@/widgets/loader'
import { SidebarProvider, SidebarTrigger } from '@/shared/ui/sidebar'
import { AppSidebar } from '@/widgets/sidebar'

const isLoading = ref(false)
const setLoading = (value: boolean) => (isLoading.value = value)
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <Loader v-if="isLoading" />
    <Toaster />
    <SidebarTrigger />
    <div class="app">
      <MainLayout>
        <ProfilePage />
        <SettingsPage />
        <!-- <template #logo>
          <div class="app__links">
            <a
              href="https://github.com/simpledeadly/Focuseek"
              target="_blank"
            >
              <img
                src="@/assets/logo_dark.png"
                class="app__logo"
                alt="logo"
              />
            </a>
            <div
              :style="{ visibility: !isAuthenticated() ? 'hidden' : 'visible' }"
              class="app__icons"
            >
              <ProfilePage />
              <SettingsPage />
              <ArrowRightSquare
                :size="18"
                class="app__icons_quit-icon icon"
              />
            </div>
          </div>
        </template> -->
        <template
          v-if="isAuthenticated()"
          #nav 
        >

          <AppNavbar />
        </template>
        <template #main>
          <RouterView
            @loading="(value: boolean) => setLoading(value)"
            class="app__main"
          />
        </template>
      </MainLayout>
    </div>
  </SidebarProvider>
</template>

<style lang="scss">
.app {
  width: 100%;
  padding-top: 1rem;

  &__logo {
    width: 88px;
    margin: 0 auto;
    margin-left: 3rem;
  }

  &__links {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icons {
    display: flex;
  }

  .icon {
    transition: 0.05s;
    margin-left: 0.5rem;
    color: hsl(var(--muted-foreground));
    cursor: pointer;
    opacity: 0.5;

    &:hover {
      color: hsl(var(--foreground));
      opacity: 1;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
</style>
