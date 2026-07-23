import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import StudentView from '@/views/StudentInfoView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventEditView from '@/views/event/EditView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import nProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore} from '@/stores/event'
import { useScrollStore } from '@/stores/scroll'





const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query?.page?.toString() || '1') })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/student',
      name: 'student',
      component: StudentView,
    },
    {
      path: '/:cathAll(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true,
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    },

    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEvent(id)
        .then((response) => {
          // need to setup the data for the event
          eventStore.setEvent(response.data)
        }).catch((error) => {
          if (error.response && error.response.status === 404) {
            return {
              name: '404-resource-view',
              params: { resource: 'event' }
            }
          } else{
            return { name: 'network-error-view' }
          }
        })
        },
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView
        },
          {
            path: 'edit',
            name: 'event-edit-view',
            component: EventEditView,
          },
          {
            path: 'register',
            name: 'event-register-view',
            component: EventRegisterView,
          }
        ]
    }
  ],
  scrollBehavior(to, from) {
    const scrollStore = useScrollStore()
    const toPage = Number(to.query.page)
    const fromPage = Number(from.query.page)
    const top = scrollStore.getPosition(to.fullPath)

    if (toPage < fromPage && top !== null) {
      scrollStore.removePosition(to.fullPath)
      return { top }
    }
    return { top: 0 }
  }
})

router.beforeEach((to, from) => {
  nProgress.start()
  // Save scroll position of the current page before navigating away
  const scrollStore = useScrollStore()
  scrollStore.savePosition(from.fullPath)
})
router.afterEach(() => {
  nProgress.done()
})
export default router
