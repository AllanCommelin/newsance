import AdminConcerts from '@/views/back_office/Concerts/AdminConcertsList.vue'
import AdminConcertsCreate from '@/views/back_office/Concerts/AdminConcertsCreate.vue'
import AdminConcertsEdit from '@/views/back_office/Concerts/AdminConcertsEdit.vue'
import Concert from "@/views/front_office/Concert/Concerts";

const routes = [
    {
        path: '/admin/concerts',
        name: 'Admin.concerts',
        component: AdminConcerts,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/concerts/create',
        name: 'Admin.concerts.create',
        component: AdminConcertsCreate,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/concerts/edit/:id',
        name: 'Admin.concerts.edit',
        component: AdminConcertsEdit,
        meta: { requiresAuth: true }
    },
    {
        path: '/concerts',
        name: 'Concerts',
        component: Concert,
    },
]

export default routes
